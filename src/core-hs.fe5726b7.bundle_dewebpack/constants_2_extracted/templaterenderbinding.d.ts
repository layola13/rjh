/**
 * 渲染类型枚举
 * 定义不同的渲染模式
 */
export enum RenderType {
  /** 图片渲染 */
  IMAGE = "image",
  /** 全景渲染 */
  PANORAMA = "panorama",
  /** 航拍渲染 */
  AERIAL = "aerial",
  /** 俯视图渲染 */
  TOPVIEW = "topview",
  /** 视频渲染 */
  VIDEO = "video"
}

/**
 * 模板渲染绑定类型枚举
 * 定义模板与渲染类型的绑定关系
 */
export enum TemplateRenderBinding {
  /** 通用模板绑定 */
  Common = 0,
  /** 航拍和俯视图模板绑定 */
  AerialAndTopview = 1
}

/**
 * 色温配置接口
 * 描述渲染模板的色温和时间属性
 */
export interface TemperatureConfig {
  /** 色温值（开尔文温度） */
  value: string;
  /** 是否为夜间场景 */
  isNight: boolean;
}

/**
 * 色温名称常量集合
 * 包含所有可用的色温模板名称
 */
export declare const TEMPERATURE_NAME: {
  /** 自然光 */
  readonly NATURE: "day-nature";
  /** 暖光 */
  readonly WARM: "day-warm";
  /** 暖白光 */
  readonly WARMWHITE: "day-warm-white";
  /** 冷光 */
  readonly CHILLY: "day-chilly";
  /** 夜间暖光 */
  readonly NIGHT_WARM: "night-warm";
  /** 夜间暖白光 */
  readonly NIGHT_WARMWHITE: "night-warm-white";
  /** 夜间冷光 */
  readonly NIGHT_CHILLY: "night-chilly";
  /** 夜间寒光 */
  readonly NIGHT_COLD: "night-cold";
  /** 自定义 */
  readonly CUSTOMIZED: "customized";
  /** 自然光 v2 */
  readonly NATURE_2: "day-nature-2";
  /** 自然光 v3 */
  readonly NATURE_3: "day-nature-3";
  /** 户外光 */
  readonly OUTDOOR: "day-outdoor";
  /** 夜间 */
  readonly NIGHT: "night";
  /** 冷光 v3 */
  readonly CHILLY_3: "day-chilly-3";
  /** 写实光 */
  readonly REALISTIC: "day-realistic";
  /** 通用光 */
  readonly GENERAL: "general";
  /** 集合光 */
  readonly ASSEMBLY: "assembly";
  /** VIFA 标准光 */
  readonly VIFA: "vifa";
  /** VIFA 黄昏光 */
  readonly VIFA_DUSK: "vifa-dusk";
  /** VIFA 夜间光 */
  readonly VIFA_NIGHT: "vifa-night";
  /** ACES CG 色彩空间 */
  readonly ACESCG: "acescg";
  /** 特殊空模板 v3 */
  readonly SPECIAL_EMPTY_V3: "special-empty-3";
  /** 写实光 v2 */
  readonly REALISTIC_V2: "day-realistic-2";
};

/**
 * 空模板名称常量
 * 定义默认和 v3 版本的空模板
 */
export declare const EMPTY_TEMPLATE: {
  /** 默认空模板 */
  readonly Default: "empty";
  /** v3 版本空模板 */
  readonly V3: "empty-3";
};

/**
 * 空模板集合
 * 包含所有空模板名称的 Set 集合，用于快速查找
 */
export declare const TEMPLATE_EMPTY_SET: Set<string>;

/**
 * V3 版本模板名称常量
 * 包含所有 v3 版本的模板名称
 */
export declare const TEMPLATE_NAME_V3: {
  /** 空模板 v3 */
  readonly EMPTY_3: "empty-3";
  /** 自然光 v3 */
  readonly NATURE_3: "day-nature-3";
  /** 户外光 */
  readonly OUTDOOR: "day-outdoor";
  /** 夜间 */
  readonly NIGHT: "night";
  /** 冷光 v3 */
  readonly CHILLY_3: "day-chilly-3";
  /** 写实光 */
  readonly REALISTIC: "day-realistic";
  /** 通用光 */
  readonly GENERAL: "general";
  /** 集合光 */
  readonly ASSEMBLY: "assembly";
  /** VIFA 标准光 */
  readonly VIFA: "vifa";
  /** VIFA 黄昏光 */
  readonly VIFA_DUSK: "vifa-dusk";
  /** VIFA 夜间光 */
  readonly VIFA_NIGHT: "vifa-night";
  /** ACES CG 色彩空间 */
  readonly ACESCG: "acescg";
  /** 特殊空模板 v3 */
  readonly SPECIAL_EMPTY_V3: "special-empty-3";
  /** 写实光 v2 */
  readonly REALISTIC_V2: "day-realistic-2";
};

/**
 * V3 版本模板集合
 * 包含所有 v3 版本模板名称的 Set 集合，用于快速查找
 */
export declare const TEMPLATE_V3_SET: Set<string>;

/**
 * 渲染模板配置映射表
 * 将色温名称映射到具体的色温配置对象
 */
export declare const RenderTemplate: {
  readonly [key: string]: TemperatureConfig;
  readonly "day-nature": TemperatureConfig;
  readonly "day-warm": TemperatureConfig;
  readonly "day-warm-white": TemperatureConfig;
  readonly "day-chilly": TemperatureConfig;
  readonly "day-nature-2": TemperatureConfig;
  readonly "night-warm": TemperatureConfig;
  readonly "night-warm-white": TemperatureConfig;
  readonly "night-chilly": TemperatureConfig;
  readonly "night-cold": TemperatureConfig;
  readonly "day-nature-3": TemperatureConfig;
  readonly "day-outdoor": TemperatureConfig;
  readonly "night": TemperatureConfig;
  readonly "day-chilly-3": TemperatureConfig;
  readonly "day-realistic": TemperatureConfig;
  readonly "general": TemperatureConfig;
  readonly "assembly": TemperatureConfig;
  readonly "vifa": TemperatureConfig;
  readonly "vifa-dusk": TemperatureConfig;
  readonly "vifa-night": TemperatureConfig;
  readonly "special-empty-3": TemperatureConfig;
  readonly "day-realistic-2": TemperatureConfig;
};