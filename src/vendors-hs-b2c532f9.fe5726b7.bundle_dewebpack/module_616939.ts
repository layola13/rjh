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
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: () => string;
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
  ordinal: (dayOfMonth: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

function defineOrdinal(dayOfMonth: number): string {
  const lastDigit = dayOfMonth % 10;
  const lastTwoDigits = dayOfMonth % 100;

  if (dayOfMonth === 0) {
    return `${dayOfMonth}-ев`;
  }

  if (lastTwoDigits === 0) {
    return `${dayOfMonth}-ен`;
  }

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return `${dayOfMonth}-ти`;
  }

  if (lastDigit === 1) {
    return `${dayOfMonth}-ви`;
  }

  if (lastDigit === 2) {
    return `${dayOfMonth}-ри`;
  }

  if (lastDigit === 7 || lastDigit === 8) {
    return `${dayOfMonth}-ми`;
  }

  return `${dayOfMonth}-ти`;
}

function getLastWeekFormat(this: moment.Moment): string {
  const dayOfWeek = this.day();

  switch (dayOfWeek) {
    case 0:
    case 3:
    case 6:
      return '[Изминатата] dddd [во] LT';
    case 1:
    case 2:
    case 4:
    case 5:
      return '[Изминатиот] dddd [во] LT';
    default:
      return '[Изминатиот] dddd [во] LT';
  }
}

const macedonianLocale: MomentLocale = {
  months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
  monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
  weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
  weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
  weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  calendar: {
    sameDay: '[Денес во] LT',
    nextDay: '[Утре во] LT',
    nextWeek: '[Во] dddd [во] LT',
    lastDay: '[Вчера во] LT',
    lastWeek: getLastWeekFormat,
    sameElse: 'L'
  },
  relativeTime: {
    future: 'за %s',
    past: 'пред %s',
    s: 'неколку секунди',
    ss: '%d секунди',
    m: 'една минута',
    mm: '%d минути',
    h: 'еден час',
    hh: '%d часа',
    d: 'еден ден',
    dd: '%d дена',
    M: 'еден месец',
    MM: '%d месеци',
    y: 'една година',
    yy: '%d години'
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
  ordinal: defineOrdinal,
  week: {
    dow: 1,
    doy: 7
  }
};

moment.defineLocale('mk', macedonianLocale);

export default macedonianLocale;