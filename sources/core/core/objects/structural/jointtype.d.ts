/**
 * 墙体接缝类型枚举
 * 定义墙体连接处的几何处理方式
 */
export enum JointType {
  /** 空类型 */
  Null = 0,
  /** 自定义接缝 */
  DIYJoint = 1,
  /** X型斜接 */
  XMiter = 2,
  /** L型斜接 */
  LMiter = 4,
  /** L型非交叉 */
  LUncross = 8,
  /** L型交叉 */
  LCross = 16,
  /** T型非交叉 */
  TUncross = 32,
  /** T型交叉 */
  TCross = 64,
  /** 切线接缝 */
  Tangent = 128,
}

/** 标准L型接缝（非交叉或斜接） */
export const NormalL: JointType = JointType.LUncross | JointType.LMiter;

/** 所有T型接缝（交叉和非交叉） */
export const AllTJoint: JointType = JointType.TUncross | JointType.TCross;

/** 所有L型接缝（非交叉、斜接、交叉） */
export const AllLJoint: JointType =
  JointType.LUncross | JointType.LMiter | JointType.LCross;

/**
 * 方向类型（内部使用）
 */
declare enum DirectionType {
  Left = "Left",
  Right = "Right",
  In = "In",
}

/**
 * 角度类型枚举
 * 描述两条曲线连接处的角度特性
 */
export enum AngleType {
  /** 凸角 */
  Convex = 0,
  /** 非凸角（凹角） */
  NonConvex = 1,
  /** 切线连接 */
  Tangent = 2,
}

/**
 * 2D向量接口
 */
interface Vector2 {
  x: number;
  y: number;
  cross(other: Vector2): number;
  dot(other: Vector2): number;
  getLength(): number;
  normalize(): Vector2;
  multiply(scalar: number): Vector2;
  add(other: Vector2): Vector2;
  subtract(other: Vector2): Vector2;
  subtracted(other: Vector2): Vector2;
  added(other: Vector2): Vector2;
  multiplied(scalar: number): Vector2;
  reverse(): Vector2;
  distanceTo(other: Vector2): number;
  sqDistanceTo(other: Vector2): number;
  equals(other: Vector2, tolerance?: number): boolean;
  normalized(): Vector2;
}

/**
 * 几何元素类型枚举
 */
declare enum GeometryElementType {
  EN_LINE_2D = "LINE_2D",
  EN_ARC_2D = "ARC_2D",
}

/**
 * 参数范围接口
 */
interface Range {
  min: number;
  max: number;
  getLength(): number;
}

/**
 * 2D曲线基础接口
 */
interface Curve2d {
  getType(): GeometryElementType;
  getStartPt(): Vector2;
  getEndPt(): Vector2;
  getRange(): Range;
  getLength(): number;
  getDerivatives(param: number, order: number): Vector2[];
  getPtAt(param: number): Vector2;
  getParamAt(point: Vector2): number;
  clone(): Curve2d;
  reverse(): Curve2d;
  reversed(): Curve2d;
  isLine2d(): boolean;
  isArc2d(): boolean;
}

/**
 * 2D直线接口
 */
interface Line2d extends Curve2d {
  getDirection(): Vector2;
}

/**
 * 2D圆弧接口
 */
interface Arc2d extends Curve2d {
  getCenter(): Vector2;
  getRadius(): number;
  isCCW(): boolean;
}

/**
 * 路径接口
 */
interface Path {
  curves: Curve2d[];
}

/**
 * 半平面接口（用于几何计算）
 */
interface HalfPlane {
  w: Vector2;
  normal: Vector2;
  parallel(other: HalfPlane): boolean;
  offset(distance: number): HalfPlane;
  intersect(other: HalfPlane): Vector2;
  distance(point: Vector2): number;
  clone(): HalfPlane;
}

/**
 * 顶点信息接口
 * 描述墙体节点的连接信息和接缝类型
 */
interface VertexInfo {
  /** 接缝类型 */
  type: JointType;
  /** 连接的边信息数组 */
  links: EdgeInfo[];
}

/**
 * 边信息接口
 * 描述墙体边的几何和偏移信息
 */
