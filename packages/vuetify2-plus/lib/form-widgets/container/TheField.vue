<!--
 
/**
 * @author
 * @file TheField.vue
 * @fileBase TheField
 * @path packages\webapp\src\components\form\components\TheField.vue
 * @from 
 * @desc 
 * @todo
 * 左 label 右框
 *
 * @done
 * @example
 */

-->

<template>
  <div :class="['default-layout', labelClass]">
    <TheLabel :label="label"></TheLabel>
    <!-- children自己写 -->
    <slot :label="label"></slot>
  </div>
</template>

<script>
import TheLabel from './TheLabel.vue'

export default {
  // 组件名
  name: 'TheField',
  components: {
    TheLabel
  },
  // filters:{},
  // mixins:[],
  computed: {
    labelClass() {
      return this.labelArrangement === 'column' ? 'flex-col' : ''
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    // label的安排方式 上下或者左右,
    labelArrangement: {
      type: String,
      default: 'row' // 'none' 'column'
    }
  },
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
.default-layout {
  display: flex;
  flex-direction: row;
}
</style>
