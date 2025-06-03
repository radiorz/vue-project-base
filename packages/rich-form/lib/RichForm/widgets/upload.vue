<!--
  values需要传入image字段才可以渲染出图片，传入uploadImgUrl才可以上传图片
  values= {uploadImgUrl:'',image:''},
  只支持单个图片上传！
  真正的上传在richform的index文件执行
  imgType：指定图片的类型。如二维码: imgType: 'qrcode'

  assetType: 指定上传文件的类型，如image、file等，默认image
  multiple: 是否多选，默认false
-->

<template>
  <el-upload
    class="avatar-uploader"
    :disabled="field.readOnly"
    :show-file-list="field.multiple"
    :list-type="field.multiple ? 'picture-card' : ''"
    :action="uploadImgUrl"
    :auto-upload="false"
    :on-remove="handleRemove"
    :on-change="handleAvatarChange"
    :drag="field.drag"
    :multiple="field.multiple"
    :style="field.readOnly ? 'backgroundColor:#F5F7FA' : ''"
  >
    <!-- 多选 -->
    <div v-if="field.multiple">
      <i
        slot="default"
        class="el-icon-plus"
        :style="{
          position: 'absolute',
          top: '58px',
          left: '58px'
        }"
      ></i>
    </div>
    <!-- 单选 -->
    <div v-else>
      <!-- 图片 -->
      <div v-if="field.assetType === 'image'">
        <div
          v-if="value && !error && !field.readOnly"
          class="close-icon"
          @click.stop="removePicture"
        >
          <i class="el-icon-close"></i>
        </div>

        <img
          v-if="value && !error"
          :src="value"
          class="avatar"
          style="height: 180px; width: 280px"
          @error="error = true"
        />
        <template v-else>
          <div
            v-if="field.customTips"
            style="font-size: 28px; line-height: 180px"
          >
            {{ field.customTips }}
          </div>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" style="font-size: 12px">
              {{ $t('richform.drapPng') }}
            </div>
          </div>
        </template>
      </div>
      <!-- 文件 -->
      <div v-else>
        <div
          v-if="value && !error && !field.readOnly"
          class="close-icon"
          @click.stop="removeFile"
        >
          <i class="el-icon-close"></i>
        </div>
        <div
          v-if="value && !error"
          style="
            height: 180px;
            width: 280px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          "
          @error="error = true"
        >
          <svg-icon
            style="font-size: 36px; margin-bottom: 4px"
            :icon-class="
              isValidIconType(getFileType) ? getFileType.toLowerCase() : 'file'
            "
          ></svg-icon>
          <div style="font-size: 12px; max-width: 70%">{{ getTitle }}</div>
        </div>
        <template v-else>
          <div
            v-if="field.customTips"
            style="font-size: 28px; line-height: 180px"
          >
            {{ field.customTips }}
          </div>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" style="font-size: 12px">上传文件</div>
          </div>
        </template>
      </div>
    </div>
  </el-upload>
</template>

<script>
import mixin from './base.mixin'
import { uploadImgUrl, getImgUrl } from '../urls'
import eventbus from '../eventbus'

