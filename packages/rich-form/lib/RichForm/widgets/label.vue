<template>
  <!-- :style="{color:valueColor}" -->
  <span>{{ getFriendValue(value) }}</span>
</template>

<script>
import WidgetMixin from './base.mixin'

export default {
  name: 'LabelWidget',
  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {},
  watch: {
    value(newVal) {
      // 此处是为了关联数据,如果只是用来显示则不更新
      if (typeof newVal === 'object') return
      this.valueChanged(newVal)
    }
  },
  methods: {
    fromFieldValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
