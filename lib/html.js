'use strict';

/**
 * 去除html标签
 * @param {*} str
 */
export function removeHtmltag(str) {
  return str.replace(/<[^>]+>/g, '');
}
/**
 * el是否包含某个class
 * @param {*} ele
 * @param {*} cls
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
/**
 * 在ele下添加class
 * @param {*} ele
 * @param {*} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}
/**
 * 移除 ele 下的class
 * @param {*} ele
 * @param {*} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}
