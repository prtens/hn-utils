'use strict';

/**
 * 去除空格
 * @param {*} str 1-所有空格  2-前后空格  3-前空格 4-后空格
 * @param {*} type
 */
export function trim(str, type = 1) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s*)/g, '');
    case 4:
      return str.replace(/(\s*$)/g, '');
    default:
      return str;
  }
}

/**
 * 字符转换
 * @param {*} str
 * @param {*} type 1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
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
 * 截取给定长度的字符串
 * @param {*} str
 * @param {*} len
 * @param {*} symbol
 */
export function truncate(str, len, symbol = '...') {
  let strLen = 0;
  let s = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      strLen += 2;
    } else {
      strLen++;
    }
    if (strLen <= len) {
      s += str.charAt(i);
    } else {
      return s.concat(symbol);
    }
  }
  return s;
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
  let regExp = new RegExp(findText, 'g');
  return str.replace(regExp, repText);
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
 * 格式化数字（每三位加逗号） 10000 => '10,000'
 * @param num
 * @returns {string}
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}
