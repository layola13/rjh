interface NumberMap {
  [key: string]: string;
}

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
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
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
  preparse: (text: string) => string;
  postformat: (text: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: LocaleConfig): unknown;
}

const ARABIC_TO_WESTERN_DIGITS: NumberMap = {
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "٠": "0"
};

const WESTERN_TO_ARABIC_DIGITS: NumberMap = {
  "1": "١",
  "2": "٢",
  "3": "٣",
  "4": "٤",
  "5": "٥",
  "6": "٦",
  "7": "٧",
  "8": "٨",
  "9": "٩",
  "0": "٠"
};

const NOON_HOUR = 12;

/**
 * Moment.js locale configuration for Arabic (Palestine)
 */
export function defineArabicPalestineLocale(moment: Moment): unknown {
  return moment.defineLocale("ar-ps", {
    months: "كانون الثاني_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_تشري الأوّل_تشرين الثاني_كانون الأوّل".split("_"),
    monthsShort: "ك٢_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_ت١_ت٢_ك١".split("_"),
    weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /ص|م/,
    isPM: (input: string): boolean => {
      return input === "م";
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < NOON_HOUR ? "ص" : "م";
    },
    calendar: {
      sameDay: "[اليوم على الساعة] LT",
      nextDay: "[غدا على الساعة] LT",
      nextWeek: "dddd [على الساعة] LT",
      lastDay: "[أمس على الساعة] LT",
      lastWeek: "dddd [على الساعة] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "في %s",
      past: "منذ %s",
      s: "ثوان",
      ss: "%d ثانية",
      m: "دقيقة",
      mm: "%d دقائق",
      h: "ساعة",
      hh: "%d ساعات",
      d: "يوم",
      dd: "%d أيام",
      M: "شهر",
      MM: "%d أشهر",
      y: "سنة",
      yy: "%d سنوات"
    },
    preparse: (text: string): string => {
      return text
        .replace(/[٣٤٥٦٧٨٩٠]/g, (match: string): string => {
          return ARABIC_TO_WESTERN_DIGITS[match];
        })
        .split("")
        .reverse()
        .join("")
        .replace(/[١٢](?![\u062a\u0643])/g, (match: string): string => {
          return ARABIC_TO_WESTERN_DIGITS[match];
        })
        .split("")
        .reverse()
        .join("")
        .replace(/،/g, ", ");
    },
    postformat: (text: string): string => {
      return text
        .replace(/\d/g, (match: string): string => {
          return WESTERN_TO_ARABIC_DIGITS[match];
        })
        .replace(/, /g, "،");
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}