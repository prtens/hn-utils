"use strict";

import dayjs from "dayjs";
import WeekOfYear from "dayjs/plugin/weekOfYear";
import IsoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(WeekOfYear);
dayjs.extend(IsoWeek);

const dateFormat = "YYYY-MM-DD";

// 大于1天 静止选中
export function disabledDate1(time) {
  const currentUnix = dayjs(time).valueOf();
  const startUnix = dayjs().subtract(1, "day").valueOf();
  return startUnix > currentUnix;
}

// 允许选择 180 之内
// 3600 * 1000 * 24 1天 毫秒数
export function disabledDate180(time) {
  const currentUnix = dayjs(time).valueOf();
  const startUnix = dayjs().subtract(180, "day").valueOf();
  const endUnix = dayjs().valueOf();
  return currentUnix > endUnix || currentUnix < startUnix;
}

// 今天
export const toDay = {
  text: "今天",
  onClick(picker) {
    const end = (start = dayjs().toDate());
    picker.$emit("pick", [start, end]);
  },
};

// 昨天
export const yesterday = {
  text: "昨天",
  onClick(picker) {
    const end = (start = dayjs().subtract(1, "day").toDate());
    picker.$emit("pick", [start, end]);
  },
};

// 最近多少天
const beforeDays = (days, text, unit = "day") => {
  return {
    text: text,
    onClick(picker) {
      const start = dayjs().subtract(days, unit).toDate();
      const end = dayjs().subtract(1, unit).toDate();
      picker.$emit("pick", [start, end]);
    },
  };
};

// 后
export const laterDays = (days, text, unit = "day") => {
  return {
    text: text,
    onClick(picker) {
      const start = dayjs().toDate();
      const end = dayjs().add(days, unit).toDate();
      picker.$emit("pick", [start, end]);
    },
  };
};

const getWeekDate = (week, isoWeekday) => {
  return dayjs().week(week).isoWeekday(isoWeekday).toDate();
};

// 上周
export const lastWeek = {
  text: "上周",
  onClick(picker) {
    const lastWeek = dayjs().week() - 1;
    const start = getWeekDate(lastWeek, 1);
    const end = getWeekDate(lastWeek, 7);
    picker.$emit("pick", [start, end]);
  },
};

// 本月
export const thisMonth = {
  text: "本月",
  onClick(picker) {
    const start = dayjs().set("date", 1).toDate();
    const end = dayjs().set("date", dayjs().get("date")).toDate();
    picker.$emit("pick", [start, end]);
  },
};

// 上月
export const lastMonth = {
  text: "上月",
  onClick(picker) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    picker.$emit("pick", [start, end]);
  },
};
