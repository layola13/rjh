interface SuffixMap {
  [key: number]: string;
}

interface MomentLocale {
  months: {
    format: string[];
    standalone: string[];
  };
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
    lastDay: string;
    nextWeek: string;
    lastWeek: string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
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
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): unknown;
}

/**
 * Moment.js locale configuration for Tajik (tg)
 */
export function defineLocale(moment: Moment): unknown {
  const suffixMap: SuffixMap = {
    0: "-ум",
    1: "-ум",
    2: "-юм",
    3: "-юм",
    4: "-ум",
    5: "-ум",
    6: "-ум",
    7: "-ум",
    8: "-ум",
    9: "-ум",
    10: "-ум",
    12: "-ум",
    13: "-ум",
    20: "-ум",
    30: "-юм",
    40: "-ум",
    50: "-ум",
    60: "-ум",
    70: "-ум",
    80: "-ум",
    90: "-ум",
    100: "-ум"
  };

  return moment.defineLocale("tg", {
    months: {
      format: "январи_феврали_марти_апрели_майи_июни_июли_августи_сентябри_октябри_ноябри_декабри".split("_"),
      standalone: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_")
    },
    monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
    weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"),
    weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"),
    weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Имрӯз соати] LT",
      nextDay: "[Фардо соати] LT",
      lastDay: "[Дирӯз соати] LT",
      nextWeek: "dddd[и] [ҳафтаи оянда соати] LT",
      lastWeek: "dddd[и] [ҳафтаи гузашта соати] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "баъди %s",
      past: "%s пеш",
      s: "якчанд сония",
      m: "як дақиқа",
      mm: "%d дақиқа",
      h: "як соат",
      hh: "%d соат",
      d: "як рӯз",
      dd: "%d рӯз",
      M: "як моҳ",
      MM: "%d моҳ",
      y: "як сол",
      yy: "%d сол"
    },
    meridiemParse: /шаб|субҳ|рӯз|бегоҳ/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      let normalizedHour = hour;
      if (hour === 12) {
        normalizedHour = 0;
      }

      if (meridiem === "шаб") {
        return normalizedHour < 4 ? normalizedHour : normalizedHour + 12;
      } else if (meridiem === "субҳ") {
        return normalizedHour;
      } else if (meridiem === "рӯз") {
        return normalizedHour >= 11 ? normalizedHour : normalizedHour + 12;
      } else if (meridiem === "бегоҳ") {
        return normalizedHour + 12;
      }
      return undefined;
    },
    meridiem: (hour: number, _minute: number, _isLower: boolean): string => {
      if (hour < 4) {
        return "шаб";
      } else if (hour < 11) {
        return "субҳ";
      } else if (hour < 16) {
        return "рӯз";
      } else if (hour < 19) {
        return "бегоҳ";
      }
      return "шаб";
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/,
    ordinal: (num: number): string => {
      const suffix = suffixMap[num] || suffixMap[num % 10] || suffixMap[num >= 100 ? 100 : 0];
      return num + suffix;
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}