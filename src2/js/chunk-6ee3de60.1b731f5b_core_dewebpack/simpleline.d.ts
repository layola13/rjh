/**
 * 简单线段集合类，用于表示由多个线段或弧段组成的路径
 * 继承自 CutLine 基类
 */
export declare class SimpleLine extends CutLine {
  /**
   * 线段数组，包含构成该简单线的所有线段或弧段
   */
  protected segs: Array<Segment | Arc>;

  /**
   * 内部边缘索引，用于标识关键控制点的位置
   */
  innerEdgeIdx: number;

  /**
   * 构造函数
   * @param segments - 线段或弧段数组
   * @param lineType - 切割线类型，默认为 simpleLine
   */
  constructor(
    segments: Array<Segment | Arc>,
    lineType?: CutLineType
  );

  /**
   * 获取所有线段
   */
  get segments(): Array<Segment | Arc>;

  /**
   * 获取起点坐标
   */
  get start(): Point;

  /**
   * 设置起点坐标，会更新第一个线段
   * @param point - 新的起点坐标
   */
  set start(point: Point);

  /**
   * 获取终点坐标
   */
  get end(): Point;

  /**
   * 设置终点坐标，会更新最后一个线段
   * @param point - 新的终点坐标
   */
  set end(point: Point);

  /**
   * 获取起点到终点的中点（直线距离的中点）
   */
  get pt(): Point;

  /**
   * 计算沿路径的实际中点
   * 如果线段数量为偶数，返回中间线段的端点
   * 如果线段数量为奇数，返回中间线段的中点
   */
  middle(): Point;

  /**
   * 获取沿路径的实际中点（middle 方法的别名）
   */
  get mpt(): Point;

  /**
   * 判断是否可以控制起点
   * 当内部边缘索引不为 0 时返回 true
   */
  get constrolStart(): boolean;

  /**
   * 判断是否可以控制终点
   * 当内部边缘索引不是最后一个时返回 true
   */
  get constrolEnd(): boolean;

  /**
   * 判断是否显示弧形
   * 当内部边缘索引在中间位置时返回 true
   */
  get showArc(): boolean;

  /**
   * 分割简单线
   * @param cutContext - 切割上下文
   * @param splitParams - 分割参数
   * @returns 分割后的结果
   */
  split(cutContext: unknown, splitParams: unknown): unknown;

  /**
   * 克隆线段数组（内部方法）
   * @param segments - 要克隆的线段数组
   * @returns 新的 SimpleLine 实例
   */
  protected _clone(segments: Array<Segment | Arc>): SimpleLine;

  /**
   * 克隆当前实例
   * @returns 深拷贝的 SimpleLine 实例
   */
  clone(): SimpleLine;

  /**
   * 序列化为 JSON 对象
   * @returns JSON 表示，如果没有线段则返回 undefined
   */
  toJSON(): {
    name: CutLineType;
    innerEdgeIdx: number;
    segs: Array<SegmentJSON | ArcJSON>;
  } | undefined;

  /**
   * 从 JSON 对象反序列化
   * @param json - 序列化的 JSON 数据
   * @returns 反序列化的 SimpleLine 实例
   */
  static deserialize(json: {
    segs: Array<{ name: string; [key: string]: unknown }>;
    innerEdgeIdx: number;
  }): SimpleLine;

  /**
   * 平移变换
   * @param vector - 平移向量
   * @returns 平移后的当前实例（支持链式调用）
   */
  translate(vector: Vector): this;

  /**
   * 旋转变换
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 旋转后的当前实例（支持链式调用）
   */
  rotate(angle: number, center: Point): this;

  /**
   * 查找点相对于线的位置
   * @param point - 要判断的点
   * @returns 线的方向（左侧或右侧）
   */
  findLinePos(point: Point): LineSide;

  /**
   * 更新端点以匹配指定形状的交点
   * @param shape - 用于计算交点的形状
   * @returns 更新后的当前实例（支持链式调用）
   */
  updateEndPoint(shape: unknown): this;

  /**
   * 计算与指定形状的交点
   * @param shape - 用于计算交点的形状
   * @returns 交点数组，包含起点和终点的交点
   */
  intersect(shape: unknown): Point[];

  /**
   * 创建连接线段
   * @param startPoint - 起始点
   * @param endPoint - 结束点
   * @param isForward - 是否正向连接
   * @returns 形状元素数组
   */
  createLink(
    startPoint: Point,
    endPoint: Point,
    isForward: boolean
  ): ShapeElement[];

  /**
   * 拖拽弧形段
   * @param segmentIndex - 线段索引
   * @param dragVector - 拖拽向量
   * @param dragPoint - 拖拽点
   * @returns 新的 SimpleLine 实例
   */
  dragArc(
    segmentIndex: number,
    dragVector: Vector,
    dragPoint: Point
  ): SimpleLine;
}

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
  distanceTo(other: Point | Line): number[];
  leftTo(line: Line): boolean;
  translate(vector: Vector): Point;
  rotate(angle: number, center: Point): Point;
}

/**
 * 向量接口
 */
interface Vector {
  slope: number;
  translate(vector: Vector): Vector;
}

/**
 * 线段类
 */
interface Segment {
  start: Point;
  end: Point;
  middle(): Point;
  clone(): Segment;
  toJSON(): SegmentJSON;
  translate(vector: Vector): Segment;
  rotate(angle: number, center: Point): Segment;
  reverse(): Segment;
}

/**
 * 弧段类
 */
interface Arc {
  center: Point;
  r: number;
  startAngle: number;
  endAngle: number;
  counterClockwise: boolean;
  start: Point;
  end: Point;
  middle(): Point;
  clone(): Arc;
  toJSON(): ArcJSON;
  translate(vector: Vector): Arc;
  rotate(angle: number, center: Point): Arc;
  reverse(): Arc;
}

/**
 * 直线类
 */
interface Line {
  pt: Point;
  norm: Vector;
  start: Point;
  end: Point;
}

/**
 * 切割线基类
 */
declare abstract class CutLine {
  constructor(lineType: CutLineType);
}

/**
 * 切割线类型枚举
 */
declare enum CutLineType {
  simpleLine = "simpleLine"
}

/**
 * 线段方向枚举
 */
declare enum LineSide {
  Left = "Left",
  Right = "Right"
}

/**
 * 形状元素类
 */
interface ShapeElement {
  constructor(segment: Segment | Arc);
}

/**
 * 线段序列化接口
 */
interface SegmentJSON {
  name: "segment";
  [key: string]: unknown;
}

/**
 * 弧段序列化接口
 */
interface ArcJSON {
  name: "arc";
  [key: string]: unknown;
}