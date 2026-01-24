/**
 * Moment.js locale configuration for Nepali (ne)
 * Provides localization for dates, times, and relative time expressions in Nepali language
 */

/**
 * Mapping of Arabic numerals to Devanagari numerals used in Nepali
 */
export const ARABIC_TO_DEVANAGARI_DIGITS: Record<string, string> = {
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
  '0': '०'
};

/**
 * Mapping of Devanagari numerals to Arabic numerals
 */
export const DEVANAGARI_TO_ARABIC_DIGITS: Record<string, string> = {
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
  '०': '0'
};

/**
 * Moment.js Locale interface
 */
export interface Locale {
  /** Full month names */
  months: string;
  /** Abbreviated month names */
  monthsShort: string;
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string;
  /** Abbreviated weekday names */
  weekdaysShort: string;
  /** Minimal weekday names */
  weekdaysMin: string;
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Function to preparse date strings (converts Devanagari to Arabic numerals) */
  preparse: (dateString: string) => string;
  /** Function to postformat date strings (converts Arabic to Devanagari numerals) */
  postformat: (dateString: string) => string;
  /** Regular expression to parse meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  /** Function to adjust hour based on meridiem */
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  /** Function to get meridiem string based on hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Calendar relative date formats */
  calendar: CalendarSpec;
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format configuration
 */
export interface LongDateFormat {
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar specification for relative dates
 */
export interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time format specification
 */
export interface RelativeTimeSpec {
  /** Future time format */
  future: string;
  /** Past time format */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration
 */
export interface WeekSpec {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year that starts the first week */
  doy: number;
}

/**
 * Moment.js instance interface
 */
export interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "ne" for Nepali)
   * @param config - The locale configuration object
   * @returns The configured locale
   */
  defineLocale(localeName: string, config: Locale): Locale;
}

/**
 * Converts a date string with Devanagari numerals to Arabic numerals
 * @param dateString - Input string containing Devanagari digits
 * @returns String with Devanagari digits replaced by Arabic digits
 */
export function preparse(dateString: string): string;

/**
 * Converts a date string with Arabic numerals to Devanagari numerals
 * @param dateString - Input string containing Arabic digits
 * @returns String with Arabic digits replaced by Devanagari digits
 */
export function postformat(dateString: string): string;

/**
 * Adjusts hour value based on Nepali meridiem (राति/बिहान/दिउँसो/साँझ)
 * @param hour - Hour value (0-23)
 * @param meridiem - Nepali meridiem string
 * @returns Adjusted hour value or undefined if invalid
 */
export function meridiemHour(hour: number, meridiem: string): number | undefined;

/**
 * Returns the appropriate Nepali meridiem based on hour
 * @param hour - Hour value (0-23)
 * @param minute - Minute value (0-59)
 * @param isLowercase - Whether to return lowercase (unused in Nepali)
 * @returns Nepali meridiem string (राति/बिहान/दिउँसो/साँझ)
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): string;

/**
 * Initializes and registers the Nepali locale with moment.js
 * @param moment - The moment.js instance
 * @returns The configured Nepali locale
 */
export default function initializeNepaliLocale(moment: Moment): Locale;