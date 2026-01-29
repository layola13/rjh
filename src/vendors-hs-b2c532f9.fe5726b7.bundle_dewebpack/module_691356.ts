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
 * Moment.js locale configuration for Faroese (fo)
 */
export function defineFaroeseLocale(moment: Moment): Moment {
  return moment.defineLocale("fo", {
    months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
    weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
    weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
    weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D. MMMM, YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Í dag kl.] LT",
      nextDay: "[Í morgin kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[Í gjár kl.] LT",
      lastWeek: "[síðstu] dddd [kl] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "um %s",
      past: "%s síðani",
      s: "fá sekund",
      ss: "%d sekundir",
      m: "ein minuttur",
      mm: "%d minuttir",
      h: "ein tími",
      hh: "%d tímar",
      d: "ein dagur",
      dd: "%d dagar",
      M: "ein mánaður",
      MM: "%d mánaðir",
      y: "eitt ár",
      yy: "%d ár"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}