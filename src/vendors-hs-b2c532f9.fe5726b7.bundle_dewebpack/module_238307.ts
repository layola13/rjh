import moment from 'moment';

interface MomentLocale {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormat;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: WeekSpec;
}

interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface CalendarSpec {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: (this: moment.Moment) => string;
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
  w: string;
  ww: string;
  M: string;
  MM: string;
  y: string;
  yy: string;
}

interface WeekSpec {
  dow: number;
  doy: number;
}

const SUNDAY = 0;
const SATURDAY = 6;
const FIRST_DAY_OF_WEEK = 1;
const FIRST_WEEK_OF_YEAR = 4;

/**
 * Portuguese locale configuration for moment.js
 */
const definePortugueseLocale = (momentInstance: typeof moment): void => {
  momentInstance.defineLocale('pt', {
    months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
    monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY HH:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: function (this: moment.Moment): string {
        return this.day() === SUNDAY || this.day() === SATURDAY
          ? '[Último] dddd [às] LT'
          : '[Última] dddd [às] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'em %s',
      past: 'há %s',
      s: 'segundos',
      ss: '%d segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      w: 'uma semana',
      ww: '%d semanas',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: FIRST_DAY_OF_WEEK,
      doy: FIRST_WEEK_OF_YEAR
    }
  });
};

definePortugueseLocale(moment);

export default definePortugueseLocale;