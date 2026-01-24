/**
 * Moment.js Ukrainian (uk) locale configuration
 * Provides localization for dates, times, and relative time formatting in Ukrainian
 */

/**
 * Moment.js locale interface
 */
interface Moment {
  /** Gets or sets the day of the week (0-6, Sunday-Saturday) */
  day(): number;
  /** Gets the hours (0-23) */
  hours(): number;
  /** Defines a locale configuration */
  defineLocale(locale: string, config: LocaleConfiguration): void;
}

/**
 * Configuration object for a locale
 */
interface LocaleConfiguration {
  /** Month names in different grammatical cases */
  months: MonthsConfiguration;
  /** Abbreviated month names */
  monthsShort: string;
  /** Day of week names (can be function or array) */
  weekdays: WeekdaysFunction | string[];
  /** Abbreviated day names */
  weekdaysShort: string;
  /** Minimally abbreviated day names */
  weekdaysMin: string;
  /** Date/time format templates */
  longDateFormat: LongDateFormat;
  /** Calendar-specific formatting rules */
  calendar: CalendarConfiguration;
  /** Relative time formatting rules */
  relativeTime: RelativeTimeConfiguration;
  /** Regular expression to parse meridiem (AM/PM equivalent) */
  meridiemParse: RegExp;
  /** Determines if given string represents PM */
  isPM(meridiemString: string): boolean;
  /** Returns meridiem string for given hour/minute */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  /** Regular expression to parse ordinal dates */
  dayOfMonthOrdinalParse: RegExp;
  /** Returns ordinal suffix for a number */
  ordinal(num: number, token: string): string;
  /** Week numbering configuration */
  week: WeekConfiguration;
}

/**
 * Month names configuration with grammatical cases
 */
interface MonthsConfiguration {
  /** Month names in accusative/prepositional case (e.g., "of January") */
  format: string;
  /** Month names in nominative case (e.g., "January") */
  standalone: string;
}

/**
 * Date and time format templates
 */
interface LongDateFormat {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date with day of week and time */
  LLLL: string;
}

/**
 * Calendar display configuration for relative dates
 */
interface CalendarConfiguration {
  /** Format for today */
  sameDay: string | CalendarFunction;
  /** Format for tomorrow */
  nextDay: string | CalendarFunction;
  /** Format for yesterday */
  lastDay: string | CalendarFunction;
  /** Format for next week */
  nextWeek: string | CalendarFunction;
  /** Format for last week */
  lastWeek: string | CalendarFunction;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time formatting configuration
 */
interface RelativeTimeConfiguration {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (singular/few seconds) */
  s: string;
  /** Seconds (with number) */
  ss: string | RelativeTimeFunction;
  /** Minute (singular) */
  m: string | RelativeTimeFunction;
  /** Minutes (with number) */
  mm: string | RelativeTimeFunction;
  /** Hour (singular) */
  h: string;
  /** Hours (with number) */
  hh: string | RelativeTimeFunction;
  /** Day (singular) */
  d: string;
  /** Days (with number) */
  dd: string | RelativeTimeFunction;
  /** Month (singular) */
  M: string;
  /** Months (with number) */
  MM: string | RelativeTimeFunction;
  /** Year (singular) */
  y: string;
  /** Years (with number) */
  yy: string | RelativeTimeFunction;
}

/**
 * Week numbering system configuration
 */
interface WeekConfiguration {
  /** First day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year that starts week 1 */
  doy: number;
}

/**
 * Function that returns weekday names based on context
 * @param momentInstance - Moment instance or boolean flag
 * @param format - Date format string for context detection
 * @returns Weekday name or array of names
 */
type WeekdaysFunction = (
  momentInstance: Moment | boolean,
  format: string
) => string | string[];

/**
 * Function that generates calendar format strings
 * @returns Formatted string for calendar display
 */
type CalendarFunction = (this: Moment) => string;

/**
 * Function that formats relative time with proper Ukrainian grammar
 * @param num - Number of time units
 * @param withoutSuffix - Whether to include "ago" suffix
 * @param key - Time unit key (ss, mm, hh, etc.)
 * @returns Formatted relative time string
 */
type RelativeTimeFunction = (
  num: number,
  withoutSuffix: boolean,
  key: string
) => string;

/**
 * Selects proper plural form for Ukrainian language
 * Ukrainian has three plural forms depending on the number
 * 
 * @param word - String with three forms separated by underscores (e.g., "секунда_секунди_секунд")
 * @param num - The number to determine plural form
 * @returns Appropriate word form for the given number
 * 
 * @example
 * pluralForm("секунда_секунди_секунд", 1) // "секунда"
 * pluralForm("секунда_секунди_секунд", 2) // "секунди"
 * pluralForm("секунда_секунди_секунд", 5) // "секунд"
 */
declare function pluralForm(word: string, num: number): string;

/**
 * Formats relative time with proper Ukrainian grammar
 * Handles special cases for minutes and hours, and applies plural rules
 * 
 * @param num - Number of time units
 * @param withoutSuffix - True for nominative case, false for accusative
 * @param key - Time unit identifier (ss, mm, hh, dd, MM, yy, m, h)
 * @returns Formatted string with number and proper word form
 * 
 * @example
 * relativeTimeWithPlural(5, true, "mm") // "5 хвилин"
 * relativeTimeWithPlural(1, false, "h") // "годину"
 */
declare function relativeTimeWithPlural(
  num: number,
  withoutSuffix: boolean,
  key: string
): string;

/**
 * Returns appropriate weekday name based on grammatical context
 * Ukrainian weekday names change based on usage (nominative/accusative/genitive)
 * 
 * @param momentInstance - Moment instance for date context, or true for week array
 * @param format - Format string to determine grammatical case
 * @returns Weekday name in appropriate case, or array of names
 * 
 * @example
 * weekdaysCaseReplace(moment(), "[У] dddd") // accusative case
 * weekdaysCaseReplace(moment(), "[Минулої] dddd") // genitive case
 */
declare function weekdaysCaseReplace(
  momentInstance: Moment | boolean,
  format: string
): string | string[];

/**
 * Builds calendar format function for Ukrainian locale
 * Handles special case where "11 o'clock" needs extra "б" character
 * 
 * @param prefix - Prefix string for the format (e.g., "[Сьогодні ")
 * @returns Function that generates complete calendar format
 * 
 * @example
 * buildCalendarFormat("[Сьогодні ")() // "[Сьогодні о] LT" or "[Сьогодні об] LT" for 11:00
 */
declare function buildCalendarFormat(
  prefix: string
): (this: Moment) => string;

/**
 * Ukrainian locale module for Moment.js
 * Configures all localization aspects including:
 * - Month names (format and standalone forms)
 * - Weekday names with grammatical cases
 * - Date/time formats
 * - Relative time expressions
 * - Calendar expressions
 * - Ordinal numbers
 * 
 * @param moment - Moment.js instance to configure
 */
declare module "moment/locale/uk" {
  const ukLocale: void;
  export default ukLocale;
}