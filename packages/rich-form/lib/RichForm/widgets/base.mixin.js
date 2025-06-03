/**
 *   Widget
 *
 *
 */

import { type as typename, isEmpty, isNil, pick, clone } from 'ramda'
import jsonValidator, {
  localize as localizeErrors
} from '@/utils/jsonValidator'
import { debounce } from 'xe-utils'
import eventbus from '../eventbus'

export default {
  inject: ['disabledFields', 'hideFields', 'fieldsMap'],
  props: {
    fields: { type: [Array, Object], default: () => [] },
    schema: { type: Object, default: () => ({}) }, // 传入字段数据
    values: { type: Object, default: () => ({}) },
    form: { type: Object, default: () => ({}) },
    formSchema: { type: Object, default: () => ({}) },
    initial: { type: Object, default: () => ({}) } // 初始值
  },
  computed: {
    value: {
      get() {
        this.updateValueTimes++
        return this.toFieldValue(this.initial.value)
      },
      set(value) {
        this.valueChanged(value)
        if (!this.manualChangeField) {
          this.manualChangeField = true
        }
      }
    },
    field() {
      const defaultField = {
        isNeedValidate: true // 是否需要验证
      }
      const field = Object.assign(
        defaultField,
        this.defaultSchema(),
        this.schema
      )
      if (this.disabledFields.includes(this.schema.name)) {
        field.readOnly = true
      }
      // 如果表单readOnly，那么所有的字段都是readOnly
      if (this.form.readOnly == true) {
        field.readOnly = true
      }
      return field
    },
    fieldStyle() {
      return this.field.style
    }
  },
  data() {
    return {
      updateValueTimes: 0, // 存在懒加载组件，无法获取相应的数据，当加载完成时强制刷新value值的显示
      enumDict: this.getInitDict(),
      manualChangeField: false, // 如果设置默认值，则value的set不会触发，watch会监听改变，所以这里设置当value默认值触发时，触发set事件
      isReady: false, // 组件初始化时会修改values,所以会提交一些奇怪的脏值,这里做处理
      extraData: null, // 与字段相关的额外数据,
      afterFirstTime: false
    }
  },
  beforeCreate() {
    this.debounceUpdateOtherView = debounce(
      (value) => this.updateOtherView(value),
      1200
    )
  },
  async created() {
    eventbus.$on('emitFriendValue', this.emitFriendValue)
    eventbus.$on('updateFrom', this.debounceUpdateOtherView)
    eventbus.$on('mountedFrom', () => {
      this.debounceUpdateOtherView(this.value)
    })
    this.getDict()
    if (isEmpty(this.fieldsMap)) {
      this.parseLayout(this.form.layout)
    }
  },
  async mounted() {
    await this.$nextTick()
    this.updateWidgetView()

    this.isReady = true
    // 默认默认值处理完毕
    this.manualChangeField = true
  },
  watch: {
    value: {
      handler(value, oldValue) {
        if (this.afterFirstTime) {
          console.log('base.mixin value', value, oldValue)
          this.updateWidgetView()
          // 防抖
          this.debounceUpdateOtherView(value)
          // 处理默认值设置，set不会触发，watch会触发，只执行一次
          if (!this.manualChangeField) {
            this.valueChanged(value)
            this.manualChangeField = true
          }
        } else {
          this.debounceUpdateOtherView(value)
          this.afterFirstTime = true
        }
      },
      deep: true,
      immediate: true
    },

    updateValueTimes() {
      // 强制刷新页面，用于懒加载的组件
      this.$forceUpdate()
    }
  },
  methods: {
    // 解析布局
    parseLayout(fields = []) {
      if (!Array.isArray(fields)) {
        return
      }
      fields.forEach((item) => {
        if (Array.isArray(item)) {
          this.parseLayout(item)
        } else if (typeof item === 'object' && 'tabs' in item) {
          this.parseLayout(item.tabs)
        } else if (!item.fields) {
          this.fieldsMap[item.name] = item
        } else {
          this.parseLayout(item.fields)
        }
      })
    },
    // 获取初始的字典
    getInitDict() {
      let dict = {}
      if (typeof this.schema.enumDict === 'object') {
        dict = this.schema.enumDict
      } else if (typeof this.form.enumDict === 'object') {
        dict = this.form.enumDict
      }
      return dict
    },
    // 获取字典
    async getDict() {
      let enumDict
      if (!isEmpty(this.enumDict)) return
      // 根据数据的类型在不同的字段获取字典参数
      if (this.schema.type === 'array') {
        enumDict = this.schema.items ? this.schema.items.enumDict : undefined
      } else {
        enumDict = this.schema.enumDict
      }
      if (enumDict && typeof enumDict === 'string') {
        if (this.$store.getters.dicts && this.$store.getters.dicts[enumDict]) {
          this.enumDict = this.$store.getters.dicts[enumDict] || {}
        } else {
          this.enumDict = (await this.$loadDicts(enumDict)) || {}
        }
      } else if (enumDict && typeof enumDict === 'object') {
        this.enumDict = enumDict
      }
      // 下拉选项排序，修改字典排序
      if (this.field.order) {
        const cloneEnumDict = clone(this.enumDict)
        let pickItem = pick(this.field.order)(cloneEnumDict)
        Object.keys(pickItem).forEach((item) => {
          delete cloneEnumDict[item]
        })
        pickItem = Object.values(pickItem)
        this.enumDict = Object.values(cloneEnumDict)
        this.enumDict.unshift(...pickItem)
      }

      // 如果存在字典过滤，则过滤
      if (Array.isArray(this.schema.dictFilter)) {
        let dictItems = this.schema.dictFilter
        if (typeof dictItems === 'string') {
          dictItems = this.schema.dictFilter.split(',')
        }
        this.enumDict = pick(dictItems)(this.enumDict)
      }
      // 存在字典选项过多,要根据schema过滤字典
      // 修改于 2020/5/16, 此处会将字典新增的键值忽略掉
      // if (Array.isArray(this.schema.enum)) {
      //   this.enumDict = pick(this.schema.enum)(this.enumDict);
      //   console.log('444', this.enumDict)
      // }
    },
    // value值改变触发的事件
    valueChanged(value) {
      if (!this.isReady) return
      try {
        let v = this.fromFieldValue(value)
        // 某些类型的值不被允许传递,比如[""]
        if (Array.isArray(v)) {
          v = v.filter((val) => val !== '')
        }
        const friendValue = this.getFriendValue(v)
        this.$emit(
          'change',
          v,
          friendValue,
          this.getExtraData(),
          this.field.isNeedValidate
        )
      } catch (e) {
        logger.warn(
          this.$t('richform.setValueErr').params(this.schema.name, e.message)
        )
      }
    },
    /**
     * 当viewOnly=true时用来更新显示视图
     */
    updateWidgetView() {
      if (this.form.viewOnly || this.field.viewOnly) {
        $(`#${this.form.id}`)
          .find(`.field[name='${this.schema.name}']`)
          .children('.value')
          .html(`${this.getFriendValue(this.value)}`)
      }
    },
    // 主动设置上传本地数据，用于传入新的values时，显示友好值
    emitFriendValue() {
      if (this.value) {
        const v = this.fromFieldValue(this.value)
        const friendValue = this.getFriendValue(v)
        this.$emit('change', v, friendValue, this.getExtraData())
      }
    },
    // 数据的友好显示模式
    getFriendValue(value) {
      // 如果有字典则自动返回字典对应的值
      let fValue = value
      const { enumDict } = this
      if (isEmpty(value) || isNil(value)) {
        fValue = this.schema.emptyText == undefined ? '' : this.schema.emptyText
      } else if (typeof enumDict === 'object' && !isEmpty(enumDict)) {
        // 有字典的值,必须是数组
        let enumDictVal = value
        if (!Array.isArray(enumDictVal)) {
          if (typeof enumDictVal === 'string') {
            enumDictVal = value.split(',')
          } else {
            enumDictVal = JSON.stringify(value).split(',')
          }
        }
        fValue = enumDictVal.map((field) =>
          enumDict[field] ? enumDict[field].text : field || ''
        )
      }
      return fValue
    },
    getExtraData() {
      return this.extraData
    },
    setExtraData(value) {
      this.extraData = value
    },
    /**
     * 当字段widget值发生变化时触发此事件
     * 此时应触发事件，由Field父组件进行处理
     * @param {*} value
     */
    onChange(value) {
      this.$emit(value)
    },
    /**
     * 返回每个字段个性化的Schema字典
     */
    defaultSchema() {
      return {}
    },
    /**
     * 从原始终输入值转换成要适合渲染的值
     * 此方法一般情况下，应该字段组件进行重载
     */
    toFieldValue(value) {
      return value
    },
    /**
     * 将字段组件输入的结果转换成符合Schema约定的类型
     * 以下执行默认的转换，如果转换不正确，则应该由各个Widget组件自行处理
     */
    fromFieldValue(value) {
      // 类型未定义则返回原值
      if (
        !this.schema ||
        !this.schema.type ||
        this.field.isNeedValidate === false
      )
        return value
      switch (this.schema.type.toLowerCase()) {
        case 'object':
          if (typename(value) == 'Object') {
            return value
          }
          try {
            // 如果是字符串，尝试转成[]
            return typeof value === 'string' ? JSON.parse(value) : value
          } catch (e) {
            return value
          }

          break
        case 'array':
          if (Array.isArray(value)) {
            return value
          }
          try {
            // 如果是字符串，尝试转成[]
            const newVal = typeof value === 'string' ? JSON.parse(value) : value
            return Array.isArray(newVal) ? newVal : [newVal]
          } catch (e) {
            return value
          }

          break
        case 'boolean':
          return typename(value) == 'Boolean'
            ? value
            : value
            ? Boolean(value)
            : false
          break
        // FIXME: 小数点输入时，会转成整数
        // case 'number':
        //   console.log('number', value,parseFloat(value))
        //   return typename(value) == 'Number'
        //     ? value
        //     : value
        //       ? parseFloat(value)
        //       : value
        //   break
        case 'string':
          return typeof value === 'string' ? value : value ? String(value) : ''
          break
        case 'integer':
          return typeof value === 'number'
            ? value
            : value
            ? parseInt(value, 10)
            : value
          break
        default:
          return value
      }
    },
    /** 在表单总线内触发事件 */
    emit() {
      if (arguments.length > 0) {
        arguments[0] = `${this.form.id}:${arguments[0]}`
        eventbus.$emit(...arguments)
      }
    },
    /** 侦听表单总线数据 */
    on() {
      if (arguments.length > 0) {
        arguments[0] = `${this.form.id}:${arguments[0]}`
        eventbus.$on(...arguments)
      }
    },
    /**
     * 对字段执行校验
     */
    validate() {
      const valid = jsonValidator.validate(this.schema, this.value)
      if (valid) {
        this.$emit('validate')
      } else {
        localizeErrors(jsonValidator.errors)
        this.$emit('validate', jsonValidator.errors)
      }
      return valid
    },
    // 获取当前点击节点的所有父节点Key的拼接。如：a.b.c
    onFindAllParentKey(nodeData, parentKey = '') {
      if (typeof nodeData.key === 'undefined') {
        parentKey = parentKey.split('.').reverse().join('.')
        parentKey = parentKey.substring(1, parentKey.length)
        return parentKey
      }
      parentKey += `${nodeData.key}.`
      return this.onFindAllParentKey(nodeData.parent, parentKey)
    },
    // 联动其他字段，即修改其他字段的渲染，不包含回填数据
    async updateOtherView(value) {
      // 类似autoComplete updateFieldProps
      // updateFields因为只有autoComplete才具备获取数据回填数据的能力，故不写到此处
      // "updateFieldProps": { "positionId": ["$.params.organId"] }

      const { updateFieldProps } = this.schema
      if (!updateFieldProps) {
        return
      }

      console.log(
        `[updateFieldProps]更新联动,name=${this.schema.name},updateFieldProps=`,
        updateFieldProps
      )
      Object.entries(updateFieldProps).forEach((item) => {
        const [name, fieldString] = item
        // name: 需要联动的字段名称，filedString: 联动字段的函数
        // 先清空联动字段的值（暂不清楚为什么这么做，留码查看）
        // this.$set(this.values, name, '')
        // 设置联动字段的属性
        const target = this.fieldsMap[name]

        if (target) {
          // 获取新的filed
          let field =
            typeof fieldString === 'string' ? eval(fieldString) : fieldString
          if (typeof field === 'function') {
            try {
              field = field.call(
                this,
                value,
                clone(target),
                this?.values,
                this?.schema
              )
            } catch (error) {
              console.error(
                `执行updateFieldProps函数出错schemaName=${this.schema.name}, value=${value},updateFieldProps=${item}`,
                error
              )
              return
            }
          }
          if (!field && !isEmpty(field)) {
            return
          }
          // 设置field属性
          Object.keys(field).forEach((key) => {
            this.$set(target, key, field[key])
          })
        }
      })
    }
  }
}
