<!--
* @FileDescription: 后面跟着输入框的slider
* @Date: 2021年03月17日 15:33:20
* TODO:
* -
-->
<template>
  <v-slider
    :min="min"
    :max="max"
    class="align-center"
    hide-details
    v-model="sliderValue"
    @change="change"
  >
    <template v-slot:append>
      <v-text-field
        class="pt-0 mt-0"
        outlined
        dense
        hide-details
        type="number"
        style="width: 80px"
        :min="min"
        :max="max"
        v-model="sliderValue"
        @change="change"
      ></v-text-field>
    </template>
  </v-slider>
</template>

<script>
export default {
  name: 'input-slider',
  props: {
    min: { type: String | Number, default: 0 },
    max: { type: String | Number, default: 100 },
    value: { type: String | Number }
  },
  data() {
    return {
      sliderValue: this.value
    }
  },
  methods: {
    change() {
      this.$emit('change', this.sliderValue)
    }
  }
}
</script>
<style scoped></style>
