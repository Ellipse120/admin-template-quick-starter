<template>
  <div>
    <pre>{{ model.a }}</pre>

    <rich-text-editor v-model="model.a" />
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

    return {
      model
    }
  }
}
</script>

<style scoped>

</style>
