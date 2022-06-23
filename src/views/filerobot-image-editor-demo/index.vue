<template>
  <div>
    <el-button @click="getImageData">get Img</el-button>
    <div id="editor_container" class="h-80vh" />
  </div>
</template>

<script>
import VanillaFilerobotImageEditor from 'filerobot-image-editor'

let filerobotImageEditor

export default {
  name: 'FilerobotImageEditorDemo',
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    getImageData () {
      const a = filerobotImageEditor.getCurrentImgData()
      console.log(a)
    },

    init () {
      const { TABS, TOOLS } = VanillaFilerobotImageEditor
      const config = {
        source: require('@/assets/a.jpeg'),
        // source: require('@/assets/train/train.png'),
        onSave: (editedImageObject, designState) => {
          console.log('saved', editedImageObject, designState)
        },
        annotationsCommon: {
          fill: 'transparent',
          opacity: 1,
          stroke: 'red',
          strokeWidth: 1
        },
        tools: ['crop'],
        translations: {
          name: '名称',
          save: '保存',
          saveAs: '另存为',
          back: '返回',
          loading: '加载中',
          resetOperations: '重置/删除所有操作',
          changesLoseConfirmation: '所有更改都将丢失',
          changesLoseConfirmationHint: '你确定要继续吗？',
          cancel: '取消',
          continue: '继续',
          undoTitle: '撤销上一次操作',
          redoTitle: '重做上一次操作',
          showImageTitle: '显示原图',
          zoomInTitle: '放大',
          zoomOutTitle: '缩小',
          toggleZoomMenuTitle: '切换缩放菜单',
          adjustTab: '调整',
          finetuneTab: '微调',
          filtersTab: '过滤器',
          watermarkTab: '水印',
          annotateTab: '绘制',
          resize: '调整大小',
          resizeTab: '调整大小页签',
          invalidImageError: '提供的图片无效',
          uploadImageError: '上传图片时出错',
          areNotImages: '不是图片',
          isNotImage: '不是图片',
          toBeUploaded: '待上传',
          cropTool: '裁剪工具',
          original: '原件',
          custom: '自定义',
          square: '正方形',
          landscape: '美化',
          portrait: '人像',
          ellipse: '椭圆',
          classicTv: '经典TV',
          cinemascope: '银幕',
          arrowTool: '箭头工具',
          blurTool: '模糊工具',
          brightnessTool: '亮度工具',
          contrastTool: '对比度工具',
          ellipseTool: '椭圆工具',
          unFlipX: '取消翻转 X',
          flipX: '翻转 X',
          unFlipY: '取消翻转 Y',
          flipY: '翻转 Y',
          hsvTool: 'HSV',
          hue: 'Hue',
          saturation: '色调',
          value: 'Value',
          imageTool: '图像工具',
          importing: '导入中...',
          addImage: '+ 添加图片',
          lineTool: '线工具',
          penTool: '画笔工具',
          polygonTool: '多边形工具',
          sides: '边',
          rectangleTool: '矩形工具',
          cornerRadius: '角半径',
          resizeWidthTitle: '像素宽度',
          resizeHeightTitle: '像素高度',
          toggleRatioLockTitle: '切换比率锁定',
          reset: '重置',
          resetSize: '重置为原始图像大小',
          rotateTool: '旋转',
          textTool: '文本工具',
          textSpacings: '文字间距',
          textAlignment: '文字对齐方式',
          fontFamily: '字体',
          size: '大小',
          letterSpacing: '字母间距',
          lineHeight: '行高',
          warmthTool: '色温工具',
          addWatermark: '+ 添加水印',
          addWatermarkTitle: '添加水印标题',
          uploadWatermark: '上传水印',
          addWatermarkAsText: '添加文本水印',
          padding: '内间距',
          shadow: '阴影',
          horizontal: '水平',
          vertical: '垂直',
          blur: '模糊',
          opacity: '透明度',
          position: '位置',
          stroke: '描边',
          saveAsModalLabel: '图片另存为',
          extension: '扩展名',
          nameIsRequired: '名字必填',
          quality: '质量',
          imageDimensionsHoverTitle: '保存的图片大小（宽x高）',
          cropSizeLowerThanResizedWarning:
    '注意，选定的裁剪区域低于应用的调整大小，这可能会导致图片质量下降',
          actualSize: '实际尺寸（100%）',
          fitSize: '适合尺寸'
        },
        Crop: {
          minWidth: 14,
          minHeight: 14,
          maxWidth: null,
          maxHeight: null,
          ratio: 'original',
          ratioTitleKey: 'original',
          noPresets: false,
          autoResize: true,
          presetsItems: [
            {
              titleKey: 'classicTv',
              descriptionKey: '4:3',
              ratio: 4 / 3
              // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
            },
            {
              titleKey: 'cinemascope',
              descriptionKey: '21:9',
              ratio: 21 / 9
              // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
            }
          ],
          presetsFolders: [
            {
              titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
              // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
              groups: [
                {
                  titleKey: 'facebook',
                  items: [
                    {
                      titleKey: 'profile',
                      width: 180,
                      height: 180,
                      descriptionKey: 'fbProfileSize'
                    },
                    {
                      titleKey: 'coverPhoto',
                      width: 820,
                      height: 312,
                      descriptionKey: 'fbCoverPhotoSize'
                    }
                  ]
                }
              ]
            }
          ]
        },
        tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FINETUNE, TABS.FILTERS], // or ['Adjust', 'Annotate', 'Watermark']
        defaultTabId: TABS.ANNOTATE, // or 'Annotate'
        defaultToolId: TOOLS.RECT // or 'Text'
      }

      filerobotImageEditor = new VanillaFilerobotImageEditor(
        document.querySelector('#editor_container'),
        config
      )

      filerobotImageEditor.render({
        onClose: (closingReason) => {
          console.log('Closing reason', closingReason)
          filerobotImageEditor.terminate()
        }
      })
    }
  }
}
</script>
