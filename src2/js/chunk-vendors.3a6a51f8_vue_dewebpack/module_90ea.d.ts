/**
 * Moment.js 繁體中文（台灣）locale 配置
 * @module moment-locale-zh-tw
 */

/**
 * Locale 配置對象接口
 */
interface LocaleSpecification {
  /** 完整月份名稱數組 */
  months: string[];
  
  /** 簡寫月份名稱數組 */
  monthsShort: string[];
  
  /** 完整星期名稱數組 */
  weekdays: string[];
  
  /** 簡寫星期名稱數組 */
  weekdaysShort: string[];
  
  /** 最簡星期名稱數組 */
  weekdaysMin: string[];
  
  /** 長日期格式配置 */
  longDateFormat: LongDateFormatSpec;
  
  /** 上午/下午解析正則表達式 */
  meridiemParse: RegExp;
  
  /**
   * 根據meridiem標記獲取24小時制小時數
   * @param hour - 12小時制的小時數
   * @param meridiem - 時段標記（凌晨/早上/上午/中午/下午/晚上）
   * @returns 24小時制的小時數
   */
  meridiemHour(hour: number, meridiem: string): number | undefined;
  
  /**
   * 根據小時和分鐘獲取meridiem標記
   * @param hour - 小時數（0-23）
   * @param minute - 分鐘數（0-59）
   * @param isLower - 是否使用小寫
   * @returns 時段標記字符串
   */
  meridiem(hour: number, minute: number, isLower: boolean): string;
  
  /** 日曆相對時間格式 */
  calendar: CalendarSpec;
  
  /** 日期序數解析正則表達式 */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * 獲取數字的序數形式
   * @param num - 數字
   * @param token - 格式化標記
   * @returns 帶序數後綴的字符串
   */
  ordinal(num: number, token: string): string;
  
  /** 相對時間格式配置 */
  relativeTime: RelativeTimeSpec;
}

/**
 * 長日期格式規範
 */
interface LongDateFormatSpec {
  /** 時間格式（短） */
  LT: string;
  
  /** 時間格式（含秒） */
  LTS: string;
  
  /** 日期格式（短） */
  L: string;
  
  /** 日期格式（長） */
  LL: string;
  
  /** 日期時間格式 */
  LLL: string;
  
  /** 日期時間格式（含星期） */
  LLLL: string;
  
  /** 日期格式（短，小寫） */
  l: string;
  
  /** 日期格式（長，小寫） */
  ll: string;
  
  /** 日期時間格式（小寫） */
  lll: string;
  
  /** 日期時間格式（含星期，小寫） */
  llll: string;
}

/**
 * 日曆格式規範
 */
interface CalendarSpec {
  /** 今天的格式 */
  sameDay: string;
  
  /** 明天的格式 */
  nextDay: string;
  
  /** 下週的格式 */
  nextWeek: string;
  
  /** 昨天的格式 */
  lastDay: string;
  
  /** 上週的格式 */
  lastWeek: string;
  
  /** 其他日期的格式 */
  sameElse: string;
}

/**
 * 相對時間格式規範
 */
interface RelativeTimeSpec {
  /** 未來時間前綴模板 */
  future: string;
  
  /** 過去時間前綴模板 */
  past: string;
  
  /** 幾秒的文本 */
  s: string;
  
  /** 多秒的模板 */
  ss: string;
  
  /** 1分鐘的文本 */
  m: string;
  
  /** 多分鐘的模板 */
  mm: string;
  
  /** 1小時的文本 */
  h: string;
  
  /** 多小時的模板 */
  hh: string;
  
  /** 1天的文本 */
  d: string;
  
  /** 多天的模板 */
  dd: string;
  
  /** 1個月的文本 */
  M: string;
  
  /** 多個月的模板 */
  MM: string;
  
  /** 1年的文本 */
  y: string;
  
  /** 多年的模板 */
  yy: string;
}

/**
 * Moment.js 實例接口
 */
interface Moment {
  /**
   * 定義新的 locale
   * @param name - locale 名稱
   * @param config - locale 配置對象
   */
  defineLocale(name: string, config: LocaleSpecification): void;
}

/**
 * 定義繁體中文（台灣）locale 配置
 * @param moment - Moment.js 實例
 */
declare function defineZhTwLocale(moment: Moment): void;

export { LocaleSpecification, LongDateFormatSpec, CalendarSpec, RelativeTimeSpec, Moment, defineZhTwLocale };