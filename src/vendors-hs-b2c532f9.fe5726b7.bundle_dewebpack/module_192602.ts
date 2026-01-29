import moment from 'moment';

const NUMBERS_NOMINATIVE: ReadonlyArray<string> = [
  'nolla',
  'yksi',
  'kaksi',
  'kolme',
  'neljä',
  'viisi',
  'kuusi',
  'seitsemän',
  'kahdeksan',
  'yhdeksän'
];

const NUMBERS_GENITIVE: ReadonlyArray<string> = [
  'nolla',
  'yhden',
  'kahden',
  'kolmen',
  'neljän',
  'viiden',
  'kuuden',
  'seitsemän',
  'kahdeksan',
  'yhdeksän'
];

/**
 * Converts a number to its Finnish word form
 * @param value - The numeric value to convert
 * @param useGenitive - Whether to use genitive case
 * @returns Finnish word representation of the number
 */
function numberToFinnishWord(value: number, useGenitive: boolean): string {
  if (value < 10) {
    return useGenitive ? NUMBERS_GENITIVE[value] : NUMBERS_NOMINATIVE[value];
  }
  return value.toString();
}

/**
 * Formats relative time in Finnish locale
 * @param value - Numeric value of time unit
 * @param withoutSuffix - Whether to use suffix form
 * @param key - Time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted Finnish relative time string
 */
function relativeTimeFormatter(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  let unit = '';

  switch (key) {
    case 's':
      return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
    case 'ss':
      unit = isFuture ? 'sekunnin' : 'sekuntia';
      break;
    case 'm':
      return isFuture ? 'minuutin' : 'minuutti';
    case 'mm':
      unit = isFuture ? 'minuutin' : 'minuuttia';
      break;
    case 'h':
      return isFuture ? 'tunnin' : 'tunti';
    case 'hh':
      unit = isFuture ? 'tunnin' : 'tuntia';
      break;
    case 'd':
      return isFuture ? 'päivän' : 'päivä';
    case 'dd':
      unit = isFuture ? 'päivän' : 'päivää';
      break;
    case 'M':
      return isFuture ? 'kuukauden' : 'kuukausi';
    case 'MM':
      unit = isFuture ? 'kuukauden' : 'kuukautta';
      break;
    case 'y':
      return isFuture ? 'vuoden' : 'vuosi';
    case 'yy':
      unit = isFuture ? 'vuoden' : 'vuotta';
      break;
  }

  const finnishNumber = numberToFinnishWord(value, isFuture);
  return `${finnishNumber} ${unit}`;
}

/**
 * Finnish locale configuration for moment.js
 */
moment.defineLocale('fi', {
  months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
  monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
  weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
  weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
  weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
  longDateFormat: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'Do MMMM[ta] YYYY',
    LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
    LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
    l: 'D.M.YYYY',
    ll: 'Do MMM YYYY',
    lll: 'Do MMM YYYY, [klo] HH.mm',
    llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
  },
  calendar: {
    sameDay: '[tänään] [klo] LT',
    nextDay: '[huomenna] [klo] LT',
    nextWeek: 'dddd [klo] LT',
    lastDay: '[eilen] [klo] LT',
    lastWeek: '[viime] dddd[na] [klo] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s päästä',
    past: '%s sitten',
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
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 4
  }
});