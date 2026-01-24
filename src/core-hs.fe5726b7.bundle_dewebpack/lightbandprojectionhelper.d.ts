/**
 * 光带投影辅助工具类
 * 用于处理3D曲线到2D平面的投影计算
 */

import { MathAlg, Line2d, Arc2d } from './math-module';
import { Logger } from './logger-module';

/**
 * 2D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 线段路径接口
 */
interface PathSegment {
  /** 起始点 */
  startPoint: Point2D;
  /** 结束点 */
  endPoint: Point2D;
}

/**
 * 3D曲线接口
 */
interface Curve3D {
  /** 获取曲线起点 */
  getStartPt(): Point3D;
  /** 获取曲线终点 */
  getEndPt(): Point3D;
  /** 获取曲线长度 */
  getLength(): number;
}

/**
 * 3D点坐标接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D曲线基类型
 */
type Curve2D = Line2d | Arc2d;

/**
 * 投影源对象接口
 */
interface ProjectionSource {
  /** 获取3D扫掠路径 */
  getSweepPath3D(): Curve3D[];
}

/**
 * 投影目标对象接口
 */
interface ProjectionTarget {
  /** 获取3D曲线对应的2D曲线 */
  getCurve2d(curve3d: Curve3D): Curve2D | null;
  /** 计算到指定点的距离 */
  distanceToPoint(point: Point3D): number;
}

/**
 * 投影结果接口
 */
interface ProjectionResult {
  /** 离散化的线段路径数组 */
  paths: PathSegment[];
  /** 实际的2D曲线数组 */
  realPaths: Curve2D[];
  /** 最小距离 */
  distance: number;
  /** 周长总和 */
  perimeter: number;
}

/**
 * 光带投影辅助类（单例模式）
 * 负责将3D光带曲线投影到2D平面并计算相关几何属性
 */
export class LightBandProjectionHelper {
  /** 单例实例 */
  private static _instance: LightBandProjectionHelper | null = null;

  /** 偏移距离常量（米） */
  private static readonly OFFSET_DISTANCE = -0.01;

  /** 初始最大距离常量 */
  private static readonly INITIAL_MAX_DISTANCE = 1e6;

  /**
   * 私有构造函数，防止外部实例化
   */
  private constructor() {}

  /**
   * 导出2D投影
   * 将3D扫掠路径投影到2D平面，并计算最小距离和周长
   * 
   * @param source - 投影源对象，包含3D扫掠路径
   * @param target - 投影目标对象，提供坐标转换和距离计算
   * @returns 投影结果，包含路径、距离和周长信息
   */
  export2DProjection(source: ProjectionSource, target: ProjectionTarget): ProjectionResult {
    let minDistance = LightBandProjectionHelper.INITIAL_MAX_DISTANCE;
    let totalPerimeter = 0;
    const pathSegments: PathSegment[] = [];
    
    // 获取3D扫掠路径
    const sweepPath3D = source.getSweepPath3D();
    
    // 将3D曲线转换为2D曲线
    const curves2D = sweepPath3D.map((curve3d) => target.getCurve2d(curve3d));
    
    let realPaths: Curve2D[] = [];

    // 如果没有有效的2D曲线，返回默认结果
    if (!curves2D || curves2D.length === 0) {
      return {
        paths: pathSegments,
        realPaths,
        distance: minDistance,
        perimeter: totalPerimeter,
      };
    }

    // 对2D曲线进行偏移处理
    const offsetResult = MathAlg.CalculateOffset.offsetCurve2dList(
      curves2D,
      LightBandProjectionHelper.OFFSET_DISTANCE
    );
    
    // 使用偏移后的曲线，如果偏移失败则使用原始曲线
    const processedCurves = 
      offsetResult.curveList.length === curves2D.length 
        ? offsetResult.curveList 
        : curves2D;

    // 遍历处理每条曲线
    for (let i = 0; i < sweepPath3D.length; i++) {
      const curve3D = sweepPath3D[i];
      const curve2D = processedCurves[i];

      // 累加周长
      totalPerimeter += curve3D.getLength();

      if (curve2D instanceof Line2d) {
        // 处理直线段
        this.processLine2d(curve3D, curve2D, target, pathSegments, (dist) => {
          if (dist < minDistance) {
            minDistance = dist;
          }
        });
      } else if (curve2D instanceof Arc2d) {
        // 处理圆弧段
        this.processArc2d(curve3D, curve2D, target, pathSegments, (dist) => {
          if (dist < minDistance) {
            minDistance = dist;
          }
        });
      } else {
        Logger.console.assert(false, 'unconsidered curve type, please check!');
      }
    }

    realPaths = processedCurves;

    return {
      paths: pathSegments,
      realPaths,
      distance: minDistance,
      perimeter: totalPerimeter,
    };
  }

  /**
   * 处理2D直线
   * @param curve3D - 3D曲线
   * @param line2d - 2D直线
   * @param target - 投影目标
   * @param pathSegments - 路径段数组（输出）
   * @param updateMinDistance - 更新最小距离的回调
   */
  private processLine2d(
    curve3D: Curve3D,
    line2d: Line2d,
    target: ProjectionTarget,
    pathSegments: PathSegment[],
    updateMinDistance: (distance: number) => void
  ): void {
    const startPoint3D = curve3D.getStartPt();
    const endPoint3D = curve3D.getEndPt();
    const startPoint2D = line2d.getStartPt();
    const endPoint2D = line2d.getEndPt();

    pathSegments.push({
      startPoint: startPoint2D,
      endPoint: endPoint2D,
    });

    const distanceToStart = target.distanceToPoint(startPoint3D);
    const distanceToEnd = target.distanceToPoint(endPoint3D);

    updateMinDistance(distanceToStart);
    updateMinDistance(distanceToEnd);
  }

  /**
   * 处理2D圆弧
   * @param curve3D - 3D曲线
   * @param arc2d - 2D圆弧
   * @param target - 投影目标
   * @param pathSegments - 路径段数组（输出）
   * @param updateMinDistance - 更新最小距离的回调
   */
  private processArc2d(
    curve3D: Curve3D,
    arc2d: Arc2d,
    target: ProjectionTarget,
    pathSegments: PathSegment[],
    updateMinDistance: (distance: number) => void
  ): void {
    // 离散化圆弧为点集
    const discretePoints = arc2d.discrete();
    const startPoint3D = curve3D.getStartPt();
    const endPoint3D = curve3D.getEndPt();

    // 将离散点转换为线段
    for (let j = 0; j < discretePoints.length - 1; j++) {
      const currentPoint = discretePoints[j];
      const nextPoint = discretePoints[j + 1];
      
      pathSegments.push({
        startPoint: currentPoint,
        endPoint: nextPoint,
      });
    }

    const distanceToStart = target.distanceToPoint(startPoint3D);
    const distanceToEnd = target.distanceToPoint(endPoint3D);

    updateMinDistance(distanceToStart);
    updateMinDistance(distanceToEnd);
  }

  /**
   * 获取单例实例
   * @returns LightBandProjectionHelper的唯一实例
   */
  static getInstance(): LightBandProjectionHelper {
    if (!this._instance) {
      this._instance = new LightBandProjectionHelper();
    }
    return this._instance;
  }
}