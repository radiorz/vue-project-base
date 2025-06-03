<!--

/**
 * @author
 * @file text.vue
 * @fileBase text
 * @path packages\web\src\components\RichForm\widgets\text.vue
 * @from
 * @desc
 * @example
 */

-->

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextWidget',
  // components: {},
  props: {
    schema: {
      type: Object,
      default: () => ({})
    }
  },
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  setup(props, ctx) {},
  data() {
    return {}
  }
  // computed:{},
  // watch:{},
  // created(){},
  // methods:{}
})
</script>

<template>
  <span class="" v-bind="$attrs" v-on="$listeners">{{ schema.title }}</span>
</template>

<style lang="scss" scoped></style>
