<!--
锁屏时段选择组件
-->

<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        hide-details
        dense
        outlined
        v-model="time"
        append-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="time"
      full-width
      format="24hr"
      scrollable
      @click:minute="$refs.menu.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'color-select',
  components: {},
  props: {
    value: { type: String, default: '' },
    min: { type: String, default: '00:00' },
    max: { type: String, default: '24:00' }
  },
  data() {
    return {
      time: this.value,
      menu2: false
    }
  },
  created() {
    this.time = this.value
  },
  computed: {},
  watch: {
    time(val) {
      this.time = val
      this.$emit('input', val)
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
