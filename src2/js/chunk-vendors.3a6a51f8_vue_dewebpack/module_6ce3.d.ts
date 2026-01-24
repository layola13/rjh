/**
 * Moment.js locale configuration for Norwegian Bokmål (nb)
 * 
 * This module provides localization settings for the Norwegian Bokmål language,
 * including month names, weekday names, date formats, and relative time expressions.
 * 
 * @module moment/locale/nb
 */

import { Moment } from 'moment';

/**
 * Configuration object for calendar display strings
 */
interface CalendarSpec {
  /** Format for dates that fall on the current day */
  sameDay: string;
  /** Format for dates that fall on the next day */
  nextDay: string;
  /** Format for dates in the next week */
  nextWeek: string;
  /** Format for dates that fell on the previous day */
  lastDay: string;
  /** Format for dates in the previous week */
  lastWeek: string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Configuration object for relative time expressions
 */
interface RelativeTimeSpec {
  /** Template for future dates (e.g., "in 5 minutes") */
  future: string;
  /** Template for past dates (e.g., "5 minutes ago") */
  past: string;
  /** Label for a few seconds */
  s: string;
  /** Template for multiple seconds */
  ss: string;
  /** Label for one minute */
  m: string;
  /** Template for multiple minutes */
  mm: string;
  /** Label for one hour */
  h: string;
  /** Template for multiple hours */
  hh: string;
  /** Label for one day */
  d: string;
  /** Template for multiple days */
  dd: string;
  /** Label for one week */
  w: string;
  /** Template for multiple weeks */
  ww: string;
  /** Label for one month */
  M: string;
  /** Template for multiple months */
  MM: string;
  /** Label for one year */
  y: string;
  /** Template for multiple years */
  yy: string;
}

/**
 * Configuration object for long date formats
 */
interface LongDateFormatSpec {
  /** Time format (e.g., "HH:mm") */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date and time format */
  LLL: string;
  /** Full date and time format with day name */
  LLLL: string;
}

/**
 * Week configuration settings
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  /** Day of year used to calculate the first week */
  doy: number;
}

/**
 * Complete locale configuration for moment.js
 */
interface LocaleSpecification {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format specifications */
  longDateFormat: LongDateFormatSpec;
  /** Calendar display configurations */
  calendar: CalendarSpec;
  /** Relative time expressions */
  relativeTime: RelativeTimeSpec;
  /** Regular expression for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function or template for formatting ordinal numbers */
  ordinal: string | ((num: number) => string);
  /** Week calculation settings */
  week: WeekSpec;
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., "nb" for Norwegian Bokmål)
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: LocaleSpecification): void;
}

/**
 * Norwegian Bokmål (nb) locale configuration
 */
export const nbLocaleConfig: LocaleSpecification = {
  months: [
    'januar', 'februar', 'mars', 'april', 'mai', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'desember'
  ],
  monthsShort: [
    'jan.', 'feb.', 'mars', 'apr.', 'mai', 'juni',
    'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'
  ],
  monthsParseExact: true,
  weekdays: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  weekdaysShort: ['sø.', 'ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.'],
  weekdaysMin: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] HH:mm',
    LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
  },
  calendar: {
    sameDay: '[i dag kl.] LT',
    nextDay: '[i morgen kl.] LT',
    nextWeek: 'dddd [kl.] LT',
    lastDay: '[i går kl.] LT',
    lastWeek: '[forrige] dddd [kl.] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'om %s',
    past: '%s siden',
    s: 'noen sekunder',
    ss: '%d sekunder',
    m: 'ett minutt',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dager',
    w: 'en uke',
    ww: '%d uker',
    M: 'en måned',
    MM: '%d måneder',
    y: 'ett år',
    yy: '%d år'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1, // Monday is the first day of the week
    doy: 4  // The week that contains Jan 4th is the first week of the year
  }
};

/**
 * Initializes the Norwegian Bokmål locale for moment.js
 * @param moment - The moment.js instance to configure
 */
export function initializeNorwegianLocale(moment: MomentStatic): void {
  moment.defineLocale('nb', nbLocaleConfig);
}