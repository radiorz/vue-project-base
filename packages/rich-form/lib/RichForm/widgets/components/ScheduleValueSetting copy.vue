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
import Field from '@/components/RichForm/field.vue'
import CronInput from './CronInput.vue'

export default defineComponent({
  name: 'ScheduleValueSetting',
  components: {
    MyInput,
    CronInput,
    RichForm,
    Field
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
    }
  },
  // 从组件触发 emits 事件
  // emits:[],
  // 暴露
  // expose: {},
  // setup(props, ctx) {},
  data() {
    return {}
  },
  computed: {
    schema() {
      return this.attrs.find((attr) => attr.name === this.value.tasks[0].name)
    }
  },
  // watch:{},
  // created(){},
  methods: {
    onFieldInputChange(value) {
      this.$set(this.value.tasks[0], 'value', value)
    },
    onAttrChange(name) {
      this.$set(this.value.tasks[0], 'name', name)
      const defaultValue = this.getDefaultValue()
      this.$set(this.value.tasks[0], 'value', defaultValue)
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
      if (this.schema.type === 'array') {
        return []
      }
      if (this.schema.type === 'boolean') {
        return false
      }
      if (this.schema.type === 'object') {
        return {}
      }
      return ''
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
    {{ value }}
    <el-input
      v-model="value.name"
      placeholder="请输入名称"
      class="item-name"
    ></el-input>
    <CronInput
      v-model="value.cron"
      @change="(_value) => $set(value, 'cron', _value)"
    ></CronInput>
    <!-- 任务类型 -->
    <el-select
      v-model="value.tasks[0].type"
      placeholder="请选择任务类型"
      @change="(val) => selectTask(val, index)"
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
    <!-- <el-dropdown @command="(command) => selectTask(command, index)">
        <span class="el-dropdown-link">
          {{
            value.tasks[0].type === 'attr'
              ? $t('common.reviseAttr')
              : $t('common.executeAction')
          }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="attr">{{
            $t('common.reviseAttr')
          }}</el-dropdown-item>
          <el-dropdown-item command="act">{{
            $t('common.executeAction')
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
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
      <!-- <el-dropdown @command="(command) => selectAttr(command, index)">
          <span class="el-dropdown-link">
            {{ getAttrName(value.tasks[0].name) }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <PerfectScrollbar style="height: 300px">
              <el-dropdown-item
                v-for="(attr, index) in attrs"
                :key="attr.name + index"
                :command="{ name: attr.name, type: attr.type }"
                >{{ attr.title }}</el-dropdown-item
              >
            </PerfectScrollbar>
          </el-dropdown-menu>
        </el-dropdown> -->
      <!-- 这里是设置值的地方 -->
      <template v-if="value.tasks[0].name">
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
          <Field :form-schema="schema" :values="value.task[0].value"></Field>
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
    </div>
    <template v-else>
      <el-select
        v-model="value.tasks[0].name"
        placeholder="请选择动作"
        filterable
        @change="
          (val) => {
            $emit('selectAction', { action: val, index })
          }
        "
      >
        <el-option
          v-for="(option, index) in deviceActions"
          :key="option.name + index"
          :value="option.name"
          :label="option.title"
        ></el-option>
      </el-select>
      <!-- <el-dropdown @command="(command) => selectAction(command, index)">
          <span class="el-dropdown-link">
            {{
              deviceActions[value.tasks[0].name]
                ? deviceActions[value.tasks[0].name].title
                : '请选择动作'
            }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="action in deviceActions"
              :key="action.name"
              :command="action.name"
              >{{ action.title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown> -->
      <RichForm
        v-if="isShowRichForm(value)"
        :values="value.tasks[0].params"
        auto-form
        :schema="
          deviceActions[value.tasks[0].name] &&
          deviceActions[value.tasks[0].name].paramSchema
        "
        @fieldchange="(name, value) => onActionFieldChange(name, value, value)"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.schedule-value-setting {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  .item-name {
    width: 100%;
    margin-bottom: 10px;
  }
  .the-task {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    width: 100%;
  }
}
</style>
