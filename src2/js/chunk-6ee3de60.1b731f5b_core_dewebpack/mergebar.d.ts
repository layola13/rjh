/**
 * 几何形状元素接口
 * 表示一个几何边缘（edge），可以是线段或弧
 */
interface IShapeElement {
  /** 前一个元素 */
  prev?: IShapeElement;
  /** 后一个元素 */
  next?: IShapeElement;
  /** 几何形状值（线段或弧） */
  value: ISegment | IArc;
}

/**
 * 点接口
 * 表示二维平面上的一个点
 */
interface IPoint {
  /**
   * 判断点是否与另一个点相等
   * @param other - 要比较的点
   * @returns 如果两点坐标相等则返回 true
   */
  equalTo(other: IPoint): boolean;
}

/**
 * 线段接口
 * 表示由起点和终点定义的线段
 */
interface ISegment {
  /** 线段起点 */
  start: IPoint;
  /** 线段终点 */
  end: IPoint;
}

/**
 * 向量接口
 * 表示二维向量
 */
interface IVector {
  /** 向量的斜率 */
  slope: number;
}

/**
 * 圆弧接口
 * 表示圆弧形状
 */
interface IArc {
  /** 圆弧圆心 */
  center: IPoint;
  /** 圆弧起点 */
  start: IPoint;
  /** 圆弧终点 */
  end: IPoint;
  /** 圆弧半径 */
  r: number;
  /** 起始角度（弧度） */
  startAngle: number;
  /** 是否逆时针方向 */
  counterClockwise: boolean;
  /**
   * 判断点是否在圆弧上
   * @param point - 要检测的点
   * @returns 如果点在圆弧上则返回 true
   */
  contains(point: IPoint): boolean;
}

/**
 * 直线接口
 * 表示无限延伸的直线
 */
interface ILine {
  /**
   * 判断点是否在直线上
   * @param point - 要检测的点
   * @returns 如果点在直线上则返回 true
   */
  contains(point: IPoint): boolean;
}

/**
 * 端点停靠信息接口
 * 用于存储多边形端点的停靠状态
 */
interface IEndPointDock {
  /** 起点停靠信息 */
  stDock: unknown;
  /** 终点停靠信息 */
  etDock: unknown;
  /**
   * 设置停靠信息
   * @param isStart - 是否为起点
   * @param dockInfo - 停靠信息
   */
  setDock(isStart: boolean, dockInfo: unknown): void;
}

/**
 * 样条线接口
 * 表示可克隆的样条曲线
 */
interface ISpline {
  /**
   * 克隆样条线
   * @returns 样条线的副本
   */
  clone(): ISpline;
}

/**
 * 多边形接口
 * 表示由多条边组成的封闭图形
 */
interface IPolygon {
  /** 多边形的所有边 */
  edges: Array<ISegment | IArc>;
  /** 样条线 */
  spLine: ISpline;
  /** 多重形状（线段或圆弧） */
  mulShape: ISegment | IArc;
  /** 端点停靠信息 */
  epDock: IEndPointDock;
}

/**
 * 几何工具类命名空间
 * 提供创建和操作几何形状的静态方法
 */
declare namespace Geometry {
  /**
   * 创建线段
   * @param start - 起点
   * @param end - 终点
   * @returns 线段对象
   */
  function segment(start: IPoint, end: IPoint): ISegment;

  /**
   * 创建向量
   * @param from - 起点
   * @param to - 终点
   * @returns 向量对象
   */
  function vector(from: IPoint, to: IPoint): IVector;

  /**
   * 创建圆弧
   * @param center - 圆心
   * @param radius - 半径
   * @param startAngle - 起始角度（弧度）
   * @param endAngle - 结束角度（弧度）
   * @param counterClockwise - 是否逆时针方向
   * @returns 圆弧对象
   */
  function arc(
    center: IPoint,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean
  ): IArc;

  /**
   * 创建直线
   * @param start - 起点
   * @param end - 终点
   * @returns 直线对象
   */
  function line(start: IPoint, end: IPoint): ILine;

  /**
   * 圆弧创建工具类
   */
  namespace Arc {
    /**
     * 通过起点和终点创建圆弧
     * @param center - 圆心
     * @param start - 起点
     * @param end - 终点
     * @param counterClockwise - 是否逆时针方向
     * @returns 圆弧对象
     */
    function arcSE(
      center: IPoint,
      start: IPoint,
      end: IPoint,
      counterClockwise: boolean
    ): IArc;
  }
}

/**
 * 形状分割工具类
 * 提供多边形分割和重构功能
 */
declare class Splitter {
  /**
   * 将形状元素数组转换为双向链表
   * @param elements - 形状元素数组
   */
  static doubleLinked(elements: IShapeElement[]): void;

  /**
   * 从链表元素查找并构建多边形
   * @param startElement - 起始元素
   * @returns 构建的多边形对象
   */
  static findPoly(startElement: IShapeElement): IPolygon;
}

/**
 * 多边形合并工具类
 * 用于将两个多边形通过共享边合并为一个多边形
 * 
 * @example
 *