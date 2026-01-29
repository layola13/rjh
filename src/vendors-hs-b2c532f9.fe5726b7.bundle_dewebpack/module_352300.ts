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
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): Moment;
}

/**
 * Moment.js locale configuration for Uzbek (uz)
 * Configures date/time formatting, calendar strings, and relative time expressions
 */
export function defineUzbekLocale(moment: Moment): Moment {
  return moment.defineLocale("uz", {
    months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
    monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
    weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
    weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
    weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "D MMMM YYYY, dddd HH:mm"
    },
    calendar: {
      sameDay: "[Бугун соат] LT [да]",
      nextDay: "[Эртага] LT [да]",
      nextWeek: "dddd [куни соат] LT [да]",
      lastDay: "[Кеча соат] LT [да]",
      lastWeek: "[Утган] dddd [куни соат] LT [да]",
      sameElse: "L"
    },
    relativeTime: {
      future: "Якин %s ичида",
      past: "Бир неча %s олдин",
      s: "фурсат",
      ss: "%d фурсат",
      m: "бир дакика",
      mm: "%d дакика",
      h: "бир соат",
      hh: "%d соат",
      d: "бир кун",
      dd: "%d кун",
      M: "бир ой",
      MM: "%d ой",
      y: "бир йил",
      yy: "%d йил"
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}