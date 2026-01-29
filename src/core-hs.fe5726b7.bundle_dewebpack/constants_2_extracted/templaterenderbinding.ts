export enum RenderType {
  IMAGE = "image",
  PANORAMA = "panorama",
  AERIAL = "aerial",
  TOPVIEW = "topview",
  VIDEO = "video"
}

export enum TemplateRenderBinding {
  Common = 0,
  AerialAndTopview = 1
}

const EMPTY_TEMPLATE_V3 = "empty-3";

const TEMPLATE_NAME_V3_BASE = {
  NATURE_3: "day-nature-3",
  OUTDOOR: "day-outdoor",
  NIGHT: "night",
  CHILLY_3: "day-chilly-3",
  REALISTIC: "day-realistic",
  GENERAL: "general",
  ASSEMBLY: "assembly",
  VIFA: "vifa",
  VIFA_DUSK: "vifa-dusk",
  VIFA_NIGHT: "vifa-night",
  ACESCG: "acescg",
  SPECIAL_EMPTY_V3: "special-empty-3",
  REALISTIC_V2: "day-realistic-2"
} as const;

Object.freeze(TEMPLATE_NAME_V3_BASE);

const TEMPERATURE_NAME_EXTENDED = {
  NATURE: "day-nature",
  WARM: "day-warm",
  WARMWHITE: "day-warm-white",
  CHILLY: "day-chilly",
  NIGHT_WARM: "night-warm",
  NIGHT_WARMWHITE: "night-warm-white",
  NIGHT_CHILLY: "night-chilly",
  NIGHT_COLD: "night-cold",
  CUSTOMIZED: "customized",
  NATURE_2: "day-nature-2"
} as const;

export const TEMPERATURE_NAME = {
  ...TEMPERATURE_NAME_EXTENDED,
  ...TEMPLATE_NAME_V3_BASE
} as const;

Object.freeze(TEMPERATURE_NAME);

export const EMPTY_TEMPLATE = {
  Default: "empty",
  V3: EMPTY_TEMPLATE_V3
} as const;

Object.freeze(EMPTY_TEMPLATE);

export const TEMPLATE_EMPTY_SET = new Set(Object.values(EMPTY_TEMPLATE));

export const TEMPLATE_NAME_V3 = {
  EMPTY_3: EMPTY_TEMPLATE_V3,
  ...TEMPLATE_NAME_V3_BASE
} as const;

Object.freeze(TEMPLATE_NAME_V3);

export const TEMPLATE_V3_SET = new Set(Object.values(TEMPLATE_NAME_V3));

interface TemplateConfig {
  value: string;
  isNight: boolean;
}

type RenderTemplateMap = {
  [K in keyof typeof TEMPERATURE_NAME]: TemplateConfig;
};

export const RenderTemplate: Readonly<RenderTemplateMap> = {
  [TEMPERATURE_NAME.NATURE]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.WARM]: {
    value: "3900",
    isNight: false
  },
  [TEMPERATURE_NAME.WARMWHITE]: {
    value: "4500",
    isNight: false
  },
  [TEMPERATURE_NAME.CHILLY]: {
    value: "7400",
    isNight: false
  },
  [TEMPERATURE_NAME.NATURE_2]: {
    value: "4500",
    isNight: false
  },
  [TEMPERATURE_NAME.NIGHT_WARM]: {
    value: "3900",
    isNight: true
  },
  [TEMPERATURE_NAME.NIGHT_WARMWHITE]: {
    value: "4500",
    isNight: true
  },
  [TEMPERATURE_NAME.NIGHT_CHILLY]: {
    value: "7400",
    isNight: true
  },
  [TEMPERATURE_NAME.NIGHT_COLD]: {
    value: "5000",
    isNight: true
  },
  [TEMPERATURE_NAME.NATURE_3]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.OUTDOOR]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.NIGHT]: {
    value: "5500",
    isNight: true
  },
  [TEMPERATURE_NAME.CHILLY_3]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.REALISTIC]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.GENERAL]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.ASSEMBLY]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.VIFA]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.VIFA_DUSK]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.VIFA_NIGHT]: {
    value: "5500",
    isNight: true
  },
  [TEMPERATURE_NAME.SPECIAL_EMPTY_V3]: {
    value: "5500",
    isNight: false
  },
  [TEMPERATURE_NAME.REALISTIC_V2]: {
    value: "5500",
    isNight: false
  }
};

Object.freeze(RenderTemplate);