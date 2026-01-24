/**
 * Aplus 事件映射配置
 * 定义所有可追踪的用户行为事件及其参数
 */

/**
 * 单个事件配置
 */
interface EventConfig {
  /** 事件ID，用于标识唯一事件 */
  id: string;
  /** 事件参数列表（可选） */
  params?: string[];
  /** 备用参数名（兼容历史拼写错误） */
  prams?: string[];
}

/**
 * Aplus 事件映射表
 * 键为事件名称（模块_操作_事件），值为事件配置
 */
interface AplusMappingConfig {
  [eventName: string]: EventConfig;
}

/**
 * Aplus 事件映射导出对象
 */
export declare const AplusMapping: AplusMappingConfig;

/**
 * 完整的事件映射类型定义
 */
export type AplusMappingType = typeof AplusMapping;

/**
 * 事件名称联合类型
 */
export type EventName = keyof AplusMappingType;

/**
 * 获取特定事件的参数类型
 */
export type EventParams<T extends EventName> = AplusMappingType[T]['params'] extends readonly string[]
  ? AplusMappingType[T]['params'][number]
  : never;