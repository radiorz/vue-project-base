<!--
颜色选择组件
-->

<template>
  <v-menu
    class="color-select"
    v-model="showColorPick"
    :close-on-content-click="false"
    elevation="0"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        v-on="on"
        class="color-div"
        :style="{ backgroundColor: pickedColor }"
        @click="isShowColorPick"
      ></div>
    </template>
    <v-color-picker
      elevation="0"
      v-click-outside="closeColorPick"
      mode="rgba"
      class="color-pick"
      :value="pickedColor"
      @input="changeColor"
      hide-mode-switch
    ></v-color-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'color-select',
  components: {},
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {
      showColorPick: false,
      pickedColor: '' // 选取的颜色
    }
  },
  created() {
    // 双向绑定
    this.pickedColor = this.value
  },
  watch: {
    value(val) {
      this.pickedColor = val
    }
  },
  mounted() {},
  methods: {
    isShowColorPick() {
      this.showColorPick = !this.showColorPick
    },
    closeColorPick() {
      this.showColorPick && this.$emit('change', this.pickedColor)
    },
    changeColor(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.color-div {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  margin-left: 5px;
}
</style>
