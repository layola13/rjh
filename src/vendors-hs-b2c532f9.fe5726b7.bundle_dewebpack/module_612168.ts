import moment from 'moment';

interface MomentLocale {
  months: string;
  monthsShort: (date: moment.Moment | null, format: string) => string[] | string;
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
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
  sameDay: (this: moment.Moment) => string;
  nextDay: (this: moment.Moment) => string;
  nextWeek: (this: moment.Moment) => string;
  lastDay: (this: moment.Moment) => string;
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

const monthsShortWithDots = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
const monthsShortWithoutDots = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");

const monthsParseRegexes: RegExp[] = [
  /^ene/i,
  /^feb/i,
  /^mar/i,
  /^abr/i,
  /^may/i,
  /^jun/i,
  /^jul/i,
  /^ago/i,
  /^sep/i,
  /^oct/i,
  /^nov/i,
  /^dic/i
];

const monthsGeneralRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

moment.defineLocale("es-us", {
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  
  monthsShort(date: moment.Moment | null, format: string): string[] | string {
    if (!date) {
      return monthsShortWithDots;
    }
    return /-MMM-/.test(format) 
      ? monthsShortWithoutDots[date.month()] 
      : monthsShortWithDots[date.month()];
  },
  
  monthsRegex: monthsGeneralRegex,
  monthsShortRegex: monthsGeneralRegex,
  monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
  monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
  monthsParse: monthsParseRegexes,
  longMonthsParse: monthsParseRegexes,
  shortMonthsParse: monthsParseRegexes,
  
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "MM/DD/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY h:mm A",
    LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
  },
  
  calendar: {
    sameDay(this: moment.Moment): string {
      return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    
    nextDay(this: moment.Moment): string {
      return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    
    nextWeek(this: moment.Moment): string {
      return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    
    lastDay(this: moment.Moment): string {
      return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    
    lastWeek(this: moment.Moment): string {
      return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    
    sameElse: "L"
  },
  
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    w: "una semana",
    ww: "%d semanas",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  
  week: {
    dow: 0,
    doy: 6
  }
});