<template>
  <div >
    <div v-for="(item, index) in value" >
      <el-date-picker
        v-model="value[index]"
        :readonly="field.readOnly"
        :disabled="field.readOnly"
        type="datetime"
        :placeholder="field.placeholder"
        :clearable="true"
        :picker-options="pickerOptions"
        @input="$forceUpdate()"
        @change="dataChange"
      ></el-date-picker>
      <el-button
        v-if="index == 0"
        circle
        type="primary"
        size="mini"
        class="el-icon-plus"
        @click="addDatePicker"
      ></el-button>
      <el-button
        v-else
        circle
        type="primary"
        size="mini"
        class="el-icon-minus"
        @click="deleteDatePicker(index)"
      ></el-button>
    </div>
  </div>
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
  methods: {
    // 删除日期项
    deleteDatePicker(index) {
      this.value.splice(index, 1)
    },
    // 增加日期项
    addDatePicker() {
      this.value.push(null)
    },
    // 选择日期改变时
    dataChange(value) {
      this.$emit('change', this.value)
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
      // 新增时，需要给value一个初始值
      if (value.length == 0) {
        value = ['']
      }
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      // if (value) {
      //   return dayjs(item).valueOf()
      // }
      console.log(`fromFieldValue`, value)
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

<style lang="scss" scoped>

</style>
