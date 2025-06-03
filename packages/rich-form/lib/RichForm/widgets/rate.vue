<template>
  <el-rate
    v-model="value"
    class="rate-widget"
    :disabled="field.readOnly"
    :colors="field.colors"
    :allow-half="field.allowHalf"
    :show-text="field.showText"
    :show-score="field.showScore"
    :max="field.max"
    :texts="field.texts"
    :icon-classes="field.iconClasses"
    :void-color="field.voidColor"
    :disabled-void-color="field.disabledVoidColor"
  ></el-rate>
</template>

<script>
import mixin from './base.mixin'

export default {
  name: 'RateWidget',
  mixins: [mixin],
  methods: {
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        readOnly: false,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        allowHalf: false,
        showText: false,
        showScore: false,
        max: 5,
        texts: ['极差', '失望', '一般', '满意', '惊喜'],
        iconClasses: [
          'icon-rate-face-1',
          'icon-rate-face-2',
          'icon-rate-face-3'
        ],
        // // 等同于 iconClasses: { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
        voidColor: '#C6D1DE',
        disabledVoidColor: '#EFF2F7'
      }
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      return value
    },
    // 当value变化时设置传递到父组件的value
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
