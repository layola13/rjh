/**
 * Moment.js 中文（简体）本地化配置模块
 * @module moment-locale-zh-cn
 */

import { Locale, MomentInput } from 'moment';

/**
 * 子午线时段类型
 */
type MeridiemType = '凌晨' | '早上' | '上午' | '中午' | '下午' | '晚上';

/**
 * 本地化配置接口
 */
interface LocaleConfig {
  /** 月份全称数组 */
  months: string[];
  /** 月份缩写数组 */
  monthsShort: string[];
  /** 星期全称数组 */
  weekdays: string[];
  /** 星期缩写数组 */
  weekdaysShort: string[];
  /** 星期最小化表示数组 */
  weekdaysMin: string[];
  /** 长日期格式配置 */
  longDateFormat: LongDateFormat;
  /** 子午线解析正则表达式 */
  meridiemParse: RegExp;
  /** 子午线小时转换函数 */
  meridiemHour: (hour: number, meridiem: MeridiemType) => number;
  /** 子午线判断函数 */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemType;
  /** 日历显示配置 */
  calendar: CalendarConfig;
  /** 日期序数解析正则 */
  dayOfMonthOrdinalParse: RegExp;
  /** 序数格式化函数 */
  ordinal: (num: number, token: string) => string;
  /** 相对时间配置 */
  relativeTime: RelativeTimeConfig;
  /** 周配置 */
  week: WeekConfig;
}

/**
 * 长日期格式配置接口
 */
interface LongDateFormat {
  /** 时间格式 */
  LT: string;
  /** 时间+秒格式 */
  LTS: string;
  /** 短日期格式 */
  L: string;
  /** 长日期格式 */
  LL: string;
  /** 长日期+时间格式 */
  LLL: string;
  /** 完整日期+时间格式 */
  LLLL: string;
  /** 小写短日期格式 */
  l: string;
  /** 小写长日期格式 */
  ll: string;
  /** 小写长日期+时间格式 */
  lll: string;
  /** 小写完整日期+时间格式 */
  llll: string;
}

/**
 * 日历显示配置接口
 */
interface CalendarConfig {
  /** 今天显示格式 */
  sameDay: string;
  /** 明天显示格式 */
  nextDay: string;
  /** 下周显示函数 */
  nextWeek: (now: MomentInput) => string;
  /** 昨天显示格式 */
  lastDay: string;
  /** 上周显示函数 */
  lastWeek: (now: MomentInput) => string;
  /** 其他日期显示格式 */
  sameElse: string;
}

/**
 * 相对时间配置接口
 */
interface RelativeTimeConfig {
  /** 未来时间前缀 */
  future: string;
  /** 过去时间前缀 */
  past: string;
  /** 几秒前/后 */
  s: string;
  /** N秒前/后 */
  ss: string;
  /** 1分钟前/后 */
  m: string;
  /** N分钟前/后 */
  mm: string;
  /** 1小时前/后 */
  h: string;
  /** N小时前/后 */
  hh: string;
  /** 1天前/后 */
  d: string;
  /** N天前/后 */
  dd: string;
  /** 1周前/后 */
  w: string;
  /** N周前/后 */
  ww: string;
  /** 1个月前/后 */
  M: string;
  /** N个月前/后 */
  MM: string;
  /** 1年前/后 */
  y: string;
  /** N年前/后 */
  yy: string;
}

/**
 * 周配置接口
 */
interface WeekConfig {
  /** 一周的第一天（0=周日，1=周一） */
  dow: number;
  /** 一年的第一周（4表示包含1月4日的周为第一周） */
  doy: number;
}

/**
 * 定义中文（简体）本地化配置
 * @param moment - Moment.js 实例
 * @returns 配置后的 Locale 对象
 */
export function defineZhCnLocale(moment: typeof import('moment')): Locale;