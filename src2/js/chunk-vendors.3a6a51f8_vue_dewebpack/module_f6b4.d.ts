/**
 * Moment.js locale configuration for Scottish Gaelic (gd)
 * @module moment/locale/gd
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Day of week numbering configuration
 */
interface WeekConfiguration {
  /** Day of week (1 = Monday) */
  dow: number;
  /** Day of year that defines the first week of the year */
  doy: number;
}

/**
 * Calendar display formats for relative time periods
 */
interface CalendarConfiguration {
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
  /** Format for all other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfiguration {
  /** Future time prefix */
  future: string;
  /** Past time prefix */
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
 * Date and time display formats
 */
interface LongDateFormatConfiguration {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date and time with day name */
  LLLL: string;
}

/**
 * Complete Scottish Gaelic locale configuration for Moment.js
 */
interface ScottishGaelicLocaleConfiguration extends LocaleSpecification {
  /** Full month names */
  months: readonly [
    'Am Faoilleach',
    'An Gearran',
    'Am Màrt',
    'An Giblean',
    'An Cèitean',
    'An t-Ògmhios',
    'An t-Iuchar',
    'An Lùnastal',
    'An t-Sultain',
    'An Dàmhair',
    'An t-Samhain',
    'An Dùbhlachd'
  ];
  /** Abbreviated month names */
  monthsShort: readonly [
    'Faoi',
    'Gear',
    'Màrt',
    'Gibl',
    'Cèit',
    'Ògmh',
    'Iuch',
    'Lùn',
    'Sult',
    'Dàmh',
    'Samh',
    'Dùbh'
  ];
  /** Use exact month parsing */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: readonly [
    'Didòmhnaich',
    'Diluain',
    'Dimàirt',
    'Diciadain',
    'Diardaoin',
    'Dihaoine',
    'Disathairne'
  ];
  /** Abbreviated weekday names */
  weekdaysShort: readonly ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];
  /** Minimal weekday names */
  weekdaysMin: readonly ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];
  /** Long date and time format strings */
  longDateFormat: LongDateFormatConfiguration;
  /** Calendar display formats */
  calendar: CalendarConfiguration;
  /** Relative time format strings */
  relativeTime: RelativeTimeConfiguration;
  /** Pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Function to format ordinal numbers */
  ordinal: (dayOfMonth: number) => string;
  /** Week numbering configuration */
  week: WeekConfiguration;
}

/**
 * Defines the Scottish Gaelic locale for Moment.js
 * @param moment - The Moment.js instance
 * @returns The configured locale
 */
export function defineScottishGaelicLocale(moment: typeof Locale): Locale;

/**
 * Scottish Gaelic (gd) locale configuration object
 */
export const scottishGaelicLocale: ScottishGaelicLocaleConfiguration;