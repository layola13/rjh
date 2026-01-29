import moment from 'moment';

interface RelativeTimeFunction {
  (count: number): string;
}

interface MeridiemFunction {
  (hour: number, minute: number, isLower: boolean): string;
}

interface IsPMFunction {
  (input: string): boolean;
}

/**
 * Moment.js locale configuration for Hebrew (he)
 */
moment.defineLocale('he', {
  months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
  monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
  weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
  weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[היום ב־]LT',
    nextDay: '[מחר ב־]LT',
    nextWeek: 'dddd [בשעה] LT',
    lastDay: '[אתמול ב־]LT',
    lastWeek: '[ביום] dddd [האחרון בשעה] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'בעוד %s',
    past: 'לפני %s',
    s: 'מספר שניות',
    ss: '%d שניות',
    m: 'דקה',
    mm: '%d דקות',
    h: 'שעה',
    hh: (count: number): string => {
      return count === 2 ? 'שעתיים' : `${count} שעות`;
    },
    d: 'יום',
    dd: (count: number): string => {
      return count === 2 ? 'יומיים' : `${count} ימים`;
    },
    M: 'חודש',
    MM: (count: number): string => {
      return count === 2 ? 'חודשיים' : `${count} חודשים`;
    },
    y: 'שנה',
    yy: (count: number): string => {
      if (count === 2) {
        return 'שנתיים';
      }
      if (count % 10 === 0 && count !== 10) {
        return `${count} שנה`;
      }
      return `${count} שנים`;
    }
  },
  meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
  isPM: (input: string): boolean => {
    return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
  },
  meridiem: (hour: number, minute: number, isLower: boolean): string => {
    if (hour < 5) {
      return 'לפנות בוקר';
    }
    if (hour < 10) {
      return 'בבוקר';
    }
    if (hour < 12) {
      return isLower ? 'לפנה"צ' : 'לפני הצהריים';
    }
    if (hour < 18) {
      return isLower ? 'אחה"צ' : 'אחרי הצהריים';
    }
    return 'בערב';
  }
});