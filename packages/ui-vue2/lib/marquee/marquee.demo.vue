<!--
 
/**
 * @author
 * @file marquee.demo.vue
 * @fileBase marquee.demo
 * @path packages\vue2-ui\lib\marquee\marquee.demo.vue
 * @from 
 * @desc 
 * @example
 */

-->

<template>
  <div id="father" :style="fatherStyle" :key="key">
    <span id="children" v-marquee="scrollOptions">{{ text }}</span>
  </div>
</template>

<script>
import { marqueeDirective } from './marquee.directive';
export default {
  // 组件名
  name: 'marqueeDemo',
  components: {},
  directives: {
    marquee: marqueeDirective
  },
  // filters:{},
  // mixins:[],
  // props: {},
  data() {
    return {
      text: '123',
      key: 0,
      scrollOptions: {
        scrollDirection: 'left',
        scrollSpeed: 10
      },
      fatherStyle: {
        width: "50px",
        height: '50px',
        backgroundColor: "blue"
      }
    }
  },
  // 组件方法
  // computed:{},
  // watch:{},
  async created() {
    const timeout = 1000
    await new Promise((resolve) => setTimeout(resolve, timeout))
    Vue.set(this, 'text', '123456789')
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
