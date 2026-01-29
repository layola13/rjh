import moment from 'moment';

interface NumberMap {
  [key: string]: string;
}

const TIBETAN_TO_ARABIC: NumberMap = {
  "༡": "1",
  "༢": "2",
  "༣": "3",
  "༤": "4",
  "༥": "5",
  "༦": "6",
  "༧": "7",
  "༨": "8",
  "༩": "9",
  "༠": "0"
};

const ARABIC_TO_TIBETAN: NumberMap = {
  "1": "༡",
  "2": "༢",
  "3": "༣",
  "4": "༤",
  "5": "༥",
  "6": "༦",
  "7": "༧",
  "8": "༨",
  "9": "༩",
  "0": "༠"
};

const MERIDIEM_NIGHT = "མཚན་མོ";
const MERIDIEM_MORNING = "ཞོགས་ཀས";
const MERIDIEM_AFTERNOON = "ཉིན་གུང";
const MERIDIEM_EVENING = "དགོང་དག";

const HOUR_MIDNIGHT_END = 4;
const HOUR_MORNING_END = 10;
const HOUR_AFTERNOON_END = 17;
const HOUR_EVENING_END = 20;
const HOURS_IN_HALF_DAY = 12;

/**
 * Converts Tibetan numerals to Arabic numerals
 */
function preparse(input: string): string {
  return input.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, (match: string): string => {
    return TIBETAN_TO_ARABIC[match];
  });
}

/**
 * Converts Arabic numerals to Tibetan numerals
 */
function postformat(input: string): string {
  return input.replace(/\d/g, (match: string): string => {
    return ARABIC_TO_TIBETAN[match];
  });
}

/**
 * Adjusts hour based on meridiem period
 */
function meridiemHour(hour: number, meridiem: string): number {
  if (hour === HOURS_IN_HALF_DAY) {
    hour = 0;
  }
  
  if (
    (meridiem === MERIDIEM_NIGHT && hour >= HOUR_MIDNIGHT_END) ||
    (meridiem === MERIDIEM_AFTERNOON && hour < 5) ||
    meridiem === MERIDIEM_EVENING
  ) {
    return hour + HOURS_IN_HALF_DAY;
  }
  
  return hour;
}

/**
 * Returns the appropriate meridiem period for a given time
 */
function meridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour < HOUR_MIDNIGHT_END) {
    return MERIDIEM_NIGHT;
  } else if (hour < HOUR_MORNING_END) {
    return MERIDIEM_MORNING;
  } else if (hour < HOUR_AFTERNOON_END) {
    return MERIDIEM_AFTERNOON;
  } else if (hour < HOUR_EVENING_END) {
    return MERIDIEM_EVENING;
  } else {
    return MERIDIEM_NIGHT;
  }
}

moment.defineLocale("bo", {
  months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
  monthsShort: "ཟླ་1_ཟླ་2_ཟླ་3_ཟླ་4_ཟླ་5_ཟླ་6_ཟླ་7_ཟླ་8_ཟླ་9_ཟླ་10_ཟླ་11_ཟླ་12".split("_"),
  monthsShortRegex: /^(ཟླ་\d{1,2})/,
  monthsParseExact: true,
  weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),
  weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
  weekdaysMin: "ཉི_ཟླ_མིག_ལྷག_ཕུར_སངས_སྤེན".split("_"),
  longDateFormat: {
    LT: "A h:mm",
    LTS: "A h:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY, A h:mm",
    LLLL: "dddd, D MMMM YYYY, A h:mm"
  },
  calendar: {
    sameDay: "[དི་རིང] LT",
    nextDay: "[སང་ཉིན] LT",
    nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT",
    lastDay: "[ཁ་སང] LT",
    lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s ལ་",
    past: "%s སྔན་ལ",
    s: "ལམ་སང",
    ss: "%d སྐར་ཆ།",
    m: "སྐར་མ་གཅིག",
    mm: "%d སྐར་མ",
    h: "ཆུ་ཚོད་གཅིག",
    hh: "%d ཆུ་ཚོད",
    d: "ཉིན་གཅིག",
    dd: "%d ཉིན་",
    M: "ཟླ་བ་གཅིག",
    MM: "%d ཟླ་བ",
    y: "ལོ་གཅིག",
    yy: "%d ལོ"
  },
  preparse,
  postformat,
  meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
  meridiemHour,
  meridiem,
  week: {
    dow: 0,
    doy: 6
  }
});

export default moment;