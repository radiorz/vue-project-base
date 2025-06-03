<template>
  <el-time-picker
    v-model="value"
    :readonly="field.readOnly"
    :placeholder="field.placeholder"
  ></el-time-picker>
</template>

<script>
/**
 * 返回值:   0 ~ 24*60*60*1000
 * 即 0代表0点0分0秒0毫秒    3600000代表1点0分0秒0毫秒
 */
import dayjs from 'dayjs'
import mixin from './base.mixin'

export default {
  name: 'TimePickerWidget',
  mixins: [mixin],
  data() {
    return {
      today: dayjs()
        .startOf('date')
        .valueOf()
    }
  },
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        placeholder: '',
        readOnly: false
      }
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      if (value >= 0) {
        return new Date(this.today + value)
      }
      return new Date()
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      if (value) {
        return dayjs(value).valueOf() - this.today
      }
      return 0
    },
    // 设置友好值
    getFriendValue(value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    },
    created() {
      if (this.field.initDate) {
        this.value = new Date()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
