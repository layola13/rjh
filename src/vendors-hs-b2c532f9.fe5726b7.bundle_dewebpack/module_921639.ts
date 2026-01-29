interface NumberMap {
  [key: string]: string;
}

interface MomentLocale {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
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
  preparse: (text: string) => string;
  postformat: (text: string) => string;
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): unknown;
}

const GUJARATI_DIGITS: NumberMap = {
  "1": "૧",
  "2": "૨",
  "3": "૩",
  "4": "૪",
  "5": "૫",
  "6": "૬",
  "7": "૭",
  "8": "૮",
  "9": "૯",
  "0": "૦"
};

const ARABIC_DIGITS: NumberMap = {
  "૧": "1",
  "૨": "2",
  "૩": "3",
  "૪": "4",
  "૫": "5",
  "૬": "6",
  "૭": "7",
  "૮": "8",
  "૯": "9",
  "૦": "0"
};

const NIGHT_HOUR_THRESHOLD = 4;
const MORNING_HOUR_THRESHOLD = 10;
const AFTERNOON_HOUR_THRESHOLD = 17;
const EVENING_HOUR_THRESHOLD = 20;
const NOON_HOUR = 12;

export function defineGujaratiLocale(moment: Moment): unknown {
  return moment.defineLocale("gu", {
    months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"),
    monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"),
    monthsParseExact: true,
    weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"),
    weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"),
    weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"),
    longDateFormat: {
      LT: "A h:mm વાગ્યે",
      LTS: "A h:mm:ss વાગ્યે",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm વાગ્યે",
      LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે"
    },
    calendar: {
      sameDay: "[આજ] LT",
      nextDay: "[કાલે] LT",
      nextWeek: "dddd, LT",
      lastDay: "[ગઇકાલે] LT",
      lastWeek: "[પાછલા] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s મા",
      past: "%s પહેલા",
      s: "અમુક પળો",
      ss: "%d સેકંડ",
      m: "એક મિનિટ",
      mm: "%d મિનિટ",
      h: "એક કલાક",
      hh: "%d કલાક",
      d: "એક દિવસ",
      dd: "%d દિવસ",
      M: "એક મહિનો",
      MM: "%d મહિનો",
      y: "એક વર્ષ",
      yy: "%d વર્ષ"
    },
    preparse: (text: string): string => {
      return text.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, (digit: string) => ARABIC_DIGITS[digit]);
    },
    postformat: (text: string): string => {
      return text.replace(/\d/g, (digit: string) => GUJARATI_DIGITS[digit]);
    },
    meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      let adjustedHour = hour;
      if (hour === NOON_HOUR) {
        adjustedHour = 0;
      }

      if (meridiem === "રાત") {
        return adjustedHour < NIGHT_HOUR_THRESHOLD ? adjustedHour : adjustedHour + NOON_HOUR;
      } else if (meridiem === "સવાર") {
        return adjustedHour;
      } else if (meridiem === "બપોર") {
        return adjustedHour >= MORNING_HOUR_THRESHOLD ? adjustedHour : adjustedHour + NOON_HOUR;
      } else if (meridiem === "સાંજ") {
        return adjustedHour + NOON_HOUR;
      }
      return undefined;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      if (hour < NIGHT_HOUR_THRESHOLD) {
        return "રાત";
      } else if (hour < MORNING_HOUR_THRESHOLD) {
        return "સવાર";
      } else if (hour < AFTERNOON_HOUR_THRESHOLD) {
        return "બપોર";
      } else if (hour < EVENING_HOUR_THRESHOLD) {
        return "સાંજ";
      }
      return "રાત";
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}