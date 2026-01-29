interface DigitMap {
  [key: string]: string;
}

interface MomentLocale {
  months: string;
  monthsShort: string;
  monthsParseExact: boolean;
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
  weekdaysParseExact: boolean;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  preparse: (input: string) => string;
  postformat: (input: string) => string;
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
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
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): Moment;
}

const devanagariToArabicDigits: DigitMap = {
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
  "०": "0"
};

const arabicToDevanagariDigits: DigitMap = {
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९",
  "0": "०"
};

const NIGHT_HOUR_THRESHOLD = 4;
const AFTERNOON_HOUR_THRESHOLD = 10;
const NOON_HOUR = 12;
const EARLY_MORNING_HOUR = 3;
const MORNING_HOUR = 12;
const AFTERNOON_END_HOUR = 16;
const EVENING_END_HOUR = 20;

export function defineNepaliLocale(moment: Moment): Moment {
  return moment.defineLocale("ne", {
    months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
    monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
    monthsParseExact: true,
    weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
    weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
    weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "Aको h:mm बजे",
      LTS: "Aको h:mm:ss बजे",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, Aको h:mm बजे",
      LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे"
    },
    preparse: (input: string): string => {
      return input.replace(/[१२३४५६७८९०]/g, (match: string): string => {
        return devanagariToArabicDigits[match];
      });
    },
    postformat: (input: string): string => {
      return input.replace(/\d/g, (match: string): string => {
        return arabicToDevanagariDigits[match];
      });
    },
    meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      if (hour === NOON_HOUR) {
        hour = 0;
      }
      
      if (meridiem === "राति") {
        return hour < NIGHT_HOUR_THRESHOLD ? hour : hour + NOON_HOUR;
      } else if (meridiem === "बिहान") {
        return hour;
      } else if (meridiem === "दिउँसो") {
        return hour >= AFTERNOON_HOUR_THRESHOLD ? hour : hour + NOON_HOUR;
      } else if (meridiem === "साँझ") {
        return hour + NOON_HOUR;
      }
      
      return undefined;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      if (hour < EARLY_MORNING_HOUR) {
        return "राति";
      } else if (hour < MORNING_HOUR) {
        return "बिहान";
      } else if (hour < AFTERNOON_END_HOUR) {
        return "दिउँसो";
      } else if (hour < EVENING_END_HOUR) {
        return "साँझ";
      } else {
        return "राति";
      }
    },
    calendar: {
      sameDay: "[आज] LT",
      nextDay: "[भोलि] LT",
      nextWeek: "[आउँदो] dddd[, ] LT",
      lastDay: "[हिजो] LT",
      lastWeek: "[गएको] dddd[, ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sमा",
      past: "%s अगाडि",
      s: "केही क्षण",
      ss: "%d सेकेण्ड",
      m: "एक मिनेट",
      mm: "%d मिनेट",
      h: "एक घण्टा",
      hh: "%d घण्टा",
      d: "एक दिन",
      dd: "%d दिन",
      M: "एक महिना",
      MM: "%d महिना",
      y: "एक बर्ष",
      yy: "%d बर्ष"
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}