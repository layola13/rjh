import moment from 'moment';

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
    w: string;
    ww: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

const bgLocale: LocaleSpecification = {
  months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
  monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
  weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
  weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "D.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY H:mm",
    LLLL: "dddd, D MMMM YYYY H:mm"
  },
  calendar: {
    sameDay: "[Днес в] LT",
    nextDay: "[Утре в] LT",
    nextWeek: "dddd [в] LT",
    lastDay: "[Вчера в] LT",
    lastWeek: function(this: moment.Moment): string {
      switch (this.day()) {
        case 0:
        case 3:
        case 6:
          return "[Миналата] dddd [в] LT";
        case 1:
        case 2:
        case 4:
        case 5:
          return "[Миналия] dddd [в] LT";
        default:
          return "[Миналия] dddd [в] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "след %s",
    past: "преди %s",
    s: "няколко секунди",
    ss: "%d секунди",
    m: "минута",
    mm: "%d минути",
    h: "час",
    hh: "%d часа",
    d: "ден",
    dd: "%d дена",
    w: "седмица",
    ww: "%d седмици",
    M: "месец",
    MM: "%d месеца",
    y: "година",
    yy: "%d години"
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
  ordinal: (num: number): string => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (num === 0) {
      return `${num}-ев`;
    }
    if (lastTwoDigits === 0) {
      return `${num}-ен`;
    }
    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
      return `${num}-ти`;
    }
    if (lastDigit === 1) {
      return `${num}-ви`;
    }
    if (lastDigit === 2) {
      return `${num}-ри`;
    }
    if (lastDigit === 7 || lastDigit === 8) {
      return `${num}-ми`;
    }
    return `${num}-ти`;
  },
  week: {
    dow: 1,
    doy: 7
  }
};

moment.defineLocale("bg", bgLocale);

export default bgLocale;