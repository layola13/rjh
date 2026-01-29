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
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(name: string, config: MomentLocale): Moment;
}

/**
 * Moment.js locale configuration for Tamazight Latin (tzm-latn)
 */
export function defineLocale(moment: Moment): Moment {
  return moment.defineLocale("tzm-latn", {
    months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
    monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
    weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
    weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
    weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[asdkh g] LT",
      nextDay: "[aska g] LT",
      nextWeek: "dddd [g] LT",
      lastDay: "[assant g] LT",
      lastWeek: "dddd [g] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "dadkh s yan %s",
      past: "yan %s",
      s: "imik",
      ss: "%d imik",
      m: "minuḍ",
      mm: "%d minuḍ",
      h: "saɛa",
      hh: "%d tassaɛin",
      d: "ass",
      dd: "%d ossan",
      M: "ayowr",
      MM: "%d iyyirn",
      y: "asgas",
      yy: "%d isgasn"
    },
    week: {
      dow: 6,
      doy: 12
    }
  });
}