import gsap from 'gsap'

/**
 * 自动滚动列表
 * @param option
 * @param option.itemHeight 行高
 * @param option.listItemClass 行class名称
 */
const initSeamlessScroll = (option = { itemHeight: 45, listItemClass: '.box' }) => {
  const height = option?.itemHeight || 45
  const boxes = gsap.utils.toArray(option?.listItemClass || '.box')
  const duration = 200
  const tl = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: 'none'
    }
  })

  boxes?.forEach((el, i) => {
    const dur = duration / boxes?.length * (i + 1)

    tl
      .to(el, {
        y: -height * (i + 1),
        duration: dur
      }, 0)
      .fromTo(el, {
        y: height * (boxes?.length - i - 1)
      }, {
        y: 0,
        duration: duration - dur,
        immediateRender: false
      }, '>')
  })
}

export {
  initSeamlessScroll
}
