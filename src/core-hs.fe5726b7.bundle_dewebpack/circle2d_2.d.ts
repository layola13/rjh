/**
 * 2D圆形几何对象模块
 * 提供圆的创建、操作和几何计算功能
 */

import { GeometryObjectType } from './GeometryObjectType';
import { Curve2d } from './Curve2d';
import { Point2d, IPoint2d, isIPoint2d } from './Point2d';
import { Arc2d } from './Arc2d';
import { isNumber } from './utils/typeGuards';
import { 
  isSamePoint, 
  nearlyEquals, 
  isPointOnCurve 
} from './utils/geometryUtils';

/**
 * 圆形接口定义
 */
export interface ICircle2d {
  /** 圆心坐标 */
  center: IPoint2d;
  /** 圆半径 */
  radius: number;
}

/**
 * 圆形序列化数据接口
 */
export interface Circle2dDumpData {
  /** 圆心坐标（序列化） */
  c: { x: number; y: number };
  /** 几何对象类型 */
  gt: GeometryObjectType.Circle2d;
  /** 圆半径 */
  r: number;
  /** 几何类型（兼容字段） */
  geoType?: GeometryObjectType.Circle2d;
}

/**
 * 离散点获取选项
 */
export interface DiscretePointsOptions {
  /** 点的数量或精度设置 */
  divisions?: number;
  /** 其他可选参数 */
  [key: string]: unknown;
}

/**
 * 2D圆形类
 * 继承自Curve2d，表示平面上的圆形曲线
 */
export class Circle2d extends Curve2d {
  /** 圆心坐标 */
  center: Point2d;
  
  /** 圆半径 */
  radius: number;

  /**
   * 构造函数
   * @param center - 圆心坐标
   * @param radius - 圆半径
   */
  constructor(center: IPoint2d, radius: number) {
    super();
    this.center = new Point2d();
    this.radius = 1;
    this.center.assign(center);
    this.radius = radius;
  }

  /**
   * 获取几何对象类型
   * @returns 返回Circle2d类型标识
   */
  getType(): GeometryObjectType.Circle2d {
    return GeometryObjectType.Circle2d;
  }

  /**
   * 从另一个圆形对象赋值
   * @param circle - 源圆形对象
   */
  assign(circle: ICircle2d): void {
    this.center.assign(circle.center);
    this.radius = circle.radius;
  }

  /**
   * 静态工厂方法创建圆形实例
   * @param config - 圆形配置参数
   * @returns 新的Circle2d实例
   */
  static create(config: ICircle2d): Circle2d {
    const { center, radius } = config;
    return new Circle2d(center, radius);
  }

  /**
   * 序列化圆形数据
   * @returns 序列化后的数据对象
   */
  dump(): Circle2dDumpData {
    return {
      c: this.center.dump(),
      gt: GeometryObjectType.Circle2d,
      r: this.radius
    };
  }

  /**
   * 克隆当前圆形对象
   * @returns 新的Circle2d实例
   */
  clone(): Circle2d {
    return Circle2d.create(this);
  }

  /**
   * 判断曲线是否闭合
   * @returns 圆形始终为闭合曲线，返回true
   */
  isClosed(): boolean {
    return true;
  }

  /**
   * 获取圆形的离散点集合
   * @param options - 离散化选项
   * @returns 离散点数组
   */
  getDiscretePoints(options: DiscretePointsOptions = {}): IPoint2d[] {
    const threeCurve = this._toThreeCurve();
    return HSCore.Util.Geometry.getArcPoints(threeCurve, options).map(
      (point: { x: number; y: number; z?: number }) => ({
        x: point.x,
        y: point.y
      })
    );
  }

  /**
   * 转换为Three.js的ArcCurve对象
   * @private
   * @returns Three.js的ArcCurve实例
   */
  private _toThreeCurve(): THREE.ArcCurve {
    const TWO_PI = 2 * Math.PI;
    return new THREE.ArcCurve(
      this.center.x,
      this.center.y,
      this.radius,
      0,
      TWO_PI,
      false
    );
  }

  /**
   * 获取曲线上指定参数位置的点
   * @param t - 参数值，范围[0, 1]
   * @returns 曲线上的点坐标
   */
  getPoint(t: number): IPoint2d {
    return this._toThreeCurve().getPoint(t);
  }

  /**
   * 判断是否与另一个圆形曲线相同
   * @param other - 待比较的曲线对象
   * @param tolerance - 容差值，默认使用系统常量
   * @returns 如果相同返回true，否则返回false
   */
  isSameCurve(
    other: Curve2d,
    tolerance: number = HSConstants.Constants.TOLERANCE
  ): boolean {
    if (this === other) {
      return true;
    }
    
    if (this.getType() !== other.getType()) {
      return false;
    }
    
    const otherCircle = other as Circle2d;
    return (
      isSamePoint(this.center, otherCircle.center, tolerance) &&
      nearlyEquals(this.radius, otherCircle.radius, tolerance)
    );
  }

  /**
   * 创建子曲线（圆弧）
   * @param startParam - 起始参数
   * @param endParam - 结束参数
   * @returns 对应参数范围的圆弧对象
   */
  createSubCurve(startParam: number, endParam: number): Arc2d {
    const { center, radius } = this;
    return Arc2d.create({
      center,
      radius,
      start: startParam,
      end: endParam,
      clockwise: false
    });
  }

  /**
   * 判断点是否在圆形曲线上
   * @param point - 待检测的点
   * @param tolerance - 容差值，默认使用系统常量
   * @returns 如果点在曲线上返回true，否则返回false
   */
  isPointOnCurve(
    point: IPoint2d,
    tolerance: number = HSConstants.Constants.TOLERANCE
  ): boolean {
    const vector = GeLib.VectorUtils.toTHREEVector3(point);
    return isPointOnCurve(vector, this._toThreeCurve(), tolerance);
  }

  /**
   * 计算与水平线的交点
   * @param y - 水平线的y坐标
   * @returns 交点数组
   */
  hLineIntersections(y: number): IPoint2d[] {
    const intersections: IPoint2d[] = [];
    
    const horizontalLine = GeLib.LineUtils.toTHREELine3(
      { x: 0, y },
      { x: 1, y }
    );
    
    const curve = this._toThreeCurve();
    const intersectionInfo = GeLib.CurveUtils.getIntersectionInfo(
      curve,
      horizontalLine
    );
    
    const count = intersectionInfo?.intersects.length ?? 0;
    
    for (let i = 0; i < count; i++) {
      const intersection = intersectionInfo.intersects[i];
      if (intersection) {
        intersections.push(intersection);
      }
    }
    
    return intersections;
  }
}

/**
 * 类型守卫：判断对象是否为ICircle2d接口
 * @param obj - 待检测的对象
 * @returns 如果是ICircle2d返回true，否则返回false
 */
export function isICircle2d(obj: unknown): obj is ICircle2d {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  
  const candidate = obj as Partial<ICircle2d>;
  return (
    isIPoint2d(candidate.center) &&
    isNumber(candidate.radius)
  );
}

/**
 * 类型守卫：判断对象是否为Circle2d序列化数据
 * @param obj - 待检测的对象
 * @returns 如果是Circle2dDumpData返回true，否则返回false
 */
export function isCircle2dDumpData(obj: unknown): obj is Circle2dDumpData {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  
  const candidate = obj as Partial<Circle2dDumpData>;
  return (
    candidate.gt === GeometryObjectType.Circle2d ||
    candidate.geoType === GeometryObjectType.Circle2d
  );
}