/**
 * Moment.js Hindi (hi) Locale Configuration
 * Provides localization for dates, times, and relative time formatting in Hindi
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping from Arabic numerals to Devanagari numerals
 */
interface NumeralMap {
  [key: string]: string;
  '0': '०';
  '1': '१';
  '2': '२';
  '3': '३';
  '4': '४';
  '5': '५';
  '6': '६';
  '7': '७';
  '8': '८';
  '9': '९';
}

/**
 * Mapping from Devanagari numerals to Arabic numerals
 */
interface DevanagariNumeralMap {
  [key: string]: string;
  '०': '0';
  '१': '1';
  '२': '2';
  '३': '3';
  '४': '4';
  '५': '5';
  '६': '6';
  '७': '7';
  '८': '8';
  '९': '9';
}

/**
 * Month name format configuration for Hindi locale
 */
interface MonthsConfig {
  /** Month names used in date formatting context */
  format: string[];
  /** Month names used in standalone context */
  standalone: string[];
}

/**
 * Meridiem periods in Hindi
 */
type MeridiemPeriod = 'रात' | 'सुबह' | 'दोपहर' | 'शाम';

/**
 * Arabic to Devanagari numeral mapping
 */
declare const arabicToDevanagariMap: NumeralMap;

/**
 * Devanagari to Arabic numeral mapping
 */
declare const devanagariToArabicMap: DevanagariNumeralMap;

/**
 * Regular expressions for parsing month names in Hindi
 */
declare const monthParsePatterns: RegExp[];

/**
 * Converts Arabic numerals in a string to Devanagari numerals
 * @param input - String containing Arabic numerals
 * @returns String with Devanagari numerals
 */
declare function postformat(input: string): string;

/**
 * Converts Devanagari numerals in a string to Arabic numerals
 * @param input - String containing Devanagari numerals
 * @returns String with Arabic numerals
 */
declare function preparse(input: string): string;

/**
 * Determines the meridiem period based on hour
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase format
 * @returns Meridiem period string in Hindi
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemPeriod;

/**
 * Adjusts hour based on meridiem period
 * @param hour - Hour in 12-hour format
 * @param meridiem - Meridiem period string
 * @returns Hour in 24-hour format
 */
declare function meridiemHour(hour: number, meridiem: MeridiemPeriod): number | undefined;

/**
 * Hindi locale configuration for Moment.js
 */
declare const hindiLocaleConfig: LocaleSpecification & {
  /** Month names configuration */
  months: MonthsConfig;
  
  /** Abbreviated month names */
  monthsShort: string[];
  
  /** Full weekday names */
  weekdays: string[];
  
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  
  /** Minimal weekday names */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  
  /** Month parsing regular expressions */
  monthsParse: RegExp[];
  
  /** Long month name parsing patterns */
  longMonthsParse: RegExp[];
  
  /** Short month name parsing patterns */
  shortMonthsParse: RegExp[];
  
  /** General month matching regex */
  monthsRegex: RegExp;
  
  /** Short month matching regex */
  monthsShortRegex: RegExp;
  
  /** Strict month matching regex */
  monthsStrictRegex: RegExp;
  
  /** Strict short month matching regex */
  monthsShortStrictRegex: RegExp;
  
  /** Calendar format strings */
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
  
  /** Preprocessing function for parsing */
  preparse: typeof preparse;
  
  /** Postprocessing function for formatting */
  postformat: typeof postformat;
  
  /** Meridiem parsing pattern */
  meridiemParse: RegExp;
  
  /** Meridiem hour adjustment function */
  meridiemHour: typeof meridiemHour;
  
  /** Meridiem determination function */
  meridiem: typeof meridiem;
  
  /** Week configuration */
  week: {
    /** Day of week (0 = Sunday) */
    dow: number;
    /** Day of year for week numbering */
    doy: number;
  };
};

/**
 * Defines and registers the Hindi locale with Moment.js
 * @param moment - Moment.js instance
 * @returns The registered locale
 */
export function defineHindiLocale(moment: typeof import('moment')): Locale;

export default hindiLocaleConfig;