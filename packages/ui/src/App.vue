<!--
 
/**
 * @author
 * @file App.vue
 * @fileBase App
 * @path packages\vue-ui\src\App.vue
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
  name: 'App'
})
import NinePatchDemo from '../lib/nine-patch/NinePatch.demo.vue'
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
</script>

<template>
  <div><NinePatchDemo></NinePatchDemo></div>
</template>

<style scoped></style>
