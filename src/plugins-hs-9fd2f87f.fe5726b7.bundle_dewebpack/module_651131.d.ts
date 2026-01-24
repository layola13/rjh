/**
 * 设计元数据转换工具模块
 * 提供设计方案元数据的转换、结构类型名称映射和光照模板名称本地化功能
 */

/**
 * 房间信息接口
 */
export interface Room {
  /** 房间内的内容物列表（转换时会被删除） */
  contentsInRoom?: unknown;
  /** 估算的房间类型（转换时会被删除） */
  estimatedRoomType?: string;
  /** 其他布尔类型属性会被转换为 0 或 1 */
  [key: string]: unknown;
}

/**
 * 图层信息接口
 */
export interface Layer {
  /** 图层内容数量 */
  contentCount: number;
  [key: string]: unknown;
}

/**
 * 设计元数据输入接口
 */
export interface DesignMetaInput {
  /** 建筑面积 */
  area: number;
  /** 内容总数 */
  contentCount?: number;
  /** 图层列表 */
  layers?: Layer[];
  /** 房间列表 */
  rooms: Room[];
  /** 窗户类型列表 */
  windowTypes: string[];
  /** 门类型列表 */
  doorTypes: string[];
  /** 结构类型列表 */
  structureTypes: string[];
  /** 大型内容物类型列表 */
  largeContentTypes: string[];
  /** 手动光照模板名称 */
  manualLightBasedTemplateName: string[];
  /** 其他布尔类型属性 */
  [key: string]: unknown;
}

/**
 * 设计元数据输出接口
 */
export interface DesignMetaOutput {
  /** 建筑总面积（由 area 重命名而来） */
  grossFloorArea: number;
  /** 内容总数（从图层聚合或使用原值） */
  contentCount: number;
  /** 房间列表的 JSON 字符串 */
  rooms: string;
  /** 窗户类型，逗号分隔的字符串 */
  windowTypes: string;
  /** 门类型，逗号分隔的字符串 */
  doorTypes: string;
  /** 结构类型，逗号分隔的字符串 */
  structureTypes: string;
  /** 大型内容物类型，逗号分隔的字符串 */
  largeContentTypes: string;
  /** 手动光照模板名称，逗号分隔的字符串 */
  manualLightBasedTemplateName: string;
  /** 其他属性（布尔值已转换为 0 或 1） */
  [key: string]: unknown;
}

/**
 * 结构类型枚举
 */
export type StructureType = 'flue' | 'squareColumn' | 'circleColumn' | 'riser' | string;

/**
 * 光照模板名称类型
 */
export type LightTemplateName =
  | 'intelligent-general'
  | 'intelligent-day-realistic'
  | 'intelligent-assembly'
  | 'intelligent-night'
  | 'intelligent-day-chilly-3'
  | 'intelligent-day-nature-3'
  | 'normal-day-outdoor'
  | 'normal-empty-3'
  | 'normal-empty'
  | 'general'
  | 'day-realistic'
  | 'assembly'
  | 'night'
  | 'day-chilly-3'
  | 'day-nature-3'
  | 'day-outdoor'
  | string;

/**
 * 转换设计元数据为标准化格式
 * 
 * @remarks
 * 执行以下转换操作：
 * - 将 `area` 重命名为 `grossFloorArea`
 * - 从图层聚合 `contentCount`
 * - 将布尔值转换为数字（true → 1, false → 0）
 * - 删除房间对象中的 `contentsInRoom` 和 `estimatedRoomType` 属性
 * - 将房间列表序列化为 JSON 字符串
 * - 将数组类型字段转换为逗号分隔的字符串
 * 
 * @param meta - 原始设计元数据对象
 * @returns 转换后的设计元数据对象
 */
export function convertDesignMeta(meta: DesignMetaInput): DesignMetaOutput;

/**
 * 获取结构类型的中文名称
 * 
 * @param type - 结构类型标识符
 * @returns 对应的中文名称，如果类型未知则返回原值
 * 
 * @example
 *