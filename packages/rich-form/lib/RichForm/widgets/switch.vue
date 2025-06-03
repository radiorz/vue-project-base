<template>
  <el-switch
    v-model="switchVal"
    class="switch-widget"
    :disabled="field.readOnly || !field.configurable"
    :active-color="field.activeColor ? field.activeColor : '#409eff'"
    :inactive-color="field.inactiveColor ? field.inactiveColor : '#dcdfe6'"
    :active-text="field.activeText"
    :inactive-text="field.inactiveText"
  ></el-switch>
</template>

<script>
import WidgetMixin from './base.mixin'

export default {
  name: 'SwitchWidget',
  mixins: [WidgetMixin],
  data() {
    return { switchVal: this.initial.value }
  },
  watch: {
    // switch的深层监听有问题，所以这里要做映射，才可以实现实时更新
    value(newVal) {
      if (newVal !== this.switchVal) {
        this.$nextTick(() => (this.switchVal = newVal))
      }
    },
    switchVal(newVal) {
      // 当值为空时，清空this.values联动字段的值
      if (!newVal && this.field.updateFields) {
        Object.entries(this.field.updateFields).forEach((item) => {
          const [field, paths] = item
          if (paths.startsWith('$')) {
            this.setReactiveValue(paths, undefined)
          } else {
            this.$set(this.values, paths, undefined)
          }
        })
      }
      if (newVal !== this.value) {
        this.$nextTick(() => (this.value = newVal))
      }
    }
  },
  methods: {
    setReactiveValue(paths, value) {
      let _paths = paths.split('.').splice(1)
      let lastValue = this.values
      let currValue = this.values
      for (let _path of _paths) {
        if (currValue === undefined) break
        lastValue = currValue
        currValue = currValue[_path]
      }
      this.$set(lastValue, _paths.slice(-1)[0], value)
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        readOnly: false,
        activeText: '',
        inactiveText: '',
        configurable: true
      }
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      return value
    },
    // 设置友好值
    getFriendValue(value) {
      return this.enumDict && this.enumDict[value]
        ? this.enumDict[value].text
        : value
    }
  }
}
</script>
