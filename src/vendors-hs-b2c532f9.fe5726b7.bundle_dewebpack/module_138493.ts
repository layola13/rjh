import moment from 'moment';

interface TimeUnitTranslation {
  s: [string, string];
  ss: [string, string];
  m: [string, string];
  mm: [string, string];
  h: [string, string];
  hh: [string, string];
  d: [string, string];
  dd: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

type TimeUnit = keyof TimeUnitTranslation;

/**
 * Returns the appropriate translation for relative time units in Talossan locale
 * @param count - The number of units
 * @param withoutSuffix - Whether to include suffix
 * @param unit - The time unit (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time is in the future
 * @returns The translated string
 */
function relativeTimeTranslation(
  count: number,
  withoutSuffix: boolean,
  unit: TimeUnit,
  isFuture: boolean
): string {
  const translations: TimeUnitTranslation = {
    s: ["viensas secunds", "'iensas secunds"],
    ss: [`${count} secunds`, `${count} secunds`],
    m: ["'n míut", "'iens míut"],
    mm: [`${count} míuts`, `${count} míuts`],
    h: ["'n þora", "'iensa þora"],
    hh: [`${count} þoras`, `${count} þoras`],
    d: ["'n ziua", "'iensa ziua"],
    dd: [`${count} ziuas`, `${count} ziuas`],
    M: ["'n mes", "'iens mes"],
    MM: [`${count} mesen`, `${count} mesen`],
    y: ["'n ar", "'iens ar"],
    yy: [`${count} ars`, `${count} ars`]
  };

  return isFuture || withoutSuffix ? translations[unit][0] : translations[unit][1];
}

/**
 * Talossan (tzl) locale configuration for moment.js
 */
moment.defineLocale('tzl', {
  months: 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
  weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
  weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
  weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
  longDateFormat: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM [dallas] YYYY',
    LLL: 'D. MMMM [dallas] YYYY HH.mm',
    LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
  },
  meridiemParse: /d'o|d'a/i,
  isPM(meridiemString: string): boolean {
    return meridiemString.toLowerCase() === "d'o";
  },
  meridiem(hour: number, minute: number, isLowercase: boolean): string {
    const NOON_HOUR = 11;
    return hour > NOON_HOUR
      ? (isLowercase ? "d'o" : "D'O")
      : (isLowercase ? "d'a" : "D'A");
  },
  calendar: {
    sameDay: '[oxhi à] LT',
    nextDay: '[demà à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[ieiri à] LT',
    lastWeek: '[sür el] dddd [lasteu à] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'osprei %s',
    past: 'ja%s',
    s: relativeTimeTranslation,
    ss: relativeTimeTranslation,
    m: relativeTimeTranslation,
    mm: relativeTimeTranslation,
    h: relativeTimeTranslation,
    hh: relativeTimeTranslation,
    d: relativeTimeTranslation,
    dd: relativeTimeTranslation,
    M: relativeTimeTranslation,
    MM: relativeTimeTranslation,
    y: relativeTimeTranslation,
    yy: relativeTimeTranslation
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 4
  }
});

export default moment;