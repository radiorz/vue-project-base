<!--

/**
 * @author
 * @file scheduleSetting.vue
 * @fileBase scheduleSetting
 * @path packages\web\src\components\RichForm\widgets\components\scheduleSetting.vue
 * @from
 * @desc
 * @example
 */

-->

<script>
import { defineComponent } from 'vue'
import RichForm from '@/components/RichForm/index.vue'
import MyInput from '@/components/Input/index.vue'
import { isEmpty } from 'xe-utils'
// import Field from '@/components/RichForm/field.vue'
import CronInput from './CronInput.vue'
import { schemaToAutoForm } from '../../utils'
import { findObjectByName } from '../utils/findObjectByName'

export default defineComponent({
  name: 'ScheduleTask',
  components: {
    MyInput,
    CronInput,
    RichForm
    // Field
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        cron: '',
        name: '',
        tasks: [
          {
            name: '',
            type: 'attr',
            value: undefined
          }
        ]
      })
    },
    // 任务属性
    attrs: {
      type: Array,
      default: () => []
    },
    // 设备动作
    deviceActions: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  // setup(props, ctx) {},
  data() {
    return {
      values: { [this.value.tasks[0].name]: this.value.tasks[0].value }
    }
  },
  computed: {
    task: {
      get() {
        return this.value.tasks[0]
      },
      set(value) {
        this.$set(this.value.tasks[0], 'value', value)
      }
    },
    attrArrayValue: {
      get() {
        const result = { [this.value.tasks[0].name]: this.value.tasks[0].value }
        return result
      },
      set(data) {
        this.$set(this.value.tasks[0], 'value', data[this.value.tasks[0].name])
      }
    },
    // 是否显示属性设置面板
    showValueSettingPanel() {
      if (this.value.tasks[0].type === 'attr') {
        return !!this.value.tasks[0].name
      }
      if (this.value.tasks[0].type === 'act') {
        return this.isShowRichForm(this.value)
      }
      return false
    },
    schema() {
      const schema = this.attrs.find(
        (attr) => attr.name === this.value.tasks[0].name
      )
      return schema
    },
    theForm() {
      const theForm = findObjectByName(this.form, this.value.tasks[0].name)
      if (!theForm) {
        return schemaToAutoForm(this.schema)
      }
      return {
        layout: [theForm]
      }
      // return schemaToAutoForm(this.schema)
    }
  },
  watch: {
    // schema: {
    //   handler(newVal, oldVal) {
    //     console.log(`schema`, 'newVal=', newVal, 'oldVal=', oldVal)
    //   }
    //   // deep: true,
    //   // immediate: true
    // },
    values: {
      handler(newVal, oldVal) {
        this.attrArrayValue = newVal
      },
      deep: true,
      immediate: true
    }
  },
  // created(){},
  methods: {
    onTaskChange(task) {
      // 目前一个schdule对应一个task
      this.$set(this.value, 'tasks', [{ type: task }])
    },

    onFieldInputChange(value) {
      this.$set(this.value.tasks[0], 'value', value)
    },
    onAttrChange(name) {
      this.$set(this.value.tasks[0], 'name', name)
      const defaultValue = this.getDefaultValue()
      this.$set(this.value.tasks[0], 'value', defaultValue)
    },
    onActionChange(name) {
      this.$set(this.value.tasks[0], 'name', name)
      const defaultValue = this.getActionDefaultParams(name)
      this.$set(this.value.tasks[0], 'params', defaultValue)
    },
    getActionDefaultParams(action) {
      if (
        this.deviceActions[action].paramSchema &&
        !isEmpty(this.deviceActions[action].paramSchema.properties)
      ) {
        return {}
      }
      return null
    },

    onAttrFieldChange(name, value) {
      console.log(`name,value`, name, value)
      this.$set(this.value.tasks[0], 'value', {
        ...this.value.tasks[0].value,
        [name]: value
      })
    },
    getTypeDefaultValue(type) {
      switch (type) {
        case 'string':
          return ''
        case 'number':
          return 0
        case 'boolean':
          return false
        case 'object':
          return {}
        case 'array':
          return []
        default:
          return null
      }
    },
    getDefaultValue() {
      if (this.schema.default) {
        // 这种获取默认值目前先不支持
        // TODO: 需要支持
        if (
          typeof this.schema.default === 'string' &&
          this.schema.default?.startsWith('{')
        ) {
          return ''
        }
        return this.schema.default
      }
      return this.getTypeDefaultValue(this.schema.type)
    },
    onActionFieldChange(name, value) {
      this.$set(this.value.tasks[0], 'params', {
        ...this.value.tasks[0].params,
        [name]: value
      })
    },
    isShowRichForm(controller) {
      if (this.deviceActions.length === 0) {
        return false
      }
      if (
        controller.tasks[0].params &&
        this.deviceActions[controller.tasks[0].name] &&
        !isEmpty(this.deviceActions[controller.tasks[0].name].paramSchema) &&
        !isEmpty(
          this.deviceActions[controller.tasks[0].name].paramSchema.properties
        )
      ) {
        return true
      }
      return false
    }
  }
})
</script>

