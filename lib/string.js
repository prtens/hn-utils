'use strict';

/**
 * 生成随机字符串
 * @param {*} len
 */
export function randomString(len = 32) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let maxPos = chars.length;
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

/**
 * 字符串 加密
 * @param {*} str 
 * @returns 
 */
export function encode(str) {
  let c = String.fromCharCode(str.charCodeAt(0) + str.length)

  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1))
  }

  return encodeURIComponent(c)
}

/**
 * 字符串 解密
 * @param {*} str 
 * @returns 
 */
export function decode(str) {
  str = decodeURIComponent(str)
  let c = String.fromCharCode(str.charCodeAt(0) - str.length)

  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}

/**
 * 去除空格
 * @param str
 * @param type 1-所有空格 2-前后空格 3-前空格 4-后空格
 * @returns {string}
 */
export function strTrim(str, type) {
  let string = ''
  switch (type) {
    case 1:
      string = str.replace(/\s+/g, '')
      break
    case 2:
      string = str.replace(/(^\s*)|(\s*$)/g, '')
      break
    case 3:
      string = str.replace(/(^\s*)/g, '')
      break
    case 4:
      string = str.replace(/(\s*$)/g, '')
      break
    default:
      string = str
      break
  }
  return string
}

/**
 * 字符转换
 * @param {*} str
 * @param {*} type 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
 */
export function changeCase(str, type = 4) {
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      });
    case 2:
      return str.replace(/\b\w+\b/g, function (word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      });
    case 3:
      return str
        .split('')
        .map(function (word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          } else {
            return word.toLowerCase();
          }
        })
        .join('');
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
}

/**
 * 通过特殊字符截取字符串
 * @param {*} str
 * @param {*} symbol 特殊字符
 */
export function symbolTruncate(str, symbol) {
  return str.substring(0, str.indexOf(symbol));
}

/**
 * 字符串替换(字符串,要替换的字符,替换成什么)
 * @param str
 * @param findText
 * @param repText
 */
export function replaceAll(str, findText, repText) {
  let regExp = new RegExp(findText, 'g')
  return str.replace(regExp, repText)
}

/**
 * utf8字符串的字节长度
 * @param str
 */
export function byteLength(str) {
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * 获取字节长度
 * @param {*} str 
 * @returns 
 */
export function getByteLen(str) {
  return str.replace(/[^\x00-\xff]/g, 'xl').length;
}

// isNumber
export function isNumber(val) {
  // return !isNaN(parseFloat(val))
  const reg = /^[0-9]*$/
  return reg.test(val)
}

/**
 * 格式化数字（每三位加逗号） 10000 => '10,000'
 * @param num
 * @returns {string}
 */
export function toThousandFilter(num) {
  // 或者 return num.toLocaleString()
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * 格式化数字
 * @param {*} num 
 * @param {*} decimals 要显示的小数位数
 * @param {*} decimal 十进制分割 .
 * @param {*} separator 千分位分隔符
 * @param {*} prefix 前缀 $
 * @param {*} suffix 后缀
 * @returns 
 */
export function formatNumber(num, decimals = 0, decimal = '.', separator = ',', prefix = '', suffix = '') {
  num = decimals ? num.toFixed(Math.abs(decimals)) : num
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}