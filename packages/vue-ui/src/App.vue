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
import { Ipv4Input } from '../lib'
defineOptions({
  name: 'App'
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
</script>

<template>
  <div>
    <Ipv4Input></Ipv4Input>
  </div>
</template>

<style scoped></style>
