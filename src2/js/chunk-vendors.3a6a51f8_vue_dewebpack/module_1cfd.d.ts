/**
 * Moment.js locale configuration for Arabic (Libya) - ar-ly
 * 
 * This module configures moment.js to support Libyan Arabic locale,
 * including number formatting, date/time formats, and relative time expressions.
 * 
 * @module moment-locale-ar-ly
 */

/**
 * Mapping of Western Arabic numerals to their string representations
 */
export const ARABIC_NUMERAL_MAP: Record<string, string> = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0"
};

/**
 * Determines the plural form index for Arabic numbers based on Arabic plural rules
 * 
 * Arabic has 6 plural forms:
 * - 0: zero
 * - 1: one
 * - 2: two
 * - 3: few (3-10)
 * - 4: many (11-99)
 * - 5: other (100+)
 * 
 * @param num - The number to evaluate
 * @returns The plural form index (0-5)
 */
export function getPluralFormIndex(num: number): number {
  if (num === 0) return 0;
  if (num === 1) return 1;
  if (num === 2) return 2;
  if (num % 100 >= 3 && num % 100 <= 10) return 3;
  if (num % 100 >= 11) return 4;
  return 5;
}

/**
 * Relative time units with their Arabic translations for all plural forms
 */
export interface RelativeTimeUnit {
  /** Seconds translations */
  s: [string, string, [string, string], string, string, string];
  /** Minutes translations */
  m: [string, string, [string, string], string, string, string];
  /** Hours translations */
  h: [string, string, [string, string], string, string, string];
  /** Days translations */
  d: [string, string, [string, string], string, string, string];
  /** Months translations */
  M: [string, string, [string, string], string, string, string];
  /** Years translations */
  y: [string, string, [string, string], string, string, string];
}

/**
 * Arabic relative time expressions for different units and plural forms
 */
export const RELATIVE_TIME_UNITS: RelativeTimeUnit = {
  s: [
    "أقل من ثانية",      // less than a second
    "ثانية واحدة",        // one second
    ["ثانيتان", "ثانيتين"], // two seconds (nominative/accusative)
    "%d ثوان",            // few seconds (3-10)
    "%d ثانية",           // many seconds (11-99)
    "%d ثانية"            // other seconds (100+)
  ],
  m: [
    "أقل من دقيقة",       // less than a minute
    "دقيقة واحدة",        // one minute
    ["دقيقتان", "دقيقتين"], // two minutes
    "%d دقائق",           // few minutes
    "%d دقيقة",           // many minutes
    "%d دقيقة"            // other minutes
  ],
  h: [
    "أقل من ساعة",        // less than an hour
    "ساعة واحدة",         // one hour
    ["ساعتان", "ساعتين"],  // two hours
    "%d ساعات",           // few hours
    "%d ساعة",            // many hours
    "%d ساعة"             // other hours
  ],
  d: [
    "أقل من يوم",         // less than a day
    "يوم واحد",           // one day
    ["يومان", "يومين"],    // two days
    "%d أيام",            // few days
    "%d يومًا",           // many days
    "%d يوم"              // other days
  ],
  M: [
    "أقل من شهر",         // less than a month
    "شهر واحد",           // one month
    ["شهران", "شهرين"],    // two months
    "%d أشهر",            // few months
    "%d شهرا",            // many months
    "%d شهر"              // other months
  ],
  y: [
    "أقل من عام",         // less than a year
    "عام واحد",           // one year
    ["عامان", "عامين"],    // two years
    "%d أعوام",           // few years
    "%d عامًا",           // many years
    "%d عام"              // other years
  ]
};

/**
 * Creates a relative time formatter function for a specific unit
 * 
 * @param unit - The time unit key (s, m, h, d, M, y)
 * @returns A formatter function that takes the number and context
 */
export function createRelativeTimeFormatter(
  unit: keyof RelativeTimeUnit
): (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string {
  return (num: number, withoutSuffix: boolean, key: string, isFuture: boolean): string => {
    const pluralFormIndex = getPluralFormIndex(num);
    let translation = RELATIVE_TIME_UNITS[unit][pluralFormIndex];
    
    // For dual form (2), select between nominative and accusative
    if (pluralFormIndex === 2) {
      translation = (translation as [string, string])[withoutSuffix ? 0 : 1];
    }
    
    return (translation as string).replace(/%d/i, String(num));
  };
}

/**
 * Arabic month names (full form)
 */
export const ARABIC_MONTHS: readonly string[] = [
  "يناير",    // January
  "فبراير",   // February
  "مارس",     // March
  "أبريل",    // April
  "مايو",     // May
  "يونيو",    // June
  "يوليو",    // July
  "أغسطس",    // August
  "سبتمبر",   // September
  "أكتوبر",   // October
  "نوفمبر",   // November
  "ديسمبر"    // December
];

/**
 * Configuration object for moment.js Libyan Arabic locale
 */
export interface MomentLocaleConfig {
  /** Full month names */
  months: readonly string[];
  /** Short month names (same as full for this locale) */
  monthsShort: readonly string[];
  /** Full weekday names */
  weekdays: readonly string[];
  /** Short weekday names */
  weekdaysShort: readonly string[];
  /** Minimal weekday names */
  weekdaysMin: readonly string[];
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
  /** Regex to parse AM/PM indicators */
  meridiemParse: RegExp;
  /** Function to determine if time is PM */
  isPM: (input: string) => boolean;
  /** Function to get meridiem string */
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  /** Calendar format strings */
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
    s: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    ss: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    m: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    mm: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    h: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    hh: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    d: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    dd: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    M: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    MM: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    y: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    yy: (num: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
  };
  /** Function to preprocess input strings */
  preparse: (input: string) => string;
  /** Function to format output strings */
  postformat: (input: string) => string;
  /** Week configuration */
  week: {
    /** First day of week (0=Sunday, 6=Saturday) */
    dow: number;
    /** Day of year for first week */
    doy: number;
  };
}

/**
 * Preprocesses input strings by normalizing Arabic comma
 * 
 * @param input - The string to preprocess
 * @returns The normalized string
 */
export function preparse(input: string): string {
  return input.replace(/،/g, ", ");
}

/**
 * Formats output strings by converting digits to Arabic numerals
 * and replacing commas with Arabic comma
 * 
 * @param input - The string to format
 * @returns The formatted string
 */
export function postformat(input: string): string {
  return input
    .replace(/\d/g, (match: string): string => ARABIC_NUMERAL_MAP[match])
    .replace(/, /g, "،");
}

/**
 * Determines if the given meridiem string represents PM
 * 
 * @param input - The meridiem string ("ص" for AM, "م" for PM)
 * @returns true if PM, false if AM
 */
export function isPM(input: string): boolean {
  return input === "م";
}

/**
 * Returns the appropriate meridiem string for the given time
 * 
 * @param hour - The hour (0-23)
 * @param minute - The minute (0-59)
 * @param isLower - Whether to return lowercase (not used in Arabic)
 * @returns "ص" for AM (before noon) or "م" for PM (after noon)
 */
export function meridiem(hour: number, minute: number, isLower: boolean): string {
  return hour < 12 ? "ص" : "م";
}

/**
 * The complete locale configuration for ar-ly
 */
export const localeConfig: MomentLocaleConfig;

/**
 * Registers the ar-ly locale with moment.js
 * 
 * @param moment - The moment.js instance
 */
export default function defineLocale(moment: unknown): void;