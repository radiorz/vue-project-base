<!--
 
/**
 * @author
 * @file index.vue
 * @fileBase example
 * @path packages\form-vue2\src\example\index.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script>
import { defineComponent } from "vue";
import { Form } from "../../lib";
export default defineComponent({
  name: "TheExample",
  // components: {},
  props: {},
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  setup(props, ctx) {},
  data() {
    return {
      // 数据定义
      schema: {
        type: "object",
        name: {
          type: "string",
        },
      },
      // 外观定义
      preference: {},
      // 值
      data: {},
    };
  },
  // computed:{},
  // watch:{},
  // created(){},
  methods: {},
});
</script>

<template>
  <div class="RichForm">
    <Form :schema="schema" :preference="preference" v-model="data"></Form>
  </div>
</template>

<style lang="scss" scoped></style>
