<!--
 
/**
 * @author
 * @file NinePatch.vue
 * @fileBase NinePatch
 * @path packages\vue-ui\lib\nine-patch\NinePatch.vue
 * @from 
 * @desc 
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'NinePatch'
})
export interface Props {
  image: string
  width: number | string
  height: number | string
  topLength: number
  leftLength: number
  rightLength: number
  bottomLength: number
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  topLength: 10,
  leftLength: 10,
  rightLength: 10,
  bottomLength: 10,
  width: 100,
  height: 100
})
function addPx(n: number | string) {
  if (typeof n == 'string') return n
  return `${n}px`
}
const style = computed(() => {
  const top = addPx(props.topLength)
  const left = addPx(props.leftLength)
  const right = addPx(props.rightLength)
  const bottom = addPx(props.bottomLength)
  const style: any = {
    borderImageSource: `url(${props.image})`,
    borderImageSlice: `${props.topLength} ${props.rightLength} ${props.bottomLength} ${props.leftLength} fill`,
    borderImageWidth: `${top} ${right} ${bottom} ${left}`,
    borderImageOutset: `${top} ${right} ${bottom} ${left}`,
    borderImageRepeat: 'repeat'
  }
  if (props.width) {
    style.width = addPx(props.width)
  }
  if (props.height) {
    style.height = addPx(props.height)
  }
  return style
})
// export interface Emits {
//   (e: 'change', value: number): void
// }
// const emit = defineEmits<Emits>()
</script>

<template>
  <div class="NinePatch" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
