<!--
* @FileDescription: 继承了 v-text-field 的属性
* @Date: 2022年04月26日 14:56:51
* TODO:
* [] 通过刷新 key 改善 -- 和 1.1浮点型未双向绑定的问题
-->

<template>
  <div>
    <v-text-field
      ref="textField"
      :key="key"
      type="number"
      outlined
      v-bind="$props"
      v-on="$listeners"
      @change="_handleChange"
    ></v-text-field>
  </div>
</template>

<script>
// import Vue from 'vue'
import { VTextField } from 'vuetify/lib'

export default {
  name: 'NumberField',
  extends: VTextField,
  // filters:{},
  // mixins:[],
  props: {
    numberType: {
      type: String,
      default: 'number'
    }
  },
  data() {
    return {
      key: 0
    }
  },

  computed: {
    // TODO
    checkRule() {
      const numberChecks = {
        number: /^[0-9]*$/, // 正整数
        integer: /^-?[0-9]*$/, // 整数
        // TODO 自然数
        positiveInteger: /^[1-9]*[0-9]*$/, // 正整数
        negativeInteger: /^-[1-9]*[0-9]*$/ // 负整数
      }
      return (value) => numberChecks[this.numberType].test(value)
    }
  },
  watch: {
    value(newValue) {
      let _value = newValue
      _value = parseInt(newValue, 10) || 0
      if (_value !== newValue) {
        this.$emit('input', _value)
        // this.$emit('change', _value)
      }
    }
  },
  mounted() {},
  // created(){},
  methods: {
    async _handleChange(value) {
      // 重新加载解决双向绑定失效问题
      if ((!value && value !== 0) || !this.validate()) {
        this.key++
        await this.$nextTick()
        this.$refs.textField.focus()
        this.$refs.textField.blur()
      }
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss" scoped></style>
