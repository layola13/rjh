import moment from 'moment';

interface MeridiemPeriod {
  pagi: string;
  tengahari: string;
  petang: string;
  malam: string;
}

const MERIDIEM_PERIODS: MeridiemPeriod = {
  pagi: 'pagi',
  tengahari: 'tengahari',
  petang: 'petang',
  malam: 'malam'
};

const HOURS_MIDDAY = 11;
const HOURS_AFTERNOON = 15;
const HOURS_EVENING = 19;
const HOURS_IN_HALF_DAY = 12;

/**
 * Adjusts hour value based on meridiem period for 12-hour clock format
 * @param hour - The hour value (0-23)
 * @param meridiemPeriod - The period of day (pagi/tengahari/petang/malam)
 * @returns Adjusted hour value
 */
function meridiemHour(hour: number, meridiemPeriod: string): number {
  let adjustedHour = hour;
  
  if (hour === HOURS_IN_HALF_DAY) {
    adjustedHour = 0;
  }
  
  if (meridiemPeriod === MERIDIEM_PERIODS.pagi) {
    return adjustedHour;
  }
  
  if (meridiemPeriod === MERIDIEM_PERIODS.tengahari) {
    return adjustedHour >= HOURS_MIDDAY ? adjustedHour : adjustedHour + HOURS_IN_HALF_DAY;
  }
  
  if (meridiemPeriod === MERIDIEM_PERIODS.petang || meridiemPeriod === MERIDIEM_PERIODS.malam) {
    return adjustedHour + HOURS_IN_HALF_DAY;
  }
  
  return adjustedHour;
}

/**
 * Determines the meridiem period based on hour
 * @param hour - The hour value (0-23)
 * @param minute - The minute value (0-59)
 * @param isLowercase - Whether to return lowercase format
 * @returns The meridiem period string
 */
function meridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour < HOURS_MIDDAY) {
    return MERIDIEM_PERIODS.pagi;
  }
  
  if (hour < HOURS_AFTERNOON) {
    return MERIDIEM_PERIODS.tengahari;
  }
  
  if (hour < HOURS_EVENING) {
    return MERIDIEM_PERIODS.petang;
  }
  
  return MERIDIEM_PERIODS.malam;
}

/**
 * Moment.js locale configuration for Malay (Malaysia)
 */
moment.defineLocale('ms-my', {
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
    dow: 1,
    doy: 7
  }
});

export default moment;