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
import { useTime } from '@tikkhun/vue-hooks'
import { computed } from 'vue'
const { currentTime } = useTime()
const date = computed(() => currentTime.value.toLocaleTimeString())
</script>

<template>
  <div class="TheTime">{{ date }}</div>
</template>

<style lang="scss" scoped></style>
