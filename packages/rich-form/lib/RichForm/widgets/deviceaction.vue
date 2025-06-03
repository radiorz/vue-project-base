<!--
  与通用版本相比修改了getAttrs方法和readOnly
 -->
<template>
  <div class="device-action">
    <div class="device-type" @click="triggerPop">
      <label for="">设备类型：</label>
      <el-input
        style="width: 250px"
        :value="deviceTitle"
        :suffix-icon="visible ? `el-icon-arrow-up` : `el-icon-arrow-down`"
        placeholder="请选择设备类型"
      ></el-input>
    </div>

    <!-- 选择设备类型 -->
    <el-popover
      v-model="visible"
      trigger="manual"
      class="choosen-devices-type"
      placement="bottom"
      width="250"
    >
      <PerfectScrollbar class="resource-select">
        <!-- 资源树 -->
        <ResourceSelect
          ref="resTree"
          show-mark
          :checkable="false"
          :is-show-bar="false"
          class="resource_tree"
          :expanded-level="expandedLevel"
          loaded-res-types="device"
          :show-filterbar="false"
          :showFilterType="true"
          :lazy="false"
          @nodeclick="nodeclick"
        />
      </PerfectScrollbar>
    </el-popover>

    <!-- 选择动作 -->
    <div class="chose-action">
      <label for="">动作：</label>
      <el-select
        filterable
        v-model="choseAction"
        class="select-action"
        placeholder="请选择动作"
      >
        <el-option
          v-for="action in deviceActions"
          :key="action.name"
          :label="action.title"
          :value="action.name"
          >{{ action.title }}
        </el-option>
      </el-select>
    </div>
    <!-- 不同动作对应不同的表单 -->
    <div class="rich-form">
      <RichForm
        v-if="
          schemaParams &&
          choseAction !== 'proxyOn' &&
          choseAction !== 'proxyOff'
        "
        auto-form
        :values="actionsValue"
        :schema="schemaParams"
        style="width: 330px"
      />
      <RichForm
        v-if="
          schemaParams &&
          (choseAction === 'proxyOn' || choseAction === 'proxyOff')
        "
        :form="formParams"
        :values="actionsValue"
        :schema="schemaParams"
        :form-style="{ padding: '0 20px', ...formStyle }"
      />
    </div>
  </div>
</template>

<script>
import { isEmpty, eachTree } from 'xe-utils'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import RichForm from '@/components/RichForm/index.vue'
import { getDeviceInfo } from '@/api/devices'
import ResourceSelect from '@/common/ResourceManage/ResourceSelect/index.vue'
import mixin from './base.mixin'

export default {
  name: 'Deviceaction',
  props: {
    formStyle: { type: Object, default: () => ({}) }
  },
  components: { RichForm, PerfectScrollbar, ResourceSelect },
  mixins: [mixin],
  data() {
    return {
      visible: false, // 选择设备显示隐藏
      deviceVisible: false, // 选择托管主机
      expandedLevel: 0, // 展开节点
      deviceType: '', // 设备类型
      deviceTitle: '', // 设备名称
      proxyId: '', // 托管主机id
      proxyTitle: '', // 托管主机标题
      choseAction: '', // 选中的动作
      deviceActions: [], // 设备动作列
      actionsValue: {}, // 动作值
      formParams: {
        layout: [
          {
            name: 'host',
            title: '托管主机',
            widget: 'selectdevicetree',
            history: {
              enabled: true,
              storage: 'local',
              key: ''
            }
          }
        ]
      }
    }
  },
  computed: {
    schemaParams() {
      // 如果为空，则不需要渲染表单
      if (
        !isEmpty(this.deviceActions[this.choseAction]?.paramSchema.properties)
      ) {
        return this.deviceActions[this.choseAction]?.paramSchema
      }
    }
  },
  watch: {
    deviceType(newVal) {
      this.value = {
        ...this.value,
        deviceType: newVal
      }
      this.choseAction = ''
      this.getDeviceActions(newVal)
    },
    choseAction(newVal) {
      // 判断是新增和动作是开关托管
      if (
        (newVal === 'proxyOn' || newVal === 'proxyOff') &&
        !this.value?.params
      ) {
        this.actionsValue = { host: {} }
      }
      this.value = {
        ...this.value,
        deviceType: this.deviceType,
        action: newVal
      }
    },
    actionsValue: {
      deep: true,
      handler(newVal) {
        this.value = {
          ...this.value,
          params: newVal
        }
      }
    }
  },
  async mounted() {
    if (this.value?.deviceType) {
      await this.getDeviceActions(this.deviceType)
      // 赋值
      this.choseAction = this.deviceActions[this.value.action].name
      this.actionsValue = this.value.params
      // 找到设备类型对应的title显示
      eachTree(this.$refs.resTree.resTypes[0]?.children, (nodes) => {
        if (nodes.type === this.deviceType) {
          this.deviceTitle = nodes.title
        }
      })
    }
  },
  methods: {
    // 获取设备动作
    async getDeviceActions(type) {
      try {
        const { status, payload } = await getDeviceInfo(type, {
          category: 'actions'
        })
        if (status === 'success') {
          this.deviceActions = payload
        }
      } catch (e) {
        this.deviceActions = []
        logger.error(`获取设备的动作失败:${e}`)
      }
    },
    // 节点
    nodeclick(node) {
      const { data } = node
      this.deviceTitle = data.title
      this.deviceType = data.type
      this.closePop()
    },
    // 选择设备
    selectDevice(data) {
      // 选择的必须是设备
      if (data.data.sn) {
        this.proxyId = data.data.id
        this.proxyTitle = data.data.title
        // 设备选择隐藏
        this.deviceVisible = false
        // 选择设备后，赋值id和type
        this.$set(this.actionsValue.host, 'id', data.data.id)
        this.$set(this.actionsValue.host, 'type', data.data.type)
      }
    },
    // 选择动作
    selectAction(action) {
      this.choseAction = action
    },
    // 开关
    triggerPop() {
      this.visible = !this.visible
    },
    // 关闭
    closePop() {
      this.visible = false
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    // 对应字段为 field
    defaultSchema() {
      return {
        placeholder: '',
        readOnly: this.form.readOnly,
        isNeedValidate: false
      }
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      this.deviceType = value?.deviceType
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

<style lang="scss" scoped>
.device-action {
  .device-type {
    display: flex;
    align-items: center;
    label {
      font-weight: bold;
    }
  }
  .chose-action {
    display: flex;
    align-items: center;
    label {
      font-weight: bold;
      margin-left: 29px;
    }
  }
  .choosen-devices-type {
    display: block;
    margin: 0 0 10px 70px;
  }
  .select-action {
    width: 250px;
  }
  .resource-select {
    height: 250px;
    .resource_tree {
      height: 250px;
    }
  }
  .rich-form {
    margin-top: 5px;
    width: 100%;
    height: 200px;
    border: 1px dotted #ccc;
  }
}
</style>
