<!--
* @FileDescription: 日期选择控件
* @Date: 2021年03月15日 09:57:55
* TODO:
* - 
-->

<template>
  <div class="date-select">
    <v-menu
      v-model="menu"
      min-width="auto"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="pickedDate"
          :label="label"
          outlined
          dense
          readonly
          clearable
          hide-details
          append-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          @click="show"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="pickedDate"
        dense
        scrollable
        clearable
        @input="closeDateSelect"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'date-picker',
  components: {},
  props: {
    label: { type: String, default: '' },
    value: { type: String, default: '' }
  },
  data() {
    return {
      menu: false,
      pickedDate: '' // 选取的日期
    }
  },
  computed: {},
  watch: {
    value(val) {
      this.pickedDate = val || ''
    },
    pickedDate(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    show() {
      this.menu = !this.menu
    },
    closeDateSelect() {
      this.menu = false
      // this.$emit('input', this.pickedDate)
    }
  }
}
</script>
<style lang="scss" scoped></style>
