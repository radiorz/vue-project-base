<!--
 
/**
 * @author
 * @file TheLabel.vue
 * @fileBase TheLabel
 * @path packages\webapp\src\components\form\components\TheLabel.vue
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
  <div style="width: 7rem">
    <v-label>
      {{ label.indexOf(':') === -1 ? `${label}:` : label }}
    </v-label>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'TheLabel',
  components: {},
  // filters:{},
  // mixins:[],
  props: {
    label: { type: String, default: '' }
  },
  computed: {},

  // 组件方法
  // watch:{},
  // created(){},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
