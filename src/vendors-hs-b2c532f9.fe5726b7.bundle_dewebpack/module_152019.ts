interface MomentLocale {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
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
  ordinal: (dayOfMonth: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(localeName: string, config: MomentLocale): MomentLocale;
}

/**
 * Moment.js locale configuration for Irish Gaelic (ga)
 */
export function defineGaLocale(moment: Moment): MomentLocale {
  return moment.defineLocale("ga", {
    months: [
      "Eanáir",
      "Feabhra",
      "Márta",
      "Aibreán",
      "Bealtaine",
      "Meitheamh",
      "Iúil",
      "Lúnasa",
      "Meán Fómhair",
      "Deireadh Fómhair",
      "Samhain",
      "Nollaig"
    ],
    monthsShort: [
      "Ean",
      "Feabh",
      "Márt",
      "Aib",
      "Beal",
      "Meith",
      "Iúil",
      "Lún",
      "M.F.",
      "D.F.",
      "Samh",
      "Noll"
    ],
    monthsParseExact: true,
    weekdays: [
      "Dé Domhnaigh",
      "Dé Luain",
      "Dé Máirt",
      "Dé Céadaoin",
      "Déardaoin",
      "Dé hAoine",
      "Dé Sathairn"
    ],
    weekdaysShort: ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"],
    weekdaysMin: ["Do", "Lu", "Má", "Cé", "Dé", "A", "Sa"],
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Inniu ag] LT",
      nextDay: "[Amárach ag] LT",
      nextWeek: "dddd [ag] LT",
      lastDay: "[Inné ag] LT",
      lastWeek: "dddd [seo caite] [ag] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "i %s",
      past: "%s ó shin",
      s: "cúpla soicind",
      ss: "%d soicind",
      m: "nóiméad",
      mm: "%d nóiméad",
      h: "uair an chloig",
      hh: "%d uair an chloig",
      d: "lá",
      dd: "%d lá",
      M: "mí",
      MM: "%d míonna",
      y: "bliain",
      yy: "%d bliain"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
    ordinal: (dayOfMonth: number): string => {
      const lastDigit = dayOfMonth % 10;
      if (dayOfMonth === 1) {
        return `${dayOfMonth}d`;
      } else if (lastDigit === 2) {
        return `${dayOfMonth}na`;
      } else {
        return `${dayOfMonth}mh`;
      }
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}