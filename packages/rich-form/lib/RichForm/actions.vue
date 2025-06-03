<template>
  <div class="actions">
    <template v-for="(action, index) of leftActions">
      <el-button
        v-if="action.visible != false"
        :key="index"
        :type="action.type"
        :size="action.size || form.size"
        :native-type="getButtonType(action)"
        @click="onActionClick(action, $event)"
      >
        <i v-if="action.icon" :class="action.icon"></i> {{ action.title }}
      </el-button>
    </template>
    <div class="right">
      <template v-for="(action, index) of rightActions">
        <el-button
          v-if="action.visible != false"
          :key="index"
          :type="action.type"
          :size="action.size || form.size"
          :native-type="getButtonType(action)"
          @click="onActionClick(action, $event)"
        >
          <i v-if="action.icon" :class="action.icon"></i> {{ action.title }}
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
import eventbus from './eventbus'

export default {
  name: 'RichFormActions',
  props: {
    actions: Array,
    form: Object
  },
  data() {
    return {}
  },
  computed: {
    leftActions() {
      return this.actions.filter((action) => action.right != true)
    },
    rightActions() {
      return this.actions.filter((action) => action.right == true)
    }
  },
  methods: {
    getButtonType(action) {
      return action.submit ? 'submit' : action.reset ? 'reset' : 'button'
    },
    onActionClick(action, event) {
      eventbus.$emit(`${this.form.id}:action`, action)
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped></style>
