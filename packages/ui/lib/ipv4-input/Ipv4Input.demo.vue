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
import { ref } from 'vue'
import Ipv4Input from './Ipv4Input.vue'
defineOptions({
  name: 'Ipv4InputDemo'
})
const value = ref('1.1.1.1')
</script>

<template>
  <div>
    {{ value }}
    <Ipv4Input v-model="value"></Ipv4Input>
  </div>
</template>

<style lang="scss" scoped></style>
