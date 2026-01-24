/**
 * 半边数据结构中的循环(Loop)类
 * 表示一个由半边组成的封闭或开放的边界
 */
declare class Loop {
  /** 组成该循环的半边列表 */
  halfEdges: HalfEdge[];
  
  /** 标记循环数据是否需要更新 */
  dirty: boolean;
  
  /** 父循环(用于表示孔洞关系) */
  parent?: Loop;
  
  /** 子循环集合(内部孔洞) */
  children: Set<Loop>;
  
  /** 缓存的循环边列表 */
  private _loopEdges: HalfEdge[];
  
  /** 缓存的边界边ID列表 */
  private _boundEdgeIds: string[];
  
  /** 缓存的循环面积 */
  private _area: number;

  constructor();

  /**
   * 获取循环的面积
   * 正值表示逆时针(CCW)，负值表示顺时针(CW)
   */
  get area(): number;

  /** 获取边界边ID列表 */
  get boundEdgeIds(): string[];

  /** 获取循环的边列表 */
  get loopEdges(): HalfEdge[];

  /** 获取循环的顶点列表 */
  get loopPoints(): Point[];

  /** 获取循环路径的THREE.Vector3数组 */
  get loopPath(): THREE.Vector3[];

  /** 获取循环的离散点列表(包含曲线细分点) */
  get loopDiscretePoints(): Point[];

  /** 检查循环是否包含离散点 */
  get hasDiscretePoints(): boolean;

  /**
   * 添加半边到循环
   * @param halfEdge 要添加的半边
   */
  addHalfEdge(halfEdge: HalfEdge): void;

  /**
   * 设置父循环
   * @param parent 父循环对象
   */
  setParent(parent?: Loop): void;

  /**
   * 移除子循环
   * @param child 要移除的子循环
   */
  private _removeChild(child: Loop): void;

  /**
   * 添加子循环
   * @param child 要添加的子循环
   */
  private _addChild(child: Loop): void;

  /**
   * 判断该循环是否完全在另一个循环内部
   * @param otherLoop 另一个循环
   */
  isInSideLoop(otherLoop: Loop): boolean;

  /**
   * 判断是否与另一个循环共享某些边
   * @param otherLoop 另一个循环
   */
  isShareSomeEdge(otherLoop: Loop): boolean;

  /** 判断是否为边界循环(面积为负) */
  isBoundLoop(): boolean;

  /** 判断是否为逆时针循环 */
  isCCW(): boolean;

  /** 判断是否为顺时针循环 */
  isCW(): boolean;

  /** 更新循环的缓存数据 */
  update(): void;
}

/**
 * 半边结构
 */
interface HalfEdge {
  /** 起点 */
  from: Vertex;
  
  /** 终点 */
  to: Vertex;
  
  /** 关联的边ID */
  edgeID?: string;
  
  /** 方向向量 */
  direction: Vector2D;
  
  /** 方向向量(起点) */
  directionF?: Vector2D;
  
  /** 方向向量(终点) */
  directionT?: Vector2D;
  
  /** 配对的半边 */
  partner?: HalfEdge;
  
  /** 所属循环 */
  loop?: Loop;
  
  /** 离散采样点 */
  discretePts?: Point[];
  
  /** 关联的边对象 */
  edge?: Edge;
}

/**
 * 边结构
 */
interface Edge {
  /** 第一条半边 */
  halfEdge1: HalfEdge;
  
  /** 第二条半边 */
  halfEdge2: HalfEdge;
  
  /** 边对象引用 */
  edge?: any;
  
  /** 墙体对象引用 */
  wall?: any;
}

/**
 * 循环查找器
 * 从边集合中识别所有循环结构
 */
declare class LoopFinder {
  /** 输入的边列表 */
  edges: Edge[];
  
  /** 自循环边列表 */
  selfLoopEdges: Edge[];
  
  /** 从顶点ID映射到出边的映射表 */
  outHalfEdgesMap: Map<string, HalfEdge[]>;
  
