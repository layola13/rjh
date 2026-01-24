/**
 * 路径搜索算法模块
 * 用于在给定的连接图中搜索有效的闭合路径
 */

import type { Vector2, Vector3, Line3 } from 'three';

/**
 * 树节点类型
 * @template T 节点数据类型
 */
interface TreeNode<T> {
  /** 节点携带的数据 */
  data: T;
  /** 父节点 */
  parent: TreeNode<T> | null;
  /** 子节点列表 */
  children: TreeNode<T>[];
  /** 2D顶点坐标 */
  vertex2d: Vector2;
  /** 是否已处理 */
  processed: boolean;
  
  /**
   * 添加子节点
   * @param data 子节点数据
   * @returns 新创建的子节点
   */
  addChild(data: T): TreeNode<T>;
  
  /**
   * 移除子节点
   * @param child 要移除的子节点
   */
  removeChild(child: TreeNode<T>): void;
  
  /**
   * 获取祖先链
   * @param includeSelf 是否包含自身
   * @param predicate 可选的过滤条件
   * @returns 祖先节点数组
   */
  getAncestorChain(includeSelf: boolean, predicate?: (node: TreeNode<T>) => boolean): TreeNode<T>[];
  
  /**
   * 搜索祖先节点
   * @param includeSelf 是否包含自身
   * @param predicate 匹配条件
   * @returns 匹配的祖先节点或undefined
   */
  searchAncestor(includeSelf: boolean, predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined;
}

/**
 * 下一个对象获取函数类型
 * @template T 对象类型
 */
type NextObjectsFunc<T> = (obj: T) => T[];

/**
 * 对象到2D顶点转换函数类型
 * @template T 对象类型
 */
type ObjToVertex2dFunc<T> = (obj: T) => Vector2;

/**
 * 对象到ID转换函数类型
 * @template T 对象类型
 */
type ObjToIdFunc<T> = (obj: T) => string | number;

/**
 * 循环路径结果
 * @template T 对象类型
 */
interface LoopResult<T> {
  /** 对象循环路径 */
  objLoop: T[];
  /** 2D顶点循环路径 */
  vertex2dLoop: Vector2[];
}

/**
 * 路径搜索器类
 * 在连接图中搜索从起点到终点的有效闭合路径
 * @template T 节点数据类型
 */
declare class PathSearcher<T> {
  /**
   * 获取下一个连接对象的函数 */
  nextObjsFunc: NextObjectsFunc<T>;
  
  /**
   * 将对象转换为2D顶点的函数
   */
  objToVertex2dFunc: ObjToVertex2dFunc<T>;
  
  /**
   * 将对象转换为唯一标识符的函数
   */
  objToIdFunc: ObjToIdFunc<T>;
  
  /**
   * 法向量，用于确定方向
   */
  normal: Vector3;
  
  /**
   * 有效边集合（已验证可用的边）
   */
  validEdges: Set<string>;
  
  /**
   * 无效边集合（已验证不可用的边）
   */
  invalidEdges: Set<string>;
  
  /**
   * 连接映射缓存
   */
  connectsMap: Map<T, T[]>;
  
  /**
   * 搜索树的根节点
   */
  root?: TreeNode<T>;
  
  /**
   * 搜索的出口节点
   */
  outNode?: TreeNode<T>;
  
  /**
   * 源路径线段数组
   */
  sourceLines: Line3[];
  
  /**
   * 构造函数
   * @param normal 法向量
   * @param nextObjsFunc 获取下一个连接对象的函数
   * @param objToVertex2dFunc 对象转2D顶点函数
   * @param objToIdFunc 对象转ID函数
   */
  constructor(
    normal: Vector3,
    nextObjsFunc: NextObjectsFunc<T>,
    objToVertex2dFunc: ObjToVertex2dFunc<T>,
    objToIdFunc: ObjToIdFunc<T>
  );
  
  /**
   * 搜索闭合路径
   * @param segments 初始路径段数组
   * @returns 找到的所有有效闭合路径数组
   */
  search(segments: T[]): T[][];
  
  /**
   * 内部搜索实现
   * @param segments 初始路径段
   * @param searchDirection 搜索方向（true为正向，false为反向）
   * @returns 找到的节点链或undefined
   * @private
   */
  _search(segments: T[], searchDirection: boolean): TreeNode<T>[] | undefined;
  
  /**
   * 为节点添加子节点
   * @param parentNode 父节点
   * @param data 子节点数据
   * @returns 新创建的子节点
   * @private
   */
  _addNodeChild(parentNode: TreeNode<T>, data: T): TreeNode<T>;
  
  /**
   * 初始化路径段节点
   * @param segments 路径段数组
   * @private
   */
  _initSegmentNodes(segments: T[]): void;
  
  /**
   * 检查节点是否符合条件
   * @param node 要检查的节点
   * @returns 是否符合条件
   * @private
   */
  _isQualifiedNode(node: TreeNode<T>): boolean;
  
  /**
   * 检查节点路径是否与源线段相交
   * @param node 要检查的节点
   * @returns 是否存在相交
   * @private
   */
  _hasIntersectionWithSourceLines(node: TreeNode<T>): boolean;
  
  /**
   * 移除最小分支
   * @param node 起始节点
   * @returns 移除后的父节点
   * @private
   */
  _removeMinimumBranch(node: TreeNode<T>): TreeNode<T> | undefined;
  
  /**
   * 搜索最近的未处理节点
   * @param node 起始节点
   * @param includeChildren 是否包含子节点
   * @param searchDirection 搜索方向
   * @returns 找到的节点或undefined
   * @private
   */
  _searchNearestNoneProcessedNode(
    node: TreeNode<T>,
    includeChildren: boolean,
    searchDirection: boolean
  ): TreeNode<T> | undefined;
  
  /**
   * 按角度排序下一个连接
   * @param node 当前节点
   * @param connections 连接对象数组
   * @returns 排序后的连接数组
   * @private
   */
  _sortNextConnections(node: TreeNode<T>, connections: T[]): T[];
  
  /**
   * 添加有效边
   * @param from 起始对象
   * @param to 目标对象
   * @private
   */
  _addValidEdge(from: T, to: T): void;
  
  /**
   * 检查是否为有效边
   * @param from 起始对象
   * @param to 目标对象
   * @returns 是否为有效边
   * @private
   */
  _isValidEdge(from: T, to: T): boolean;
  
  /**
   * 移除有效边
   * @param from 起始对象
   * @param to 目标对象
   * @private
   */
  _removeValidEdge(from: T, to: T): void;
  
  /**
   * 添加无效边
   * @param from 起始对象
   * @param to 目标对象
   * @private
   */
  _addInvalidEdge(from: T, to: T): void;
  
  /**
   * 检查是否为无效边
   * @param from 起始对象
   * @param to 目标对象
   * @returns 是否为无效边
   * @private
   */
  _isInvalidEdge(from: T, to: T): boolean;
  
  /**
   * 获取边的文本标识
   * @param from 起始对象
   * @param to 目标对象
   * @returns 边的唯一标识字符串
   * @private
   */
  _getEdgeText(from: T, to: T): string;
}

export = PathSearcher;