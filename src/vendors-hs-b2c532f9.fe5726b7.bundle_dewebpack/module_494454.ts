interface OrdinalSuffixMap {
  [key: number]: string;
}

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
  ordinal: (value: number, token: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(localeName: string, config: MomentLocale): MomentLocale;
}

const ORDINAL_SUFFIXES: OrdinalSuffixMap = {
  1: "'inji",
  5: "'inji",
  8: "'inji",
  70: "'inji",
  80: "'inji",
  2: "'nji",
  7: "'nji",
  20: "'nji",
  50: "'nji",
  3: "'ünji",
  4: "'ünji",
  100: "'ünji",
  6: "'njy",
  9: "'unjy",
  10: "'unjy",
  30: "'unjy",
  60: "'ynjy",
  90: "'ynjy"
};

const ZERO_ORDINAL_SUFFIX = "'unjy";

/**
 * Returns the ordinal suffix for a given number in Turkmen locale
 * @param value - The numeric value
 * @param token - The format token (e.g., 'd', 'D', 'Do', 'DD')
 * @returns The formatted ordinal string
 */
function getOrdinal(value: number, token: string): string {
  switch (token) {
    case "d":
    case "D":
    case "Do":
    case "DD":
      return value.toString();
    default:
      if (value === 0) {
        return value + ZERO_ORDINAL_SUFFIX;
      }
      
      const lastDigit = value % 10;
      const lastTwoDigits = value % 100 - lastDigit;
      const suffix = ORDINAL_SUFFIXES[lastDigit] 
        || ORDINAL_SUFFIXES[lastTwoDigits] 
        || (value >= 100 ? ORDINAL_SUFFIXES[100] : "");
      
      return value + suffix;
  }
}

/**
 * Moment.js locale configuration for Turkmen (tk)
 */
export function defineLocale(moment: Moment): MomentLocale {
  return moment.defineLocale("tk", {
    months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"),
    monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"),
    weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"),
    weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"),
    weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[bugün sagat] LT",
      nextDay: "[ertir sagat] LT",
      nextWeek: "[indiki] dddd [sagat] LT",
      lastDay: "[düýn] LT",
      lastWeek: "[geçen] dddd [sagat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s soň",
      past: "%s öň",
      s: "birnäçe sekunt",
      m: "bir minut",
      mm: "%d minut",
      h: "bir sagat",
      hh: "%d sagat",
      d: "bir gün",
      dd: "%d gün",
      M: "bir aý",
      MM: "%d aý",
      y: "bir ýyl",
      yy: "%d ýyl"
    },
    ordinal: getOrdinal,
    week: {
      dow: 1,
      doy: 7
    }
  });
}