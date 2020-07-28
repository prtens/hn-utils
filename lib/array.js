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

/**
 * 冒泡排序：相邻的两个数进行比较  大数下沉  小数上浮
 * @param {*} arr
 */
export function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // n个数比较了几趟
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // 控制每趟循环比较了几次
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

/**
 * 选择排序
 * @param {*} arr
 */
export function selectionSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr;
}
