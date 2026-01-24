/**
 * Moment.js locale configuration for Uzbek (uz)
 * Defines localization settings including month names, weekday names, date formats, and relative time expressions
 */

import { Moment } from 'moment';

/**
 * Locale-specific configuration interface for moment.js
 */
interface LocaleSpecification {
  /** Full month names in Uzbek (Cyrillic script) */
  months: string[];
  
  /** Abbreviated month names in Uzbek */
  monthsShort: string[];
  
  /** Full weekday names in Uzbek */
  weekdays: string[];
  
  /** Short weekday names in Uzbek */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Uzbek (2-character abbreviations) */
  weekdaysMin: string[];
  
  /** Long date format tokens and their corresponding formats */
  longDateFormat: LongDateFormat;
  
  /** Calendar-specific display formats for relative dates */
  calendar: CalendarSpec;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Date and time format definitions
 */
interface LongDateFormat {
  /** Time format (24-hour) */
  LT: string;
  
  /** Time format with seconds */
  LTS: string;
  
  /** Short date format */
  L: string;
  
  /** Long date format */
  LL: string;
  
  /** Long date format with time */
  LLL: string;
  
  /** Full date format with weekday and time */
  LLLL: string;
}

/**
 * Calendar display format specifications
 */
interface CalendarSpec {
  /** Format for today's date */
  sameDay: string;
  
  /** Format for tomorrow's date */
  nextDay: string;
  
  /** Format for next week's dates */
  nextWeek: string;
  
  /** Format for yesterday's date */
  lastDay: string;
  
  /** Format for last week's dates */
  lastWeek: string;
  
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format specifications
 */
interface RelativeTimeSpec {
  /** Future time prefix format */
  future: string;
  
  /** Past time prefix format */
  past: string;
  
  /** Seconds (singular) */
  s: string;
  
  /** Seconds (plural) - %d will be replaced with the number */
  ss: string;
  
  /** Minute (singular) */
  m: string;
  
  /** Minutes (plural) */
  mm: string;
  
  /** Hour (singular) */
  h: string;
  
  /** Hours (plural) */
  hh: string;
  
  /** Day (singular) */
  d: string;
  
  /** Days (plural) */
  dd: string;
  
  /** Month (singular) */
  M: string;
  
  /** Months (plural) */
  MM: string;
  
  /** Year (singular) */
  y: string;
  
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration specification
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  
  /** Day of year that defines the first week of the year */
  doy: number;
}

/**
 * Defines the Uzbek locale configuration for moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export function defineUzbekLocale(moment: Moment): string;

/**
 * Uzbek locale configuration object
 */
export const uzbekLocaleConfig: LocaleSpecification;