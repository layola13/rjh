/**
 * Chuvash (cv) locale configuration for Moment.js
 * @module moment/locale/cv
 */

/**
 * Calendar specification for relative time display
 */
interface CalendarSpec {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for last week */
  lastWeek: string;
  /** Default format for other dates */
  sameElse: string;
}

/**
 * Relative time configuration with string formats or functions
 */
interface RelativeTimeSpec {
  /** Future time prefix/suffix function */
  future: (relativeTime: string) => string;
  /** Past time format string */
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
 * Long date format tokens
 */
interface LongDateFormat {
  /** Time format */
  LT: string;
  /** Time with seconds format */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time format */
  LLL: string;
  /** Full date and time format */
  LLLL: string;
}

/**
 * Week configuration
 */
interface WeekSpec {
  /** Day of week (0 = Sunday, 1 = Monday) */
  dow: number;
  /** Day of year that starts the first week */
  doy: number;
}

/**
 * Locale configuration object
 */
interface LocaleConfiguration {
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
  /** Long date format tokens */
  longDateFormat: LongDateFormat;
  /** Calendar specification for relative dates */
  calendar: CalendarSpec;
  /** Relative time formatting */
  relativeTime: RelativeTimeSpec;
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Ordinal number formatter */
  ordinal: string;
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Moment.js instance with locale definition method
 */
interface MomentStatic {
  /**
   * Define a locale configuration
   * @param localeName - Locale identifier (e.g., "cv" for Chuvash)
   * @param config - Locale configuration object
   */
  defineLocale(localeName: string, config: LocaleConfiguration): void;
}

declare module 'moment/locale/cv' {
  const locale: void;
  export = locale;
}

/**
 * Chuvash locale configuration
 * Provides translations and formatting rules for the Chuvash language
 */
export function defineChuvashLocale(moment: MomentStatic): void {
  moment.defineLocale('cv', {
    /** Full month names in Chuvash */
    months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
    
    /** Abbreviated month names in Chuvash */
    monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
    
    /** Full weekday names in Chuvash */
    weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
    
    /** Abbreviated weekday names in Chuvash */
    weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
    
    /** Minimal weekday names in Chuvash */
    weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
    
    /** Long date format patterns */
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD-MM-YYYY',
      LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
      LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
      LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
    },
    
    /** Calendar display for relative dates */
    calendar: {
      sameDay: '[Паян] LT [сехетре]',
      nextDay: '[Ыран] LT [сехетре]',
      lastDay: '[Ӗнер] LT [сехетре]',
      nextWeek: '[Ҫитес] dddd LT [сехетре]',
      lastWeek: '[Иртнӗ] dddd LT [сехетре]',
      sameElse: 'L'
    },
    
    /** Relative time formatting */
    relativeTime: {
      /**
       * Format future relative time with appropriate suffix
       * @param relativeTime - The relative time string
       * @returns Formatted string with proper suffix
       */
      future: (relativeTime: string): string => {
        const suffix = /сехет$/i.exec(relativeTime) 
          ? 'рен' 
          : /ҫул$/i.exec(relativeTime) 
            ? 'тан' 
            : 'ран';
        return relativeTime + suffix;
      },
      past: '%s каялла',
      s: 'пӗр-ик ҫеккунт',
      ss: '%d ҫеккунт',
      m: 'пӗр минут',
      mm: '%d минут',
      h: 'пӗр сехет',
      hh: '%d сехет',
      d: 'пӗр кун',
      dd: '%d кун',
      M: 'пӗр уйӑх',
      MM: '%d уйӑх',
      y: 'пӗр ҫул',
      yy: '%d ҫул'
    },
    
    /** Pattern for parsing ordinal day numbers (e.g., "5-мӗш") */
    dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
    
    /** Ordinal number format */
    ordinal: '%d-мӗш',
    
    /** Week configuration: Monday is first day, first week contains Jan 7 */
    week: {
      dow: 1,
      doy: 7
    }
  });
}