<!--
* @FileDescription: 数值型的代码
* @Date: 2021年05月20日 14:22:53
* TODO:
* [] 虽然不会因为乱按而报错 但是不是很美观
* - google 的按adf等按键不会出现,
* - firefox 的按adf等按键会变成文本..
* - 如果 version 会变成null 
-->

<template>
  <v-radio-group v-model.number="data" class="vp-number-filed-radio-group" row>
    <!-- {{ isDev() && 'NumberFieldRadioGroup' + value }} -->
    <!-- {{ isDev() && 'NumberFieldRadioGroup' + data }} -->
    <template #label>
      <TheLabel v-if="label" :label="label"></TheLabel>
    </template>
    <v-radio :disabled="disabled" :label="firstRadioLabel" :value="firstRadioValue"></v-radio>
    <v-radio :key="version" :disabled="disabled" :value="data === -1 ? 1 : data">
      <template #label>
        <div class="fix-align">
          <label>
            {{ secondRadioLabel }}
          </label>
          <!-- {{ isDev() && data }} -->
          <div v-show="data >= 0" class="fix-align">
            <span class="mr-2">: </span>
            <NumberField
              v-model.number="data"
              type="number"
              :min="0"
              outlined
              dense
              hide-details
              :rules="[checkInteger(), checkBiggerThanMinusOne()]"
            />
          </div>
        </div>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
import { checkInteger, checkBiggerThanMinusOne } from '../form-rules'
import NumberField from './NumberField.vue'
import TheLabel from '../form-base/TheLabel.vue'
import {configRightNumber } from './number-field.utils'
export default {
  name: 'vp-number-filed-radio-group',
  components: { NumberField, TheLabel },
  filters: {},
  mixins: {},
  props: {
    // 值
    value: { type: Number, default: -1 },
    label: { type: String, default: '' }, 
    disabled: { type: Boolean, default: false },
    firstRadioLabel: { type: String, default: '不限' },
    firstRadioValue: { type: Number, default: -1 },
    secondRadioLabel: { type: String, default: '数量' }
  },
  data() {
    return {
      data: configRightNumber(this.value), // 默认不限
      version: 0
      // rules
    }
  },
  computed: {},
  watch: {
    // 这里可能得 immediately 一下
    value(val) {
      this.data = configRightNumber(val)
    },
    data: {
      // 第一次立马启动让 undefined 变成 -1
      immediate: true,
      handler(val) {
        this.$emit('input', configRightNumber(val))
      }
    }
  },
  mounted() {},
  methods: {
    checkInteger,
    checkBiggerThanMinusOne
  }
}
</script>
<style scoped>
.fix-align {
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>
