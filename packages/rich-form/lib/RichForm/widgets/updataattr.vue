<!--
  与通用版本相比修改了getAttrs方法和readOnly
 -->
<template>
  <div class="device-updataAttr">
    <div class="device-type" @click="triggerPop">
      <label for="">设备类型：</label>
      <el-input
        style="width: 250px"
        :value="deviceTitle"
        :suffix-icon="visible ? `el-icon-arrow-up` : `el-icon-arrow-down`"
        placeholder="请选择设备类型"
        @input="searchDeviceType"
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
          :lazy="false"
          @nodeclick="nodeclick"
        />
      </PerfectScrollbar>
    </el-popover>
    <div v-if="deviceType">
      <div v-if="field.readOnly" class="block-div"></div>
      <div v-if="controllers.length === 0" class="defalut-add-button">
        <i class="el-icon-circle-plus" @click="addController"></i>
      </div>
      <div
        v-for="(controller, index) in controllers"
        :key="index"
        class="controller-item"
      >
        <template>
          <el-dropdown
            placement="bottom-start"
            @command="(command) => selectAttr(command, index)"
          >
            <span class="el-dropdown-link">
              {{ getAttrName(controller.tasks[0].name) }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <PerfectScrollbar style="height: 300px">
                <el-dropdown-item
                  v-for="(attr, index) in attrs"
                  :key="attr.name + index"
                  :command="{
                    name: attr.name,
                    type: attr.type,
                    title: attr.title
                  }"
                >
                  {{ attr.title }}
                </el-dropdown-item>
              </PerfectScrollbar>
            </el-dropdown-menu>
          </el-dropdown>
          <template v-if="controller.tasks[0].name">
            <el-switch
              v-if="typeof controller.tasks[0].value === 'boolean'"
              v-model="controller.tasks[0].value"
              active-color="#13ce66"
              @change="updatedController"
            ></el-switch>
            <MyInput
              v-else
              :value="controller.tasks[0].value"
              placeholder="请输入值"
              @change="(value) => onFieldInputChange(value, controller)"
            ></MyInput>
          </template>
        </template>
        <!-- 添加删除 -->
        <div class="item-controller">
          <div class="actions">
            <i class="el-icon-circle-plus" @click="addController(index)"></i>
            <i class="el-icon-error" @click="checkDeleteController(index)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remove, insert, clone } from 'ramda'
import { get } from 'vuex-pathify'
import { isEmpty, eachTree } from 'xe-utils'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import cron from '@/common/vue-cron/index.vue'
import MyInput from '@/components/Input/index.vue'
import RichForm from '@/components/RichForm/index.vue'
import ResourceSelect from '@/common/ResourceManage/ResourceSelect/index.vue'
import unflattenObj from '@/utils/unflattenObj'
import flattenObj from '@/utils/fattenObj'
import { getDeviceMeta } from '@/api/devices/manage-devices'
import mixin from './base.mixin'

