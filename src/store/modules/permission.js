import { checkPermissionRoutes, constantRoutes } from '@/router'
import { getAllOrganizations } from '@/api/common'
import { transformTree } from '@/utils'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes checkPermissionRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: [],
  allOrganizations: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  setAllOrganizations: (state, allOrganizations) => {
    state.allOrganizations = allOrganizations
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = checkPermissionRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(checkPermissionRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  getAllOrganizations ({ commit }) {
    getAllOrganizations().then(({ data }) => {
      const newData = data.map(i => ({
        id: i.key,
        parent: i.ext.parentCode,
        value: i.value,
        organType: i.ext.organType,
        ext: i.ext
      }))
      const UNIT = data.filter(i => i.ext.organType === 'UNIT')
      const DEPT = data.filter(i => i.ext.organType === 'DEPT')
      const obj = {
        treeData: transformTree(newData),
        UNIT,
        DEPT
      }
      commit('setAllOrganizations', obj)
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
