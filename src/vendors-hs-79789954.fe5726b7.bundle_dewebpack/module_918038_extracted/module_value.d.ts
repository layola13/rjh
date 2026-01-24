/**
 * 子节点接口
 * 表示可以被添加到父节点中的任何子元素
 */
interface ChildNode {
  /** 节点的唯一标识符或索引 */
  id?: string | number;
  /** 节点类型 */
  type?: string;
  /** 其他节点属性 */
  [key: string]: unknown;
}

/**
 * 包含子节点管理功能的父节点接口
 */
interface ParentNode {
  /**
   * 子节点集合
   * 存储所有当前附加到此父节点的子元素
   */
  _children: ChildNode[];

  /**
   * 移除单个子节点
   * @param child - 要移除的子节点
   * @param shouldDestroy - 是否完全销毁子节点（释放资源、解绑事件等）
   * @returns void
   */
  removeChild(child: ChildNode, shouldDestroy: boolean): void;

  /**
   * 清除所有子节点
   * 遍历并移除当前父节点的所有子元素
   * 
   * @param shouldDestroy - 可选参数，指示是否完全销毁子节点
   *                        - true: 完全销毁子节点，释放所有相关资源
   *                        - false/undefined: 仅从父节点中移除引用
   * @returns void
   * 
   * @example
   *