<script>
/**
 * @description 按钮容器组件
 * @param btnCount 显示按钮个数，默认：2
 * @example
 <operation-btn-groups :btn-count="1">
   <el-button-wrapper type="text" icon="el-icon-edit" @click="handleOperate(row, '编辑')">编辑</el-button-wrapper>
   <el-button-wrapper type="text" icon="el-icon-guide" @click="handleOperate(row, '加急')">加急</el-button-wrapper>
   <el-button-wrapper type="text" icon="el-icon-s-promotion" @click="handleOperate(row, '推送')">推送</el-button-wrapper>
   <el-button-wrapper type="text" icon="el-icon-refresh-left" @click="handleOperate(row, '收回')">收回</el-button-wrapper>
 </operation-btn-groups>
 */
export default {
  name: 'OperationBtnGroups',
  props: {
    btnCount: {
      type: Number,
      default: 2
    }
  },
  render (h) {
    const rawContents = this.$slots.default.filter(vNode => vNode.tag) // filter `text` and `tag === undefined` elm
    const vNodeCount = this.btnCount

    const displayedButtons = rawContents.slice(0, vNodeCount)
    const hiddenButtons = rawContents.slice(vNodeCount, rawContents.length)

    const moreBtn = h('el-button', {
      class: ['ml-2'],
      props: {
        type: 'text',
        icon: 'el-icon-more'
      }
    }, '更多')

    const morDropdownBtn = h('el-dropdown', {}, [
      moreBtn,
      h('el-dropdown-menu', {
        slot: 'dropdown'
      }, hiddenButtons.map(btnVNode => {
        return h('el-dropdown-item', {}, [btnVNode])
      }))
    ])

    if (rawContents.length <= vNodeCount) {
      return h('div', {
        class: ['btn-group-wrapper']
      }, rawContents)
    } else {
      return h('div', {
        class: ['btn-group-wrapper']
      }, [
        ...displayedButtons,
        ...[morDropdownBtn]
      ])
    }
  }
}
</script>

<style lang="scss">
.btn-group-wrapper {
  .el-button+.el-button {
    margin-left: 0;
  }
}
</style>
