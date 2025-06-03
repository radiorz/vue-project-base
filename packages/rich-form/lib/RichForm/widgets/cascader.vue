<template>
  <el-cascader
    :ref="'cascaderWidget_' + ramdonId"
    v-model="mockValue"
    class="cascader-widget"
    :popper-class="'cascaderWidget_'+field.popperClass"
    :disabled="field.readOnly"
    :options="options"
    :clearable="field.clearable"
    :filterable="field.filterable"
    :props="field.props"
    :show-all-levels="field.showAllLevels"
    :separator="field.separator"
  ></el-cascader>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'CascaderWidget',
  mixins: [mixin],
  data() {
    return {
      ramdonId: parseInt(Math.random(0, 10) * 100000),
      mockValue: this.initial.value
    }
  },
  computed: {
    options() {
      let options = this.enumDict
      if (!Array.isArray(this.enumDict)) {
        options = Object.values(this.enumDict)
      }
      return options
    }
  },
  computed: {
    options() {
      let options = this.enumDict
      if (!Array.isArray(this.enumDict)) {
        options = Object.values(this.enumDict)
      }
      return options
    }
  },
  watch: {
    mockValue(newVal) {
      if (this.value !== newVal) {
        this.value = newVal
      }
    },
    // 如果value未空,则清空mockValue,用于清除richform的值
    value(newVal) {
      if (!newVal) {
        this.mockValue = newVal
      }
    }
  },
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        separator: '/',
        placeholder: '',
        readOnly: false,
        props: { value: 'value', label: 'label' },
        showAllLevels: true
      }
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      if (!this.field.props.multiple) {
        return value[value.length - 1]
      }
      return value.map((item) => item[item.length - 1]).join(',')
    },
    // 设置友好值
    getFriendValue(value) {
      return this.$refs[`cascaderWidget_${this.ramdonId}`]
        .getCheckedNodes()
        .map((node) => node.label)
        .join(',')
    }
  }
}
</script>

<style lang="scss" scoped></style>
