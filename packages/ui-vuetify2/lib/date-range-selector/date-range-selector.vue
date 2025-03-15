<!--
* @FileDescription: 日期选择控件
* @Date: 2021年03月15日 09:57:55
* TODO:
* - 
-->

<template>
  <div class="date-range-select">
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateRangeText"
          dense
          solo
          readonly
          hide-details
          v-bind="attrs"
          v-on="on"
          @click="show"
        >
          <template v-slot:append>
            <v-btn icon @click="clearDates" v-if="isDates">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-icon>mdi-calendar</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="dates"
        dense
        range
        landscape
        @input="closeDateSelect"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { isEmpty } from 'lodash-es';
export default {
  name: 'date-select',
  components: {},
  props: { value: { type: Array, default: [] } },
  data() {
    return {
      menu: false,
      dates: this.value // 选取的日期
    }
  },
  computed: {
    dateRangeText() {
      return this.dates?.join(' ~ ')
    },
    isDates() {
      return this.dates && !isEmpty(this.dates)
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.dates = val || []
      }
    }
  },
  methods: {
    show() {
      this.menu = !this.menu
    },
    closeDateSelect() {
      if (this.dates.length === 2) {
        // 不管怎么选都是小的在前面
        const time1 = new Date(this.dates[0]).valueOf()
        const time2 = new Date(this.dates[1]).getTime()
        if (time1 > time2) {
          this.dates = this.dates.reverse()
        }
        this.menu = false
        this.$emit('input', this.dates)
      }
    },
    clearDates() {
      this.dates = []
      this.$emit('input', this.dates)
    }
  }
}
</script>
<style lang="scss" scoped></style>
