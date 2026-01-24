/**
 * Moment.js locale configuration for x-pseudo (pseudo-localization for testing)
 * This locale uses accented characters to help identify hard-coded strings and i18n issues
 */

import { Locale, MomentInput } from 'moment';

/**
 * Configuration object for the x-pseudo locale
 */
interface LocaleConfiguration {
  /** Full month names in pseudo-locale format */
  months: string[];
  
  /** Abbreviated month names in pseudo-locale format */
  monthsShort: string[];
  
  /** Whether to use exact parsing for months */
  monthsParseExact: boolean;
  
  /** Full weekday names in pseudo-locale format */
  weekdays: string[];
  
  /** Abbreviated weekday names in pseudo-locale format */
  weekdaysShort: string[];
  
  /** Minimum weekday names in pseudo-locale format */
  weekdaysMin: string[];
  
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  
  /** Long date format patterns */
  longDateFormat: LongDateFormatSpec;
  
  /** Calendar relative time configuration */
  calendar: CalendarSpec;
  
  /** Relative time configuration */
  relativeTime: RelativeTimeSpec;
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function to format ordinal numbers (1st, 2nd, 3rd, etc.) */
  ordinal: (num: number) => string;
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Long date format specification
 */
interface LongDateFormatSpec {
  /** Time format */
  LT: string;
  
  /** Short date format */
  L: string;
  
  /** Long date format */
  LL: string;
  
  /** Long date with time format */
  LLL: string;
  
  /** Full date with weekday and time format */
  LLLL: string;
}

/**
 * Calendar relative time specification
 */
interface CalendarSpec {
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
 * Relative time specification
 */
interface RelativeTimeSpec {
  /** Future time prefix/suffix pattern */
  future: string;
  
  /** Past time prefix/suffix pattern */
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
 * Week configuration specification
 */
interface WeekSpec {
  /** Day of week (0=Sunday, 1=Monday, etc.) */
  dow: number;
  
  /** Day of year for first week */
  doy: number;
}

/**
 * Moment.js instance with locale methods
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param name - Locale identifier
   * @param config - Locale configuration object
   * @returns The defined locale
   */
  defineLocale(name: string, config: LocaleConfiguration): Locale;
}

/**
 * Define the x-pseudo locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export function definePseudoLocale(moment: MomentStatic): Locale {
  return moment.defineLocale('x-pseudo', {
    months: 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
    
    monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
    
    monthsParseExact: true,
    
    weekdays: 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
    
    weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
    
    weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
    
    weekdaysParseExact: true,
    
    longDateFormat: {
      LT: 'HH:mm',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    
    calendar: {
      sameDay: '[T~ódá~ý át] LT',
      nextDay: '[T~ómó~rró~w át] LT',
      nextWeek: 'dddd [át] LT',
      lastDay: '[Ý~ést~érdá~ý át] LT',
      lastWeek: '[L~ást] dddd [át] LT',
      sameElse: 'L'
    },
    
    relativeTime: {
      future: 'í~ñ %s',
      past: '%s á~gó',
      s: 'á ~féw ~sécó~ñds',
      ss: '%d s~écóñ~ds',
      m: 'á ~míñ~úté',
      mm: '%d m~íñú~tés',
      h: 'á~ñ hó~úr',
      hh: '%d h~óúrs',
      d: 'á ~dáý',
      dd: '%d d~áýs',
      M: 'á ~móñ~th',
      MM: '%d m~óñt~hs',
      y: 'á ~ýéár',
      yy: '%d ý~éárs'
    },
    
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    
    ordinal: (num: number): string => {
      const lastDigit = num % 10;
      const tensDigit = Math.floor((num % 100) / 10);
      
      if (tensDigit === 1) {
        return `${num}th`;
      }
      
      if (lastDigit === 1) {
        return `${num}st`;
      }
      
      if (lastDigit === 2) {
        return `${num}nd`;
      }
      
      if (lastDigit === 3) {
        return `${num}rd`;
      }
      
      return `${num}th`;
    },
    
    week: {
      dow: 1, // Monday is the first day of the week
      doy: 4  // The week that contains Jan 4th is the first week of the year
    }
  });
}

export default definePseudoLocale;