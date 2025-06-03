<template>
  <div>
    <ip-input
      class="textbox-widget"
      :disabled="field.readOnly"
      :value="value"
      :placeholder="field.placeholder"
      @on-change="onIpChange"
    ></ip-input>
    <template v-if="field.prepend" slot="prepend">{{ field.prepend }}</template>
    <template v-if="field.append" slot="append">{{ field.append }}</template>
  </div>
</template>

<script>
import IpInput from '@/components/IpInput/index.vue'
import WidgetMixin from './base.mixin'

export default {
  name: 'IpInputWidget',
  components: { IpInput },
  mixins: [WidgetMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    onIpChange(val) {
      this.value = val
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        placeholder: '',
        prepend: null, // 前置内容
        append: null // 后置内容
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
      input {
        border: 1px solid $error-color;
        background: transparentize($error-color, 0.8);
      }
    }
  }
}
</style>
