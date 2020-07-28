'use strict';

/**
 * 检测密码强度
 * @param {*} str
 */
export function checkPwd(str) {
  let Lv = 0;
  if (str.length < 6) {
    return Lv;
  }
  if (/[0-9]/.test(str)) {
    Lv++;
  }
  if (/[a-z]/.test(str)) {
    Lv++;
  }
  if (/[A-Z]/.test(str)) {
    Lv++;
  }
  if (/[\.|-|_]/.test(str)) {
    Lv++;
  }
  return Lv;
}

/**
 * 将数字转换为大写金额
 * @param n
 * @returns {string}
 */
export function upDigit(n) {
  let fraction = ['角', '分', '厘'];
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let head = n < 0 ? '欠人民币：' : '人民币：';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s
    s = p + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}

/**
 * 存储数量级大小 格式化 k、M、G、T、P、E
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 * @returns {string}
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 加密
 * @param {*} str
 */
export function encode(str) {
  let c = String.fromCharCode(str.charCodeAt(0) + str.length);

  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
  }

  return encodeURIComponent(c);
}

/**
 * 解密
 * @param {*} str
 */
export function decode(str) {
  str = decodeURIComponent(str);
  let c = String.fromCharCode(str.charCodeAt(0) - str.length);

  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

/**
 * 获取 url 参数
 * @param {*} url
 */
export function params2Obj(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * 对象转 url 参数
 * @param {*} json
 */
export function obj2Params(json) {
  if (!json) return '';
  let jsonArray = Object.keys(json).map((key) => {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  });
  const newArray = [];
  for (let i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i]) {
      newArray.push(jsonArray[i]);
    }
  }
  return newArray.join('&');
}

/**
 * 去除抖动器
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
