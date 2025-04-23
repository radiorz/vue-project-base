<!--
 
/**
 * @author
 * @file NinePatch.demo.vue
 * @fileBase NinePatch.demo
 * @path packages\vue-ui\lib\nine-patch\NinePatch.demo.vue
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
import NinePatch from './NinePatch.vue'
defineOptions({
  name: 'NinePatchDemo'
})

</script>

<template>
  <NinePatch
    :image="'/src/assets/image.png'"
    :width="100"
    :height="100"
    :leftLength="27"
    :rightLength="27"
    :topLength="27"
    :bottomLength="27"
  >
    测试点九图
  </NinePatch>
</template>

<style lang="scss" scoped></style>
