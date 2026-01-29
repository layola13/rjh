type PluralCategory = 0 | 1 | 2 | 3 | 4 | 5;

interface NumberMap {
  [key: string]: string;
}

type PluralForms = [string, string, [string, string], string, string, string];

interface RelativeTimeTemplates {
  s: PluralForms;
  m: PluralForms;
  h: PluralForms;
  d: PluralForms;
  M: PluralForms;
  y: PluralForms;
}

interface MomentInstance {
  defineLocale(locale: string, config: LocaleConfig): LocaleConfig;
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
    s: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    ss: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    m: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    mm: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    h: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    hh: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    d: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    dd: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    M: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    MM: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    y: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    yy: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
  };
  preparse: (text: string) => string;
  postformat: (text: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

const EASTERN_ARABIC_NUMERALS: NumberMap = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0"
};

const PLURAL_LOWER_BOUND = 3;
const PLURAL_UPPER_BOUND = 10;
const PLURAL_TEENS_THRESHOLD = 11;
const NOON_HOUR = 12;
const SATURDAY_DOW = 6;
const DOY_VALUE = 12;

/**
 * Determines the plural category for Arabic (Libya) numbers
 */
function getPluralCategory(value: number): PluralCategory {
  if (value === 0) return 0;
  if (value === 1) return 1;
  if (value === 2) return 2;
  
  const mod100 = value % 100;
  if (mod100 >= PLURAL_LOWER_BOUND && mod100 <= PLURAL_UPPER_BOUND) return 3;
  if (mod100 >= PLURAL_TEENS_THRESHOLD) return 4;
  
  return 5;
}

const RELATIVE_TIME_TEMPLATES: RelativeTimeTemplates = {
  s: [
    "أقل من ثانية",
    "ثانية واحدة",
    ["ثانيتان", "ثانيتين"],
    "%d ثوان",
    "%d ثانية",
    "%d ثانية"
  ],
  m: [
    "أقل من دقيقة",
    "دقيقة واحدة",
    ["دقيقتان", "دقيقتين"],
    "%d دقائق",
    "%d دقيقة",
    "%d دقيقة"
  ],
  h: [
    "أقل من ساعة",
    "ساعة واحدة",
    ["ساعتان", "ساعتين"],
    "%d ساعات",
    "%d ساعة",
    "%d ساعة"
  ],
  d: [
    "أقل من يوم",
    "يوم واحد",
    ["يومان", "يومين"],
    "%d أيام",
    "%d يومًا",
    "%d يوم"
  ],
  M: [
    "أقل من شهر",
    "شهر واحد",
    ["شهران", "شهرين"],
    "%d أشهر",
    "%d شهرا",
    "%d شهر"
  ],
  y: [
    "أقل من عام",
    "عام واحد",
    ["عامان", "عامين"],
    "%d أعوام",
    "%d عامًا",
    "%d عام"
  ]
};

/**
 * Creates a relative time formatter for a specific unit
 */
function createRelativeTimeFormatter(unit: keyof RelativeTimeTemplates): (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string {
  return (value: number, withoutSuffix: boolean, key: string, isFuture: boolean): string => {
    const category = getPluralCategory(value);
    let template = RELATIVE_TIME_TEMPLATES[unit][category];
    
    if (category === 2) {
      template = (template as [string, string])[withoutSuffix ? 0 : 1];
    }
    
    return (template as string).replace(/%d/i, value.toString());
  };
}

const MONTH_NAMES: string[] = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر"
];

/**
 * Configures moment.js locale for Arabic (Libya)
 */
export function defineArLibyaLocale(moment: MomentInstance): LocaleConfig {
  return moment.defineLocale("ar-ly", {
    months: MONTH_NAMES,
    monthsShort: MONTH_NAMES,
    weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "D/‏M/‏YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /ص|م/,
    isPM: (input: string): boolean => input === "م",
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < NOON_HOUR ? "ص" : "م";
    },
    calendar: {
      sameDay: "[اليوم عند الساعة] LT",
      nextDay: "[غدًا عند الساعة] LT",
      nextWeek: "dddd [عند الساعة] LT",
      lastDay: "[أمس عند الساعة] LT",
      lastWeek: "dddd [عند الساعة] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "بعد %s",
      past: "منذ %s",
      s: createRelativeTimeFormatter("s"),
      ss: createRelativeTimeFormatter("s"),
      m: createRelativeTimeFormatter("m"),
      mm: createRelativeTimeFormatter("m"),
      h: createRelativeTimeFormatter("h"),
      hh: createRelativeTimeFormatter("h"),
      d: createRelativeTimeFormatter("d"),
      dd: createRelativeTimeFormatter("d"),
      M: createRelativeTimeFormatter("M"),
      MM: createRelativeTimeFormatter("M"),
      y: createRelativeTimeFormatter("y"),
      yy: createRelativeTimeFormatter("y")
    },
    preparse: (text: string): string => text.replace(/،/g, ", "),
    postformat: (text: string): string => {
      return text
        .replace(/\d/g, (digit: string): string => EASTERN_ARABIC_NUMERALS[digit])
        .replace(/, /g, "،");
    },
    week: {
      dow: SATURDAY_DOW,
      doy: DOY_VALUE
    }
  });
}