/**
 * Moment.js locale configuration for Kazakh (kk)
 * 
 * This module provides localization support for the Kazakh language,
 * including month names, weekday names, date formats, and ordinal suffixes.
 */

/**
 * Mapping of numbers to their ordinal suffixes in Kazakh
 * Used for formatting day of month with appropriate suffix (e.g., "1-ші", "6-шы")
 */
export interface OrdinalSuffixMap {
  /** Ordinal suffix for 0 */
  0: '-ші';
  /** Ordinal suffix for 1 */
  1: '-ші';
  /** Ordinal suffix for 2 */
  2: '-ші';
  /** Ordinal suffix for 3 */
  3: '-ші';
  /** Ordinal suffix for 4 */
  4: '-ші';
  /** Ordinal suffix for 5 */
  5: '-ші';
  /** Ordinal suffix for 6 */
  6: '-шы';
  /** Ordinal suffix for 7 */
  7: '-ші';
  /** Ordinal suffix for 8 */
  8: '-ші';
  /** Ordinal suffix for 9 */
  9: '-шы';
  /** Ordinal suffix for 10 */
  10: '-шы';
  /** Ordinal suffix for 20 */
  20: '-шы';
  /** Ordinal suffix for 30 */
  30: '-шы';
  /** Ordinal suffix for 40 */
  40: '-шы';
  /** Ordinal suffix for 50 */
  50: '-ші';
  /** Ordinal suffix for 60 */
  60: '-шы';
  /** Ordinal suffix for 70 */
  70: '-ші';
  /** Ordinal suffix for 80 */
  80: '-ші';
  /** Ordinal suffix for 90 */
  90: '-шы';
  /** Ordinal suffix for 100 */
  100: '-ші';
}

/**
 * Calendar display configuration for relative dates
 */
export interface CalendarSpec {
  /** Format for dates on the same day */
  sameDay: '[Бүгін сағат] LT';
  /** Format for dates on the next day */
  nextDay: '[Ертең сағат] LT';
  /** Format for dates in the next week */
  nextWeek: 'dddd [сағат] LT';
  /** Format for dates on the previous day */
  lastDay: '[Кеше сағат] LT';
  /** Format for dates in the last week */
  lastWeek: '[Өткен аптаның] dddd [сағат] LT';
  /** Format for all other dates */
  sameElse: 'L';
}

/**
 * Relative time format strings
 */
export interface RelativeTimeSpec {
  /** Format for future dates */
  future: '%s ішінде';
  /** Format for past dates */
  past: '%s бұрын';
  /** Label for a few seconds */
  s: 'бірнеше секунд';
  /** Format for multiple seconds */
  ss: '%d секунд';
  /** Label for one minute */
  m: 'бір минут';
  /** Format for multiple minutes */
  mm: '%d минут';
  /** Label for one hour */
  h: 'бір сағат';
  /** Format for multiple hours */
  hh: '%d сағат';
  /** Label for one day */
  d: 'бір күн';
  /** Format for multiple days */
  dd: '%d күн';
  /** Label for one month */
  M: 'бір ай';
  /** Format for multiple months */
  MM: '%d ай';
  /** Label for one year */
  y: 'бір жыл';
  /** Format for multiple years */
  yy: '%d жыл';
}

/**
 * Long date format tokens
 */
export interface LongDateFormatSpec {
  /** Time format (24-hour) */
  LT: 'HH:mm';
  /** Time format with seconds */
  LTS: 'HH:mm:ss';
  /** Short date format */
  L: 'DD.MM.YYYY';
  /** Long date format */
  LL: 'D MMMM YYYY';
  /** Long date and time format */
  LLL: 'D MMMM YYYY HH:mm';
  /** Full date and time format with weekday */
  LLLL: 'dddd, D MMMM YYYY HH:mm';
}

/**
 * Week configuration
 */
export interface WeekSpec {
  /** Day of week (1 = Monday) */
  dow: 1;
  /** Day of year for week 1 */
  doy: 7;
}

/**
 * Complete locale configuration for Kazakh language
 */
export interface KazakhLocaleConfig {
  /** Full month names in Kazakh */
  months: readonly [
    'қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
    'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'
  ];
  /** Abbreviated month names */
  monthsShort: readonly [
    'қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау',
    'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'
  ];
  /** Full weekday names */
  weekdays: readonly [
    'жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі',
    'бейсенбі', 'жұма', 'сенбі'
  ];
  /** Abbreviated weekday names */
  weekdaysShort: readonly ['жек', 'дүй', 'сей', 'сәр', 'бей', 'жұм', 'сен'];
  /** Minimal weekday names */
  weekdaysMin: readonly ['жк', 'дй', 'сй', 'ср', 'бй', 'жм', 'сн'];
  /** Long date format tokens */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal representation of a number */
  ordinal: (dayOfMonth: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment.js instance with locale support
 */
export interface MomentStatic {
  /**
   * Defines a locale configuration for moment.js
   * @param localeName - The locale identifier (e.g., "kk" for Kazakh)
   * @param config - The locale configuration object
   */
  defineLocale(localeName: 'kk', config: KazakhLocaleConfig): void;
}

/**
 * Initializes and registers the Kazakh locale configuration with moment.js
 * @param moment - The moment.js instance to configure
 */
export default function initKazakhLocale(moment: MomentStatic): void;