interface EdgeInfo {
  /** 中心曲线 */
  curve: Curve2d;
  /** 起始顶点 */
  from?: VertexInfo;
  /** 终止顶点 */
  to?: VertexInfo;
  /** 左侧偏移距离 */
  loffset: number;
  /** 右侧偏移距离 */
  roffset: number;
  /** 墙体宽度 */
  width: number;
  /** 起始端左侧点 */
  fl?: Vector2;
  /** 起始端右侧点 */
  fr?: Vector2;
  /** 终止端左侧点 */
  tl?: Vector2;
  /** 终止端右侧点 */
  tr?: Vector2;
  /** 起始端路径 */
  fromPath?: Curve2d[];
  /** 终止端路径 */
  toPath?: Curve2d[];
  /** 左侧曲线（可选） */
  leftCurve?: Curve2d;
  /** 右侧曲线（可选） */
  rightCurve?: Curve2d;
}

/**
 * 几何信息接口
 * 描述墙体的完整几何轮廓
 */
interface GeometryInfo {
  /** 轮廓曲线环 */
  loop: Curve2d[];
  /** 左侧曲线索引 */
  lcurve: number;
  /** 右侧曲线索引 */
  rcurve: number;
}

/**
 * 接缝生成结果接口
 */
interface JointGenerationResult {
  /** 接缝点坐标 */
  joint?: Vector2;
  /** 接缝类型 */
  type: JointType;
  /** 偏移向量 */
  offset?: Vector2;
  /** 是否为空 */
  isNull?: boolean;
  /** 位置类型 */
  positionType?: DirectionType;
  /** 是否交叉 */
  isCross?: boolean;
}

/**
 * 点与偏移区域关系接口
 */
interface PointOffsetRegionResult {
  /** 点是否在区域内 */
  inside: boolean;
  /** 偏移距离 */
  offset: number;
  /** 位置类型 */
  positionType: DirectionType;
}

/**
 * 墙体接缝几何构建器
 * 负责计算和生成墙体连接处的几何形状
 */
export class DDBuilder {
  /** 长度限制比例（1-5之间） */
  private readonly limitRatio: number;
  /** 角度容差（弧度） */
  private readonly angtol: number;
  /** 长度容差 */
  private readonly lengthtol: number;

  /**
   * 构造函数
   * @param limitRatio 长度限制比例，默认5，范围[1, 5]
   * @param angtol 角度容差，默认1e-4
   * @param lengthtol 长度容差，默认1e-6
   */
  constructor(limitRatio?: number, angtol?: number, lengthtol?: number);

  /**
   * 构建墙体几何信息
   * @param vertices 顶点信息数组
   * @param edges 边信息数组
   * @param updateResults 可选的更新结果数组
   * @returns 几何信息数组
   */
  build(
    vertices: VertexInfo[],
    edges: EdgeInfo[],
    updateResults?: JointType[]
  ): GeometryInfo[];

  /**
   * 判断两条曲线连接处是否为凸角
   * @param from 起始曲线
   * @param to 终止曲线
   * @param tolerance 角度容差，默认1e-4
   * @returns 角度类型
   */
  static isConvex(
    from: Curve2d,
    to: Curve2d,
    tolerance?: number
  ): AngleType;

  /**
   * 计算偏移后的连接点
   * @param fromCurve 起始曲线
   * @param fromOffset 起始曲线偏移量
   * @param toCurve 终止曲线
   * @param toOffset 终止曲线偏移量
   * @param tolerance 长度容差，默认1e-6
   * @returns 连接点坐标，失败返回undefined
   */
  static getMovePoint(
    fromCurve: Curve2d,
    fromOffset: number,
    toCurve: Curve2d,
    toOffset: number,
    tolerance?: number
  ): Vector2 | undefined;

  /**
   * 根据边信息生成几何信息
   * @param edge 边信息
   * @returns 几何信息
   */
  static makeGeometryInfo(edge: EdgeInfo): GeometryInfo;

  /**
   * 更新顶点的几何信息
   * @param vertex 顶点信息
   * @returns 实际使用的接缝类型
   */
  updateGeometryInfo(vertex: VertexInfo): JointType;

