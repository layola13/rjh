import moment from 'moment';

interface LocaleSpecification {
  months: string[];
  monthsShort: string[];
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
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (dayOfMonth: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

const ORDINAL_SUFFIXES = [
  '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 
  'fed', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed'
];

const SPECIAL_ORDINAL_VALUES = [40, 50, 60, 80, 100];
const SPECIAL_ORDINAL_SUFFIX = 'fed';
const DEFAULT_ORDINAL_SUFFIX = 'ain';
const ORDINAL_THRESHOLD = 20;

/**
 * Welsh (Cymraeg) locale configuration for moment.js
 */
function getCelshLocaleOrdinal(dayOfMonth: number): string {
  let suffix = '';
  
  if (dayOfMonth > ORDINAL_THRESHOLD) {
    suffix = SPECIAL_ORDINAL_VALUES.includes(dayOfMonth) 
      ? SPECIAL_ORDINAL_SUFFIX 
      : DEFAULT_ORDINAL_SUFFIX;
  } else if (dayOfMonth > 0) {
    suffix = ORDINAL_SUFFIXES[dayOfMonth];
  }
  
  return dayOfMonth + suffix;
}

const welshLocaleConfig: LocaleSpecification = {
  months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
  monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
  weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
  weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
  weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Heddiw am] LT',
    nextDay: '[Yfory am] LT',
    nextWeek: 'dddd [am] LT',
    lastDay: '[Ddoe am] LT',
    lastWeek: 'dddd [diwethaf am] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'mewn %s',
    past: '%s yn ôl',
    s: 'ychydig eiliadau',
    ss: '%d eiliad',
    m: 'munud',
    mm: '%d munud',
    h: 'awr',
    hh: '%d awr',
    d: 'diwrnod',
    dd: '%d diwrnod',
    M: 'mis',
    MM: '%d mis',
    y: 'blwyddyn',
    yy: '%d flynedd'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
  ordinal: getCelshLocaleOrdinal,
  week: {
    dow: 1,
    doy: 4
  }
};

moment.defineLocale('cy', welshLocaleConfig);

export default welshLocaleConfig;