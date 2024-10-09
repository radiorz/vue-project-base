<!--
 
/**
 * @author
 * @file SashLayout.vue
 * @fileBase SashLayout
 * @path packages\vue-ui\lib\sash-layout\SashLayout.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: 'SashLayout'
})
export interface Props {
  className: string
  defaultLengths?: number[]
  direction?: 'horizontal' | 'vertical'
  childLengthZeroBehavior?: 'hidden' | 'destroy'
}
const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  childLengthZeroBehavior: 'hidden'
})
export interface Emits {
  (e: 'change', value: number): void
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div :class="className"><slot></slot></div>
</template>

<style lang="scss" scoped></style>
