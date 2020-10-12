'use strict';

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
 * 通过特殊字符截取字符串
 * @param {*} str
 * @param {*} symbol 特殊字符
 */
export function symbolTruncate(str, symbol) {
  return str.substring(0, str.indexOf(symbol));
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
