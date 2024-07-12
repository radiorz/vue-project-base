<script lang="ts">
export default {
  name: 'App'
}
</script>
<script setup lang="ts">
import {
  Draggable,
  MaxHeight,
  Resizeable,
  TheTime,
  vDraggable,
  vCopyDraggable,
  vDrop
} from '../lib'
const style = {
  width: '100px',
  height: '100px',
  backgroundColor: 'green'
}
const max = { width: '100%', height: '100%', backgroundColor: 'orange', color: 'white' }
function doSomething(e) {
  console.log(`doSomething`, e)
}
</script>

<template>
  <div class="App">
    <div :style="style" v-drop="doSomething">vDraggable</div>
    111
    <div :style="style" v-draggable>vDraggable</div>
    <div :style="style" v-copy-draggable>vCopyDraggable</div>
    <Draggable :style="style">
      <div :style="max">draggable</div>
    </Draggable>
    <Resizeable :style="style">
      <div :style="max">resizeable</div>
    </Resizeable>
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
