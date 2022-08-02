const layoutOfHorizontal = 'h' // 左右布局

const layoutOfVertical = 'v' // 上下布局

module.exports = {

  title: 'xx管理系统',

  subTitle: 'xx-admin-system',

  passwordPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',

  passwordInvalidMessage: '最少八个字符，至少一个大写英文字母，一个小写英文字母，一个数字和一个特殊字符',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * Enable `MirageJS`
   */
  enableMockServer: true,

  layoutOfHorizontal,

  layoutOfVertical,

  /**
   * default two type layout
   */
  layoutType: layoutOfVertical
}
