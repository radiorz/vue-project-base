<!--
  时间范围组选择组件
 -->

<template>
  <div class="TimeRangeGroupWidget">
    <el-button
      type="text"
      icon="el-icon-plus"
      style="width: 100%"
      v-show="isAddable(-1)"
      :disabled="!isAddable(-1)"
      :title="$t('resource_manage.add_time_period')"
      @click="addItem(-1)"
    ></el-button>
    <div v-for="(item, index) in value" :key="index">
      <ScheduleGroupItem
        v-model="value[index]"
        :max-time="getMaxTime(index)"
        :min-time="getMinTime(index)"
        :addable="isAddable(index)"
        @add="addItem(index)"
        @delete="deleteItem(index)"
      >
      </ScheduleGroupItem>
    </div>
  </div>
</template>

<script>
import mixin from './base.mixin'
import ScheduleGroupItem from '@/common/ResourceManage/ResourceSchedule/ScheduleGroupItem.vue'
const DAY_MAX_TIME = 24 * 60 * 60 * 1000
export default {
  name: 'TimeRangeGroupWidget',
  mixins: [mixin],
  components: {
    ScheduleGroupItem
  },
  data() {
    return {
      ranges: []
    }
  },
  methods: {
    toFieldValue(value) {
      if (!Array.isArray(value)) return (this.value = [])
      return value
    },
    fromFieldValue(value) {
      return value
    },
    addItem(index) {
      const currentItem = this.value[index]
      const nextItem = this.value[index + 1]
      const newItem = {
        start: currentItem ? currentItem.end : 0,
        end: nextItem ? nextItem.start : DAY_MAX_TIME
      }
      if (newItem.start > DAY_MAX_TIME) {
        newItem.start -= DAY_MAX_TIME
      }
      if (newItem.end > DAY_MAX_TIME) {
        newItem.end -= DAY_MAX_TIME
      }
      this.value.splice(index + 1, 0, newItem)
    },
    deleteItem(index) {
      this.value.splice(index, 1)
    },
    isAddable(index) {
      const currentItem = this.value[index]
      const nextItem = this.value[index + 1]
      if (index < 0) {
        // 顶部加号可用
        return this.value[0] ? this.value[0].start > 0 : true
      }
      if (index >= this.value.length - 1) {
        // 最后一项，因为可以跨零点，因此保留最后一个加号
        if (currentItem.end >= DAY_MAX_TIME) return false
        return true
        return currentItem.end < 24 * 60 * 60 * 1000 - 1000
      }
      // 非最后一项
      return nextItem.start - currentItem.end > 0
    },
    getMaxTime(index) {
      const nextItem = this.value[index + 1]
      return nextItem ? nextItem.start : DAY_MAX_TIME
    },
    getMinTime(index) {
      const lastItem = this.value[index - 1]
      return lastItem ? lastItem.end : 0
    }
  }
}
</script>

<style lang="scss" scoped>
/* .time-range-group-widget {
} */
</style>
