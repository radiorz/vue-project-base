<!-- 省市三级联动 -->

<template>
  <el-cascader
    v-if="isShowCascader"
    v-model="mockValue"
    :disabled="field.readOnly || form.readOnly"
    :options="placeEnumDict"
  ></el-cascader>
  <el-input v-else v-model="mockValue" disabled />
</template>

<script>
import { regionData, TextToCode, CodeToText } from 'element-china-area-data'
import mixin from './base.mixin'

export default {
  name: 'PlaceCascaderWidget',
  mixins: [mixin],
  data() {
    return {
      placeEnumDict: regionData,
      mockValue: this.initData(this.initial.value),
      isShowCascader: true
    }
  },
  created() {
    if (!this.initial.value.includes(',') && this.initial.value.length) {
      this.isShowCascader = false
    }
  },
  watch: {
    mockValue: {
      handler(newVal) {
        this.value = newVal
      },
      deep: true
    },
    values(newVal) {
      this.mockValue = this.initData(this.initial.value)
    }
  },
  methods: {
    initData(value = '') {
      if (!value) {
        return []
      }
      if (typeof value !== 'string') {
        return logger.error('placeCascaderWidget 组件的value类型错误')
      }
      // 兼容传入的是字符串无逗号的情况(在省，市，县，区)
      if (!value.includes(',') && this.initial.value) {
        this.isShowCascader = false
        return value
      }
      const oldBirthPlace = value.split(',')
      let newVal
      if (oldBirthPlace.length > 2) {
        newVal = [
          TextToCode[oldBirthPlace[0]].code, // 省
          TextToCode[oldBirthPlace[0]][oldBirthPlace[1]].code, // 市
          TextToCode[oldBirthPlace[0]][oldBirthPlace[1]][oldBirthPlace[2]].code // 县
        ]
      } else if (oldBirthPlace.length > 1) {
        newVal = [
          TextToCode[oldBirthPlace[0]].code, // 省
          TextToCode[oldBirthPlace[0]][oldBirthPlace[1]].code // 市
        ]
      } else {
        newVal = [
          TextToCode[oldBirthPlace[0]].code // 省
        ]
      }
      return newVal
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      return value
    },
    // 当value变化时设置传递到父组件的value，传到后端
    fromFieldValue(value) {
      let oldBirthPlace = []
      if (typeof value === 'object') {
        oldBirthPlace = [].slice.call(value)
      } else {
        oldBirthPlace = value.split(',').map(Number)
      }
      // 将地区由 code 改成 text 类型，并写入表单的 value 中
      const newBirthPlace = []
      oldBirthPlace.forEach((e) => {
        newBirthPlace.push(CodeToText[e])
      })
      const newVal = newBirthPlace.join(',')
      return newVal
    },
    // 设置前端友好值
    getFriendValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
