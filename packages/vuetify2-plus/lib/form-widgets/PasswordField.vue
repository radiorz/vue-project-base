<!--
* @FileDescription: 继承了 v-text-field 的属性
* @Date: 2022年04月26日 14:56:51
* TODO:
* [] Demo
-->

<template>
  <v-text-field
    v-bind="computedProps"
    :append-icon="appendIcon"
    @click:append="handleRevealed"
    v-on="$listeners"
  ></v-text-field>
</template>

<script>
import { VTextField } from 'vuetify/lib'

export default {
  name: 'PasswordField',
  extends: VTextField,
  // filters:{},
  // mixins:[],
  // props: {},
  data() {
    return {
      revealed: false
    }
  },
  computed: {
    type() {
      return this.revealed ? 'text' : 'password'
    },
    appendIcon() {
      return this.revealed ? 'mdi-eye' : 'mdi-eye-off'
    },
    computedProps() {
      return {
        ...this.$props,
        type: this.type
      }
    }
  },
  // watch:{},
  // created(){},
  methods: {
    handleRevealed() {
      this.revealed = !this.revealed
    }
  }
}
</script>
<style lang="scss" scoped></style>
