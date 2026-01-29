interface Locale {
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
  defineLocale(locale: string, config: Locale): Locale;
}

/**
 * Moment.js locale configuration for Sindhi (sd)
 */
export function defineSindhiLocale(moment: Moment): Locale {
  const MONTHS: string[] = [
    "جنوري",
    "فيبروري",
    "مارچ",
    "اپريل",
    "مئي",
    "جون",
    "جولاءِ",
    "آگسٽ",
    "سيپٽمبر",
    "آڪٽوبر",
    "نومبر",
    "ڊسمبر"
  ];

  const WEEKDAYS: string[] = [
    "آچر",
    "سومر",
    "اڱارو",
    "اربع",
    "خميس",
    "جمع",
    "ڇنڇر"
  ];

  const MERIDIEM_MORNING = "صبح";
  const MERIDIEM_EVENING = "شام";
  const NOON_HOUR = 12;

  return moment.defineLocale("sd", {
    months: MONTHS,
    monthsShort: MONTHS,
    weekdays: WEEKDAYS,
    weekdaysShort: WEEKDAYS,
    weekdaysMin: WEEKDAYS,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd، D MMMM YYYY HH:mm"
    },
    meridiemParse: /صبح|شام/,
    isPM(input: string): boolean {
      return input === MERIDIEM_EVENING;
    },
    meridiem(hour: number, minute: number, isLower: boolean): string {
      return hour < NOON_HOUR ? MERIDIEM_MORNING : MERIDIEM_EVENING;
    },
    calendar: {
      sameDay: "[اڄ] LT",
      nextDay: "[سڀاڻي] LT",
      nextWeek: "dddd [اڳين هفتي تي] LT",
      lastDay: "[ڪالهه] LT",
      lastWeek: "[گزريل هفتي] dddd [تي] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s پوء",
      past: "%s اڳ",
      s: "چند سيڪنڊ",
      ss: "%d سيڪنڊ",
      m: "هڪ منٽ",
      mm: "%d منٽ",
      h: "هڪ ڪلاڪ",
      hh: "%d ڪلاڪ",
      d: "هڪ ڏينهن",
      dd: "%d ڏينهن",
      M: "هڪ مهينو",
      MM: "%d مهينا",
      y: "هڪ سال",
      yy: "%d سال"
    },
    preparse(text: string): string {
      return text.replace(/،/g, ", ");
    },
    postformat(text: string): string {
      return text.replace(/, /g, "،");
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}