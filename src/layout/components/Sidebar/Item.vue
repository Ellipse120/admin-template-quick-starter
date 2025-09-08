<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vNodes = []
    console.log(icon)

    if (icon) {
      if (icon.includes('el-icon')) {
        vNodes.push(h('i', { class: `${[icon, 'sub-el-icon']}` }, title))
      } else {
        vNodes.push(h('div', {
          class: `i-material-symbols-menu-rounded`
        }, title))
      }
    }

    if (title) {
      // vNodes.push(<span slot='title' title={title}>{(title)}</span>)
      vNodes.push(h('span', { class: `${title}` }, title))
    }
    return vNodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
