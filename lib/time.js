'use strict';

/**
 * 获取星期几
 * @param time
 * @param pre 星期/周
 * @param nums
 * @returns {string}
 */
export function getWeek(time, pre = '星期', nums = '日一二三四五六') {
  time = typeof time === 'string' ? new Date(time) : time || new Date();
  return pre + nums[time.getDay()];
}

/**
 * 格式化输出时间
 * @param time
 * @param cFormat
 * @returns {*}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 * 多久前
 * @param time 1574306094
 * @param option
 * @returns {*}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return Utils.parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

/**
 * 到某一个时间的倒计时
 * @param endTime
 * @returns {string}
 */
export function getEndTime(endTime) {
  let startDate = new Date();
  let endDate = new Date(endTime);
  let t = endDate.getTime() - startDate.getTime(); // 时间差的毫秒数
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }
  return `剩余时间 ${d} 天 ${h} 小时 ${m} 分钟 ${s} 秒`;
}

/**
 * 获取时间text
 * @param time
 * @returns {string}
 */
export function formatTimeText(time) {
  const mistiming = Math.round((Date.now() - new Date(time).getTime()) / 1000);
  const tags = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
  const times = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  for (let i = 0; i < times.length; i++) {
    const inm = Math.floor(mistiming / times[i]);
    if (tags[i] === '天') {
      let tt = '';
      switch (inm) {
        case 0:
          tt = '今天';
          break;
        case 1:
          tt = '昨天';
          break;
        case 2:
          tt = '前天';
          break;
      }
      return tt;
    }
  }
}
