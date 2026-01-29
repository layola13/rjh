import moment from 'moment';

interface DigitMap {
  [key: string]: string;
}

const ARABIC_TO_WESTERN_DIGITS: DigitMap = {
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٠': '0'
};

const WESTERN_TO_ARABIC_DIGITS: DigitMap = {
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
  '0': '٠'
};

const KURDISH_MONTHS: string[] = [
  'کانونی دووەم',
  'شوبات',
  'ئازار',
  'نیسان',
  'ئایار',
  'حوزەیران',
  'تەمموز',
  'ئاب',
  'ئەیلوول',
  'تشرینی یەكەم',
  'تشرینی دووەم',
  'كانونی یەکەم'
];

const NOON_HOUR_THRESHOLD = 12;
const WEEK_START_DAY = 6;
const DAY_OF_YEAR = 12;

/**
 * Moment.js locale configuration for Kurdish (ku)
 */
moment.defineLocale('ku', {
  months: KURDISH_MONTHS,
  monthsShort: KURDISH_MONTHS,
  weekdays: 'یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌'.split('_'),
  weekdaysShort: 'یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌'.split('_'),
  weekdaysMin: 'ی_د_س_چ_پ_ه_ش'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  meridiemParse: /ئێواره‌|به‌یانی/,
  isPM: (input: string): boolean => {
    return /ئێواره‌/.test(input);
  },
  meridiem: (hour: number, minute: number, isLower: boolean): string => {
    return hour < NOON_HOUR_THRESHOLD ? 'به‌یانی' : 'ئێواره‌';
  },
  calendar: {
    sameDay: '[ئه‌مرۆ كاتژمێر] LT',
    nextDay: '[به‌یانی كاتژمێر] LT',
    nextWeek: 'dddd [كاتژمێر] LT',
    lastDay: '[دوێنێ كاتژمێر] LT',
    lastWeek: 'dddd [كاتژمێر] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'له‌ %s',
    past: '%s',
    s: 'چه‌ند چركه‌یه‌ك',
    ss: 'چركه‌ %d',
    m: 'یه‌ك خوله‌ك',
    mm: '%d خوله‌ك',
    h: 'یه‌ك كاتژمێر',
    hh: '%d كاتژمێر',
    d: 'یه‌ك ڕۆژ',
    dd: '%d ڕۆژ',
    M: 'یه‌ك مانگ',
    MM: '%d مانگ',
    y: 'یه‌ك ساڵ',
    yy: '%d ساڵ'
  },
  preparse: (input: string): string => {
    return input
      .replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match: string): string => {
        return ARABIC_TO_WESTERN_DIGITS[match];
      })
      .replace(/،/g, ', ');
  },
  postformat: (input: string): string => {
    return input
      .replace(/\d/g, (match: string): string => {
        return WESTERN_TO_ARABIC_DIGITS[match];
      })
      .replace(/, /g, '،');
  },
  week: {
    dow: WEEK_START_DAY,
    doy: DAY_OF_YEAR
  }
});

export default moment;