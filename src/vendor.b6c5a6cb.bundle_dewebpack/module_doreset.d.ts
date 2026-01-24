/**
 * 配置接口，包含重置相关参数
 */
interface ResetConfig {
  /** 需要丢弃/跳过的迭代次数 */
  drop: number;
}

/**
 * 基础重置接口，定义核心重置方法
 */
interface BaseResettable {
  /** 执行基础重置操作 */
  _doReset(): void;
}

/**
 * 可重置对象接口，包含配置和重置能力
 */
interface Resettable extends BaseResettable {
  /** 重置配置对象 */
  cfg: ResetConfig;
  
  /**
   * 执行完整的重置操作
   * 调用基础重置后，根据配置执行额外的丢弃操作
   */
  doReset(): void;
}

/**
 * 执行完整的重置操作
 * 
 * @remarks
 * 此方法首先调用基础的 `_doReset` 方法，然后根据 `cfg.drop` 配置
 * 循环执行指定次数的额外操作（可能用于预热或状态清理）
 * 
 * @this {Resettable} 可重置对象实例
 */
declare function doReset(this: Resettable): void;