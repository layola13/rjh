/**
 * Moment.js locale configuration for Estonian (et)
 * Defines date/time formatting, relative time strings, and calendar display rules for Estonian language
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Configuration options for relative time formatting in Estonian
 */
interface RelativeTimeConfig {
  /** Singular forms (e.g., "mõne sekundi") */
  0: string;
  /** Plural forms (e.g., "mõni sekund") */
  1: string;
  /** Alternative form with article (e.g., "paar sekundit") */
  2?: string;
}

/**
 * Map of time unit keys to their Estonian translations
 */
interface EstonianRelativeTimeTranslations {
  s: [string, string, string];
  ss: [string, string];
  m: [string, string];
  mm: [string, string];
  h: [string, string, string];
  hh: [string, string];
  d: [string, string];
  M: [string, string, string];
  MM: [string, string];
  y: [string, string, string];
  yy: [string, string];
}

/**
 * Generates the appropriate Estonian relative time string based on context
 * 
 * @param count - The numeric value (e.g., 5 for "5 minutes")
 * @param withoutSuffix - Whether to use the form without suffix (e.g., "5 minutit" vs "5 minuti")
 * @param key - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time reference is in the future
 * @returns The properly formatted Estonian relative time string
 */
function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const translations: EstonianRelativeTimeTranslations = {
    s: ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
    ss: [`${count}sekundi`, `${count}sekundit`],
    m: ['ühe minuti', 'üks minut'],
    mm: [`${count} minuti`, `${count} minutit`],
    h: ['ühe tunni', 'tund aega', 'üks tund'],
    hh: [`${count} tunni`, `${count} tundi`],
    d: ['ühe päeva', 'üks päev'],
    M: ['kuu aja', 'kuu aega', 'üks kuu'],
    MM: [`${count} kuu`, `${count} kuud`],
    y: ['ühe aasta', 'aasta', 'üks aasta'],
    yy: [`${count} aasta`, `${count} aastat`]
  };

  const forms = translations[key as keyof EstonianRelativeTimeTranslations];
  
  if (withoutSuffix) {
    return forms[2] ?? forms[1];
  }
  
  return isFuture ? forms[0] : forms[1];
}

/**
 * Estonian locale configuration specification
 */
const estonianLocaleConfig: LocaleSpecification = {
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
    /** First day of week (Monday = 1) */
    dow: 1,
    /** First week of year contains Jan 4th */
    doy: 4
  }
};

/**
 * Registers and returns the Estonian locale with moment.js
 * 
 * @param moment - The moment.js instance
 * @returns The registered Estonian locale
 */
export function defineEstonianLocale(moment: typeof import('moment')): Locale {
  return moment.defineLocale('et', estonianLocaleConfig);
}

export default estonianLocaleConfig;