  /**
   * 检查顶点的接缝类型是否有效
   * @param vertex 顶点信息
   * @returns 接缝类型是否与计算结果一致
   */
  check(vertex: VertexInfo): boolean;

  /**
   * 生成接缝路径
   * @param edge 边信息
   * @param isFromEnd 是否从起始端生成
   * @param length 路径长度，默认0.24
   * @returns 路径对象
   */
  static genJointPath(
    edge: EdgeInfo,
    isFromEnd: boolean,
    length?: number
  ): Path;

  /**
   * 生成墙体几何路径
   * @param config 包含曲线和宽度的配置对象
   * @returns 路径对象
   */
  static genWallGeometryPath(config: {
    curve: Curve2d;
    width: number;
  }): Path;

  /**
   * 计算两条曲线的交点
   * @param curve1 第一条曲线
   * @param curve2 第二条曲线
   * @param tolerance 容差，默认1e-6
   * @returns 交点数组
   */
  static curveInter(
    curve1: Curve2d,
    curve2: Curve2d,
    tolerance?: number
  ): Vector2[];

  /**
   * 验证边信息的有效性（圆弧半径需大于宽度的一半）
   * @param edge 边信息
   * @returns 是否有效
   */
  static validityCheck(edge: EdgeInfo): boolean;

  /**
   * 判断点是否在偏移区域内
   * @param edge 边信息
   * @param point 待检测点
   * @param angleTolerance 角度容差，默认1e-4
   * @param lengthTolerance 长度容差，默认1e-6
   * @returns 点与偏移区域的关系信息
   */
  static pointInsideOffsetRegion(
    edge: EdgeInfo,
    point: Vector2,
    angleTolerance?: number,
    lengthTolerance?: number
  ): PointOffsetRegionResult;

  /**
   * 检查点是否在曲线的参数范围内
   * @param curve 曲线
   * @param point 待检测点
   * @param angleTolerance 角度容差，默认1e-4
   * @param lengthTolerance 长度容差，默认1e-6
   * @returns 是否在范围内
   */
  static regCheck(
    curve: Curve2d,
    point: Vector2,
    angleTolerance?: number,
    lengthTolerance?: number
  ): boolean;

  /**
   * 按曲线参数对点进行排序
   * @param curve 曲线
   * @param points 点数组（原地修改）
   * @param tolerance 容差，默认1e-4
   */
  static pointsSortByCurve(
    curve: Curve2d,
    points: Vector2[],
    tolerance?: number
  ): void;

  /**
   * 计算两条曲线的交点并按参数排序
   * @param curve1 第一条曲线
   * @param curve2 第二条曲线
   * @returns 两个数组，分别为按curve1和curve2参数排序的交点
   */
  static curveInter2(
    curve1: Curve2d,
    curve2: Curve2d
  ): [Vector2[], Vector2[]];

  /**
   * 获取曲线端点处的法向量
   * @param curve 曲线
   * @param isStart 是否为起点
   * @returns 法向量
   */
  static getEndpointDerUpright(curve: Curve2d, isStart: boolean): Vector2;

  /**
   * 生成接缝信息
   * @param edge1 第一条边
   * @param edge2 第二条边
   * @param edge1UseEnd 第一条边是否使用终点
   * @param edge2UseEnd 第二条边是否使用终点
   * @param searchRadius 搜索半径，默认1
   * @returns 接缝生成结果
   */
  static genJointInfo(
    edge1: EdgeInfo,
    edge2: EdgeInfo,
    edge1UseEnd: boolean,
    edge2UseEnd: boolean,
    searchRadius?: number
  ): JointGenerationResult;

  /**
   * 生成接缝点坐标
   * @param edge1 第一条边
   * @param edge2 第二条边
   * @param edge1UseEnd 第一条边是否使用终点
   * @param edge2UseEnd 第二条边是否使用终点
   * @param searchRadius 搜索半径，默认1
   * @returns 接缝点坐标
   */
  static genJointPoint(
    edge1: EdgeInfo,
    edge2: EdgeInfo,
    edge1UseEnd: boolean,
    edge2UseEnd: boolean,
    searchRadius?: number
  ): Vector2 | undefined;
}