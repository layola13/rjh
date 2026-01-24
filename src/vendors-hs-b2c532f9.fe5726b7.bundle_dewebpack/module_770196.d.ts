/**
 * Moment.js locale configuration for Sindhi (sd)
 * Provides localization settings including month names, weekday names,
 * date formats, and relative time strings in the Sindhi language.
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month names in Sindhi language
 * Used for both full and abbreviated month representations
 */
declare const MONTHS: readonly [
  "جنوري",
  "فيبروري",
  "مارچ",
  "اپريل",
  "مئي",
  "جون",
  "جولاءِ",
  "آگسٽ",
  "سيپٽمبر",
  "آڪٽوبر",
  "نومبر",
  "ڊسمبر"
];

/**
 * Weekday names in Sindhi language
 * Used for full, short, and minimal weekday representations
 */
declare const WEEKDAYS: readonly [
  "آچر",
  "سومر",
  "اڱارو",
  "اربع",
  "خميس",
  "جمع",
  "ڇنڇر"
];

/**
 * Long date format tokens and their corresponding format strings
 */
interface LongDateFormat {
  /** Time format (24-hour) */
  LT: "HH:mm";
  /** Time format with seconds */
  LTS: "HH:mm:ss";
  /** Short date format */
  L: "DD/MM/YYYY";
  /** Long date format */
  LL: "D MMMM YYYY";
  /** Long date format with time */
  LLL: "D MMMM YYYY HH:mm";
  /** Full date format with weekday and time */
  LLLL: "dddd، D MMMM YYYY HH:mm";
}

/**
 * Calendar format strings for relative dates
 */
interface CalendarFormat {
  /** Format for today */
  sameDay: "[اڄ] LT";
  /** Format for tomorrow */
  nextDay: "[سڀاڻي] LT";
  /** Format for next week */
  nextWeek: "dddd [اڳين هفتي تي] LT";
  /** Format for yesterday */
  lastDay: "[ڪالهه] LT";
  /** Format for last week */
  lastWeek: "[گزريل هفتي] dddd [تي] LT";
  /** Format for other dates */
  sameElse: "L";
}

/**
 * Relative time format strings
 */
interface RelativeTimeFormat {
  /** Future time prefix */
  future: "%s پوء";
  /** Past time prefix */
  past: "%s اڳ";
  /** Few seconds */
  s: "چند سيڪنڊ";
  /** Seconds (plural) */
  ss: "%d سيڪنڊ";
  /** One minute */
  m: "هڪ منٽ";
  /** Minutes (plural) */
  mm: "%d منٽ";
  /** One hour */
  h: "هڪ ڪلاڪ";
  /** Hours (plural) */
  hh: "%d ڪلاڪ";
  /** One day */
  d: "هڪ ڏينهن";
  /** Days (plural) */
  dd: "%d ڏينهن";
  /** One month */
  M: "هڪ مهينو";
  /** Months (plural) */
  MM: "%d مهينا";
  /** One year */
  y: "هڪ سال";
  /** Years (plural) */
  yy: "%d سال";
}

/**
 * Week configuration settings
 */
interface WeekConfig {
  /** Day of week (Monday = 1) */
  dow: 1;
  /** Day of year that defines the first week */
  doy: 4;
}

/**
 * Determines if the time is PM (afternoon/evening)
 * @param meridiemString - The meridiem string to check ("صبح" or "شام")
 * @returns true if the string represents PM (شام), false otherwise
 */
declare function isPM(meridiemString: string): boolean;

/**
 * Returns the appropriate meridiem string based on hour and minute
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour (0-59)
 * @param isLowercase - Whether to return lowercase format
 * @returns "صبح" (morning) if hour < 12, otherwise "شام" (evening)
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): "صبح" | "شام";

/**
 * Preprocesses input string by replacing Sindhi comma with standard comma
 * @param input - The input string to preprocess
 * @returns Processed string with standard commas
 */
declare function preparse(input: string): string;

/**
 * Post-processes output string by replacing standard comma with Sindhi comma
 * @param output - The output string to postprocess
 * @returns Processed string with Sindhi commas
 */
declare function postformat(output: string): string;

/**
 * Complete Sindhi locale configuration for Moment.js
 */
declare const SindhiLocaleConfig: LocaleSpecification & {
  months: typeof MONTHS;
  monthsShort: typeof MONTHS;
  weekdays: typeof WEEKDAYS;
  weekdaysShort: typeof WEEKDAYS;
  weekdaysMin: typeof WEEKDAYS;
  longDateFormat: LongDateFormat;
  meridiemParse: RegExp;
  isPM: typeof isPM;
  meridiem: typeof meridiem;
  calendar: CalendarFormat;
  relativeTime: RelativeTimeFormat;
  preparse: typeof preparse;
  postformat: typeof postformat;
  week: WeekConfig;
};

/**
 * Defines and registers the Sindhi locale with Moment.js
 * @param moment - The Moment.js instance
 * @returns The registered Sindhi locale
 */
declare function defineLocale(moment: typeof import('moment')): Locale;

export { 
  SindhiLocaleConfig,
  defineLocale,
  MONTHS,
  WEEKDAYS,
  isPM,
  meridiem,
  preparse,
  postformat
};

export default defineLocale;