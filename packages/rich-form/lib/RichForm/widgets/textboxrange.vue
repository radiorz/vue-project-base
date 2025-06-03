<!-- 文本框范围选择 -->
<template>
  <div class="text-box-range">
    <el-input
      class="textbox-widget"
      :value="value[0]"
      clearable
      :size="field.size"
      style="width: 200px"
      :placeholder="field.placeholder"
      @input="onStartIpChange"
    ></el-input>
    <span>&nbsp;-&nbsp;</span>
    <el-input
      class="textbox-widget"
      :value="value[1]"
      clearable
      :size="field.size"
      style="width: 200px"
      :placeholder="field.placeholder"
      @input="onEndIpChange"
    ></el-input>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <el-link style="color: green; width: 30px" @click="check">验证</el-link>
  </div>
</template>

<script>
import WidgetMixin from './base.mixin'

export default {
  name: 'textBoxRangeWidget',
  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    check() {
      if (this.value.length < 2) {
        return this.$notify({
          title: '请先填写完整SIP账号范围值',
          type: 'error'
        })
      } else {
        if (
          this.values.sip.account.indexOf(',') != -1 &&
          Number(_.cloneDeep(this.values.sip.account).split(',')[0]) >
            Number(_.cloneDeep(this.values.sip.account).split(',')[1])
        ) {
          return this.$notify({
            title: 'SIP账号结束值需大于开始值',
            type: 'error'
          })
        }else{
          // 此处写明调用接口验证sip账号，待写
          console.log(this.value);
        }
      }
    },
    onStartIpChange(val) {
      val = val.replace(/[\W]/g, '')
      this.value = this.value.toString().replace(/[^\d]/g, '')
      this.$set(this.value, 0, val)
      this.valueChanged(this.value)
    },
    onEndIpChange(val) {
      val = val.replace(/[\W]/g, '')
      this.value = this.value.toString().replace(/[^\d]/g, '')
      this.$set(this.value, 1, val)
      this.valueChanged(this.value)
    },
    toFieldValue(value) {
      if ([undefined, '', null].includes(value)) {
        return []
      }
      if (typeof value === 'string') {
        return value.split(',')
      }
      if (typeof value === 'number') {
        return [value]
      }
      return value
    },
    fromFieldValue(value) {
      return value.toString()
    }
  }
}
</script>

<style lang="scss" scoped>
.text-box-range {
  display: flex;
  align-items: center;
}
</style>
