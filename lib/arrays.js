'use strict';

/**
 * 递归添加层级
 * @param {*} array
 * @param {*} level
 */
export function addLevel(array, level = 0) {
  array.forEach((arr) => {
    arr.level = level;
    if (arr.children) {
      addLevel(arr.children, level + 1);
    }
  });
  return array;
}

/**
 * 获取树
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function getTrees(arr, id, pid) {
  let result = []
  if (!Array.isArray(arr)) {
    return result
  }
  arr.forEach(item => {
    delete item.children
  })
  let map = {}
  arr.forEach(item => {
    map[item[id]] = item
  })
  arr.forEach(item => {
    let parent = map[item[pid]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

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

/**
 * 数组首尾互换
 * @param {*} arr
 * @param {*} a 添加的位置
 * @param {*} b 删除的位置
 */
export function InclusiveExchange(arr, a, b) {
  arr[a] = arr.splice(b, 1, arr[a])[0];
  return arr;
}