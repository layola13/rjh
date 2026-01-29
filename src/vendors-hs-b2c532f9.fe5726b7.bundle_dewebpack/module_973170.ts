import moment from 'moment';

interface MomentLocale {
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
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
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
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
}

/**
 * Moment.js locale configuration for Lao (lo)
 */
function defineLoLocale(momentInstance: typeof moment): typeof moment {
  const localeConfig: MomentLocale = {
    months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
    monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
    weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
    weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
    weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "ວັນdddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
    isPM: (input: string): boolean => {
      return input === "ຕອນແລງ";
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ";
    },
    calendar: {
      sameDay: "[ມື້ນີ້ເວລາ] LT",
      nextDay: "[ມື້ອື່ນເວລາ] LT",
      nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT",
      lastDay: "[ມື້ວານນີ້ເວລາ] LT",
      lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ອີກ %s",
      past: "%sຜ່ານມາ",
      s: "ບໍ່ເທົ່າໃດວິນາທີ",
      ss: "%d ວິນາທີ",
      m: "1 ນາທີ",
      mm: "%d ນາທີ",
      h: "1 ຊົ່ວໂມງ",
      hh: "%d ຊົ່ວໂມງ",
      d: "1 ມື້",
      dd: "%d ມື້",
      M: "1 ເດືອນ",
      MM: "%d ເດືອນ",
      y: "1 ປີ",
      yy: "%d ປີ"
    },
    dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
    ordinal: (num: number): string => {
      return `ທີ່${num}`;
    }
  };

  return momentInstance.defineLocale("lo", localeConfig);
}

export default defineLoLocale(moment);