/**
 * Moment.js Korean (ko) Locale Configuration
 * Provides Korean language support for moment.js date/time library
 */

import { Locale, MomentInput } from 'moment';

/**
 * Locale configuration object for Korean language
 */
export interface KoreanLocaleConfig {
  /** Full month names in Korean (1월 through 12월) */
  months: string[];
  
  /** Abbreviated month names in Korean (same as full names) */
  monthsShort: string[];
  
  /** Full weekday names in Korean (일요일 through 토요일) */
  weekdays: string[];
  
  /** Abbreviated weekday names in Korean (일 through 토) */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Korean (일 through 토) */
  weekdaysMin: string[];
  
  /** Long date format templates */
  longDateFormat: LongDateFormatConfig;
  
  /** Calendar display strings for relative dates */
  calendar: CalendarConfig;
  
  /** Relative time display strings */
  relativeTime: RelativeTimeConfig;
  
  /** Regular expression pattern for parsing ordinal day/month/week */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers based on context */
  ordinal: (num: number, token: string) => string;
  
  /** Regular expression pattern for parsing meridiem (AM/PM) */
  meridiemParse: RegExp;
  
  /** Determine if given string represents PM */
  isPM: (input: string) => boolean;
  
  /** Get meridiem string for given hour and minute */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
}

/**
 * Long date format configuration with various format tokens
 */
export interface LongDateFormatConfig {
  /** Time format with meridiem (e.g., "오전 9:30") */
  LT: string;
  
  /** Time format with seconds (e.g., "오전 9:30:45") */
  LTS: string;
  
  /** Short date format (e.g., "2024.03.15.") */
  L: string;
  
  /** Long date format (e.g., "2024년 3월 15일") */
  LL: string;
  
  /** Long date with time (e.g., "2024년 3월 15일 오전 9:30") */
  LLL: string;
  
  /** Long date with weekday and time (e.g., "2024년 3월 15일 금요일 오전 9:30") */
  LLLL: string;
  
  /** Short date format lowercase (same as L) */
  l: string;
  
  /** Long date format lowercase (same as LL) */
  ll: string;
  
  /** Long date with time lowercase (same as LLL) */
  lll: string;
  
  /** Long date with weekday and time lowercase (same as LLLL) */
  llll: string;
}

/**
 * Calendar configuration for relative date displays
 */
export interface CalendarConfig {
  /** Format for today (e.g., "오늘 오전 9:30") */
  sameDay: string;
  
  /** Format for tomorrow (e.g., "내일 오전 9:30") */
  nextDay: string;
  
  /** Format for next week (e.g., "금요일 오전 9:30") */
  nextWeek: string;
  
  /** Format for yesterday (e.g., "어제 오전 9:30") */
  lastDay: string;
  
  /** Format for last week (e.g., "지난주 금요일 오전 9:30") */
  lastWeek: string;
  
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration for duration displays
 */
export interface RelativeTimeConfig {
  /** Future time format template (e.g., "5분 후") */
  future: string;
  
  /** Past time format template (e.g., "5분 전") */
  past: string;
  
  /** Few seconds */
  s: string;
  
  /** Seconds (with count) */
  ss: string;
  
  /** One minute */
  m: string;
  
  /** Minutes (with count) */
  mm: string;
  
  /** One hour */
  h: string;
  
  /** Hours (with count) */
  hh: string;
  
  /** One day */
  d: string;
  
  /** Days (with count) */
  dd: string;
  
  /** One month */
  M: string;
  
  /** Months (with count) */
  MM: string;
  
  /** One year */
  y: string;
  
  /** Years (with count) */
  yy: string;
}

/**
 * Defines the Korean locale for moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured Korean locale object
 */
export declare function defineKoreanLocale(momentInstance: typeof import('moment')): Locale;

export default defineKoreanLocale;