  /** 找到的所有循环 */
  loops: Loop[];

  /**
   * 构造函数
   * @param edges 边列表
   * @param selfLoopEdges 自循环边列表(可选)
   */
  constructor(edges: Edge[], selfLoopEdges?: Edge[]);

  /**
   * 添加半边到映射表
   * @param halfEdge 要添加的半边
   */
  private _addHalfEdge(halfEdge: HalfEdge): void;

  /**
   * 获取根循环(没有父循环的顺时针循环)
   */
  getRootLoops(): Loop[];

  /**
   * 获取内部边(两侧都是CCW循环)
   */
  getInnerEdges(): Edge[];

  /**
   * 获取外部边(一侧CCW，一侧CW)
   */
  getOuterEdges(): Edge[];

  /**
   * 获取孤立边(两侧都是CW循环)
   */
  getIsolateEdges(): Edge[];

  /**
   * 获取指定半边所属的循环
   * @param fromVertex 起点
   * @param toVertex 终点
   */
  getHalfEdgeLoop(fromVertex: Vertex, toVertex: Vertex): Loop | undefined;

  /**
   * 获取所有逆时针循环
   */
  getCCWLoops(): Loop[];

  /**
   * 搜索所有循环
   */
  search(): Loop[];

  /**
   * 获取从指定顶点出发的所有半边
   * @param vertex 顶点
   */
  private _outHalfEdges(vertex: Vertex): HalfEdge[] | undefined;

  /**
   * 从指定半边开始搜索一个循环
   * @param startHalfEdge 起始半边
   */
  private _search(startHalfEdge: HalfEdge): Loop | null;

  /**
   * 查找下一条出半边(按逆时针角度排序)
   * @param currentHalfEdge 当前半边
   * @param outHalfEdges 候选出边列表
   */
  private _findNextOutHalfEdge(
    currentHalfEdge: HalfEdge,
    outHalfEdges: HalfEdge[]
  ): HalfEdge | undefined;

  /**
   * 更新循环的父子关系
   * @param loops 循环集合
   */
  private _updateLoopsParent(loops: Set<Loop>): void;
}

/**
 * 2D顶点类
 */
declare class Vertex {
  x: number;
  y: number;
  id: string;
  customData?: any;

  constructor(x: number, y: number, id: string);
}

/**
 * 边上的顶点信息
 */
interface VertexOnEdge {
  /** 顶点对象 */
  vertex: Vertex;
  
  /** 在边上的参数位置[0,1] */
  lerp: number;
}

/**
 * 源边结构
 */
interface SourceEdge {
  /** 自定义数据 */
  customData?: any;
  
  /** 曲线或线段 */
  curve: THREE.Line3 | THREE.ArcCurve;
  
  /** 边上的顶点列表 */
  verticesOnEdge: VertexOnEdge[];
}

/**
 * 点在边上的查找结果
 */
interface PointOnEdgeResult {
  /** 源边 */
  sourceEdge: SourceEdge;
  
  /** 参数位置 */
  lerp: number;
  
  /** 已存在的边上顶点 */
  vertexOnEdge?: VertexOnEdge;
}

/**
 * 平面排列(Arrangement)类
 * 用于计算平面内线段/曲线的交点和区域划分
 */
declare class Arrangement {
  /** 顶点列表 */
  vertices: Vertex[];
  
  /** 源边列表 */
  sourceEdges: SourceEdge[];
  
  /** 循环查找器 */
  loopFinder?: LoopFinder;

  constructor();

  /**
   * 创建新顶点
   * @param point 点坐标
   */
  private _createVertex(point: Point): Vertex;

  /**
   * 在现有顶点中查找点
   * @param point 要查找的点
   * @param tolerance 容差值，默认0.001
   */
  private _findPointOnVertex(point: Point, tolerance?: number): Vertex | undefined;

  /**
   * 在边上查找点
   * @param point 要查找的点
   */
  private _findPointOnEdges(point: Point): PointOnEdgeResult[];

