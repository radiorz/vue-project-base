import TheTime from '../dist/components/TheTime';
<!--
 
/**
 * @author
 * @file App.vue
 * @fileBase App
 * @path packages\vue-ui\src\App.vue
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
  name: "App",
};
</script>
<script setup lang="ts">
import { TheTime } from "../lib";
</script>

<template>
  <div class="App">
    <TheTime></TheTime>
  </div>
</template>

<style lang="scss" scoped></style>
