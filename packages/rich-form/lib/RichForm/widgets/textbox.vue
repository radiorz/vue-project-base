<!--
  field.showString: 'name' 或者 field.showString: ['name', 'count'],(数组目前仅支持两个字段) 数组显示指定的字符串
-->
<template>
  <!-- :style="{color:valueColor}" -->
  <el-input
    v-model="value"
    class="textbox-widget"
    :readonly="field.readOnly"
    :viewonly="field.viewOnly"
    :size="form.size"
    :clearable="field.clearable"
    :placeholder="field.placeholder"
    :maxlength="field.maxLength"
    :minlength="field.minLength"
    :suffix-icon="field.suffixIcon"
    :prefix-icon="field.prifixIcon"
    :show-password="field.password"
    :show-word-limit="field.showWordLimit"
    :style="field.style"
    :disabled="
      disabledFields.includes(field.name) || field.disabled || field.readOnly
    "
    @input="onInput"
    @change="onChange"
    autocomplete="new-password"
  >
    <template v-if="field.prepend" slot="prepend">{{ field.prepend }}</template>
    <template v-if="field.append" slot="append">{{ field.append }}</template>
  </el-input>
</template>

<script>
import WidgetMixin from './base.mixin'

const DEFAULT_FIELD_NAME_MAP = {
  years: 'years',
  months: 'months',
  days: 'days'
}
export default {
  name: 'TextboxWidget',
  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {
    valueColor() {
      return this.field.dictColor &&
        this.field.dictColor[this.value] &&
        this.field.dictColor[this.value].color
        ? this.field.dictColor[this.value].color
        : '#fff'
    }
  },
  methods: {
    onInput(value) {
      if (this.form.validator && this.form.validator.on === 'input') {
        this.onChange(value)
      }
      // this.value = value
    },
    async onChange(value) {
      await this.$nextTick()
      if (
        this.field.name === 'age' ||
        this.field.name === 'monthAge' ||
        this.field.name === 'dayAge'
      ) {
        let birthday = this.convertYMDToDate({
          years: this.values.age,
          months: this.values.monthAge || 0,
          days: this.values.dayAge || 0
        })
        this.$set(this.values, 'birthday', birthday)
      }
      // this.value = value
    },
    convertYMDToDate(yyyymmdd, { inputMap = {} } = {}) {
      inputMap = { ...DEFAULT_FIELD_NAME_MAP, ...inputMap }
      let {
        [inputMap.years]: years,
        [inputMap.months]: months,
        [inputMap.days]: days
      } = yyyymmdd
      let date = new Date()
      date.setDate(date.getDate() - days)
      date.setMonth(date.getMonth() - months)
      date.setFullYear(date.getFullYear() - years)
      return date
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        placeholder: '',
        clearable: true,
        maxLength: null,
        minLength: null,
        isTextArea: false,
        password: false,
        showWordLimit: false,
        suffixIcon: '',
        prifixIcon: ''
      }
    },
    toFieldValue(value) {
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          try {
            if (this.field.showString) {
              if (typeof this.field.showString === 'string') {
                return value
                  .map((item) => item[this.field.showString])
                  .filter((item) => !!item)
                  .join(',')
              } else {
                return value
                  .map((item) => {
                    // 返回的格式为name(count)
                    return `${item[this.field.showString[0]]}(${
                      item[this.field.showString[1]]
                    })`
                  })
                  .join(',')
              }
            }
            return value.join(',')
          } catch (error) {
            console.log(`<<<<2022年06月28日 16:09:26>>>>`, { error: error })
          }
        }
        return JSON.stringify(value)
      }
      if (typeof value === 'boolean') {
        return `${value}`
      }
      return value
    }
    // fromFieldValue(value) {
    //   return value
    // }
  }
}
</script>

<style lang="scss">
@import '../vars.scss';

.richform {
  .layout {
    .field.error {
      input {
        border: 1px solid $error-color;
        background: transparentize($error-color, 0.8);
      }
    }
  }
}
</style>
