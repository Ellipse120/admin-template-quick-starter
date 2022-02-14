const boolList = [
  { key: true, value: '是' },
  { key: false, value: '否' }
]

const boolNumList = [
  { key: 1, value: '是' },
  { key: 0, value: '否' }
]

const boolStrList = [
  { key: '1', value: '是' },
  { key: '0', value: '否' }
]

const departmentList = Array.from({ length: 20 }, (_, index) => (
  {
    key: index,
    value: `部门${index + 1}`
  }
))

const userList = Array.from({ length: 20 }, (_, index) => (
  {
    key: index,
    value: `用户${index + 1}`
  }
))

const modelIds = [
  { key: 'CRH380B', value: 'CRH380B' },
  { key: 'CRH380BL', value: 'CRH380BL' },
  { key: 'CRH380D', value: 'CRH380D' },
  { key: 'CR400BF', value: 'CR400BF' },
  { key: 'CR400BF-A', value: 'CR400BF-A' }
]

const menuTypes = [
  { key: 'DIR', value: '目录' },
  { key: 'MENU', value: '菜单' },
  { key: 'BUTTON', value: '按钮' }
]

const genderOptions = [
  { key: '女', value: '女' },
  { key: '男', value: '男' },
  { key: '其他', value: '其他' }
]

const state = {
  boolNumList,
  boolStrList,
  boolList,
  modelIds,
  menuTypes,
  departmentList,
  userList,
  genderOptions
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

