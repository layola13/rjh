import moment from 'moment';

interface RelativeTimeTranslations {
  s: string[];
  ss: string[];
  m: string[];
  mm: string[];
  h: string[];
  hh: string[];
  d: string[];
  M: string[];
  MM: string[];
  y: string[];
  yy: string[];
}

type RelativeTimeKey = keyof RelativeTimeTranslations;

/**
 * Generates relative time string in Estonian
 * @param value - Numeric value for the time unit
 * @param withoutSuffix - Whether to return without suffix
 * @param key - Time unit key
 * @param isFuture - Whether the time is in future
 * @returns Formatted relative time string
 */
function relativeTimeWithPlural(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const translations: RelativeTimeTranslations = {
    s: ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
    ss: [`${value}sekundi`, `${value}sekundit`],
    m: ['ühe minuti', 'üks minut'],
    mm: [`${value} minuti`, `${value} minutit`],
    h: ['ühe tunni', 'tund aega', 'üks tund'],
    hh: [`${value} tunni`, `${value} tundi`],
    d: ['ühe päeva', 'üks päev'],
    M: ['kuu aja', 'kuu aega', 'üks kuu'],
    MM: [`${value} kuu`, `${value} kuud`],
    y: ['ühe aasta', 'aasta', 'üks aasta'],
    yy: [`${value} aasta`, `${value} aastat`]
  };

  const timeUnit = translations[key as RelativeTimeKey];

  if (withoutSuffix) {
    return timeUnit[2] ?? timeUnit[1];
  }

  return isFuture ? timeUnit[0] : timeUnit[1];
}

moment.defineLocale('et', {
  months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
  monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
  weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
  weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
  weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  },
  calendar: {
    sameDay: '[Täna, ] LT',
    nextDay: '[Homme, ] LT',
    nextWeek: '[Järgmine] dddd LT',
    lastDay: '[Eile, ] LT',
    lastWeek: '[Eelmine] dddd LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s pärast',
    past: '%s tagasi',
    s: relativeTimeWithPlural,
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: relativeTimeWithPlural,
    hh: relativeTimeWithPlural,
    d: relativeTimeWithPlural,
    dd: '%d päeva',
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