

<!--
 
/**
 * @author
 * @file ToggleButotn.demo.vue
 * @fileBase ToggleButotn.demo
 * @path packages\vue2-ui\lib\toggle-button\ToggleButotn.demo.vue
 * @from 
 * @desc 
 * @example
 */

-->

<template>
<ToggleButton v-model="items"></ToggleButton>
</template>

<script lang="ts">
import ToggleButton from './ToggleButton.vue';
export default {
  // 组件名
  name: 'ToggleButtonDemo',
  components: {ToggleButton},
  // filters:{},
  // mixins:[],
  // props: {},
  data(){
    return{
      items: [{value: "1",title: "1",active: false },{value: 2, title: "2",active: true}]
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
