/**
 * 区域工具类
 * 提供区域、盒子、曲线等几何对象的相交、包含、变换等操作
 */

import { Box2, MathAlg, Line2d } from './math-geometry';
import { HintBox } from './hint-box';
import { Vector2 } from './vector';
import { Curve } from './curve';
import { Loop } from './loop';
import { Polygon } from './polygon';

/**
 * 家具分组对象接口
 */
interface FurnitureGroup {
  /** 家具类型 */
  type: string;
  /** 有向包围盒 */
  obbBox2: Box2;
}

/**
 * 提示框类型
 */
type HintBoxType = 'Living' | 'Dining';

/**
 * 曲线投影结果元组
 * [曲线对象, 投影点, 距离]
 */
type CurveProjection = [Curve, Vector2, number];

/**
 * 区域工具类
 * 提供几何计算、碰撞检测、凸包算法等功能
 */
export class RegionUtil {
  
  /**
   * 判断盒子是否与多边形相交
   * @param box - 待检测的盒子
   * @param polygon - 多边形对象
   * @returns 是否相交
   */
  static isBoxInterPolygon(box: Box2, polygon: Polygon): boolean {
    return box.intersectsBox(new Box2(polygon.outerLoop.getAllPoints()));
  }

  /**
   * 判断盒子是否与曲线集合相交
   * @param box - 待检测的盒子
   * @param curves - 曲线数组
   * @returns 是否相交
   */
  static isBoxInterCurves(box: Box2, curves: Curve[]): boolean {
    return box.intersectsBox(new Box2(curves.map(curve => curve.getStartPt())));
  }

  /**
   * 扩展盒子尺寸
   * @param box - 待扩展的盒子（会被直接修改）
   * @param expansion - 扩展量
   */
  static expandBox(box: Box2, expansion: number): void {
    const { x: width, y: height } = box.getSize();
    const scaleFactor = Math.max(
      Math.min((width + expansion) / width, (height + expansion) / height),
      1
    );
    this.scaleBox(box, scaleFactor);
  }

  /**
   * 根据家具类型获取提示框类型
   * @param group - 家具分组对象
   * @returns 提示框类型
   */
  static getHintBoxType(group: FurnitureGroup): HintBoxType {
    const type = group.type;
    return type.startsWith('Sofa') ? 'Living' : 'Dining';
  }

  /**
   * 将家具分组转换为提示框
   * @param group - 家具分组对象
   * @returns 提示框对象
   */
  static groupToHintBox(group: FurnitureGroup): HintBox {
    const box = new Box2(group.obbBox2.getAllPoints());
    return new HintBox({
      type: this.getHintBoxType(group),
      box
    });
  }

  /**
   * 缩放盒子（直接修改原对象）
   * @param box - 待缩放的盒子
   * @param scaleFactor - 缩放因子
   */
  static scaleBox(box: Box2, scaleFactor: number): void {
    const newSize: Vector2 = {
      x: box.getSize().x * scaleFactor,
      y: box.getSize().y * scaleFactor
    };
    box.setFromCenterAndSize(box.getCenter(), newSize);
  }

  /**
   * 缩放盒子（返回新对象）
   * @param box - 原始盒子
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的新盒子
   */
  static scaleCloneBox(box: Box2, scaleFactor: number): Box2 {
    const newSize: Vector2 = {
      x: box.getSize().x * scaleFactor,
      y: box.getSize().y * scaleFactor
    };
    return box.clone().setFromCenterAndSize(box.getCenter(), newSize);
  }

  /**
   * 判断一个盒子是否包含另一个盒子
   * @param containerBox - 容器盒子
   * @param targetBox - 目标盒子
   * @param threshold - 包含阈值（默认0.85）
   * @returns 是否包含
   */
  static boxContainsBox(
    containerBox: Box2,
    targetBox: Box2,
    threshold: number = 0.85
  ): boolean {
    const scaledSize: Vector2 = {
      x: targetBox.getSize().x * threshold,
      y: targetBox.getSize().y * threshold
    };
    return containerBox.containsBox(
      new Box2().setFromCenterAndSize(targetBox.getCenter(), scaledSize)
    );
  }

  /**
   * 判断闭合环是否包含盒子
   * @param loop - 闭合环
   * @param box - 待检测的盒子
   * @param scaleRatio - 缩放比例（默认0.99）
   * @param tolerance - 容差（默认1e-6）
   * @returns 是否包含
   */
  static loopContainsBox(
    loop: Loop,
    box: Box2,
    scaleRatio: number = 0.99,
    tolerance: number = 1e-6
  ): boolean {
    return this.scaleCloneBox(box, scaleRatio)
      .getCornerPts()
      .every(
        point =>
          MathAlg.PositionJudge.ptToLoop(point, loop, tolerance).type !==
          MathAlg.PtLoopPositonType.OUT
      );
  }

  /**
   * 获取曲线集合的连接点
   * @param curves - 曲线数组
   * @param tolerance - 容差（默认0.001）
   * @returns 连接点数组
   */
  static getCurvesJoints(curves: Curve[], tolerance: number = 0.001): Vector2[] {
    const joints: Vector2[] = [];
    for (const curve of curves) {
      const endPoint = curve.getEndPt();
      if (curves.some(c => c.getStartPt().equals(endPoint, tolerance))) {
        joints.push(endPoint);
      }
    }
    return joints;
  }

