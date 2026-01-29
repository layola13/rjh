import moment from 'moment';

interface MeridiemConfig {
  pagi: string;
  tengahari: string;
  petang: string;
  malam: string;
}

const MERIDIEM_HOURS = {
  NOON: 11,
  AFTERNOON: 15,
  EVENING: 19
} as const;

const WEEK_CONFIG = {
  DOW: 1,
  DOY: 7
} as const;

function meridiemHour(hour: number, meridiem: string): number {
  let adjustedHour = hour;
  
  if (hour === 12) {
    adjustedHour = 0;
  }
  
  if (meridiem === 'pagi') {
    return adjustedHour;
  }
  
  if (meridiem === 'tengahari') {
    return adjustedHour >= 11 ? adjustedHour : adjustedHour + 12;
  }
  
  if (meridiem === 'petang' || meridiem === 'malam') {
    return adjustedHour + 12;
  }
  
  return adjustedHour;
}

function meridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour < MERIDIEM_HOURS.NOON) {
    return 'pagi';
  }
  
  if (hour < MERIDIEM_HOURS.AFTERNOON) {
    return 'tengahari';
  }
  
  if (hour < MERIDIEM_HOURS.EVENING) {
    return 'petang';
  }
  
  return 'malam';
}

moment.defineLocale('ms', {
  months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
  monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
  weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
  weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
  weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
  longDateFormat: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
  },
  meridiemParse: /pagi|tengahari|petang|malam/,
  meridiemHour,
  meridiem,
  calendar: {
    sameDay: '[Hari ini pukul] LT',
    nextDay: '[Esok pukul] LT',
    nextWeek: 'dddd [pukul] LT',
    lastDay: '[Kelmarin pukul] LT',
    lastWeek: 'dddd [lepas pukul] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lepas',
    s: 'beberapa saat',
    ss: '%d saat',
    m: 'seminit',
    mm: '%d minit',
    h: 'sejam',
    hh: '%d jam',
    d: 'sehari',
    dd: '%d hari',
    M: 'sebulan',
    MM: '%d bulan',
    y: 'setahun',
    yy: '%d tahun'
  },
  week: {
    dow: WEEK_CONFIG.DOW,
    doy: WEEK_CONFIG.DOY
  }
});

export default moment;