/**
 * 装饰组件参考点类型枚举
 * 定义装饰元素可以参考的几何位置类型
 */
export enum DecorationComponentReferenceType {
  /** 顶点参考 */
  vertex = "vertex",
  /** 边中点参考 */
  edgeMiddle = "edgeMiddle",
  /** 边参考 */
  edge = "edge",
  /** 中心点参考 */
  center = "center"
}

/**
 * 几何点接口
 */
export interface Point {
  x: number;
  y: number;
  clone(): Point;
  translate(vector: Vector): Point;
  equalTo(other: Point): boolean;
  toJSON(): { x: number; y: number };
}

/**
 * 几何向量接口
 */
export interface Vector {
  x: number;
  y: number;
}

/**
 * 几何线段接口
 */
export interface Segment {
  start: Point;
  end: Point;
  length: number;
  middle(): Point;
  reverse(): Segment;
  tangentInStart(): Vector;
  tangentInEnd(): Vector;
}

/**
 * 边界框接口
 */
export interface BoundingBox {
  center: Point;
}

/**
 * 几何形状接口
 */
export interface Shape {
  /** 形状的顶点数组 */
  vertices: Point[];
  /** 形状的边数组 */
  edges: Segment[];
  /** 形状的边界框 */
  box: BoundingBox;
  /** 判断是否为矩形 */
  isRectangle(): boolean;
}

/**
 * 装饰参考点序列化数据接口
 */
export interface DecorationReferencePointJSON {
  /** 参考类型 */
  rt: DecorationComponentReferenceType;
  /** 参考索引 */
  rx: number;
}

/**
 * 装饰参考序列化数据接口
 */
export interface DecorationReferenceJSON {
  /** 点坐标 */
  pt: { x: number; y: number };
  /** 参考点数据 */
  ref: DecorationReferencePointJSON;
}

/**
 * 装饰参考点类
 * 用于定义装饰元素相对于形状几何特征的参考位置
 */
export declare class DecorationReferencePoint {
  /** 参考索引（如顶点索引、边索引等） */
  refIdx: number;
  
  /** 参考类型 */
  refType: DecorationComponentReferenceType;

  /**
   * 构造函数
   * @param refIdx - 参考索引
   * @param refType - 参考类型，默认为 vertex
   */
  constructor(refIdx: number, refType?: DecorationComponentReferenceType);

  /**
   * 获取排序后的顶点数组
   * 按 y 坐标升序排序，y 相同时按 x 坐标升序排序
   * @param shape - 几何形状
   * @returns 排序后的顶点数组
   */
  getSortedVertex(shape: Shape): Point[];

  /**
   * 获取排序后的边
   * @param edgeIndex - 边索引 (0-3)
   * @param shape - 几何形状
   * @param sortedVertices - 排序后的顶点数组
   * @returns 对应的边，如果未找到则返回 undefined
   */
  getSortedEdge(edgeIndex: number, shape: Shape, sortedVertices: Point[]): Segment | undefined;

  /**
   * 获取参考点的实际坐标
   * @param shape - 几何形状
   * @param refType - 参考类型，默认使用实例的 refType
   * @param refIdx - 参考索引，默认使用实例的 refIdx
   * @returns 参考点坐标
   * @throws 当形状不是矩形但需要矩形时抛出错误
   * @throws 当找不到对应的边时抛出错误
   * @throws 当参考类型不支持时抛出错误
   */
  getReferencePoint(shape: Shape, refType?: DecorationComponentReferenceType, refIdx?: number): Point;

  /**
   * 序列化为JSON对象
   * @returns JSON表示
   */
  toJSON(): DecorationReferencePointJSON;

  /**
   * 从JSON对象反序列化
   * @param json - 序列化的数据
   */
  deserialize(json: DecorationReferencePointJSON): void;
}

/**
 * 装饰参考类
 * 定义装饰元素相对于参考点的偏移位置和扩展
 */
export declare class DecorationReference {
  /** 相对于参考点的偏移坐标 */
  point: Point;
  
  /** 参考点定义 */
  ref: DecorationReferencePoint;
  
  /** 扩展距离（用于边参考时的收缩） */
  expand: number;

  /**
   * 构造函数
   * @param point - 偏移坐标
   * @param ref - 参考点定义
   * @param expand - 扩展距离，默认为 0
   */
  constructor(point: Point, ref: DecorationReferencePoint, expand?: number);

  /**
   * 获取实际的绝对坐标点
   * @param shape - 几何形状
   * @param refType - 参考类型，默认使用 ref 的 refType
   * @param refIdx - 参考索引，默认使用 ref 的 refIdx
   * @returns 计算后的实际坐标点
   * @throws 当形状不是矩形但需要矩形时抛出错误
   * @throws 当找不到对应的边时抛出错误
   */
  getRealPoint(shape: Shape, refType?: DecorationComponentReferenceType, refIdx?: number): Point;

  /**
   * 序列化为JSON对象
   * @returns JSON表示
   */
  toJSON(): DecorationReferenceJSON;

  /**
   * 从JSON对象反序列化
   * @param json - 序列化的数据
   */
  deserialize(json: DecorationReferenceJSON): void;
}

/**
 * @deprecated 请使用 DecorationComponentReferenceType
 */
export { DecorationComponentReferenceType as decorationComponentReferenceType };

/**
 * @deprecated 请使用 DecorationReferencePoint
 */
export { DecorationReferencePoint as DecoraitonReferencePoint };

/**
 * @deprecated 请使用 DecorationReference
 */
export { DecorationReference as DecoraitonReference };