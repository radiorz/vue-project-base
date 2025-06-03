<!--
* @FileDescription: 选择日期(返回时间戳)
* @Date: 2021年06月25日 13:58:16
* TODO:
* [] readonly
* 注释:
* type: daterange
-->
<template>
  <div>
    <el-date-picker
      v-model="value"
      type="daterange"
      value-format="timestamp"
      :disabled="field.readOnly || form.readOnly"
      :start-placeholder="$t('richform.startTime')"
      :end-placeholder="$t('richform.endTime')"
      :clearable="false"
    />
  </div>
</template>

<script>
import widgetMixin from './base.mixin'

export default {
  name: 'DataPickerWidget',
  mixins: [widgetMixin],
  data() {
    return {}
  },
  watch: {},

  // mounted() {},
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        placeholder: '',
        countAge: false,
        readOnly: false
      }
    },
    // 进来
    toFieldValue(value = []) {
      if (value && value[0]) {
        const array = [value[0]?.begin, value[0]?.end]
        // this.data = array
        return array
      }
      return value
    },
    // 出去
    fromFieldValue(value) {
      if (value) {
        return [
          {
            begin: value[0],
            end: value[1]
          }
        ]
      }
      return [
        {
          begin: '',
          end: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
