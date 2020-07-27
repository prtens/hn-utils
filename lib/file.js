'use strict';

/**
 * 格式化文件大小
 * @param size
 * @returns {*}
 */
export function formatFileSize(size) {
  var string;
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
 * 文件下载
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
  let aLink = document.createElement('a');
  aLink.style.display = 'none';
  aLink.href = url;
  aLink.setAttribute('download', `${fileName}-透视图.xls`);
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
  window.URL.revokeObjectURL(url);
}
