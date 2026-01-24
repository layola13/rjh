/**
 * Moment.js locale configuration for Azerbaijani (az)
 * Provides date/time formatting, relative time strings, and ordinal suffixes
 */

/**
 * Ordinal suffix mapping for Azerbaijani numbers
 * Maps specific numbers and their remainders to appropriate suffixes
 */
interface OrdinalSuffixMap {
  /** Numbers ending in 1: use "-inci" */
  1: '-inci';
  5: '-inci';
  8: '-inci';
  70: '-inci';
  80: '-inci';
  /** Numbers ending in 2: use "-nci" */
  2: '-nci';
  7: '-nci';
  20: '-nci';
  50: '-nci';
  /** Numbers ending in 3 or 4: use "-üncü" */
  3: '-üncü';
  4: '-üncü';
  100: '-üncü';
  /** Number 6: use "-ncı" */
  6: '-ncı';
  /** Numbers ending in 9, 10, 30: use "-uncu" */
  9: '-uncu';
  10: '-uncu';
  30: '-uncu';
  /** Numbers 60 and 90: use "-ıncı" */
  60: '-ıncı';
  90: '-ıncı';
}

/**
 * Calendar display configuration for relative date strings
 */
interface CalendarSpec {
  /** Format for dates on the same day */
  sameDay: string;
  /** Format for dates on the next day */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates on the previous day */
  lastDay: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Singular second */
  s: string;
  /** Plural seconds */
  ss: string;
  /** Singular minute */
  m: string;
  /** Plural minutes */
  mm: string;
  /** Singular hour */
  h: string;
  /** Plural hours */
  hh: string;
  /** Singular day */
  d: string;
  /** Plural days */
  dd: string;
  /** Singular month */
  M: string;
  /** Plural months */
  MM: string;
  /** Singular year */
  y: string;
  /** Plural years */
  yy: string;
}

/**
 * Long date format configuration
 */
interface LongDateFormatSpec {
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
  /** Full date with time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete locale configuration for Moment.js
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
  /** Long date format specifications */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configuration */
  calendar: CalendarSpec;
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  /** Function to determine if time is PM */
  isPM: (input: string) => boolean;
  /** Function to return appropriate meridiem string */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (num: number) => string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment.js instance interface
 */
interface Moment {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier (e.g., "az" for Azerbaijani)
   * @param config - The locale configuration object
   * @returns The configured locale
   */
  defineLocale(localeName: string, config: LocaleSpecification): unknown;
}

/**
 * Defines the Azerbaijani locale configuration for Moment.js
 * @param momentInstance - The Moment.js instance to configure
 * @returns The configured locale object
 */
declare function defineAzerbaijaniLocale(momentInstance: Moment): unknown;

export = defineAzerbaijaniLocale;