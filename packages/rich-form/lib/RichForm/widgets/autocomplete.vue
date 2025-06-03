<!--
    输入框自动完成渲染组件
    :value-key 显示的键名
-->
<template>
  <el-autocomplete
    ref="autocomplete"
    v-model="value"
    :style="field.style ? field.style : { width: '100%' }"
    class="autocomplete-widget"
    :size="form.size"
    :value-key="field.valueKey"
    :disabled="disabledFields.includes(field.name)"
    :fetch-suggestions="querySearch"
    :placeholder="field.placeholder"
    :debounce="field.debounce ? field.debounce : debounce"
    :placement="field.placement"
    :prefix-icon="field.prefixIcon"
    :suffix-icon="field.prefixIcon"
    :clearable="field.clearable"
    @select="handleSelect"
    @focus="onFocus"
  >
    <template slot-scope="{ item }">
      <div v-infinite-scroll="scrollLoad" class="infinite-list">
        {{
          item.isError
            ? item.text
            : `${item[field.valueKey]}(${item[field.friendText]})`
        }}
      </div>
    </template>
  </el-autocomplete>
</template>

<script>
import Vue from 'vue'
import jp from 'jsonpath'
import { getResourcesByUrl } from '@/api/resources'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { debounce } from 'xe-utils'
import WidgetMixin from './base.mixin'
import eventBus from '../eventbus'

export default {
  name: 'AutoCompleteWidget',
  components: { PerfectScrollbar },
  mixins: [WidgetMixin],
  data() {
    return {
      cbFunction: () => {}
    }
  },
  watch: {
    // 清除更新的值
    value(newVal) {
      // 当值为空时，清空this.values联动字段的值
      if (!newVal) {
        Object.entries(this.field.updateFields).forEach(([item]) => {
          const [field, paths] = item
          if (paths.startsWith('$')) {
            this.setReactiveValue(paths, undefined)
          } else {
            Vue.set(this.values, paths, undefined)
          }
        })
      }
      // Object.keys(this.field.updateFields).forEach((field) => {
      //   Vue.set(this.values, [this.field.updateFields[field]], undefined)
      // })
    }
  },
  mounted() {
    // 先触发select事件，在触发value改变事件
    this.$refs.autocomplete.select = (item) => {
      const _this3 = this.$refs.autocomplete
      _this3.$emit('select', item)
      _this3.$emit('input', item[_this3.valueKey])
      _this3.$nextTick((_) => {
        _this3.suggestions = []
        _this3.highlightedIndex = -1
      })
    }
  },
  methods: {
    // 滚动加载
    scrollLoad() {
      // 获取当前高度差
      const scrollbarComponent =
        this.$refs.autocomplete.$children[1].$children[0]
      const max =
        scrollbarComponent.wrap.scrollHeight -
        scrollbarComponent.wrap.clientHeight
      let scrollInstance
      scrollbarComponent.wrap.onscroll = async (e) => {
        // 滚动的距离
        scrollInstance = e.target.scrollTop
        // 滚动到底部时，加载更多数据
        if (scrollInstance === max) {
          this.querySearch(this.value, this.cbFunction, true)
        }
      }
    },
    toFieldValue(val) {
      return [undefined, null, NaN].includes(val) ? '' : `${val}`
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性,field={}
    defaultSchema() {
      return {
        url: '',
        resourceType: '',
        placeholder: this.$t('input'),
        valueKey: 'fullname', // 主key
        friendText: 'title', // 额外显示的友好值
        updateFields: {}, // 选择item后需要更新到values的字段 {itemField:valueField}
        value: '',
        debounce: 300,
        placement: 'bottom-start',
        popperClass: '',
        triggerOnFocus: false,
        prefixIcon: '',
        suffixIcon: '',
        clearable: true,
        params: {
          pageSize: 20,
          pageNo: 1,
          fields: 'fullname,name,certNo', // 返回指定的过滤后的字段
          key: 'id' // 默认搜索的关键字为id
        },
        query: ''
      }
    },
    querySearch(queryString, cb, isLazyLoad = false) {
      this.cbFunction = cb
      let params
      let query = ''
      if (this.field.query || this.field.query === 0) {
        query = `/${this.field.query}`
      }
      const url =
        this.field.resourceType && this.field.resourceType.trim()
          ? `/${this.field.resourceType}${query}`
          : `${this.field.url}${query}`
      // 如果输入的参数为空，则获取全部不过滤
      if (isLazyLoad) {
        this.field.params.pageSize += 20
      } else {
        this.field.params.pageSize = 20
      }
      params = { ...this.field.params }
      if (queryString.trim()) {
        const { key } = this.field.params // 关键字
        params[key] = queryString // 以对应的关键字作为key去搜索
        delete params.key
      }
      getResourcesByUrl(url, params)
        .then((res) => {
          if (res.payload.data.length > 0) {
            cb(res.payload.data) // 调用 callback 返回建议列表的数据
          } else {
            cb([{ isError: true, text: this.$t('richform.no_result') }])
            this.setExtraData(null) // 清空额外值
          }
          return res.payload.data
        })
        .catch((err) => {
          this.setExtraData(null) // 清空额外值
          logger.error(err)
        })
      // }
    },
    setReactiveValue(paths, value) {
      const _paths = paths.split('.').splice(1)
      let lastValue = this.values
      let currValue = this.values
      for (const _path of _paths) {
        if (currValue === undefined) break
        lastValue = currValue
        currValue = currValue[_path]
      }
      Vue.set(lastValue, _paths.slice(-1)[0], value)
    },
    // 将字符串转换为对象
    setNestedValue(obj, path, value) {
      let parts = path.split('.') // 分割路径为数组
      let current = obj // 从根对象开始

      // 遍历路径的每一部分，直到倒数第二个元素
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i]
        // 如果当前属性不存在或者不是对象，则初始化为空对象
        if (!current[part] || typeof current[part] !== 'object') {
          current[part] = {}
        }
        current = current[part] // 移动到下一级
      }

      // 设置最后一个属性的值
      current[parts[parts.length - 1]] = value
    },
    handleSelect(data) {
      // console.log(`data1111111111111`, data)
      Object.entries(this.field.updateFields).forEach((item) => {
        const [field, paths] = item
        if (paths.startsWith('$')) {
          if (field.startsWith('$')) {
            this.setReactiveValue(paths, jp.value(data, field))
          } else {
            this.setReactiveValue(paths, data[field])
          }
        } else if (field.startsWith('$')) {
          Vue.set(this.values, paths, jp.value(data, field))
        } else {
          if (paths.includes('.')) {
            const [firstKey, ...keys] = paths.split('.')
            this.setNestedValue(this.values, paths, data[field])
            // 上面的写法无法检测到变化，所以使用下面的写法
            eventBus.$emit('dirtyFields:change', firstKey)
          } else {
            Vue.set(this.values, paths, data[field])
          }
        }
      })
      this.$forceUpdate()
      this.setExtraData(data.name ? data.name : data[this.field.valueKey])
      setTimeout(() => {
        this.setExtraData(null)
      }, 2000)
    },
    onFocus(e) {
      this.querySearch(this.value)
    }
  }
}
</script>

<style lang="scss">
@import '../vars.scss';

// .el-scrollbar
.richform {
  .layout {
    .field.error {
      input {
        border: 1px solid $error-color;
        background: transparentize($error-color, 0.8);
      }
    }
  }
}
</style>
