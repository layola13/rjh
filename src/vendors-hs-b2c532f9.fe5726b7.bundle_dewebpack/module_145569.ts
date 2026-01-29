interface MomentLocale {
  months: {
    format: string[];
    standalone: string[];
  };
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
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
    nextWeek: () => string;
    lastDay: string;
    lastWeek: () => string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: RelativeTimeFormatter;
    m: RelativeTimeFormatter;
    mm: RelativeTimeFormatter;
    h: RelativeTimeFormatter;
    hh: RelativeTimeFormatter;
    d: string;
    dd: RelativeTimeFormatter;
    M: string;
    MM: RelativeTimeFormatter;
    y: string;
    yy: RelativeTimeFormatter;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): Moment;
  day(): number;
}

type RelativeTimeFormatter = (
  count: number,
  withoutSuffix: boolean,
  key: string
) => string;

/**
 * Formats relative time strings with proper Croatian grammar
 * @param count - The numeric value
 * @param withoutSuffix - Whether to include suffix
 * @param key - The time unit key
 * @returns Formatted string
 */
function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string
): string {
  let result = `${count} `;

  switch (key) {
    case 'ss':
      return (
        result +
        (count === 1
          ? 'sekunda'
          : count === 2 || count === 3 || count === 4
          ? 'sekunde'
          : 'sekundi')
      );
    case 'm':
      return withoutSuffix ? 'jedna minuta' : 'jedne minute';
    case 'mm':
      return (
        result +
        (count === 1
          ? 'minuta'
          : count === 2 || count === 3 || count === 4
          ? 'minute'
          : 'minuta')
      );
    case 'h':
      return withoutSuffix ? 'jedan sat' : 'jednog sata';
    case 'hh':
      return (
        result +
        (count === 1
          ? 'sat'
          : count === 2 || count === 3 || count === 4
          ? 'sata'
          : 'sati')
      );
    case 'dd':
      return result + (count === 1 ? 'dan' : 'dana');
    case 'MM':
      return (
        result +
        (count === 1
          ? 'mjesec'
          : count === 2 || count === 3 || count === 4
          ? 'mjeseca'
          : 'mjeseci')
      );
    case 'yy':
      return (
        result +
        (count === 1
          ? 'godina'
          : count === 2 || count === 3 || count === 4
          ? 'godine'
          : 'godina')
      );
    default:
      return result;
  }
}

/**
 * Configure Croatian locale for moment.js
 * @param moment - Moment.js instance
 * @returns Configured moment instance
 */
export function configureCroatianLocale(moment: Moment): Moment {
  return moment.defineLocale('hr', {
    months: {
      format:
        'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split(
          '_'
        ),
      standalone:
        'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split(
          '_'
        ),
    },
    monthsShort:
      'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
    monthsParseExact: true,
    weekdays:
      'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'Do MMMM YYYY',
      LLL: 'Do MMMM YYYY H:mm',
      LLLL: 'dddd, Do MMMM YYYY H:mm',
    },
    calendar: {
      sameDay: '[danas u] LT',
      nextDay: '[sutra u] LT',
      nextWeek: function (this: Moment): string {
        switch (this.day()) {
          case 0:
            return '[u] [nedjelju] [u] LT';
          case 3:
            return '[u] [srijedu] [u] LT';
          case 6:
            return '[u] [subotu] [u] LT';
          case 1:
          case 2:
          case 4:
          case 5:
            return '[u] dddd [u] LT';
          default:
            return '[u] dddd [u] LT';
        }
      },
      lastDay: '[jučer u] LT',
      lastWeek: function (this: Moment): string {
        switch (this.day()) {
          case 0:
            return '[prošlu] [nedjelju] [u] LT';
          case 3:
            return '[prošlu] [srijedu] [u] LT';
          case 6:
            return '[prošle] [subote] [u] LT';
          case 1:
          case 2:
          case 4:
          case 5:
            return '[prošli] dddd [u] LT';
          default:
            return '[prošli] dddd [u] LT';
        }
      },
      sameElse: 'L',
    },
    relativeTime: {
      future: 'za %s',
      past: 'prije %s',
      s: 'par sekundi',
      ss: formatRelativeTime,
      m: formatRelativeTime,
      mm: formatRelativeTime,
      h: formatRelativeTime,
      hh: formatRelativeTime,
      d: 'dan',
      dd: formatRelativeTime,
      M: 'mjesec',
      MM: formatRelativeTime,
      y: 'godinu',
      yy: formatRelativeTime,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      doy: 7,
    },
  });
}