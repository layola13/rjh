interface MomentLocale {
  months: string;
  monthsShort: (date: MomentInput | null, format: string) => string[] | string;
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
  ordinal: (num: number) => string;
  week: WeekSpec;
}

interface MomentInput {
  month: () => number;
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
  lastWeek: string;
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

interface WeekSpec {
  dow: number;
  doy: number;
}

interface Moment {
  defineLocale: (locale: string, config: MomentLocale) => void;
}

/**
 * Moment.js locale configuration for Dutch (Belgium)
 */
function defineNlBeLocale(moment: Moment): void {
  const monthsShortWithDots = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_");
  const monthsShortWithoutDots = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
  
  const monthsParsePatterns: RegExp[] = [
    /^jan/i,
    /^feb/i,
    /^(maart|mrt\.?)$/i,
    /^apr/i,
    /^mei$/i,
    /^jun[i.]?$/i,
    /^jul[i.]?$/i,
    /^aug/i,
    /^sep/i,
    /^okt/i,
    /^nov/i,
    /^dec/i
  ];
  
  const monthsRegexPattern = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

  moment.defineLocale("nl-be", {
    months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
    
    monthsShort: (date: MomentInput | null, format: string): string[] | string => {
      if (!date) {
        return monthsShortWithDots;
      }
      
      return /-MMM-/.test(format) 
        ? monthsShortWithoutDots[date.month()] 
        : monthsShortWithDots[date.month()];
    },
    
    monthsRegex: monthsRegexPattern,
    monthsShortRegex: monthsRegexPattern,
    monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    
    monthsParse: monthsParsePatterns,
    longMonthsParse: monthsParsePatterns,
    shortMonthsParse: monthsParsePatterns,
    
    weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
    weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
    weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
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
      sameDay: "[vandaag om] LT",
      nextDay: "[morgen om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[gisteren om] LT",
      lastWeek: "[afgelopen] dddd [om] LT",
      sameElse: "L"
    },
    
    relativeTime: {
      future: "over %s",
      past: "%s geleden",
      s: "een paar seconden",
      ss: "%d seconden",
      m: "één minuut",
      mm: "%d minuten",
      h: "één uur",
      hh: "%d uur",
      d: "één dag",
      dd: "%d dagen",
      M: "één maand",
      MM: "%d maanden",
      y: "één jaar",
      yy: "%d jaar"
    },
    
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    
    ordinal: (dayOfMonth: number): string => {
      return dayOfMonth + (dayOfMonth === 1 || dayOfMonth === 8 || dayOfMonth >= 20 ? "ste" : "de");
    },
    
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export { defineNlBeLocale };