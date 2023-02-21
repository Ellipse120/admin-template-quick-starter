import gsap from 'gsap'
import { parseTime, parseRelativeTime, formatText, toTree, downFileStream, genUUID, mapToKeyValueList } from '@/utils'

export const utilsMixin = {
  methods: {
    formatTimeMixin: parseTime,
    parseRelativeTimeMixin: parseRelativeTime,
    formatTextMixin: formatText,
    toTreeMixin: toTree,
    downFileStreamMixin: downFileStream,
    genUUIDMixin: genUUID,
    mapToKeyValueListMixin: mapToKeyValueList,
    seamlessScrollOfElTableMixin (tableRef) {
      /**
       * Enable `ElTableWrapper`, `ElTable`'s rows seamless scroll
       *
       * usage: `
       *    nextTick(() => {
       *      rootInstance.seamlessScrollOfElTableMixin(seamlessScrollOfTableRef.value)
       *    })
       * `
       */
      const isElTableWrapper = tableRef.$options.name === 'ElTableWrapper'
      const ref = isElTableWrapper ? tableRef?.$children?.[0] : tableRef
      const divData = ref?.$refs?.bodyWrapper
      const boxes = gsap.utils.toArray(divData.getElementsByTagName('tbody')[0].children)

      if (!boxes.length) return

      const height = boxes?.[0].getBoundingClientRect().height || 35
      const duration = 20
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        defaults: {
          ease: 'none'
        }
      })

      boxes?.forEach((el, i) => {
        const dur = duration / boxes.length * (i + 1)

        console.log(-height * (i + 1), height * (boxes?.length - i))

        tl
          .to(
            el,
            {
              y: -height * (i + 1),
              duration: dur
            },
            0
          )
          .fromTo(
            el,
            {
              y: height * (boxes?.length - i + 10)
            },
            {
              y: 0,
              duration: duration - dur,
              immediateRender: false
            },
            '>'
          )
      })

      const doPlay = () => {
        tl.play()
      }

      const doPause = () => {
        tl.pause()
      }

      const doResume = () => {
        tl.resume()
      }

      doPlay()

      tableRef.$el.addEventListener('mouseenter', doPause)
      tableRef.$el.addEventListener('mouseleave', doResume)
    }
  }
}
