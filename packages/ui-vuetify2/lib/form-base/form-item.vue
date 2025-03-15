<template>
  <div
    class="form-item dense align-center"
    :class="labelPosition === 'left' ? 'label-left d-inline-flex' : 'label-top'"
  >
    <div
      class="label"
      :style="{ width: labelPosition === 'left' ? width : '100%' }"
      :title="label"
    >
      {{ label }} :
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'form-item',
  props: {
    label: { type: String, default: '' },
    width: { type: String, default: '6rem' }
  },
  inject: {
    getLabelPosition: {
      default: () => () => 'left'
    }
  },
  computed: {
    labelPosition() {
      return this.getLabelPosition()
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item {
  width: 100%;
  display: inline-block;
  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.label-left {
  height: 60px;
}
.label-top {
  padding: 0.5rem 0;
  div {
    margin-bottom: 0.5rem;
  }
}
</style>
