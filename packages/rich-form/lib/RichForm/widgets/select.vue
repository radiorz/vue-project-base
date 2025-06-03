<!--
  notHandlerValue 不对数据进行处理,
  仅针对copyfields组件，isPublicDict 为true时，字典选项互斥
-->
<template>
  <div>
    <el-select
      v-model="value"
      class="select-widget"
      :disabled="field.readOnly || form.readOnly"
      :multiple="field.multiple"
      :placeholder="field.placeholder"
      :allow-create="field.allowCreate"
      :filterable="field.filterable"
      :clearable="field.clearable"
      :collapse-tags="field.collapseTags"
      :no-data-text="field.noDataText"
      @clear="clearSelects"
    >
      <el-option
        v-for="option in enumDict"
        :key="option.value"
        :label="
          field.showFriendPk ? option.text + `(${option.value})` : option.text
        "
        :value="option.value"
        :disabled="isDisabled(option)"
      ></el-option>
    </el-select>
    <!-- {{ field }} -->
  </div>
</template>

<script>
import { dissoc } from 'ramda'
import { get, call, sync } from 'vuex-pathify'
import { getResourcesByType } from '@/api/resources'
import { getDevices } from '@/api/devices/manage-devices'
import WidgetMixin from './base.mixin'

export default {
  name: 'SelectWidget',
  mixins: [WidgetMixin],
  inject: {
    fieldList: {
      type: Function,
      default: () => []
    }
  },
  computed: {
    fieldListValues() {
      let data = []
      let result = []
      const isPublicDict = this.field.isPublicDict || false
      if (!isPublicDict) {
        return []
      }
      if (typeof this.fieldList === 'function') {
        data = this.fieldList() // 调用注入的函数
      } else {
        data = this.fieldList
      }
      if (data && Array.isArray(data)) {
        data.forEach((item) => {
          if (item[this.field.name]) {
            result.push(...item[this.field.name])
          }
        })
      } else if (data && data[this.field.name]) {
        result.push(data[this.field.name])
      }
      if (isPublicDict) {
        result = [...new Set(result)]
      }
      return result
    },
    resourceInfos: get('resourceinfos'),
    pk() {
      const { resourceinfos } = this.$store.state
      return resourceinfos[this.field.resourceType] &&
        resourceinfos[this.field.resourceType].pk
        ? resourceinfos[this.field.resourceType].pk
        : ''
    },

  },
  watch: {
    pk: {
      handler(newVal) {
        if (newVal) {
          this.initSelectData()
        }
      },
      deep: true
    },
    schema: {
      handler(newVal, oldVal) {
        console.log(`schema`, 'newVal=', newVal, 'oldVal=', oldVal)
      }
      // deep: true,
      // immediate: true
    },
    form: {
      handler(newVal, oldVal) {
        console.log(`form select`, 'newVal=', newVal, 'oldVal=', oldVal)
        // this.initSelectData()
      },
      deep: true
      // immediate: true
    },
    field: {
      handler(newVal, oldVal) {
        console.log(`field select`, 'newVal=', newVal, 'oldVal=', oldVal)
      },
      deep: true
    }
  },
  created() {
    this.initSettings()
  },
  async mounted() {
    // 获取所有的设备序列号
    if (this.field.name === 'parent') {
      this.enumDict = []
      // 获取无线呼叫网关
      const { status, payload } = await getDevices({
        type: 'nx1_wlcall_gateway'
      })
      if (status === 'success') {
        const { data } = payload
        data.forEach((item) => {
          this.enumDict.push({
            text: `${item.name}-${item.sn} `,
            value: item.sn
          })
        })
      }
    }
    // if (this.field.defaultClick) {
    //   setTimeout(() => {
    //     this.value = this.enumDict[Object.keys(this.enumDict)[0]]?.value
    //   }, 300)
    // }
  },
  methods: {
    defaultSchema() {
      return {
        isNeedValidate: false,
        placeholder: '',
        clearable: true,
        password: false,
        filterable: false, // 是否可搜索
        suffixIcon: null, // 前置图标
        prifixIcon: null, // 后置图标
        prepend: null, // 前置内容
        append: null, // 后置内容
        multiple: false,
        url: null,
        resourceCollection: null,
        resourceType: null,
        collapseTags: false,
        params: {}
      }
    },
    // 获取资源的pk值
    getResourcePk: call('resourceinfos/loadResourceInfos'),
    // 修改显示值
    // el-select如果是单选则value为string，多选为array，后端传来的数据可能为obj，array，string，修改为el-select组件可以显示的形式string和[string]
    toFieldValue(value) {
      if (this.field.notHandlerValue) {
        return value
      }
      if (typeof value === 'object' && value) {
        // 处理数组，item为对象或者字符串的情况
        if (!Array.isArray(value)) {
          // return value[this.pk]
          return value.id
        }
        if (this.schema.items && this.schema.items.type === 'object') {
          if (this.field.multiple) {
            // 多选
            // return value.map(valueItem=>valueItem[this.pk])
            return value.map((valueItem) => valueItem.id)
          }
          // 单选
          return value.length > 0 ? value[0].text : ''
        }
        return value
      }
      if (typeof value === 'string' && value) {
        if (this.schema.type === 'array') {
          return value.split(',')
        }
      }
      return value
    },
    // 修改上传值,value如果为单选，必然传递为字符串，多选为数组，根据后端要求修改value的type
    fromFieldValue(value) {
      if (this.field.notHandlerValue) {
        return this.enumDict[value]?.value || value
      }
      // 处理多选
      if (Array.isArray(value)) {
        // value为array，item为字符串和对象的类型
        if (this.schema.items && this.schema.items.type === 'object') {
          // 如果后端要求array里面的item为对象
          const dicts = this.enumDict.filter((dict) =>
            value.includes(dict.value)
          )
          // 判断是否需要映射
          if (this.field.fieldMap) {
            let newValue = {}

            // 获取要映射的key值组
            const mapKeyArr = Object.keys(this.field.fieldMap)
            newValue = dicts.map((item) => {
              let newItem = {}
              mapKeyArr.forEach((key) => {
                if (item[key]) {
                  newItem = {
                    ...newItem,
                    [map[key]]: item[key]
                  }
                }
              })
              return newItem
            })
            return newValue
          }
          return dicts.map((dict) => dissoc('value')(dict))
        }
        if (this.schema.items && this.schema.items.type === 'string') {
          return value
        }
        // 否则默认提交的array里的item为string型
        return value
      }
      // 处理单选
      if (typeof value === 'string') {
        // 处理单选时值为字符串但提交的数据要为array类型数据的情况
        if (
          this.schema.type &&
          this.schema.type.toLowerCase() === 'array' &&
          this.schema.items &&
          this.schema.items.type === 'object'
        ) {
          value = [value]
          const dicts = this.enumDict.filter((dict) =>
            value.includes(dict.value)
          )
          return dicts.map((dict) => dissoc('value')(dict))
        }
        if (this.schema.type && this.schema.type.toLowerCase() === 'array') {
          return [value]
        }
        // 处理单选时值为字符串但提交的数据要为object类型数据的情况
        if (this.schema.type && this.schema.type.toLowerCase() === 'object') {
          // 如果后端要求为object，则修改为object
          const dicts = this.enumDict.filter((dict) => dict.value === value)
          return dicts.length ? dissoc('value')(dicts[0]) : value
        }
        // 否则默认传string
        return value
      }
      return value
    },
    // 下拉显示的数据
    initSelectData() {
      console.log(
        `this.field.resourceTypeF`,
        this.field,
        this.field.resourceType
      )
      getResourcesByType(`${this.field.resourceType}`, {
        pageSize: 100,
        ...this.field.params
      }).then((res) => {
        const resources = res.payload.data
        // FIXME：业务代码不应写在通用组件中，可在表单中定义字段扩展需求
        for (const key in resources) {
          if (
            resources[key].persons &&
            resources[key].count &&
            resources[key].persons.length >= resources[key].count
          ) {
            resources[key].title = `${resources[key].title}（已满）`
            this.$set(resources[key], 'disabled', true)
          }
        }
        const pk = this.field.friendPk || this.pk // (friendPk)可以在richForms定义
        const titleKey = this.field.titleKey || 'tilte'
        // 后端需要的上传的额外数据
        let fieldArr = []
        const { fields } = this.field.params
        if (fields) {
          fieldArr = fields.split(',')
        }
        this.enumDict = resources.map(
          ({
            [pk]: value,
            name,
            type,
            fullname,
            [titleKey]: title,
            disabled,
            ...fieldArr
          }) => ({
            value,
            id: value || name,
            type,
            text: title || fullname || name,
            title: title || fullname || name,
            disabled: disabled || false,
            ...fieldArr
          })
        )

        // 值班表是一条记录，编辑弹框会重新获取新值，如果旧值不存在，则编辑弹框显示的值与外部的值不统一
        // 这里根据定义格式如：mergeOldValue:'prisoners'，是否将旧值与重新获取的新增进行合并，让其显示一致。
        // prisoners为旧数据存放的字段名
        if (this.field.mergeOldValue) {
          const ids = this.enumDict.map((item) => item.id)
          this.values[this.field.mergeOldValue]?.forEach((item) => {
            if (!ids.includes(item.id)) {
              item.text = item.title
              item.value = item.id
              this.enumDict.push(item)
            }
          })
        }
      })
    },
    initSettings() {
      if (this.field.resourceType) {
        if (!this.pk) {
          this.getResourcePk({
            resType: this.field.resourceType,
            category: 'pk'
          })
        } else {
          this.initSelectData()
        }
      }
    },
    clearSelects() {
      this.value = null
    },
    isDisabled(option) {
      if (this.fieldListValues.includes(option.value)) {
        return true
      }
      return option.disabled
    }
  }
}
</script>

<style lang="scss" scoped>
.select-widget {
  width: 100%;
}
</style>
