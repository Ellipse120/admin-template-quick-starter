import { format, toDate, formatDistanceToNowStrict } from 'date-fns'
import zhLocale from 'date-fns/locale/zh-CN/index'

import { v4 as uuidv4 } from 'uuid'

const crypto = require('crypto')

/**
 * Parse the time to string
 * @param {Date | number} time
 * @param {string} cFormat
 * @param {Object} [options] - an object with options. See [detail]{@link http://10.128.198.185:8080/date-fns-doc/format_index.js.html};
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale};
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday);
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is;
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 * @returns {String} the formatted date string
 *
 * @example
 *
 * 1. import { zhCN } from 'date-fns/locale'
 * 2. formatDate(new Date('2021-08-13'), 'eeee', { locale: zhCN }) // 输出星期五
 */
export function parseTime (time, cFormat = 'yyyy-MM-dd HH:mm:ss', options) {
  if (!time) {
    return null
  }

  let v

  try {
    v = format(toDate(time), cFormat, {
      ...{
        locale: zhLocale
      },
      ...options
    })
  } catch (e) {
    console.log('Failed to convert date or number to Date: ', e.message)
  }

  return v
}

/**
 * Format Relative time string. Ex: 输出 3天前，1个月前等结果
 * @param time
 * @returns {string|null}
 */
export function parseRelativeTime (time) {
  if (!time) {
    return null
  }
  return formatDistanceToNowStrict(new Date(time), { locale: zhLocale, addSuffix: true })
}

/**
 * key to label
 * @param list
 * @param value
 * @param keyAlias
 * @param valueAlias
 * @returns {string|*}
 */
export function formatText (list, value, keyAlias = 'key', valueAlias = 'value') {
  if (['', undefined, 'undefined', null, 'null'].includes(value)) {
    return ''
  }
  if (list === null || !Array.isArray(list)) {
    return ''
  }
  const target = list.find(item => item[keyAlias] === value)
  return target ? target[valueAlias] : value
}

/**
 * 平级数据构建树形结构
 * @param items 原始数据
 * @param rootId rootId 根节点Id
 * @param idAlias 数据唯一标识 默认 id
 * @param parentIdAlias 数据父级节点唯一标识 默认 parentId
 * @returns {[]} 返回树形结构
 */
export function toTree (items = [], rootId = null, idAlias = 'id', parentIdAlias = 'parentId') {
  if (!items?.length) {
    return []
  }

  const idMapping = items.reduce((acc, el, i) => {
    acc[el[idAlias]] = i
    return acc
  }, {})

  let root

  items.forEach(el => {
    if (el[idAlias] === rootId) {
      root = el
      return
    }

    const parentEl = items[idMapping[el[parentIdAlias]]]
    if (parentEl) {
      parentEl.children = [...(parentEl?.children) || [], el]
    }
  })

  return [root]
}

/**
 * 文件流下载
 * @param res
 * @param fileName
 */
export function downFileStream (res, fileName) {
  const blob = new Blob([res?.data], { type: 'application/octet-stream' })
  const contentDisposition = res.headers['content-disposition']
  const [, fileInfo] = decodeURIComponent(contentDisposition).split('=')
  const _fileName = fileName || (fileInfo && fileInfo.replace('utf-8', ''))
  const el = document.createElement('a')
  el.download = _fileName
  el.style.display = 'none'
  el.href = URL.createObjectURL(blob)
  document.body.appendChild(el)
  el.click()
  URL.revokeObjectURL(el.href)
  document.body.removeChild(el)
}

/**
 * 转树形结构
 * @param list
 * @param options
 */
export function transformTree (list, options = {}) {
  const {
    keyField = 'id',
    childField = 'children',
    parentField = 'parent'
  } = options
  const tree = []
  const record = []

  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    const id = item[keyField]
    if (!id) {
      continue
    }
    if (record[id]) {
      item[childField] = record[id]
    } else {
      item[childField] = record[id] = []
    }
    if (!item[childField].length) item[childField] = null
    if (item[parentField]) {
      const parentId = item[parentField]
      if (!record[parentId]) {
        record[parentId] = []
      }
      record[parentId].push(item)
    } else {
      tree.push(item)
    }
  }
  return tree
}

/**
 * md5 加密
 * @param data
 * @returns {string}
 */
export function md5 (data) {
  return crypto.createHash('md5').update(data).digest('hex')
}

export function genUUID () {
  return uuidv4()
}

/**
 * 对象转为key，value数组
 * Object => List
 * EX:  Object: { '1': '编辑', '2': '修改' } => [
 *    { key: '1', value: '编辑' },
 *    { key: '2', value: '修改' }
 *  ]
 * @param rawMap
 * @returns {{value: unknown, key: string}[]}
 */
export function mapToKeyValueList (rawMap) {
  return Object.entries(rawMap).map(([key, value]) => {
    return {
      key,
      value
    }
  })
}
