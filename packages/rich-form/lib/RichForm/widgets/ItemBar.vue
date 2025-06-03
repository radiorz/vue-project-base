<!--

/**
 * @author
 * @file ItemBar.vue
 * @fileBase ItemBar
 * @path packages\web\src\components\RichForm\widgets\ItemBar.vue
 * @from
 * @desc
 * @example
 */

-->

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemBar',
  // components: {},
  props: {
    value: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'title'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  data() {
    return {}
  },
  // computed:{},
  // watch:{},
  // created(){},
  methods: {
    clean() {
      if (this.disabled) {
        return
      }
      this.$emit('input', [])
    },
    removeItem(item) {
      this.$emit(
        'input',
        this.value.filter(
          (_item) => item[this.valueKey] !== _item[this.valueKey]
        )
      )
    }
  }
})
</script>

<template>
  <div class="ItemBar" v-bind="$attrs">
    <el-tag
      v-for="item in value"
      :key="item[valueKey]"
      class="select-tag"
      :closable="!disabled"
      @close="removeItem(item)"
      >{{ item.title }}
    </el-tag>
    <!-- <el-tag
      v-for="(res, resName) in chosenRes"
      :key="resName"
      class="select-tag"
      :closable="!disabled"
      type="success"
      @close="removeItem(resName)"
      >{{ res.fullname }}
    </el-tag> -->
    <i
      v-show="value"
      class="el-icon-circle-close"
      @click.prevent.stop="clean"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
.ItemBar {
  display: flex;
  flex-grow: 1;
  width: 200px;
  max-width: 100%;
  flex-wrap: wrap;
  min-height: 36px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 4px 20px 0px 4px;
  position: relative;
  transition: 0.3s;
  &:hover {
    border: 1px solid #ccc;
  }
  .select-tag {
    margin: 0 4px 4px 0;
  }
  .el-icon-circle-close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    color: #ccc;
    cursor: pointer;
  }
}
</style>
