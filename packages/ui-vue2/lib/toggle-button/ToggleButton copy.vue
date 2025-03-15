<template>
  <div class="toggle-button-group">
    <div class="toggle-background" :style="backgroundStyle"></div>
    <div 
      v-for="item in value" 
      :key="item.value" 
      :class="['toggle-button', { active: item.active }]"
      ref="buttons"
      @click="()=>toggle(item.value)"
    >
      {{ item.title }}
    </div> 
  </div>
</template>

<script lang="ts">
export default {
  name: 'ToggleButtonGroup',
  props: {
    value: {
      type: Array,
      default: ()=> [],
    },
  },
  data() {
    return {
      backgroundStyle: {
        transform: 'translateX(0)',
        width: '0px'
      }
    }
  },
  methods: {
    toggle(value: string) {
      const newItems = this.value?.map((item) => {
        if(item.value !== value){
          return {...item, active: false}
        }
        return {...item, active:true}
      })
      this.$emit('input', newItems)
      this.$nextTick(() => {
        this.updateBackgroundPosition()
      })
    },
    updateBackgroundPosition() {
      const activeButton = this.$refs.buttons.find((_, index) => 
        this.value[index].active
      ) as HTMLElement
      
      if (activeButton) {
        this.backgroundStyle = {
          transform: `translateX(${activeButton.offsetLeft}px)`,
          width: `${activeButton.offsetWidth}px`
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateBackgroundPosition()
    })
  },
  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          this.updateBackgroundPosition()
        })
      },
      deep: true
    }
  }
}
</script> 

<style lang="scss" scoped>
.toggle-button-group {
  @apply rounded-md bg-white flex flex-row gap-1 w-min p-0.5 relative;
}

.toggle-background {
  @apply absolute bg-blue-600 rounded-md;
  height: calc(100% - 4px);
  transition: all 0.3s ease;
  z-index: 0;
}

.toggle-button {
  @apply relative text-blue-600 rounded-md p-1 w-16 text-center cursor-pointer;
  z-index: 1;
  transition: all 0.3s ease;
  
  &.active {
    @apply text-white;
    background: transparent;
  }
}
</style>
