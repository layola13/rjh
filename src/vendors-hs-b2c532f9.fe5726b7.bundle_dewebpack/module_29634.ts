import moment from 'moment';

interface RelativeTimeUnit {
  m: [string, string];
  h: [string, string];
  d: [string, string];
  dd: [string, string];
  w: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

type RelativeTimeKey = keyof RelativeTimeUnit;

/**
 * Format relative time strings for German (Switzerland) locale
 * @param value - The numeric value for the time unit
 * @param withoutSuffix - Whether to use nominative (true) or dative (false) case
 * @param key - The unit key (m, h, d, dd, w, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future (unused)
 * @returns Formatted relative time string
 */
function relativeTimeWithPlural(
  value: number,
  withoutSuffix: boolean,
  key: RelativeTimeKey,
  isFuture: boolean
): string {
  const formats: RelativeTimeUnit = {
    m: ['eine Minute', 'einer Minute'],
    h: ['eine Stunde', 'einer Stunde'],
    d: ['ein Tag', 'einem Tag'],
    dd: [`${value} Tage`, `${value} Tagen`],
    w: ['eine Woche', 'einer Woche'],
    M: ['ein Monat', 'einem Monat'],
    MM: [`${value} Monate`, `${value} Monaten`],
    y: ['ein Jahr', 'einem Jahr'],
    yy: [`${value} Jahre`, `${value} Jahren`]
  };

  return withoutSuffix ? formats[key][0] : formats[key][1];
}

moment.defineLocale('de-ch', {
  months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
  monthsParseExact: true,
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
  weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[heute um] LT [Uhr]',
    sameElse: 'L',
    nextDay: '[morgen um] LT [Uhr]',
    nextWeek: 'dddd [um] LT [Uhr]',
    lastDay: '[gestern um] LT [Uhr]',
    lastWeek: '[letzten] dddd [um] LT [Uhr]'
  },
  relativeTime: {
    future: 'in %s',
    past: 'vor %s',
    s: 'ein paar Sekunden',
    ss: '%d Sekunden',
    m: relativeTimeWithPlural,
    mm: '%d Minuten',
    h: relativeTimeWithPlural,
    hh: '%d Stunden',
    d: relativeTimeWithPlural,
    dd: relativeTimeWithPlural,
    w: relativeTimeWithPlural,
    ww: '%d Wochen',
    M: relativeTimeWithPlural,
    MM: relativeTimeWithPlural,
    y: relativeTimeWithPlural,
    yy: relativeTimeWithPlural
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 4
  }
});

export default moment;