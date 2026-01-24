/**
 * Moment.js locale configuration for Belarusian (be)
 * @module BelarusianLocale
 */

import { Moment } from 'moment';

/**
 * Locale configuration interface for moment.js
 */
interface LocaleConfiguration {
  /** Month names configuration */
  months: {
    /** Month names in format case (genitive) */
    format: string[];
    /** Month names in standalone case (nominative) */
    standalone: string[];
  };
  /** Abbreviated month names */
  monthsShort: string[];
  /** Weekday names configuration */
  weekdays: {
    /** Weekday names in format case (accusative) */
    format: string[];
    /** Weekday names in standalone case (nominative) */
    standalone: string[];
    /** Regex pattern to determine format vs standalone usage */
    isFormat: RegExp;
  };
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format tokens */
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  /** Calendar display configuration */
  calendar: {
    sameDay: string;
    nextDay: string;
    lastDay: string;
    nextWeek: () => string;
    lastWeek: (this: Moment) => string;
    sameElse: string;
  };
  /** Relative time configuration */
  relativeTime: {
    future: string;
    past: string;
    s: string;
    m: RelativeTimeFunction;
    mm: RelativeTimeFunction;
    h: RelativeTimeFunction;
    hh: RelativeTimeFunction;
    d: string;
    dd: RelativeTimeFunction;
    M: string;
    MM: RelativeTimeFunction;
    y: string;
    yy: RelativeTimeFunction;
  };
  /** Meridiem parsing pattern */
  meridiemParse: RegExp;
  /** Determines if time is PM */
  isPM: (input: string) => boolean;
  /** Returns meridiem string for given hour */
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  /** Day of month ordinal parsing pattern */
  dayOfMonthOrdinalParse: RegExp;
  /** Returns ordinal string for a number */
  ordinal: (num: number, token: string) => string;
  /** Week configuration */
  week: {
    /** First day of week (0=Sunday, 1=Monday) */
    dow: number;
    /** First week of year calculation day */
    doy: number;
  };
}

/**
 * Function type for relative time formatting
 */
type RelativeTimeFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string
) => string;

/**
 * Moment.js instance interface with defineLocale method
 */
interface MomentStatic {
  defineLocale(locale: string, config: LocaleConfiguration): void;
}

/**
 * Selects the correct plural form for Belarusian based on the number
 * @param words - String containing three forms separated by underscore: "form1_form2_form3"
 * @param number - The number to determine plural form for
 * @returns The appropriate word form
 */
function selectPluralForm(words: string, number: number): string {
  const forms = words.split('_');
  
  if (number % 10 === 1 && number % 100 !== 11) {
    return forms[0];
  }
  
  if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20)
  ) {
    return forms[1];
  }
  
  return forms[2];
}

/**
 * Formats relative time strings with proper Belarusian plural forms
 * @param value - The numeric value
 * @param withoutSuffix - Whether to use nominative (true) or accusative (false) case
 * @param key - The unit key (ss, mm, hh, dd, MM, yy, m, h)
 * @returns Formatted relative time string
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string
): string {
  const units: Record<string, string> = {
    ss: withoutSuffix
      ? 'секунда_секунды_секунд'
      : 'секунду_секунды_секунд',
    mm: withoutSuffix
      ? 'хвіліна_хвіліны_хвілін'
      : 'хвіліну_хвіліны_хвілін',
    hh: withoutSuffix
      ? 'гадзіна_гадзіны_гадзін'
      : 'гадзіну_гадзіны_гадзін',
    dd: 'дзень_дні_дзён',
    MM: 'месяц_месяцы_месяцаў',
    yy: 'год_гады_гадоў',
  };

  if (key === 'm') {
    return withoutSuffix ? 'хвіліна' : 'хвіліну';
  }
  
  if (key === 'h') {
    return withoutSuffix ? 'гадзіна' : 'гадзіну';
  }

  return `${value} ${selectPluralForm(units[key], value)}`;
}

/**
 * Configures Belarusian locale for moment.js
 * @param moment - The moment.js instance
 */
export function initializeBelarusianLocale(moment: MomentStatic): void {
  moment.defineLocale('be', {
    months: {
      format: [
        'студзеня', 'лютага', 'сакавіка', 'красавіка', 'траўня', 'чэрвеня',
        'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'
      ],
      standalone: [
        'студзень', 'люты', 'сакавік', 'красавік', 'травень', 'чэрвень',
        'ліпень', 'жнівень', 'верасень', 'кастрычнік', 'лістапад', 'снежань'
      ],
    },
    monthsShort: [
      'студ', 'лют', 'сак', 'крас', 'трав', 'чэрв',
      'ліп', 'жнів', 'вер', 'каст', 'ліст', 'снеж'
    ],
    weekdays: {
      format: [
        'нядзелю', 'панядзелак', 'аўторак', 'сераду',
        'чацвер', 'пятніцу', 'суботу'
      ],
      standalone: [
        'нядзеля', 'панядзелак', 'аўторак', 'серада',
        'чацвер', 'пятніца', 'субота'
      ],
      isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/,
    },
    weekdaysShort: ['нд', 'пн', 'ат', 'ср', 'чц', 'пт', 'сб'],
    weekdaysMin: ['нд', 'пн', 'ат', 'ср', 'чц', 'пт', 'сб'],
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY г.',
      LLL: 'D MMMM YYYY г., HH:mm',
      LLLL: 'dddd, D MMMM YYYY г., HH:mm',
    },
    calendar: {
      sameDay: '[Сёння ў] LT',
      nextDay: '[Заўтра ў] LT',
      lastDay: '[Учора ў] LT',
      nextWeek(): string {
        return '[У] dddd [ў] LT';
      },
      lastWeek(this: Moment): string {
        const dayOfWeek = this.day();
        
        switch (dayOfWeek) {
          case 0:
          case 3:
          case 5:
          case 6:
            return '[У мінулую] dddd [ў] LT';
          case 1:
          case 2:
          case 4:
            return '[У мінулы] dddd [ў] LT';
          default:
            return '[У мінулую] dddd [ў] LT';
        }
      },
      sameElse: 'L',
    },
    relativeTime: {
      future: 'праз %s',
      past: '%s таму',
      s: 'некалькі секунд',
      m: formatRelativeTime,
      mm: formatRelativeTime,
      h: formatRelativeTime,
      hh: formatRelativeTime,
      d: 'дзень',
      dd: formatRelativeTime,
      M: 'месяц',
      MM: formatRelativeTime,
      y: 'год',
      yy: formatRelativeTime,
    },
    meridiemParse: /ночы|раніцы|дня|вечара/,
    isPM(input: string): boolean {
      return /^(дня|вечара)$/.test(input);
    },
    meridiem(hour: number, minute: number, isLower: boolean): string {
      if (hour < 4) {
        return 'ночы';
      } else if (hour < 12) {
        return 'раніцы';
      } else if (hour < 17) {
        return 'дня';
      } else {
        return 'вечара';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
    ordinal(num: number, token: string): string {
      switch (token) {
        case 'M':
        case 'd':
        case 'DDD':
        case 'w':
        case 'W':
          if (
            (num % 10 !== 2 && num % 10 !== 3) ||
            num % 100 === 12 ||
            num % 100 === 13
          ) {
            return `${num}-ы`;
          }
          return `${num}-і`;
        case 'D':
          return `${num}-га`;
        default:
          return num.toString();
      }
    },
    week: {
      dow: 1,
      doy: 7,
    },
  });
}