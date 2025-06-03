<template>
  <!-- <el-checkbox v-model="value" :disabled="field.readOnly"></el-checkbox> -->
  <div class="cascader-widget">
    <!-- 单个复选框 -->
    <el-checkbox
      v-if="!field.isGroup"
      v-model="value"
      :border="field.border"
      :disabled="field.readOnly"
      :size="field.size"
      >{{
        field.label || field.text || form.title || schema.title
      }}</el-checkbox
    >

    <!-- 复选框组 -->
    <div v-if="field.isGroup && !field.isButton" class="richform-checkgroup">
      <el-checkbox
        v-if="field.chooseAll"
        v-model="checkAll"
        class="richform-checkbox-all"
        style="margin-right: 30px;"
        :border="field.border"
        :disabled="field.readOnly"
        :size="field.size"
        @change="onChangeChoosekAll"
        >{{ $t('richform.withoutLimit') }}</el-checkbox
      >
      <el-checkbox-group
        v-model="value"
        :disabled="field.readOnly"
        :size="field.size"
        :max="field.max"
        :min="field.min"
        :text-color="field.textColor"
        :fill="field.fill"
      >
        <el-checkbox
          v-for="option in enumDict"
          :key="option.value"
          :label="option.value"
          :border="field.border"
          @change="onCheckItem"
          >{{ option.text }}</el-checkbox
        >
      </el-checkbox-group>
    </div>

    <!-- 复选按钮组 -->
    <div v-if="field.isGroup && field.isButton" class="richform-checkgroup">
      <el-checkbox-group
        v-if="field.chooseAll"
        v-model="checkAll"
        class="richform-checkbox-all"
        :disabled="field.readOnly"
        :size="field.size"
        :text-color="field.textColor"
        :fill="field.fill"
      >
        <el-checkbox-button
          :border="field.border"
          style="left: 4px;"
          @change="onChangeChoosekAll"
          >{{ $t('richform.withoutLimit') }}</el-checkbox-button
        >
      </el-checkbox-group>

      <el-checkbox-group
        v-model="value"
        :disabled="field.readOnly"
        :size="field.size"
        :max="field.max"
        :min="field.min"
        :text-color="field.textColor"
        :fill="field.fill"
      >
        <el-checkbox-button
          v-for="option in enumDict"
          :key="option.value"
          :label="option.value"
          :border="field.border"
          @change="onCheckItem"
          >{{ option.text }}</el-checkbox-button
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'CheckboxWidget',
  mixins: [mixin],
  data() {
    return {
      checkAll: false
    }
  },
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        readOnly: false,
        isGroup: false,
        isButton: false,
        chooseAll: false,
        border: false,
        size: '',
        max: 10000,
        min: 0,
        textColor: '#ffffff',
        fill: '#409EFF'
      }
    },
    // 选择 '不限' 相当于选中 '所有'
    onChangeChoosekAll() {
      this.value = []
      this.checkAll = true
    },
    async onCheckItem() {
      await this.$nextTick()
      if (this.field.chooseAll && this.value.length == 0) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    // 设置获取value时，value值的转换
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
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      return value
    },
    // 设置友好值
    getFriendValue(value) {
      return this.field.isGroup ? value.join(',') : value
    }
  }
}
</script>

<style lang="scss" scoped></style>
