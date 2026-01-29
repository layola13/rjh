interface NumberMapping {
  [key: string]: string;
}

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
  ordinal: string;
  preparse: (input: string) => string;
  postformat: (input: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): unknown;
}

const ARABIC_TO_KHMER_DIGITS: NumberMapping = {
  "1": "១",
  "2": "២",
  "3": "៣",
  "4": "៤",
  "5": "៥",
  "6": "៦",
  "7": "៧",
  "8": "៨",
  "9": "៩",
  "0": "០"
};

const KHMER_TO_ARABIC_DIGITS: NumberMapping = {
  "១": "1",
  "២": "2",
  "៣": "3",
  "៤": "4",
  "៥": "5",
  "៦": "6",
  "៧": "7",
  "៨": "8",
  "៩": "9",
  "០": "0"
};

const AFTERNOON_MERIDIEM = "ល្ងាច";
const MORNING_MERIDIEM = "ព្រឹក";
const NOON_HOUR_THRESHOLD = 12;

export function defineKhmerLocale(moment: Moment): unknown {
  return moment.defineLocale("km", {
    months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
    monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
    weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
    weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"),
    weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    meridiemParse: /ព្រឹក|ល្ងាច/,
    isPM: (input: string): boolean => {
      return input === AFTERNOON_MERIDIEM;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < NOON_HOUR_THRESHOLD ? MORNING_MERIDIEM : AFTERNOON_MERIDIEM;
    },
    calendar: {
      sameDay: "[ថ្ងៃនេះ ម៉ោង] LT",
      nextDay: "[ស្អែក ម៉ោង] LT",
      nextWeek: "dddd [ម៉ោង] LT",
      lastDay: "[ម្សិលមិញ ម៉ោង] LT",
      lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sទៀត",
      past: "%sមុន",
      s: "ប៉ុន្មានវិនាទី",
      ss: "%d វិនាទី",
      m: "មួយនាទី",
      mm: "%d នាទី",
      h: "មួយម៉ោង",
      hh: "%d ម៉ោង",
      d: "មួយថ្ងៃ",
      dd: "%d ថ្ងៃ",
      M: "មួយខែ",
      MM: "%d ខែ",
      y: "មួយឆ្នាំ",
      yy: "%d ឆ្នាំ"
    },
    dayOfMonthOrdinalParse: /ទី\d{1,2}/,
    ordinal: "ទី%d",
    preparse: (input: string): string => {
      return input.replace(/[១២៣៤៥៦៧៨៩០]/g, (match: string): string => {
        return KHMER_TO_ARABIC_DIGITS[match];
      });
    },
    postformat: (input: string): string => {
      return input.replace(/\d/g, (match: string): string => {
        return ARABIC_TO_KHMER_DIGITS[match];
      });
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}