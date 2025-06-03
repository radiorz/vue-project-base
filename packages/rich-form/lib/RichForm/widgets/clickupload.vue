<!--
  点击上传图片/视频组件
  限制：图片/视频 文件 大小小于 10M,数量少于 3个

  例子：
                    {
                    "name": "screen.screen",
                    "title": "屏保(可上传多个)",
                    "widget": "clickupload",
                    // 图片/视频 上传地址
                    "submitUrl": "/apps/hispro/api/statics/assets/resource/nx10_sickareahost/:id/upload/screen.medias",
                    // 图片/视频 删除地址   apps/hispro/api
                    "removeUrl": "/statics/assets/resource/nx10_sickareahost/:id/delete/screen.medias?uri=..."
                  }
 -->
<template>
  <div class="ClickUploadWidget">
    <el-upload
      class="upload-demo"
      :headers="requestHeader"
      :action="uploadUrl"
      :on-success="handleSuccess"
      :show-file-list="false"
      :before-upload="beforeFileUpload"
    >
      <svg-icon icon-class="addImages"></svg-icon>
    </el-upload>
    <div v-for="(item, index) in fileList" :key="index" class="itemBox">
      <div class="closeItem" @click="closeItem(index)">x</div>
      <el-image
        style="width: 50px; height: 50px; margin: 5px 15px;"
        v-if="item.type == 'image'"
        :src="item.url"
        :preview-src-list="previewList"
      >
      </el-image>
      <video
        v-else-if="item.type == 'video'"
        id="video1"
        controls
        class="imgItem"
        width="100"
      >
        <source :src="item.url" type="video/mp4" />
        <source :src="item.url" type="video/ogg" />
        <source :src="item.url" type="video/webm" />
      </video>
    </div>
  </div>
</template>

<script>
import mixin from './base.mixin'
import { getToken } from '@/utils/auth'
import { removeStatic } from '@/api/image'
export default {
  name: 'ClickUploadWidget',
  mixins: [mixin],
  props: {},
  data() {
    return {
      // fileList:array = [{type:string, url:string}:object]
      fileList: [],
      previewList: []
    }
  },
  computed: {
    // 上传地址
    uploadUrl() {
      let id = this.values.code
      return this.field.submitUrl.replace(/:id/g, id)[0] === '/'
        ? this.field.submitUrl.replace(/:id/g, id)
        : '/' + this.field.submitUrl.replace(/:id/g, id)
    },
    // 删除地址
    removeUrl() {
      return `/statics/assets/resource/nx10_sickareahost/${this.values.code}/delete/${this.field.name}`
      // let id = this.values.code
      // return this.field.removeUrl.replace(/:id/g, id)
    },
    requestHeader() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  created() {
    this.fileList = this.value
      ?.map((item) => {
        // url是否以 png jpg gif 结尾
        let url = `${process.env.VUE_APP_SERVER_IP}${item.split('?')[0]}`
        let uri = item
        let type = ''
        if (
          ['png', 'jpg', 'gif', 'peg', 'bmp'].includes(
            url.slice(url.length - 3)
          )
        ) {
          type = 'image'
        } else {
          type = 'video'
        }
        return {
          url,
          type,
          uri
        }
      })
      .slice(-3)
    this.previewList = this.fileList.map((item) => {
      return item.url
    })
  },
  mounted() {},
  watch: {},
  methods: {
    // 上传成功回调
    handleSuccess(res, file, list) {
      if (res.status === 'failed') {
        this.$notify.error({
          message: res.message,
          type: this.$t('richform.error')
        })
      }
      // 图片url
      let url = `${process.env.VUE_APP_SERVER_IP}${
        res.payload.id.split('?')[0]
      }`
      let fileType = file.raw.type.split('/')[0]
      let uri = res.payload.id
      this.fileList.push({ url, type: fileType, uri })
      // 预览列表
      fileType === 'image' && this.previewList.push(url)
      // 字段规定只要uri
      this.value = this.fileList.map((item) => {
        return item.uri
      })
      // base64
      // 存储this,待会this指向会丢失
      // let _this = this
      // let files = file.raw
      // let img = new Image()
      // img.src = window.URL.createObjectURL(files)
      // if (!window.FileReader) return // 看支持不支持FileReader
      // let reader = new FileReader()
      // reader.readAsDataURL(files) // 这里是最关键的一步，转换成base64
      // reader.onloadend = function () {
      //   _this.fileList.push({
      //     url: this.result,
      //     type: files.type.split('/')[0]
      //   }) // 返显图片
      // }
    },
    // 附件上传前校验
    beforeFileUpload(file) {
      const isLenLimit = this.fileList.length < 3
      const isLt10M = file.size / 1024 / 1024 < 10
      const FileExt = file.name.replace(/.+\./, '')
      const correctFormat =
        ['png', 'jpg', 'gif', 'jpeg', 'mp4'].indexOf(FileExt.toLowerCase()) !==
        -1
      if (!correctFormat) {
        this.$message.error(this.$t('richform.formalError'))
      }
      if (!isLenLimit) {
        this.$message.error(this.$t('richform.upload_file_number_error_prompt'))
      }
      if (!isLt10M) {
        this.$message.error(this.$t('richform.upload_file_size_error_prompt'))
      }
      return isLenLimit && isLt10M && correctFormat
    },
    // 删除 上传的图片/视频
    closeItem(index) {
      // 先删除远端在本地删除保持同步
      let stagingList = this.fileList
      removeStatic(this.removeUrl, stagingList[index]?.uri)
      this.fileList.splice(index, 1)
      // todo value[string]   fileList[{}]  类型不同 会出错
      this.value.splice(index, 1)
      this.value = this.value
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.ClickUploadWidget {
  display: flex;
  height: 60px;
  .svg-icon {
    margin-top: 15px;
    font-size: 25px;
  }
  .itemBox {
    position: relative;
    .closeItem {
      position: absolute;
      color: red;
      font-weight: 700;
      font-size: 17px;
      cursor: pointer;
      top: -5px;
      right: 8px;
    }
    .imgItem {
      margin: 5px 15px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
