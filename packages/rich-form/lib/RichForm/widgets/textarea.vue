<template>
  <div class="textarea-widget">
    <el-input
      v-model="value"
      type="textarea"
      :autosize="{ minRows: field.minRows || 1, maxRows: field.maxRows || 10 }"
      :placeholder="field.placeholder"
      :show-word-limit="field.showWordLimit"
      :readonly="field.readOnly"
    >
    </el-input>
    <el-button
      v-if="field.clearable && !field.readOnly"
      class="btn"
      type="text"
      @click="clearValues"
      >{{ $t('richform.clear') }}</el-button
    >
  </div>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'TextareaWidget',
  mixins: [mixin],
  methods: {
    clearValues(e) {
      this.valueChanged('')
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        placeholder: '',
        readOnly: false
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

<style lang="scss" scoped>
.textarea-widget {
  width: 100%;
  display: flex;
  el-input {
    width: 100%;
  }
  .btn {
    vertical-align: middle;
    padding-left: 8px;
  }
}
</style>
