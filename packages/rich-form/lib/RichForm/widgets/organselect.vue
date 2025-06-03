<template>
  <OrganDropDown
    v-model="value"
    class="organselect-widget"
    value-type="id"
    :type="1"
    :read-only="field.readOnly"
    :multiple="field.multiple"
    :clearable="field.clearable"
    :disabled="field.disabled"
    :field="field"
  ></OrganDropDown>
</template>

<script>
import OrganDropDown from '@/common/OrganizeManage/OrgEmployeeTreeDropDown/index.vue'
import mixin from './base.mixin'

export default {
  name: 'OrganSelectWidget',
  components: {
    OrganDropDown
  },
  mixins: [mixin],
  data() {
    return {}
  },
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        readOnly: false,
        multiple: false
      }
    },
    // 进来的
    // value object 或者 array
    toFieldValue(value) {
      return value
    },
    // 出去的
    fromFieldValue(value) {
      return value
    },
    // 设置友好值
    getFriendValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
