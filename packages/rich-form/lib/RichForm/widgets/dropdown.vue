<template>
  <div>
    <el-dropdown
      class="dropdown-widget"
      :size="form.size"
      :trigger="field.trigger"
      :hide-on-click="field.hideOnClick"
      :show-timeout="field.showTimeout"
      :hide-timeout="field.hideTimeout"
      :placement="field.placement"
      :split-button="field.splitButton"
      @command="handleSelectChange"
    >
      <span class="el-dropdown-link">
        {{
          enumDict && typeof enumDict === 'object' && enumDict[value]
            ? enumDict[value].text
            : $t('richform.noChoose')
        }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-if="field.chooseAll"
          command="all"
          :disabled="disabledFields.includes(field.name) || field.readOnly"
          >{{ $t('richform.withoutLimit') }}</el-dropdown-item
        >
        <el-dropdown-item
          v-for="item in enumDict"
          :key="item.value"
          :disabled="disabledFields.includes(field.name) || field.readOnly"
          :command="item.value"
          >{{ item.text }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import WidgetMixin from './base.mixin'

export default {
  name: 'DropdownWidget',

  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleSelectChange(item) {
      if (item === 'all') {
        this.value = undefined
      } else {
        this.value = item
      }
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        splitButton: false,
        isNeedValidate: false,
        placement: 'bottom-end',
        trigger: 'click',
        chooseAll: false,
        hideOnClick: true,
        hideTimeout: 150,
        showTimeout: 250
      }
    },
    toFieldValue(value) {
      if (typeof value === 'object') {
        return JSON.stringify(value)
      }
      return value
    }
  }
}
</script>

<style lang="scss">
@import '../vars.scss';

.richform {
  .layout {
    .field.error {
    }
  }
}
</style>
