/**
 * Moment.js Arabic (ar) locale configuration
 * Provides localization for date/time formatting in Arabic
 */

/**
 * Mapping of Western Arabic numerals to Eastern Arabic-Indic numerals
 */
export const WESTERN_TO_EASTERN_NUMERALS: Record<string, string> = {
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
  '0': '٠'
};

/**
 * Mapping of Eastern Arabic-Indic numerals to Western Arabic numerals
 */
export const EASTERN_TO_WESTERN_NUMERALS: Record<string, string> = {
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٠': '0'
};

/**
 * Arabic plural forms indexed by grammatical number category
 * 0: less than one, 1: singular, 2: dual, 3: paucal (3-10), 4: plural (11-99), 5: many (100+)
 */
export interface ArabicPluralForms {
  s: [string, string, [string, string], string, string, string]; // seconds
  m: [string, string, [string, string], string, string, string]; // minutes
  h: [string, string, [string, string], string, string, string]; // hours
  d: [string, string, [string, string], string, string, string]; // days
  M: [string, string, [string, string], string, string, string]; // months
  y: [string, string, [string, string], string, string, string]; // years
}

/**
 * Determines the Arabic plural category based on number
 * @param num - The number to categorize
 * @returns Index (0-5) representing the plural form category
 */
export function getPluralFormIndex(num: number): number {
  if (num === 0) return 0;
  if (num === 1) return 1;
  if (num === 2) return 2;
  
  const mod100 = num % 100;
  if (mod100 >= 3 && mod100 <= 10) return 3;
  if (mod100 >= 11) return 4;
  
  return 5;
}

/**
 * Moment.js locale configuration object
 */
export interface MomentLocaleConfig {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: RelativeTimeFormatter;
    ss: RelativeTimeFormatter;
    m: RelativeTimeFormatter;
    mm: RelativeTimeFormatter;
    h: RelativeTimeFormatter;
    hh: RelativeTimeFormatter;
    d: RelativeTimeFormatter;
    dd: RelativeTimeFormatter;
    M: RelativeTimeFormatter;
    MM: RelativeTimeFormatter;
    y: RelativeTimeFormatter;
    yy: RelativeTimeFormatter;
  };
  preparse: (input: string) => string;
  postformat: (input: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Type definition for relative time formatting function
 */
export type RelativeTimeFormatter = (
  number: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

/**
 * Creates a relative time formatter for a specific unit
 * @param unit - The time unit key (s, m, h, d, M, y)
 * @returns Formatter function that generates Arabic relative time strings
 */
export function createRelativeTimeFormatter(unit: keyof ArabicPluralForms): RelativeTimeFormatter {
  const pluralForms: ArabicPluralForms = {
    s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
  };

  return (num: number, withoutSuffix: boolean, key: string, isFuture: boolean): string => {
    const formIndex = getPluralFormIndex(num);
    let template = pluralForms[unit][formIndex];

    // Handle dual form (nominative vs. accusative/genitive)
    if (formIndex === 2 && Array.isArray(template)) {
      template = template[withoutSuffix ? 0 : 1];
    }

    return (template as string).replace(/%d/i, String(num));
  };
}

/**
 * Arabic month names
 */
export const ARABIC_MONTHS: readonly string[] = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

/**
 * Converts Eastern Arabic-Indic numerals and Arabic comma to Western format
 * @param input - String containing Eastern numerals
 * @returns String with Western numerals
 */
export function preparse(input: string): string {
  return input
    .replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match) => EASTERN_TO_WESTERN_NUMERALS[match] ?? match)
    .replace(/،/g, ', ');
}

/**
 * Converts Western Arabic numerals and comma to Eastern Arabic-Indic format
 * @param input - String containing Western numerals
 * @returns String with Eastern Arabic-Indic numerals
 */
export function postformat(input: string): string {
  return input
    .replace(/\d/g, (match) => WESTERN_TO_EASTERN_NUMERALS[match] ?? match)
    .replace(/, /g, '،');
}

/**
 * Determines if the time is PM (afternoon/evening)
 * @param input - Meridiem indicator string
 * @returns True if PM, false if AM
 */
export function isPM(input: string): boolean {
  return input === 'م';
}

/**
 * Returns the appropriate meridiem indicator for a given time
 * @param hour - Hour of the day (0-23)
 * @param minute - Minute of the hour
 * @param isLowercase - Whether to return lowercase (not used in Arabic)
 * @returns 'ص' for AM, 'م' for PM
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): string {
  return hour < 12 ? 'ص' : 'م';
}

/**
 * Complete Arabic locale configuration for Moment.js
 */
export const ARABIC_LOCALE_CONFIG: MomentLocaleConfig = {
  months: [...ARABIC_MONTHS],
  monthsShort: [...ARABIC_MONTHS],
  weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  weekdaysShort: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  weekdaysMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/‏M/‏YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  meridiemParse: /ص|م/,
  isPM,
  meridiem,
  calendar: {
    sameDay: '[اليوم عند الساعة] LT',
    nextDay: '[غدًا عند الساعة] LT',
    nextWeek: 'dddd [عند الساعة] LT',
    lastDay: '[أمس عند الساعة] LT',
    lastWeek: 'dddd [عند الساعة] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: createRelativeTimeFormatter('s'),
    ss: createRelativeTimeFormatter('s'),
    m: createRelativeTimeFormatter('m'),
    mm: createRelativeTimeFormatter('m'),
    h: createRelativeTimeFormatter('h'),
    hh: createRelativeTimeFormatter('h'),
    d: createRelativeTimeFormatter('d'),
    dd: createRelativeTimeFormatter('d'),
    M: createRelativeTimeFormatter('M'),
    MM: createRelativeTimeFormatter('M'),
    y: createRelativeTimeFormatter('y'),
    yy: createRelativeTimeFormatter('y')
  },
  preparse,
  postformat,
  week: {
    dow: 6, // Saturday is the first day of the week
    doy: 12 // The week that contains Jan 12th is the first week of the year
  }
};

/**
 * Registers the Arabic locale with Moment.js
 * @param moment - Moment.js instance
 * @returns The registered locale
 */
export function defineArabicLocale(moment: any): any {
  return moment.defineLocale('ar', ARABIC_LOCALE_CONFIG);
}

export default defineArabicLocale;