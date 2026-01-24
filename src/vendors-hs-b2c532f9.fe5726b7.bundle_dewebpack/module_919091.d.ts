/**
 * Moment.js 繁体中文（台湾）语言配置模块
 * Locale configuration for Traditional Chinese (Taiwan)
 */

import { Moment, LocaleSpecification } from 'moment';

/**
 * 时段类型定义
 * Meridiem types used in Traditional Chinese
 */
type MeridiemType = '凌晨' | '早上' | '上午' | '中午' | '下午' | '晚上';

/**
 * 单位类型定义
 * Unit types for ordinal formatting
 */
type OrdinalUnit = 'd' | 'D' | 'DDD' | 'M' | 'w' | 'W';

/**
 * 繁体中文（台湾）locale 配置
 * Traditional Chinese (Taiwan) locale configuration for moment.js
 */
export interface ZhTwLocaleConfig extends LocaleSpecification {
  /** 月份完整名称 */
  months: string[];
  
  /** 月份缩写 */
  monthsShort: string[];
  
  /** 星期完整名称 */
  weekdays: string[];
  
  /** 星期缩写 */
  weekdaysShort: string[];
  
  /** 星期最小缩写 */
  weekdaysMin: string[];
  
  /** 长日期格式配置 */
  longDateFormat: {
    /** 时间格式 */
    LT: string;
    /** 带秒的时间格式 */
    LTS: string;
    /** 日期格式 */
    L: string;
    /** 长日期格式 */
    LL: string;
    /** 长日期时间格式 */
    LLL: string;
    /** 完整日期时间格式 */
    LLLL: string;
    /** 短日期格式 */
    l: string;
    /** 短长日期格式 */
    ll: string;
    /** 短长日期时间格式 */
    lll: string;
    /** 短完整日期时间格式 */
    llll: string;
  };
  
  /** 上午/下午解析正则 */
  meridiemParse: RegExp;
  
  /**
   * 根据时段文本转换小时数
   * Convert hour based on meridiem text
   * @param hour - 小时数 (0-23)
   * @param meridiem - 时段文本
   * @returns 转换后的小时数
   */
  meridiemHour: (hour: number, meridiem: MeridiemType) => number | undefined;
  
  /**
   * 根据时间返回时段文本
   * Get meridiem text based on time
   * @param hour - 小时数 (0-23)
   * @param minute - 分钟数 (0-59)
   * @param isLowercase - 是否小写（此locale中未使用）
   * @returns 时段文本
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemType;
  
  /** 日历显示配置 */
  calendar: {
    /** 今天 */
    sameDay: string;
    /** 明天 */
    nextDay: string;
    /** 下周 */
    nextWeek: string;
    /** 昨天 */
    lastDay: string;
    /** 上周 */
    lastWeek: string;
    /** 其他日期 */
    sameElse: string;
  };
  
  /** 序数词解析正则 */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * 格式化序数词
   * Format ordinal numbers
   * @param num - 数字
   * @param unit - 单位类型
   * @returns 格式化后的序数词字符串
   */
  ordinal: (num: number, unit: string) => string;
  
  /** 相对时间配置 */
  relativeTime: {
    /** 未来时间前缀 */
    future: string;
    /** 过去时间前缀 */
    past: string;
    /** 几秒 */
    s: string;
    /** 多秒 */
    ss: string;
    /** 1分钟 */
    m: string;
    /** 多分钟 */
    mm: string;
    /** 1小时 */
    h: string;
    /** 多小时 */
    hh: string;
    /** 1天 */
    d: string;
    /** 多天 */
    dd: string;
    /** 1个月 */
    M: string;
    /** 多个月 */
    MM: string;
    /** 1年 */
    y: string;
    /** 多年 */
    yy: string;
  };
}

/**
 * 定义并返回繁体中文（台湾）locale 配置
 * Define and return Traditional Chinese (Taiwan) locale configuration
 * @param momentInstance - Moment.js 实例
 * @returns 配置后的 locale 对象
 */
declare function defineZhTwLocale(momentInstance: typeof Moment): Moment;

export default defineZhTwLocale;