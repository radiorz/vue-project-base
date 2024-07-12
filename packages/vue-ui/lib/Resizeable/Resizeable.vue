import { useResizeable } from './useResizeable';
<!--
 
/**
 * @author
 * @file Resizeable.vue
 * @fileBase Resizeable
 * @path packages\vue-ui\lib\Resizeable\Resizeable.vue
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
import { useResizeable } from './useResizeable'
defineOptions({
  name: 'TheResizeable'
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
const resizeEl = ref<HTMLElement | null>(null)
useResizeable(resizeEl as Ref<HTMLElement>)
</script>

<template>
  <div class="resizeable" ref="resizeEl">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
