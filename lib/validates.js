'use strict';

import isArray from "lodash/isArray";
import { getByteLen } from './string'

// 手机号码校验
let IsMobile = (str) => {
  let regex = {
    // 中国移动
    cm: /^(?:0?1)(?:3[456789]|47|5[0124789]|7[28]|8[23478]|9[89])\d{8}$/,
    // 中国联通
    cu: /^(?:0?1)(?:3[012]|45|5[356]|66|7[156]|8[356]|91)\d{8}$/,
    // 中国电信
    ce: /^(?:0?1)(?:33|49|53|7[0347]|8[019])\d{8}$/,
    // 虚拟电商
    cn: /^(?:0?1)(?:70)\d{8}$/,
    // 中国香港
    hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
    // 澳门
    macao: /^6\d{7}$/,
    // 台湾
    tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$/
  };
  let flag = false;

  for (let re in regex) {
    if (regex[re].test(str)) {
      flag = true;
    }
  }
  return flag;
}

// 固定电话校验
let IsLandline = (str) => {
  let reg = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
  return reg.test(str);
}

/**
 * @param {*} path 
 * @returns 
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 不能有空格
// trim: true
// trim: [true, '不能包含空格或者 自定义提示']
export function trim(val, rule) {
  let valid = true,
    tip = '不能包含空格' // form.check.trim;
  if (isArray(rule)) {
    if (rule[0]) {
      valid = /\s/.test(val);
    }
    if (rule[1]) {
      tip = rule[1];
    }
  } else {
    if (rule) {
      valid = /\s/.test(val);
    }
  }
  return {
    valid: !valid,
    tip
  };
}

// 邮箱校验：名称@域名
// email: true
// email: [true, '自定义提示（可选）', 'domains[array]（指定邮箱，可选）']
export function email(val, rule) {
  let valid = true,
    tip = '请输入正确的邮箱地址' // form.check.email
  val = trim(val);
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let domains = [];
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }

      if (rule[2] && isArray(rule[2])) {
        domains = rule[2];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }

  if (valid && (domains.length > 0)) {
    // 指定域名校验
    let contain = false;
    let d = val.substring(val.indexOf('@') + 1);
    for (let i = 0; i < domains.length; i++) {
      if (domains[i] === d) {
        contain = true;
        break;
      }
    }
    if (!contain) {
      valid = false;
    }
  }
  return {
    valid,
    tip
  };
}

// 合法链接
// url: true
// url: [true, 自定义提示]
export function url(val, rule) {
  let valid = true,
    tip = 'url格式不正确'; // form.check.url
  val = trim(val);
  let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 英文
// english: true
// english: [true, 自定义提示]
export function english(val, rule) {
  let valid = true,
    tip = '请输入英文'; // form.check.english
  val = trim(val);
  let reg = /^[A-Za-z]+$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 中文
// chinese: true
// chinese: [true, 自定义提示]
export function chinese(val, rule) {
  let valid = true,
    tip = '请输入中文'; // form.check.chinese
  val = trim(val);
  let reg = /^[\u0391-\uFFE5]+$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 手机号码
// mobile: true
// mobile: [true, 自定义提示]
export function mobile(val, rule) {
  let valid = true,
    tip = '请输入正确的手机号码'; // form.check.mobile
  val = trim(val);
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = IsMobile(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = IsMobile(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 固定电话
// landline: true
// landline: [true, 自定义提示]
export function landline(val, rule) {
  let valid = true,
    tip = '请输入正确的固定电话号码'; // form.check.landline
  val = trim(val);
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = IsLandline(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = IsLandline(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 手机号码 or 固定电话
// phone: true
// phone: [true, 自定义提示]
export function phone(val, rule) {
  let valid = true,
    tip = '请输入正确的手机号码或者固定电话号码'; // form.check.phone
  val = trim(val);
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = IsMobile(val) || IsLandline(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = IsMobile(val) || IsLandline(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 金额，最多保留两位小数
// currency: true
// currency: [true, 自定义提示]
export function currency(val, rule) {
  let valid = true,
    tip = '请输入金额，精确到小数点后两位'; // form.check.currency
  val = trim(val);
  let reg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 是否必填
// required: true
// required: [true, '自定义']
export function required(val, rule) {
  let valid = true,
    tip = '必填'; // form.check.required
  val = trim(val)
  if (isArray(rule)) {
    if (rule[0]) {
      valid = (val !== '');
    }
    if (rule[1]) {
      tip = rule[1];
    }
  } else {
    if (rule) {
      valid = (val !== '');
    }
  }
  return {
    valid,
    tip
  };
}

// 是否为数字
// number: true
// number: [true, '自定义提示']
export function number(val, rule) {
  let valid = true,
    tip = '请输入数字'; // form.check.number

  val = trim(val);
  let reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }

  return {
    valid,
    tip
  };
}

// 整数
// int: true
// int: [true, '自定义提示']
export function int(val, rule) {
  let valid = true,
    tip = '请输入整数'; // form.check.int

  val = trim(val);
  let reg = /^-?\d+$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 是否为正整数
// posint: true
// posint: [true, '自定义提示']
export function posint(val, rule) {
  let valid = true,
    tip = '请输入正整数'; // form.check.posint
  val = trim(val);
  let reg = /^[0-9]*[1-9][0-9]*$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 是否为负整数
// negint: true
// negint: [true, '自定义提示']
export function negint(val, rule) {
  let valid = true,
    tip = '请输入负整数'; // form.check.negint
  val = trim(val);
  let reg = /^-[0-9]*[1-9][0-9]*$/;
  if (val) {
    if (isArray(rule)) {
      if (rule[0]) {
        valid = reg.test(val);
      }
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      if (rule) {
        valid = reg.test(val);
      }
    }
  }
  return {
    valid,
    tip
  };
}

// 字个数范围
// length: [2, 8]
export function length(val, rule) {
  let valid = true,
    tip = '{min} ~ {max} 个字之间，当前：{current} 个字'; // form.word.between

  val = trim(val);
  if (val) {
    let min = rule[0],
      max = rule[1],
      current = val.length;
    valid = (current >= min) && (current <= max);
    tip = tip.replace(/{min}/g, min).replace(/{max}/g, max).replace(/{current}/g, current);
  }

  return {
    valid,
    tip
  };
}

// 最少多少个字
// minlength: 2
// minlength: [2, 自定义提示文案]
export function minlength(val, rule) {
  let valid = true,
    tip = ['最少', rule, '个字'].join(' '); // form.less form.word
  val = trim(val);
  if (val) {
    if (isArray(rule)) {
      valid = (val.length >= rule[0]);
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      valid = (val.length >= rule);
    }
  }
  return {
    valid,
    tip
  };
}

// 最多多少个字
// maxlength: 8
// maxlength: [8, 自定义提示文案]
export function maxlength(val, rule) {
  let valid = true,
    tip = ['最多', rule, '个字'].join(' '); // form.more

  val = trim(val);
  if (val) {
    if (isArray(rule)) {
      valid = (val.length <= rule[0]);
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      valid = (val.length <= rule);
    }
  }
  return {
    valid,
    tip
  };
}

// 字符个数范围，一个汉字两个字符
// blength: [2, 8]
export function blength(val, rule) {
  let valid = true,
    tip = '{min} ~ {max} 个字符之间，当前：{current}'; // form.char.between

  val = trim(val);
  if (val) {
    let min = rule[0],
      max = rule[1],
      current = getByteLen(val);
    valid = (current >= min) && (current <= max);
    tip = tip.replace(/{min}/g, min).replace(/{max}/g, max).replace(/{current}/g, current);
  }

  return {
    valid,
    tip
  };
}

// 最少多少个字符，一个汉字两个字符
// bminlength: 2
// bminlength: [2, 自定义提示文案]
export function bminlength(val, rule) {
  val = trim(val);
  let len = getByteLen(val);

  let valid = true,
    tip = '最少' + ' ' + rule + ' ' + '个字符'; // form.char
  if (val) {
    if (isArray(rule)) {
      valid = (len >= rule[0]);
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      valid = (len >= rule);
    }
  }

  return {
    valid,
    tip
  };
}

// 最多多少个字符，一个汉字两个字符
// bmaxlength: 8
// bmaxlength: [8, 自定义提示文案]
export function bmaxlength(val, rule) {
  val = trim(val);
  let len = getByteLen(val);

  let valid = true,
    tip = '最多' + ' ' + rule + ' ' + '个字符'; // form.more
  if (val) {
    if (isArray(rule)) {
      valid = (len <= rule[0]);
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      valid = (len <= rule);
    }
  }

  return {
    valid,
    tip
  };
}

// 与某个节点内容一致
// equalto: val
// equalto: [val, 自定义提示]
export function equalto(val, rule) {
  let tip = '请输入与 {rule} 相同的内容'; // form.check.equal

  let rVal;
  if (isArray(rule)) {
    // [val, 自定义提示]
    rVal = rule[0];
    if (rule[1]) {
      tip = rule[1];
    } else {
      tip = tip.replace(/{rule}/g, rule[0]);
    }
  } else {
    rVal = rule;
    tip = tip.replace(/{rule}/g, rule);
  }

  return {
    valid: (rVal === val),
    tip
  };
}

// 与某些节点内容不一致
// unequalto: 'val1,val2'
// unequalto: ['val1,val2', 自定义提示]
export function unequalto(val, rule) {
  let tip = '请输入与 {rule} 不同的内容'; // form.check.unequal

  // 支持多个id逗号分隔
  let vals;
  if (isArray(rule)) {
    // [ids, 自定义提示]
    vals = rule[0];
    if (rule[1]) {
      tip = rule[1];
    }
  } else {
    vals = rule;
  }

  let equalVals = [];
  vals = vals.split(',');
  vals.forEach(uVal => {
    if (uVal === val) {
      equalVals.push(uVal);
    }
  })

  tip = tip.replace(/{rule}/g, equalVals.join(','));
  return {
    valid: (equalVals.length === 0),
    tip
  };
}

// 正则
// pattern: ^[a-zA-Z0-9_\u4e00-\u9fa5]+$
// pattern: ['^[a-zA-Z0-9_\u4e00-\u9fa5]+$', '自定义错误提示']
export function pattern(val, rule) {
  let valid = true,
    tip = '格式有误'; // form.check.pattern
  val = trim(val);
  if (val) {
    let reg;
    if (isArray(rule)) {
      reg = new RegExp(rule[0]);
      if (rule[1]) {
        tip = rule[1];
      }
    } else {
      reg = new RegExp(rule);
    }
    valid = reg.test(val);
  }

  return {
    valid,
    tip
  };
}

/**
* 是否为合法json
* json: true
* json: [true, '自定义提示']
*/
export function json(val, rule) {
  let valid = true,
    tip = '请输入合法的JSON'; // form.check.json

  if (val) {
    if ((isArray(rule) && rule[0]) || rule) {
      try {
        let obj = JSON.parse(val);
        valid = Object.prototype.toString.call(obj) === '[object Object]';
      } catch (error) {
        valid = false;
      }
    }
    if (isArray(rule) && rule[1]) {
      tip = rule[1];
    }
  }
  return {
    valid,
    tip
  };
}

