interface MomentLocale {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hours: number, minutes: number, isLower: boolean) => string;
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
  defineLocale: (locale: string, config: MomentLocale) => Moment;
}

function defineAlbanianLocale(moment: Moment): Moment {
  return moment.defineLocale("sq", {
    months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
    monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
    weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
    weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
    weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
    weekdaysParseExact: true,
    meridiemParse: /PD|MD/,
    isPM: (input: string): boolean => {
      return input.charAt(0) === "M";
    },
    meridiem: (hours: number, minutes: number, isLower: boolean): string => {
      return hours < 12 ? "PD" : "MD";
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Sot në] LT",
      nextDay: "[Nesër në] LT",
      nextWeek: "dddd [në] LT",
      lastDay: "[Dje në] LT",
      lastWeek: "dddd [e kaluar në] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "në %s",
      past: "%s më parë",
      s: "disa sekonda",
      ss: "%d sekonda",
      m: "një minutë",
      mm: "%d minuta",
      h: "një orë",
      hh: "%d orë",
      d: "një ditë",
      dd: "%d ditë",
      M: "një muaj",
      MM: "%d muaj",
      y: "një vit",
      yy: "%d vite"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export default defineAlbanianLocale;