'use strict';

/**
 * 格式化文件大小
 * @param size
 * @returns {*}
 */
export function formatFileSize(size) {
  let string;
  if (size >= (1024 * 1024 * 1024 * 1024) / 10) {
    size = size / ((1024 * 1024 * 1024 * 1024) / 10);
    string = 'TB';
  } else if (size >= (1024 * 1024 * 1024) / 10) {
    size = size / ((1024 * 1024 * 1024) / 10);
    string = 'GB';
  } else if (size >= (1024 * 1024) / 10) {
    size = size / ((1024 * 1024) / 10);
    string = 'MB';
  } else if (size >= 1024 / 10) {
    size = size / (1024 / 10);
    string = 'KB';
  } else {
    size = size * 10;
    string = 'b';
  }
  return Math.round(size) / 10 + string;
}

/**
 * 获取文件名称
 * @param {*} filename 
 * @returns 
 */
export function getFileName(filename) {
  return filename.substring(0, filename.indexOf('.'))
}

/**
 * 获取文件后缀 .txt
 * @param {*} filename
 */
export function suffix(filename) {
  const pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

