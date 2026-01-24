/**
 * Moment.js locale configuration for Serbian (Latin script)
 * Locale code: sr
 */

/**
 * Translation configuration for Serbian locale grammatical cases
 */
interface SerbianTranslationConfig {
  /**
   * Word forms for different grammatical cases and numbers
   */
  words: {
    /** Second forms: singular, dual, plural */
    ss: [string, string, string];
    /** Minute forms: singular nominative, singular genitive */
    m: [string, string];
    /** Minutes forms: nominative, genitive, plural */
    mm: [string, string, string];
    /** Hour forms: singular nominative, singular genitive */
    h: [string, string];
    /** Hours forms: nominative, genitive, plural */
    hh: [string, string, string];
    /** Day forms: nominative, genitive, plural */
    dd: [string, string, string];
    /** Month forms: nominative, genitive, plural */
    MM: [string, string, string];
    /** Year forms: nominative, genitive, plural */
    yy: [string, string, string];
  };

  /**
   * Selects the correct grammatical case form based on the number
   * @param count - The numeric value
   * @param forms - Array of forms: [singular, dual (2-4), plural]
   * @returns The appropriate form for the given count
   */
  correctGrammaticalCase(count: number, forms: [string, string, string]): string;

  /**
   * Translates relative time units with proper grammatical forms
   * @param count - The numeric value
   * @param withoutSuffix - Whether to use nominative case (true) or genitive (false)
   * @param key - The time unit key (ss, m, mm, h, hh, dd, MM, yy)
   * @returns Translated string with proper grammatical form
   */
  translate(count: number, withoutSuffix: boolean, key: string): string;
}

/**
 * Moment.js locale specification for Serbian
 */
interface MomentLocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use strict parsing for months */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use strict parsing for weekdays */
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
  /** Calendar format configuration */
  calendar: {
    /** Format for today */
    sameDay: string;
    /** Format for tomorrow */
    nextDay: string;
    /** Function returning format for next week based on day of week */
    nextWeek(): string;
    /** Format for yesterday */
    lastDay: string;
    /** Function returning format for last week based on day of week */
    lastWeek(): string;
    /** Default format for other days */
    sameElse: string;
  };
  /** Relative time format configuration */
  relativeTime: {
    /** Future time prefix format */
    future: string;
    /** Past time prefix format */
    past: string;
    /** A few seconds text */
    s: string;
    /** Seconds formatter function */
    ss: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Minute formatter function */
    m: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Minutes formatter function */
    mm: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Hour formatter function */
    h: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Hours formatter function */
    hh: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Day text */
    d: string;
    /** Days formatter function */
    dd: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Month text */
    M: string;
    /** Months formatter function */
    MM: (count: number, withoutSuffix: boolean, key: string) => string;
    /** Year text */
    y: string;
    /** Years formatter function */
    yy: (count: number, withoutSuffix: boolean, key: string) => string;
  };
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * Formats a number as ordinal
   * @param num - The day of month number
   * @returns Formatted ordinal string
   */
  ordinal(num: number): string;
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Defines a locale configuration
   * @param localeCode - The locale identifier (e.g., "sr")
   * @param config - The locale specification
   */
  defineLocale(localeCode: string, config: MomentLocaleSpecification): void;
}

declare module 'moment/locale/sr' {
  const locale: void;
  export = locale;
}