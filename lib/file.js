'use strict';

/**
 * 获取文件后缀 .txt
 * @param {*} filename
 */
export function suffix(filename) {
  let pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

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
 * 下载excel
 * @param fileName
 * @param data
 * @returns {boolean}
 */
export function download(fileName, data) {
  if (!data || data.type === 'application/json') {
    return false;
  }

  let blob = new Blob([data], {
    type: 'application/vnd.ms-excel; charset=utf-8',
  });
  let url = window.URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', `${fileName}-透视图.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
