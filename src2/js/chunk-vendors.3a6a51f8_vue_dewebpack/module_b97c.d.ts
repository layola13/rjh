/**
 * Moment.js locale configuration for Latvian (lv)
 * @module moment/locale/lv
 */

/**
 * Locale-specific unit declension forms
 * Each array contains 4 forms: [genitive, dative, nominative, plural]
 */
interface UnitDeclensions {
  /** Second declensions */
  ss: string[];
  /** Minute (singular) declensions */
  m: string[];
  /** Minutes (plural) declensions */
  mm: string[];
  /** Hour (singular) declensions */
  h: string[];
  /** Hours (plural) declensions */
  hh: string[];
  /** Day (singular) declensions */
  d: string[];
  /** Days (plural) declensions */
  dd: string[];
  /** Month (singular) declensions */
  M: string[];
  /** Months (plural) declensions */
  MM: string[];
  /** Year (singular) declensions */
  y: string[];
  /** Years (plural) declensions */
  yy: string[];
}

/**
 * Selects the appropriate declension form based on number and context
 * @param forms - Array of 4 declension forms [genitive, dative, nominative, plural]
 * @param number - The numeric value
 * @param isFuture - Whether this is for future tense (affects form selection)
 * @returns The appropriate declension form
 */
declare function selectDeclension(
  forms: string[],
  number: number,
  isFuture: boolean
): string;

/**
 * Formats a relative time with number and unit
 * @param number - The numeric value
 * @param isFuture - Whether this is for future tense
 * @param unitKey - Key identifying the time unit in UnitDeclensions
 * @returns Formatted string with number and declined unit
 */
declare function formatRelativeTimeWithNumber(
  number: number,
  isFuture: boolean,
  unitKey: keyof UnitDeclensions
): string;

/**
 * Formats a relative time with unit only (no number)
 * @param number - The numeric value (used for declension selection)
 * @param isFuture - Whether this is for future tense
 * @param unitKey - Key identifying the time unit in UnitDeclensions
 * @returns Formatted declined unit string
 */
declare function formatRelativeTimeUnitOnly(
  number: number,
  isFuture: boolean,
  unitKey: keyof UnitDeclensions
): string;

/**
 * Special formatter for "a few seconds"
 * @param number - The numeric value (unused)
 * @param isFuture - Whether this is for future tense
 * @returns "dažas sekundes" (future) or "dažām sekundēm" (past)
 */
declare function formatFewSeconds(number: number, isFuture: boolean): string;

/**
 * Latvian locale configuration object
 */
interface LatvianLocaleConfig {
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
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  /** Calendar-specific format strings */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  /** Relative time format configuration */
  relativeTime: {
    future: string;
    past: string;
    s: typeof formatFewSeconds;
    ss: typeof formatRelativeTimeWithNumber;
    m: typeof formatRelativeTimeUnitOnly;
    mm: typeof formatRelativeTimeWithNumber;
    h: typeof formatRelativeTimeUnitOnly;
    hh: typeof formatRelativeTimeWithNumber;
    d: typeof formatRelativeTimeUnitOnly;
    dd: typeof formatRelativeTimeWithNumber;
    M: typeof formatRelativeTimeUnitOnly;
    MM: typeof formatRelativeTimeWithNumber;
    y: typeof formatRelativeTimeUnitOnly;
    yy: typeof formatRelativeTimeWithNumber;
  };
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string;
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Registers the Latvian locale with moment.js
 * @param moment - The moment.js instance
 */
declare function defineLatvianLocale(moment: {
  defineLocale(locale: string, config: LatvianLocaleConfig): void;
}): void;

export { LatvianLocaleConfig, UnitDeclensions, defineLatvianLocale };