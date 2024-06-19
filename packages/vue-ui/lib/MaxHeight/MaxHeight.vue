<script setup lang="ts">
// https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
import { ref } from 'vue'
import { useMaxHeight } from './useMaxHeight'
const props = defineProps<{ footerHeight: number }>()
const theEl = ref<HTMLElement | null>(null)

const { height } = useMaxHeight(theEl.value, props.footerHeight)
</script>
<template>
  <div ref="theEl">
    <slot :height="height"></slot>
  </div>
</template>
