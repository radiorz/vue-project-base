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
defineOptions({
  name: 'Ipv4InputDemo'
})
import { ref } from 'vue'
import Ipv4Input from './Ipv4Input.vue'
const value = ref('1.1.1.1')
</script>

<template>
  <div>
    {{ value }}
    <Ipv4Input v-model="value"></Ipv4Input>
  </div>
</template>

<style lang="scss" scoped></style>
