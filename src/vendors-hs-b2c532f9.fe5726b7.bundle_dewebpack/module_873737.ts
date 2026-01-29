interface LocaleUnit {
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

interface MomentLocale {
  months: string[];
  monthsShort: string[];
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
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: (count: number, withoutSuffix: boolean) => string;
    ss: (count: number, withoutSuffix: boolean, key: string) => string;
    m: (count: number, withoutSuffix: boolean, key: string) => string;
    mm: (count: number, withoutSuffix: boolean, key: string) => string;
    h: (count: number, withoutSuffix: boolean, key: string) => string;
    hh: (count: number, withoutSuffix: boolean, key: string) => string;
    d: (count: number, withoutSuffix: boolean, key: string) => string;
    dd: (count: number, withoutSuffix: boolean, key: string) => string;
    M: (count: number, withoutSuffix: boolean, key: string) => string;
    MM: (count: number, withoutSuffix: boolean, key: string) => string;
    y: (count: number, withoutSuffix: boolean, key: string) => string;
    yy: (count: number, withoutSuffix: boolean, key: string) => string;
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
}

const localeUnits: LocaleUnit = {
  ss: "sekundes_sekundēm_sekunde_sekundes".split("_"),
  m: "minūtes_minūtēm_minūte_minūtes".split("_"),
  mm: "minūtes_minūtēm_minūte_minūtes".split("_"),
  h: "stundas_stundām_stunda_stundas".split("_"),
  hh: "stundas_stundām_stunda_stundas".split("_"),
  d: "dienas_dienām_diena_dienas".split("_"),
  dd: "dienas_dienām_diena_dienas".split("_"),
  M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
  MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
  y: "gada_gadiem_gads_gadi".split("_"),
  yy: "gada_gadiem_gads_gadi".split("_")
};

function selectForm(forms: string[], count: number, withoutSuffix: boolean): string {
  if (withoutSuffix) {
    return count % 10 === 1 && count % 100 !== 11 ? forms[2] : forms[3];
  }
  return count % 10 === 1 && count % 100 !== 11 ? forms[0] : forms[1];
}

function formatWithNumber(count: number, withoutSuffix: boolean, key: keyof LocaleUnit): string {
  return `${count} ${selectForm(localeUnits[key], count, withoutSuffix)}`;
}

function formatWithoutNumber(count: number, withoutSuffix: boolean, key: keyof LocaleUnit): string {
  return selectForm(localeUnits[key], count, withoutSuffix);
}

export function initLatvianLocale(moment: Moment): unknown {
  return moment.defineLocale("lv", {
    months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
    monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
    weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
    weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
    weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY.",
      LL: "YYYY. [gada] D. MMMM",
      LLL: "YYYY. [gada] D. MMMM, HH:mm",
      LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
    },
    calendar: {
      sameDay: "[Šodien pulksten] LT",
      nextDay: "[Rīt pulksten] LT",
      nextWeek: "dddd [pulksten] LT",
      lastDay: "[Vakar pulksten] LT",
      lastWeek: "[Pagājušā] dddd [pulksten] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "pēc %s",
      past: "pirms %s",
      s: (count: number, withoutSuffix: boolean): string => {
        return withoutSuffix ? "dažas sekundes" : "dažām sekundēm";
      },
      ss: formatWithNumber,
      m: formatWithoutNumber,
      mm: formatWithNumber,
      h: formatWithoutNumber,
      hh: formatWithNumber,
      d: formatWithoutNumber,
      dd: formatWithNumber,
      M: formatWithoutNumber,
      MM: formatWithNumber,
      y: formatWithoutNumber,
      yy: formatWithNumber
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}