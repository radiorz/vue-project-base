<!--
 
/**
 * @author
 * @file ToggleGroup.vue
 * @fileBase ToggleGroup
 * @path packages\ui\lib\the-toggle\ToggleGroup.vue
 * @from 
 * @desc 支持传入多个 ToggleStrategy 实例的切换组组件
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: 'ToggleGroup'
})

// 完善 ToggleStrategy 接口，明确 icon 和 title 的类型
export interface ToggleStrategy {
  type: string
  isActive: () => boolean
  icon: string // 假设 icon 是字符串类型，比如图标类名
  title: string // 假设 title 是字符串类型
}

// 定义组件 Props
export interface Props {
  strategies: ToggleStrategy[] // 支持传入多个 ToggleStrategy 实例
  value: string // 当前toggle
}
const props = withDefaults(defineProps<Props>(), {
  strategies: () => [],
  value: undefined
})

// 定义组件 Emits
export interface Emits {
  (e: 'change', type: string): void // 触发 change 事件时传递选中的 type
}
const emit = defineEmits<Emits>()

// 处理点击事件
const handleClick = (strategy: ToggleStrategy) => {
  emit('change', strategy.type)
}
</script>

<template>
  <div class="flex space-x-2 ToggleGroup">
    <!-- 使用 Tailwind CSS 实现水平排列 -->
    <div
      v-for="strategy in props.strategies"
      :key="strategy.type"
      class="p-2 rounded-md cursor-pointer hover:bg-gray-100"
      :class="{ 'bg-gray-200': strategy.isActive() }"
      @click="handleClick(strategy)"
    >
      <i :class="strategy.icon"></i>
      <!-- 渲染图标 -->
      <span>{{ strategy.title }}</span>
      <!-- 渲染标题 -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
