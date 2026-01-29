import * as moment from 'moment';

interface RelativeTimeToken {
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

type RelativeTimeKey = keyof RelativeTimeToken;

/**
 * Formats relative time strings for Goan Konkani (Latin script) locale
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to use the suffix form
 * @param key - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
function relativeTimeFormatter(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const timeUnits: RelativeTimeToken = {
    s: ['thoddea sekondamni', 'thodde sekond'],
    ss: [`${count} sekondamni`, `${count} sekond`],
    m: ['eka mintan', 'ek minut'],
    mm: [`${count} mintamni`, `${count} mintam`],
    h: ['eka voran', 'ek vor'],
    hh: [`${count} voramni`, `${count} voram`],
    d: ['eka disan', 'ek dis'],
    dd: [`${count} disamni`, `${count} dis`],
    M: ['eka mhoinean', 'ek mhoino'],
    MM: [`${count} mhoineamni`, `${count} mhoine`],
    y: ['eka vorsan', 'ek voros'],
    yy: [`${count} vorsamni`, `${count} vorsam`]
  };

  return isFuture ? timeUnits[key as RelativeTimeKey][0] : timeUnits[key as RelativeTimeKey][1];
}

type MeridiemType = 'rati' | 'sokallim' | 'donparam' | 'sanje';

const HOUR_THRESHOLD_NIGHT = 4;
const HOUR_THRESHOLD_NOON = 12;
const HOUR_THRESHOLD_AFTERNOON = 16;
const HOUR_THRESHOLD_EVENING = 20;
const HOURS_IN_HALF_DAY = 12;

moment.defineLocale('gom-latn', {
  months: {
    standalone: 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
    format: 'Janerachea_Febrerachea_Marsachea_Abrilachea_Maiachea_Junachea_Julaiachea_Agostachea_Setembrachea_Otubrachea_Novembrachea_Dezembrachea'.split('_'),
    isFormat: /MMMM(\s)+D[oD]?/
  },
  monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
  monthsParseExact: true,
  weekdays: "Aitar_Somar_Mongllar_Budhvar_Birestar_Sukrar_Son'var".split('_'),
  weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
  weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'A h:mm [vazta]',
    LTS: 'A h:mm:ss [vazta]',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY A h:mm [vazta]',
    LLLL: 'dddd, MMMM Do, YYYY, A h:mm [vazta]',
    llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
  },
  calendar: {
    sameDay: '[Aiz] LT',
    nextDay: '[Faleam] LT',
    nextWeek: '[Fuddlo] dddd[, ] LT',
    lastDay: '[Kal] LT',
    lastWeek: '[Fattlo] dddd[, ] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s',
    past: '%s adim',
    s: relativeTimeFormatter,
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er)/,
  ordinal(dayOfMonth: number, format: string): string {
    return format === 'D' ? `${dayOfMonth}er` : `${dayOfMonth}`;
  },
  week: {
    dow: 0,
    doy: 3
  },
  meridiemParse: /rati|sokallim|donparam|sanje/,
  meridiemHour(hour: number, meridiem: MeridiemType): number {
    let normalizedHour = hour;
    if (hour === HOURS_IN_HALF_DAY) {
      normalizedHour = 0;
    }

    if (meridiem === 'rati') {
      return normalizedHour < HOUR_THRESHOLD_NIGHT ? normalizedHour : normalizedHour + HOURS_IN_HALF_DAY;
    } else if (meridiem === 'sokallim') {
      return normalizedHour;
    } else if (meridiem === 'donparam') {
      return normalizedHour > HOURS_IN_HALF_DAY ? normalizedHour : normalizedHour + HOURS_IN_HALF_DAY;
    } else if (meridiem === 'sanje') {
      return normalizedHour + HOURS_IN_HALF_DAY;
    }

    return normalizedHour;
  },
  meridiem(hour: number, minute: number, isLowercase: boolean): string {
    if (hour < HOUR_THRESHOLD_NIGHT) {
      return 'rati';
    } else if (hour < HOUR_THRESHOLD_NOON) {
      return 'sokallim';
    } else if (hour < HOUR_THRESHOLD_AFTERNOON) {
      return 'donparam';
    } else if (hour < HOUR_THRESHOLD_EVENING) {
      return 'sanje';
    } else {
      return 'rati';
    }
  }
});

export default moment;