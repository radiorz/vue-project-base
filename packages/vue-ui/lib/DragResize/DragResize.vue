<!--
 
/**
 * @author
 * @file DragResize.vue
 * @fileBase DragResize
 * @path packages\vue-ui\lib\DragResize\DragResize.vue
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
import { ref } from 'vue'
defineOptions({
  name: 'DragResize'
})
export interface Props {
  width: number
  height: number
  minWidth: number
  minHeight: number
}
const props = withDefaults(defineProps<Props>(), {
  width: 1,
  height: 1,
  minWidth: 1,
  minHeight: 1
})
// export interface Emits {
//   (e: 'change', value: number): void
// }
// const emit = defineEmits<Emits>()

</script>

<template>
  <div class="DragResize">
    <slot :width="props.width" :height="props.height"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
