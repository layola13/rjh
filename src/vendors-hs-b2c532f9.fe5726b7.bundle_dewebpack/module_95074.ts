interface LocaleWords {
  ss: string[];
  m: string[];
  mm: string[];
  h: string[];
  hh: string[];
  d: string[];
  dd: string[];
  M: string[];
  MM: string[];
  y: string[];
  yy: string[];
}

interface TranslationHelper {
  words: LocaleWords;
  correctGrammaticalCase(count: number, forms: string[]): string;
  translate(count: number, withoutSuffix: boolean, key: string, isFuture: boolean): string;
}

interface MomentLocale {
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
    nextWeek(): string;
    lastDay: string;
    lastWeek(): string;
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
  defineLocale(locale: string, config: MomentLocale): unknown;
  day(): number;
}

const translationHelper: TranslationHelper = {
  words: {
    ss: ["sekunda", "sekunde", "sekundi"],
    m: ["jedan minut", "jednog minuta"],
    mm: ["minut", "minuta", "minuta"],
    h: ["jedan sat", "jednog sata"],
    hh: ["sat", "sata", "sati"],
    d: ["jedan dan", "jednog dana"],
    dd: ["dan", "dana", "dana"],
    M: ["jedan mesec", "jednog meseca"],
    MM: ["mesec", "meseca", "meseci"],
    y: ["jednu godinu", "jedne godine"],
    yy: ["godinu", "godine", "godina"]
  },

  correctGrammaticalCase(count: number, forms: string[]): string {
    const mod10 = count % 10;
    const mod100 = count % 100;
    
    if (mod10 >= 1 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return mod10 === 1 ? forms[0] : forms[1];
    }
    return forms[2];
  },

  translate(count: number, withoutSuffix: boolean, key: string, isFuture: boolean): string {
    const forms = translationHelper.words[key as keyof LocaleWords];
    
    if (forms.length === 1) {
      if (key === "y" && withoutSuffix) {
        return "jedna godina";
      }
      return isFuture || withoutSuffix ? forms[0] : forms[1];
    }
    
    const correctForm = translationHelper.correctGrammaticalCase(count, forms);
    
    if (key === "yy" && withoutSuffix && correctForm === "godinu") {
      return `${count} godina`;
    }
    
    return `${count} ${correctForm}`;
  }
};

export function defineSerbianLocale(moment: Moment): unknown {
  return moment.defineLocale("sr", {
    months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
    monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: true,
    weekdays: "nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),
    weekdaysShort: "ned._pon._uto._sre._čet._pet._sub.".split("_"),
    weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
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
      sameDay: "[danas u] LT",
      nextDay: "[sutra u] LT",
      nextWeek(this: Moment): string {
        switch (this.day()) {
          case 0:
            return "[u] [nedelju] [u] LT";
          case 3:
            return "[u] [sredu] [u] LT";
          case 6:
            return "[u] [subotu] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
          default:
            return "[u] dddd [u] LT";
        }
      },
      lastDay: "[juče u] LT",
      lastWeek(this: Moment): string {
        const lastWeekTemplates = [
          "[prošle] [nedelje] [u] LT",
          "[prošlog] [ponedeljka] [u] LT",
          "[prošlog] [utorka] [u] LT",
          "[prošle] [srede] [u] LT",
          "[prošlog] [četvrtka] [u] LT",
          "[prošlog] [petka] [u] LT",
          "[prošle] [subote] [u] LT"
        ];
        return lastWeekTemplates[this.day()];
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "pre %s",
      s: "nekoliko sekundi",
      ss: translationHelper.translate,
      m: translationHelper.translate,
      mm: translationHelper.translate,
      h: translationHelper.translate,
      hh: translationHelper.translate,
      d: translationHelper.translate,
      dd: translationHelper.translate,
      M: translationHelper.translate,
      MM: translationHelper.translate,
      y: translationHelper.translate,
      yy: translationHelper.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 7
    }
  });
}