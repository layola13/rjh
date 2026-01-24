/**
 * 2D几何对象模块
 * 提供二维几何计算的核心类型和类
 * @module Circle2d
 */

/**
 * 几何对象类型枚举
 * 用于标识不同的几何对象类别
 */
export enum GeometryObjectType {
  // 具体枚举值需根据实际实现定义
}

/**
 * 二维点接口
 * 表示平面坐标系中的一个点
 */
export interface IPoint2d {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 二维点类
 * 表示平面坐标系中的一个点，提供点相关的几何运算
 */
export declare class Point2d {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;

  /**
   * 构造函数
   * @param x - X坐标值
   * @param y - Y坐标值
   */
  constructor(x: number, y: number);

  // 其他方法需根据实际实现补充
}

/**
 * 二维线段类
 * 表示由两个端点定义的线段
 */
export declare class LineSegment2d {
  /** 起点 */
  start: Point2d;
  /** 终点 */
  end: Point2d;

  /**
   * 构造函数
   * @param start - 线段起点
   * @param end - 线段终点
   */
  constructor(start: Point2d, end: Point2d);

  // 其他方法需根据实际实现补充
}

/**
 * 二维多段线类
 * 表示由多个连续线段组成的曲线
 */
export declare class PolyCurve2d {
  /** 组成多段线的顶点集合 */
  vertices: Point2d[];

  /**
   * 构造函数
   * @param vertices - 顶点数组
   */
  constructor(vertices: Point2d[]);

  // 其他方法需根据实际实现补充
}

/**
 * 二维圆弧类
 * 表示圆周上的一段弧线
 */
export declare class Arc2d {
  /** 圆心 */
  center: Point2d;
  /** 半径 */
  radius: number;
  /** 起始角度（弧度） */
  startAngle: number;
  /** 终止角度（弧度） */
  endAngle: number;

  /**
   * 构造函数
   * @param center - 圆心坐标
   * @param radius - 半径
   * @param startAngle - 起始角度
   * @param endAngle - 终止角度
   */
  constructor(center: Point2d, radius: number, startAngle: number, endAngle: number);

  // 其他方法需根据实际实现补充
}

/**
 * 二维圆类
 * 表示平面上的一个完整的圆
 */
export declare class Circle2d {
  /** 圆心 */
  center: Point2d;
  /** 半径 */
  radius: number;

  /**
   * 构造函数
   * @param center - 圆心坐标
   * @param radius - 半径
   */
  constructor(center: Point2d, radius: number);

  // 其他方法需根据实际实现补充
}

/**
 * 离散多边形类
 * 表示由离散点集合定义的多边形
 */
export declare class DiscretePolygon2d {
  /** 多边形的顶点集合 */
  points: Point2d[];

  /**
   * 构造函数
   * @param points - 顶点数组
   */
  constructor(points: Point2d[]);

  // 其他方法需根据实际实现补充
}

/**
 * 二维多边形类
 * 表示由边界曲线定义的封闭多边形
 */
export declare class Polygon2d {
  /** 外边界 */
  outerBoundary: PolyCurve2d;
  /** 内边界（孔洞）集合 */
  innerBoundaries?: PolyCurve2d[];

  /**
   * 构造函数
   * @param outerBoundary - 外边界曲线
   * @param innerBoundaries - 可选的内边界曲线数组
   */
  constructor(outerBoundary: PolyCurve2d, innerBoundaries?: PolyCurve2d[]);

  // 其他方法需根据实际实现补充
}