  /**
   * 获取距离点最近的曲线及投影点
   * @param curves - 曲线数组
   * @param point - 目标点
   * @returns [最近的曲线, 投影点, 距离]
   */
  static getNearestCurveAndProjectionPt(
    curves: Curve[],
    point: Vector2
  ): CurveProjection {
    return curves
      .map((curve): CurveProjection => {
        const projectionPt = curve.getProjectedPtBy(point);
        let distance = point.distanceTo(projectionPt);
        if (!curve.containsPoint(projectionPt)) {
          distance = Infinity;
        }
        return [curve, projectionPt, distance];
      })
      .sort((a, b) => a[2] - b[2])[0];
  }

  /**
   * 将曲线端点合并到点集中（去重）
   * @param pointSet - 点集数组
   * @param curve - 曲线对象
   */
  static mergeCurveIntoPtSet(pointSet: Vector2[], curve: Curve): void {
    let point = curve.getStartPt();
    if (!pointSet.some(p => p.equals(point))) {
      pointSet.push(point);
    }
    
    point = curve.getEndPt();
    if (!pointSet.some(p => p.equals(point))) {
      pointSet.push(point);
    }
  }

  /**
   * 将曲线集合转换为包围盒
   * @param curves - 曲线数组
   * @returns 包围盒
   */
  static curvesToBox(curves: Curve[]): Box2 {
    return new Box2(
      curves
        .map(curve => [curve.getStartPt(), curve.getEndPt()])
        .reduce((acc, points) => [...acc, ...points], [])
    );
  }

  /**
   * 按连接顺序对曲线进行排序
   * @param curves - 曲线数组
   * @returns 排序后的曲线数组，若无法连接则返回空数组
   */
  static sortCurvesByConnection(curves: Curve[]): Curve[] {
    if (curves.length < 2) return curves;

    const sortedCurves: Curve[] = [];
    
    // 找到起始曲线（没有其他曲线连接到它的起点）
    let startCurve = curves.find(
      curve => !curves.some(c => c.getEndPt().equals(curve.getStartPt()))
    );
    
    if (!startCurve) return [];

    sortedCurves.push(startCurve);

    while (sortedCurves.length < curves.length) {
      const lastCurve = sortedCurves[sortedCurves.length - 1];
      const nextCurve = curves.find(curve =>
        curve.getStartPt().equals(lastCurve.getEndPt())
      );
      
      if (!nextCurve) return [];
      sortedCurves.push(nextCurve);
    }

    return sortedCurves;
  }

  /**
   * 判断曲线是否与曲线集合连接
   * @param curve - 待检测的曲线
   * @param curves - 曲线集合
   * @param tolerance - 容差（默认0.001）
   * @returns 是否连接
   */
  static isCurveConnectedToCurves(
    curve: Curve,
    curves: Curve[],
    tolerance: number = 0.001
  ): boolean {
    return curves.some(
      c =>
        c.getStartPt().equals(curve.getStartPt(), tolerance) ||
        c.getStartPt().equals(curve.getEndPt(), tolerance) ||
        c.getEndPt().equals(curve.getStartPt(), tolerance) ||
        c.getEndPt().equals(curve.getEndPt(), tolerance)
    );
  }

  /**
   * 获取与曲线趋势相同的端点集合
   * @param curve - 参考曲线
   * @param points - 端点数组
   * @returns 趋势相同的点数组
   */
  static getSameTendPts(curve: Curve, points: Vector2[]): Vector2[] {
    const center = new Box2(points).getCenter();
    const sameTendPoints: Vector2[] = [];
    const halfPi = 0.5 * Math.PI;

    for (const point of points) {
      const line = new Line2d(center, point);
      const angle = curve.getMidTangent().angleTo(line.getMidTangent());
      
      if (angle < Math.PI - halfPi || angle > Math.PI + halfPi) {
        sameTendPoints.push(point);
      }
    }

    return sameTendPoints;
  }

  /**
   * 凸包算法（Graham扫描法）
   * 计算点集的凸包
   * @param points - 点数组
   * @returns 凸包顶点数组
   */
  static convexHull(points: Vector2[]): Vector2[] {
    // 按x坐标排序，x相同则按y排序
    points.sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));

    const pointCount = points.length;
    const hull: Vector2[] = [];

    // 构建上下凸包
    for (let i = 0; i < 2 * pointCount; i++) {
      const index = i < pointCount ? i : 2 * pointCount - 1 - i;
      
      while (
        hull.length >= 2 &&
        isCounterClockwise(hull[hull.length - 2], hull[hull.length - 1], points[index])
      ) {
        hull.pop();
      }
      
      hull.push(points[index]);
    }

    hull.pop(); // 移除重复的起点
    return hull;
  }
}

/**
 * 判断三点是否构成逆时针转向
 * @param p1 - 第一个点
 * @param p2 - 第二个点
 * @param p3 - 第三个点
 * @returns 是否逆时针或共线且p3在p1-p2延长线反方向
 */
function isCounterClockwise(p1: Vector2, p2: Vector2, p3: Vector2): boolean {
  const crossProduct = (p1.x - p2.x) * (p3.y - p2.y) - (p1.y - p2.y) * (p3.x - p2.x);
  const dotProduct = (p1.x - p2.x) * (p3.x - p2.x) + (p1.y - p2.y) * (p3.y - p2.y);
  
  return crossProduct < 0 || (crossProduct === 0 && dotProduct <= 0);
}