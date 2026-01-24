/**
 * 组件状态枚举
 * 定义了UI组件的各种显示状态
 */
declare enum ComponentStatus {
  /** 加载中状态 */
  Loading = "Loading",
  /** 错误状态 */
  Error = "Error",
  /** 空状态（无数据） */
  Empty = "Empty",
  /** 无状态 */
  None = "None"
}

/**
 * 组件状态配置对象
 * 用于描述UI组件可能处于的各种状态
 */
export interface ComponentStatusConfig {
  /** 加载中状态 */
  readonly Loading: "Loading";
  /** 错误状态 */
  readonly Error: "Error";
  /** 空状态（无数据） */
  readonly Empty: "Empty";
  /** 无状态 */
  readonly None: "None";
}

/**
 * 组件状态常量对象
 */
declare const componentStatus: ComponentStatusConfig;

export default componentStatus;

/**
 * 组件状态类型
 * 可用的状态值联合类型
 */
export type StatusType = ComponentStatusConfig[keyof ComponentStatusConfig];