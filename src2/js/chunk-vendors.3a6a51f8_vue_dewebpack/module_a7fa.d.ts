/**
 * Moment.js locale configuration for Bambara (bm)
 * 
 * This module configures moment.js to support the Bambara language,
 * which is primarily spoken in Mali and surrounding West African countries.
 * 
 * @module locale/bm
 */

import { Locale } from 'moment';

/**
 * Configuration object for long date format patterns
 */
interface LongDateFormatConfig {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds (hours:minutes:seconds) */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date format with time */
  LLL: string;
  /** Full date format with day of week and time */
  LLLL: string;
}

/**
 * Configuration object for calendar date formatting
 */
interface CalendarConfig {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Configuration object for relative time formatting
 */
interface RelativeTimeConfig {
  /** Future time format template */
  future: string;
  /** Past time format template */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
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
 * Configuration object for week settings
 */
interface WeekConfig {
  /** Day of week (0 = Sunday, 1 = Monday, etc.) */
  dow: number;
  /** Day of year for week 1 calculation */
  doy: number;
}

/**
 * Complete locale configuration for Bambara
 */
interface BambaraLocaleConfig {
  /** Full month names in Bambara */
  months: string[];
  /** Abbreviated month names in Bambara */
  monthsShort: string[];
  /** Full weekday names in Bambara */
  weekdays: string[];
  /** Abbreviated weekday names in Bambara */
  weekdaysShort: string[];
  /** Minimal weekday names in Bambara */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormatConfig;
  /** Calendar date formatting rules */
  calendar: CalendarConfig;
  /** Relative time formatting rules */
  relativeTime: RelativeTimeConfig;
  /** Week calculation settings */
  week: WeekConfig;
}

/**
 * Defines the Bambara (bm) locale for moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The configured Bambara locale
 */
export function defineBambaraLocale(moment: typeof import('moment')): Locale {
  return moment.defineLocale('bm', {
    months: [
      'Zanwuyekalo',
      'Fewuruyekalo',
      'Marisikalo',
      'Awirilikalo',
      'Mɛkalo',
      'Zuwɛnkalo',
      'Zuluyekalo',
      'Utikalo',
      'Sɛtanburukalo',
      'ɔkutɔburukalo',
      'Nowanburukalo',
      'Desanburukalo'
    ],
    monthsShort: ['Zan', 'Few', 'Mar', 'Awi', 'Mɛ', 'Zuw', 'Zul', 'Uti', 'Sɛt', 'ɔku', 'Now', 'Des'],
    weekdays: ['Kari', 'Ntɛnɛn', 'Tarata', 'Araba', 'Alamisa', 'Juma', 'Sibiri'],
    weekdaysShort: ['Kar', 'Ntɛ', 'Tar', 'Ara', 'Ala', 'Jum', 'Sib'],
    weekdaysMin: ['Ka', 'Nt', 'Ta', 'Ar', 'Al', 'Ju', 'Si'],
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'MMMM [tile] D [san] YYYY',
      LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
      LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
    },
    calendar: {
      sameDay: '[Bi lɛrɛ] LT',
      nextDay: '[Sini lɛrɛ] LT',
      nextWeek: 'dddd [don lɛrɛ] LT',
      lastDay: '[Kunu lɛrɛ] LT',
      lastWeek: 'dddd [tɛmɛnen lɛrɛ] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s kɔnɔ',
      past: 'a bɛ %s bɔ',
      s: 'sanga dama dama',
      ss: 'sekondi %d',
      m: 'miniti kelen',
      mm: 'miniti %d',
      h: 'lɛrɛ kelen',
      hh: 'lɛrɛ %d',
      d: 'tile kelen',
      dd: 'tile %d',
      M: 'kalo kelen',
      MM: 'kalo %d',
      y: 'san kelen',
      yy: 'san %d'
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export type { BambaraLocaleConfig, LongDateFormatConfig, CalendarConfig, RelativeTimeConfig, WeekConfig };