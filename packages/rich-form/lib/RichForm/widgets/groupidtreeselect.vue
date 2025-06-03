<!--

/**
 * @author
 * @file GroupIdTreeSelect.vue
 * @fileBase GroupIdTreeSelect
 * @path packages\web\src\common\ResourceManage\ResourceSelect\GroupIdTreeSelect.vue
 * @from
 * @desc 下拉显示树并支持多选的组件
 * @example
 */

-->

<script>
import Navigation from '@/common/ResourceManage/Navigation/index.vue'
import WidgetMixin from './base.mixin'
import ItemBar from './ItemBar.vue'

export default {
  name: 'GroupIdTreeSelect',
  components: {
    ItemBar,
    Navigation
  },
  mixins: [WidgetMixin],
  props: {
    // // 树的数据
    // treeData: {
    //   type: Array,
    //   default: () => []
    // },
    // 值
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: 'default',
      // 控制弹出框显示隐藏
      visible: false,
      // 存储选中的节点 key
      checkedNodes: []
    }
  },
  computed: {
    friendValue() {
      return this.getFriendValue()
    },
    checkedKeys() {
      return this.checkedNodes.map((node) => node.id)
    }
  },
  watch: {
    checkedNodes(newVal) {
      this.$emit(
        'input',
        newVal.map((node) => node.groupId)
      )
    }
  },
  methods: {
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      return value
    },
    // 设置友好值
    getFriendValue() {
      if (!this.value) return this.value || ''
      if (!this.checkedNodes?.length) return this.value || ''
      return this.value.map((_value) => {
        const node = this.checkedNodes.find((_node) => _node.groupId === _value)
        return node?.title
      })
    },
    // 处理节点选中状态变化
    handleCheckChange(checkedNodes) {
      // console.log('表单选择区域分组数据', checkedNodes, data)
      // this.checkedKeys = checkedNodes
      this.checkedNodes = checkedNodes
    },
    // 关闭弹出框
    closePopover() {
      this.visible = false
    }
  }
}
</script>

<template>
  <div class="">
    <el-popover
      v-model="visible"
      placement="bottom-start"
      trigger="click"
      @hide="closePopover"
    >
      <!-- 树选择 -->
      <div class="dropdown-tree">
        <Navigation
          ref="nav_tree"
          class="nav_tree"
          :title="$t('resourceOrganize.resPosition')"
          :name="name"
          :addable="false"
          :deletable="false"
          :editable="false"
          :is-show-cascade="false"
          :checkable="true"
          :selected-nodes.sync="checkedKeys"
          @currentCheckedNodes="handleCheckChange"
        />
      </div>
      <template slot="reference">
        <!-- <el-input clearable  :value="friendValue" placeholder="请选择分组" readonly>
          <template slot="append">
            <i class="el-icon-arrow-down"></i>
          </template>
        </el-input> -->
        <div>
          <ItemBar
            v-model="checkedNodes"
            label-key="title"
            value-key="groupId"
            :disabled="disabled"
          ></ItemBar>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-tree {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
}
</style>
