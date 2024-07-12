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
import { vResizeable, vDraggable } from '../lib'
const style = {
  width: '100px',
  height: '100px',
  backgroundColor: 'green'
}
</script>

<template>
  <div class="App">
    <div :style="style" v-draggable></div>
    App123
    <TheTime></TheTime>
    <MaxHeight>
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
