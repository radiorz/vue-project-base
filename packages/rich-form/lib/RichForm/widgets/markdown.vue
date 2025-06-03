<!--
    markDown 编辑器
-->
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 200px; overflow-y: hidden"
      v-model="value"
      :defaultConfig="editorConfig"
      :defaultContent="value || defaultContent"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import WidgetMixin from './base.mixin'

export default {
  name: 'MarkDownWidget',
  components: {
    Editor,
    Toolbar
  },
  mixins: [WidgetMixin],
  data() {
    return {
      defaultContent: [
        {
          type: 'paragraph',
          children: [
            {
              text: '',
              fontSize: '22px',
              color: '#ACC1E5',
              bgColor: '#0D47A1'
            }
          ]
        }
      ],
      editor: null,
      toolbarConfig: { excludeKeys: ['fullScreen', 'insertTable'] },
      editorConfig: {
        // placeholder: '请输入内容...',
        autoFocus: true,
        MENU_CONF: {
          lineHeight: {
            lineHeightList: ['0.5', '1', '1.15', '1.5', '2', '2.5', '3']
          },
          uploadImage: {
            fieldName: 'your-fileName',
            base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入 base64
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  created() {},
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      this.value = undefined
      if (this.field.readOnly) {
        this.editor.disable()
      }
      // console.log(editor.getAllMenuKeys()) // 获取所有菜单键
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
    }
  }
}
</script>
