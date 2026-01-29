import moment from 'moment';

interface DigitMap {
  [key: string]: string;
}

const BENGALI_DIGITS: DigitMap = {
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
  '0': '০'
};

const ARABIC_DIGITS: DigitMap = {
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
  '০': '0'
};

const HOUR_MIDNIGHT = 0;
const HOUR_MORNING_START = 4;
const HOUR_NOON_START = 10;
const HOUR_AFTERNOON_START = 17;
const HOUR_EVENING_START = 20;
const HOURS_IN_HALF_DAY = 12;
const NOON_HOUR_THRESHOLD = 5;

/**
 * Converts Bengali digits to Arabic digits
 */
function preparseDigits(text: string): string {
  return text.replace(/[১২৩৪৫৬৭৮৯০]/g, (match: string): string => {
    return ARABIC_DIGITS[match];
  });
}

/**
 * Converts Arabic digits to Bengali digits
 */
function postformatDigits(text: string): string {
  return text.replace(/\d/g, (match: string): string => {
    return BENGALI_DIGITS[match];
  });
}

/**
 * Determines the hour in 24-hour format based on meridiem
 */
function getMeridiemHour(hour: number, meridiem: string): number {
  if (hour === HOURS_IN_HALF_DAY) {
    hour = HOUR_MIDNIGHT;
  }
  
  if (
    (meridiem === 'রাত' && hour >= HOUR_MORNING_START) ||
    (meridiem === 'দুপুর' && hour < NOON_HOUR_THRESHOLD) ||
    meridiem === 'বিকাল'
  ) {
    return hour + HOURS_IN_HALF_DAY;
  }
  
  return hour;
}

/**
 * Returns the appropriate Bengali meridiem based on hour
 */
function getMeridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour < HOUR_MORNING_START) {
    return 'রাত';
  } else if (hour < HOUR_NOON_START) {
    return 'সকাল';
  } else if (hour < HOUR_AFTERNOON_START) {
    return 'দুপুর';
  } else if (hour < HOUR_EVENING_START) {
    return 'বিকাল';
  } else {
    return 'রাত';
  }
}

moment.defineLocale('bn', {
  months: 'জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
  monthsShort: 'জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
  weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
  weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
  weekdaysMin: 'রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি'.split('_'),
  longDateFormat: {
    LT: 'A h:mm সময়',
    LTS: 'A h:mm:ss সময়',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm সময়',
    LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
  },
  calendar: {
    sameDay: '[আজ] LT',
    nextDay: '[আগামীকাল] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[গতকাল] LT',
    lastWeek: '[গত] dddd, LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s পরে',
    past: '%s আগে',
    s: 'কয়েক সেকেন্ড',
    ss: '%d সেকেন্ড',
    m: 'এক মিনিট',
    mm: '%d মিনিট',
    h: 'এক ঘন্টা',
    hh: '%d ঘন্টা',
    d: 'এক দিন',
    dd: '%d দিন',
    M: 'এক মাস',
    MM: '%d মাস',
    y: 'এক বছর',
    yy: '%d বছর'
  },
  preparse: preparseDigits,
  postformat: postformatDigits,
  meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
  meridiemHour: getMeridiemHour,
  meridiem: getMeridiem,
  week: {
    dow: 0,
    doy: 6
  }
});

export default moment;