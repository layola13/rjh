/**
 * HDR分组枚举
 * 定义了所有可用的HDR环境贴图分组类型
 */
export enum HdrGroup {
  /** 白天场景 */
  Day = "day",
  /** 夜晚场景 */
  Night = "night",
  /** 室外场景 */
  Outdoor = "day-outdoor",
  /** 通用场景 */
  General = "general",
  /** 装配场景 */
  Assembly = "assembly",
  /** Vifa系列场景 */
  Vifa = "vifa",
  /** Vifa黄昏场景 */
  VifaDusk = "vifa-dusk",
  /** Vifa夜晚场景 */
  VifaNight = "vifa-night",
  /** 专家模式场景 */
  Expert = "expert",
  /** 自定义场景 */
  Custom = "custom"
}

/**
 * HDR环境贴图配置项
 */
export interface HdrItem {
  /** HDR项的唯一标识符 */
  id?: string;
  /** HDR数据库中的键值 */
  key: string;
  /** 显示标签（中文名称） */
  label: string;
  /** 缩略图路径 */
  icon: string;
  /** 完整HDR图像URL */
  url: string;
  /** 是否为夜晚场景 */
  isNight?: boolean;
  /** 是否启用 */
  enabled: boolean;
  /** 是否可用 */
  available?: boolean;
}

/**
 * HDR分组数据映射
 * 键为HdrGroup枚举值，值为对应的HDR配置项数组
 */
export type BuiltinHdrGroupsMap = {
  [K in HdrGroup]: HdrItem[];
};

/**
 * 内置HDR分组配置
 * 包含所有预定义的HDR环境贴图，按场景类型分组
 */
export declare const BuiltinHdrGroups: BuiltinHdrGroupsMap;

/**
 * HDR数据库UID类型定义
 * 从外部模块导入的HDR唯一标识符
 */
export type HdrDatabaseUID = typeof import('./HdrDatabase').HDR_DATABASE.UID;