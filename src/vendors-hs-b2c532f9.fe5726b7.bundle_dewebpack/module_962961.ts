import moment from 'moment';

interface LocaleSpecification {
  months: string;
  monthsShort: string;
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
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
  meridiemParse: RegExp;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Moment.js locale configuration for Swazi (ss)
 */
function defineSwatiLocale(momentInstance: typeof moment): typeof moment {
  return momentInstance.defineLocale('ss', {
    months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
    monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
    weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
    weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
    weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Namuhla nga] LT',
      nextDay: '[Kusasa nga] LT',
      nextWeek: 'dddd [nga] LT',
      lastDay: '[Itolo nga] LT',
      lastWeek: 'dddd [leliphelile] [nga] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'nga %s',
      past: 'wenteka nga %s',
      s: 'emizuzwana lomcane',
      ss: '%d mzuzwana',
      m: 'umzuzu',
      mm: '%d emizuzu',
      h: 'lihora',
      hh: '%d emahora',
      d: 'lilanga',
      dd: '%d emalanga',
      M: 'inyanga',
      MM: '%d tinyanga',
      y: 'umnyaka',
      yy: '%d iminyaka'
    },
    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
    meridiem: (hour: number, minute: number, isLowercase: boolean): string => {
      if (hour < 11) {
        return 'ekuseni';
      } else if (hour < 15) {
        return 'emini';
      } else if (hour < 19) {
        return 'entsambama';
      } else {
        return 'ebusuku';
      }
    },
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      if (hour === 12) {
        hour = 0;
      }
      
      if (meridiem === 'ekuseni') {
        return hour;
      } else if (meridiem === 'emini') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
        return hour === 0 ? 0 : hour + 12;
      }
      
      return undefined;
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: '%d',
    week: {
      dow: 1,
      doy: 4
    }
  });
}

defineSwatiLocale(moment);

export default defineSwatiLocale;