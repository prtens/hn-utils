'use strict'

/**
 * 将数字转换为大写金额
 * @param n
 * @returns {string}
 */
export function upDigit(n) {
  let fraction = ['角', '分', '厘']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ]
  let head = n < 0 ? '欠人民币：' : '人民币：'
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s
    s = p + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}

/**
 * 存储数量级大小 格式化 k、M、G、T、P、E
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 * @returns {string}
 */
export function storageMagnitudeFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

/**
 * 获取 url 参数
 * @param {*} url
 */
export function params2Obj(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 对象转 url 参数
 * @param {*} json
 */
export function obj2Params(json) {
  if (!json) return ''
  let jsonArray = Object.keys(json).map((key) => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  })
  const newArray = []
  for (let i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i]) {
      newArray.push(jsonArray[i])
    }
  }
  return newArray.join('&')
}


/**
 * 深拷贝
 * @param obj
 * @returns {any}
 */
export function deepClone(obj) {
  let _obj = JSON.stringify(obj)
  return JSON.parse(_obj)
}

/**
 * 去除抖动器
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 判断字符是否为空的方法
 * @param {*} obj 
 * @returns 
 */
export function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '') {
    return true
  } else {
    return false
  }
}

/**
 * 查看key 是否存在
 * @param {*} obj
 * @param {*} key
 */
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * table column 排序
 * @param {*} column
 * @param {*} that
 * @param {*} key
 * @param {*} func
 */
export function tableSortChange(column, that, key, func) {
  let nullList = []
  let itemList = []
  let { prop, order } = column

  nullList = that[key].filter(t => (t[prop] === '-' || t[prop] === '' || t[prop] === null))
  itemList = that[key].filter(t => (t[prop] !== '-' && t[prop] !== '' && t[prop] !== null))
  if (order !== null) {
    if (order === 'descending') {
      itemList = itemList.sort((a, b) => b[prop] - a[prop])
    } else {
      itemList = itemList.sort((a, b) => a[prop] - b[prop])
    }

    that[key] = [...itemList, ...nullList]
  } else {
    that[func]()
  }
}
