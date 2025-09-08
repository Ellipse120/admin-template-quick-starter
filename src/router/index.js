import Vue from 'vue'
import Router from 'vue-router'
import LayoutOfHorizontal from '@/layout/index.vue'
import LayoutOfVertical from '@/layout/index-new.vue'
import config from '../project-config'

const checkLayout = () => {
  if (config.layoutType === config.layoutOfHorizontal) return LayoutOfHorizontal
  if (config.layoutType === config.layoutOfVertical) return LayoutOfVertical
}

const Layout = checkLayout()

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * Lazy-loads view components, but with better UX. A loading view
 * will be used if the component takes a while to load, falling
 * back to a timeout view in case the page fails to load.
 *
 * !!!WARNING: when you need to use `In-Component Guards`, `Don't` use.
 * ?Components loaded with this strategy will not have access to in-component guards, such as beforeRouteEnter, beforeRouteUpdate, and BeforeRouteLeave.
 * ?If you need to use these, you must either use route-level guards instead or lazy-load the component directly, without handling loading state.
 *
 * You can use this component to lazy-load a route with:
 * @param asyncView
 * @returns {Promise<{functional: boolean, render(*, {data?: *, children?: *}): *}>}
 */
function lazyLoadView (asyncView) {
  const asyncHandler = () => ({
    component: asyncView,
    loading: import('@/views/loading.vue'),
    delay: 4e2, // Default: 200 (milliseconds).
    error: import('@/views/error.vue'),
    timeout: 4e4 // Default: Infinity (milliseconds). Time before giving up trying to load the component.
  })

  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      return h(asyncHandler, data, children)
    }
  })
}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => lazyLoadView(import('@/views/login/index.vue')),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => lazyLoadView(import('@/views/dashboard/index.vue')),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/404',
    component: () => lazyLoadView(import('@/views/404.vue')),
    hidden: true,
    meta: { title: '404' }
  }
]

/**
 * checkPermissionRoutes
 * the routes that need to be dynamically loaded
 */
export const checkPermissionRoutes = [
  {
    path: '/crud-demo',
    component: Layout,
    meta: { title: 'CrudDemo' },
    alwaysShow: true,
    children: [
      {
        path: '',
        name: 'CrudDemo',
        component: () => lazyLoadView(import('@/views/crud-demo/index.vue')),
        meta: { title: 'CrudDemo' }
      }
    ]
  },
  {
    path: '/system-management',
    component: Layout,
    name: 'SystemManagement',
    redirect: '/system-management/user-management',
    alwaysShow: true,
    meta: { title: 'System Management' },
    children: [
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => lazyLoadView(import('@/views/user-management/index.vue')),
        meta: { title: 'User Management' }
      },
      {
        path: 'organization-management',
        name: 'OrganizationManagement',
        component: () => lazyLoadView(import('@/views/organization-management/index.vue')),
        meta: { title: 'Organization Management' }
      },
      {
        path: 'menu-management',
        name: 'MenuManagement',
        component: () => lazyLoadView(import('@/views/menu-management/index.vue')),
        meta: { title: 'Menu Management' }
      },
      {
        path: 'dict-management',
        name: 'DictManagement',
        component: () => lazyLoadView(import('@/views/dict-management/index.vue')),
        meta: { title: 'Dict Management' }
      },
      {
        path: 'mirage-todos-demo',
        name: 'MirageTodosDemo',
        component: () => lazyLoadView(import('@/views/mirage-todos-demo/index.vue')),
        meta: { title: 'Mirage HTTP Mock Demo' }
      },
      {
        path: 'tinymce-demo',
        name: 'TinymceDemo',
        component: () => lazyLoadView(import('@/views/tinymce-demo/index.vue')),
        meta: { title: 'Tinymce Editor Demo' }
      },
      {
        path: 'charts-demo',
        name: 'ChartsDemo',
        component: () => lazyLoadView(import('@/views/charts-demo/index.vue')),
        meta: { title: 'ECharts Demo' }
      },
      {
        path: 'x6-demo',
        component: { render: (h) => h('router-view') },
        meta: { title: 'X6 Demo' },
        children: [
          {
            path: '',
            name: 'X6',
            component: () => lazyLoadView(import('@/views/x6/index.vue')),
            meta: { title: 'Index' }
          },
          {
            path: 'flow',
            name: 'FlowChart',
            component: () => lazyLoadView(import('@/views/x6/flow.vue')),
            meta: { title: 'Flow Chart' }
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
