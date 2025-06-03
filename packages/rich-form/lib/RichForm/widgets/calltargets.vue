<template>
  <div class="call-targets">
    <div v-if="callTargets.length === 0" class="defalut-add-button">
      <i class="el-icon-circle-plus" @click="addTarget"></i>
    </div>
    <div
      v-for="(target, index) in callTargets"
      :key="index"
      class="target-item"
    >
      <label>{{ $t('richform.target_name').params(index + 1) }}</label>
      <el-input
        style="margin-right:8px"
        v-model="target.title"
        :size="form.size"
        :clearable="true"
      ></el-input>
      <label>{{ $t('richform.target_number').params(index + 1) }}</label>
      <el-input
        v-model="target.number"
        :size="form.size"
        :clearable="true"
      ></el-input>

      <div class="item-target">
        <div class="actions">
          <i class="el-icon-circle-plus" @click="addTarget(index)"></i>
          <i class="el-icon-error" @click="checkDeleteTarget(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remove, insert } from 'ramda'
import mixin from './base.mixin'

const DEFAULT_TARGET = {
  // 呼叫目标名称
  title: '',
  // 呼叫目标号码
  number: ''
}
export default {
  name: 'CallTargets',
  mixins: [mixin],
  data() {
    return {
      callTargets: [{ ...DEFAULT_TARGET }]
    }
  },
  watch: {
    callTargets: {
      handler(newVal) {
        this.value = newVal
      },
      deep: true
    }
  },
  mounted() {
    if (Array.isArray(this.value)) {
      this.callTargets = this.value
    }
  },
  methods: {
    checkDeleteTarget(index) {
      this.$confirm(
        this.$t('richform.checkDelete').params(
          this.$t('richform.target').params(index + 1)
        ),
        {
          type: 'warning'
        }
      )
        .then(() => {
          this.callTargets = remove(index, 1)(this.callTargets)
        })
        .catch((e) => {})
    },
    addTarget(index = -1) {
      this.callTargets = insert(index + 1, { ...DEFAULT_TARGET })(
        this.callTargets
      )
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      return value
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      return value
    },
    // 设置友好值
    getFriendValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss">
.call-targets {
  .block-div {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
  }
  .defalut-add-button {
    text-align: right;
    i {
      margin-right: 20px;
      font-size: 30px;
    }
    i:hover {
      color: #409eff;
    }
  }
  .target-item {
    display: flex;
    align-items: center;
    margin-top: 6px;
    & > div {
      margin-left: 10px;
      text-align: center;
      flex: 4;
    }
    .el-input {
      width: 150px;
    }
    .item-target {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      .actions {
        i {
          margin-left: 8px;
          font-size: 18px;
        }
        i:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
