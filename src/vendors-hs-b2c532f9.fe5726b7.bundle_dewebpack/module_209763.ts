import moment from 'moment';

/**
 * Moment.js 中文（简体）语言环境配置
 */
interface LocaleConfig {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: Record<string, string>;
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: (this: moment.Moment, now: moment.Moment) => string;
    lastDay: string;
    lastWeek: (this: moment.Moment, now: moment.Moment) => string;
    sameElse: string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, token: string) => string;
  relativeTime: Record<string, string>;
  week: {
    dow: number;
    doy: number;
  };
}

const MERIDIEM_THRESHOLD_DAWN = 600;
const MERIDIEM_THRESHOLD_MORNING = 900;
const MERIDIEM_THRESHOLD_FORENOON = 1130;
const MERIDIEM_THRESHOLD_NOON = 1230;
const MERIDIEM_THRESHOLD_AFTERNOON = 1800;
const NOON_HOUR = 12;
const HALF_DAY_HOURS = 12;
const MORNING_CUTOFF_HOUR = 11;

/**
 * 根据小时和子午线标识返回24小时制的小时数
 */
function getMeridiemHour(hour: number, meridiem: string): number {
  let adjustedHour = hour;
  
  if (hour === NOON_HOUR) {
    adjustedHour = 0;
  }
  
  if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
    return adjustedHour;
  }
  
  if (meridiem === '下午' || meridiem === '晚上') {
    return adjustedHour + HALF_DAY_HOURS;
  }
  
  return adjustedHour >= MORNING_CUTOFF_HOUR ? adjustedHour : adjustedHour + HALF_DAY_HOURS;
}

/**
 * 根据小时和分钟返回中文时段
 */
function getMeridiem(hour: number, minute: number, isLowercase: boolean): string {
  const timeValue = 100 * hour + minute;
  
  if (timeValue < MERIDIEM_THRESHOLD_DAWN) {
    return '凌晨';
  }
  if (timeValue < MERIDIEM_THRESHOLD_MORNING) {
    return '早上';
  }
  if (timeValue < MERIDIEM_THRESHOLD_FORENOON) {
    return '上午';
  }
  if (timeValue < MERIDIEM_THRESHOLD_NOON) {
    return '中午';
  }
  if (timeValue < MERIDIEM_THRESHOLD_AFTERNOON) {
    return '下午';
  }
  return '晚上';
}

/**
 * 计算下周日期的格式化模板
 */
function getNextWeekFormat(this: moment.Moment, now: moment.Moment): string {
  return now.week() !== this.week() ? '[下]dddLT' : '[本]dddLT';
}

/**
 * 计算上周日期的格式化模板
 */
function getLastWeekFormat(this: moment.Moment, now: moment.Moment): string {
  return this.week() !== now.week() ? '[上]dddLT' : '[本]dddLT';
}

/**
 * 根据数字和标记返回序数词
 */
function getOrdinal(num: number, token: string): string {
  switch (token) {
    case 'd':
    case 'D':
    case 'DDD':
      return `${num}日`;
    case 'M':
      return `${num}月`;
    case 'w':
    case 'W':
      return `${num}周`;
    default:
      return String(num);
  }
}

const localeConfig: LocaleConfig = {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah点mm分',
    LLLL: 'YYYY年M月D日ddddAh点mm分',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: getMeridiemHour,
  meridiem: getMeridiem,
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: getNextWeekFormat,
    lastDay: '[昨天]LT',
    lastWeek: getLastWeekFormat,
    sameElse: 'L'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: getOrdinal,
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    ss: '%d 秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    w: '1 周',
    ww: '%d 周',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  week: {
    dow: 1,
    doy: 4
  }
};

moment.defineLocale('zh-cn', localeConfig);

export default localeConfig;