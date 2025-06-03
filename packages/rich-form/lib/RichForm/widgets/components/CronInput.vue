<!--

/**
 * @author
 * @file CronInput.vue
 * @fileBase CronInput
 * @path packages\web\src\components\RichForm\widgets\components\CronInput.vue
 * @from
 * @desc
 * @example
 */

-->

<script>
import { defineComponent } from 'vue'
import cron from '@/common/vue-cron/index.vue'
import { get } from 'vuex-pathify'

export default defineComponent({
  name: 'CronInput',
  components: {
    cron
  },
  props: {
    value: {
      type: String,
      default: '* * * * * ? *'
    }
  },
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  // setup(props, ctx) {},
  data() {
    return {
      visible: false
    }
  },
  computed: { language: get('my/language') },
  watch: {
    value: {
      async handler(newVal) {
        if (!newVal) {
          return
        }
        await this.$nextTick()
        this.$refs.vueCron.giveCron(newVal)
      },
      // deep: true,
      immediate: true
    }
  },

  methods: {
    changeCron(value) {
      this.$emit('change', value)
    }
  }
})
</script>

<template>
  <div class="cron-input">
    <el-popover
      v-model="visible"
      class="cron-popover"
      trigger="click"
      placement="bottom"
    >
      <template #reference>
        <el-input
          slot="reference"
          readonly
          :value="value"
          placeholder="请输入定时策略"
        ></el-input>
      </template>
      <cron
        ref="vueCron"
        :data="value"
        :i18n="language === 'zh-cn' ? 'cn' : 'en'"
        @change="changeCron"
        @close="() => (visible = false)"
      ></cron>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.cron-input {
}
</style>
