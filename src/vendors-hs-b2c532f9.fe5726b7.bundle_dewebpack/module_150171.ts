import moment from 'moment';

interface LocaleSpecification {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
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
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Moment.js locale configuration for Norwegian Nynorsk (nn)
 */
function defineNorwegianNynorskLocale(momentInstance: typeof moment): void {
  const localeConfig: LocaleSpecification = {
    months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
    monthsParseExact: true,
    weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
    weekdaysShort: "su._må._ty._on._to._fr._lau.".split("_"),
    weekdaysMin: "su_må_ty_on_to_fr_la".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY [kl.] H:mm",
      LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
    },
    calendar: {
      sameDay: "[I dag klokka] LT",
      nextDay: "[I morgon klokka] LT",
      nextWeek: "dddd [klokka] LT",
      lastDay: "[I går klokka] LT",
      lastWeek: "[Føregåande] dddd [klokka] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "%s sidan",
      s: "nokre sekund",
      ss: "%d sekund",
      m: "eit minutt",
      mm: "%d minutt",
      h: "ein time",
      hh: "%d timar",
      d: "ein dag",
      dd: "%d dagar",
      w: "ei veke",
      ww: "%d veker",
      M: "ein månad",
      MM: "%d månader",
      y: "eit år",
      yy: "%d år"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  };

  momentInstance.defineLocale("nn", localeConfig);
}

defineNorwegianNynorskLocale(moment);

export default defineNorwegianNynorskLocale;