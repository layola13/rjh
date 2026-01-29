export interface MomentLocale {
  months: string | string[];
  monthsShort: string | string[] | ((m: MomentInput, format: string) => string | string[]);
  monthsParseExact: boolean;
  weekdays: string | string[];
  weekdaysShort: string | string[];
  weekdaysMin: string | string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormat;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: WeekSpec;
}

interface MomentInput {
  month(): number;
}

interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface CalendarSpec {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
  sameElse: string;
}

interface RelativeTimeSpec {
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
}

interface WeekSpec {
  dow: number;
  doy: number;
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

const MONTHS_SHORT_WITH_DOTS = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_");
const MONTHS_SHORT_WITHOUT_DOTS = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");

const MMM_FORMAT_REGEX = /-MMM-/;

const FIRST_DAY_INDEX = 1;
const EIGHTH_DAY_INDEX = 8;
const TWENTY_DAYS_THRESHOLD = 20;

/**
 * Frisian (fy) locale configuration for moment.js
 */
export function configureFrisianLocale(moment: Moment): MomentLocale {
  return moment.defineLocale("fy", {
    months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
    
    monthsShort: (momentInstance: MomentInput | undefined, format: string): string | string[] => {
      if (!momentInstance) {
        return MONTHS_SHORT_WITH_DOTS;
      }
      
      return MMM_FORMAT_REGEX.test(format) 
        ? MONTHS_SHORT_WITHOUT_DOTS[momentInstance.month()] 
        : MONTHS_SHORT_WITH_DOTS[momentInstance.month()];
    },
    
    monthsParseExact: true,
    
    weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
    weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
    weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
    weekdaysParseExact: true,
    
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    
    calendar: {
      sameDay: "[hjoed om] LT",
      nextDay: "[moarn om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[juster om] LT",
      lastWeek: "[ôfrûne] dddd [om] LT",
      sameElse: "L"
    },
    
    relativeTime: {
      future: "oer %s",
      past: "%s lyn",
      s: "in pear sekonden",
      ss: "%d sekonden",
      m: "ien minút",
      mm: "%d minuten",
      h: "ien oere",
      hh: "%d oeren",
      d: "ien dei",
      dd: "%d dagen",
      M: "ien moanne",
      MM: "%d moannen",
      y: "ien jier",
      yy: "%d jierren"
    },
    
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    
    ordinal: (dayOfMonth: number): string => {
      const useSte = dayOfMonth === FIRST_DAY_INDEX || 
                     dayOfMonth === EIGHTH_DAY_INDEX || 
                     dayOfMonth >= TWENTY_DAYS_THRESHOLD;
      return `${dayOfMonth}${useSte ? "ste" : "de"}`;
    },
    
    week: {
      dow: 1,
      doy: 4
    }
  });
}