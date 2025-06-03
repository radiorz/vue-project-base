<!--  
    默认简单分组
    
-->
<template>
  <div
    :class="[
      'group',
      { 'active-design-item': design && groupItem.isClicked },
      { 'design-dashed': design }
    ]"
    :name="name"
    :style="{}"
  >
    <div
      v-if="title"
      class="header vborder-1 bottom"
      :style="headerStyle ? headerStyle : {}"
      @click="toggle"
    >
      <span
        class="title"
        :style="{ color: theme }"
        @click="onClickedItem(groupItem)"
      >
        <svg-icon v-if="icon" :icon-class="icon"></svg-icon>
        {{ title }}
      </span>
      <!-- 顶部工具按钮 -->
      <form-actions
        v-if="topActions.length > 0"
        :actions="topActions"
        :form="form"
      ></form-actions>
      <i :class="isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
    </div>
    <div
      :class="[
        'layout',
        {
          'design-grid-layout':
            !title && design && Object.keys(groupItem).includes('designId')
        }
      ]"
    >
      <!-- 删栏布局全局选中区域 -->
      <div
        class="design-gird-clicked-area"
        @click="onClickedItem(groupItem)"
      ></div>
      <layout
        :fields="fields"
        :form="form"
        :form-schema="formSchema"
        :values="values"
        :options="layoutOptions"
        :design="design"
        :class="{
          inline: inline,
          wrap: inline && wrap,
          'form-design-perch': design
        }"
        @mounted="onLayoutMounted"
      ></layout>
    </div>
    <form-actions
      v-if="bottomActions.length > 0"
      :actions="bottomActions"
      :form="form"
    ></form-actions>
    <!--拖拽-->
    <span
      v-if="design && groupItem.isClicked"
      class="design-draggable design-handle-move"
    >
      <i class="el-icon-rank design-handle-move"></i>
    </span>
    <!--复制-->
    <span
      v-if="design && groupItem.isClicked"
      class="design-copy"
      @click="onCopyItem(groupItem)"
    >
      <i class="el-icon-document-copy"></i>
    </span>
    <!--删除-->
    <span
      v-if="design && groupItem.isClicked"
      class="design-delete"
      @click="onDeleteItem(groupItem)"
    >
      <i class="el-icon-delete"></i>
    </span>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import eventbus, { RichFormHeaderIconClick } from '@/eventbus'
import FormActions from '../actions.vue'
import DragMixin from '../design/widgets/design.mixin'

export default {
  name: 'FieldGroup',
  components: { FormActions },
  mixins: [DragMixin],
  props: {
    name: { type: String, default: '' }, // 组名称
    values: { type: Object, default: () => ({}) },
    form: { type: Object, default: () => ({}) },
    formSchema: { type: Object, default: () => ({}) },
    icon: { type: String, default: '' }, // 图标
    inline: Boolean,
    wrap: Boolean,
    grow: { type: Number },
    labelWidth: String, // 覆盖全局的labelWidth
    headerStyle: Object,
    expand: { type: Boolean, default: true }, // 是否展开
    title: String, // 组标题，用来显示
    fields: { type: Array, default: () => [] },
    actions: { type: Array, default: () => [] },
    design: { type: Boolean, default: false }, // 开启设计模式
    groupItem: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      isExpand: true
    }
  },
  computed: {
    isLight: get('my/light'),
    theme: get('my/theme'),
    layoutOptions() {
      return {
        labelWidth: this.labelWidth
      }
    },
    topActions() {
      return this.actions.filter((action) => action.at === 'top')
    },
    bottomActions() {
      return this.actions.filter((action) => action.at !== 'top')
    }
  },

  beforeCreate() {
    // 不能使用import
    this.$options.components.Layout = require('../layout.vue').default
  },
  mounted() {},
  methods: {
    onLayoutMounted() {
      if (this.expand === false) {
        this.toggle()
      }
    },
    // 展开或折叠分组内容
    toggle() {
      $(this.$el)
        .children('.layout')
        .slideToggle('fast', () => {
          this.isExpand = !this.isExpand
        })
    }
  }
}
</script>

<style lang="scss">
.group {
  position: relative;
  .grid-clicked-area {
    display: inline-block;
    width: 27px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 3px;
    bottom: 3px;
    box-sizing: border-box;
    z-index: 99;
    background: #fff;
    cursor: pointer;
    text-align: center;
    color: #f00;
  }
}
</style>
