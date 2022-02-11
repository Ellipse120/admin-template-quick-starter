<template>
  <tinymce-editor
    v-model="contentData"
    :tinymce-script-src="localSrc"
    v-bind="$attrs"
    :init="{
      ...{
        height: height,
        menubar: false,
        language: 'zh_CN',
        draggable_modal: true,
        statusbar: false,
        image_list: [
          { title: 'phm-favicon', value: 'http://10.128.198.185:8080/phm/favicon.ico' }
        ],
        images_upload_handler: handleUpload,
        imagetools_fetch_image: fetchImage,
        paste_data_images: true
      },
      ...defaultOptions,
      ...options
    }"
    v-on="$listeners"
  />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { richTextEditorOptions } from '@/components/RichTextEditor/defaultOptions'

export default {
  name: 'RichTextEditor',
  components: {
    tinymceEditor: Editor
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: 400
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      contentData: '',
      localSrc: process.env.NODE_ENV !== 'development' ? process.env.BASE_URL + '/js/tinymce/tinymce.min.js' : '/js/tinymce/tinymce.min.js',
      defaultOptions: richTextEditorOptions
    }
  },
  watch: {
    value: {
      handler: function (value) {
        this.contentData = value
      },
      immediate: true
    }
  },
  methods: {
    async handleUpload (blobInfo, success, failure, progress) {
      const formData = new FormData()
      formData.append('file', blobInfo.blob())
      success()
    },

    fetchImage (img) {
      // eslint-disable-next-line no-undef
      return new tinymce.util.Promise(resolve => {
        resolve(new Blob(img))
      })
    }
  }
}
</script>

<style scoped>

</style>
