<!--
field中：
  custom：开启自定义按钮；仅支持值为数字类型(2)或者字符串类型的数字（'2'）
  size: 定义input-number框的大小；
  minValue：定义input-number框的最小值；
  maxValue：定义input-number框的最大值；
  prepend：定义input-number框的前置文字；
  append：定义input-number框的后置文字；
  controlsPosition：定义input-number框的按钮位置
  mathOperation：将值进行数值运算，如['*', 60]
-->
<template>
  <div :class="field.vertical ? 'vertical' : ''">
    <el-radio
      v-if="field.chooseAll"
      v-model="commonValue"
      :disabled="field.readOnly"
      :label="''"
      @change="commonRadiochange"
      >{{ $t('richform.withoutLimit') }}</el-radio
    >
    <template v-for="option in enumDict">
      <el-radio
        :key="option.value"
        v-model="commonValue"
        :disabled="commonValue !== option.value && field.readOnly"
        :label="option.value"
        @change="commonRadiochange"
        >{{ option.text }}</el-radio
      >
    </template>
    <el-radio
      v-if="field.custom"
      v-model="customValue"
      :disabled="field.readOnly"
      :label="custom"
      @change="customRadioChange"
      ><span v-if="!showCustom">{{ $t('richform.custom') }}</span>
      <span v-if="showCustom">{{ field.prepend }}</span>
      <el-input-number
        v-if="showCustom"
        v-model="custom"
        :size="field.size"
        :min="field.minValue"
        :max="field.maxValue"
        :controls-position="field.controlsPosition"
        @change="inputChange"
      ></el-input-number
      ><span v-if="showCustom">{{ field.append }}</span></el-radio
    >
  </div>
</template>

<script>
import WidgetMixin from './base.mixin'

export default {
  name: 'RadioWidget',
  mixins: [WidgetMixin],
  data() {
    return {
      custom: '',
      customValue: '',
      showCustom: false,
      commonValue: ''
    }
  },
  watch: {
    value(newValue) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 取出字典中所有value值
      const enumDictValues = (Object.values(this.enumDict) || []).map(
        (item) => item?.value
      )
      // 如果初始值在字典中，那么显示普通按钮，否则显示自定义按钮
      if (enumDictValues.includes(this.value)) {
        this.commonValue = this.value
        this.customValue = ''
        this.custom = this?.field?.minValue || 0
      } else {
        this.showCustom = true
        this.custom = this.field.mathOperation
          ? this.reverseFourArithmetic(
              this.field.mathOperation[0],
              this.field.mathOperation[1],
              +this.value
            )
          : +this.value
        this.customValue = this.custom
      }
    },
    // 执行算术运算
    exeMathOperation(value) {
      if (this.field.mathOperation) {
        return this.fourArithmetic(
          this.field.mathOperation[0],
          this.field.mathOperation[1],
          value
        )
      }
    },
    // 对值进行四则运算的逆运算
    reverseFourArithmetic(symbol, value, result) {
      switch (symbol) {
        case '+':
          return result - value
        case '-':
          return result + value
        case '*':
          return result / value
        case '/':
          return result * value
      }
    },
    // 对值进行四则运算
    fourArithmetic(symbol, value, result) {
      switch (symbol) {
        case '+':
          return result + value
        case '-':
          return result - value
        case '*':
          return result * value
        case '/':
          return result / value
      }
    },
    //
    // 输入框改变
    inputChange(value) {
      this.customValue = value
      this.value = this.exeMathOperation(value) || value
    },
    // 自定义按钮改变
    customRadioChange(value) {
      this.showCustom = true
      this.commonValue = ''
      this.value = this.exeMathOperation(value) || value
    },
    // 普通按钮改变
    commonRadiochange(value) {
      this.showCustom = false
      this.customValue = ''
      this.value = value
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        chooseAll: true
      }
    },
    toFieldValue(value) {
      if (this.field.chooseAll && !value) {
        return 'all'
      }
      return value
    },
    fromFieldValue(value) {
      return value
    },
    // 友好值设置
    getFriendValue(value) {
      return this.enumDict[value]
        ? this.enumDict[value].text || this.enumDict[value].title
        : value
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical {
  display: flex;
  flex-direction: column;
  width: 100%;
  .el-radio {
    padding: 2px 0;
  }
}
</style>
