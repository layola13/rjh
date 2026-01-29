import moment from 'moment';

interface OrdinalSuffixMap {
  [key: number]: string;
}

const ordinalSuffixes: OrdinalSuffixMap = {
  1: "'inci",
  5: "'inci",
  8: "'inci",
  70: "'inci",
  80: "'inci",
  2: "'nci",
  7: "'nci",
  20: "'nci",
  50: "'nci",
  3: "'üncü",
  4: "'üncü",
  100: "'üncü",
  6: "'ncı",
  9: "'uncu",
  10: "'uncu",
  30: "'uncu",
  60: "'ıncı",
  90: "'ıncı"
};

moment.defineLocale("tr", {
  months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
  monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
  weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
  weekdaysShort: "Paz_Pzt_Sal_Çar_Per_Cum_Cmt".split("_"),
  weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
  meridiem: (hour: number, minute: number, isLowercase: boolean): string => {
    return hour < 12 ? (isLowercase ? "öö" : "ÖÖ") : (isLowercase ? "ös" : "ÖS");
  },
  meridiemParse: /öö|ÖÖ|ös|ÖS/,
  isPM: (input: string): boolean => {
    return input === "ös" || input === "ÖS";
  },
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[bugün saat] LT",
    nextDay: "[yarın saat] LT",
    nextWeek: "[gelecek] dddd [saat] LT",
    lastDay: "[dün] LT",
    lastWeek: "[geçen] dddd [saat] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s sonra",
    past: "%s önce",
    s: "birkaç saniye",
    ss: "%d saniye",
    m: "bir dakika",
    mm: "%d dakika",
    h: "bir saat",
    hh: "%d saat",
    d: "bir gün",
    dd: "%d gün",
    w: "bir hafta",
    ww: "%d hafta",
    M: "bir ay",
    MM: "%d ay",
    y: "bir yıl",
    yy: "%d yıl"
  },
  ordinal: (num: number, period: string): string => {
    switch (period) {
      case "d":
      case "D":
      case "Do":
      case "DD":
        return num.toString();
      default:
        if (num === 0) {
          return num + "'ıncı";
        }
        const lastDigit = num % 10;
        const suffix = ordinalSuffixes[lastDigit] || ordinalSuffixes[num % 100 - lastDigit] || (num >= 100 ? ordinalSuffixes[100] : "'ıncı");
        return num + suffix;
    }
  },
  week: {
    dow: 1,
    doy: 7
  }
});

export default moment;