// 数字范围，包含边界，range: [a,b]， a <= x <= b
// range: [2, 8, 自定义提示文案（可选）]
export function range(val, rule) {
  let valid = true;
  let min = rule[0],
    max = rule[1];
  let tip = (rule[2] || '请输入 {min} ~ {max} 之间的数字，包含 {min} 和 {max}') + ''; // form.check.range

  val = trim(val);
  if (val) {
    valid = (+val >= +min) && (+val <= +max);
  }
  return {
    valid,
    tip: tip.replace(/{min}/g, min).replace(/{max}/g, max)
  };
}

// 数字范围，不包含边界，rangeborder: [a,b]， a < x < b
// rangeborder: [2, 8, 自定义提示文案（可选）]
export function rangeborder(val, rule) {
  let valid = true;
  let min = rule[0],
    max = rule[1];
  let tip = (rule[2] || '请输入 {min} ~ {max} 之间的数字，不包含 {min} 和 {max}') + ''; // form.check.range.border

  val = trim(val);
  if (val) {
    valid = (+val > +min) && (+val < +max);
  }
  return {
    valid,
    tip: tip.replace(/{min}/g, min).replace(/{max}/g, max)
  };
}

// 数字最大值，小于等于某个数字，max: b，x <= b
// max: 8
// max: [8, 自定义提示文案]
export function max(val, rule) {
  let valid = true,
    max,
    tip = '请输入小于等于 {max} 的数字'; // form.max

  if (isArray(rule)) {
    max = rule[0];
    if (rule[1]) {
      tip = rule[1];
    }
  } else {
    max = rule;
  }

  val = trim(val);
  if (val) {
    valid = (+val <= +max);
  }

  return {
    valid,
    tip: tip.replace(/{max}/g, max)
  };
}

