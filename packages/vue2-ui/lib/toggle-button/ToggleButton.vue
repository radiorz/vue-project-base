

<!--
 
/**
 * @author
 * @file ToggleButtonGroup.vue
 * @fileBase ToggleButtonGroup
 * @path packages\vue2-ui\lib\toggle-button\ToggleButtonGroup.vue
 * @from 
 * @desc 
 * @example
 */

-->

<template>
  <div class="toggle-button-group">
    <div :class="['toggle-button',{active: item.active}]" v-for="item in value" :key="item.value" @click="()=>toggle(item.value)">
      {{ item.title }} <!-- {{ item.active }} -->
    </div> 
  </div>
</template>

<script lang="ts">

export default {
  // 组件名
  name: 'ToggleButtonGroup',
  components: {},
  // filters:{},
  // mixins:[],
  props: {
    value: {
        type:  Array,
        default: ()=> [],
        // required: true,
        // validator() { return  }
  },
  },
  data(){
    return{
    }
  },
  // 组件方法
  // computed:{},
  // watch:{},
  // created(){},
  methods: {
    toggle(value: string) {
      const newItems = this.value?.map((
        item
      )=> {
        if(item.value !== value){
          return {...item, active: false}
        }
        return {...item, active:true}
      })
      // console.log(`newItems`,newItems)
      this.$emit('input',newItems)
    }
  },
}
</script> 

<style lang="scss" scoped>
.toggle-button-group {
  @apply rounded-md bg-white flex flex-row gap-1 w-min p-0.5;
}
.toggle-button {
  @apply text-blue-600 bg-white rounded-md p-1 w-16 text-center cursor-pointer;
  &.active {
    @apply bg-blue-600 text-white;
  }
}
</style>
