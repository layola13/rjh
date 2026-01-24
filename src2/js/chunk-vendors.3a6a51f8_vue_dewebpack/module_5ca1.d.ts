/**
 * 导出标志位枚举
 * 用于控制模块导出的行为和目标
 */
export enum ExportFlags {
  /** Forced - 强制导出，即使属性已存在也覆盖 */
  F = 1,
  /** Global - 导出到全局对象 */
  G = 2,
  /** Static - 导出到构造函数静态属性 */
  S = 4,
  /** Prototype - 导出到原型对象 */
  P = 8,
  /** Bind - 绑定this上下文 */
  B = 16,
  /** Wrap - 包装函数 */
  W = 32,
  /** Unsafe - 不安全模式，允许覆盖不可配置属性 */
  U = 64,
  /** Real - 真实原型，使用真实的prototype */
  R = 128
}

/**
 * 全局对象引用类型
 */
export interface GlobalObject {
  [key: string]: unknown;
  core?: Record<string, unknown>;
}

/**
 * 核心库对象类型
 */
export interface CoreLibrary {
  [key: string]: Record<string, unknown>;
}

/**
 * 导出配置接口
 */
export interface ExportConfig {
  /** 导出标志位的组合 */
  flags: number;
  /** 目标模块名称 */
  target: string;
  /** 要导出的方法/属性集合 */
  source: Record<string, unknown>;
}

/**
 * 核心导出函数类型
 * @param flags - 导出标志位（可通过位运算组合多个ExportFlags）
 * @param target - 目标模块名称或导出对象
 * @param source - 源对象，包含要导出的属性和方法
 */
export interface ExportFunction {
  (flags: number, target: string | Record<string, unknown>, source: Record<string, unknown>): void;
  
  /** Forced - 强制导出标志 */
  readonly F: 1;
  /** Global - 全局导出标志 */
  readonly G: 2;
  /** Static - 静态导出标志 */
  readonly S: 4;
  /** Prototype - 原型导出标志 */
  readonly P: 8;
  /** Bind - 绑定上下文标志 */
  readonly B: 16;
  /** Wrap - 包装函数标志 */
  readonly W: 32;
  /** Unsafe - 不安全模式标志 */
  readonly U: 64;
  /** Real - 真实原型标志 */
  readonly R: 128;
}

/**
 * 默认导出：核心模块导出函数
 * 用于polyfill或扩展JavaScript内置对象
 */
declare const exportModule: ExportFunction;

export default exportModule;