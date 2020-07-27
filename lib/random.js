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
 * 生成随机数字
 * @param {*} len
 */
export function randomNumber(len = 6) {
  let chars = '123456789';
  let maxPos = chars.length;
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}
