/**
 * Point类型 - 二维坐标点
 */
interface Point {
  x: number;
  y: number;
  /** 内部使用的边列表 */
  _p2t_edge_list?: Edge[];
}

/**
 * Edge类 - 表示多边形的边
 * 边由两个点定义,构造时会自动排序确保p点在下方或左侧
 */
declare class Edge {
  /** 起始点（较低或较左的点） */
  p: Point;
  /** 结束点（较高或较右的点） */
  q: Point;

  /**
   * 创建一个边
   * @param pointA - 第一个点
   * @param pointB - 第二个点
   * @throws {Error} 当两个点重复时抛出 "poly2tri Invalid Edge constructor: repeated points!" 错误
   */
  constructor(pointA: Point, pointB: Point);
}

/**
 * Basin结构 - 用于三角化过程中的盆地填充算法
 */
declare class Basin {
  /** 左侧节点 */
  left_node: Node | null;
  /** 底部节点 */
  bottom_node: Node | null;
  /** 右侧节点 */
  right_node: Node | null;
  /** 盆地宽度 */
  width: number;
  /** 标记左侧是否为最高点 */
  left_highest: boolean;

  constructor();

  /**
   * 清空盆地数据
   */
  clear(): void;
}

/**
 * EdgeEvent结构 - 边事件信息
 * 用于处理约束边的事件
 */
declare class EdgeEvent {
  /** 约束边 */
  constrained_edge: Edge | null;
  /** 方向标志 */
  right: boolean;

  constructor();
}

/**
 * Triangle类型 - 三角形
 */
interface Triangle {
  /**
   * 获取指定索引的邻居三角形
   * @param index - 邻居索引 (0-2)
   */
  getNeighbor(index: number): Triangle | null;

  /**
   * 获取指定索引的点
   * @param index - 点索引 (0-2)
   */
  getPoint(index: number): Point;

  /**
   * 获取指定点顺时针方向的下一个点
   * @param point - 参考点
   */
  pointCW(point: Point): Point;

  /** 约束边标记数组 */
  constrained_edge: boolean[];

  /**
   * 检查三角形是否为内部三角形
   */
  isInterior(): boolean;

  /**
   * 设置三角形的内部标记
   * @param interior - 是否为内部三角形
   */
  setInterior(interior: boolean): void;
}

/**
 * Node类型 - 前沿节点
 */
interface Node {
  /** 关联的点 */
  point: Point;
  /** 关联的三角形 */
  triangle: Triangle | null;
  /** 下一个节点 */
  next: Node | null;
  /** 前一个节点 */
  prev: Node | null;
  /** 节点值（通常为x坐标） */
  value: number;
}

/**
 * AdvancingFront类型 - 推进前沿
 */
interface AdvancingFront {
  /**
   * 根据x坐标定位节点
   * @param x - x坐标值
   */
  locateNode(x: number): Node | null;

  /**
   * 根据点定位最近的节点
   * @param point - 参考点
   */
  locatePoint(point: Point): Node | null;
}

/**
 * SweepContext配置选项
 */
interface SweepContextOptions {
  /** 是否克隆输入的点数组（默认为false，直接使用传入的数组） */
  cloneArrays?: boolean;
}

/**
 * SweepContext类 - 扫描线三角化上下文
 * 
 * 该类管理多边形三角化的整个过程，包括：
 * - 点集合和边的管理
 * - 三角形网格的生成
 * - 推进前沿算法的状态维护
 */
declare class SweepContext {
  /** 生成的三角形数组 */
  private triangles_: Triangle[];
  /** 三角形映射表 */
  private map_: Triangle[];
  /** 输入点集合 */
  private points_: Point[];
  /** 边列表 */
  edge_list: Edge[];
  /** 边界框最小点 */
  private pmin_: Point | null;
  /** 边界框最大点 */
  private pmax_: Point | null;
  /** 推进前沿 */
  private front_: AdvancingFront | null;
  /** 头节点（虚拟边界点） */
  private head_: Point | null;
  /** 尾节点（虚拟边界点） */
  private tail_: Point | null;
  /** 前沿头节点 */
  private af_head_: Node | null;
  /** 前沿中间节点 */
  private af_middle_: Node | null;
  /** 前沿尾节点 */
  private af_tail_: Node | null;
  /** 盆地填充结构 */
  basin: Basin;
  /** 边事件结构 */
  edge_event: EdgeEvent;

