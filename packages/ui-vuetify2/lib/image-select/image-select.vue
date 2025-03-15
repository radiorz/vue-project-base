<!--
  图片选择组件
-->
<template>
  <v-select
    hide-details
    solo
    v-bind="$attrs"
    v-on="$listeners"
    :items="items"
    dense
  >
    <template v-slot:item="{ item }">
      <v-img
        height="130px"
        width="340px"
        class="pa-2"
        contain
        :src="item.image"
      ></v-img>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'image-select',
  props: {
    items: { type: Array, default: () => [] }
  }
}
</script>
<style lang="scss" scoped></style>
