/**
 * Moment.js 繁體中文（香港）地區設置
 * Locale configuration for Traditional Chinese (Hong Kong)
 */

import { Locale, MomentInput } from 'moment';

/**
 * 時段類型定義
 * Meridiem period types
 */
type MeridiemType = '凌晨' | '早上' | '上午' | '中午' | '下午' | '晚上';

/**
 * 序數單位類型
 * Ordinal unit types
 */
type OrdinalUnitType = 'd' | 'D' | 'DDD' | 'M' | 'w' | 'W';

/**
 * 地區配置接口
 * Locale configuration interface
 */
interface LocaleConfiguration {
  /** 月份完整名稱 */
  months: string[];
  /** 月份縮寫 */
  monthsShort: string[];
  /** 星期完整名稱 */
  weekdays: string[];
  /** 星期縮寫 */
  weekdaysShort: string[];
  /** 星期最短縮寫 */
  weekdaysMin: string[];
  /** 長日期格式 */
  longDateFormat: LongDateFormat;
  /** 時段解析正則表達式 */
  meridiemParse: RegExp;
  /** 時段小時轉換函數 */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** 時段判斷函數 */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => MeridiemType;
  /** 日曆格式 */
  calendar: CalendarFormat;
  /** 序數解析正則表達式 */
  dayOfMonthOrdinalParse: RegExp;
  /** 序數格式化函數 */
  ordinal: (num: number, token: string) => string;
  /** 相對時間格式 */
  relativeTime: RelativeTimeFormat;
}

/**
 * 長日期格式接口
 * Long date format configuration
 */
interface LongDateFormat {
  /** 短時間格式 HH:mm */
  LT: string;
  /** 長時間格式 HH:mm:ss */
  LTS: string;
  /** 短日期格式 YYYY/MM/DD */
  L: string;
  /** 長日期格式 YYYY年M月D日 */
  LL: string;
  /** 長日期時間格式 YYYY年M月D日 HH:mm */
  LLL: string;
  /** 完整日期時間格式 YYYY年M月D日dddd HH:mm */
  LLLL: string;
  /** 短日期格式（小寫） */
  l: string;
  /** 長日期格式（小寫） */
  ll: string;
  /** 長日期時間格式（小寫） */
  lll: string;
  /** 完整日期時間格式（小寫） */
  llll: string;
}

/**
 * 日曆格式接口
 * Calendar format configuration
 */
interface CalendarFormat {
  /** 今天 */
  sameDay: string;
  /** 明天 */
  nextDay: string;
  /** 下週 */
  nextWeek: string;
  /** 昨天 */
  lastDay: string;
  /** 上週 */
  lastWeek: string;
  /** 其他日期 */
  sameElse: string;
}

/**
 * 相對時間格式接口
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  /** 未來時間 */
  future: string;
  /** 過去時間 */
  past: string;
  /** 幾秒 */
  s: string;
  /** N秒 */
  ss: string;
  /** 1分鐘 */
  m: string;
  /** N分鐘 */
  mm: string;
  /** 1小時 */
  h: string;
  /** N小時 */
  hh: string;
  /** 1天 */
  d: string;
  /** N天 */
  dd: string;
  /** 1個月 */
  M: string;
  /** N個月 */
  MM: string;
  /** 1年 */
  y: string;
  /** N年 */
  yy: string;
}

/**
 * 定義繁體中文（香港）地區設置
 * Define Traditional Chinese (Hong Kong) locale
 * 
 * @param moment - Moment.js 實例
 * @returns 配置好的地區設置對象
 */
export function defineZhHkLocale(moment: typeof import('moment')): Locale;

/**
 * 將12小時制轉換為24小時制
 * Convert 12-hour format to 24-hour format based on meridiem
 * 
 * @param hour - 小時（0-23）
 * @param meridiem - 時段（凌晨/早上/上午/中午/下午/晚上）
 * @returns 轉換後的24小時制小時數
 */
export function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * 根據時間判斷時段
 * Determine meridiem period based on time
 * 
 * @param hour - 小時（0-23）
 * @param minute - 分鐘（0-59）
 * @param isLowercase - 是否小寫（未使用）
 * @returns 時段字符串
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemType;

/**
 * 格式化序數
 * Format ordinal numbers
 * 
 * @param num - 數字
 * @param token - 單位標識
 * @returns 格式化後的序數字符串
 */
export function ordinal(num: number, token: string): string;

/**
 * 地區配置常量
 * Locale configuration constant
 */
export const zhHkLocaleConfig: LocaleConfiguration;