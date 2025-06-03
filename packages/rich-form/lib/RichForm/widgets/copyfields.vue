<!--
  例：
  {
    "name": "callTargets",
    "widget": "copyfields",
    "labelWidth": "120px",
    "size": "small",
    "custom": "inline",    // 用于定制字段
    "fields": [
      {
        "showLabel": true,
        "name": "title",
        "title": "呼叫目标名称"
      },
      {
        "showLabel": true,
        "name": "number",
        "title": "呼叫目标SIP号码"
      }
    ]
  },

"custom"：定制  以下为可选值(待扩展)
         "inline"：默认有一项 且 当只有一项时隐藏关闭按钮  layout可以参考nx10 通讯设置 的呼叫目标

-->
<template>
  <div class="copy-fields">
    <!-- copyFields{{ values }} -->
    <!-- 添加按钮 -->
    <div
      v-if="fieldList?.length === 0 && !field.readOnly"
      class="default-add-button"
    >
      <label v-if="field.showLabel === false" class="no-show-label">
        {{ field.title }} :
      </label>
      <i class="el-icon-circle-plus" @click="addField"></i>
    </div>
    <!-- <p>{{ 'copyFields ' + Math.random() }}</p>
    <p style="background-color: green; color: white">{{ values }}</p>
    <p>{{ fieldList }}</p>
    {{ formList }} -->
    <div
      v-for="(fieldItem, index) in fieldList"
      :key="index"
      class="fieldItem-item"
    >
      <!-- fieldItem {{ fieldItem }} -->
      <layout
        v-if="formList?.[index]"
        :class="[
          field.showBorder ? 'show-border' : '',
          field.inline ? 'inline' : ''
        ]"
        :style="field.layoutStyle"
        :fields="formList[index].fields"
        :form-schema="formSchema"
        :form="formList[index]"
        :values="fieldItem"
        @valueschange="(values) => onValuesChange(values, index)"
      ></layout>
      <div v-if="!field.readOnly" class="item-fieldItem">
        <div class="actions">
          <i class="el-icon-circle-plus" @click="addField(index)"></i>
          <i
            v-if="field.custom !== 'inline' || fieldList.length !== 1"
            class="el-icon-error"
            @click="checkDeleteField(index)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, get } from 'lodash'
import { insert, remove } from 'ramda'
import eventBus from '../eventbus'
import { setFieldValue } from '../utils'
import baseWidgetMixin from './base.mixin'

export default {
  name: 'CopyFields',
  mixins: [baseWidgetMixin],
  provide() {
    return {
      fieldList: () => this.fieldList
    }
  },
  data() {
    return {
      // 由于可能改变每一个array的选项 所以便如此.
      formList: []
      // fieldsList: [cloneDeep(this.fields)]
    }
  },

  computed: {
    fieldList: {
      get() {
        return get(this.values, this.schema.name, [])
      },
      set(newVal) {
        // this.$set(this.values, this.schema.name, newVal || [])
        // // 这里不需要设置，因为watch会处理
        setFieldValue(
          this.schema.name,
          newVal,
          this.values,
          false,
          this.formSchema
        )
        eventBus.$emit('dirtyFields:change', this.schema.name)
        // this.$set(this.values, this.schema.name, newVal)
      }
    },
    // 这种数组字段其实不应该由父组件掌管

    initialValue() {
      if (this.schema.items?.type !== 'object' && this.schema.items?.default) {
        return this.schema.items.default
      }
      if (this.schema.items?.type === 'string') {
        return ''
      }
      if (this.schema.items?.type === 'number') {
        return 0
      }
      return null
    }
  },
  watch: {
    fieldList: {
      handler(newVal, oldVal) {
        // diyici
        if (!this.formList?.length) {
          console.log(`newVal,oldVal`, newVal, oldVal)
          this.initFormList(newVal)
        }
      },
      // deep: true,
      immediate: true
    },
    formList: {
      handler(newVal, oldVal) {
        console.log(`newVal.length`, newVal.length)
      },
      // deep: true,
      immediate: true
    }
  },
  beforeCreate() {
    // 不能使用import
    this.$options.components.Layout = require('../layout.vue').default
  },
  created() {
    this.initFormList()
  },
  mounted() {
    // 因为产品需要 故添加 定制字段
    // inline: 默认有一项 且 当只有一项时隐藏关闭按钮  layout可以参考nx10 通讯设置 的呼叫目标
    if (this.field?.custom === 'inline') {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.addField()
      }, 1000)
    }
  },
  methods: {
    initFormList(fieldList = this.fieldList) {
      if (fieldList?.length <= 0) {
        // 如果fieldList有值 则不需要重新初始化formList
        this.formList = null
        return
      }
      // 初始化formList
      this.formList = fieldList.map(() => this.getItemForm())
      eventBus.$emit('updateFrom')
    },
    onValuesChange(values, index) {
      this.$set(this.fieldList, index, values)
    },
    getFields() {
      if (Array.isArray(this.schema.fields)) {
        return this.schema.fields.map((obj) => {
          // if (obj === '-') return obj
          if (typeof obj === 'string') return obj
          if (Array.isArray(obj)) {
            return obj.map((item) => ({
              name: 'default',
              showLabel: false,
              ...item
            }))
          }
          return {
            name: 'default',
            showLabel: false,
            ...obj
          }
        })
      }
      if (this.schema.fields instanceof Object) {
        return [{ name: 'default', showLabel: false, ...this.schema.fields }]
      }
      return ''
    },

    getItemForm() {
      return cloneDeep({
        labelInline: true,
        ...this.schema,
        fields: this.getFields(),
        readOnly: this.field.readOnly
      })
    },
    checkDeleteField(index) {
      this.$confirm(
        this.$t('richform.checkDelete').params(
          this.$t('richform.target').params(index + 1)
        ),
        {
          type: 'warning'
        }
      )
        .then(() => {
          this.fieldList = remove(index, 1)(this.fieldList)
          this.formList = remove(index, 1)(this.formList)
        })
        .catch((e) => {})
    },
    addField(index = -1) {
      this.fieldList = insert(index + 1, {})(this.fieldList)
      this.formList = [...this.formList, this.getItemForm()]
    },
    // 设置获取value时，value值的转换
    toFieldValue(value) {
      if (this.schema.items?.type === 'object') {
        return value
      }

      return (value || []).map((item) => ({
        [this.schema.items?.name || 'default']: item
      }))
    },
    // 当value变化时设置传递到父组件的value
    fromFieldValue(value) {
      if (this.schema.items?.type === 'object') {
        return value
      }
      // 赋予初始值避免报错
      return (value || []).map(
        (item) =>
          item[this.schema.items?.name || 'default'] || this.initialValue
      )
    },
    // 设置友好值
    getFriendValue(value) {
      return value
    }
  }
}
</script>

<style lang="scss">
.copy-fields {
  .no-show-label {
    padding-left: 8px;
    margin-right: 4px;
    line-height: 25px;
    vertical-align: bottom;
  }
  .show-border {
    border: 1px dashed #e5e5e5;
  }
  .block-div {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
  }
  .default-add-button {
    text-align: left;
    i {
      margin-right: 20px;
      font-size: 25px;
    }
    i:hover {
      color: #409eff;
    }
  }
  .fieldItem-item {
    display: flex;
    align-items: center;
    margin-top: 6px;
    & > div {
      text-align: center;
      flex: 5;
    }
    .item-fieldItem {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-start;
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
