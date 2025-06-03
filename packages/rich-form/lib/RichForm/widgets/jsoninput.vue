<template>
  <div class="jsoninput-widget">
    <JsonInput
      v-model="value"
      :read-only="field.readOnly"
      :height="field.height"
      :options="field"
    ></JsonInput>
  </div>
</template>

<script>
import JsonInput from '@/components/JsonInput/index.vue'
import WidgetMixin from './base.mixin'

export default {
  name: 'JsonInputWidget',
  components: { JsonInput },
  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    defaultSchema() {
      return {
        height: '300px'
      }
    },
    // 获取值的转换
    toFieldValue(value) {
      return value
    },
    // 设置值的转换
    fromFieldValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
