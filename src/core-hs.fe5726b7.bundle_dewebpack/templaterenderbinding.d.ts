/**
 * 渲染类型枚举
 * 定义支持的渲染场景类型
 */
export declare enum RenderType {
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
 * 用于区分不同的模板渲染场景
 */
export declare enum TemplateRenderBinding {
  /** 通用模板 */
  Common = 0,
  /** 航拍和俯视图专用模板 */
  AerialAndTopview = 1
}

/**
 * 色温配置接口
 * 定义渲染模板的色温值和昼夜状态
 */
export interface TemperatureConfig {
  /** 色温值（开尔文） */
  value: string;
  /** 是否为夜间场景 */
  isNight: boolean;
}

/**
 * 色温名称常量
 * 包含所有支持的色温预设名称
 */
export declare const TEMPERATURE_NAME: Readonly<{
  /** 自然光 */
  NATURE: "day-nature";
  /** 暖光 */
  WARM: "day-warm";
  /** 暖白光 */
  WARMWHITE: "day-warm-white";
  /** 冷光 */
  CHILLY: "day-chilly";
  /** 夜间暖光 */
  NIGHT_WARM: "night-warm";
  /** 夜间暖白光 */
  NIGHT_WARMWHITE: "night-warm-white";
  /** 夜间冷光 */
  NIGHT_CHILLY: "night-chilly";
  /** 夜间寒光 */
  NIGHT_COLD: "night-cold";
  /** 自定义 */
  CUSTOMIZED: "customized";
  /** 自然光 v2 */
  NATURE_2: "day-nature-2";
  /** 自然光 v3 */
  NATURE_3: "day-nature-3";
  /** 户外 */
  OUTDOOR: "day-outdoor";
  /** 夜间 */
  NIGHT: "night";
  /** 冷光 v3 */
  CHILLY_3: "day-chilly-3";
  /** 写实 */
  REALISTIC: "day-realistic";
  /** 通用 */
  GENERAL: "general";
  /** 装配 */
  ASSEMBLY: "assembly";
  /** VIFA 风格 */
  VIFA: "vifa";
  /** VIFA 黄昏 */
  VIFA_DUSK: "vifa-dusk";
  /** VIFA 夜间 */
  VIFA_NIGHT: "vifa-night";
  /** ACES CG 色彩空间 */
  ACESCG: "acescg";
  /** 特殊空模板 v3 */
  SPECIAL_EMPTY_V3: "special-empty-3";
  /** 写实 v2 */
  REALISTIC_V2: "day-realistic-2";
}>;

/**
 * 空模板名称常量
 * 定义默认和 v3 版本的空模板标识
 */
export declare const EMPTY_TEMPLATE: Readonly<{
  /** 默认空模板 */
  Default: "empty";
  /** v3 版本空模板 */
  V3: "empty-3";
}>;

/**
 * 空模板集合
 * 包含所有空模板名称的 Set 集合，用于快速判断
 */
export declare const TEMPLATE_EMPTY_SET: ReadonlySet<string>;

/**
 * v3 版本模板名称常量
 * 包含所有 v3 版本支持的模板名称
 */
export declare const TEMPLATE_NAME_V3: Readonly<{
  /** 空模板 v3 */
  EMPTY_3: "empty-3";
  /** 自然光 v3 */
  NATURE_3: "day-nature-3";
  /** 户外 */
  OUTDOOR: "day-outdoor";
  /** 夜间 */
  NIGHT: "night";
  /** 冷光 v3 */
  CHILLY_3: "day-chilly-3";
  /** 写实 */
  REALISTIC: "day-realistic";
  /** 通用 */
  GENERAL: "general";
  /** 装配 */
  ASSEMBLY: "assembly";
  /** VIFA 风格 */
  VIFA: "vifa";
  /** VIFA 黄昏 */
  VIFA_DUSK: "vifa-dusk";
  /** VIFA 夜间 */
  VIFA_NIGHT: "vifa-night";
  /** ACES CG 色彩空间 */
  ACESCG: "acescg";
  /** 特殊空模板 v3 */
  SPECIAL_EMPTY_V3: "special-empty-3";
  /** 写实 v2 */
  REALISTIC_V2: "day-realistic-2";
}>;

/**
 * v3 版本模板集合
 * 包含所有 v3 版本模板名称的 Set 集合，用于快速判断
 */
export declare const TEMPLATE_V3_SET: ReadonlySet<string>;

/**
 * 渲染模板配置映射
 * 将模板名称映射到对应的色温配置
 */
export declare const RenderTemplate: Readonly<Record<string, TemperatureConfig>>;