interface MomentLocale {
  months: string;
  monthsShort: (m: MomentInput | null, format: string) => string[] | string;
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
  month(): number;
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

interface Moment {
  defineLocale(locale: string, config: MomentLocale): void;
}

/**
 * Configures the Dutch (nl) locale for moment.js
 * @param moment - The moment.js instance
 */
function configureDutchLocale(moment: Moment): void {
  const MONTHS_SHORT_WITH_DOTS = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_");
  const MONTHS_SHORT_WITHOUT_DOTS = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
  
  const MONTH_PARSE_PATTERNS: RegExp[] = [
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
  
  const MONTH_REGEX = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

  moment.defineLocale("nl", {
    months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
    
    monthsShort: (momentInput: MomentInput | null, format: string): string[] | string => {
      if (!momentInput) {
        return MONTHS_SHORT_WITH_DOTS;
      }
      return /-MMM-/.test(format) 
        ? MONTHS_SHORT_WITHOUT_DOTS[momentInput.month()] 
        : MONTHS_SHORT_WITH_DOTS[momentInput.month()];
    },
    
    monthsRegex: MONTH_REGEX,
    monthsShortRegex: MONTH_REGEX,
    monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse: MONTH_PARSE_PATTERNS,
    longMonthsParse: MONTH_PARSE_PATTERNS,
    shortMonthsParse: MONTH_PARSE_PATTERNS,
    
    weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
    weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
    weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
    weekdaysParseExact: true,
    
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
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
      w: "één week",
      ww: "%d weken",
      M: "één maand",
      MM: "%d maanden",
      y: "één jaar",
      yy: "%d jaar"
    },
    
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    
    ordinal: (dayOfMonth: number): string => {
      const usesSte = dayOfMonth === 1 || dayOfMonth === 8 || dayOfMonth >= 20;
      return `${dayOfMonth}${usesSte ? "ste" : "de"}`;
    },
    
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export { configureDutchLocale };