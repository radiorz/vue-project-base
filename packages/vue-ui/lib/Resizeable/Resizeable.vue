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
defineOptions({
  name: 'TheResizeable'
})
export interface Props {
  foo: string
}
const props = withDefaults(defineProps<Props>(), {
  foo: ''
})
export interface Emits {
  (e: 'change', value: number): void
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="Resizeable">Resizeable</div>
</template>

<style lang="scss" scoped></style>
