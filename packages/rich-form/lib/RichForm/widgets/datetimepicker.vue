<template>
  <el-date-picker
    v-model="value"
    :readonly="field.readOnly"
    :disabled="field.readOnly"
    type="datetime"
    :placeholder="field.placeholder"
    :clearable="true"
    :picker-options="pickerOptions"
    @change="dataChange"
  ></el-date-picker>
</template>

<script>
import dayjs from 'dayjs'
import mixin from './base.mixin'

export default {
  name: 'DataTimePickerWidget',
  mixins: [mixin],
  data() {
    return {
      // 限制选择的日期最多只能到今天（病人费用清单） medicalExpense
      pickerOptions: {
        disabledDate: (time) => {
          if (this.field.storage === 'medicalExpenses') {
            return time.getTime() > Date.now()
          }
        }
      }
    }
  },
  watch: {
    value(newVal) {
      if (!newVal && this.field.countAge) {
        this.$set(this.values, 'age', null)
      }
    }
  },
  methods: {
    // 选择日期改变时
    dataChange(value) {
      if (this.field.countAge) {
        this.$set(this.values, 'age', dayjs().diff(dayjs(value), 'year'))
      }
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        placeholder: '',
        countAge: false,
        readOnly: false
      }
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      if (typeof value === 'object') {
        return ''
      }
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      if (value) {
        return dayjs(value).valueOf()
      }
      return value
    },
    // 设置友好值
    getFriendValue(value) {
      if (value) {
        return dayjs(value).format('YYYY MM-DD-HH:mm:ss')
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
