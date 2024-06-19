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
  name: 'App'
}
</script>
<script setup lang="ts">
import { MaxHeight, TheTime } from '../lib'
</script>

<template>
  <div class="App">
    App
    <TheTime></TheTime>
    <MaxHeight :footerHeight="0">
      <template #default="{ height }">
        <div
          :style="{
            background: 'green',
            height: height + 'px',
            width: '100%'
          }"
        ></div>
      </template>
    </MaxHeight>
  </div>
</template>

<style lang="scss" scoped></style>
