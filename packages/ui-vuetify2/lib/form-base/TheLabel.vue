<!--
 
/**
 * @author
 * @file TheLabel.vue
 * @fileBase TheLabel
 * @path packages\webapp\src\components\form\components\TheLabel.vue
 * @from 
 * @desc 
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<template>
  <div style="width: 7rem">
    <v-label>
      {{ _label }}
    </v-label>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'TheLabel',
  components: {},
  // filters:{},
  // mixins:[],
  props: {
    label: { type: String, default: '' }
  },
  computed: {
    _label() {
      return this.addColon(this.label)
    }
  },

  // 组件方法
  // watch:{},
  // created(){},
  methods: {
    addColon(v) {
      return v.endsWith(':') ? `${v}:` : v
    }
  }
}
</script>

<style lang="scss" scoped></style>
