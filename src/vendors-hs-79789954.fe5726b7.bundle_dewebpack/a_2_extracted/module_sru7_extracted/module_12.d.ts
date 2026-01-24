/**
 * 状态设置模块
 * @module module_12
 */

/**
 * 状态参数接口
 */
interface StateParams {
  /** 状态标签 */
  tag: string;
  /** 替换值 */
  substitution: unknown;
}

/**
 * 状态管理器接口
 */
interface StateManager {
  /**
   * 设置指定标签的状态
   * @param tag - 状态标签
   * @param substitution - 要设置的值
   */
  setState(tag: string, substitution: unknown): void;
}

/**
 * 在状态管理器中设置状态
 * @param params - 包含标签和替换值的参数对象
 * @param managers - 状态管理器数组或对象
 * @param index - 管理器索引或键
 */
declare function setStateInManager(
  params: StateParams,
  managers: Record<string | number, StateManager> | StateManager[],
  index: string | number
): void;

export { StateParams, StateManager, setStateInManager };