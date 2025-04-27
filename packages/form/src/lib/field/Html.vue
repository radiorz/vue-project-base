<!--
 
/**
 * @author
 * @file html.vue
 * @fileBase html
 * @path packages\form-vue2\src\lib\fields\html.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script script="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "html",
  // components: {},
  props: {
    schema: {
      type: Object | String,
      default: () => {
        return {};
      },
    },
  },
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  setup(props, ctx) {},
  data() {
    return {};
  },
  // computed:{},
  // watch:{},
  // created(){},
  // methods:{}
});
</script>

<template>
  <div v-html="schema"></div>
</template>

<style lang="scss" scoped></style>
