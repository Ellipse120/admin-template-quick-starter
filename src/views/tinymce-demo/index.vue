<template>
  <div>
    <pre>{{ model.a }}</pre>

    <el-button @click="add">
      add
    </el-button>

    <rich-text-editor ref="editor" v-model="model.a" />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import RichTextEditor from '@/components/RichTextEditor'

export default {
  name: 'TinymceDemo',
  components: {
    RichTextEditor
  },
  setup () {
    const model = ref({
      a: null
    })
    const editor = ref(null)

    const add = () => {
      const id = Math.random() * 1000
      const el = window.tinymce.activeEditor.dom.createHTML('table', {
        id: id
      }, '<thead><tr><td>1</td><td>2</td></tr></thead>')
      window.tinymce.activeEditor.selection.setContent(el)
      // window.tinymce.activeEditor.dom.add(window.tinymce.activeEditor.getBody(), 'b', { title: 'lsssss' }, 'fuck')
    }

    return {
      model,
      editor,
      add
    }
  }
}
</script>

<style scoped>

</style>
