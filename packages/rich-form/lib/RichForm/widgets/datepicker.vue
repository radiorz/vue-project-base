<template>
  <el-date-picker
    v-model="value"
    :disabled="field.readOnly || form.readOnly"
    type="date"
    :placeholder="field.placeholder"
    :clearable="true"
    :picker-options="pickerOptions"
    @change="dataChange"
  />
</template>

<script>
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import mixin from './base.mixin'
const ONE_DAY = 24 * 60 * 60 * 1000
export default {
  name: 'DataPickerWidget',
  mixins: [mixin],
  data() {
    return {
      // 限制选择的日期最多只能到今天（出生日期)
      pickerOptions: {
        disabledDate: (time) => {
          if (this.field.name === 'birthday') {
            return time.getTime() > Date.now() - 8.64e6
          }
        }
      }
    }
  },
  mounted() {
    dayjs.extend(duration)
    // if (this.value) this.dataChange(this.value)
  },
  methods: {
    // 选择日期改变时
    async dataChange(value) {
      await this.$nextTick()
      if (this.field.countAge) {
        const {
          years: age,
          months: monthAge,
          days: dayAge
        } = this.calculateYMD(value)
        await this.$nextTick()
        this.$set(this.values, 'age', age)
        this.$set(this.values, 'monthAge', monthAge)
        this.$set(this.values, 'dayAge', dayAge)
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
      if (value) {
        return this.formatValue(value)
      }
      if (value === 0) {
        return new Date(value)
      }
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      if (value) {
        // return dayjs(value).valueOf();
        return this.formatValue(value)
      }
      if (value === 0) {
        return new Date(value)
      }
      return value
    },
    // 设置友好值
    getFriendValue(value) {
      if (value) {
        return dayjs(value).format('YYYY-MM-DD')
      }
      return value
    },
    // 后端说，以格林威治0点0分0秒代指那天，即东八区八点整
    formatValue(value) {
      let result = new Date(dayjs(value).format('YYYY-MM-DD')).valueOf()
      // dayjs 时间戳类型必须为Number
      if (typeof value === 'string' && result < 0 && !isNaN(value * 1)) {
        result = new Date(dayjs(value * 1).format('YYYY-MM-DD')).valueOf()
      }
      if (result === 0) {
        return new Date(result)
      }
      return result
    },
    // 获取精准年月日
    calculateYMD(birthdate) {
      const birthDay = dayjs(birthdate).get('date')
      // 获取当前月天数
      const daysOnMonth = dayjs(birthdate).daysInMonth()
      // 当前月到月底的天数
      const dateToLast = daysOnMonth - birthDay
      let months = dayjs().diff(dayjs(birthdate), 'month')
      let years = dayjs().diff(dayjs(birthdate), 'year')
      // 当前天数
      const currentDate = new Date()
      const currentDates = currentDate.getDate()
      let days = 0
      if (birthDay > currentDates) {
        days = dateToLast + currentDates
      } else {
        days = currentDates - birthDay
      } // 头尾两个天数相加
      if (days > daysOnMonth) {
        months += 1
        days -= daysOnMonth
      }
      months = months > 12 ? months - years * 12 : months
      years = isNaN(years) ? 0 : years
      months = isNaN(months) ? 0 : months
      days = isNaN(days) ? 0 : days
      return { years, months, days }
    }
  }
}
</script>

<style lang="scss" scoped></style>
