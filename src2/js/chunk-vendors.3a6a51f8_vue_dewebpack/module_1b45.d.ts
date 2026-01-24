/**
 * Moment.js locale configuration for Maltese (mt)
 * 
 * This module provides localization settings for the Maltese language,
 * including month names, weekday names, date formats, and relative time expressions.
 */

import { Moment } from 'moment';

/**
 * Locale configuration object for Maltese
 */
interface MaltesLocaleConfig {
  /** Full month names in Maltese */
  months: string[];
  
  /** Abbreviated month names in Maltese */
  monthsShort: string[];
  
  /** Full weekday names in Maltese */
  weekdays: string[];
  
  /** Abbreviated weekday names in Maltese */
  weekdaysShort: string[];
  
  /** Minimal weekday names in Maltese */
  weekdaysMin: string[];
  
  /** Long date format tokens */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: string;
    /** Time format with seconds */
    LTS: string;
    /** Short date format */
    L: string;
    /** Long date format */
    LL: string;
    /** Long date and time format */
    LLL: string;
    /** Full date and time format with weekday */
    LLLL: string;
  };
  
  /** Calendar format strings for relative dates */
  calendar: {
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
  };
  
  /** Relative time format strings */
  relativeTime: {
    /** Future time prefix/format */
    future: string;
    /** Past time format */
    past: string;
    /** Seconds (few) */
    s: string;
    /** Seconds (multiple) */
    ss: string;
    /** Minute (singular) */
    m: string;
    /** Minutes (multiple) */
    mm: string;
    /** Hour (singular) */
    h: string;
    /** Hours (multiple) */
    hh: string;
    /** Day (singular) */
    d: string;
    /** Days (multiple) */
    dd: string;
    /** Month (singular) */
    M: string;
    /** Months (multiple) */
    MM: string;
    /** Year (singular) */
    y: string;
    /** Years (multiple) */
    yy: string;
  };
  
  /** Regular expression to parse ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /** Function or format string for ordinal numbers */
  ordinal: string;
  
  /** Week configuration */
  week: {
    /** Day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** Day of year to start counting weeks */
    doy: number;
  };
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Define a new locale configuration
   * @param localeName - The locale identifier
   * @param config - The locale configuration object
   */
  defineLocale(localeName: string, config: MaltesLocaleConfig): void;
}

/**
 * Initializes the Maltese locale configuration for Moment.js
 * @param moment - The Moment.js instance
 */
export function initializeMalteseLocale(moment: MomentStatic): void {
  moment.defineLocale('mt', {
    months: 'Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru'.split('_'),
    monthsShort: 'Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ'.split('_'),
    weekdays: 'Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt'.split('_'),
    weekdaysShort: 'Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib'.split('_'),
    weekdaysMin: 'Ħa_Tn_Tl_Er_Ħa_Ġi_Si'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Illum fil-]LT',
      nextDay: '[Għada fil-]LT',
      nextWeek: 'dddd [fil-]LT',
      lastDay: '[Il-bieraħ fil-]LT',
      lastWeek: 'dddd [li għadda] [fil-]LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'f\' %s',
      past: '%s ilu',
      s: 'ftit sekondi',
      ss: '%d sekondi',
      m: 'minuta',
      mm: '%d minuti',
      h: 'siegħa',
      hh: '%d siegħat',
      d: 'ġurnata',
      dd: '%d ġranet',
      M: 'xahar',
      MM: '%d xhur',
      y: 'sena',
      yy: '%d sni'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export default initializeMalteseLocale;