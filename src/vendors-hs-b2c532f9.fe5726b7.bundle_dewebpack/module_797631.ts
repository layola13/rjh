interface MomentLocale {
  months: string[];
  monthsShort: string[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
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
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
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
  ordinal: (day: number, period: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

function configureFrenchLocale(moment: Moment): MomentLocale {
  const MONTH_REGEX = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i;
  
  const MONTH_PARSE_PATTERNS: RegExp[] = [
    /^janv/i,
    /^févr/i,
    /^mars/i,
    /^avr/i,
    /^mai/i,
    /^juin/i,
    /^juil/i,
    /^août/i,
    /^sept/i,
    /^oct/i,
    /^nov/i,
    /^déc/i
  ];

  return moment.defineLocale("fr", {
    months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    monthsRegex: MONTH_REGEX,
    monthsShortRegex: MONTH_REGEX,
    monthsStrictRegex: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
    monthsShortStrictRegex: /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
    monthsParse: MONTH_PARSE_PATTERNS,
    longMonthsParse: MONTH_PARSE_PATTERNS,
    shortMonthsParse: MONTH_PARSE_PATTERNS,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Aujourd'hui à] LT",
      nextDay: "[Demain à] LT",
      nextWeek: "dddd [à] LT",
      lastDay: "[Hier à] LT",
      lastWeek: "dddd [dernier à] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      ss: "%d secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      w: "une semaine",
      ww: "%d semaines",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal: (day: number, period: string): string => {
      switch (period) {
        case "D":
          return day + (day === 1 ? "er" : "");
        case "M":
        case "Q":
        case "DDD":
        case "d":
          return day + (day === 1 ? "er" : "e");
        case "w":
        case "W":
          return day + (day === 1 ? "re" : "e");
        default:
          return day + (day === 1 ? "er" : "e");
      }
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export { configureFrenchLocale, type MomentLocale, type Moment };