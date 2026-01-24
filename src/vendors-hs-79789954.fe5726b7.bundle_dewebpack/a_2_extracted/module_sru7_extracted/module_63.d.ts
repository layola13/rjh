/**
 * 应用标签替换状态
 * 
 * 遍历替换项数组，为目标元素设置对应的标签状态。
 * 通常用于模板引擎或状态管理系统中批量更新元素状态。
 * 
 * @param source - 包含标签和替换项的源对象
 * @param targetElements - 目标元素数组
 * @param startIndex - 起始索引位置
 */
declare function applySubstitutionStates(
  source: SubstitutionSource,
  targetElements: StateableElement[],
  startIndex: number
): void;

/**
 * 替换源对象接口
 */
interface SubstitutionSource {
  /** 标签标识符 */
  tag: string;
  
  /** 替换项数组，每个元素对应一个状态值 */
  substitution: unknown[];
}

/**
 * 可设置状态的元素接口
 */
interface StateableElement {
  /**
   * 设置元素状态
   * 
   * @param tag - 状态标签
   * @param value - 状态值
   */
  setState(tag: string, value: unknown): void;
}