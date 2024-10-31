<template>
  <div>
    <TheLabel :label="label"></TheLabel>
    <v-row no-gutters align="center" style="display: block">
      <v-col v-for="(item, index) in localList" :key="index" class="mr-2 d-flex align-center">
        <!-- 这里使用的是设备目标类型,因为他讲的是设备 -->
        <slot name="key-input" :item="item" :disabled="disabled"></slot>
        <slot name="value-input" :item="item" :disabled="disabled"></slot>
        <v-btn v-if="index !== localList.length - 1" :disabled="disabled" icon small @click="removeItem(index)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-if="index === localList.length - 1" :disabled="disabled" icon small @click="addItem">
          <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TheLabel from '../form-base/TheLabel.vue'

export default {
  name: 'KeyValueList',
  components: {
    TheLabel
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localList: []
    }
  },
  watch: {
    value: {
      handler() {
        this.initializeLocalList()
      },
      deep: true
    },
    localList: {
      handler(newValue) {
        const value = newValue.filter((item) => item.key).map((item) => ({ ...item }))
        if (JSON.stringify(value) !== JSON.stringify(this.value)) {
          this.$emit('input', value)
        }
      },
      deep: true
    }
  },
  created() {
    this.initializeLocalList()
  },
  methods: {
    initializeLocalList() {
      const newLocalList = [...this.value]
      if (newLocalList.length === 0 || newLocalList[newLocalList.length - 1].key) {
        newLocalList.push({ key: '', value: -1 })
      }
      this.localList = newLocalList
    },
    addItem() {
      this.localList.push({ key: '', value: -1 })
    },
    removeItem(index) {
      this.localList.splice(index, 1)
      if (this.localList[this.localList.length - 1].key !== '') {
        this.localList.push({ key: '', value: -1 })
      }
    }
  }
}
</script>
