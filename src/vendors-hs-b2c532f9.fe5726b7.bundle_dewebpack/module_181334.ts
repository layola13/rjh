interface Moment {
  defineLocale(locale: string, config: LocaleConfig): Moment;
}

interface LocaleConfig {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormat;
  calendar: Calendar;
  relativeTime: RelativeTime;
  preparse: (input: string) => string;
  postformat: (input: string) => string;
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  week: Week;
}

interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface Calendar {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
  sameElse: string;
}

interface RelativeTime {
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
}

interface Week {
  dow: number;
  doy: number;
}

type DigitMap = Record<string, string>;

const WESTERN_TO_PUNJABI_DIGITS: DigitMap = {
  "1": "੧",
  "2": "੨",
  "3": "੩",
  "4": "੪",
  "5": "੫",
  "6": "੬",
  "7": "੭",
  "8": "੮",
  "9": "੯",
  "0": "੦"
};

const PUNJABI_TO_WESTERN_DIGITS: DigitMap = {
  "੧": "1",
  "੨": "2",
  "੩": "3",
  "੪": "4",
  "੫": "5",
  "੬": "6",
  "੭": "7",
  "੮": "8",
  "੯": "9",
  "੦": "0"
};

const MIDNIGHT_THRESHOLD = 4;
const MORNING_THRESHOLD = 10;
const AFTERNOON_THRESHOLD = 17;
const EVENING_THRESHOLD = 20;
const NOON = 12;

/**
 * Configures Punjabi (India) locale for moment.js
 * @param moment - The moment.js instance
 * @returns Configured moment instance
 */
export function configurePunjabiLocale(moment: Moment): Moment {
  return moment.defineLocale("pa-in", {
    months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
    monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
    weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),
    weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
    weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
    longDateFormat: {
      LT: "A h:mm ਵਜੇ",
      LTS: "A h:mm:ss ਵਜੇ",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm ਵਜੇ",
      LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ"
    },
    calendar: {
      sameDay: "[ਅਜ] LT",
      nextDay: "[ਕਲ] LT",
      nextWeek: "[ਅਗਲਾ] dddd, LT",
      lastDay: "[ਕਲ] LT",
      lastWeek: "[ਪਿਛਲੇ] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s ਵਿੱਚ",
      past: "%s ਪਿਛਲੇ",
      s: "ਕੁਝ ਸਕਿੰਟ",
      ss: "%d ਸਕਿੰਟ",
      m: "ਇਕ ਮਿੰਟ",
      mm: "%d ਮਿੰਟ",
      h: "ਇੱਕ ਘੰਟਾ",
      hh: "%d ਘੰਟੇ",
      d: "ਇੱਕ ਦਿਨ",
      dd: "%d ਦਿਨ",
      M: "ਇੱਕ ਮਹੀਨਾ",
      MM: "%d ਮਹੀਨੇ",
      y: "ਇੱਕ ਸਾਲ",
      yy: "%d ਸਾਲ"
    },
    preparse: (input: string): string => {
      return input.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, (digit: string): string => {
        return PUNJABI_TO_WESTERN_DIGITS[digit];
      });
    },
    postformat: (input: string): string => {
      return input.replace(/\d/g, (digit: string): string => {
        return WESTERN_TO_PUNJABI_DIGITS[digit];
      });
    },
    meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      if (hour === NOON) {
        hour = 0;
      }
      if (meridiem === "ਰਾਤ") {
        return hour < MIDNIGHT_THRESHOLD ? hour : hour + NOON;
      } else if (meridiem === "ਸਵੇਰ") {
        return hour;
      } else if (meridiem === "ਦੁਪਹਿਰ") {
        return hour >= MORNING_THRESHOLD ? hour : hour + NOON;
      } else if (meridiem === "ਸ਼ਾਮ") {
        return hour + NOON;
      }
      return undefined;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      if (hour < MIDNIGHT_THRESHOLD) {
        return "ਰਾਤ";
      } else if (hour < MORNING_THRESHOLD) {
        return "ਸਵੇਰ";
      } else if (hour < AFTERNOON_THRESHOLD) {
        return "ਦੁਪਹਿਰ";
      } else if (hour < EVENING_THRESHOLD) {
        return "ਸ਼ਾਮ";
      } else {
        return "ਰਾਤ";
      }
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}