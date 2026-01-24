/**
 * Moment.js locale configuration for Latvian (lv)
 * Provides localized date/time formatting, relative time, and calendar strings
 */

declare module 'moment' {
  interface Locale {}
}

/**
 * Relative time unit forms in Latvian
 * Array format: [genitive_plural, dative_plural, nominative_singular, nominative_plural]
 */
interface RelativeTimeUnits {
  /** Seconds: sekundes/sekundēm/sekunde/sekundes */
  ss: string[];
  /** Minute: minūtes/minūtēm/minūte/minūtes */
  m: string[];
  /** Minutes: minūtes/minūtēm/minūte/minūtes */
  mm: string[];
  /** Hour: stundas/stundām/stunda/stundas */
  h: string[];
  /** Hours: stundas/stundām/stunda/stundas */
  hh: string[];
  /** Day: dienas/dienām/diena/dienas */
  d: string[];
  /** Days: dienas/dienām/diena/dienas */
  dd: string[];
  /** Month: mēneša/mēnešiem/mēnesis/mēneši */
  M: string[];
  /** Months: mēneša/mēnešiem/mēnesis/mēneši */
  MM: string[];
  /** Year: gada/gadiem/gads/gadi */
  y: string[];
  /** Years: gada/gadiem/gads/gadi */
  yy: string[];
}

/**
 * Moment.js locale configuration options for Latvian
 */
interface LatvianLocaleConfig {
  /** Full month names in Latvian */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names in Latvian */
  weekdays: string[];
  /** Short weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to parse weekday names exactly */
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
  /** Calendar relative time strings */
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  /** Relative time configuration */
  relativeTime: {
    future: string;
    past: string;
    s: (value: number, withoutSuffix: boolean) => string;
    ss: (value: number, withoutSuffix: boolean, key: string) => string;
    m: (value: number, withoutSuffix: boolean, key: string) => string;
    mm: (value: number, withoutSuffix: boolean, key: string) => string;
    h: (value: number, withoutSuffix: boolean, key: string) => string;
    hh: (value: number, withoutSuffix: boolean, key: string) => string;
    d: (value: number, withoutSuffix: boolean, key: string) => string;
    dd: (value: number, withoutSuffix: boolean, key: string) => string;
    M: (value: number, withoutSuffix: boolean, key: string) => string;
    MM: (value: number, withoutSuffix: boolean, key: string) => string;
    y: (value: number, withoutSuffix: boolean, key: string) => string;
    yy: (value: number, withoutSuffix: boolean, key: string) => string;
  };
  /** Pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: string | ((value: number) => string);
  /** Week configuration */
  week: {
    /** First day of week (1 = Monday) */
    dow: number;
    /** First week of year containing this day of year */
    doy: number;
  };
}

/**
 * Selects the correct grammatical form based on Latvian language rules
 * @param forms - Array of word forms [genitive_plural, dative_plural, nominative_singular, nominative_plural]
 * @param value - The numeric value
 * @param withoutSuffix - Whether to use the form without suffix/preposition
 * @returns The correct grammatical form
 */
declare function selectForm(forms: string[], value: number, withoutSuffix: boolean): string;

/**
 * Formats relative time with the numeric value
 * @param value - The numeric value
 * @param withoutSuffix - Whether to format without suffix
 * @param key - The unit key (ss, mm, hh, dd, MM, yy)
 * @returns Formatted relative time string
 */
declare function relativeTimeWithNumber(value: number, withoutSuffix: boolean, key: keyof RelativeTimeUnits): string;

/**
 * Formats relative time without the numeric value
 * @param value - The numeric value
 * @param withoutSuffix - Whether to format without suffix
 * @param key - The unit key (m, h, d, M, y)
 * @returns Formatted relative time string
 */
declare function relativeTimeWithoutNumber(value: number, withoutSuffix: boolean, key: keyof RelativeTimeUnits): string;

/**
 * Defines the Latvian locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export default function defineLatvianLocale(moment: unknown): unknown;