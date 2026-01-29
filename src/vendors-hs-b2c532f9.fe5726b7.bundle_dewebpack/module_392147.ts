interface MomentLocale {
  months: {
    standalone: string[];
    format: string[];
    isFormat: RegExp;
  };
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
    ll: string;
    LLL: string;
    lll: string;
    LLLL: string;
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
  ordinal: (num: number, token: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(localeName: string, config: MomentLocale): Moment;
}

/**
 * Moment.js locale configuration for Occitan (oc-lnc)
 */
export function defineOccitanLocale(moment: Moment): Moment {
  return moment.defineLocale("oc-lnc", {
    months: {
      standalone: "genièr_febrièr_març_abril_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"),
      format: "de genièr_de febrièr_de març_d'abril_de mai_de junh_de julhet_d'agost_de setembre_d'octòbre_de novembre_de decembre".split("_"),
      isFormat: /D[oD]?(\s)+MMMM/
    },
    monthsShort: "gen._febr._març_abr._mai_junh_julh._ago._set._oct._nov._dec.".split("_"),
    monthsParseExact: true,
    weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"),
    weekdaysShort: "dg._dl._dm._dc._dj._dv._ds.".split("_"),
    weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM [de] YYYY",
      ll: "D MMM YYYY",
      LLL: "D MMMM [de] YYYY [a] H:mm",
      lll: "D MMM YYYY, H:mm",
      LLLL: "dddd D MMMM [de] YYYY [a] H:mm",
      llll: "ddd D MMM YYYY, H:mm"
    },
    calendar: {
      sameDay: "[uèi a] LT",
      nextDay: "[deman a] LT",
      nextWeek: "dddd [a] LT",
      lastDay: "[ièr a] LT",
      lastWeek: "dddd [passat a] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "d'aquí %s",
      past: "fa %s",
      s: "unas segondas",
      ss: "%d segondas",
      m: "una minuta",
      mm: "%d minutas",
      h: "una ora",
      hh: "%d oras",
      d: "un jorn",
      dd: "%d jorns",
      M: "un mes",
      MM: "%d meses",
      y: "un an",
      yy: "%d ans"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
    ordinal: (num: number, token: string): string => {
      const ORDINAL_SUFFIX_MAP: Record<number, string> = {
        1: "r",
        2: "n",
        3: "r",
        4: "t"
      };
      
      let suffix = ORDINAL_SUFFIX_MAP[num] ?? "è";
      
      if (token === "w" || token === "W") {
        suffix = "a";
      }
      
      return num + suffix;
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}