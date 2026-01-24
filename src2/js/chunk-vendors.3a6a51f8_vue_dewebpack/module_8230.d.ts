/**
 * Moment.js locale configuration for Arabic (Saudi Arabia)
 * Locale: ar-sa
 */

/**
 * Mapping from Western Arabic numerals to Eastern Arabic-Indic numerals
 */
type WesternToEasternNumeralMap = {
  [K in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Eastern Arabic-Indic numerals to Western Arabic numerals
 */
type EasternToWesternNumeralMap = {
  [key: string]: string;
};

/**
 * Moment.js locale specification interface
 */
interface LocaleSpecification {
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
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format patterns */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  /** Regular expression to parse meridiem (AM/PM) */
  meridiemParse: RegExp;
  /** Function to determine if time is PM */
  isPM: (meridiemString: string) => boolean;
  /** Function to get meridiem string for given hour */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Calendar display formats for relative dates */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  /** Relative time format strings */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  /** Function to preprocess input strings (convert Eastern to Western numerals) */
  preparse: (input: string) => string;
  /** Function to postprocess output strings (convert Western to Eastern numerals) */
  postformat: (output: string) => string;
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year that starts the first week */
    doy: number;
  };
}

/**
 * Moment.js instance interface
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., 'ar-sa')
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleSpecification): void;
}

/**
 * Arabic (Saudi Arabia) locale module for moment.js
 * @param moment - Moment.js instance
 */
declare function arSaLocale(moment: MomentStatic): void;

export = arSaLocale;