  /**
   * 创建扫描线三角化上下文
   * @param points - 多边形的顶点数组（按顺序）
   * @param options - 配置选项
   */
  constructor(points: Point[], options?: SweepContextOptions);

  /**
   * 添加孔洞（多边形内部的空洞）
   * @param hole - 孔洞的顶点数组
   * @returns 返回当前上下文以支持链式调用
   */
  addHole(hole: Point[]): this;

  /**
   * 添加孔洞（别名方法，兼容旧版API）
   * @param hole - 孔洞的顶点数组
   */
  AddHole(hole: Point[]): this;

  /**
   * 添加多个孔洞
   * @param holes - 孔洞数组，每个孔洞是一个顶点数组
   * @returns 返回当前上下文以支持链式调用
   */
  addHoles(holes: Point[][]): this;

  /**
   * 添加单个点
   * @param point - 要添加的点
   * @returns 返回当前上下文以支持链式调用
   */
  addPoint(point: Point): this;

  /**
   * 添加单个点（别名方法，兼容旧版API）
   * @param point - 要添加的点
   */
  AddPoint(point: Point): this;

  /**
   * 添加多个点
   * @param points - 点数组
   * @returns 返回当前上下文以支持链式调用
   */
  addPoints(points: Point[]): this;

  /**
   * 执行三角化
   * @returns 返回当前上下文以支持链式调用
   */
  triangulate(): this;

  /**
   * 获取输入多边形的边界框
   * @returns 包含最小点和最大点的边界框对象
   */
  getBoundingBox(): { min: Point; max: Point };

  /**
   * 获取生成的三角形数组
   * @returns 三角形数组
   */
  getTriangles(): Triangle[];

  /**
   * 获取生成的三角形数组（别名方法，兼容旧版API）
   */
  GetTriangles(): Triangle[];

  /**
   * 获取推进前沿
   * @returns 推进前沿对象
   */
  front(): AdvancingFront | null;

  /**
   * 获取点的数量
   * @returns 点的总数
   */
  pointCount(): number;

  /**
   * 获取头节点
   * @returns 头节点
   */
  head(): Point | null;

  /**
   * 设置头节点
   * @param point - 新的头节点
   */
  setHead(point: Point): void;

  /**
   * 获取尾节点
   * @returns 尾节点
   */
  tail(): Point | null;

  /**
   * 设置尾节点
   * @param point - 新的尾节点
   */
  setTail(point: Point): void;

  /**
   * 获取三角形映射表
   * @returns 三角形数组
   */
  getMap(): Triangle[];

  /**
   * 初始化三角化
   * 计算边界框、创建虚拟边界点并对点进行排序
   */
  initTriangulation(): void;

  /**
   * 初始化边列表
   * 根据顶点数组创建多边形的边
   * @param points - 顶点数组
   */
  initEdges(points: Point[]): void;

  /**
   * 获取指定索引的点
   * @param index - 点的索引
   * @returns 对应的点
   */
  getPoint(index: number): Point;

  /**
   * 将三角形添加到映射表
   * @param triangle - 要添加的三角形
   */
  addToMap(triangle: Triangle): void;

  /**
   * 在前沿中定位节点
   * @param point - 参考点
   * @returns 找到的节点
   */
  locateNode(point: Point): Node | null;

  /**
   * 创建推进前沿
   * 初始化前沿的头、尾和中间节点
   */
  createAdvancingFront(): void;

  /**
   * 移除节点（当前为空实现）
   * @param node - 要移除的节点
   */
  removeNode(node: Node): void;

  /**
   * 将三角形映射到节点
   * 更新前沿节点与三角形的关联关系
   * @param triangle - 要映射的三角形
   */
  mapTriangleToNodes(triangle: Triangle): void;

  /**
   * 从映射表中移除三角形
   * @param triangle - 要移除的三角形
   */
  removeFromMap(triangle: Triangle): void;

  /**
   * 网格清理
   * 使用深度优先搜索标记内部三角形并添加到结果集
   * @param startTriangle - 起始三角形
   */
  meshClean(startTriangle: Triangle): void;
}

export = SweepContext;