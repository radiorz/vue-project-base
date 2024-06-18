# vue-ui 

一个简单的 vue3 ui 组件库
主要记录一些平时常用的组件。

# 使用 

```vue

<script lang="ts">
export default {
  name: 'App'
}
</script>
<script setup lang="ts">
import { MaxHeight } from '@tikkhun/vue-ui'
</script>

<template>
  <div class="App">
    App
    <MaxHeight>
      <template #default="{ height }">
        <div :style="{ height: height + 'px', background: 'green' }">{{ height }}</div>
      </template>
    </MaxHeight>
  </div>
</template>

<style lang="scss" scoped></style>

```
