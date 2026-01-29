/**
 * SketchHelper - 草图与BRep几何转换辅助工具
 * 提供草图面、曲线与三维几何对象之间的转换功能
 */

import { Plane, Tolerance, Line3d, Arc3d, Vector3, Line2d, Arc2d, MathAlg } from './math-geometry';
import { alg } from './algorithm';
import { Line2d as SketchLine2d } from './sketch-line2d';
import { Circle2d } from './sketch-circle2d';
import { CircleArc2d } from './sketch-circle-arc2d';
import { Logger } from './logger';

/** 草图面数据结构 */
export interface SketchFace {
  /** 获取面的线框集合 */
  getWires(): SketchWire[];
  /** 面的外形轮廓 */
  faces: SketchFace[];
}

/** 草图线框 */
export interface SketchWire {
  /** 组成线框的曲线集合 */
  curves: SketchCurve[];
}

/** 草图曲线基类 */
export interface SketchCurve {
  /** 曲线类型标识 */
  Class: string;
  /** 起点（Line2d/CircleArc2d） */
  start?: Point2d;
  /** 终点（Line2d/CircleArc2d） */
  end?: Point2d;
  /** 中点（CircleArc2d） */
  middle?: Point2d;
  /** 圆心（Circle2d/CircleArc2d） */
  center?: Point2d;
  /** 半径（Circle2d/CircleArc2d） */
  radius?: number;
  /** 是否顺时针（CircleArc2d） */
  clockwise?: boolean;
  /** 曲线上的离散点集合（用于匹配） */
  points?: Point2d[];
}

/** 二维点 */
export interface Point2d {
  x: number;
  y: number;
}

/** 三维点 */
export interface Point3d {
  x: number;
  y: number;
  z: number;
}

/** Shell创建结果 */
export interface ShellCreationResult {
  /** 错误信息 */
  errorStr?: string;
  /** 生成的Shell数组 */
  addShells?: unknown[];
}

/** 曲线匹配结果 */
interface CurveMatchResult {
  /** 匹配到的草图二维线 */
  sketchLine2d: SketchLine2d;
  /** 匹配距离 */
  dist: number;
}

/**
 * SketchHelper - 草图辅助工具类（单例模式）
 * 负责草图几何与BRep几何之间的转换
 */
export class SketchHelper {
  private static _instance: SketchHelper;
  
  /** 草图几何容差阈值 */
  private readonly SketchTolerance: number = 0.001;

  private constructor() {}

  /**
   * 获取SketchHelper单例实例
   */
  public static getInstance(): SketchHelper {
    if (!this._instance) {
      this._instance = new SketchHelper();
    }
    return this._instance;
  }

  /**
   * 将草图面转换为BRep Shell对象
   * @param sketchFace - 草图面对象
   * @returns BRep Shell对象，转换失败返回undefined
   */
  public sketchFace2BrepShell(sketchFace: SketchFace): unknown | undefined {
    const plane = Plane.XOY();
    const brepFace = this.sketchFace2BrepFace(sketchFace);
    const result: ShellCreationResult = alg.ShellBuilder.createFacesFromCurves(
      plane,
      [brepFace],
      { checkOverlap: true }
    );

    if (result.errorStr) {
      Logger.console.assert(false, result.errorStr);
      return undefined;
    }

    if (result.addShells && result.addShells.length === 1) {
      return result.addShells[0];
    }

    Logger.console.assert(false, '基于sketch单面生成的shell数量应该为1！');
    return undefined;
  }

  /**
   * 从草图中提取三维面曲线集合
   * @param sketch - 草图对象
   * @returns 三维面曲线数组
   */
  public extract3DFaceCurvesFromSketch(sketch?: SketchFace): unknown[][] {
    const faceCurves: unknown[][] = [];
    if (!sketch) {
      return faceCurves;
    }

    for (let i = 0; i < sketch.faces.length; i++) {
      const face = sketch.faces[i];
      const brepFace = this.sketchFace2BrepFace(face);
      faceCurves.push(brepFace);
    }

    return faceCurves;
  }

