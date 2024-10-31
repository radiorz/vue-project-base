<!--
 
/**
 * @author
 * @file TheCardTitle.vue
 * @fileBase TheCardTitle
 * @path packages\webapp\src\components\widget\container\TheCardTitle.vue
 * @from 
 * @desc 
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<template>
  <div class="py-2">
    <v-label>
      <slot></slot>
    </v-label>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'TheCardTitle',
  components: {},
  // filters:{},
  // mixins:[],
  // props: {},
  data() {
    return {}
  },
  // 组件方法
  // computed:{},
  // watch:{},
  // created(){},
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .v-label {
  font-weight: bold;
}
</style>
