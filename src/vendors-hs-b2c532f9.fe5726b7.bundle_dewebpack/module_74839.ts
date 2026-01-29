import moment from 'moment';

interface LocaleConfig {
  months: string;
  monthsShort: string;
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
  weekdaysParseExact: boolean;
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
  ordinal: (num: number) => string;
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
}

const MERIDIEM_AFTERNOON_LOWER = 'ප.ව.';
const MERIDIEM_AFTERNOON_UPPER = 'පස් වරු';
const MERIDIEM_MORNING_LOWER = 'පෙ.ව.';
const MERIDIEM_MORNING_UPPER = 'පෙර වරු';
const NOON_HOUR = 11;

/**
 * Moment.js locale configuration for Sinhala (si)
 */
function defineSinhalaLocale(momentInstance: typeof moment): typeof moment {
  const localeConfig: LocaleConfig = {
    months: 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
    monthsShort: 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
    weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
    weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
    weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'a h:mm',
      LTS: 'a h:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY MMMM D',
      LLL: 'YYYY MMMM D, a h:mm',
      LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
    },
    calendar: {
      sameDay: '[අද] LT[ට]',
      nextDay: '[හෙට] LT[ට]',
      nextWeek: 'dddd LT[ට]',
      lastDay: '[ඊයේ] LT[ට]',
      lastWeek: '[පසුගිය] dddd LT[ට]',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%sකින්',
      past: '%sකට පෙර',
      s: 'තත්පර කිහිපය',
      ss: 'තත්පර %d',
      m: 'මිනිත්තුව',
      mm: 'මිනිත්තු %d',
      h: 'පැය',
      hh: 'පැය %d',
      d: 'දිනය',
      dd: 'දින %d',
      M: 'මාසය',
      MM: 'මාස %d',
      y: 'වසර',
      yy: 'වසර %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
    ordinal: (num: number): string => {
      return `${num} වැනි`;
    },
    meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
    isPM: (input: string): boolean => {
      return input === MERIDIEM_AFTERNOON_LOWER || input === MERIDIEM_AFTERNOON_UPPER;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      if (hour > NOON_HOUR) {
        return isLower ? MERIDIEM_AFTERNOON_LOWER : MERIDIEM_AFTERNOON_UPPER;
      } else {
        return isLower ? MERIDIEM_MORNING_LOWER : MERIDIEM_MORNING_UPPER;
      }
    }
  };

  return momentInstance.defineLocale('si', localeConfig);
}

export default defineSinhalaLocale(moment);