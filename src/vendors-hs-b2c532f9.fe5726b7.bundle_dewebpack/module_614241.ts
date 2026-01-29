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
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (dayOfMonth: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface MomentStatic {
  defineLocale(localeName: string, config: MomentLocale): MomentLocale;
}

const ORDINAL_SUFFIXES: OrdinalSuffixMap = {
  0: "-ші",
  1: "-ші",
  2: "-ші",
  3: "-ші",
  4: "-ші",
  5: "-ші",
  6: "-шы",
  7: "-ші",
  8: "-ші",
  9: "-шы",
  10: "-шы",
  20: "-шы",
  30: "-шы",
  40: "-шы",
  50: "-ші",
  60: "-шы",
  70: "-ші",
  80: "-ші",
  90: "-шы",
  100: "-ші"
};

const FALLBACK_THRESHOLD = 100;

/**
 * Returns the ordinal suffix for a given day of month in Kazakh locale
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The ordinal string with suffix
 */
function getOrdinal(dayOfMonth: number): string {
  const suffix = 
    ORDINAL_SUFFIXES[dayOfMonth] ?? 
    ORDINAL_SUFFIXES[dayOfMonth % 10] ?? 
    ORDINAL_SUFFIXES[dayOfMonth >= FALLBACK_THRESHOLD ? FALLBACK_THRESHOLD : 0];
  
  return `${dayOfMonth}${suffix}`;
}

/**
 * Configures and returns the Kazakh (kk) locale for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale object
 */
export function defineKazakhLocale(moment: MomentStatic): MomentLocale {
  return moment.defineLocale("kk", {
    months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),
    monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),
    weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),
    weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"),
    weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Бүгін сағат] LT",
      nextDay: "[Ертең сағат] LT",
      nextWeek: "dddd [сағат] LT",
      lastDay: "[Кеше сағат] LT",
      lastWeek: "[Өткен аптаның] dddd [сағат] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s ішінде",
      past: "%s бұрын",
      s: "бірнеше секунд",
      ss: "%d секунд",
      m: "бір минут",
      mm: "%d минут",
      h: "бір сағат",
      hh: "%d сағат",
      d: "бір күн",
      dd: "%d күн",
      M: "бір ай",
      MM: "%d ай",
      y: "бір жыл",
      yy: "%d жыл"
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
    ordinal: getOrdinal,
    week: {
      dow: 1,
      doy: 7
    }
  });
}