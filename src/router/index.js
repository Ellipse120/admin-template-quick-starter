import Vue from 'vue'
import Router from 'vue-router'
import LayoutOfHorizontal from '@/layout/index'
import LayoutOfVertical from '@/layout/index-new'
import { layoutType, layoutOfVertical, layoutOfHorizontal } from '@/project-config'

const checkLayout = () => {
  if (layoutType === layoutOfHorizontal) return LayoutOfHorizontal
  if (layoutType === layoutOfVertical) return LayoutOfVertical
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
    loading: require('@/views/loading').default,
    delay: 4e2, // Default: 200 (milliseconds).
    error: require('@/views/error').default,
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
    component: () => lazyLoadView(import('@/views/login/index')),
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
        component: () => lazyLoadView(import('@/views/dashboard/index')),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/404',
    component: () => lazyLoadView(import('@/views/404')),
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
        component: () => lazyLoadView(import('@/views/crud-demo/index')),
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
    meta: { title: '系统管理' },
    children: [
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => lazyLoadView(import('@/views/user-management/index')),
        meta: { title: '用户管理' }
      },
      {
        path: 'organization-management',
        name: 'OrganizationManagement',
        component: () => lazyLoadView(import('@/views/organization-management/index')),
        meta: { title: '组织机构' }
      },
      {
        path: 'menu-management',
        name: 'MenuManagement',
        component: () => lazyLoadView(import('@/views/menu-management/index')),
        meta: { title: '菜单管理' }
      },
      {
        path: 'dict-management',
        name: 'DictManagement',
        component: () => lazyLoadView(import('@/views/dict-management/index')),
        meta: { title: '字典管理' }
      },
      {
        path: 'mirage-todos-demo',
        name: 'MirageTodosDemo',
        component: () => lazyLoadView(import('@/views/mirage-todos-demo/index')),
        meta: { title: '模拟接口服务 Demo' }
      },
      {
        path: 'tinymce-demo',
        name: 'TinymceDemo',
        component: () => lazyLoadView(import('@/views/tinymce-demo/index')),
        meta: { title: 'Tinymce Demo' }
      },
      {
        path: 'charts-demo',
        name: 'ChartsDemo',
        component: () => lazyLoadView(import('@/views/charts-demo/index')),
        meta: { title: 'ECharts Demo' }
      },
      {
        path: 'filerobot-image-editor-demo',
        name: 'FilerobotImageEditorDemo',
        component: () => lazyLoadView(import('@/views/filerobot-image-editor-demo/index')),
        meta: { title: 'FilerobotImageEditor Demo' }
      },
      {
        path: 'x6-demo',
        component: { render: (h) => h('router-view') },
        meta: { title: 'X6 Demo' },
        children: [
          {
            path: '',
            name: 'X6',
            component: () => lazyLoadView(import('@/views/x6/index')),
            meta: { title: 'Index' }
          },
          {
            path: 'flow',
            name: 'FlowChart',
            component: () => lazyLoadView(import('@/views/x6/flow')),
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
