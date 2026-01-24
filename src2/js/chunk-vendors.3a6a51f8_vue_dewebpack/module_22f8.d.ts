/**
 * Moment.js 韩语(ko)语言环境配置模块
 * @module MomentKoreanLocale
 */

import { Moment } from 'moment';

/**
 * 语言环境配置接口
 */
interface LocaleSpecification {
  /** 月份完整名称数组 */
  months: string[];
  /** 月份缩写数组 */
  monthsShort: string[];
  /** 星期完整名称数组 */
  weekdays: string[];
  /** 星期缩写数组 */
  weekdaysShort: string[];
  /** 星期最小缩写数组 */
  weekdaysMin: string[];
  /** 长日期格式配置 */
  longDateFormat: LongDateFormatSpec;
  /** 日历显示配置 */
  calendar: CalendarSpec;
  /** 相对时间配置 */
  relativeTime: RelativeTimeSpec;
  /** 序数日期解析正则表达式 */
  dayOfMonthOrdinalParse: RegExp;
  /** 序数格式化函数 */
  ordinal: (num: number, token: string) => string;
  /** 上午/下午解析正则表达式 */
  meridiemParse: RegExp;
  /** 判断是否为下午 */
  isPM: (input: string) => boolean;
  /** 获取上午/下午文本 */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
}

/**
 * 长日期格式规范
 */
interface LongDateFormatSpec {
  /** 时间格式（如: "A h:mm"） */
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
 * 日历显示规范
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
 * 相对时间规范
 */
interface RelativeTimeSpec {
  /** 未来时间格式（如: "%s 后"） */
  future: string;
  /** 过去时间格式（如: "%s 前"） */
  past: string;
  /** 几秒钟 */
  s: string;
  /** N秒 */
  ss: string;
  /** 1分钟 */
  m: string;
  /** N分钟 */
  mm: string;
  /** 1小时 */
  h: string;
  /** N小时 */
  hh: string;
  /** 1天 */
  d: string;
  /** N天 */
  dd: string;
  /** 1个月 */
  M: string;
  /** N个月 */
  MM: string;
  /** 1年 */
  y: string;
  /** N年 */
  yy: string;
}

/**
 * Moment.js 实例接口扩展
 */
interface MomentInstance {
  /**
   * 定义语言环境
   * @param localeName - 语言环境名称
   * @param config - 语言环境配置
   * @returns Moment 实例
   */
  defineLocale(localeName: string, config: LocaleSpecification): MomentInstance;
}

/**
 * 初始化韩语语言环境配置
 * @param momentInstance - Moment.js 实例
 */
export function initializeKoreanLocale(momentInstance: MomentInstance): void;

/**
 * 默认导出：韩语语言环境配置对象
 */
declare const koreanLocaleConfig: LocaleSpecification;
export default koreanLocaleConfig;