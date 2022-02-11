import { useTitle } from '@vueuse/core'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
import defaultSettings from '@/project-config'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const title = to.meta.title ? `${to.meta.title} - ${defaultSettings.title}` : defaultSettings.title
  useTitle(title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // loadingInstance = Loading.service({
          //   fullscreen: true,
          //   text: '获取数据中',
          //   spinner: 'el-icon-loading',
          //   background: 'linear-gradient(to bottom, #409eff, #ffffff)',
          //   customClass: 'loading-style'
          // })
          const { roleList } = await store.dispatch('user/getInfo').catch((e) => {
            Message.error(e.toString() || '获取用户信息失败')
          })

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roleList)

          // await store.dispatch('permission/getAllOrganizations')

          // add routes
          accessRoutes?.forEach(r => {
            router.addRoute(r)
          })

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error.toString() || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
