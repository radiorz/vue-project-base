<!--
* @FileDescription: 日期型的选项与输入
* @Date: 2021年05月20日 14:22:53
* TODO:
* - demo
-->

<template>
  <v-radio-group v-model.trim="data" class="vp-date-filed-radio-group" row>
    <template #label>
      <TheLabel :label="label" />
    </template>
    <v-radio :label="firstRadioLabel" :value="firstRadioValue"></v-radio>
    <v-radio :value="isValidForever(data) ? today : data">
      <template #label>
        <div class="fix-align">
          <label>
            {{ secondRadioLabel }}
          </label>
          <!-- 应为小于 -->
          <div v-show="!isValidForever(data)" class="fix-align">
            <span class="mr-2">: </span>
            <v-menu v-model="menu" :close-on-content-click="false">
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="data"
                  v-bind="attrs"
                  :style="{
                    width: '200px'
                  }"
                  outlined
                  dense
                  hide-details
                  readonly
                  append-icon="mdi-calendar"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="data"
                hidden-details
                :allowed-dates="allowedDates"
                @input="menu = false"
              >
              </v-date-picker>
            </v-menu>
          </div>
        </div>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
import dayjs from 'dayjs'
import TheLabel from './container/TheLabel.vue'
const MAX_DATE = '2999-12-31' 
export default {
  name: 'vp-number-filed-radio-group',
  components: { TheLabel },
  filters: {},
  mixins: {},
  props: {
    // 值
    value: { type: String, default: MAX_DATE },
    label: { type: String, default: '请选择时间' },
    firstRadioLabel: { type: String, default: '永久' },
    firstRadioValue: { type: String, default: MAX_DATE },
    secondRadioLabel: { type: String, default: '选择时间' },
    allowedDates: {
      type: Function,
      default: (val) =>
        // TODO 最大值应该为 MAX_DATE
        Date.parse(val) > Date.now() - 8.64e7
    }
  },
  data() {
    return {
      menu: false,
      data: this.value
    }
  },
  computed: {
    today() {
      return dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  watch: {
    data(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    isValidForever(value) {
      return value === MAX_DATE
    }
  }
}
</script>
<style scoped>
.fix-align {
  display: flex;
  align-items: center;
}
</style>
