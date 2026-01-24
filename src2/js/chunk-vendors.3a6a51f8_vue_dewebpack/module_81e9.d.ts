/**
 * Moment.js Finnish (fi) locale configuration
 * Provides localization for dates, times, and relative time formatting in Finnish
 */

/**
 * Relative time unit type for formatting
 */
type RelativeTimeUnit = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';

/**
 * Moment.js locale configuration object
 */
interface LocaleConfiguration {
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
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar format configuration */
  calendar: CalendarFormat;
  /** Relative time format configuration */
  relativeTime: RelativeTimeFormat;
  /** Regex pattern for parsing day of month ordinals */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string | ((num: number) => string);
  /** Week configuration */
  week: WeekConfiguration;
}

/**
 * Long date format configuration
 */
interface LongDateFormat {
  /** Time format (e.g., "HH.mm") */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with weekday */
  LLLL: string;
  /** Short date format (lowercase) */
  l: string;
  /** Short long date format */
  ll: string;
  /** Short long date and time format */
  lll: string;
  /** Short full date and time format */
  llll: string;
}

/**
 * Calendar format configuration for relative dates
 */
interface CalendarFormat {
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
 * Relative time format configuration
 */
interface RelativeTimeFormat {
  /** Format for future dates */
  future: string;
  /** Format for past dates */
  past: string;
  /** Format function for seconds */
  s: RelativeTimeFormatter;
  /** Format function for multiple seconds */
  ss: RelativeTimeFormatter;
  /** Format function for minute */
  m: RelativeTimeFormatter;
  /** Format function for multiple minutes */
  mm: RelativeTimeFormatter;
  /** Format function for hour */
  h: RelativeTimeFormatter;
  /** Format function for multiple hours */
  hh: RelativeTimeFormatter;
  /** Format function for day */
  d: RelativeTimeFormatter;
  /** Format function for multiple days */
  dd: RelativeTimeFormatter;
  /** Format function for month */
  M: RelativeTimeFormatter;
  /** Format function for multiple months */
  MM: RelativeTimeFormatter;
  /** Format function for year */
  y: RelativeTimeFormatter;
  /** Format function for multiple years */
  yy: RelativeTimeFormatter;
}

/**
 * Week configuration
 */
interface WeekConfiguration {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Function type for formatting relative time
 * @param value - The numeric value (e.g., number of minutes)
 * @param withoutSuffix - Whether to format without suffix
 * @param unit - The time unit
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
type RelativeTimeFormatter = (
  value: number,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit,
  isFuture: boolean
) => string;

/**
 * Moment.js instance interface
 */
interface MomentStatic {
  /**
   * Define a locale configuration
   * @param localeName - The locale identifier (e.g., "fi")
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

/**
 * Finnish number words from 0-9 (nominative case)
 */
declare const numberWordsNominative: readonly [
  'nolla',
  'yksi',
  'kaksi',
  'kolme',
  'neljä',
  'viisi',
  'kuusi',
  'seitsemän',
  'kahdeksan',
  'yhdeksän'
];

/**
 * Finnish number words from 0-9 (genitive case)
 */
declare const numberWordsGenitive: readonly [
  'nolla',
  'yhden',
  'kahden',
  'kolmen',
  'neljän',
  'viiden',
  'kuuden',
  'seitsemän',
  'kahdeksan',
  'yhdeksän'
];

/**
 * Translates a number to its Finnish word equivalent
 * @param value - The number to translate (0-9 or higher)
 * @param isFuture - Whether to use genitive case (future/past context)
 * @returns The Finnish word for the number
 */
declare function translateNumber(value: number, isFuture: boolean): string;

/**
 * Formats relative time in Finnish
 * @param value - The numeric value
 * @param withoutSuffix - Whether to format without suffix
 * @param unit - The time unit
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string in Finnish
 */
declare function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  unit: RelativeTimeUnit,
  isFuture: boolean
): string;

/**
 * Finnish locale configuration for moment.js
 */
export declare const fiLocale: LocaleConfiguration;

/**
 * Initializes the Finnish locale for moment.js
 * @param moment - The moment.js instance
 */
export declare function initializeFinnishLocale(moment: MomentStatic): void;