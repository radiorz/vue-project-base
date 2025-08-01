<!--
 
/**
 * @author
 * @file App.vue
 * @fileBase App
 * @path packages\vue2-ui\src\App.vue
 * @from 
 * @desc 
 * @example
 */

-->

<template>
  <RotateButtonGroupDemo></RotateButtonGroupDemo>
  <!-- <ToggleButtonDemo></ToggleButtonDemo> -->
</template>

<script lang="ts">
import RotateButtonGroupDemo from '../lib/button/rotate-button-group.demo.vue'
// import ToggleButtonDemo from '../lib/toggle-button/ToggleButton.demo.vue'
export default {
  // 组件名
  name: 'App',
  components: { RotateButtonGroupDemo },
  // filters:{},
  // mixins:[],
  // props: {},
  data() {
    return {

    }
  },
  // 组件方法
  // computed:{},
  // watch:{},
  // created(){},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
