import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import ElButtonWrapper from './index.vue'

export default {
  title: '公共组件/ElButtonWrapper',
  component: ElButtonWrapper,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['mini', 'small', 'medium']
    }
  }
  // decorators: [() => ({ template: '<div class="bg-red-500"><story/></div>' })]
}

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { ElButtonWrapper },
    template: `<ElButtonWrapper v-bind="$props">{{ $props.label }}</ElButtonWrapper>`
  }
}

export const Primary = Template.bind({})
Primary.args = {
  label: 'Button',
  size: 'mini'
}

