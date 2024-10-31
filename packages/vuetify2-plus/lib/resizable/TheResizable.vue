<template>
  <div v-resize="onResize">
    <div ref="above">
      <div v-if="!timeOut" style="height: 1px"></div>
      <slot></slot>
    </div>
    <div ref="resizeBox">
      <slot name="resizeBox" :height="height" />
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash-es'

export default {
  name: 'the-resizable',
  props: {
    footerHeight: { type: Number, default: 0 }
  },
  data() {
    return {
      height: 0,
      timeOut: false
    }
  },
  watch: {
    timeOut() {
      this.onResize()
    }
  },
  async mounted() {
    this.onResize = debounce(this.onResize.bind(this), 1)
    setTimeout(() => {
      this.timeOut = true
    }, 100)
  },
  methods: {
    async onResize() {
      await this.$nextTick()
      this.height =
        window.innerHeight -
        this.$refs?.resizeBox.getBoundingClientRect().y -
        this.footerHeight
    }
  }
}
</script>
