import moment from 'moment';

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
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number;
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
  ordinal: (num: number, period: string) => string | number;
  preparse: (text: string) => string;
  postformat: (text: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

const TWELVE_HOURS = 12;
const ELEVEN_HOURS = 11;
const EARLY_MORNING_THRESHOLD = 600;
const MORNING_THRESHOLD = 900;
const BEFORE_NOON_THRESHOLD = 1130;
const NOON_THRESHOLD = 1230;
const AFTERNOON_THRESHOLD = 1800;
const HUNDRED = 100;

/**
 * Moment.js locale configuration for Uyghur (China)
 * Language: ug-cn
 */
const ugCnLocale: MomentLocale = moment.defineLocale('ug-cn', {
  months: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split('_'),
  monthsShort: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split('_'),
  weekdays: 'يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە'.split('_'),
  weekdaysShort: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
  weekdaysMin: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY-يىلىM-ئاينىڭD-كۈنى',
    LLL: 'YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm',
    LLLL: 'dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm'
  },
  meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
  meridiemHour: (hour: number, meridiem: string): number => {
    if (hour === TWELVE_HOURS) {
      hour = 0;
    }
    
    if (meridiem === 'يېرىم كېچە' || meridiem === 'سەھەر' || meridiem === 'چۈشتىن بۇرۇن') {
      return hour;
    }
    
    if (meridiem === 'چۈشتىن كېيىن' || meridiem === 'كەچ') {
      return hour + TWELVE_HOURS;
    }
    
    return hour >= ELEVEN_HOURS ? hour : hour + TWELVE_HOURS;
  },
  meridiem: (hour: number, minute: number, isLower: boolean): string => {
    const timeValue = HUNDRED * hour + minute;
    
    if (timeValue < EARLY_MORNING_THRESHOLD) {
      return 'يېرىم كېچە';
    } else if (timeValue < MORNING_THRESHOLD) {
      return 'سەھەر';
    } else if (timeValue < BEFORE_NOON_THRESHOLD) {
      return 'چۈشتىن بۇرۇن';
    } else if (timeValue < NOON_THRESHOLD) {
      return 'چۈش';
    } else if (timeValue < AFTERNOON_THRESHOLD) {
      return 'چۈشتىن كېيىن';
    } else {
      return 'كەچ';
    }
  },
  calendar: {
    sameDay: '[بۈگۈن سائەت] LT',
    nextDay: '[ئەتە سائەت] LT',
    nextWeek: '[كېلەركى] dddd [سائەت] LT',
    lastDay: '[تۆنۈگۈن] LT',
    lastWeek: '[ئالدىنقى] dddd [سائەت] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s كېيىن',
    past: '%s بۇرۇن',
    s: 'نەچچە سېكونت',
    ss: '%d سېكونت',
    m: 'بىر مىنۇت',
    mm: '%d مىنۇت',
    h: 'بىر سائەت',
    hh: '%d سائەت',
    d: 'بىر كۈن',
    dd: '%d كۈن',
    M: 'بىر ئاي',
    MM: '%d ئاي',
    y: 'بىر يىل',
    yy: '%d يىل'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
  ordinal: (num: number, period: string): string | number => {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return `${num}-كۈنى`;
      case 'w':
      case 'W':
        return `${num}-ھەپتە`;
      default:
        return num;
    }
  },
  preparse: (text: string): string => {
    return text.replace(/،/g, ',');
  },
  postformat: (text: string): string => {
    return text.replace(/,/g, '،');
  },
  week: {
    dow: 1,
    doy: 7
  }
});

export default ugCnLocale;