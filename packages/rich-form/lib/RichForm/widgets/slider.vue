<template>
  <!--  在voerka-form里的schema中定义样式
    value中定义值
    vertical: boolean 设置滑块纵向现实, 此时必须设置高度(height)
  -->
  <div class="slider-widget-container">
    <el-slider
      v-model="value"
      class="slider-widget"
      :min="field.minimum"
      :max="field.maximum"
      :step="field.step"
      :height="field.height ? field.height : '200px'"
      :format-tooltip="formatTooltip"
      :vertical="field.vertical"
      :show-stops="!field.showStop === false"
      :show-input="field.showInput === true"
      :range="!field.showRange === false"
      :disabled="field.readOnly"
    ></el-slider>
    <el-button v-if="!(field.showValue == false)" type="text" read-only>{{
      formatTooltip(value)
    }}</el-button>
  </div>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'SliderWidget',
  mixins: [mixin],
  data() {
    return { startInput: false }
  },
  async mounted() {
    await this.$nextTick()
    // slider初始化时改变了value值，进而改变了脏值
    this.startInput = true
  },
  methods: {
    // value值改变触发的事件
    valueChanged(value) {
      if (!this.startInput) return
      try {
        const v = this.fromFieldValue(value)
        const friendValue = this.getFriendValue(v)
        this.$emit('change', v, friendValue, this.getExtraData())
      } catch (e) {
        logger.warn(
          this.$t('richform.setValueErr').params(this.schema.name, e.message)
        )
      }
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        step: 10, // 步长
        minimum: 0, // 最小值
        maximum: 100, // 最大值
        readOnly: false,
        showStop: false,
        showInput: false,
        showRange: false,
        vertical: false
      }
    },
    formatTooltip(value) {
      return this.enumDict && this.enumDict[value]
        ? this.enumDict[value].text
        : value
    },
    toFieldValue(value) {
      if (!value && value != 0) {
        return '1'
      }

      if (this.form.showInput === false) {
        if (Array.isArray(value)) {
          return value.map((range) => parseInt(range))
        }
        return value.split(',').map((range) => parseInt(range))
      }
      return parseInt(value)
    },
    fromFieldValue(value) {
      if (this.schema.type === 'string') {
        if (Array.isArray(value)) {
          return value.join(',')
        }
        return `${value}`
      }
      return value
    }
  }
}
</script>

<style lang="scss">
.slider-widget-container {
  display: flex;
  width: 100%;
}
.slider-widget {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 200px;
}
</style>
