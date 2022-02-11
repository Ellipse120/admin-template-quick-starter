const layoutOfHorizontal = 'h' // 左右布局

const layoutOfVertical = 'v' // 上下布局

module.exports = {

  title: 'xx管理系统',

  subTitle: 'xx-admin-system',

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
