<!-- ip范围选择 -->
<template>
  <div class="ip-input-range">
    <el-input
      class="textbox-widget"
      :disabled="field.readOnly"
      :value="value[0]"
      clearable
      :placeholder="field.placeholder"
     @input="onStartIpChange"
    ></el-input>
    <span>&nbsp;-&nbsp;</span>
    <el-input
      class="textbox-widget"
      :disabled="field.readOnly"
      :value="value[1]"
      clearable
      :placeholder="field.placeholder"
      @input="onEndIpChange"
    ></el-input>
  </div>
</template>

<script>
import IpInput from '@/components/IpInput/index.vue'
import WidgetMixin from './base.mixin'

export default {
  name: 'IpInputRangeWidget',
  components: { IpInput },
  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    onStartIpChange(val) {
      this.$set(this.value, 0, val)
      this.valueChanged(this.value)
    },
    onEndIpChange(val) {
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
.ip-input-range {
  display: flex;
  align-items: center;
}
</style>
