/**
 * Moment.js locale configuration for Icelandic (is)
 */

interface MomentLocale {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
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
    s: RelativeTimeFunction;
    ss: RelativeTimeFunction;
    m: RelativeTimeFunction;
    mm: RelativeTimeFunction;
    h: string;
    hh: RelativeTimeFunction;
    d: RelativeTimeFunction;
    dd: RelativeTimeFunction;
    M: RelativeTimeFunction;
    MM: RelativeTimeFunction;
    y: RelativeTimeFunction;
    yy: RelativeTimeFunction;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

type RelativeTimeFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

interface Moment {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

/**
 * Check if number should use plural form
 * Returns true if the number is NOT 11 and does NOT end in 1
 */
function shouldUsePlural(value: number): boolean {
  return value % 100 === 11 || value % 10 !== 1;
}

/**
 * Format relative time strings for Icelandic
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const prefix = `${value} `;

  switch (key) {
    case 's':
      return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';

    case 'ss':
      return shouldUsePlural(value)
        ? prefix + (withoutSuffix || isFuture ? 'sekúndur' : 'sekúndum')
        : prefix + 'sekúnda';

    case 'm':
      return withoutSuffix ? 'mínúta' : 'mínútu';

    case 'mm':
      return shouldUsePlural(value)
        ? prefix + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum')
        : withoutSuffix
        ? prefix + 'mínúta'
        : prefix + 'mínútu';

    case 'hh':
      return shouldUsePlural(value)
        ? prefix + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum')
        : prefix + 'klukkustund';

    case 'd':
      return withoutSuffix ? 'dagur' : isFuture ? 'dag' : 'degi';

    case 'dd':
      return shouldUsePlural(value)
        ? withoutSuffix
          ? prefix + 'dagar'
          : prefix + (isFuture ? 'daga' : 'dögum')
        : withoutSuffix
        ? prefix + 'dagur'
        : prefix + (isFuture ? 'dag' : 'degi');

    case 'M':
      return withoutSuffix ? 'mánuður' : isFuture ? 'mánuð' : 'mánuði';

    case 'MM':
      return shouldUsePlural(value)
        ? withoutSuffix
          ? prefix + 'mánuðir'
          : prefix + (isFuture ? 'mánuði' : 'mánuðum')
        : withoutSuffix
        ? prefix + 'mánuður'
        : prefix + (isFuture ? 'mánuð' : 'mánuði');

    case 'y':
      return withoutSuffix || isFuture ? 'ár' : 'ári';

    case 'yy':
      return shouldUsePlural(value)
        ? prefix + (withoutSuffix || isFuture ? 'ár' : 'árum')
        : prefix + (withoutSuffix || isFuture ? 'ár' : 'ári');

    default:
      return '';
  }
}

export function defineIcelandicLocale(moment: Moment): MomentLocale {
  return moment.defineLocale('is', {
    months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
    weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
    weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
    weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY [kl.] H:mm',
      LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm',
    },
    calendar: {
      sameDay: '[í dag kl.] LT',
      nextDay: '[á morgun kl.] LT',
      nextWeek: 'dddd [kl.] LT',
      lastDay: '[í gær kl.] LT',
      lastWeek: '[síðasta] dddd [kl.] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'eftir %s',
      past: 'fyrir %s síðan',
      s: formatRelativeTime,
      ss: formatRelativeTime,
      m: formatRelativeTime,
      mm: formatRelativeTime,
      h: 'klukkustund',
      hh: formatRelativeTime,
      d: formatRelativeTime,
      dd: formatRelativeTime,
      M: formatRelativeTime,
      MM: formatRelativeTime,
      y: formatRelativeTime,
      yy: formatRelativeTime,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      doy: 4,
    },
  });
}