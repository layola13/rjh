interface OrdinalSuffixes {
  [key: number]: string;
}

interface MeridiemConfig {
  hour: number;
  minute: number;
  isLowercase: boolean;
}

const ordinalSuffixes: OrdinalSuffixes = {
  1: "-inci",
  5: "-inci",
  8: "-inci",
  70: "-inci",
  80: "-inci",
  2: "-nci",
  7: "-nci",
  20: "-nci",
  50: "-nci",
  3: "-üncü",
  4: "-üncü",
  100: "-üncü",
  6: "-ncı",
  9: "-uncu",
  10: "-uncu",
  30: "-uncu",
  60: "-ıncı",
  90: "-ıncı"
};

interface LocaleConfig {
  months: string[];
  monthsShort: string[];
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
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: LocaleConfig): unknown;
}

/**
 * Defines the Azerbaijani (az) locale configuration for moment.js
 */
export function defineAzerbaijaniLocale(moment: Moment): unknown {
  return moment.defineLocale("az", {
    months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
    monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
    weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
    weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
    weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[bugün saat] LT",
      nextDay: "[sabah saat] LT",
      nextWeek: "[gələn həftə] dddd [saat] LT",
      lastDay: "[dünən] LT",
      lastWeek: "[keçən həftə] dddd [saat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s sonra",
      past: "%s əvvəl",
      s: "bir neçə saniyə",
      ss: "%d saniyə",
      m: "bir dəqiqə",
      mm: "%d dəqiqə",
      h: "bir saat",
      hh: "%d saat",
      d: "bir gün",
      dd: "%d gün",
      M: "bir ay",
      MM: "%d ay",
      y: "bir il",
      yy: "%d il"
    },
    meridiemParse: /gecə|səhər|gündüz|axşam/,
    isPM(input: string): boolean {
      return /^(gündüz|axşam)$/.test(input);
    },
    meridiem(hour: number, minute: number, isLowercase: boolean): string {
      if (hour < 4) return "gecə";
      if (hour < 12) return "səhər";
      if (hour < 17) return "gündüz";
      return "axşam";
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
    ordinal(num: number): string {
      if (num === 0) return num + "-ıncı";
      const lastDigit = num % 10;
      const lastTwoDigits = num % 100 - lastDigit;
      const suffix = ordinalSuffixes[lastDigit] ?? ordinalSuffixes[lastTwoDigits] ?? (num >= 100 ? ordinalSuffixes[100] : "-ıncı");
      return num + suffix;
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}