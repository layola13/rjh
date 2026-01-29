interface Moment {
  month(): number;
  hours(): number;
}

interface Locale {
  months: string;
  monthsShort: (date: Moment | null, format: string) => string[] | string;
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
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  calendar: {
    sameDay: (this: Moment) => string;
    nextDay: (this: Moment) => string;
    nextWeek: (this: Moment) => string;
    lastDay: (this: Moment) => string;
    lastWeek: (this: Moment) => string;
    sameElse: string;
  };
  relativeTime: {
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
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
  invalidDate: string;
}

interface MomentStatic {
  defineLocale(locale: string, config: Locale): Locale;
}

/**
 * Moment.js Spanish locale configuration
 */
export function defineSpanishLocale(moment: MomentStatic): Locale {
  const monthsShortDot = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
  const monthsShort = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
  
  const monthsParse = [
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
  
  const monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

  return moment.defineLocale("es", {
    months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
    
    monthsShort: (date: Moment | null, format: string): string[] | string => {
      if (!date) {
        return monthsShortDot;
      }
      return /-MMM-/.test(format) ? monthsShort[date.month()] : monthsShortDot[date.month()];
    },
    
    monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    
    weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
    weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
    weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
    weekdaysParseExact: true,
    
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY H:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
    },
    
    calendar: {
      sameDay: function(this: Moment): string {
        return `[hoy a la${this.hours() !== 1 ? "s" : ""}] LT`;
      },
      nextDay: function(this: Moment): string {
        return `[mañana a la${this.hours() !== 1 ? "s" : ""}] LT`;
      },
      nextWeek: function(this: Moment): string {
        return `dddd [a la${this.hours() !== 1 ? "s" : ""}] LT`;
      },
      lastDay: function(this: Moment): string {
        return `[ayer a la${this.hours() !== 1 ? "s" : ""}] LT`;
      },
      lastWeek: function(this: Moment): string {
        return `[el] dddd [pasado a la${this.hours() !== 1 ? "s" : ""}] LT`;
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
      dow: 1,
      doy: 4
    },
    
    invalidDate: "Fecha inválida"
  });
}