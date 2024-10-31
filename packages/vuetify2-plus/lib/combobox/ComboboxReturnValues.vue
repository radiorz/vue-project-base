<!--
 
/**
 * @author
 * @file ComboboxReturnValues.vue
 * @fileBase ComboboxReturnValues
 * @path packages\vuetify2-plus\lib\form-widgets\ComboboxReturnValues.vue
 * @from 
 * @desc 
 * @example
 */
 
-->
<!--* 
 * # TODO
 * -
 * # DONE
 * ## 20241031 星期四
 * # FUTURE
 -->
<template>
  <div>
    <!-- {{ value }}
    {{ objects }} -->
    <v-combobox v-bind="withoutValueProps" v-model="objects" v-on="withoutInputList"> </v-combobox>
  </div>
</template>

<script>
// import Vue from 'vue'
import { VCombobox } from 'vuetify/lib'

export default {
  name: 'TheCombobox',
  extends: VCombobox,
  // filters:{},
  // mixins:[],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 值进来会变成对象(这样才能正确显示)
      objects: this.value.map((v) => this.items.find((i) => i[this.itemValue || 'value'] === v))
    }
  },

  computed: {
    withoutValueProps() {
      const props = {}
      Object.entries(this.$props).forEach(([key, value]) => {
        if (key === 'value') {
          return
        }
        props[key] = value
      })
      return props
    },
    withoutInputList() {
      const listeners = {}
      Object.entries(this.$listeners).forEach(([key, value]) => {
        if (key === 'change' || key === 'input') {
          return
        }
        listeners[key] = value
      })
      // console.log(`listeners`, listeners, this.$listeners)
      return listeners
    }
  },
  watch: {
    objects: {
      handler(val) {
        const theObject = val.map((obj) => obj[this.itemValue || 'value'])
        // 触发的值又会变成值,而不是对象
        this.$emit('input', theObject)
      },
      // deep: true,
      immediate: true
    }
  },
  mounted() {
    // console.log(`this.$props`, this.$props)
  },
  // created(){},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
