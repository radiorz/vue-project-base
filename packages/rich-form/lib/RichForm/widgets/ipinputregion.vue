<!-- ip范围选择 -->
<template>
  <div class="ip-input-range">
    <ip-input
      :disabled="field.readOnly"
      :value="value[0]"
      clearable
      style="width:200px"
      :placeholder="field.placeholder"
     @input="onStartIpChange"
    ></ip-input>
    <span>-</span>
    <ip-input
      :disabled="field.readOnly"
      :value="value[1]"
      clearable
      style="width:200px"
      :placeholder="field.placeholder"
      @input="onEndIpChange"
    ></ip-input>
  </div>
</template>

<script>
import IpInput from '@/components/IpInput/index.vue'
// import IpInput from './ipinput.vue'
import WidgetMixin from './base.mixin'

export default {
  name: 'IpInputRegionWidget',
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
  text-align: center;
  gap: 2px;
}
.line {
    height: 1px;
    width: 10px;
    margin: 0 4px;
    background-color: black;
  }
</style>