const DEFAULT_CONTROLLER_TEST = {
  deviceType: '',
  tasks: [{ type: 'attr' }]
}
export default {
  name: 'UpdateAttrWidget',
  components: { cron, ResourceSelect, RichForm, PerfectScrollbar, MyInput },
  mixins: [mixin],
  data() {
    return {
      controllers: [{ ...DEFAULT_CONTROLLER_TEST }],
      currentIndex: 0,
      expandedLevel: 0,
      visible: false, // 树的显示
      deviceTitle: '', // 类型标题
      deviceType: '', // 设备类型
      attrs: [], // 设备属性
      deviceSchema: {}
    }
  },
  computed: {
    language: get('my/language')
  },
  watch: {
    controllers: {
      deep: true,
      handler(newVal) {
        this.value = newVal.map((val) => {
          const newTasks = val.tasks.map((task) => {
            const newTask = { ...task }
            if (newTask.type === 'attr' && newTask.name) {
              const nameArr = newTask.name.split('.')
              if (nameArr.length > 1) {
                newTask.name = nameArr[0]
                nameArr.shift()
                newTask.value = unflattenObj({
                  [nameArr.join('.')]: newTask.value
                })
              }
            }
            return newTask
          })
          return { ...val, tasks: newTasks }
        })
      }
    },
    deviceType(val) {
      this.controllers = [{ deviceType: '', tasks: [{ type: 'attr' }] }]
      this.controllers[0].deviceType = val
    }
  },
  created() {},
  async mounted() {
    if (Array.isArray(this.value)) {
      this.deviceType = this.value[0].deviceType
      this.deviceSchema = await this.getDeviceMeta(this.deviceType)
      const attrs = this.getAttrs(
        Object.values(this.deviceSchema.attrs.properties)
      )
      this.attrs = Array.isArray(attrs) ? attrs : []
      // 找到设备类型对应的title显示
      eachTree(this.$refs.resTree.resTypes[0]?.children, (nodes) => {
        if (nodes.type === this.deviceType) {
          this.deviceTitle = nodes.title
        }
      })
      this.controllers = this.value.map((val) => {
        const newTasks = val.tasks.map((task) => {
          const newTask = { ...task }
          if (newTask.type === 'attr' && typeof newTask.value === 'object') {
            const flattenVal = flattenObj({ [newTask.name]: newTask.value })
            const newVal = Object.values(flattenVal)[0]
            const newName = Object.keys(flattenVal)[0]
            newTask.name = newName
            newTask.value = `${newVal}`
          }
          return newTask
        })
        return { ...val, tasks: newTasks }
      })
    }
  },
  methods: {
    // 搜索
    searchDeviceType(e) {
      this.deviceTitle = e
    },
    // 开关
    triggerPop() {
      this.visible = !this.visible
    },
    // 关闭
    closePop() {
      this.visible = false
    },
    // 节点
    async nodeclick(node) {
      const { data } = node
      this.deviceTitle = data.title
      this.deviceType = data.type
      this.closePop()
      this.deviceSchema = await this.getDeviceMeta(this.deviceType)
      const { properties } = this.deviceSchema.attrs
      // 过滤readeOnly属性为true的属性
      Object.keys(properties).filter((item) => {
        if (properties[item].readOnly) {
          delete properties[item]
        }
      })
      const attrs = this.getAttrs(Object.values(properties))
      this.attrs = Array.isArray(attrs) ? attrs : []
    },
    // 获取设备的详细信息
    async getDeviceMeta(type) {
      try {
        const res = await getDeviceMeta(type)
        if (res.status === 'success') {
          return res.payload
        }
      } catch (e) {
        logger.error(`get device ${type} meta fail ${e}`)
      }
    },
    onFieldInputChange(value, controller) {
      controller.tasks[0].value = value
      this.updatedController()
    },
    onActionFieldChange(name, value, controller) {
      controller.tasks[0].params = {
        ...controller.tasks[0].params,
        [name]: value
      }
      this.updatedController()
    },
    updatedController() {
      this.controllers = [...this.controllers]
    },
    getAttrName(name) {
      let attrName = ''
      if (!name) {
        attrName = '请选择属性值'
      } else {
        let schema = this.deviceSchema.attrs.properties
        const nameArr = name.split('.')
        nameArr.forEach((key, index) => {
          if (index === nameArr.length - 1) {
            if (schema[key]) {
              attrName = schema[key]?.title
            }
          } else if (schema[key].type == 'array') {
              schema = schema[key]?.items.properties
            } else {
              schema = schema[key]?.properties
            }
        })
      }
      return attrName
    },
    // @ params {array}
    getAttrs(properties) {
      const attrs = []
      function getPro(pros, items = { name: '', title: '' }) {
        pros.forEach((property) => {
          // 根据字段来判断是否递归深层
          // if(property.xxx){
          //   attrs.push(property)
          // }else
          if (
            property.properties &&
            !isEmpty(property.properties) &&
            property.name
          ) {
            const newProperties = Object.values(property.properties)
            const newAttrs = newProperties.map((item) => {
              const newItem = { ...item }
              newItem.name = `${property.name}.${item.name}`
              newItem.title = `${property.title} ${item.title}`
              return newItem
            })
            getPro(newAttrs)
            // 新增对于是数组类型的判断
          } else if (['array'].includes(property.type.toLowerCase())) {
            if (!isEmpty(property?.items?.properties)) {
              getPro(Object.values(property.items.properties), property.items)
            }
          } else if (
            !property.type ||
            !['object', 'array'].includes(property.type.toLowerCase())
          ) {
            if (property.name) {
              if (items.name) {
                const arrayProperty = clone(property)
                arrayProperty.name = `${items.name}.${property.name}`
                arrayProperty.title = `${items.title} ${property.title}`
                attrs.push(arrayProperty)
              } else {
                attrs.push(property)
              }
            }
          }
        })
      }
      getPro(properties)

      return attrs
    },
    selectAttr(attr, index) {
      const controllerExecute = this.controllers[index].tasks[0]
      controllerExecute.name = attr.name
      if (attr.type === 'boolean') {
        controllerExecute.value = false
      } else {
        controllerExecute.value = ''
      }
      this.updatedController()
    },
    selectTask(command, index) {
      this.controllers[index].tasks = [{ type: command }]
    },
    async onCronClick(index) {
      this.currentIndex = index
      await this.$nextTick()
      this.isShowCron = true
    },
    checkDeleteController(index) {
      this.$confirm(
        this.$t('common.checkDelete').params(
          this.getAttrName(this.controllers[index].tasks[0].name)
        ),
        {
          type: 'warning'
        }
      )
        .then(() => {
          this.controllers = remove(index, 1)(this.controllers)
        })
        .catch((e) => {})
    },
    addController(index = -1) {
      const DEFAULT_CONTROLLER = {
        deviceType: '',
        tasks: [{ type: 'attr' }]
      }
      this.controllers = insert(index + 1, { ...DEFAULT_CONTROLLER })(
        this.controllers
      )
    },
    changeCron(val) {
      this.controllers[this.currentIndex].cron = val
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
.device-updataAttr {
  .choosen-devices-type {
    display: block;
    margin: 0 0 10px 70px;
  }
  .resource-select {
    height: 250px;
    .resource_tree {
      height: 250px;
    }
  }
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
  .controller-item {
    display: flex;
    align-items: center;
    margin-top: 6px;
    width: 70%;
    & > div {
      margin-right: 10px;
      // text-align: center;
      // flex: 5;
    }
    .el-input {
      width: 150px;
    }
    .item-controller {
      display: flex;
      flex: 1;
      align-items: center;
      // justify-content: flex-end;
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
