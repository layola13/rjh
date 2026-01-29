import moment from 'moment';

/**
 * Klingon (tlh) locale configuration for moment.js
 */

const KLINGON_NUMBERS = "pagh_wa'_cha'_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");

/**
 * Converts a number to Klingon number representation
 */
function convertToKlingonNumber(value: number): string {
  const hundreds = Math.floor((value % 1000) / 100);
  const tens = Math.floor((value % 100) / 10);
  const ones = value % 10;
  
  let result = "";
  
  if (hundreds > 0) {
    result += KLINGON_NUMBERS[hundreds] + "vatlh";
  }
  
  if (tens > 0) {
    result += (result !== "" ? " " : "") + KLINGON_NUMBERS[tens] + "maH";
  }
  
  if (ones > 0) {
    result += (result !== "" ? " " : "") + KLINGON_NUMBERS[ones];
  }
  
  return result === "" ? "pagh" : result;
}

/**
 * Formats relative time in Klingon with appropriate unit suffix
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  unit: string,
  isFuture: boolean
): string {
  const klingonNumber = convertToKlingonNumber(value);
  
  switch (unit) {
    case "ss":
      return klingonNumber + " lup";
    case "mm":
      return klingonNumber + " tup";
    case "hh":
      return klingonNumber + " rep";
    case "dd":
      return klingonNumber + " jaj";
    case "MM":
      return klingonNumber + " jar";
    case "yy":
      return klingonNumber + " DIS";
    default:
      return klingonNumber;
  }
}

/**
 * Formats future time expressions in Klingon
 */
function formatFuture(timeString: string): string {
  let result = timeString;
  
  if (timeString.indexOf("jaj") !== -1) {
    result = result.slice(0, -3) + "leS";
  } else if (timeString.indexOf("jar") !== -1) {
    result = result.slice(0, -3) + "waQ";
  } else if (timeString.indexOf("DIS") !== -1) {
    result = result.slice(0, -3) + "nem";
  } else {
    result = result + " pIq";
  }
  
  return result;
}

/**
 * Formats past time expressions in Klingon
 */
function formatPast(timeString: string): string {
  let result = timeString;
  
  if (timeString.indexOf("jaj") !== -1) {
    result = result.slice(0, -3) + "Hu'";
  } else if (timeString.indexOf("jar") !== -1) {
    result = result.slice(0, -3) + "wen";
  } else if (timeString.indexOf("DIS") !== -1) {
    result = result.slice(0, -3) + "ben";
  } else {
    result = result + " ret";
  }
  
  return result;
}

moment.defineLocale("tlh", {
  months: "tera' jar wa'_tera' jar cha'_tera' jar wej_tera' jar loS_tera' jar vagh_tera' jar jav_tera' jar Soch_tera' jar chorgh_tera' jar Hut_tera' jar wa'maH_tera' jar wa'maH wa'_tera' jar wa'maH cha'".split("_"),
  monthsShort: "jar wa'_jar cha'_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa'maH_jar wa'maH wa'_jar wa'maH cha'".split("_"),
  monthsParseExact: true,
  weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
  weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
  weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[DaHjaj] LT",
    nextDay: "[wa'leS] LT",
    nextWeek: "LLL",
    lastDay: "[wa'Hu'] LT",
    lastWeek: "LLL",
    sameElse: "L"
  },
  relativeTime: {
    future: formatFuture,
    past: formatPast,
    s: "puS lup",
    ss: formatRelativeTime,
    m: "wa' tup",
    mm: formatRelativeTime,
    h: "wa' rep",
    hh: formatRelativeTime,
    d: "wa' jaj",
    dd: formatRelativeTime,
    M: "wa' jar",
    MM: formatRelativeTime,
    y: "wa' DIS",
    yy: formatRelativeTime
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    doy: 4
  }
});

export default moment;