// 数字最大值，不包含边界，小于某个数字，maxborder: b，x < b
// maxborder: 8
// maxborder: [8, 自定义提示文案]
export function maxborder(val, rule) {
  let valid = true,
    max,
    tip = '请输入小于 {max} 的数字'; // form.max.border

  if (isArray(rule)) {
    max = rule[0];
    if (rule[1]) {
      tip = rule[1];
    }
  } else {
    max = rule;
  }

  val = trim(val);
  if (val) {
    valid = (+val < +max);
  }

  return {
    valid,
    tip: tip.replace(/{max}/g, max)
  };
}

// 数字最小值，包含边界，大于等于某个数字，min: a，a <= x
// min: 2
// min: [2, 自定义提示文案]
export function min(val, rule) {
  let valid = true,
    min,
    tip = '请输入大于等于 {min} 的数字'; // form.min

  if (isArray(rule)) {
    min = rule[0];
    if (rule[1]) {
      tip = rule[1] + '';
    }
  } else {
    min = rule;
  }

  val = trim(val);
  if (val) {
    valid = (+val >= +min);
  }

  return {
    valid,
    tip: tip.replace(/{min}/g, min)
  };
}

// 数字最小值，不包含边界，大于某个数字，minborder: a，a < x
// minborder: 2
// minborder: [2, 自定义提示文案]
export function minborder(val, rule) {
  let valid = true,
    min,
    tip = '请输入大于 {min} 的数字'; // form.min.border

  if (isArray(rule)) {
    min = rule[0];
    if (rule[1]) {
      tip = rule[1] + '';
    }
  } else {
    min = rule;
  }

  val = trim(val);
  if (val) {
    valid = (+val > +min);
  }

  return {
    valid,
    tip: tip.replace(/{min}/g, min)
  };
}

/**
* 以上支持校验项的或组合，只要有一个满足即可通过
当前校验配置多个校验规则时，是交的逻辑
如果需要按照或的逻辑则可使用此配置
union: {
    min: [2, 自定义提示文案]
}
*/
export function union(val, rule) {
  // rule: {
  //     mobile: true,
  //     email: [true, '只支持qq邮箱', ['qq.com']]
  // }
  let valid = false,
    tips = [];

  for (let r in rule) {
    let info = this[r](val, rule[r]);

    // 有一个符合条件即可
    valid = valid || info.valid;

    if (!info.valid) {
      // 不符合条件的第一个提示
      tips.push(info.tip);
    }
  }

  return {
    valid,
    tip: tips[0] || ''
  };
}
