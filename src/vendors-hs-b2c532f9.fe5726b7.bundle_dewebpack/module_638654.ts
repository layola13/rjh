import moment from 'moment';

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
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
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

const NOON_HOUR = 12;
const AFTERNOON_START = 11;
const EVENING_START = 15;
const NIGHT_START = 19;

/**
 * Moment.js locale configuration for Indonesian (id)
 */
const defineIndonesianLocale = (momentInstance: typeof moment): typeof moment => {
  return momentInstance.defineLocale('id', {
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [pukul] HH.mm',
      LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      let adjustedHour = hour;
      
      if (hour === NOON_HOUR) {
        adjustedHour = 0;
      }
      
      if (meridiem === 'pagi') {
        return adjustedHour;
      }
      
      if (meridiem === 'siang') {
        return adjustedHour >= AFTERNOON_START ? adjustedHour : adjustedHour + NOON_HOUR;
      }
      
      if (meridiem === 'sore' || meridiem === 'malam') {
        return adjustedHour + NOON_HOUR;
      }
      
      return undefined;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      if (hour < AFTERNOON_START) {
        return 'pagi';
      }
      
      if (hour < EVENING_START) {
        return 'siang';
      }
      
      if (hour < NIGHT_START) {
        return 'sore';
      }
      
      return 'malam';
    },
    calendar: {
      sameDay: '[Hari ini pukul] LT',
      nextDay: '[Besok pukul] LT',
      nextWeek: 'dddd [pukul] LT',
      lastDay: '[Kemarin pukul] LT',
      lastWeek: 'dddd [lalu pukul] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dalam %s',
      past: '%s yang lalu',
      s: 'beberapa detik',
      ss: '%d detik',
      m: 'semenit',
      mm: '%d menit',
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
      dow: 0,
      doy: 6
    }
  });
};

export default defineIndonesianLocale(moment);