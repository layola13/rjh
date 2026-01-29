/**
 * Moment.js locale configuration for Slovenian (sl)
 */

import moment from 'moment';

interface RelativeTimeUnit {
  (
    count: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string;
}

/**
 * Formats relative time strings with proper Slovenian grammar
 * @param count - The number of time units
 * @param withoutSuffix - Whether to format without suffix
 * @param key - The time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted time string
 */
function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const prefix = `${count} `;

  switch (key) {
    case 's':
      return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';

    case 'ss':
      if (count === 1) {
        return prefix + (withoutSuffix ? 'sekundo' : 'sekundi');
      } else if (count === 2) {
        return prefix + (withoutSuffix || isFuture ? 'sekundi' : 'sekundah');
      } else if (count < 5) {
        return prefix + (withoutSuffix || isFuture ? 'sekunde' : 'sekundah');
      } else {
        return prefix + 'sekund';
      }

    case 'm':
      return withoutSuffix ? 'ena minuta' : 'eno minuto';

    case 'mm':
      if (count === 1) {
        return prefix + (withoutSuffix ? 'minuta' : 'minuto');
      } else if (count === 2) {
        return prefix + (withoutSuffix || isFuture ? 'minuti' : 'minutama');
      } else if (count < 5) {
        return prefix + (withoutSuffix || isFuture ? 'minute' : 'minutami');
      } else {
        return prefix + (withoutSuffix || isFuture ? 'minut' : 'minutami');
      }

    case 'h':
      return withoutSuffix ? 'ena ura' : 'eno uro';

    case 'hh':
      if (count === 1) {
        return prefix + (withoutSuffix ? 'ura' : 'uro');
      } else if (count === 2) {
        return prefix + (withoutSuffix || isFuture ? 'uri' : 'urama');
      } else if (count < 5) {
        return prefix + (withoutSuffix || isFuture ? 'ure' : 'urami');
      } else {
        return prefix + (withoutSuffix || isFuture ? 'ur' : 'urami');
      }

    case 'd':
      return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';

    case 'dd':
      if (count === 1) {
        return prefix + (withoutSuffix || isFuture ? 'dan' : 'dnem');
      } else if (count === 2) {
        return prefix + (withoutSuffix || isFuture ? 'dni' : 'dnevoma');
      } else {
        return prefix + (withoutSuffix || isFuture ? 'dni' : 'dnevi');
      }

    case 'M':
      return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';

    case 'MM':
      if (count === 1) {
        return prefix + (withoutSuffix || isFuture ? 'mesec' : 'mesecem');
      } else if (count === 2) {
        return prefix + (withoutSuffix || isFuture ? 'meseca' : 'mesecema');
      } else if (count < 5) {
        return prefix + (withoutSuffix || isFuture ? 'mesece' : 'meseci');
      } else {
        return prefix + (withoutSuffix || isFuture ? 'mesecev' : 'meseci');
      }

    case 'y':
      return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';

    case 'yy':
      if (count === 1) {
        return prefix + (withoutSuffix || isFuture ? 'leto' : 'letom');
      } else if (count === 2) {
        return prefix + (withoutSuffix || isFuture ? 'leti' : 'letoma');
      } else if (count < 5) {
        return prefix + (withoutSuffix || isFuture ? 'leta' : 'leti');
      } else {
        return prefix + (withoutSuffix || isFuture ? 'let' : 'leti');
      }

    default:
      return '';
  }
}

moment.defineLocale('sl', {
  months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
  monthsParseExact: true,
  weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
  weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
  weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD. MM. YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm',
  },
  calendar: {
    sameDay: '[danes ob] LT',
    nextDay: '[jutri ob] LT',
    nextWeek: function (this: moment.Moment): string {
      switch (this.day()) {
        case 0:
          return '[v] [nedeljo] [ob] LT';
        case 3:
          return '[v] [sredo] [ob] LT';
        case 6:
          return '[v] [soboto] [ob] LT';
        case 1:
        case 2:
        case 4:
        case 5:
          return '[v] dddd [ob] LT';
        default:
          return '[v] dddd [ob] LT';
      }
    },
    lastDay: '[včeraj ob] LT',
    lastWeek: function (this: moment.Moment): string {
      switch (this.day()) {
        case 0:
          return '[prejšnjo] [nedeljo] [ob] LT';
        case 3:
          return '[prejšnjo] [sredo] [ob] LT';
        case 6:
          return '[prejšnjo] [soboto] [ob] LT';
        case 1:
        case 2:
        case 4:
        case 5:
          return '[prejšnji] dddd [ob] LT';
        default:
          return '[prejšnji] dddd [ob] LT';
      }
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'čez %s',
    past: 'pred %s',
    s: relativeTimeWithPlural,
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: relativeTimeWithPlural,
    hh: relativeTimeWithPlural,
    d: relativeTimeWithPlural,
    dd: relativeTimeWithPlural,
    M: relativeTimeWithPlural,
    MM: relativeTimeWithPlural,
    y: relativeTimeWithPlural,
    yy: relativeTimeWithPlural,
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 7,
  },
});

export default moment;