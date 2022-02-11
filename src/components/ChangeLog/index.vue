<template>
  <div>
    <el-skeleton v-if="isLoading" :rows="5" animated />
    <div v-else class="changelog" v-html="changelog" />
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ChangeLog',
  data () {
    return {
      md: null,
      isLoading: false
    }
  },
  computed: {
    changelog () {
      if (!this.md) return null
      return marked(this.md, {
        gfm: true
      })
    }
  },
  async created () {
    this.isLoading = true
    await this.getChangelog().finally(() => {
      this.isLoading = false
    })
  },
  methods: {
    async getChangelog () {
      const url = '/CHANGELOG.md'
      const res = await fetch(url)
      this.md = await res.text()
    }
  }
}
</script>

<style scoped>
.text-color {
  @apply text-blue-400;
}

.changelog /deep/ h1 {
  @apply text-color m-4 text-6xl;
}
.changelog /deep/ h1 + p {
  @apply text-gray-400 m-4 text-xl;
}

.changelog /deep/ h2 {
  @apply text-color m-4 text-5xl;
}
.changelog /deep/ h2 a {
  @apply text-color hover:underline;
}
.changelog /deep/ h3 {
  @apply text-color m-4 text-4xl;
}
.changelog /deep/ ul {
  @apply list-disc list-inside;
}
.changelog /deep/ ul li {
  @apply bg-gradient-to-r from-indigo-50 to-indigo-100 m-4 p-2 rounded text-indigo-600;
}
.changelog /deep/ ul li strong {
  @apply text-purple-700;
}
.changelog /deep/ ul li a {
  @apply text-color transition hover:text-pink-500 hover:shadow hover:underline;
}
</style>
