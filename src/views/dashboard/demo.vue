<template>
  <div>
    <button
      bg="blue-400 hover:blue-600"
      text="sm white"
      p="2"
      border="4 rounded blue-200"
      @click="visible = !visible"
    >
      WindiCSS Attributify Button
    </button>

    <el-dialog
      :visible.sync="visible"
      title="弹框"
    >
      <div class="bg-red-400 text-white p-6">Content</div>
    </el-dialog>

    <div class="grid grid-cols-2 text-center bg-red-500 text-white text-xl divide-x divide-white">
      <div>x: {{ x }}</div>
      <div>y: {{ y }}</div>
    </div>
    <div class="bg-green-500 text-white p-2 my-2">tmp: {{ tmp }}</div>
    <div>
      <el-input v-model="tmp" clearable />
    </div>

    <el-table-wrapper ref="seamlessScrollTableRef" height="300" :data="scrollTableListData">
      <el-table-column label="A" property="a" align="center" />
      <el-table-column label="B" property="b" align="center" />
      <el-table-column label="C" property="c" align="center" />
    </el-table-wrapper>

    <el-divider />

    <el-form :model="model" label-width="100px" class="border p-2 bg-red-100">
      <el-form-item label="测试字段A">
        <el-input v-model="model.a" clearable />
      </el-form-item>
    </el-form>
    <pre>model output: {{ model }}</pre>

    <el-divider>GSAP Animation</el-divider>

    <el-card class="bg-green-100">
      <div slot="header">GSAP Animation</div>
      <div class="flex">
        <el-button @click="doPlay">Play</el-button>
        <el-button @click="doPause">Pause</el-button>
        <el-button @click="doResume">Resume</el-button>
        <el-button @click="doReverse">Reverse</el-button>
        <el-button @click="doRePlay">RePlay</el-button>
      </div>
      <div>
        <div class="gsap2 text-4xl inline-block">🤔</div>
      </div>

      <svg-icon
        icon-class="tree"
        class-name="stroke-2 text-green-600 text-5xl cursor-pointer inline"
        @click="doTransform"
      />
      <div class="gsap-test inline-block text-4xl">😍</div>
    </el-card>

    <div ref="words" class="border-4 border-dashed rounded-3xl border-purple-700 my-2 p-4">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, architecto dolorum ducimus et eum excepturi exercitationem, fuga harum illo ipsam laboriosam minima officiis optio reprehenderit sequi totam, ut veniam voluptas?
    </div>

    <el-divider>Demo Animation</el-divider>

    <div id="demo" ref="machineGunRef">
      <h3 style="visibility: hidden" />
    </div>
    <el-button type="success" @click="doReplayDemo">RePlay Demo</el-button>

    <div ref="el" class="border-dashed border-4 border-purple-600 fixed cursor-pointer p-4 rounded select-none" :style="style"> Drag Me!!! {{ style }}! Position: {{ fx }} {{ fy }}</div>
  </div>
</template>

<script>
import { useMouse, useDraggable } from '@vueuse/core'
import { ref, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import ElTableWrapper from '@/components/ElTableWrapper'

gsap.registerPlugin(TextPlugin)

export default {
  name: 'Demo',
  components: {
    ElTableWrapper
  },
  setup (_, context) {
    const rootInstance = context.root
    const visible = ref(false)
    const { x, y } = useMouse()
    const tmp = ref(null)
    const el = ref(null)
    const words = ref(null)
    const machineGunRef = ref(null)
    const animationState = ref(false)
    const model = ref({
      a: 'test'
    })
    const seamlessScrollTableRef = ref(null)
    const scrollTableListData = ref(Array.from({ length: 50 }, (_, index) => {
      return {
        a: index,
        b: index * 2,
        c: index + 1
      }
    }))
    const { x: fx, y: fy, style } = useDraggable(el, {
      initialValue: { x: 80, y: 80 }
    })

    let timeline = null

    const doTransform = () => {
      gsap.from(
        '.gsap-test',
        { duration: 6, x: 400, ease: 'bounce', rotate: 360 }
      )
    }

    const _sentenceEndExp = /(\.|\?|!)$/g
    const tl = gsap.timeline({ delay: 0.6, repeat: 2, repeatDelay: 4 })

    const machineGun = () => {
      let word
      let isSentenceEnd
      let duration
      let time = 0
      let wordArr = []
      wordArr = words.value.textContent.split(' ').filter(o => o)

      for (let i = 0; i < wordArr.length; i++) {
        word = wordArr[i]
        isSentenceEnd = _sentenceEndExp.test(word)
        duration = Math.max(0.5, word.length * 0.08)
        if (isSentenceEnd) {
          duration += 0.6
        }

        const tmp = document.createElement('h3')
        tmp.innerText = `${word}`
        tmp.style = `
          position: absolute;
          margin: 0 auto;
          // padding: 0;
          width: 100vw;
          text-align: center;
          font-size: 120px;
          // visibility: hidden;
          opacity: 0;
          font-weight: bolder;
          color: red;
          top: 65px;
        `
        machineGunRef.value.append(tmp)
        gsap.set(tmp, { autoAlpha: 0, scale: 0, z: 0.01 })
        tl.to(tmp, { scale: 1.2, duration, ease: 'slow(0.25, 0.9)' }, `${time} - 0.2`)
          .to(tmp, { autoAlpha: 1, duration, ease: 'slow(0.25, 0.9, true)' }, time)
          .to(tmp, { autoAlpha: 0, duration, ease: 'slow(0.25, 0.7)' })

        time += duration - 0.05
        if (isSentenceEnd) {
          time += 0.6
        }
      }
    }

    onMounted(() => {
      rootInstance.seamlessScrollOfElTableMixin(seamlessScrollTableRef.value)

      machineGun()
      timeline = gsap.timeline({ paused: true })

      timeline.to(
        '.gsap2',
        { x: 400, rotate: 360, ease: 'bounce', duration: 3 }
      )
    })

    const doPlay = () => {
      timeline.play()
    }
    const doPause = () => {
      timeline.pause()
    }
    const doResume = () => {
      timeline.resume()
    }
    const doReverse = () => {
      timeline.reverse()
    }
    const doRePlay = () => {
      timeline.restart()
    }

    const doReplayDemo = () => {
      tl.restart()
    }

    return {
      visible,
      x,
      y,
      el,
      machineGunRef,
      words,
      fx,
      fy,
      style,
      tmp,
      model,
      animationState,
      seamlessScrollTableRef,
      scrollTableListData,
      doTransform,
      doPlay,
      doPause,
      doResume,
      doReverse,
      doRePlay,
      doReplayDemo
    }
  }
}
</script>

<style scoped>
#demo {
  position: relative;
  height: 300px;
  background-color: #000;
  margin: auto;
  overflow: hidden;
}
</style>
