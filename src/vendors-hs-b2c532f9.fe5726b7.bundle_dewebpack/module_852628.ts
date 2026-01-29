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
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  preparse: (input: string) => string;
  postformat: (input: string) => string;
  week: WeekSpec;
}

interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface CalendarSpec {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
  sameElse: string;
}

interface RelativeTimeSpec {
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

interface WeekSpec {
  dow: number;
  doy: number;
}

const MONTHS: readonly string[] = [
  "جنوری",
  "فروری",
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر"
];

const WEEKDAYS: readonly string[] = [
  "اتوار",
  "پیر",
  "منگل",
  "بدھ",
  "جمعرات",
  "جمعہ",
  "ہفتہ"
];

const NOON_HOUR = 12;

/**
 * Urdu locale configuration for moment.js
 */
export function defineUrduLocale(moment: Moment): Moment {
  return moment.defineLocale("ur", {
    months: [...MONTHS],
    monthsShort: [...MONTHS],
    weekdays: [...WEEKDAYS],
    weekdaysShort: [...WEEKDAYS],
    weekdaysMin: [...WEEKDAYS],
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd، D MMMM YYYY HH:mm"
    },
    meridiemParse: /صبح|شام/,
    isPM: (input: string): boolean => {
      return input === "شام";
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < NOON_HOUR ? "صبح" : "شام";
    },
    calendar: {
      sameDay: "[آج بوقت] LT",
      nextDay: "[کل بوقت] LT",
      nextWeek: "dddd [بوقت] LT",
      lastDay: "[گذشتہ روز بوقت] LT",
      lastWeek: "[گذشتہ] dddd [بوقت] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s بعد",
      past: "%s قبل",
      s: "چند سیکنڈ",
      ss: "%d سیکنڈ",
      m: "ایک منٹ",
      mm: "%d منٹ",
      h: "ایک گھنٹہ",
      hh: "%d گھنٹے",
      d: "ایک دن",
      dd: "%d دن",
      M: "ایک ماہ",
      MM: "%d ماہ",
      y: "ایک سال",
      yy: "%d سال"
    },
    preparse: (input: string): string => {
      return input.replace(/،/g, ", ");
    },
    postformat: (input: string): string => {
      return input.replace(/, /g, "،");
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}