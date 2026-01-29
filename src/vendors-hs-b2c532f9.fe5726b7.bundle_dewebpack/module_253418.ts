import moment from 'moment';

interface MomentLocale {
  monthsNominativeEl: string[];
  monthsGenitiveEl: string[];
  months: (date: moment.Moment | null, format: string) => string[] | string;
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  meridiem: (hours: number, minutes: number, isLower: boolean) => string;
  isPM: (input: string) => boolean;
  meridiemParse: RegExp;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  calendarEl: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: (this: moment.Moment) => string;
    sameElse: string;
  };
  calendar: (key: string, currentMoment: moment.Moment | null) => string;
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
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

const MONTHS_NOMINATIVE = "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_");
const MONTHS_GENITIVE = "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_");

function isFunction(value: unknown): value is Function {
  return typeof value === 'function' || Object.prototype.toString.call(value) === '[object Function]';
}

moment.defineLocale("el", {
  monthsNominativeEl: MONTHS_NOMINATIVE,
  monthsGenitiveEl: MONTHS_GENITIVE,
  months(date: moment.Moment | null, format: string): string[] | string {
    if (!date) {
      return this._monthsNominativeEl;
    }
    
    if (typeof format === "string" && /D/.test(format.substring(0, format.indexOf("MMMM")))) {
      return this._monthsGenitiveEl[date.month()];
    }
    
    return this._monthsNominativeEl[date.month()];
  },
  monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
  weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
  weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
  weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
  meridiem(hours: number, minutes: number, isLower: boolean): string {
    return hours > 11 ? (isLower ? "μμ" : "ΜΜ") : (isLower ? "πμ" : "ΠΜ");
  },
  isPM(input: string): boolean {
    return (input + "").toLowerCase()[0] === "μ";
  },
  meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY h:mm A",
    LLLL: "dddd, D MMMM YYYY h:mm A"
  },
  calendarEl: {
    sameDay: "[Σήμερα {}] LT",
    nextDay: "[Αύριο {}] LT",
    nextWeek: "dddd [{}] LT",
    lastDay: "[Χθες {}] LT",
    lastWeek(this: moment.Moment): string {
      return this.day() === 6 
        ? "[το προηγούμενο] dddd [{}] LT" 
        : "[την προηγούμενη] dddd [{}] LT";
    },
    sameElse: "L"
  },
  calendar(key: string, currentMoment: moment.Moment | null): string {
    let template = this._calendarEl[key];
    const hours = currentMoment?.hours() ?? 0;
    
    if (isFunction(template)) {
      template = template.apply(currentMoment);
    }
    
    const timeMarker = hours % 12 === 1 ? "στη" : "στις";
    return template.replace("{}", timeMarker);
  },
  relativeTime: {
    future: "σε %s",
    past: "%s πριν",
    s: "λίγα δευτερόλεπτα",
    ss: "%d δευτερόλεπτα",
    m: "ένα λεπτό",
    mm: "%d λεπτά",
    h: "μία ώρα",
    hh: "%d ώρες",
    d: "μία μέρα",
    dd: "%d μέρες",
    M: "ένας μήνας",
    MM: "%d μήνες",
    y: "ένας χρόνος",
    yy: "%d χρόνια"
  },
  dayOfMonthOrdinalParse: /\d{1,2}η/,
  ordinal: "%dη",
  week: {
    dow: 1,
    doy: 4
  }
});

export default moment.locale("el");