<template>
  <div class="schedule-value-setting">
    <div class="item">
      <!-- {{ value }} -->
      <el-input
        v-model="value.name"
        class="item-name"
        placeholder="请输入名称"
      ></el-input>
      <CronInput
        v-model="value.cron"
        @change="(_value) => $set(value, 'cron', _value)"
      ></CronInput>
      <!-- 任务类型 -->
      <el-select
        :value.sync="value.tasks[0].type"
        placeholder="请选择任务类型"
        @change="(val) => onTaskChange(val)"
      >
        <el-option
          v-for="option in [
            {
              value: 'attr',
              label: $t('common.reviseAttr')
            },
            { value: 'act', label: $t('common.executeAction') }
          ]"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        ></el-option>
      </el-select>
      <!-- 任务名称 -->
      <!-- 如果是修改属性 -->
      <div v-if="value.tasks[0].type === 'attr'" :class="['the-task']">
        <el-select
          :value.sync="value.tasks[0].name"
          placeholder="请选择属性"
          filterable
          @change="(val) => onAttrChange(val)"
        >
          <el-option
            v-for="(option, index) in attrs"
            :key="option.name + index"
            :value="option.name"
            :label="option.title"
          ></el-option>
        </el-select>
      </div>
      <!-- 任务是 执行动作-->
      <template v-else>
        <!-- 选择执行的动作 -->
        <el-select
          v-model="value.tasks[0].name"
          placeholder="请选择动作"
          filterable
          @change="(val) => onActionChange(val)"
        >
          <el-option
            v-for="(option, index) in deviceActions"
            :key="option.name + index"
            :value="option.name"
            :label="option.title"
          ></el-option>
        </el-select>
      </template>
    </div>
    <!-- 另起一行 -->
    <div v-if="showValueSettingPanel" class="item-value">
      <!-- 这里是设置值的地方 -->
      <template v-if="value.tasks[0].type === 'attr'">
        <!-- 如果类型是布尔值就switch -->
        <el-switch
          v-if="schema.type === 'boolean'"
          v-model="value.tasks[0].value"
          active-color="#13ce66"
          @change="(_value) => $set(value.tasks[0], 'value', _value)"
        ></el-switch>
        <!-- Array -->
        <template v-else-if="schema.type === 'array'">
          <!-- {{
          attrs.find((attr) => attr.name === value.tasks[0].name)
          }} -->
          <!-- {{ schema }} -->
          <!-- {{ schema }} -->
          <!-- {{ 'taskvalue:' + JSON.stringify(value.tasks[0].value) }} -->
          <!-- {{ 'attr' + JSON.stringify(attrArrayValue) }} -->
          <!-- {{ schema.name }} -->
          <!-- {{ 'values: ' + JSON.stringify(values) }} -->
          <!-- <Field
            :schema="schema"
            :values="attrArrayValue"
          ></Field> -->
          <RichForm
            :form="theForm"
            :schema="{ type: 'object', properties: { [schema.name]: schema } }"
            :values.sync="values"
            @fieldchange="(name, value) => onAttrFieldChange(name, value)"
          ></RichForm>
          <!-- <Layout v-else-if="" :schema=""></Layout> -->
        </template>
        <!-- 如果类型是其他值直接输入 -->
        <MyInput
          v-else
          :value="value.tasks[0].value"
          placeholder="请输入值"
          @change="(value) => onFieldInputChange(value)"
        ></MyInput>
      </template>
      <!-- 动作的选项 -->
      <!-- action params -->
      {{ value.tasks[0].params }}
      <RichForm
        v-if="value.tasks[0].type === 'act' && isShowRichForm(value)"
        auto-form
        :values="value.tasks[0].params"
        :schema="
          deviceActions[value.tasks[0].name] &&
          deviceActions[value.tasks[0].name].paramSchema
        "
        @fieldchange="(name, value) => onActionFieldChange(name, value)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule-value-setting {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .item-name {
  }
  .item-value {
    width: 100%;
    background-color: #f5f7fa;
    padding: 5px;
    border-radius: 5px;
  }
  .the-task {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
}
</style>
