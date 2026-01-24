/**
 * 图连通分量查找模块
 * 
 * 查找有向图中的所有强连通分量（或无向图中的连通分量）
 */

/**
 * 图节点标识符类型
 */
export type NodeId = string | number;

/**
 * 图接口定义
 * 表示一个具有节点和边的图结构
 */
export interface Graph {
  /**
   * 获取图中所有节点的 ID 列表
   * @returns 节点 ID 数组
   */
  nodes(): NodeId[];

  /**
   * 获取指定节点的所有后继节点（出边指向的节点）
   * @param nodeId - 节点 ID
   * @returns 后继节点 ID 数组
   */
  successors(nodeId: NodeId): NodeId[];

  /**
   * 获取指定节点的所有前驱节点（入边来源的节点）
   * @param nodeId - 节点 ID
   * @returns 前驱节点 ID 数组
   */
  predecessors(nodeId: NodeId): NodeId[];
}

/**
 * 连通分量集合类型
 * 每个内部数组代表一个连通分量，包含该分量中的所有节点 ID
 */
export type ConnectedComponents = NodeId[][];

/**
 * 查找图中的所有连通分量
 * 
 * 使用深度优先搜索遍历图，识别所有相互连接的节点组。
 * 对于有向图，找到的是弱连通分量（忽略边的方向）。
 * 
 * @param graph - 要分析的图对象
 * @returns 连通分量数组，每个元素是一个包含相互连接节点 ID 的数组
 * 
 * @example
 *