/**
 * ArcUtils模块 - 圆弧几何工具类
 * 提供圆弧创建、几何计算和边缘交点计算的静态方法
 */

/**
 * 二维点坐标接口
 */
interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 线段接口
 */
interface Segment {
  /** 线段起点 */
  start: Point;
  /** 线段终点 */
  end: Point;
  /** 线段中点 */
  middle(): Point;
  /** 线段长度 */
  length: number;
}

/**
 * 圆弧接口
 */
interface Arc {
  /** 圆心 */
  center: Point;
  /** 半径值 */
  r: { valueOf(): number };
  /** 是否逆时针方向 */
  counterClockwise: boolean;
  /** 圆弧起点 */
  start: Point;
  /** 圆弧终点 */
  end: Point;
  /** 圆弧中点 */
  middle(): Point;
  /** 
   * 检查点是否在圆弧上
   * @param point - 要检查的点
   * @returns 点是否在圆弧上
   */
  contains(point: Point): boolean;
  /**
   * 计算弦高（圆弧与弦之间的最大距离）
   * @returns 弦高值
   */
  chordHeight(): number;
}

/**
 * 几何边缘类型（线段或圆弧）
 */
type Edge = Segment | Arc;

/**
 * 圆弧工具类
 * 提供圆弧几何计算的静态方法集合
 */
export declare class ArcUtils {
  /**
   * 通过三个点创建圆弧
   * 根据三点确定唯一圆，并创建通过这三点的圆弧
   * 
   * @param point1 - 第一个点（通常为起点）
   * @param point2 - 第二个点（中间点）
   * @param point3 - 第三个点（通常为终点）
   * @returns 通过三点的圆弧对象
   * 
   * @example
   * const arc = ArcUtils.CreateArcFrom3Points(
   *   { x: 0, y: 0 },
   *   { x: 1, y: 1 },
   *   { x: 2, y: 0 }
   * );
   */
  static CreateArcFrom3Points(point1: Point, point2: Point, point3: Point): Arc;

  /**
   * 计算两条边的交点
   * 支持线段-线段、线段-圆弧、圆弧-圆弧的交点计算
   * 
   * @param edge1 - 第一条边（线段或圆弧）
   * @param edge2 - 第二条边（线段或圆弧）
   * @param referencePoint - 参考点，用于在多个交点时选择合适的交点（可选）
   * @returns 交点坐标，如果不相交则返回undefined
   * 
   * @example
   * const intersection = ArcUtils.edgeCrossPt(segment1, segment2);
   */
  static edgeCrossPt(edge1: Edge, edge2: Edge, referencePoint?: Point): Point | undefined;

  /**
   * 计算两条线段的交点
   * 
   * @param segment1 - 第一条线段
   * @param segment2 - 第二条线段
   * @returns 交点坐标，如果不相交或重合则返回undefined
   * 
   * @remarks
   * 如果两线段平行或共线，不返回交点
   */
  static segmentSegmentPt(segment1: Segment, segment2: Segment): Point | undefined;

  /**
   * 计算线段与圆弧的交点
   * 
   * @param segment - 线段
   * @param arc - 圆弧
   * @param referencePoint - 参考点，用于在多个交点时选择距离最近的交点（可选）
   * @param useEndPoint - 是否使用线段终点作为距离参考，默认为true（可选）
   * @returns 交点坐标，如果不相交则返回undefined
   * 
   * @remarks
   * 当存在两个交点时，选择距离参考点更近的交点
   */
  static segmentArcPt(
    segment: Segment,
    arc: Arc,
    referencePoint?: Point,
    useEndPoint?: boolean
  ): Point | undefined;

  /**
   * 计算两条圆弧的交点
   * 
   * @param arc1 - 第一条圆弧
   * @param arc2 - 第二条圆弧
   * @param referencePoint - 参考点，用于在多个交点时选择距离最近的交点（可选）
   * @returns 交点坐标，如果不相交则返回undefined
   * 
   * @remarks
   * - 如果两圆相切（圆心距等于半径和），返回切点
   * - 如果两圆相交于两点，选择距离参考点更近的交点
   * - 如果两圆不相交或内含，返回undefined
   */
  static arcArcPt(arc1: Arc, arc2: Arc, referencePoint?: Point): Point | undefined;

  /**
   * 获取具有相同弦的新圆弧
   * 基于给定圆弧的起点和终点（弦），创建具有指定弦高的新圆弧
   * 
   * @param arc - 原始圆弧（用于确定弦的位置）
   * @param newChordHeight - 新圆弧的弦高
   * @param reverseDirection - 是否反转方向，默认false时使用原圆弧的起点和终点（可选）
   * @returns 具有相同弦但不同弦高的新圆弧
   * 
   * @remarks
   * 弦高决定了圆弧的凸度，相同的弦可以产生不同曲率的圆弧
   */
  static getArcWithSameChord(
    arc: Arc,
    newChordHeight: number,
    reverseDirection?: boolean
  ): Arc;
}