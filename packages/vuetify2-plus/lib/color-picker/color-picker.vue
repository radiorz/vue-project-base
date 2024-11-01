<!--
颜色选择组件
-->

<template>
  <v-menu
    class="color-picker"
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
      v-model="pickedColor"
      hide-mode-switch
    ></v-color-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'color-picker',
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
  methods: {
    isShowColorPick() {
      this.showColorPick = !this.showColorPick
    },
    closeColorPick() {
      this.showColorPick && this.$emit('change', this.pickedColor)
    }
  }
}
</script>
<style lang="scss" scoped>
.color-div {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
}
</style>
