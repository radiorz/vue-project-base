<!--
* @FileDescription: 简单的滑块工具
* @Date: 2022年01月04日 13:45:22
* TODO:
* [] Demo
-->

<template>
  <v-slider
    class="five-level-slider"
    :tick-labels="tickLabels"
    step="1"
    min="1"
    max="5"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  >
  </v-slider>
</template>

<script>
export default {
  name: "LevelSlider",
  components: {},
  // filters:{},
  // mixins:[],
  props: {
    tickLabels: {
      type: Array,
      default: () => ["一级", "二级", "三级", "四级", "五级"],
    },
  },
  data() {
    return {};
  },
  watch: {},
  // computed:{},
  // watch:{},
  // created(){},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
