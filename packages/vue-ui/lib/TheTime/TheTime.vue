<!--
 
/**
 * @author
 * @file TheTime.vue
 * @fileBase TheTime
 * @path packages\vue-ui\lib\components\TheTime.vue
 * @from 
 * @desc TheTime
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<script lang="ts">
export default {
  name: 'TheTime'
}
</script>
<script setup lang="ts">
import { useTime } from './useTime'
const { currentTime } = useTime()
</script>

<template>
  <div class="TheTime">{{ currentTime.toLocaleTimeString() }}</div>
</template>

<style lang="scss" scoped></style>