  /**
   * 插入点到排列中
   * @param point 点坐标
   * @param customData 自定义数据
   */
  insertPoint(point: Point, customData?: any): Vertex;

  /**
   * 插入边到排列中
   * @param fromVertex 起点
   * @param toVertex 终点
   * @param curve 曲线或线段
   * @param customData 自定义数据
   */
  insertEdge(
    fromVertex: Vertex,
    toVertex: Vertex,
    curve: THREE.Line3 | THREE.ArcCurve,
    customData?: any
  ): void;

  /**
   * 插入路径到排列中
   * @param path 点列表
   * @param isClosed 是否封闭路径
   * @param customData 自定义数据
   */
  insertPath(path: Point[], isClosed: boolean, customData?: any): void;

  /**
   * 获取所有区域
   * @returns 区域列表，每个区域包含外轮廓和孔洞
   */
  getRegions(): Array<{ outer: Point[]; holes: Point[][] }>;
}

/**
 * 2D点类型
 */
interface Point {
  x: number;
  y: number;
  z?: number;
  arcInfo?: any;
  splitEdgeInfo?: {
    isSplitEdge?: boolean;
    isInnerEdge?: boolean;
  };
}

/**
 * 2D向量类型
 */
interface Vector2D {
  x: number;
  y: number;
}

/**
 * 循环工具类
 */
declare const LoopUtil: {
  /**
   * 根据循环获取表面
   * @param loop 循环对象
   */
  getSurfaceByLoop(loop: any): any;

  /**
   * 清理循环数组，移除连续重复元素
   * @param array 数组
   * @param compareFn 比较函数，默认使用严格相等
   */
  cleanupLoopArray<T>(
    array: T[],
    compareFn?: (a: T, b: T) => boolean
  ): T[] | undefined;

  /**
   * 判断两个循环是否相同
   * @param loop1 循环1
   * @param loop2 循环2
   * @param compareFn 元素比较函数
   */
  isSameLoop<T>(
    loop1: T[],
    loop2: T[],
    compareFn?: (a: T, b: T) => boolean
  ): boolean;

  /**
   * 创建模型循环
   * @param points 点列表
   * @param holes 孔洞列表
   */
  createModelLoop(points: Point[], holes?: any[]): any;

  /**
   * 更新循环点坐标
   * @param loop 循环对象
   * @param newPoints 新的点列表
   * @returns 是否更新成功
   */
  updateLoopPoints(loop: any, newPoints: Point[]): boolean;

  /**
   * 根据点列表更新或创建循环
   * @param loop 现有循环(可选)
   * @param points 点列表
   * @returns 更新后的循环或新循环
   */
  updateLoopByPoints(loop: any | undefined, points: Point[]): any;

  /**
   * 从边列表获取循环查找器
   * @param edges 边列表
   */
  getLoopFinder(edges: any[]): LoopFinder;

  /**
   * 获取循环的点列表
   * @param loop 循环对象
   */
  getLoopPoints(loop: any): Point[];

  /**
   * 获取图层墙体循环
   * @param layer 图层对象
   */
  getLayerWallLoops(layer: any): LoopFinder;

  /**
   * 获取虚假连接墙体(内部方法)
   * @param layer 图层对象
   */
  _getFakeConnectingWalls(layer: any): any[];

  /**
   * 清理循环，移除重复点和共线边
   * @param loop 循环对象
   */
  cleanupLoop(loop: any): void;

  /**
   * 判断循环是否自交
   * @param points 点列表
   */
  isSelfIntersect(points: Point[]): boolean;

  /**
   * 获取顶点所属的所有循环
   * @param vertex 顶点对象
   */
  getVertexLoops(vertex: any): any[];

  /** 循环查找器类 */
  LoopFinder: typeof LoopFinder;

  /** 排列类 */
  Arrangement: typeof Arrangement;
};

/**
 * 模块导出
 */
export { Arrangement, LoopFinder, LoopUtil };