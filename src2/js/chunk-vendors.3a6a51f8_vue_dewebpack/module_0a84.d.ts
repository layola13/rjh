/**
 * Moment.js locale configuration for Arabic (Morocco)
 * Locale code: ar-ma
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Calendar display configuration for relative date formatting
 */
interface CalendarSpec {
  /** Format string for dates occurring today */
  sameDay: string;
  /** Format string for dates occurring tomorrow */
  nextDay: string;
  /** Format string for dates in the next week */
  nextWeek: string;
  /** Format string for dates occurring yesterday */
  lastDay: string;
  /** Format string for dates in the last week */
  lastWeek: string;
  /** Default format string for all other dates */
  sameElse: string;
}

/**
 * Relative time configuration for duration formatting
 */
interface RelativeTimeSpec {
  /** Format string for future dates */
  future: string;
  /** Format string for past dates */
  past: string;
  /** Label for seconds (singular) */
  s: string;
  /** Label for seconds (plural) */
  ss: string;
  /** Label for minute (singular) */
  m: string;
  /** Label for minutes (plural) */
  mm: string;
  /** Label for hour (singular) */
  h: string;
  /** Label for hours (plural) */
  hh: string;
  /** Label for day (singular) */
  d: string;
  /** Label for days (plural) */
  dd: string;
  /** Label for month (singular) */
  M: string;
  /** Label for months (plural) */
  MM: string;
  /** Label for year (singular) */
  y: string;
  /** Label for years (plural) */
  yy: string;
}

/**
 * Week configuration specifying first day of week and first week of year
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year that defines the first week */
  doy: number;
}

/**
 * Long date format tokens configuration
 */
interface LongDateFormatSpec {
  /** Time format */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Long date, time, and day of week format */
  LLLL: string;
}

/**
 * Complete Arabic (Morocco) locale specification
 */
interface ArabicMoroccoLocaleSpec extends LocaleSpecification {
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
  longDateFormat: LongDateFormatSpec;
  /** Calendar display formats */
  calendar: CalendarSpec;
  /** Relative time formats */
  relativeTime: RelativeTimeSpec;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Defines the Arabic (Morocco) locale for moment.js
 * 
 * @param moment - The moment.js instance to configure
 * @returns The configured locale instance
 */
export function defineArabicMoroccoLocale(moment: {
  defineLocale(localeName: string, config: ArabicMoroccoLocaleSpec): Locale;
}): Locale {
  return moment.defineLocale('ar-ma', {
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'],
    monthsShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'],
    weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    weekdaysShort: ['احد', 'اثنين', 'ثلاثاء', 'اربعاء', 'خميس', 'جمعة', 'سبت'],
    weekdaysMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      ss: '%d ثانية',
      m: 'دقيقة',
      mm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      M: 'شهر',
      MM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنوات'
    },
    week: {
      dow: 1, // Monday is the first day of the week
      doy: 4  // The week that contains Jan 4th is the first week of the year
    }
  });
}

export type { 
  ArabicMoroccoLocaleSpec,
  CalendarSpec,
  RelativeTimeSpec,
  WeekSpec,
  LongDateFormatSpec
};