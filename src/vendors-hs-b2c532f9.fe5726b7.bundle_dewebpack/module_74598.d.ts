/**
 * Moment.js locale configuration for Chinese (Macau)
 * 澳门繁体中文语言包配置
 */

import { Locale, MomentInput } from 'moment';

/**
 * Meridiem parsing type
 * 子午线（上午/下午）解析类型
 */
type MeridiemType = '凌晨' | '早上' | '上午' | '中午' | '下午' | '晚上';

/**
 * Ordinal token types
 * 序数词标记类型
 */
type OrdinalToken = 'd' | 'D' | 'DDD' | 'M' | 'w' | 'W';

/**
 * Long date format configuration
 * 长日期格式配置
 */
interface LongDateFormatConfig {
  /** Time format: HH:mm */
  LT: string;
  /** Time with seconds format: HH:mm:ss */
  LTS: string;
  /** Short date format: DD/MM/YYYY */
  L: string;
  /** Long date format: YYYY年M月D日 */
  LL: string;
  /** Long date with time: YYYY年M月D日 HH:mm */
  LLL: string;
  /** Full date with weekday and time: YYYY年M月D日dddd HH:mm */
  LLLL: string;
  /** Lowercase short date: D/M/YYYY */
  l: string;
  /** Lowercase long date: YYYY年M月D日 */
  ll: string;
  /** Lowercase long date with time: YYYY年M月D日 HH:mm */
  lll: string;
  /** Lowercase full date with weekday and time: YYYY年M月D日dddd HH:mm */
  llll: string;
}

/**
 * Calendar configuration for relative dates
 * 相对日期的日历配置
 */
interface CalendarConfig {
  /** Today format */
  sameDay: string;
  /** Tomorrow format */
  nextDay: string;
  /** Next week format */
  nextWeek: string;
  /** Yesterday format */
  lastDay: string;
  /** Last week format */
  lastWeek: string;
  /** Default format */
  sameElse: string;
}

/**
 * Relative time configuration
 * 相对时间配置
 */
interface RelativeTimeConfig {
  /** Future time format */
  future: string;
  /** Past time format */
  past: string;
  /** Seconds */
  s: string;
  /** Multiple seconds */
  ss: string;
  /** One minute */
  m: string;
  /** Multiple minutes */
  mm: string;
  /** One hour */
  h: string;
  /** Multiple hours */
  hh: string;
  /** One day */
  d: string;
  /** Multiple days */
  dd: string;
  /** One month */
  M: string;
  /** Multiple months */
  MM: string;
  /** One year */
  y: string;
  /** Multiple years */
  yy: string;
}

/**
 * Locale configuration for zh-mo (Chinese - Macau)
 * 澳门繁体中文语言环境配置
 */
interface ZhMoLocaleConfig {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormatConfig;
  /** Regex pattern for parsing meridiem */
  meridiemParse: RegExp;
  /** Function to determine hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** Function to determine meridiem based on hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemType;
  /** Calendar format configuration */
  calendar: CalendarConfig;
  /** Regex pattern for parsing day/month/week ordinals */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (num: number, token: string) => string;
  /** Relative time format configuration */
  relativeTime: RelativeTimeConfig;
}

/**
 * Parses meridiem (AM/PM) and adjusts hour accordingly
 * 根据子午线（上午/下午）解析并调整小时
 * 
 * @param hour - Hour value (0-23)
 * @param meridiem - Meridiem string (凌晨/早上/上午/中午/下午/晚上)
 * @returns Adjusted hour in 24-hour format
 */
export function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Determines the appropriate meridiem based on time
 * 根据时间确定相应的子午线
 * 
 * @param hour - Hour value (0-23)
 * @param minute - Minute value (0-59)
 * @param isLowercase - Whether to return lowercase (unused in Chinese)
 * @returns Meridiem string
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemType;

/**
 * Formats ordinal numbers with appropriate suffix
 * 格式化序数词并添加适当的后缀
 * 
 * @param num - Number to format
 * @param token - Token type indicating context (day/month/week)
 * @returns Formatted ordinal string
 */
export function ordinal(num: number, token: string): string;

/**
 * Defines and registers the zh-mo locale with moment.js
 * 定义并注册澳门繁体中文语言环境到 moment.js
 * 
 * @returns The registered locale object
 */
export function defineLocale(): Locale;

/**
 * Complete locale configuration object
 * 完整的语言环境配置对象
 */
export const zhMoLocale: ZhMoLocaleConfig;

export default zhMoLocale;