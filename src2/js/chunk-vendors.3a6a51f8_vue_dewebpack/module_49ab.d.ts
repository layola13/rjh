/**
 * Moment.js locale configuration for Traditional Chinese (Hong Kong)
 * 繁體中文（香港）地區配置
 */

/**
 * Locale configuration object for zh-hk (Traditional Chinese - Hong Kong)
 * 香港繁體中文語言環境配置對象
 */
export interface ZhHkLocaleConfig {
  /** 
   * Full month names in Traditional Chinese
   * 完整的月份名稱（繁體中文）
   */
  months: string[];

  /** 
   * Abbreviated month names in Traditional Chinese
   * 縮寫的月份名稱（繁體中文）
   */
  monthsShort: string[];

  /** 
   * Full weekday names in Traditional Chinese
   * 完整的星期名稱（繁體中文）
   */
  weekdays: string[];

  /** 
   * Abbreviated weekday names in Traditional Chinese
   * 縮寫的星期名稱（繁體中文）
   */
  weekdaysShort: string[];

  /** 
   * Minimal weekday names in Traditional Chinese
   * 最簡短的星期名稱（繁體中文）
   */
  weekdaysMin: string[];

  /** 
   * Long date format tokens and their corresponding formats
   * 長日期格式標記及其對應的格式
   */
  longDateFormat: {
    /** Time format - HH:mm */
    LT: string;
    /** Time with seconds format - HH:mm:ss */
    LTS: string;
    /** Date format - YYYY/MM/DD */
    L: string;
    /** Long date format - YYYY年M月D日 */
    LL: string;
    /** Long date with time format - YYYY年M月D日 HH:mm */
    LLL: string;
    /** Long date with weekday and time format - YYYY年M月D日dddd HH:mm */
    LLLL: string;
    /** Short date format - YYYY/M/D */
    l: string;
    /** Short long date format - YYYY年M月D日 */
    ll: string;
    /** Short long date with time format - YYYY年M月D日 HH:mm */
    lll: string;
    /** Short long date with weekday and time format - YYYY年M月D日dddd HH:mm */
    llll: string;
  };

  /** 
   * Regular expression to parse meridiem (AM/PM) in Traditional Chinese
   * 用於解析中文時段（上午/下午）的正則表達式
   */
  meridiemParse: RegExp;

  /**
   * Convert 12-hour format to 24-hour format based on meridiem
   * 根據時段將12小時制轉換為24小時制
   * 
   * @param hour - Hour in 12-hour format (0-12)
   * @param meridiem - Time period indicator (凌晨/早上/上午/中午/下午/晚上)
   * @returns Hour in 24-hour format (0-23) or undefined if invalid
   */
  meridiemHour(hour: number, meridiem: string): number | undefined;

  /**
   * Get meridiem string based on hour and minute
   * 根據小時和分鐘獲取時段字符串
   * 
   * @param hour - Hour (0-23)
   * @param minute - Minute (0-59)
   * @param isLowercase - Whether to return lowercase (not used in Chinese)
   * @returns Meridiem string (凌晨/早上/上午/中午/下午/晚上)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;

  /** 
   * Calendar date formats for relative dates
   * 相對日期的日曆格式
   */
  calendar: {
    /** Format for today - [今天]LT */
    sameDay: string;
    /** Format for tomorrow - [明天]LT */
    nextDay: string;
    /** Format for next week - [下]ddddLT */
    nextWeek: string;
    /** Format for yesterday - [昨天]LT */
    lastDay: string;
    /** Format for last week - [上]ddddLT */
    lastWeek: string;
    /** Format for other dates - L */
    sameElse: string;
  };

  /** 
   * Regular expression to parse ordinal numbers with units
   * 用於解析序數詞的正則表達式（帶單位）
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Get ordinal string for a number based on context
   * 根據上下文獲取數字的序數詞字符串
   * 
   * @param num - The number to ordinalize
   * @param token - The format token indicating context (d/D/DDD/M/w/W)
   * @returns Ordinal string with appropriate suffix (日/月/週)
   */
  ordinal(num: number, token: string): string;

  /** 
   * Relative time format strings
   * 相對時間格式字符串
   */
  relativeTime: {
    /** Future time format - %s後 */
    future: string;
    /** Past time format - %s前 */
    past: string;
    /** Few seconds - 幾秒 */
    s: string;
    /** Seconds format - %d 秒 */
    ss: string;
    /** One minute - 1 分鐘 */
    m: string;
    /** Minutes format - %d 分鐘 */
    mm: string;
    /** One hour - 1 小時 */
    h: string;
    /** Hours format - %d 小時 */
    hh: string;
    /** One day - 1 天 */
    d: string;
    /** Days format - %d 天 */
    dd: string;
    /** One month - 1 個月 */
    M: string;
    /** Months format - %d 個月 */
    MM: string;
    /** One year - 1 年 */
    y: string;
    /** Years format - %d 年 */
    yy: string;
  };
}

/**
 * Moment.js instance interface with locale definition method
 * Moment.js 實例接口，包含語言環境定義方法
 */
export interface MomentInstance {
  /**
   * Define a locale configuration
   * 定義語言環境配置
   * 
   * @param localeName - Name of the locale (e.g., "zh-hk")
   * @param config - Locale configuration object
   * @returns The defined locale
   */
  defineLocale(localeName: string, config: ZhHkLocaleConfig): unknown;
}

/**
 * Initializes the zh-hk locale for Moment.js
 * 為 Moment.js 初始化香港繁體中文語言環境
 * 
 * @param moment - Moment.js instance
 */
export default function initZhHkLocale(moment: MomentInstance): void;