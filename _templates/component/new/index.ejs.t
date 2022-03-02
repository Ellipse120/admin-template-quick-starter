---
to: src/components/<%= h.changeCase.pascal(name) %>/index.vue
---

<template>
  <div>
    <h1>Component template <%= h.changeCase.pascal(name) %></h1>
  </div>
</template>

<script>
export default {
  name: '<%= h.changeCase.pascal(name) %>',
  data () {
    return {
      message: 'Hello <%= h.changeCase.pascal(name) %>'
    }
  }
}
</script>

