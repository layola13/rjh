/**
 * Moment.js locale configuration for Punjabi (India)
 * Locale code: pa-in
 */

/**
 * Mapping from Western Arabic numerals to Gurmukhi numerals
 */
export interface NumberSymbolMap {
  readonly [key: string]: string;
  readonly 1: "੧";
  readonly 2: "੨";
  readonly 3: "੩";
  readonly 4: "੪";
  readonly 5: "੫";
  readonly 6: "੬";
  readonly 7: "੭";
  readonly 8: "੮";
  readonly 9: "੯";
  readonly 0: "੦";
}

/**
 * Mapping from Gurmukhi numerals to Western Arabic numerals
 */
export interface GurmukhiToArabicMap {
  readonly [key: string]: string;
  readonly "੧": "1";
  readonly "੨": "2";
  readonly "੩": "3";
  readonly "੪": "4";
  readonly "੫": "5";
  readonly "੬": "6";
  readonly "੭": "7";
  readonly "੮": "8";
  readonly "੯": "9";
  readonly "੦": "0";
}

/**
 * Long date format tokens for Punjabi locale
 */
export interface LongDateFormat {
  /** Time format (e.g., "A h:mm ਵਜੇ") */
  readonly LT: string;
  /** Time format with seconds (e.g., "A h:mm:ss ਵਜੇ") */
  readonly LTS: string;
  /** Short date format (e.g., "DD/MM/YYYY") */
  readonly L: string;
  /** Long date format (e.g., "D MMMM YYYY") */
  readonly LL: string;
  /** Long date with time format (e.g., "D MMMM YYYY, A h:mm ਵਜੇ") */
  readonly LLL: string;
  /** Full date with weekday and time format (e.g., "dddd, D MMMM YYYY, A h:mm ਵਜੇ") */
  readonly LLLL: string;
}

/**
 * Calendar format configuration for relative dates
 */
export interface CalendarSpec {
  /** Format for today (e.g., "[ਅਜ] LT") */
  readonly sameDay: string;
  /** Format for tomorrow (e.g., "[ਕਲ] LT") */
  readonly nextDay: string;
  /** Format for next week (e.g., "[ਅਗਲਾ] dddd, LT") */
  readonly nextWeek: string;
  /** Format for yesterday (e.g., "[ਕਲ] LT") */
  readonly lastDay: string;
  /** Format for last week (e.g., "[ਪਿਛਲੇ] dddd, LT") */
  readonly lastWeek: string;
  /** Format for other dates (e.g., "L") */
  readonly sameElse: string;
}

/**
 * Relative time format strings
 */
export interface RelativeTimeSpec {
  /** Future time format (e.g., "%s ਵਿੱਚ") */
  readonly future: string;
  /** Past time format (e.g., "%s ਪਿਛਲੇ") */
  readonly past: string;
  /** Few seconds (e.g., "ਕੁਝ ਸਕਿੰਟ") */
  readonly s: string;
  /** Seconds format (e.g., "%d ਸਕਿੰਟ") */
  readonly ss: string;
  /** One minute (e.g., "ਇਕ ਮਿੰਟ") */
  readonly m: string;
  /** Minutes format (e.g., "%d ਮਿੰਟ") */
  readonly mm: string;
  /** One hour (e.g., "ਇੱਕ ਘੰਟਾ") */
  readonly h: string;
  /** Hours format (e.g., "%d ਘੰਟੇ") */
  readonly hh: string;
  /** One day (e.g., "ਇੱਕ ਦਿਨ") */
  readonly d: string;
  /** Days format (e.g., "%d ਦਿਨ") */
  readonly dd: string;
  /** One month (e.g., "ਇੱਕ ਮਹੀਨਾ") */
  readonly M: string;
  /** Months format (e.g., "%d ਮਹੀਨੇ") */
  readonly MM: string;
  /** One year (e.g., "ਇੱਕ ਸਾਲ") */
  readonly y: string;
  /** Years format (e.g., "%d ਸਾਲ") */
  readonly yy: string;
}

/**
 * Week configuration
 */
export interface WeekSpec {
  /** Day of week (0 = Sunday) */
  readonly dow: number;
  /** Day of year for first week */
  readonly doy: number;
}

/**
 * Punjabi (India) locale configuration for Moment.js
 */
export interface PunjabiLocaleConfig {
  /** Full month names in Punjabi */
  readonly months: ReadonlyArray<string>;
  /** Short month names in Punjabi */
  readonly monthsShort: ReadonlyArray<string>;
  /** Full weekday names in Punjabi */
  readonly weekdays: ReadonlyArray<string>;
  /** Short weekday names in Punjabi */
  readonly weekdaysShort: ReadonlyArray<string>;
  /** Minimal weekday names in Punjabi */
  readonly weekdaysMin: ReadonlyArray<string>;
  /** Long date format tokens */
  readonly longDateFormat: LongDateFormat;
  /** Calendar format configuration */
  readonly calendar: CalendarSpec;
  /** Relative time format strings */
  readonly relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing meridiem (AM/PM) */
  readonly meridiemParse: RegExp;
  /** Week configuration */
  readonly week: WeekSpec;
  
  /**
   * Pre-parse function to convert Gurmukhi numerals to Arabic numerals
   * @param input - String containing Gurmukhi numerals
   * @returns String with Arabic numerals
   */
  preparse(input: string): string;
  
  /**
   * Post-format function to convert Arabic numerals to Gurmukhi numerals
   * @param input - String containing Arabic numerals
   * @returns String with Gurmukhi numerals
   */
  postformat(input: string): string;
  
  /**
   * Adjust hour based on meridiem period
   * @param hour - Hour value (0-23)
   * @param meridiem - Meridiem string (ਰਾਤ/ਸਵੇਰ/ਦੁਪਹਿਰ/ਸ਼ਾਮ)
   * @returns Adjusted hour value
   */
  meridiemHour(hour: number, meridiem: string): number;
  
  /**
   * Get meridiem string for given time
   * @param hour - Hour value (0-23)
   * @param minute - Minute value (0-59)
   * @param isLowercase - Whether to return lowercase meridiem
   * @returns Meridiem string (ਰਾਤ/ਸਵੇਰ/ਦੁਪਹਿਰ/ਸ਼ਾਮ)
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
}

/**
 * Moment.js instance interface with defineLocale method
 */
export interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeKey - Locale identifier (e.g., "pa-in")
   * @param config - Locale configuration object
   */
  defineLocale(localeKey: string, config: PunjabiLocaleConfig): void;
}

/**
 * Initialize Punjabi (India) locale for Moment.js
 * @param moment - Moment.js static instance
 */
export default function initializePunjabiLocale(moment: MomentStatic): void;