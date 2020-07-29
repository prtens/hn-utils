'use strict';

/**
 * 转换为 time
 * @param {*} time
 */
export function convertTime(time) {
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
  return date;
}

/**
 * 获取星期几
 * @param time
 * @param pre 星期/周
 * @param weeks
 * @returns {string}
 */
export function getWeek(time, pre = '星期', weeks = '日一二三四五六') {
  let date = convertTime(time);
  return pre + weeks[date.getDay()];
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
  let date = convertTime(time);
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
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
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
 * @param time
 * @returns {string}
 */
export function getEndTime(time) {
  let startDate = new Date();
  let endDate = convertTime(time);
  // 时间差的毫秒数
  let t = endDate.getTime() - startDate.getTime();
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
 * 分割24小时
 * @param {*} chunks
 */
export function splitTime(chunks) {
  const totalTime = 24 * 3600 * 1000;
  const spanTime = totalTime / chunks;

  let startTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  let currentTime = startTime.getTime();

  let tmp = [
    {
      label: '00',
      value: '',
    },
  ];
  for (let i = 0; i < chunks; i++) {
    if (i === 0) {
      continue;
    }
    currentTime += spanTime;
    let date = new Date(currentTime);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let label = '';

    if (hour < 10) {
      label = `0${hour}`;
    } else {
      label = `${hour}`;
    }

    switch (chunks) {
      case 48:
      case 96:
        if (tmp.length === 1) {
          tmp[0].label = tmp[0].label.concat(':00');
        }
        label += ':';
        if (minute < 10) {
          label += `${minute}0`;
        } else {
          label += `${minute}`;
        }
        break;
    }
    tmp.push({
      label: label,
      value: '',
    });
  }
  return tmp;
}
