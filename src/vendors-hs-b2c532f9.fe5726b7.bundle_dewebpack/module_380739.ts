import moment from 'moment';

interface LocaleSpecification {
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
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Moment.js locale configuration for Yoruba (yo)
 */
function defineYorubaLocale(momentInstance: typeof moment): typeof moment {
  return momentInstance.defineLocale('yo', {
    months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split('_'),
    monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split('_'),
    weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split('_'),
    weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split('_'),
    weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split('_'),
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Ònì ni] LT',
      nextDay: '[Ọ̀la ni] LT',
      nextWeek: "dddd [Ọsẹ̀ tón'bọ] [ni] LT",
      lastDay: '[Àna ni] LT',
      lastWeek: 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'ní %s',
      past: '%s kọjá',
      s: 'ìsẹjú aayá die',
      ss: 'aayá %d',
      m: 'ìsẹjú kan',
      mm: 'ìsẹjú %d',
      h: 'wákati kan',
      hh: 'wákati %d',
      d: 'ọjọ́ kan',
      dd: 'ọjọ́ %d',
      M: 'osù kan',
      MM: 'osù %d',
      y: 'ọdún kan',
      yy: 'ọdún %d'
    },
    dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
    ordinal: 'ọjọ́ %d',
    week: {
      dow: 1,
      doy: 4
    }
  });
}

defineYorubaLocale(moment);

export default defineYorubaLocale;