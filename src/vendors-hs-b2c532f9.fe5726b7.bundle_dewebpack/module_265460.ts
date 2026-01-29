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
  ordinal: (dayOfMonth: number) => number;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(localeName: string, config: MomentLocale): MomentLocale;
}

const FIRST_DAY_OF_WEEK = 1;
const FIRST_DAY_OF_YEAR = 4;

/**
 * Moment.js locale configuration for Filipino (Tagalog)
 */
export function defineFilipino(moment: Moment): MomentLocale {
  return moment.defineLocale("fil", {
    months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
    monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
    weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
    weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
    weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "MM/D/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY HH:mm",
      LLLL: "dddd, MMMM DD, YYYY HH:mm"
    },
    calendar: {
      sameDay: "LT [ngayong araw]",
      nextDay: "[Bukas ng] LT",
      nextWeek: "LT [sa susunod na] dddd",
      lastDay: "LT [kahapon]",
      lastWeek: "LT [noong nakaraang] dddd",
      sameElse: "L"
    },
    relativeTime: {
      future: "sa loob ng %s",
      past: "%s ang nakalipas",
      s: "ilang segundo",
      ss: "%d segundo",
      m: "isang minuto",
      mm: "%d minuto",
      h: "isang oras",
      hh: "%d oras",
      d: "isang araw",
      dd: "%d araw",
      M: "isang buwan",
      MM: "%d buwan",
      y: "isang taon",
      yy: "%d taon"
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: (dayOfMonth: number): number => {
      return dayOfMonth;
    },
    week: {
      dow: FIRST_DAY_OF_WEEK,
      doy: FIRST_DAY_OF_YEAR
    }
  });
}