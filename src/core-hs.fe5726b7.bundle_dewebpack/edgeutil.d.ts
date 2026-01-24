/**
 * 3D向量坐标接口
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * THREE.js Vector3类型
 */
interface THREEVector3 extends Vector3D {
  clone(): THREEVector3;
  copy(v: THREEVector3): this;
}

/**
 * THREE.js Line3类型
 */
interface THREELine3 {
  start: THREEVector3;
  end: THREEVector3;
}

/**
 * THREE.js曲线类型(Arc或Line)
 */
type THREECurve = ReturnType<typeof GeLib.ArcUtils.createArcFromPoints> | THREELine3;

/**
 * 边的曲线信息
 */
interface EdgeCurve {
  /**
   * 获取曲线中心点
   */
  getCenter(): Vector3D;
}

/**
 * 半边(CoEdge)接口
 */
interface CoEdge {
  /** 起始顶点 */
  from: Vector3D;
  /** 结束顶点 */
  to: Vector3D;
  /** 是否反向 */
  reversed: boolean;
  /** 前一个半边 */
  prev: CoEdge | null;
  /** 下一个半边 */
  next: CoEdge | null;
  /** 配对的半边 */
  partner: CoEdge | null;
  /** 所属的边 */
  edge: Edge;
  /** 父级对象集合 */
  parents: Record<string, CoEdge | null>;
  
  /**
   * 获取唯一父级对象
   */
  getUniqueParent(): Loop | null;
}

/**
 * 边(Edge)接口
 */
interface Edge {
  /** 曲线信息 */
  curve: EdgeCurve;
  /** 起始点 */
  from: Vector3D;
  /** 结束点 */
  to: Vector3D;
  /** 半径(仅圆弧边) */
  radius: number;
  /** 是否顺时针(仅圆弧边) */
  clockwise: boolean;
  /** 关联的半边 */
  coedge: CoEdge | null;
  /** 父级对象集合 */
  parents: Record<string, CoEdge | null>;
  
  /**
   * 判断是否为圆弧边
   */
  isArcEdge(): boolean;
}

/**
 * 环(Loop)接口
 */
interface Loop {
  /**
   * 在指定半边后追加新的半边
   * @param coEdge - 要追加的半边
   * @param afterCoEdge - 在此半边之后插入
   */
  appendCoEdge(coEdge: CoEdge, afterCoEdge: CoEdge | null): void;
}

/**
 * 顶点创建结果
 */
interface Vertex extends Vector3D {}

/**
 * 在边的端点插入新边的结果
 */
interface InsertEdgeResult {
  /** 新创建的顶点 */
  newVertex: Vertex;
  /** 新创建的边 */
  newEdge: Edge;
  /** 新创建的半边列表 */
  newCoEdges: CoEdge[];
}

/**
 * 在半边上插入点的结果
 */
interface InsertPointResult {
  /** 新创建的顶点 */
  newVertex: Vertex;
  /** 新创建的半边 */
  newCoEdge: CoEdge;
}

/**
 * 在半边上插入多个点的结果
 */
interface InsertPointsResult {
  /** 新创建的顶点列表 */
  newVertices: Vertex[];
  /** 新创建的半边列表 */
  newCoEdges: CoEdge[];
}

/**
 * 边工具类 - 提供边和半边的几何操作工具方法
 */
export declare const EdgeUtil: {
  /**
   * 将自定义边对象转换为THREE.js曲线对象
   * @param edge - 边对象
   * @returns THREE.js曲线对象(圆弧或直线)
   */
  toTHREECurve(edge: Edge): THREECurve;

  /**
   * 获取半边所属的环
   * @param coEdge - 半边对象
   * @returns 半边所属的环,如果不存在则返回undefined
   */
  getCoEdgeLoop(coEdge: CoEdge | null | undefined): Loop | undefined;

  /**
   * 获取边关联的所有环
   * @param edge - 边对象
   * @returns 边关联的所有环的数组
   */
  getEdgeLoops(edge: Edge): Loop[];

  /**
   * 在边的端点位置插入新的边
   * @param edge - 原始边对象
   * @param isFromPoint - true表示在起点插入,false表示在终点插入
   * @returns 包含新顶点、新边和新半边列表的对象
   */
  insertEdgeAtEndPoint(edge: Edge, isFromPoint: boolean): InsertEdgeResult;

  /**
   * 在边的起点或终点位置插入新的边(别名方法)
   * @param coEdge - 半边对象
   * @param isFromPoint - true表示在起点插入,false表示在终点插入
   * @returns 包含新顶点和新半边的对象
   */
  insertEdgeAtFromToPoint(coEdge: CoEdge, isFromPoint: boolean): InsertPointResult;

  /**
   * 在半边上的指定点位置插入新顶点
   * @param coEdge - 半边对象
   * @param point - 插入点的坐标
   * @param isFromPoint - true表示从起点方向插入,false表示从终点方向插入
   * @returns 包含新顶点和新半边的对象
   */
  insertPointOnCoEdge(coEdge: CoEdge, point: Vector3D, isFromPoint: boolean): InsertPointResult;

  /**
   * 在半边上插入多个点
   * @param coEdge - 半边对象
   * @param points - 要插入的点坐标数组
   * @param isFromPoint - true表示从起点方向插入,false表示从终点方向插入
   * @returns 包含新顶点列表和新半边列表的对象
   */
  insertPointsOnCoEdge(coEdge: CoEdge, points: Vector3D[], isFromPoint: boolean): InsertPointsResult;

  /**
   * 判断点是否在半边上
   * @param coEdge - 半边对象
   * @param point - 要检测的点坐标
   * @returns 如果点在半边上返回true,否则返回false
   */
  isPointOnCoEdge(coEdge: CoEdge, point: Vector3D): boolean;

  /**
   * 判断点是否在边上
   * @param edge - 边对象
   * @param point - 要检测的点坐标
   * @param alignZ - 是否将点的z坐标对齐到边的z坐标,默认为true
   * @returns 如果点在边上返回true,否则返回false
   */
  isPointOnEdge(edge: Edge, point: Vector3D, alignZ?: boolean): boolean;

  /**
   * 判断边是否为圆弧边
   * @param edge - 边对象
   * @returns 如果是圆弧边返回true,否则返回false
   */
  isArcEdge(edge: Edge): boolean;
};