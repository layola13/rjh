interface MonthsConfig {
  standalone: string[];
  format: string[];
  isFormat: RegExp;
}

interface LocaleSpecification {
  months: MonthsConfig;
  monthsShort: string[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormat;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: WeekSpec;
}

interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
  l: string;
}

interface CalendarSpec {
  sameDay: string;
  nextDay: string;
  nextWeek: () => string;
  lastDay: string;
  lastWeek: () => string;
  sameElse: string;
}

interface RelativeTimeSpec {
  future: string;
  past: string;
  s: RelativeTimeFunction;
  ss: RelativeTimeFunction;
  m: RelativeTimeFunction;
  mm: RelativeTimeFunction;
  h: RelativeTimeFunction;
  hh: RelativeTimeFunction;
  d: RelativeTimeFunction;
  dd: RelativeTimeFunction;
  M: RelativeTimeFunction;
  MM: RelativeTimeFunction;
  y: RelativeTimeFunction;
  yy: RelativeTimeFunction;
}

interface WeekSpec {
  dow: number;
  doy: number;
}

type RelativeTimeFunction = (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;

interface Moment {
  defineLocale(locale: string, config: LocaleSpecification): unknown;
}

const months: MonthsConfig = {
  standalone: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
  format: "ledna_února_března_dubna_května_června_července_srpna_září_října_listopadu_prosince".split("_"),
  isFormat: /DD?[o.]?(\[[^\[\]]*\]|\s)+MMMM/
};

const monthsShort: string[] = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");

const monthsParse: RegExp[] = [
  /^led/i,
  /^úno/i,
  /^bře/i,
  /^dub/i,
  /^kvě/i,
  /^(čvn|červen$|června)/i,
  /^(čvc|červenec|července)/i,
  /^srp/i,
  /^zář/i,
  /^říj/i,
  /^lis/i,
  /^pro/i
];

const monthsRegex: RegExp = /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;

/**
 * Determines if a number should use plural form for Czech language
 * @param count - The number to check
 * @returns True if the number requires plural form (2-4, excluding teens)
 */
function isPlural(count: number): boolean {
  return count > 1 && count < 5 && ~~(count / 10) !== 1;
}

/**
 * Translates relative time for Czech locale
 * @param count - The number of units
 * @param withoutSuffix - Whether to omit the suffix
 * @param key - The time unit key
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
function translate(count: number, withoutSuffix: boolean, key: string, isFuture: boolean): string {
  const result = `${count} `;

  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "pár sekund" : "pár sekundami";
    case "ss":
      return withoutSuffix || isFuture 
        ? result + (isPlural(count) ? "sekundy" : "sekund")
        : result + "sekundami";
    case "m":
      return withoutSuffix ? "minuta" : isFuture ? "minutu" : "minutou";
    case "mm":
      return withoutSuffix || isFuture
        ? result + (isPlural(count) ? "minuty" : "minut")
        : result + "minutami";
    case "h":
      return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
    case "hh":
      return withoutSuffix || isFuture
        ? result + (isPlural(count) ? "hodiny" : "hodin")
        : result + "hodinami";
    case "d":
      return withoutSuffix || isFuture ? "den" : "dnem";
    case "dd":
      return withoutSuffix || isFuture
        ? result + (isPlural(count) ? "dny" : "dní")
        : result + "dny";
    case "M":
      return withoutSuffix || isFuture ? "měsíc" : "měsícem";
    case "MM":
      return withoutSuffix || isFuture
        ? result + (isPlural(count) ? "měsíce" : "měsíců")
        : result + "měsíci";
    case "y":
      return withoutSuffix || isFuture ? "rok" : "rokem";
    case "yy":
      return withoutSuffix || isFuture
        ? result + (isPlural(count) ? "roky" : "let")
        : result + "lety";
    default:
      return "";
  }
}

/**
 * Defines Czech locale configuration for moment.js
 * @param moment - Moment.js instance
 * @returns Configured locale
 */
export function defineCzechLocale(moment: Moment): unknown {
  return moment.defineLocale("cs", {
    months,
    monthsShort,
    monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i,
    monthsShortStrictRegex: /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i,
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
    weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
    weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd D. MMMM YYYY H:mm",
      l: "D. M. YYYY"
    },
    calendar: {
      sameDay: "[dnes v] LT",
      nextDay: "[zítra v] LT",
      nextWeek: function(this: { day: () => number }): string {
        switch (this.day()) {
          case 0:
            return "[v neděli v] LT";
          case 1:
          case 2:
            return "[v] dddd [v] LT";
          case 3:
            return "[ve středu v] LT";
          case 4:
            return "[ve čtvrtek v] LT";
          case 5:
            return "[v pátek v] LT";
          case 6:
            return "[v sobotu v] LT";
          default:
            return "";
        }
      },
      lastDay: "[včera v] LT",
      lastWeek: function(this: { day: () => number }): string {
        switch (this.day()) {
          case 0:
            return "[minulou neděli v] LT";
          case 1:
          case 2:
            return "[minulé] dddd [v] LT";
          case 3:
            return "[minulou středu v] LT";
          case 4:
          case 5:
            return "[minulý] dddd [v] LT";
          case 6:
            return "[minulou sobotu v] LT";
          default:
            return "";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "před %s",
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}