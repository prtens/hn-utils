'use strict';

/**
 * 获取唯一数组
 * @param {*} arr
 */
export function arrayUnique(arr) {
  return Array.from(new Set(arr));
}

/**
 * 获取数组并集
 * @param {*} a
 * @param {*} b
 */
export function arrayUnion(a, b) {
  return a.concat(b.filter((v) => !a.includes(v)));
}

/**
 * 获取数组交集
 * @param {*} a
 * @param {*} b
 */
export function arrayIntersection(a, b) {
  return a.filter((v) => b.includes(v));
}

/**
 * 获取数组差集
 * @param {*} a
 * @param {*} b
 */
export function arrayDifference(a, b) {
  return a.concat(b).filter((v) => a.includes(v) && !b.includes(v));
}
