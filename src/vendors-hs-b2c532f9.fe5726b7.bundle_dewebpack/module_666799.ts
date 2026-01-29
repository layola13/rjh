interface MomentLocale {
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
    s: RelativeTimeFunction;
    ss: RelativeTimeFunction;
    m: RelativeTimeFunction;
    mm: RelativeTimeFunction;
    h: RelativeTimeFunction;
    hh: RelativeTimeFunction;
    d: RelativeTimeFunction;
    dd: RelativeTimeFunction;
    M: RelativeTimeFunction;
    MM: RelativeTimeFunction;
    y: RelativeTimeFunction;
    yy: RelativeTimeFunction;
  };
  postformat: (input: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

type RelativeTimeFunction = (
  number: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

interface Moment {
  defineLocale: (locale: string, config: MomentLocale) => MomentLocale;
}

type PluralForm = string | [string, string];

interface PluralRules {
  s: PluralForm[];
  m: PluralForm[];
  h: PluralForm[];
  d: PluralForm[];
  M: PluralForm[];
  y: PluralForm[];
}

const PLURAL_RULE_ZERO = 0;
const PLURAL_RULE_ONE = 1;
const PLURAL_RULE_TWO = 2;
const PLURAL_RULE_FEW = 3;
const PLURAL_RULE_MANY = 4;
const PLURAL_RULE_OTHER = 5;
const PERCENT_100_LOWER_BOUND = 3;
const PERCENT_100_UPPER_BOUND = 10;
const PERCENT_100_MANY_THRESHOLD = 11;
const MERIDIEM_THRESHOLD = 12;

/**
 * Determines the Arabic plural form index based on the number
 */
const getPluralFormIndex = (count: number): number => {
  if (count === 0) return PLURAL_RULE_ZERO;
  if (count === 1) return PLURAL_RULE_ONE;
  if (count === 2) return PLURAL_RULE_TWO;
  
  const mod100 = count % 100;
  if (mod100 >= PERCENT_100_LOWER_BOUND && mod100 <= PERCENT_100_UPPER_BOUND) {
    return PLURAL_RULE_FEW;
  }
  if (mod100 >= PERCENT_100_MANY_THRESHOLD) {
    return PLURAL_RULE_MANY;
  }
  
  return PLURAL_RULE_OTHER;
};

const pluralRules: PluralRules = {
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
 * Creates a relative time formatting function for a specific unit
 */
const createRelativeTimeFormatter = (unit: keyof PluralRules): RelativeTimeFunction => {
  return (count: number, withoutSuffix: boolean, _key: string, _isFuture: boolean): string => {
    const pluralIndex = getPluralFormIndex(count);
    let template = pluralRules[unit][pluralIndex];
    
    if (pluralIndex === PLURAL_RULE_TWO && Array.isArray(template)) {
      template = template[withoutSuffix ? 0 : 1];
    }
    
    return (template as string).replace(/%d/i, count.toString());
  };
};

const monthNames: string[] = [
  "جانفي",
  "فيفري",
  "مارس",
  "أفريل",
  "ماي",
  "جوان",
  "جويلية",
  "أوت",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر"
];

/**
 * Configures Arabic (Algeria) locale for Moment.js
 */
export const configureArabicDzLocale = (moment: Moment): MomentLocale => {
  return moment.defineLocale("ar-dz", {
    months: monthNames,
    monthsShort: monthNames,
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
    isPM: (input: string): boolean => {
      return input === "م";
    },
    meridiem: (hour: number, _minute: number, _isLower: boolean): string => {
      return hour < MERIDIEM_THRESHOLD ? "ص" : "م";
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
    postformat: (input: string): string => {
      return input.replace(/, /g, "،");
    },
    week: {
      dow: 0,
      doy: 4
    }
  });
};