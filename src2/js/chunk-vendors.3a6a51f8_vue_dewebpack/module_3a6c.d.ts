/**
 * Moment.js 澳门繁体中文（zh-mo）语言环境配置
 * 
 * 此模块为 Moment.js 库定义澳门地区使用的繁体中文本地化配置，
 * 包括月份、星期、日期格式、相对时间等的中文表示。
 */

import { Locale, MomentInput } from 'moment';

/**
 * 月份名称数组（完整形式）
 */
declare const MONTHS: readonly [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
];

/**
 * 月份名称数组（缩写形式）
 */
declare const MONTHS_SHORT: readonly [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
];

/**
 * 星期名称数组（完整形式）
 */
declare const WEEKDAYS: readonly [
  '星期日', '星期一', '星期二', '星期三',
  '星期四', '星期五', '星期六'
];

/**
 * 星期名称数组（短形式）
 */
declare const WEEKDAYS_SHORT: readonly [
  '週日', '週一', '週二', '週三', '週四', '週五', '週六'
];

/**
 * 星期名称数组（最短形式）
 */
declare const WEEKDAYS_MIN: readonly [
  '日', '一', '二', '三', '四', '五', '六'
];

/**
 * 长日期格式配置接口
 */
interface LongDateFormat {
  /** 时间格式（不含秒） */
  LT: string;
  /** 时间格式（含秒） */
  LTS: string;
  /** 短日期格式 */
  L: string;
  /** 长日期格式 */
  LL: string;
  /** 长日期+时间格式 */
  LLL: string;
  /** 完整日期+时间格式 */
  LLLL: string;
  /** 短日期格式（小写） */
  l: string;
  /** 长日期格式（小写） */
  ll: string;
  /** 长日期+时间格式（小写） */
  lll: string;
  /** 完整日期+时间格式（小写） */
  llll: string;
}

/**
 * 日历显示配置接口
 */
interface CalendarSpec {
  /** 今天的显示格式 */
  sameDay: string;
  /** 明天的显示格式 */
  nextDay: string;
  /** 下周的显示格式 */
  nextWeek: string;
  /** 昨天的显示格式 */
  lastDay: string;
  /** 上周的显示格式 */
  lastWeek: string;
  /** 其他日期的显示格式 */
  sameElse: string;
}

/**
 * 相对时间配置接口
 */
interface RelativeTimeSpec {
  /** 未来时间前缀 */
  future: string;
  /** 过去时间后缀 */
  past: string;
  /** 几秒前 */
  s: string;
  /** N秒前 */
  ss: string;
  /** 1分钟前 */
  m: string;
  /** N分钟前 */
  mm: string;
  /** 1小时前 */
  h: string;
  /** N小时前 */
  hh: string;
  /** 1天前 */
  d: string;
  /** N天前 */
  dd: string;
  /** 1个月前 */
  M: string;
  /** N个月前 */
  MM: string;
  /** 1年前 */
  y: string;
  /** N年前 */
  yy: string;
}

/**
 * 上午/下午时段类型
 */
type MeridiemType = '凌晨' | '早上' | '上午' | '中午' | '下午' | '晚上';

/**
 * 序数词单位类型
 */
type OrdinalUnit = 'd' | 'D' | 'DDD' | 'M' | 'w' | 'W';

/**
 * 根据时段文本和小时数计算24小时制小时数
 * 
 * @param hour - 12小时制的小时数（0-12）
 * @param meridiem - 时段标识（凌晨、早上、上午、中午、下午、晚上）
 * @returns 24小时制的小时数（0-23），如果时段无效返回 undefined
 */
declare function meridiemHour(hour: number, meridiem: MeridiemType): number | undefined;

/**
 * 根据小时和分钟返回对应的时段名称
 * 
 * @param hour - 小时数（0-23）
 * @param minute - 分钟数（0-59）
 * @param isLowercase - 是否返回小写形式（此参数在中文环境下无实际作用）
 * @returns 时段名称（凌晨、早上、上午、中午、下午、晚上）
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemType;

/**
 * 为数字添加序数词后缀
 * 
 * @param num - 要添加序数词的数字
 * @param token - 时间单位标识（日期、月份、周等）
 * @returns 带序数词后缀的字符串（如 "1日"、"2月"、"3週"）
 */
declare function ordinal(num: number, token: OrdinalUnit | string): string;

/**
 * Moment.js 澳门繁体中文语言环境配置对象
 */
declare const zhMoLocale: Locale;

export {
  zhMoLocale as default,
  MONTHS,
  MONTHS_SHORT,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  WEEKDAYS_MIN,
  meridiemHour,
  meridiem,
  ordinal,
  type LongDateFormat,
  type CalendarSpec,
  type RelativeTimeSpec,
  type MeridiemType,
  type OrdinalUnit
};