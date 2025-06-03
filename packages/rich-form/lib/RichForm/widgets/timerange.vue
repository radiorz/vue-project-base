<!--
  时间范围组件
 -->

<template>
  <div class="TimeRangeWidget">
    <el-date-picker
      v-model="value"
      type="datetimerange"
      range-separator="~"
      value-format="timestamp"
      :start-placeholder="$t('richform.startTime')"
      :end-placeholder="$t('richform.endTime')"
      @change="handleChange"
    >
    </el-date-picker>
  </div>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'TimeRangeWidget',
  mixins: [mixin],
  created() {},
  data() {
    return {}
  },
  created() {
    this.value = [new Date(), new Date()]
  },
  computed: {
    placeholder() {
      return this.field.placeholder
    }
  },
  methods: {
    handleChange(val) {
      this.value = val
    }
  }
}
</script>

<style lang="scss" scoped>
.TimeRangeWidget {
}
</style>
