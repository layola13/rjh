/**
 * 装饰线分割辅助类
 * 用于处理装饰组件的分割和线段交叉计算
 */
export declare class DecorationSplitHelper {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 根据矩形边界生成多边形
   * @param rect - 包含 xmin, ymin, xmax, ymax 的矩形对象
   * @returns 返回由矩形四条边组成的多边形对象
   */
  getRectPoly(rect: Rectangle): WinPolygon;

  /**
   * 分割装饰线
   * 根据矩形边界将装饰组件集合中的装饰线进行分割，
   * 处理线段交叉点并生成标准化的线段集合
   * @param decorations - 装饰组件数组
   * @param boundary - 矩形边界
   * @returns 返回分割后的装饰多边形边集合
   */
  splitLine(
    decorations: DecorationComponent[],
    boundary: Rectangle
  ): DecorationPolyEdge[];
}

/**
 * 矩形接口
 * 定义矩形的边界坐标
 */
export interface Rectangle {
  /** 最小 x 坐标 */
  xmin: number;
  /** 最小 y 坐标 */
  ymin: number;
  /** 最大 x 坐标 */
  xmax: number;
  /** 最大 y 坐标 */
  ymax: number;
}

/**
 * 点接口
 * 表示二维空间中的点
 */
export interface Point {
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number;
  /**
   * 计算到另一个点的距离
   * @param other - 目标点
   * @returns 返回距离值数组
   */
  distanceTo(other: Point): number[];
}

/**
 * 线段接口
 * 表示由起点和终点定义的线段
 */
export interface Segment {
  /** 起点 */
  start: Point;
  /** 终点 */
  end: Point;
  /**
   * 计算与另一条线段的交点
   * @param other - 另一条线段
   * @returns 返回交点数组
   */
  intersect(other: Segment): Point[];
  /**
   * 反转线段方向
   * @returns 返回反转后的线段
   */
  reverse(): Segment;
}

/**
 * 窗口多边形类
 * 用于表示由多条线段组成的多边形
 */
export declare class WinPolygon {
  /**
   * 构造函数
   * @param segments - 线段数组
   */
  constructor(segments: Segment[]);
}

/**
 * 装饰组件接口
 * 表示装饰元素的基本组件
 */
export interface DecorationComponent {
  /** 组件类型 */
  type: DecorationComponentType;
  /** 半宽度 */
  semiBarWidth: number;
  /**
   * 获取更新后的线段端点
   * @param polygon - 多边形边界
   * @returns 返回包含起点和终点的元组
   */
  getUpdatedLines(polygon: WinPolygon): [Point, Point];
}

/**
 * 装饰组件类型枚举
 */
export enum DecorationComponentType {
  /** 装饰线类型 */
  decorationLine = 'decorationLine'
}

/**
 * 装饰多边形边类
 * 表示装饰多边形的边
 */
export declare class DecorationPolyEdge {
  /**
   * 创建标准化的线条
   * @param start - 起点
   * @param end - 终点
   * @param semiBarWidth - 半宽度
   * @returns 返回装饰多边形边数组
   */
  static createStandardBars(
    start: Point,
    end: Point,
    semiBarWidth: number
  ): DecorationPolyEdge[];
}

/**
 * 工具类
 * 提供线段相关的静态工具方法
 */
export declare class Utils {
  /**
   * 判断线段是否水平
   * @param segment - 线段对象
   * @returns 如果线段水平则返回 true
   */
  static isSegHorizontal(segment: Segment): boolean;

  /**
   * 判断线段是否垂直
   * @param segment - 线段对象
   * @returns 如果线段垂直则返回 true
   */
  static isSegVertical(segment: Segment): boolean;
}