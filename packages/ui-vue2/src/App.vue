

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
  <div>
    <ToggleButtonDemo></ToggleButtonDemo>
    <MarqueeDemo></MarqueeDemo>
  </div>
</template>

<script lang="ts">
import MarqueeDemo from '../lib/marquee/marquee.demo.vue'
import ToggleButtonDemo from '../lib/toggle-button/ToggleButton.demo.vue'
export default {
  // 组件名
  name: 'App',
  components: {ToggleButtonDemo,MarqueeDemo},
  // filters:{},
  // mixins:[],
  // props: {},
  data(){
    return{
      
    }
  },
  // 组件方法
  // computed:{},
  // watch:{},
  // created(){},
  methods: {},
}
</script> 

<style lang="scss" scoped>

</style>
