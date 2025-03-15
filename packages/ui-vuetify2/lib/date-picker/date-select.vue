<!--
* @FileDescription: 日期选择控件
* @Date: 2021年03月15日 09:57:55
* TODO:
* - 
-->

<template>
  <div class="date-select">
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="pickedDate"
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
        @input="closeDateSelect"
        clearable
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'date-select',
  components: {},
  props: {},
  data() {
    return {
      menu: false,
      pickedDate: '' // 选取的日期
    }
  },
  computed: {},
  watch: {},
  methods: {
    show() {
      this.menu = !this.menu
    },
    closeDateSelect() {
      this.menu = false
      this.$emit('input', this.pickedDate)
    }
  }
}
</script>
<style lang="scss" scoped></style>