  /**
   * 将草图面转换为BRep面（三维曲线环数组）
   * @param sketchFace - 草图面
   * @returns 三维曲线环的二维数组（外环+内环）
   */
  public sketchFace2BrepFace(sketchFace: SketchFace): unknown[][] {
    const loops: unknown[][] = [];
    const wires = sketchFace.getWires();

    for (let wireIndex = 0; wireIndex < wires.length; wireIndex++) {
      const orderedCurves: unknown[] = [];
      const sketchCurves = wires[wireIndex].curves;

      if (sketchCurves.length === 0) {
        Logger.console.assert(false, 'sketch上提取face边界遇到空边界的情况！');
        continue;
      }

      // 转换为三维数学曲线
      const mathCurves3d = sketchCurves.map(curve =>
        SketchHelper.getInstance().sketchCurve2MathCurve3d(curve)
      );

      // 排序并确保曲线首尾相连
      for (let curveIndex = 0; curveIndex < mathCurves3d.length; curveIndex++) {
        const currentCurve = mathCurves3d[curveIndex];

        if (!currentCurve) {
          Logger.console.assert(false, 'sketch边界转math边界，转换结果为undefined');
          continue;
        }

        // 过滤掉长度过小的退化曲线
        if (currentCurve.getLength() < Tolerance.LENGTH_EPS) {
          continue;
        }

        if (curveIndex === 0) {
          orderedCurves.push(currentCurve);
        } else {
          const currentStart = currentCurve.getStartPt();
          const currentEnd = currentCurve.getEndPt();
          const prevCurve = mathCurves3d[curveIndex - 1];
          const prevStart = prevCurve.getStartPt();
          const prevEnd = prevCurve.getEndPt();

          // 匹配前一条曲线的终点与当前曲线的起点/终点
          if (prevEnd.equals(currentStart, this.SketchTolerance)) {
            orderedCurves.push(currentCurve);
          } else if (prevEnd.equals(currentEnd, this.SketchTolerance)) {
            orderedCurves.push(currentCurve.reverse());
          } else if (prevStart.equals(currentStart, this.SketchTolerance)) {
            prevCurve?.reverse();
            orderedCurves.push(currentCurve);
          } else if (prevStart.equals(currentEnd, this.SketchTolerance)) {
            prevCurve?.reverse();
            orderedCurves.push(currentCurve.reverse());
          }
        }
      }

      // 计算环的面积方向，调整曲线顺序
      const curves2d = orderedCurves.map(curve3d =>
        Plane.XOY().getCurve2d(curve3d)
      );
      const loopArea = MathAlg.LoopArea.areaOfLoop(curves2d);

      // 外环逆时针（面积>0），内环顺时针（面积<0）
      const shouldReverse =
        (wireIndex === 0 && loopArea < 0) || (wireIndex > 0 && loopArea > 0);

      if (shouldReverse) {
        orderedCurves.reverse();
        orderedCurves.forEach(curve => curve.reverse());
      }

      loops.push(orderedCurves);
    }

    return loops;
  }

  /**
   * 将草图二维曲线转换为三维数学曲线
   * @param sketchCurve - 草图曲线
   * @returns 三维曲线对象（Line3d/Arc3d）
   */
  public sketchCurve2MathCurve3d(sketchCurve: SketchCurve): any | undefined {
    const CLASS_LINE = 'HSCore.Model.Line2d';
    const CLASS_CIRCLE = 'HSCore.Model.Circle2d';
    const CLASS_ARC = 'HSCore.Model.CircleArc2d';

    // 处理直线
    if (sketchCurve.Class === CLASS_LINE) {
      const start = sketchCurve.start;
      const end = sketchCurve.end;

      if (!start || !end) {
        Logger.console.assert(false, 'curve2MathCurve found undefined');
        return undefined;
      }

      const line3d = new Line3d(
        { x: start.x, y: start.y, z: 0 },
        { x: end.x, y: end.y, z: 0 }
      );
      line3d.userData = { sketchCom: sketchCurve };
      return line3d;
    }

    // 处理完整圆
    if (sketchCurve.Class === CLASS_CIRCLE) {
      const center = sketchCurve.center!;
      const radius = sketchCurve.radius!;
      const startPoint: Point3d = { x: center.x + radius, y: center.y, z: 0 };
      const endPoint: Point3d = startPoint;
      const midPoint: Point3d = { x: center.x - radius, y: center.y, z: 0 };

      let arc = Arc3d.makeArcByThreePoints(startPoint, midPoint, endPoint);

      if (!arc) {
        arc = Arc3d.makeArcByStartEndPoints(
          { x: center.x, y: center.y, z: 0 },
          radius,
          Vector3.Z(),
          startPoint,
          endPoint,
          true
        );
      }

      arc.userData = { sketchCom: sketchCurve };
      return arc;
    }

    // 处理圆弧
    if (sketchCurve.Class === CLASS_ARC) {
      const start = sketchCurve.start!;
      const end = sketchCurve.end!;
      const middle = sketchCurve.middle!;
      const startPoint: Point3d = { x: start.x, y: start.y, z: 0 };
      const endPoint: Point3d = { x: end.x, y: end.y, z: 0 };
      const midPoint: Point3d = { x: middle.x, y: middle.y, z: 0 };

      let arc = Arc3d.makeArcByThreePoints(startPoint, midPoint, endPoint);

      if (!arc) {
        const center = sketchCurve.center!;
        const radius = sketchCurve.radius!;
        const isClockwise = sketchCurve.clockwise!;

        arc = Arc3d.makeArcByStartEndPoints(
          { x: center.x, y: center.y, z: center.z ?? 0 },
          radius,
          Vector3.Z(),
          startPoint,
          endPoint,
          !isClockwise
        );
      }

      arc.userData = { sketchCom: sketchCurve };
      return arc;
    }

    Logger.console.assert(false, 'curve2MathCurve found undefined');
    return undefined;
  }

