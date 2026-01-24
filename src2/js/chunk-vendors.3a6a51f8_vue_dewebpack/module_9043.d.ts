/**
 * Moment.js Bengali (Bangla) locale configuration
 * Provides localization for date/time formatting in Bengali language
 * @module bn-locale
 */

/**
 * Mapping of Western digits to Bengali numerals
 */
interface WesternToBengaliDigits {
  readonly 0: "০";
  readonly 1: "১";
  readonly 2: "২";
  readonly 3: "৩";
  readonly 4: "৪";
  readonly 5: "৫";
  readonly 6: "৬";
  readonly 7: "৭";
  readonly 8: "৮";
  readonly 9: "৯";
}

/**
 * Mapping of Bengali numerals to Western digits
 */
interface BengaliToWesternDigits {
  readonly "০": "0";
  readonly "১": "1";
  readonly "২": "2";
  readonly "৩": "3";
  readonly "৪": "4";
  readonly "৫": "5";
  readonly "৬": "6";
  readonly "৭": "7";
  readonly "৮": "8";
  readonly "৯": "9";
}

/**
 * Bengali time period names
 */
type BengaliMeridiem = "রাত" | "সকাল" | "দুপুর" | "বিকাল";

/**
 * Moment.js locale definition interface
 */
interface MomentLocaleDefinition {
  /** Full month names in Bengali */
  readonly months: ReadonlyArray<string>;
  
  /** Abbreviated month names in Bengali */
  readonly monthsShort: ReadonlyArray<string>;
  
  /** Full weekday names in Bengali */
  readonly weekdays: ReadonlyArray<string>;
  
  /** Short weekday names in Bengali */
  readonly weekdaysShort: ReadonlyArray<string>;
  
  /** Minimal weekday names in Bengali */
  readonly weekdaysMin: ReadonlyArray<string>;
  
  /** Long date format patterns */
  readonly longDateFormat: {
    readonly LT: string;
    readonly LTS: string;
    readonly L: string;
    readonly LL: string;
    readonly LLL: string;
    readonly LLLL: string;
  };
  
  /** Calendar strings for relative dates */
  readonly calendar: {
    readonly sameDay: string;
    readonly nextDay: string;
    readonly nextWeek: string;
    readonly lastDay: string;
    readonly lastWeek: string;
    readonly sameElse: string;
  };
  
  /** Relative time format strings */
  readonly relativeTime: {
    readonly future: string;
    readonly past: string;
    readonly s: string;
    readonly ss: string;
    readonly m: string;
    readonly mm: string;
    readonly h: string;
    readonly hh: string;
    readonly d: string;
    readonly dd: string;
    readonly M: string;
    readonly MM: string;
    readonly y: string;
    readonly yy: string;
  };
  
  /**
   * Converts Bengali numerals in a string to Western digits
   * @param input - String containing Bengali numerals
   * @returns String with Western digits
   */
  preparse(input: string): string;
  
  /**
   * Converts Western digits in a string to Bengali numerals
   * @param input - String containing Western digits
   * @returns String with Bengali numerals
   */
  postformat(input: string): string;
  
  /** Regular expression to parse meridiem indicators */
  readonly meridiemParse: RegExp;
  
  /**
   * Adjusts hour based on Bengali meridiem period
   * @param hour - Hour value (0-23)
   * @param meridiem - Bengali time period indicator
   * @returns Adjusted hour in 24-hour format
   */
  meridiemHour(hour: number, meridiem: BengaliMeridiem): number;
  
  /**
   * Determines Bengali meridiem period from hour and minute
   * @param hour - Hour value (0-23)
   * @param minute - Minute value (0-59)
   * @param isLowercase - Whether to return lowercase (unused in Bengali)
   * @returns Bengali time period name
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): BengaliMeridiem;
  
  /** Week configuration */
  readonly week: {
    /** Day of week (0 = Sunday) */
    readonly dow: 0;
    /** Day of year that starts week 1 */
    readonly doy: 6;
  };
}

/**
 * Moment.js instance with locale methods
 */
interface Moment {
  /**
   * Defines a new locale or updates an existing one
   * @param localeName - Locale identifier (e.g., "bn")
   * @param config - Locale configuration object
   */
  defineLocale(localeName: string, config: MomentLocaleDefinition): void;
}

/**
 * Bengali (Bangla) locale configuration for Moment.js
 * @param moment - Moment.js instance
 */
declare function defineBengaliLocale(moment: Moment): void;

export { defineBengaliLocale };
export type {
  WesternToBengaliDigits,
  BengaliToWesternDigits,
  BengaliMeridiem,
  MomentLocaleDefinition,
  Moment
};