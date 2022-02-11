<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as utils from '@/utils'
import { provide } from '@vue/composition-api'
import { Message, MessageBox, Notification, Loading } from 'element-ui'

export default {
  name: 'App',
  setup () {
    provide('utils', utils)
    provide('$message', Message)
    provide('$loading', Loading.service)
    provide('$msgbox', MessageBox)
    provide('$alert', MessageBox.alert)
    provide('$confirm', MessageBox.confirm)
    provide('$prompt', MessageBox.prompt)
    provide('$notify', Notification)
  }
}
</script>