  /**
   * 在草图曲线集合中匹配给定的数学曲线
   * @param mathCurve - 待匹配的数学曲线（Line2d/Arc2d）
   * @param sketchCurves - 草图曲线集合
   * @param tolerance - 匹配容差，默认0.005
   * @returns 匹配到的草图曲线，失败返回undefined
   */
  public matchCurve(
    mathCurve: Line2d | Arc2d,
    sketchCurves: SketchCurve[],
    tolerance: number = 0.005
  ): SketchLine2d | Circle2d | CircleArc2d | undefined {
    const lines = sketchCurves.filter(c => c instanceof SketchLine2d) as SketchLine2d[];
    const circles = sketchCurves.filter(c => c instanceof Circle2d) as Circle2d[];
    const arcs = sketchCurves.filter(c => c instanceof CircleArc2d) as CircleArc2d[];

    // 匹配直线
    if (mathCurve instanceof Line2d) {
      const startPoint = mathCurve.getStartPt();
      const endPoint = mathCurve.getEndPt();

      if (!startPoint || !endPoint) {
        Logger.console.assert(false, 'calcSketchBrepMp: search point null, please check!');
        return undefined;
      }

      const matchResults: CurveMatchResult[] = [];

      for (const sketchLine of lines) {
        const matchedStarts = sketchLine.points?.filter(
          pt => pt && startPoint.equals(pt, tolerance)
        );
        const matchedEnds = sketchLine.points?.filter(
          pt =>
            pt &&
            endPoint.equals(pt, tolerance) &&
            (matchedStarts?.length !== 1 || pt !== matchedStarts[0])
        );

        if (matchedStarts && matchedStarts.length > 0 && matchedEnds && matchedEnds.length > 0) {
          const line2d = new Line2d(sketchLine.start!, sketchLine.end!);
          const distance = MathAlg.CalculateDistance.pointToCurve2d(startPoint, line2d);
          matchResults.push({
            sketchLine2d: sketchLine,
            dist: Math.abs(distance)
          });
        }
      }

      if (matchResults.length === 0) {
        Logger.console.assert(false, 'calcSketchBrepMp: matchedLines failed, please check!');
        return undefined;
      }

      matchResults.sort((a, b) => a.dist - b.dist);
      return matchResults[0].sketchLine2d;
    }

    // 匹配圆弧
    if (mathCurve instanceof Arc2d) {
      const arcCenter = mathCurve.getCenter();
      const arcRadius = mathCurve.getRadius();

      // 匹配完整圆
      if (mathCurve.isClosed()) {
        for (const circle of circles) {
          if (
            arcCenter.equals(circle.center!, tolerance) &&
            Math.abs(arcRadius - circle.radius!) < this.SketchTolerance
          ) {
            return circle;
          }
        }
      } else {
        // 匹配圆弧
        const arcStart = mathCurve.getStartPt();
        const arcEnd = mathCurve.getEndPt();
        const isClockwise = !mathCurve.isCCW();

        for (const sketchArc of arcs) {
          if (
            arcCenter.equals(sketchArc.center!, tolerance) &&
            Math.abs(arcRadius - sketchArc.radius!) < tolerance
          ) {
            // 方向一致且端点匹配
            if (
              sketchArc.clockwise === isClockwise &&
              arcStart.equals(sketchArc.start!, tolerance) &&
              arcEnd.equals(sketchArc.end!, tolerance)
            ) {
              return sketchArc;
            }

            // 方向相反且端点反向匹配
            if (
              sketchArc.clockwise !== isClockwise &&
              arcStart.equals(sketchArc.end!, tolerance) &&
              arcEnd.equals(sketchArc.start!, tolerance)
            ) {
              return sketchArc;
            }
          }
        }
      }
    }

    return undefined;
  }
}