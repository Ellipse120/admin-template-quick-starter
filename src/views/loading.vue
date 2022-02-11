<script>
export default {
  name: 'Loading',
  data () {
    return {
      loadingIndicator: null
    }
  },
  mounted () {
    this.loadingIndicator = this.$loading({
      lock: true,
      text: '加载组件中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, .8)',
      customClass: 'loading-style'
    })
  },
  beforeDestroy () {
    this.loadingIndicator.close()
  },
  render (h) {
    return h('div')
  }
}
</script>

