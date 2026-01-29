interface DigitMap {
  [key: string]: string;
}

interface MomentLocale {
  months: {
    format: string[];
    standalone: string[];
  };
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
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
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
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): unknown;
}

const DEVANAGARI_TO_ARABIC: DigitMap = {
  "१": "1",
  "२": "2",
  "३": "3",
  "④": "4",
  "⑤": "5",
  "⑥": "6",
  "⑦": "7",
  "⑧": "8",
  "⑨": "9",
  "०": "0"
};

const ARABIC_TO_DEVANAGARI: DigitMap = {
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

const MONTH_PARSE_PATTERNS: RegExp[] = [
  /^जन/i,
  /^फ़र|फर/i,
  /^मार्च/i,
  /^अप्रै/i,
  /^मई/i,
  /^जून/i,
  /^जुल/i,
  /^अग/i,
  /^सितं|सित/i,
  /^अक्टू/i,
  /^नव|नवं/i,
  /^दिसं|दिस/i
];

const SHORT_MONTH_PARSE_PATTERNS: RegExp[] = [
  /^जन/i,
  /^फ़र/i,
  /^मार्च/i,
  /^अप्रै/i,
  /^मई/i,
  /^जून/i,
  /^जुल/i,
  /^अग/i,
  /^सित/i,
  /^अक्टू/i,
  /^नव/i,
  /^दिस/i
];

const HOUR_MIDNIGHT = 0;
const HOUR_NOON = 12;
const HOUR_EARLY_MORNING = 4;
const HOUR_MORNING_END = 10;
const HOUR_AFTERNOON_END = 17;
const HOUR_EVENING_END = 20;

const WEEK_START_DAY = 0;
const DAY_OF_YEAR = 6;

export function defineHindiLocale(moment: Moment): unknown {
  return moment.defineLocale("hi", {
    months: {
      format: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
      standalone: "जनवरी_फरवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितंबर_अक्टूबर_नवंबर_दिसंबर".split("_")
    },
    monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
    weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
    weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
    weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
    longDateFormat: {
      LT: "A h:mm बजे",
      LTS: "A h:mm:ss बजे",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm बजे",
      LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
    },
    monthsParse: MONTH_PARSE_PATTERNS,
    longMonthsParse: MONTH_PARSE_PATTERNS,
    shortMonthsParse: SHORT_MONTH_PARSE_PATTERNS,
    monthsRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i,
    monthsShortRegex: /^(जनवरी|जन\.?|फ़रवरी|फरवरी|फ़र\.?|मार्च?|अप्रैल|अप्रै\.?|मई?|जून?|जुलाई|जुल\.?|अगस्त|अग\.?|सितम्बर|सितंबर|सित\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर|नव\.?|दिसम्बर|दिसंबर|दिस\.?)/i,
    monthsStrictRegex: /^(जनवरी?|फ़रवरी|फरवरी?|मार्च?|अप्रैल?|मई?|जून?|जुलाई?|अगस्त?|सितम्बर|सितंबर|सित?\.?|अक्टूबर|अक्टू\.?|नवम्बर|नवंबर?|दिसम्बर|दिसंबर?)/i,
    monthsShortStrictRegex: /^(जन\.?|फ़र\.?|मार्च?|अप्रै\.?|मई?|जून?|जुल\.?|अग\.?|सित\.?|अक्टू\.?|नव\.?|दिस\.?)/i,
    calendar: {
      sameDay: "[आज] LT",
      nextDay: "[कल] LT",
      nextWeek: "dddd, LT",
      lastDay: "[कल] LT",
      lastWeek: "[पिछले] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s में",
      past: "%s पहले",
      s: "कुछ ही क्षण",
      ss: "%d सेकंड",
      m: "एक मिनट",
      mm: "%d मिनट",
      h: "एक घंटा",
      hh: "%d घंटे",
      d: "एक दिन",
      dd: "%d दिन",
      M: "एक महीने",
      MM: "%d महीने",
      y: "एक वर्ष",
      yy: "%d वर्ष"
    },
    preparse: (text: string): string => {
      return text.replace(/[१२३४५६७८९०]/g, (digit: string): string => {
        return DEVANAGARI_TO_ARABIC[digit];
      });
    },
    postformat: (text: string): string => {
      return text.replace(/\d/g, (digit: string): string => {
        return ARABIC_TO_DEVANAGARI[digit];
      });
    },
    meridiemParse: /रात|सुबह|दोपहर|शाम/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      if (hour === HOUR_NOON) {
        hour = HOUR_MIDNIGHT;
      }
      
      if (meridiem === "रात") {
        return hour < HOUR_EARLY_MORNING ? hour : hour + HOUR_NOON;
      } else if (meridiem === "सुबह") {
        return hour;
      } else if (meridiem === "दोपहर") {
        return hour >= HOUR_MORNING_END ? hour : hour + HOUR_NOON;
      } else if (meridiem === "शाम") {
        return hour + HOUR_NOON;
      }
      
      return undefined;
    },
    meridiem: (hour: number, _minute: number, _isLowercase: boolean): string => {
      if (hour < HOUR_EARLY_MORNING) {
        return "रात";
      } else if (hour < HOUR_MORNING_END) {
        return "सुबह";
      } else if (hour < HOUR_AFTERNOON_END) {
        return "दोपहर";
      } else if (hour < HOUR_EVENING_END) {
        return "शाम";
      } else {
        return "रात";
      }
    },
    week: {
      dow: WEEK_START_DAY,
      doy: DAY_OF_YEAR
    }
  });
}