export default {
  name: 'UploadWidget',
  mixins: [mixin],
  data() {
    return {
      fileName: '',
      defaultUrl: '',
      error: false,
      imgType: this.schema.imgType || 'default'
    }
  },
  computed: {
    getTitle() {
      if (this.fileName) {
        return this.fileName
      }
      if (!this.field.assetTitleField) {
        return ''
      }
      return this.values[this.field.assetTitleField]
    },
    getFileType() {
      // 根据this.getTitle解析文件类型
      return this.getTitle && this.getTitle.split('.').pop()
    },
    // 上传的图片url
    uploadImgUrl() {
      return this.values.uploadImgUrl
        ? this.values.uploadImgUrl
        : this.defaultUrl
    },
    // 显示图片的url
    imageUrl() {
      return this.value ? this.value : ''
    }
  },
  watch: {
    value() {
      this.error = false
    }
  },
  created() {
    this.fileName = ''
  },
  mounted() {},
  methods: {
    // 判断是否为有效的图标类型
    isValidIconType(type) {
      const validIconTypes = [
        'bmp',
        'mov',
        'gif',
        'dxf',
        'exe',
        'img',
        'dwt',
        'css',
        'jpg',
        'mp3',
        'mp4',
        'txt',
        'ppt',
        'xlsx',
        'html',
        'rtf',
        'svg',
        'zip',
        'rar',
        'png',
        'word',
        'pdf',
        'music',
        'dws',
        'dwg'
      ]
      return validIconTypes.includes(type.toLowerCase())
    },
    // 定义一个规范化Schema的方法，用来为组件添加个性化的默认属性
    defaultSchema() {
      return {
        drag: true,
        assetType: 'image',
        multiple: false
      }
    },
    toFieldValue(value) {
      if (this.field.assetType === 'image') {
        // 多选
        if (this.field.multiple) {
          return value.map((item) => {
            if (
              item &&
              !item.startsWith('http') &&
              !item.startsWith('blob') &&
              !item.startsWith('https') &&
              !item.startsWith('data:image')
            ) {
              return `${process.env.VUE_APP_SERVER_IP}${item}`
            } else {
              return item
            }
          })
          // 单选
        } else {
          if (Array.isArray(value)) {
            return value[0]
          }
          // 图片不显示，此处待验证
          if (
            value &&
            !value.startsWith('http') &&
            !value.startsWith('blob') &&
            !value.startsWith('https') &&
            !value.startsWith('data:image')
          ) {
            return `${process.env.VUE_APP_SERVER_IP}${value}`
          }
        }
      }
      return value
    },
    fromFieldValue(value) {
      return value
    },
    getFriendValue(value) {
      return value
    },
    handleAvatarChange(file, fileList) {
      if (this.field.multiple) {
        this.value = fileList.map((item) => URL.createObjectURL(item.raw))
        if (!this.values.submitFile) {
          this.values.submitFile = {}
        }
        this.values.submitFile[this.field.assetType] = fileList.map(
          (item) => item.raw
        )
      } else {
        if (this.field.assetType === 'image') {
          const isJPG = file.raw.type === 'image/png'
          const isLt150kb = file.size / 1024 / 1024 < 0.15
          if (!isJPG) {
            this.$message.error(this.$t('richform.imgTypeOnlyPng'))
          }
          if (!isLt150kb) {
            this.$message.error(this.$t('richform.imgSizeSmaller150kb'))
          }
          if (isJPG && isLt150kb) {
            this.error = false
            this.value = URL.createObjectURL(file.raw)
            if (!this.values.submitImgFile) {
              this.values.submitImgFile = {}
            }
            this.values.submitImgFile[this.imgType] = file.raw
          }
        } else {
          this.value = URL.createObjectURL(file.raw)
          this.fileName = file.raw.name
          if (!this.values.submitFile) {
            this.values.submitFile = {}
          }
          this.values.submitFile[this.field.assetType] = file.raw
        }
      }
    },
    removePicture() {
      if (this.values && this.values.submitImgFile) {
        this.values.submitImgFile[this.imgType] = ''
      }
      this.value = ''
    },
    removeFile() {
      if (this.values && this.values.submitFile) {
        this.values.submitFile[this.field.assetType] = ''
      }
      this.value = ''
    },
    handleRemove(file, fileList) {
      if (!fileList.length) {
        this.value = ''
        this.values.submitFile = []
      } else {
        this.value = fileList.map((item) => URL.createObjectURL(item.raw))
        this.values.submitFile[this.field.assetType] = fileList.map(
          (item) => item.raw
        )
      }
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.el-upload-dragger {
  width: 280px;
  height: 180px;
  display: block;
  background-color: transparent;
}
.close-icon {
  position: absolute;
  right: 0;
  & > :hover {
    color: red;
  }
}
</style>
