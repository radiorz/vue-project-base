<!-- 
     组织选择器
 -->
<template>
  <div class="selectorg-widget">
    <OrgSelector
      ref="selectorgTree"
      @currentCheckedNodes="onCurrentCheckedNodes"
      :disabled="field.readOnly"
    />
  </div>
</template>

<script>
import OrgSelector from '@/common/OrganizeManage/OrgSelector/dropdown.vue'
import { forEachTree } from '@/utils/tree'

import mixin from './base.mixin'

export default {
  name: 'SelectOrg',
  components: {
    OrgSelector
  },
  mixins: [mixin],
  data() {
    return {}
  },
  computed: {},
  async created() {
    // 回填数据
    if (this.value?.length) {
      await this.$nextTick()
      this.$refs.selectorgTree.currentCheckedNodes = this.value
    }
  },
  watch: {
    value(value) {
      // const treeData =
      //   this.$refs.selectorgTree.$refs.orgTree.$refs.orgTree.$refs.tree.data
      // const newCurrentCheckedNodes = []
      // forEachTree(
      //   {
      //     children: treeData
      //   },
      //   (node, level, parent) => {
      //     if (Array.isArray(value)) {
      //       if (value.includes(node.id)) {
      //         newCurrentCheckedNodes.push(node)
      //       }
      //     }
      //   },
      //   { idName: 'id', allowAbort: true }
      // )
      // this.$refs.selectorgTree.nodeArr = newCurrentCheckedNodes
      // this.$refs.selectorgTree.$refs.orgDropdownSelect.$refs.orgTree.$refs.tree.setCheckedKeys(
      //   value
      // )
    }
  },
  methods: {
    toFieldValue(value) {
      return value
    },

    onCurrentCheckedNodes(nodes) {
      const idArr = []
      if (nodes.length > 0) {
        nodes.forEach((node) => {
          idArr.push({ id: node.id, type: node.type, title: node.title })
        })
      }
      // 如果选择的不是资源实例，只传资源类型的type 后端会去找该资源类型下的所有设备
      if (idArr[0]?.id === idArr[0]?.type) {
        this.value = [{ type: idArr[0]?.type }]
      } else {
        this.value = idArr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selectorg-widget {
  width: 100%;
}
</style>
