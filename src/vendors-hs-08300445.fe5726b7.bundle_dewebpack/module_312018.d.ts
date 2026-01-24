/**
 * 树形结构展开状态工具模块
 * 用于处理树组件的节点展开/折叠状态变化
 */

/**
 * 查找展开状态变化结果
 */
export interface FindExpandedKeysResult {
  /** 是否为添加操作（true: 展开节点, false: 折叠节点） */
  add: boolean;
  /** 发生变化的节点键值 */
  key: string | null;
}

/**
 * 树节点数据接口
 */
export interface TreeNodeData {
  /** 节点唯一标识 */
  key: string;
  [key: string]: unknown;
}

/**
 * 树节点接口
 */
export interface TreeNode {
  /** 节点数据 */
  data: TreeNodeData;
  [key: string]: unknown;
}

/**
 * 比较两个展开键数组，找出发生变化的键
 * 
 * @param previousKeys - 之前的展开键数组
 * @param currentKeys - 当前的展开键数组
 * @returns 包含变化类型（展开/折叠）和变化键值的结果对象
 * 
 * @example
 *