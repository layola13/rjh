import moment from 'moment';

interface LocaleConfiguration {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
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
    w: string;
    ww: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
}

const PM_MARKER = 'หลังเที่ยง';
const AM_MARKER = 'ก่อนเที่ยง';
const NOON_HOUR = 12;

const thaiLocaleConfig: LocaleConfiguration = {
  months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
  monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
  monthsParseExact: true,
  weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
  weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'),
  weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY เวลา H:mm',
    LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
  },
  meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
  isPM: (input: string): boolean => {
    return input === PM_MARKER;
  },
  meridiem: (hour: number, minute: number, isLower: boolean): string => {
    return hour < NOON_HOUR ? AM_MARKER : PM_MARKER;
  },
  calendar: {
    sameDay: '[วันนี้ เวลา] LT',
    nextDay: '[พรุ่งนี้ เวลา] LT',
    nextWeek: 'dddd[หน้า เวลา] LT',
    lastDay: '[เมื่อวานนี้ เวลา] LT',
    lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'อีก %s',
    past: '%sที่แล้ว',
    s: 'ไม่กี่วินาที',
    ss: '%d วินาที',
    m: '1 นาที',
    mm: '%d นาที',
    h: '1 ชั่วโมง',
    hh: '%d ชั่วโมง',
    d: '1 วัน',
    dd: '%d วัน',
    w: '1 สัปดาห์',
    ww: '%d สัปดาห์',
    M: '1 เดือน',
    MM: '%d เดือน',
    y: '1 ปี',
    yy: '%d ปี'
  }
};

moment.defineLocale('th', thaiLocaleConfig);

export default thaiLocaleConfig;