interface LocaleTimeUnit {
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

interface MomentLocale {
  months: {
    format: string[];
    standalone: string[];
    isFormat: RegExp;
  };
  monthsShort: string[];
  weekdays: {
    format: string[];
    standalone: string[];
    isFormat: RegExp;
  };
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
    l: string;
    ll: string;
    lll: string;
    llll: string;
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
    s: (count: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string;
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
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

const TIME_UNITS: LocaleTimeUnit = {
  ss: "sekundė_sekundžių_sekundes",
  m: "minutė_minutės_minutę",
  mm: "minutės_minučių_minutes",
  h: "valanda_valandos_valandą",
  hh: "valandos_valandų_valandas",
  d: "diena_dienos_dieną",
  dd: "dienos_dienų_dienas",
  M: "mėnuo_mėnesio_mėnesį",
  MM: "mėnesiai_mėnesių_mėnesius",
  y: "metai_metų_metus",
  yy: "metai_metų_metus"
};

function getSingularForm(
  count: number,
  withoutSuffix: boolean,
  key: keyof LocaleTimeUnit,
  isFuture: boolean
): string {
  return withoutSuffix 
    ? splitTimeUnit(key)[0] 
    : isFuture 
      ? splitTimeUnit(key)[1] 
      : splitTimeUnit(key)[2];
}

function isPlural(count: number): boolean {
  return count % 10 === 0 || (count > 10 && count < 20);
}

function splitTimeUnit(key: keyof LocaleTimeUnit): string[] {
  return TIME_UNITS[key].split("_");
}

function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: keyof LocaleTimeUnit,
  isFuture: boolean
): string {
  const result = `${count} `;
  
  if (count === 1) {
    return result + getSingularForm(0, withoutSuffix, key, isFuture);
  }
  
  if (withoutSuffix) {
    return result + (isPlural(count) ? splitTimeUnit(key)[1] : splitTimeUnit(key)[0]);
  }
  
  if (isFuture) {
    return result + splitTimeUnit(key)[1];
  }
  
  return result + (isPlural(count) ? splitTimeUnit(key)[1] : splitTimeUnit(key)[2]);
}

function formatSeconds(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  return withoutSuffix 
    ? "kelios sekundės" 
    : isFuture 
      ? "kelių sekundžių" 
      : "kelias sekundes";
}

export function defineLithuanianLocale(moment: Moment): MomentLocale {
  return moment.defineLocale("lt", {
    months: {
      format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
      standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
      isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
    weekdays: {
      format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),
      standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),
      isFormat: /dddd HH:mm/
    },
    weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
    weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "YYYY [m.] MMMM D [d.]",
      LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
      LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
      l: "YYYY-MM-DD",
      ll: "YYYY [m.] MMMM D [d.]",
      lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
      llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
    },
    calendar: {
      sameDay: "[Šiandien] LT",
      nextDay: "[Rytoj] LT",
      nextWeek: "dddd LT",
      lastDay: "[Vakar] LT",
      lastWeek: "[Praėjusį] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "po %s",
      past: "prieš %s",
      s: formatSeconds,
      ss: formatRelativeTime,
      m: getSingularForm,
      mm: formatRelativeTime,
      h: getSingularForm,
      hh: formatRelativeTime,
      d: getSingularForm,
      dd: formatRelativeTime,
      M: getSingularForm,
      MM: formatRelativeTime,
      y: getSingularForm,
      yy: formatRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal: (num: number): string => `${num}-oji`,
    week: {
      dow: 1,
      doy: 4
    }
  });
}