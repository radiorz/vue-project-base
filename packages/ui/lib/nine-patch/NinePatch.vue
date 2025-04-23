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
import { useNinePatchStyle } from './useNinePatchStyle'

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
defineSlots<{
  /** Example description for default */
  default(props: {}): any
}>()

const style = useNinePatchStyle({
  image: props.image,
  width: props.width,
  height: props.height,
  topLength: props.topLength,
  leftLength: props.leftLength,
  rightLength: props.rightLength,
  bottomLength: props.bottomLength
})
// export interface Emits {
//   (e: 'change', value: number): void
//   (e: 'click', value: number): void
// }
// const emit = defineEmits<Emits>()
</script>

<template>
  <div class="NinePatch" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
