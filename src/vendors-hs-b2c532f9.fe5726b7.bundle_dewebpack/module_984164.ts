interface MomentLocale {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
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

interface Moment {
  defineLocale(locale: string, config: MomentLocale): Moment;
}

/**
 * Danish locale configuration for moment.js
 */
export function defineDanishLocale(moment: Moment): Moment {
  return moment.defineLocale("da", {
    months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
    weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
    weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
    },
    calendar: {
      sameDay: "[i dag kl.] LT",
      nextDay: "[i morgen kl.] LT",
      nextWeek: "på dddd [kl.] LT",
      lastDay: "[i går kl.] LT",
      lastWeek: "[i] dddd[s kl.] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "%s siden",
      s: "få sekunder",
      ss: "%d sekunder",
      m: "et minut",
      mm: "%d minutter",
      h: "en time",
      hh: "%d timer",
      d: "en dag",
      dd: "%d dage",
      M: "en måned",
      MM: "%d måneder",
      y: "et år",
      yy: "%d år"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}