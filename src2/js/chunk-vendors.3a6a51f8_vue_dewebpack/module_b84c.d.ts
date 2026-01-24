/**
 * Moment.js locale configuration for Norwegian Nynorsk (nn)
 * 挪威尼诺斯克语区域设置配置
 */

import { Moment } from 'moment';

/**
 * Locale configuration interface for Moment.js
 * Moment.js 区域设置配置接口
 */
export interface LocaleSpecification {
  /** Month names in full format (一月到十二月的完整名称) */
  months: string[];
  
  /** Abbreviated month names (月份缩写名称) */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months (是否对月份使用精确解析) */
  monthsParseExact: boolean;
  
  /** Weekday names in full format (星期日到星期六的完整名称) */
  weekdays: string[];
  
  /** Abbreviated weekday names (星期缩写名称) */
  weekdaysShort: string[];
  
  /** Minimal weekday names (星期最小缩写) */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays (是否对星期使用精确解析) */
  weekdaysParseExact: boolean;
  
  /** Long date format tokens (长日期格式标记) */
  longDateFormat: LongDateFormat;
  
  /** Calendar format for relative dates (相对日期的日历格式) */
  calendar: CalendarSpec;
  
  /** Relative time format strings (相对时间格式字符串) */
  relativeTime: RelativeTimeSpec;
  
  /** Regular expression for parsing day of month ordinals (解析序数日期的正则表达式) */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function or string template for ordinal numbers (序数格式化函数或模板) */
  ordinal: string | ((num: number) => string);
  
  /** Week configuration (周配置) */
  week: WeekSpec;
}

/**
 * Long date format configuration
 * 长日期格式配置
 */
export interface LongDateFormat {
  /** Time format (时间格式) */
  LT: string;
  
  /** Time with seconds format (带秒的时间格式) */
  LTS: string;
  
  /** Short date format (短日期格式) */
  L: string;
  
  /** Long date format (长日期格式) */
  LL: string;
  
  /** Long date with time format (带时间的长日期格式) */
  LLL: string;
  
  /** Full date with time format (完整日期时间格式) */
  LLLL: string;
}

/**
 * Calendar specification for relative dates
 * 相对日期的日历规范
 */
export interface CalendarSpec {
  /** Format for today (今天的格式) */
  sameDay: string;
  
  /** Format for tomorrow (明天的格式) */
  nextDay: string;
  
  /** Format for next week (下周的格式) */
  nextWeek: string;
  
  /** Format for yesterday (昨天的格式) */
  lastDay: string;
  
  /** Format for last week (上周的格式) */
  lastWeek: string;
  
  /** Format for other dates (其他日期的格式) */
  sameElse: string;
}

/**
 * Relative time specification
 * 相对时间规范
 */
export interface RelativeTimeSpec {
  /** Future time prefix/template (未来时间前缀/模板) */
  future: string;
  
  /** Past time prefix/template (过去时间前缀/模板) */
  past: string;
  
  /** Few seconds (几秒) */
  s: string;
  
  /** Seconds (秒) */
  ss: string;
  
  /** One minute (一分钟) */
  m: string;
  
  /** Minutes (分钟) */
  mm: string;
  
  /** One hour (一小时) */
  h: string;
  
  /** Hours (小时) */
  hh: string;
  
  /** One day (一天) */
  d: string;
  
  /** Days (天) */
  dd: string;
  
  /** One week (一周) */
  w: string;
  
  /** Weeks (周) */
  ww: string;
  
  /** One month (一个月) */
  M: string;
  
  /** Months (月) */
  MM: string;
  
  /** One year (一年) */
  y: string;
  
  /** Years (年) */
  yy: string;
}

/**
 * Week configuration
 * 周配置
 */
export interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) (一周的第一天：0=周日，1=周一) */
  dow: number;
  
  /** Day of year for week calculation (用于计算周数的一年中的第几天) */
  doy: number;
}

/**
 * Moment instance interface
 * Moment 实例接口
 */
export interface MomentStatic {
  /**
   * Define a locale configuration
   * 定义区域设置配置
   * 
   * @param localeName - The locale identifier (区域标识符)
   * @param config - The locale configuration object (区域配置对象)
   * @returns The configured locale (配置的区域设置)
   */
  defineLocale(localeName: string, config: LocaleSpecification): unknown;
}

/**
 * Norwegian Nynorsk locale configuration constant
 * 挪威尼诺斯克语区域配置常量
 */
export const norwegianNynorskLocale: LocaleSpecification;

/**
 * Initialize the Norwegian Nynorsk locale for Moment.js
 * 初始化 Moment.js 的挪威尼诺斯克语区域设置
 * 
 * @param moment - The Moment.js instance (Moment.js 实例)
 */
export default function initNorwegianNynorskLocale(moment: MomentStatic): void;