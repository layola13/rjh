/**
 * Moment.js Catalan (ca) locale configuration
 * 
 * This module provides Catalan language localization for Moment.js, including:
 * - Month and weekday names
 * - Date and time formatting patterns
 * - Relative time expressions
 * - Calendar-specific formatting
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Month format configuration with standalone and contextual forms
 */
interface MonthsConfig {
  /** Month names in standalone form (e.g., "gener", "febrer") */
  standalone: string[];
  /** Month names with prepositions for use in dates (e.g., "de gener", "de febrer") */
  format: string[];
  /** Regex pattern to determine when to use format vs standalone */
  isFormat: RegExp;
}

/**
 * Long date format tokens and their corresponding patterns
 */
interface LongDateFormatConfig {
  /** Time format: "H:mm" */
  LT: string;
  /** Time with seconds format: "H:mm:ss" */
  LTS: string;
  /** Short date format: "DD/MM/YYYY" */
  L: string;
  /** Long date format: "D MMMM [de] YYYY" */
  LL: string;
  /** Short long date: "D MMM YYYY" */
  ll: string;
  /** Long date with time: "D MMMM [de] YYYY [a les] H:mm" */
  LLL: string;
  /** Short long date with time: "D MMM YYYY, H:mm" */
  lll: string;
  /** Full date with weekday and time: "dddd D MMMM [de] YYYY [a les] H:mm" */
  LLLL: string;
  /** Short full date: "ddd D MMM YYYY, H:mm" */
  llll: string;
}

/**
 * Calendar format functions for relative date descriptions
 */
interface CalendarConfig {
  /** Format for dates that fall on the same day */
  sameDay: (this: moment.Moment) => string;
  /** Format for dates that fall on the next day */
  nextDay: (this: moment.Moment) => string;
  /** Format for dates in the next week */
  nextWeek: (this: moment.Moment) => string;
  /** Format for dates that fell yesterday */
  lastDay: (this: moment.Moment) => string;
  /** Format for dates in the last week */
  lastWeek: (this: moment.Moment) => string;
  /** Default format for all other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfig {
  /** Future time prefix: "d'aquí %s" */
  future: string;
  /** Past time prefix: "fa %s" */
  past: string;
  /** Few seconds: "uns segons" */
  s: string;
  /** Seconds: "%d segons" */
  ss: string;
  /** One minute: "un minut" */
  m: string;
  /** Minutes: "%d minuts" */
  mm: string;
  /** One hour: "una hora" */
  h: string;
  /** Hours: "%d hores" */
  hh: string;
  /** One day: "un dia" */
  d: string;
  /** Days: "%d dies" */
  dd: string;
  /** One month: "un mes" */
  M: string;
  /** Months: "%d mesos" */
  MM: string;
  /** One year: "un any" */
  y: string;
  /** Years: "%d anys" */
  yy: string;
}

/**
 * Week configuration for first day of week and first week of year
 */
interface WeekConfig {
  /** Day of week (0=Sunday, 1=Monday) */
  dow: number;
  /** Day of year for first week */
  doy: number;
}

/**
 * Complete Catalan locale specification
 */
interface CatalanLocaleSpec extends LocaleSpecification {
  months: MonthsConfig;
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormatConfig;
  calendar: CalendarConfig;
  relativeTime: RelativeTimeConfig;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, token: string) => string;
  week: WeekConfig;
}

/**
 * Defines the Catalan locale for Moment.js
 * 
 * @param moment - The Moment.js instance to configure
 * @returns The configured Catalan locale
 */
export function defineCatalanLocale(moment: typeof import('moment')): Locale {
  return moment.defineLocale('ca', {
    months: {
      standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
      format: "de gener_de febrer_de març_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split('_'),
      isFormat: /D[oD]?(\s)+MMMM/
    },
    monthsShort: 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
    monthsParseExact: true,
    weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
    weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
    weekdaysMin: 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM [de] YYYY',
      ll: 'D MMM YYYY',
      LLL: "D MMMM [de] YYYY [a les] H:mm",
      lll: 'D MMM YYYY, H:mm',
      LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
      llll: 'ddd D MMM YYYY, H:mm'
    },
    calendar: {
      sameDay: function(this: moment.Moment): string {
        const article = this.hours() !== 1 ? 'les' : 'la';
        return `[avui a ${article}] LT`;
      },
      nextDay: function(this: moment.Moment): string {
        const article = this.hours() !== 1 ? 'les' : 'la';
        return `[demà a ${article}] LT`;
      },
      nextWeek: function(this: moment.Moment): string {
        const article = this.hours() !== 1 ? 'les' : 'la';
        return `dddd [a ${article}] LT`;
      },
      lastDay: function(this: moment.Moment): string {
        const article = this.hours() !== 1 ? 'les' : 'la';
        return `[ahir a ${article}] LT`;
      },
      lastWeek: function(this: moment.Moment): string {
        const article = this.hours() !== 1 ? 'les' : 'la';
        return `[el] dddd [passat a ${article}] LT`;
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: "d'aquí %s",
      past: 'fa %s',
      s: 'uns segons',
      ss: '%d segons',
      m: 'un minut',
      mm: '%d minuts',
      h: 'una hora',
      hh: '%d hores',
      d: 'un dia',
      dd: '%d dies',
      M: 'un mes',
      MM: '%d mesos',
      y: 'un any',
      yy: '%d anys'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
    ordinal: function(num: number, token: string): string {
      let ordinalSuffix: string;
      
      if (num === 1) {
        ordinalSuffix = 'r';
      } else if (num === 2) {
        ordinalSuffix = 'n';
      } else if (num === 3) {
        ordinalSuffix = 'r';
      } else if (num === 4) {
        ordinalSuffix = 't';
      } else {
        ordinalSuffix = 'è';
      }
      
      // Use 'a' suffix for week-related tokens
      if (token === 'w' || token === 'W') {
        ordinalSuffix = 'a';
      }
      
      return num + ordinalSuffix;
    },
    week: {
      dow: 1, // Monday is the first day of the week
      doy: 4  // The week that contains Jan 4th is the first week of the year
    }
  } as CatalanLocaleSpec);
}

export default defineCatalanLocale;