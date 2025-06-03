<template>
  <el-color-picker
    v-model="value"
    class="colorpick-widget"
    :disabled="field.readOnly"
    :show-alpha="field.showAlpha"
    :size="field.size"
    :predefine="field.predefineColors"
  />
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'ColorPickerWidget',
  mixins: [mixin],
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        placeholder: '',
        readOnly: false,
        predefineColors: [],
        size: 'default',
        showAlpha: false
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
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
