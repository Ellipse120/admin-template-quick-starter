import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      tableHeight: null,
      $_resizeHandler: null,
      repairHeight: 0
    }
  },
  mounted () {
    this.$_resizeHandler = debounce(() => {
      this.$nextTick(() => {
        this.setHeight()
      })
    }, 100)
    this.setHeight()
    this.$_initResizeEvent()
  },
  beforeDestroy () {
    this.$_destroyResizeEvent()
  },
  methods: {
    setHeight () {
      this.tableHeight = window.innerHeight - this.$refs.searchTable?.$el?.getBoundingClientRect().top - 84 - this.repairHeight
    },

    $_initResizeEvent () {
      window.addEventListener('resize', this.$_resizeHandler)
    },

    $_destroyResizeEvent () {
      window.removeEventListener('resize', this.$_resizeHandler)
    }
  }
}
