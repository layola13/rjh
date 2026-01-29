interface TranslationWords {
  ss: [string, string, string];
  m: [string, string];
  mm: [string, string, string];
  h: [string, string];
  hh: [string, string, string];
  d: [string, string];
  dd: [string, string, string];
  M: [string, string];
  MM: [string, string, string];
  y: [string, string];
  yy: [string, string, string];
}

interface Translator {
  words: TranslationWords;
  correctGrammaticalCase: (count: number, forms: string[]) => string;
  translate: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
}

interface LocaleSpecification {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
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
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: () => string;
    lastDay: string;
    lastWeek: () => string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    m: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    mm: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    h: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    hh: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    d: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    dd: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    M: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    MM: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    y: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
    yy: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale: (locale: string, config: LocaleSpecification) => unknown;
  day: () => number;
}

const translator: Translator = {
  words: {
    ss: ["секунда", "секунде", "секунди"],
    m: ["један минут", "једног минута"],
    mm: ["минут", "минута", "минута"],
    h: ["један сат", "једног сата"],
    hh: ["сат", "сата", "сати"],
    d: ["један дан", "једног дана"],
    dd: ["дан", "дана", "дана"],
    M: ["један месец", "једног месеца"],
    MM: ["месец", "месеца", "месеци"],
    y: ["једну годину", "једне године"],
    yy: ["годину", "године", "година"]
  },

  correctGrammaticalCase(count: number, forms: string[]): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastDigit >= 1 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
      return lastDigit === 1 ? forms[0] : forms[1];
    }
    return forms[2];
  },

  translate(count: number, withoutSuffix: boolean, key: string, isFuture: boolean): string {
    const forms = this.words[key as keyof TranslationWords];
    
    if (forms.length === 1) {
      if (key === "y" && withoutSuffix) {
        return "једна година";
      }
      return isFuture || withoutSuffix ? forms[0] : forms[1];
    }
    
    const correctForm = this.correctGrammaticalCase(count, forms);
    
    if (key === "yy" && withoutSuffix && correctForm === "годину") {
      return `${count} година`;
    }
    
    return `${count} ${correctForm}`;
  }
};

export function defineSerbianCyrillicLocale(moment: Moment): unknown {
  return moment.defineLocale("sr-cyrl", {
    months: "јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"),
    monthsShort: "јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"),
    monthsParseExact: true,
    weekdays: "недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),
    weekdaysShort: "нед._пон._уто._сре._чет._пет._суб.".split("_"),
    weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "D. M. YYYY.",
      LL: "D. MMMM YYYY.",
      LLL: "D. MMMM YYYY. H:mm",
      LLLL: "dddd, D. MMMM YYYY. H:mm"
    },
    calendar: {
      sameDay: "[данас у] LT",
      nextDay: "[сутра у] LT",
      nextWeek: function(this: Moment): string {
        switch (this.day()) {
          case 0:
            return "[у] [недељу] [у] LT";
          case 3:
            return "[у] [среду] [у] LT";
          case 6:
            return "[у] [суботу] [у] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[у] dddd [у] LT";
          default:
            return "[у] dddd [у] LT";
        }
      },
      lastDay: "[јуче у] LT",
      lastWeek: function(this: Moment): string {
        const lastWeekFormats = [
          "[прошле] [недеље] [у] LT",
          "[прошлог] [понедељка] [у] LT",
          "[прошлог] [уторка] [у] LT",
          "[прошле] [среде] [у] LT",
          "[прошлог] [четвртка] [у] LT",
          "[прошлог] [петка] [у] LT",
          "[прошле] [суботе] [у] LT"
        ];
        return lastWeekFormats[this.day()];
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "за %s",
      past: "пре %s",
      s: "неколико секунди",
      ss: translator.translate.bind(translator),
      m: translator.translate.bind(translator),
      mm: translator.translate.bind(translator),
      h: translator.translate.bind(translator),
      hh: translator.translate.bind(translator),
      d: translator.translate.bind(translator),
      dd: translator.translate.bind(translator),
      M: translator.translate.bind(translator),
      MM: translator.translate.bind(translator),
      y: translator.translate.bind(translator),
      yy: translator.translate.bind(translator)
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 7
    }
  });
}