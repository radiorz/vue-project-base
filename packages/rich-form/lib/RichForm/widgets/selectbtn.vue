<template>
  <div>
    <el-button
      v-if="field.chooseAll"
      :disabled="
        field.readOnly || (field.readOnly === undefined && schema.readOnly)
      "
      :size="field.size"
      :type="value && value.length === 0 ? 'success' : null"
      class="btnItem"
      @click="value = []"
      >{{ $t('richform.withoutLimit') }}</el-button
    >
    <template v-for="option in enumDict">
      <el-button
        :key="option.value"
        :disabled="
          field.readOnly || (field.readOnly === undefined && schema.readOnly)
        "
        :size="field.size"
        :type="value && value.includes(option.value + '') ? 'success' : null"
        class="btnItem"
        @click="pickType(option.value + '')"
        >{{ option.text }}</el-button
      >
    </template>
  </div>
</template>

<script>
import { difference } from 'ramda'
import WidgetMixin from './base.mixin'

export default {
  name: 'SelectBtnWidget',
  mixins: [WidgetMixin],
  methods: {
    // 筛选设备类型和位置
    pickType(type) {
      this.value = this.value.includes(type)
        ? difference(this.value)([type])
        : [...this.value, type]
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        chooseAll: true,
        size: 'medium'
      }
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
      return value.join(',')
    },
    getFriendValue(value) {
      const newVal = value
        .split(',')
        .map((val) =>
          this.enumDict[val]
            ? this.enumDict[val].title || this.enumDict[val].text
            : val
        )
      return newVal.join(',')
    }
  }
}
</script>

<style lang="scss" scoped>
.btnItem {
  margin: 2px;
  // height: 36px;
}
</style>
