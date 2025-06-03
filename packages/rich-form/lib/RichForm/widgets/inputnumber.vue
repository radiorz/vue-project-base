<!--
  parseMaxOrMin: 是否解析最大最小值并在超出限制时自动重置为最大或最小值
  true：是
  false：否
  mathOperation：将值进行数值运算，如['*', 60] 表示将值乘以60返回给后端
-->
<template>
  <div>
    <!-- {{ value }}
    {{ customValue }}
    {{ customMinimum }} -->
    <el-input-number
      v-if="isMathOperation"
      v-model="customValue"
      class="inputnumber-widget"
      :step="field.step"
      :min="customMinimum"
      :max="customMaximum"
      :disabled="disabledFields.includes(field.name) || field.readOnly"
      :size="field.size"
      :step-strictly="field.stepStrictly"
      :precision="field.precision"
      :controls-position="field.position"
      @change="handleChange"
    ></el-input-number>
    <el-input-number
      v-else
      v-model="value"
      class="inputnumber-widget"
      :step="field.step"
      :min="minimum"
      :max="maximum"
      :disabled="disabledFields.includes(field.name) || field.readOnly"
      :size="field.size"
      :step-strictly="field.stepStrictly"
      :precision="field.precision"
      :controls-position="field.position"
      @change="handleChange"
    ></el-input-number>
  </div>
</template>

<script>
import { clone } from 'ramda'
import WidgetMixin from './base.mixin'

export default {
  name: 'InputNumberWidget',
  mixins: [WidgetMixin],
  data() {
    return {
      lastValue: 0
    }
  },
  computed: {
    isMathOperation() {
      return this.field.mathOperation && this.field.mathOperation.length > 0
    },
    minimum() {
      if (this.field?.parseMaxOrMin == false) return
      const { minimum, min } = this.field
      return minimum ?? min ?? undefined
    },
    customMinimum() {
      const result = this.field?.mathOperation
        ? this.reverseFourArithmetic(
            this.field.mathOperation[0],
            this.field.mathOperation[1],
            this.minimum
          )
        : this.minimum
      if (this.field.type === 'integer') {
        return result && Math.floor(result)
      }
      return result
    },
    customMaximum() {
      const result = this.field?.mathOperation
        ? this.reverseFourArithmetic(
            this.field.mathOperation[0],
            this.field.mathOperation[1],
            this.maximum
          )
        : this.maximum
      if (this.field.type === 'integer') {
        return result && Math.floor(result)
      }
      return result
    },
    maximum() {
      if (this.field.parseMaxOrMin === false) return
      const { maximum, max } = this.field
      return maximum ?? max ?? undefined
    }
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        if (this.field?.type === 'integer') {
          this.$emit('change', Math.floor(val))
        }
      }
      // 如果存在模板
      if (Object.keys(this.field).includes('additionTemplate')) {
        const maxIndex = Math.abs(this.value - this.lastValue)
        for (let index = 0; index < maxIndex; index++) {
          if (this.value - this.lastValue > 0) {
            this.field.enumDict.push(clone(this.field.additionTemplate))
          } else {
            this.field.enumDict.pop()
          }
        }
      }
      this.init(val)
    }
  },
  created() {
    if (this.field?.type === 'integer') {
      this.$emit('change', Math.floor(this.value))
    }
    this.init()
  },
  methods: {
    init(val = this.value) {
      this.lastValue = val
      if (this.isMathOperation) {
        this.customValue = this.reverseFourArithmetic(
          this.field.mathOperation[0],
          this.field.mathOperation[1],
          typeof this.value !== 'undefined'
            ? +this.value
            : this.field.default || this.minimum || 0
        )
      } else {
        this.customValue = val
      }
    },
    // 执行算术运算
    exeMathOperation(value) {
      if (typeof value === 'undefined') {
        return value
      }
      if (this.field.mathOperation) {
        return this.fourArithmetic(
          this.field.mathOperation[0],
          this.field.mathOperation[1],
          value
        )
      }
      return value
    },
    // 对值进行四则运算的逆运算
    reverseFourArithmetic(symbol, value, result) {
      if (typeof result === 'undefined') {
        return result
      }
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
    // 处理输入数据
    handleChange(value) {
      if (this.isMathOperation) {
        this.customValue = value
        this.value = this.exeMathOperation(value)
      } else {
        this.value = value
      }
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        minimum: undefined, // 支持jsonschema
        maximum: undefined,
        min: undefined, // min不应该有默认
        max: undefined, // max不应该有默认
        step: 1,
        precision: undefined, // 设置计数器最小值
        position: '', // 计数器增减按钮的位置, 默认"", 可设置为 "right"
        size: 'default',
        stepStrictly: false // 是否只能输入 step 的倍数
      }
    },
    // 获取值的转换
    toFieldValue(value) {
      if (typeof value !== 'number') {
        return 0
      }
      return value
    },
    fromFieldValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss" scoped></style>
