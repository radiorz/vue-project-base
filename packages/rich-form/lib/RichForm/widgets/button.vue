<!--
layout传入的参数
{
  name: "button", // 对应的schema键值,必选,唯一
  flexGrow: 1,
  action: ()=>{},
}

对应schema的参数
{
  name: "button", // 名称,与key相同
  title: "", //一般用于显示
  widget: "button", // 可选，推荐的表单渲染组件名称
  readOnly: false // 是否只读
}
-->

<template>
  <el-button
    v-if="!field.readOnly"
    :type="field.type ? field.type : 'default'"
    :style="field.style"
    :size="field.size"
    :round="field.round"
    :plain="field.plain"
    :circle="field.circle"
    :icon="field.icon"
    @click="handleAction"
  >
    {{ schema.title || field.title }}
  </el-button>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'ButtonWidget',
  mixins: [mixin],
  data() {
    return {}
  },
  methods: {
    // defaultSchema() {
    //   return {
    //     type: 'default',
    //     readOnly: false,
    //     style: {},
    //     isGroup: false,
    //     size: 'default',
    //     round: false,
    //     plain: false,
    //     circle: false,
    //     icon: ''
    //   }
    // },
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
    },
    handleAction() {
      // 如果是函数的话直接执行
      if (typeof this.schema?.function === 'function') {
        this.schema.function({ values: this.values, schema: this.schema })
      } else {
        // 编写恢复默认值的逻辑 restore
        this.$emit('field-action', { schema: this.schema })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
