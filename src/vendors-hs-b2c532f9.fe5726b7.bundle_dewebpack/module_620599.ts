import moment from 'moment';

interface LocaleSpecification {
  months: string[];
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
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    w: string;
    ww: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Moment.js locale configuration for Norwegian Bokmål (nb)
 */
function defineNorwegianBokmålLocale(momentInstance: typeof moment): typeof moment {
  return momentInstance.defineLocale('nb', {
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact: true,
    weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
    weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY [kl.] HH:mm',
      LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
      sameDay: '[i dag kl.] LT',
      nextDay: '[i morgen kl.] LT',
      nextWeek: 'dddd [kl.] LT',
      lastDay: '[i går kl.] LT',
      lastWeek: '[forrige] dddd [kl.] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'om %s',
      past: '%s siden',
      s: 'noen sekunder',
      ss: '%d sekunder',
      m: 'ett minutt',
      mm: '%d minutter',
      h: 'én time',
      hh: '%d timer',
      d: 'én dag',
      dd: '%d dager',
      w: 'én uke',
      ww: '%d uker',
      M: 'én måned',
      MM: '%d måneder',
      y: 'ett år',
      yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      doy: 4
    }
  } as LocaleSpecification);
}

defineNorwegianBokmålLocale(moment);

export default defineNorwegianBokmålLocale;