/**
 * 设置标签状态的处理函数
 * 用于在状态管理器中更新特定标签的替换值
 * 
 * @param tagData - 包含标签和替换内容的数据对象
 * @param stateManagers - 状态管理器数组
 * @param managerIndex - 要操作的状态管理器索引
 */
declare function setTagState(
  tagData: TagData,
  stateManagers: StateManager[],
  managerIndex: number
): void;

/**
 * 标签数据接口
 * 描述标签及其替换内容的结构
 */
interface TagData {
  /** 标签标识符 */
  tag: string;
  /** 标签的替换内容或值 */
  substitution: string | unknown;
}

/**
 * 状态管理器接口
 * 提供设置状态的能力
 */
interface StateManager {
  /**
   * 设置指定标签的状态
   * @param tag - 标签标识符
   * @param value - 要设置的值
   */
  setState(tag: string, value: unknown): void;
}