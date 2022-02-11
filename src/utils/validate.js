/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * @param {*} rule //校验是否存在中文逗号
 * @param {*} value
 * @param {*} callback
 */
export const validIncludeChineseComma = (rule, value, callback) => {
  if (value && value.indexOf('，') !== -1) {
    return callback(new Error(rule.message))
  }
  callback()
}
