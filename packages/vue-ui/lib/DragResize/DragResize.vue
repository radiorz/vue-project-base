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
  foo: string
}
const props = withDefaults(defineProps<Props>(), {
  foo: ''
})
export interface Emits {
  (e: 'change', value: number): void
}
const emit = defineEmits<Emits>()
const width = ref(0)
const height = ref(0)
</script>

<template>
  <div class="DragResize">
    <slot :width="width" :height="height"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
