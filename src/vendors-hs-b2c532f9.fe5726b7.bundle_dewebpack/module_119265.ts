import moment from 'moment';

interface RelativeTimeTokens {
  s: [string, string];
  ss: [string, string];
  m: [string, string];
  mm: [string, string];
  h: [string, string];
  hh: [string, string];
  d: [string, string];
  dd: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

type RelativeTimeKey = keyof RelativeTimeTokens;

/**
 * Formats relative time strings for Goan Konkani (Devanagari script)
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to include the suffix
 * @param token - The time unit token (s, ss, m, mm, etc.)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
function relativeTimeWithPlural(
  count: number,
  withoutSuffix: boolean,
  token: RelativeTimeKey,
  isFuture: boolean
): string {
  const timeTokens: RelativeTimeTokens = {
    s: ["थोडया सॅकंडांनी", "थोडे सॅकंड"],
    ss: [`${count} सॅकंडांनी`, `${count} सॅकंड`],
    m: ["एका मिणटान", "एक मिनूट"],
    mm: [`${count} मिणटांनी`, `${count} मिणटां`],
    h: ["एका वरान", "एक वर"],
    hh: [`${count} वरांनी`, `${count} वरां`],
    d: ["एका दिसान", "एक दीस"],
    dd: [`${count} दिसांनी`, `${count} दीस`],
    M: ["एका म्हयन्यान", "एक म्हयनो"],
    MM: [`${count} म्हयन्यानी`, `${count} म्हयने`],
    y: ["एका वर्सान", "एक वर्स"],
    yy: [`${count} वर्सांनी`, `${count} वर्सां`]
  };

  return isFuture ? timeTokens[token][0] : timeTokens[token][1];
}

type MeridiemToken = "राती" | "सकाळीं" | "दनपारां" | "सांजे";

const STANDALONE_MONTHS = "जानेवारी_फेब्रुवारी_मार्च_एप्रील_मे_जून_जुलय_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_");
const FORMAT_MONTHS = "जानेवारीच्या_फेब्रुवारीच्या_मार्चाच्या_एप्रीलाच्या_मेयाच्या_जूनाच्या_जुलयाच्या_ऑगस्टाच्या_सप्टेंबराच्या_ऑक्टोबराच्या_नोव्हेंबराच्या_डिसेंबराच्या".split("_");
const SHORT_MONTHS = "जाने._फेब्रु._मार्च_एप्री._मे_जून_जुल._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_");
const WEEKDAYS = "आयतार_सोमार_मंगळार_बुधवार_बिरेस्तार_सुक्रार_शेनवार".split("_");
const SHORT_WEEKDAYS = "आयत._सोम._मंगळ._बुध._ब्रेस्त._सुक्र._शेन.".split("_");
const MIN_WEEKDAYS = "आ_सो_मं_बु_ब्रे_सु_शे".split("_");
const MONTH_FORMAT_REGEX = /MMMM(\s)+D[oD]?/;
const ORDINAL_PARSE_REGEX = /\d{1,2}(वेर)/;
const MERIDIEM_PARSE_REGEX = /राती|सकाळीं|दनपारां|सांजे/;

const HOUR_NIGHT_END = 4;
const HOUR_NOON = 12;
const HOUR_AFTERNOON_END = 16;
const HOUR_EVENING_END = 20;

const WEEK_START_DAY = 0;
const WEEK_DAY_OF_YEAR = 3;

moment.defineLocale("gom-deva", {
  months: {
    standalone: STANDALONE_MONTHS,
    format: FORMAT_MONTHS,
    isFormat: MONTH_FORMAT_REGEX
  },
  monthsShort: SHORT_MONTHS,
  monthsParseExact: true,
  weekdays: WEEKDAYS,
  weekdaysShort: SHORT_WEEKDAYS,
  weekdaysMin: MIN_WEEKDAYS,
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "A h:mm [वाजतां]",
    LTS: "A h:mm:ss [वाजतां]",
    L: "DD-MM-YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY A h:mm [वाजतां]",
    LLLL: "dddd, MMMM Do, YYYY, A h:mm [वाजतां]",
    llll: "ddd, D MMM YYYY, A h:mm [वाजतां]"
  },
  calendar: {
    sameDay: "[आयज] LT",
    nextDay: "[फाल्यां] LT",
    nextWeek: "[फुडलो] dddd[, ] LT",
    lastDay: "[काल] LT",
    lastWeek: "[फाटलो] dddd[, ] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s",
    past: "%s आदीं",
    s: relativeTimeWithPlural,
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: relativeTimeWithPlural,
    hh: relativeTimeWithPlural,
    d: relativeTimeWithPlural,
    dd: relativeTimeWithPlural,
    M: relativeTimeWithPlural,
    MM: relativeTimeWithPlural,
    y: relativeTimeWithPlural,
    yy: relativeTimeWithPlural
  },
  dayOfMonthOrdinalParse: ORDINAL_PARSE_REGEX,
  ordinal(day: number, token: string): string {
    return token === "D" ? `${day}वेर` : String(day);
  },
  week: {
    dow: WEEK_START_DAY,
    doy: WEEK_DAY_OF_YEAR
  },
  meridiemParse: MERIDIEM_PARSE_REGEX,
  meridiemHour(hour: number, meridiem: MeridiemToken): number {
    let adjustedHour = hour;
    if (hour === HOUR_NOON) {
      adjustedHour = 0;
    }

    if (meridiem === "राती") {
      return adjustedHour < HOUR_NIGHT_END ? adjustedHour : adjustedHour + HOUR_NOON;
    } else if (meridiem === "सकाळीं") {
      return adjustedHour;
    } else if (meridiem === "दनपारां") {
      return adjustedHour >= HOUR_NOON ? adjustedHour : adjustedHour + HOUR_NOON;
    } else if (meridiem === "सांजे") {
      return adjustedHour + HOUR_NOON;
    }

    return adjustedHour;
  },
  meridiem(hour: number, minute: number, isLower: boolean): string {
    if (hour < HOUR_NIGHT_END) {
      return "राती";
    } else if (hour < HOUR_NOON) {
      return "सकाळीं";
    } else if (hour < HOUR_AFTERNOON_END) {
      return "दनपारां";
    } else if (hour < HOUR_EVENING_END) {
      return "सांजे";
    } else {
      return "राती";
    }
  }
});