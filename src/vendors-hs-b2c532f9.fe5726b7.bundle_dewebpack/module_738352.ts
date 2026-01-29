import moment from 'moment';

type PluralFormIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface PluralForms {
  s: string[];
  m: string[];
  h: string[];
  d: string[];
  M: string[];
  y: string[];
}

const WESTERN_TO_ARABIC_DIGITS: Record<string, string> = {
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
  0: "٠"
};

const ARABIC_TO_WESTERN_DIGITS: Record<string, string> = {
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

/**
 * Determines the plural form index based on Arabic plural rules
 * @param count - The number to determine plural form for
 * @returns Index representing the plural form (0-5)
 */
const getPluralFormIndex = (count: number): PluralFormIndex => {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  
  const mod100 = count % 100;
  if (mod100 >= 3 && mod100 <= 10) return 3;
  if (mod100 >= 11) return 4;
  
  return 5;
};

const PLURAL_FORMS: PluralForms = {
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
 * Creates a relative time formatter for the given unit
 * @param unit - The time unit (s, m, h, d, M, y)
 * @returns Function that formats relative time strings
 */
const createRelativeTimeFormatter = (unit: keyof PluralForms) => {
  return (count: number, withoutSuffix: boolean, _key: string, _isFuture: boolean): string => {
    const pluralIndex = getPluralFormIndex(count);
    let template = PLURAL_FORMS[unit][pluralIndex];
    
    if (pluralIndex === 2 && Array.isArray(template)) {
      template = template[withoutSuffix ? 0 : 1];
    }
    
    return (template as string).replace(/%d/i, count.toString());
  };
};

const MONTHS: string[] = [
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

moment.defineLocale("ar", {
  months: MONTHS,
  monthsShort: MONTHS,
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
    return hour < 12 ? "ص" : "م";
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
  preparse: (input: string): string => {
    return input
      .replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match: string) => ARABIC_TO_WESTERN_DIGITS[match])
      .replace(/،/g, ", ");
  },
  postformat: (input: string): string => {
    return input
      .replace(/\d/g, (match: string) => WESTERN_TO_ARABIC_DIGITS[match])
      .replace(/, /g, "،");
  },
  week: {
    dow: 6,
    doy: 12
  }
});