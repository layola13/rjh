import moment from 'moment';

interface MonthsConfig {
  standalone: string[];
  format: string[];
  isFormat: RegExp;
}

interface CalendarSpec {
  sameDay: () => string;
  nextDay: () => string;
  nextWeek: () => string;
  lastDay: () => string;
  lastWeek: () => string;
  sameElse: string;
}

interface RelativeTimeSpec {
  future: string;
  past: string;
  s: string;
  ss: string;
  m: string;
  mm: string;
  h: string;
  hh: string;
  d: string;
  dd: string;
  M: string;
  MM: string;
  y: string;
  yy: string;
}

interface LongDateFormatSpec {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  ll: string;
  LLL: string;
  lll: string;
  LLLL: string;
  llll: string;
}

interface WeekSpec {
  dow: number;
  doy: number;
}

interface LocaleSpecification {
  months: MonthsConfig;
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormatSpec;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, period: string) => string;
  week: WeekSpec;
}

/**
 * Catalan locale configuration for moment.js
 */
function defineLocale(momentInstance: typeof moment): moment.Locale {
  return momentInstance.defineLocale('ca', {
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
      LLL: 'D MMMM [de] YYYY [a les] H:mm',
      lll: 'D MMM YYYY, H:mm',
      LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
      llll: 'ddd D MMM YYYY, H:mm'
    },
    calendar: {
      sameDay: function(this: moment.Moment): string {
        return '[avui a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      nextDay: function(this: moment.Moment): string {
        return '[demà a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      nextWeek: function(this: moment.Moment): string {
        return 'dddd [a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      lastDay: function(this: moment.Moment): string {
        return '[ahir a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      lastWeek: function(this: moment.Moment): string {
        return '[el] dddd [passat a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
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
    ordinal: (num: number, period: string): string => {
      const suffix = num === 1 ? 'r' : num === 2 ? 'n' : num === 3 ? 'r' : num === 4 ? 't' : 'è';
      const finalSuffix = period !== 'w' && period !== 'W' ? suffix : 'a';
      return num + finalSuffix;
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export default defineLocale(moment);