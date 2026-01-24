/**
 * Moment.js locale configuration for English (Canada)
 * Provides Canadian English localization including date formats, calendar labels, and relative time expressions.
 */

import type { Moment, Locale, LocaleSpecification } from 'moment';

/**
 * Configuration object for long date format patterns
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "3:45 PM") */
  LT: string;
  /** Time format with seconds (e.g., "3:45:30 PM") */
  LTS: string;
  /** Short date format (e.g., "2023-12-25") */
  L: string;
  /** Long date format (e.g., "December 25, 2023") */
  LL: string;
  /** Long date and time format (e.g., "December 25, 2023 3:45 PM") */
  LLL: string;
  /** Full date and time format with weekday (e.g., "Monday, December 25, 2023 3:45 PM") */
  LLLL: string;
}

/**
 * Configuration object for calendar display strings
 */
interface CalendarSpec {
  /** Format for dates occurring today */
  sameDay: string;
  /** Format for dates occurring tomorrow */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates occurring yesterday */
  lastDay: string;
  /** Format for dates in the last week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Configuration object for relative time expressions
 */
interface RelativeTimeSpec {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Singular second label */
  s: string;
  /** Plural seconds format */
  ss: string;
  /** Singular minute label */
  m: string;
  /** Plural minutes format */
  mm: string;
  /** Singular hour label */
  h: string;
  /** Plural hours format */
  hh: string;
  /** Singular day label */
  d: string;
  /** Plural days format */
  dd: string;
  /** Singular month label */
  M: string;
  /** Plural months format */
  MM: string;
  /** Singular year label */
  y: string;
  /** Plural years format */
  yy: string;
}

/**
 * English (Canada) locale configuration specification
 */
export interface EnglishCanadaLocaleConfig extends LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday abbreviations */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display format patterns */
  calendar: CalendarSpec;
  /** Relative time format patterns */
  relativeTime: RelativeTimeSpec;
  /** RegExp pattern for parsing day-of-month ordinals (e.g., 1st, 2nd, 3rd) */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to generate ordinal suffix for a given day number */
  ordinal: (dayOfMonth: number) => string;
}

/**
 * Defines the English (Canada) locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured locale object
 */
export function defineEnglishCanadaLocale(momentInstance: Moment): Locale {
  return momentInstance.defineLocale('en-ca', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'YYYY-MM-DD',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A'
    },
    
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    
    /**
     * Returns the ordinal suffix for a day of the month
     * @param dayOfMonth - The day number (1-31)
     * @returns The day with appropriate ordinal suffix (e.g., "1st", "2nd", "3rd", "21st")
     */
    ordinal(dayOfMonth: number): string {
      const lastDigit = dayOfMonth % 10;
      const lastTwoDigits = dayOfMonth % 100;
      const isTeens = Math.floor(lastTwoDigits / 10) === 1;
      
      let suffix: string;
      if (isTeens) {
        suffix = 'th';
      } else if (lastDigit === 1) {
        suffix = 'st';
      } else if (lastDigit === 2) {
        suffix = 'nd';
      } else if (lastDigit === 3) {
        suffix = 'rd';
      } else {
        suffix = 'th';
      }
      
      return `${dayOfMonth}${suffix}`;
    }
  });
}

export default defineEnglishCanadaLocale;