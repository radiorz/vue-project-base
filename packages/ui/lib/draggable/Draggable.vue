<!--
 
/**
 * @author
 * @file Draggable.vue
 * @fileBase Draggable
 * @path packages\vue-ui\lib\Draggable\Draggable.vue
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
import { ref, type Ref } from 'vue'
import { useDraggable } from './useDraggable'
defineOptions({
  name: 'TheDraggable'
})
// export interface Props {
//   foo: string
// }
// const props = withDefaults(defineProps<Props>(), {
//   foo: ''
// })
// export interface Emits {
//   (e: 'change', value: number): void
// }
// const emit = defineEmits<Emits>()
const dragEl = ref<HTMLElement | null>(null)
useDraggable(dragEl as Ref<HTMLElement>)
</script>

<template>
  <div ref="dragEl">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
