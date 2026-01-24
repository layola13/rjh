import { Moment, LocaleSpecification } from 'moment';

/**
 * Moment.js locale configuration for Spanish (United States)
 * Configures date/time formatting, calendar strings, and relative time expressions
 * for the es-us locale.
 */

/**
 * Abbreviated month names with periods (used in certain formatting contexts)
 */
declare const MONTHS_SHORT_WITH_PERIODS: readonly [
  'ene._', 'feb._', 'mar._', 'abr._', 'may._', 'jun._',
  'jul._', 'ago._', 'sep._', 'oct._', 'nov._', 'dic._'
];

/**
 * Abbreviated month names without periods (used in MMM format)
 */
declare const MONTHS_SHORT_WITHOUT_PERIODS: readonly [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
];

/**
 * Regular expressions for parsing individual months
 * Each pattern matches the corresponding month name or abbreviation (case-insensitive)
 */
declare const MONTHS_PARSE_PATTERNS: readonly [
  RegExp, // enero/ene
  RegExp, // febrero/feb
  RegExp, // marzo/mar
  RegExp, // abril/abr
  RegExp, // mayo/may
  RegExp, // junio/jun
  RegExp, // julio/jul
  RegExp, // agosto/ago
  RegExp, // septiembre/sep
  RegExp, // octubre/oct
  RegExp, // noviembre/nov
  RegExp  // diciembre/dic
];

/**
 * Combined regex pattern for matching any month name (full or abbreviated)
 * Case-insensitive and includes optional period for abbreviations
 */
declare const MONTHS_REGEX: RegExp;

/**
 * Locale configuration object for es-us (Spanish - United States)
 */
declare const esUsLocale: LocaleSpecification & {
  /**
   * Full month names in Spanish
   */
  months: readonly [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  /**
   * Returns appropriate month abbreviation based on format context
   * @param momentInstance - The moment instance to get month for
   * @param format - The format string being used
   * @returns Month abbreviation (with or without period depending on format)
   */
  monthsShort: (momentInstance: Moment, format: string) => string | readonly string[];

  /**
   * Flexible regex for matching month names (full or abbreviated)
   */
  monthsRegex: RegExp;

  /**
   * Flexible regex for matching abbreviated month names
   */
  monthsShortRegex: RegExp;

  /**
   * Strict regex for matching only full month names
   */
  monthsStrictRegex: RegExp;

  /**
   * Strict regex for matching only abbreviated month names
   */
  monthsShortStrictRegex: RegExp;

  /**
   * Array of patterns for parsing month names
   */
  monthsParse: readonly RegExp[];

  /**
   * Array of patterns for parsing full month names
   */
  longMonthsParse: readonly RegExp[];

  /**
   * Array of patterns for parsing abbreviated month names
   */
  shortMonthsParse: readonly RegExp[];

  /**
   * Full weekday names in Spanish
   */
  weekdays: readonly ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  /**
   * Abbreviated weekday names with periods
   */
  weekdaysShort: readonly ['dom._', 'lun._', 'mar._', 'mié._', 'jue._', 'vie._', 'sáb._'];

  /**
   * Minimal weekday abbreviations (2 letters)
   */
  weekdaysMin: readonly ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá'];

  /**
   * Whether to use exact parsing for weekday names
   */
  weekdaysParseExact: true;

  /**
   * Date and time format tokens
   */
  longDateFormat: {
    /** Time format (12-hour with AM/PM) */
    LT: 'h:mm A';
    /** Time format with seconds */
    LTS: 'h:mm:ss A';
    /** Short date format (MM/DD/YYYY) */
    L: 'MM/DD/YYYY';
    /** Long date format */
    LL: 'D [de] MMMM [de] YYYY';
    /** Long date with time */
    LLL: 'D [de] MMMM [de] YYYY h:mm A';
    /** Full date and time with weekday */
    LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A';
  };

  /**
   * Calendar strings for relative dates
   * Each function uses plural "las" if hour is not 1, singular "la" otherwise
   */
  calendar: {
    /**
     * Format for displaying today's date
     * @returns Format string with "la" or "las" based on hour
     */
    sameDay: (this: Moment) => string;

    /**
     * Format for displaying tomorrow's date
     * @returns Format string with "la" or "las" based on hour
     */
    nextDay: (this: Moment) => string;

    /**
     * Format for displaying dates in the next week
     * @returns Format string with "la" or "las" based on hour
     */
    nextWeek: (this: Moment) => string;

    /**
     * Format for displaying yesterday's date
     * @returns Format string with "la" or "las" based on hour
     */
    lastDay: (this: Moment) => string;

    /**
     * Format for displaying dates in the last week
     * @returns Format string with "la" or "las" based on hour
     */
    lastWeek: (this: Moment) => string;

    /**
     * Fallback format for other dates
     */
    sameElse: 'L';
  };

  /**
   * Relative time expressions (e.g., "hace 3 días", "en 2 horas")
   */
  relativeTime: {
    /** Future time prefix */
    future: 'en %s';
    /** Past time prefix */
    past: 'hace %s';
    /** A few seconds */
    s: 'unos segundos';
    /** N seconds */
    ss: '%d segundos';
    /** One minute */
    m: 'un minuto';
    /** N minutes */
    mm: '%d minutos';
    /** One hour */
    h: 'una hora';
    /** N hours */
    hh: '%d horas';
    /** One day */
    d: 'un día';
    /** N days */
    dd: '%d días';
    /** One week */
    w: 'una semana';
    /** N weeks */
    ww: '%d semanas';
    /** One month */
    M: 'un mes';
    /** N months */
    MM: '%d meses';
    /** One year */
    y: 'un año';
    /** N years */
    yy: '%d años';
  };

  /**
   * Regex for parsing ordinal day of month (e.g., "1º", "15º")
   */
  dayOfMonthOrdinalParse: RegExp;

  /**
   * Format string for ordinal dates
   */
  ordinal: '%dº';

  /**
   * Week configuration
   */
  week: {
    /** Day of week (0 = Sunday) */
    dow: 0;
    /** Day of year for first week */
    doy: 6;
  };
};

/**
 * Defines and registers the es-us locale with moment.js
 * @param moment - The moment.js instance to configure
 */
declare function defineEsUsLocale(moment: typeof import('moment')): void;

export { esUsLocale, defineEsUsLocale };
export type { LocaleSpecification };