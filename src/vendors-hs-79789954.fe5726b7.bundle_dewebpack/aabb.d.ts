/**
 * 轴对齐包围盒 (AABB) 树节点
 * 用于空间划分和碰撞检测的动态AABB树数据结构
 */
declare class AABBTreeNode {
  /** 节点的轴对齐包围盒 */
  AABB: AABB;
  
  /** 与此节点关联的对象（仅叶子节点） */
  object: any | null;
  
  /** 父节点索引，-1 表示无父节点 */
  parentNodeIndex: number;
  
  /** 左子节点索引，-1 表示无左子节点 */
  leftNodeIndex: number;
  
  /** 右子节点索引，-1 表示无右子节点 */
  rightNodeIndex: number;
  
  /** 空闲节点链表中的下一个节点索引 */
  nextNodeIndex: number;

  /**
   * 判断节点是否为叶子节点
   * @returns 如果是叶子节点返回 true，否则返回 false
   */
  isLeaf(): boolean;
}

/**
 * 动态AABB树（Dynamic AABB Tree）
 * 用于高效的空间查询和碰撞检测的数据结构
 */
declare class AABBTree {
  /** 节点数组 */
  private _nodes: AABBTreeNode[];
  
  /** 对象到节点索引的映射 */
  private _objectNodeIndexMap: Map<any, number>;
  
  /** 根节点索引，-1 表示树为空 */
  private _rootNodeIndex: number;
  
  /** 已分配的节点数量 */
  private _allocatedNodeCount: number;
  
  /** 下一个空闲节点的索引 */
  private _nextFreeNodeIndex: number;
  
  /** 节点数组容量 */
  private _nodeCapacity: number;
  
  /** 容量增长大小 */
  private _growthSize: number;

  /**
   * 创建AABB树实例
   * @param initialCapacity 初始节点容量
   */
  constructor(initialCapacity: number);

  /**
   * 分配一个新节点
   * @returns 新分配节点的索引
   */
  private allocateNode(): number;

  /**
   * 释放指定节点
   * @param nodeIndex 要释放的节点索引
   */
  private deallocateNode(nodeIndex: number): void;

  /**
   * 查询与给定对象重叠的所有对象
   * @param object 查询对象，必须包含 AABB 属性
   * @returns 与查询对象重叠的所有对象数组
   */
  queryOverlaps(object: { AABB: AABB }): any[];

  /**
   * 插入叶子节点到树中
   * @param leafNodeIndex 叶子节点索引
   */
  private _insertLeaf(leafNodeIndex: number): void;

  /**
   * 从树中移除叶子节点
   * @param leafNodeIndex 叶子节点索引
   */
  private _removeLeaf(leafNodeIndex: number): void;

  /**
   * 更新叶子节点的AABB
   * @param leafNodeIndex 叶子节点索引
   * @param newAABB 新的AABB包围盒
   */
  private _updateLeaf(leafNodeIndex: number, newAABB: AABB): void;

  /**
   * 向上修复树结构，更新祖先节点的AABB
   * @param nodeIndex 起始节点索引
   */
  private _fixUpwardsTree(nodeIndex: number): void;

  /**
   * 插入对象到树中
   * @param object 要插入的对象，必须包含 AABB 属性
   */
  insertObject(object: { AABB: AABB }): void;

  /**
   * 从树中移除对象
   * @param object 要移除的对象
   */
  removeObject(object: any): void;

  /**
   * 更新对象的AABB
   * @param object 要更新的对象，必须包含 AABB 属性
   */
  updateObject(object: { AABB: AABB }): void;
}

/**
 * 轴对齐包围盒接口（从模块 809425 导入）
 */
interface AABB {
  /** 表面积 */
  surfaceArea: number;

  /**
   * 判断是否与另一个AABB重叠
   * @param other 另一个AABB
   * @param inclusive 是否包含边界接触
   * @returns 如果重叠返回 true
   */
  overlaps(other: AABB, inclusive: boolean): boolean;

  /**
   * 合并两个AABB
   * @param other 另一个AABB
   * @returns 合并后的新AABB
   */
  merge(other: AABB): AABB;

  /**
   * 判断是否完全包含另一个AABB
   * @param other 另一个AABB
   * @returns 如果包含返回 true
   */
  contains(other: AABB): boolean;
}

export = AABBTree;