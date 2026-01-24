/**
 * DOM 节点接口
 * 表示包含原生 DOM 节点的对象
 */
interface NodeWrapper {
  /** 原生 DOM 节点引用 */
  node: Node;
}

/**
 * 获取指定子节点在当前节点的子节点列表中的索引位置
 * 
 * @param element - 要查找的子元素，必须包含 node 属性
 * @returns 子节点的索引位置（从 0 开始），如果未找到则返回 -1
 * 
 * @example
 *