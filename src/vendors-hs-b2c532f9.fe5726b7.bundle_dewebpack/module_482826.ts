import moment from 'moment';

interface LocaleSpecification {
  months: string;
  monthsShort: string;
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
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
  week: {
    dow: number;
    doy: number;
  };
}

const LOCALE_CODE = 'bm';

const MONTHS = 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo';
const MONTHS_SHORT = 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des';
const WEEKDAYS = 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri';
const WEEKDAYS_SHORT = 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib';
const WEEKDAYS_MIN = 'Ka_Nt_Ta_Ar_Al_Ju_Si';

const WEEK_START_DAY = 1;
const WEEK_DAY_OF_YEAR = 4;

export function defineLocale(momentInstance: typeof moment): typeof moment {
  return momentInstance.defineLocale(LOCALE_CODE, {
    months: MONTHS.split('_'),
    monthsShort: MONTHS_SHORT.split('_'),
    weekdays: WEEKDAYS.split('_'),
    weekdaysShort: WEEKDAYS_SHORT.split('_'),
    weekdaysMin: WEEKDAYS_MIN.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'MMMM [tile] D [san] YYYY',
      LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
      LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
    },
    calendar: {
      sameDay: '[Bi lɛrɛ] LT',
      nextDay: '[Sini lɛrɛ] LT',
      nextWeek: 'dddd [don lɛrɛ] LT',
      lastDay: '[Kunu lɛrɛ] LT',
      lastWeek: 'dddd [tɛmɛnen lɛrɛ] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s kɔnɔ',
      past: 'a bɛ %s bɔ',
      s: 'sanga dama dama',
      ss: 'sekondi %d',
      m: 'miniti kelen',
      mm: 'miniti %d',
      h: 'lɛrɛ kelen',
      hh: 'lɛrɛ %d',
      d: 'tile kelen',
      dd: 'tile %d',
      M: 'kalo kelen',
      MM: 'kalo %d',
      y: 'san kelen',
      yy: 'san %d'
    },
    week: {
      dow: WEEK_START_DAY,
      doy: WEEK_DAY_OF_YEAR
    }
  });
}

defineLocale(moment);

export default moment;