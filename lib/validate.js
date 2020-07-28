'use strict';

/**
 * 判断字符是否为空的方法
 * @param {*} val
 */
export function isEmpty(val) {
  if (typeof val === 'undefined' || val == null || val === '') {
    return true;
  }
  return false;
}

/**
 * 字符串
 * @param {*} str
 */
export const isString = (str) => {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
};

/**
 * 数组
 * @param {*} arg
 */
export const isArray = (arg) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
};

/**
 * 邮箱
 * @param {*} email
 */
export const isEmail = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

/**
 * 手机号码
 * @param {*} mobile
 */
export const isMobile = (mobile) => {
  return /^1[0-9]{10}$/.test(mobile);
};

/**
 * 电话号码
 * @param {*} phone
 */
export const isPhone = (phone) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(phone);
};

/**
 * 是否url地址
 * @param {*} url
 */
export const isURL = (url) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
};

/**
 * 是否是微信浏览器
 */
export const isWeiXin = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/microMessenger/i) == 'micromessenger';
};

/**
 * 是否是移动端
 */
export const isDeviceMobile = () => {
  let ua = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
};

/**
 * 是否ios
 */
export const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    //安卓手机
    return false;
  } else if (u.indexOf('iPhone') > -1) {
    //苹果手机
    return true;
  } else if (u.indexOf('iPad') > -1) {
    //iPad
    return false;
  } else if (u.indexOf('Windows Phone') > -1) {
    //winphone手机
    return false;
  } else {
    return false;
  }
};

/**
 * 是否为PC端
 */
export const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
