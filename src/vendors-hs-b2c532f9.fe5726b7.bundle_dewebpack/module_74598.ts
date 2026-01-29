import moment from 'moment';

interface MeridiemParseResult {
  hour: number;
  meridiem: string;
}

interface LocaleSpecification {
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
    l: string;
    ll: string;
    lll: string;
    llll: string;
  };
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
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, period: string) => string;
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
}

const NOON_HOUR = 12;
const MORNING_END_TIME = 600;
const BREAKFAST_END_TIME = 900;
const LATE_MORNING_END_TIME = 1130;
const NOON_END_TIME = 1230;
const EVENING_START_TIME = 1800;
const NOON_THRESHOLD = 11;

moment.defineLocale('zh-mo', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日 HH:mm',
    LLLL: 'YYYY年M月D日dddd HH:mm',
    l: 'D/M/YYYY',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: (hour: number, meridiem: string): number | undefined => {
    let adjustedHour = hour;
    
    if (hour === NOON_HOUR) {
      adjustedHour = 0;
    }
    
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return adjustedHour;
    }
    
    if (meridiem === '中午') {
      return adjustedHour >= NOON_THRESHOLD ? adjustedHour : adjustedHour + NOON_HOUR;
    }
    
    if (meridiem === '下午' || meridiem === '晚上') {
      return adjustedHour + NOON_HOUR;
    }
    
    return undefined;
  },
  meridiem: (hour: number, minute: number, isLower: boolean): string => {
    const timeValue = 100 * hour + minute;
    
    if (timeValue < MORNING_END_TIME) {
      return '凌晨';
    }
    if (timeValue < BREAKFAST_END_TIME) {
      return '早上';
    }
    if (timeValue < LATE_MORNING_END_TIME) {
      return '上午';
    }
    if (timeValue < NOON_END_TIME) {
      return '中午';
    }
    if (timeValue < EVENING_START_TIME) {
      return '下午';
    }
    return '晚上';
  },
  calendar: {
    sameDay: '[今天] LT',
    nextDay: '[明天] LT',
    nextWeek: '[下]dddd LT',
    lastDay: '[昨天] LT',
    lastWeek: '[上]dddd LT',
    sameElse: 'L'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
  ordinal: (num: number, period: string): string => {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return `${num}日`;
      case 'M':
        return `${num}月`;
      case 'w':
      case 'W':
        return `${num}週`;
      default:
        return num.toString();
    }
  },
  relativeTime: {
    future: '%s內',
    past: '%s前',
    s: '幾秒',
    ss: '%d 秒',
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
    d: '1 天',
    dd: '%d 天',
    M: '1 個月',
    MM: '%d 個月',
    y: '1 年',
    yy: '%d 年'
  }
} as LocaleSpecification);

export default moment.locales();