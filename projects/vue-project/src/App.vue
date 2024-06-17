import TheTime from '../../../packages/vue-ui/dist/components/TheTime';
<!--
 
/**
 * @author
 * @file App.vue
 * @fileBase App
 * @path projects\vue-project\src\App.vue
 * @from 
 * @desc App
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<script lang="ts">
export default {
  name: 'App'
}
</script>
<script setup lang="ts">
import { TheTime } from '@tikkhun/vue-ui'
</script>

<template>
  <div class="App">App<TheTime></TheTime></div>
</template>

<style lang="scss" scoped></style>
