'use strict';

/**
 * 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor(type = 'default') {
  let color = '';
  switch (type) {
    case 'default':
      color = '#35495E';
      break;
    case 'primary':
      color = '#385acc';
      break;
    case 'success':
      color = '#67c23a';
      break;
    case 'warning':
      color = '#e6a23c';
      break;
    case 'danger':
      color = '#f56c6c';
      break;
    default:
      break;
  }
  return color;
}

/**
 * 打印一个 [ title | text ] 样式的信息
 * @param {*} title
 * @param {*} info
 * @param {*} type
 */
export function capsule(title, info, type = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(
      type
    )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  );
}

/**
 * 打印彩色文字
 * @param textArr
 */
export function colorful(textArr) {
  console.log(
    `%c${textArr.map((t) => t.text || '').join('%c')}`,
    ...textArr.map((t) => `color: ${typeColor(t.type)};`)
  );
}

/**
 * 打印 default 样式的文字
 * @param text
 */
export function def(text = 'default') {
  colorful([{ text }]);
}

/**
 * 打印 primary 样式的文字
 * @param text
 */
export function primary(text = 'primary') {
  colorful([{ text, type: 'primary' }]);
}

/**
 * 打印 success 样式的文字
 * @param text
 */
export function success(text = 'success') {
  colorful([{ text, type: 'success' }]);
}

/**
 * 打印 warning 样式的文字
 * @param text
 */
export function warning(text = 'warning') {
  colorful([{ text, type: 'warning' }]);
}

/**
 * 打印 danger 样式的文字
 * @param text
 */
export function danger(text = 'danger') {
  colorful([{ text, type: 'danger' }]);
}
