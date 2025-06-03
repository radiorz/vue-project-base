<!--
  与通用版本相比修改了getAttrs方法和readOnly
 -->
<template>
  <div class="device-timing-controller">
    <div v-if="field.readOnly" class="block-div"></div>
    <div v-if="controllers.length === 0" class="defalut-add-button">
      <i class="el-icon-circle-plus" @click="addController"></i>
    </div>

    <div
      v-for="(controller, index) in controllers"
      :key="index"
      class="controller-item"
    >
      <!-- -->
      <ScheduleTask
        v-model="controllers[index]"
        :attrs="attrs"
        :device-actions="deviceActions"
        :form="form"
      ></ScheduleTask>
      <div class="item-value">
        <span>{{ $t('common.enable') }}：</span>
        <!-- 启用禁用 -->
        <el-switch v-model="controllers[index].enabled" active-color="#13ce66"></el-switch>
        <!-- 动作 -->
        <div class="actions">
          <!-- 添加一行 -->
          <i class="el-icon-circle-plus" @click="addController(index)"></i>
          <!-- 删除一行 -->
          <i class="el-icon-error" @click="checkDeleteController(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remove, insert } from 'ramda'
import { get } from 'vuex-pathify'
import { isEmpty } from 'xe-utils'
import { getDeviceInfo } from '@/api/devices'
import unflattenObj from '@/utils/unflattenObj'
import flattenObj from '@/utils/fattenObj'
// import Vue from 'vue'
// import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

import mixin from './base.mixin'
import ScheduleTask from './components/ScheduleTask.vue'

const DEFAULT_CONTROLLER_TEST = {
  // 计划任务名称
  name: '任务名',
  // 启用/禁用
  enabled: true,
  // 控制内容
  cron: '* * * * * ? *',
  tasks: [{ type: 'attr' }]
}
export default {
  name: 'DeviceTimingControllerWidget',
  components: { ScheduleTask },
  mixins: [mixin],
  data() {
    return {
      controllers: [{ ...DEFAULT_CONTROLLER_TEST }],
      isShowCron: false,
      currentIndex: 0,
      deviceActions: []
    }
  },
  computed: {
    language: get('my/language'),
    attrs() {
      const attrs = this.getAttrs(Object.values(this.formSchema.properties))
      return Array.isArray(attrs) ? attrs : []
    }
  },
  watch: {
    controllers: {
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
      },
      deep: true
    }
  },
  created() {
    setTimeout(() => {
      this.getDeviceActions()
    }, 0)
  },
  mounted() {
    if (Array.isArray(this.value)) {
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
    updatedController() {
      this.controllers = [...this.controllers]
    },
    getAttrName(name) {
      let attrName = ''
      if (!name) {
        attrName = this.$t('common.chooseAttr')
      } else {
        let schema = this.formSchema.properties
        const nameArr = name.split('.')
        nameArr.forEach((key, index) => {
          if (index === nameArr.length - 1) {
            attrName = schema[key].title
          } else {
            schema = schema[key].properties
          }
        })
      }
      return attrName
    },
    // @ params {array}
    /**
     * 从属性列表中提取符合条件的属性。
     * @param {Array} properties - 包含属性对象的数组。
     * @returns {Array} - 符合条件的属性对象数组。
     */
    getAttrs(properties) {
      // 用于存储最终符合条件的属性
      const attrs = []
      /**
       * 递归遍历属性列表，提取符合条件的属性。
       * @param {Array} props - 包含属性对象的数组，用于递归处理。
       */
      function getPro(props) {
        // console.log(`props`, props)
        // 遍历传入的属性列表
        props.forEach((property) => {
          // 如果属性有子属性且子属性不为空，并且该属性有名称
          if (!property) {
            return
          }
          const { type = '', properties, name, title } = property
          const typeLow = type.toLowerCase()
          if (
            typeLow === 'object' &&
            properties &&
            !isEmpty(properties) &&
            name
          ) {
            // 获取子属性的数组
            const newProperties = Object.values(properties)
            // 对子属性进行处理，拼接名称和标题
            const newAttrs = newProperties.map((item) => {
              const newItem = { ...item }
              // 拼接子属性的完整名称
              newItem.name = `${name}.${item.name}`
              // 拼接子属性的完整标题
              newItem.title = `${title} ${item.title}`
              return newItem
            })
            // 递归调用 getPro 函数处理新生成的属性列表
            getPro(newAttrs)
          } else if (name) {
            // 如果该属性有名称，则将其添加到 attrs 数组中
            // 包括 array的
            attrs.push(property)
          } else {
            console.log(
              `属性没有名称，无法添加到 attrs 数组中: ${JSON.stringify(
                property
              )}`
            )
          }
        })
      }
      // 调用递归函数开始处理传入的属性列表
      getPro(properties)
      return attrs
    },

    async getDeviceActions() {
      try {
        const { status, payload } = await getDeviceInfo(this.values.type, {
          category: 'actions'
        })
        if (status === 'success') {
          this.deviceActions = payload
        }
      } catch (e) {
        logger.error(`获取设备的动作失败:${e}`)
      }
    },
    async onCronClick(index) {
      this.currentIndex = index
      await this.$nextTick()
    },
    checkDeleteController(index) {
      this.$confirm(
        this.$t('common.checkDelete').params(this.controllers[index].name),
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
        // 计划任务名称
        name: this.$t('common.taskName'),
        // 启用/禁用
        enabled: true,
        // 控制内容
        cron: '* * * * * ? *',
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
.device-timing-controller {
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
    flex-wrap: wrap;
    margin-top: 6px;
    & > div {
      margin-left: 10px;
      text-align: center;
      flex: 4;
    }
    .el-input {
      width: 150px;
    }
    .item-value {
      display: flex;
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
