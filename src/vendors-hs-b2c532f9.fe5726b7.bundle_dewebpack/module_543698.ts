import moment from 'moment';

interface PluralFormsMap {
  ss: string;
  mm: string;
  hh: string;
  dd: string;
  MM: string;
  yy: string;
}

type PluralUnit = 'ss' | 'mm' | 'hh' | 'dd' | 'MM' | 'yy';
type RelativeTimeUnit = 'm' | 'h' | PluralUnit;

/**
 * Formats relative time with proper Belarusian plural forms
 * @param value - The numeric value
 * @param withoutSuffix - Whether to use nominative case
 * @param unit - The time unit
 * @returns Formatted string with proper plural form
 */
function formatRelativeTime(value: number, withoutSuffix: boolean, unit: RelativeTimeUnit): string {
  if (unit === 'm') {
    return withoutSuffix ? 'хвіліна' : 'хвіліну';
  }
  
  if (unit === 'h') {
    return withoutSuffix ? 'гадзіна' : 'гадзіну';
  }

  const forms: PluralFormsMap = {
    ss: withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
    mm: withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
    hh: withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
    dd: 'дзень_дні_дзён',
    MM: 'месяц_месяцы_месяцаў',
    yy: 'год_гады_гадоў'
  };

  const parts = forms[unit as PluralUnit].split('_');
  const pluralForm = selectPluralForm(value, parts);

  return `${value} ${pluralForm}`;
}

/**
 * Selects appropriate plural form based on Belarusian grammar rules
 */
function selectPluralForm(value: number, forms: string[]): string {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }
  
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1];
  }
  
  return forms[2];
}

moment.defineLocale('be', {
  months: {
    format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
    standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
  },
  monthsShort: 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
  weekdays: {
    format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
    standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
    isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/
  },
  weekdaysShort: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
  weekdaysMin: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., HH:mm',
    LLLL: 'dddd, D MMMM YYYY г., HH:mm'
  },
  calendar: {
    sameDay: '[Сёння ў] LT',
    nextDay: '[Заўтра ў] LT',
    lastDay: '[Учора ў] LT',
    nextWeek(): string {
      return '[У] dddd [ў] LT';
    },
    lastWeek(): string {
      const dayOfWeek = this.day();
      
      if (dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 5 || dayOfWeek === 6) {
        return '[У мінулую] dddd [ў] LT';
      }
      
      return '[У мінулы] dddd [ў] LT';
    },
    sameElse: 'L'
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
    yy: formatRelativeTime
  },
  meridiemParse: /ночы|раніцы|дня|вечара/,
  isPM(input: string): boolean {
    return /^(дня|вечара)$/.test(input);
  },
  meridiem(hour: number, minute: number, isLower: boolean): string {
    if (hour < 4) {
      return 'ночы';
    }
    if (hour < 12) {
      return 'раніцы';
    }
    if (hour < 17) {
      return 'дня';
    }
    return 'вечара';
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
  ordinal(value: number, period: string): string {
    switch (period) {
      case 'M':
      case 'd':
      case 'DDD':
      case 'w':
      case 'W':
        return (value % 10 !== 2 && value % 10 !== 3) || value % 100 === 12 || value % 100 === 13
          ? `${value}-ы`
          : `${value}-і`;
      case 'D':
        return `${value}-га`;
      default:
        return value.toString();
    }
  },
  week: {
    dow: 1,
    doy: 7
  }
});