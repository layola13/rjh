import { Plane, Tolerance, Line3d, Arc3d, Vector3, Line2d, Arc2d, MathAlg } from './math';
import { alg } from './algorithm';
import { Line2d as SketchLine2d } from './sketch/Line2d';
import { Circle2d } from './sketch/Circle2d';
import { CircleArc2d } from './sketch/CircleArc2d';
import { Logger } from './logger';

interface SketchFace {
  getWires(): SketchWire[];
  faces: SketchFace[];
}

interface SketchWire {
  curves: SketchCurve[];
}

type SketchCurve = SketchLine2d | Circle2d | CircleArc2d;

interface Point2d {
  x: number;
  y: number;
}

interface Point3d {
  x: number;
  y: number;
  z: number;
}

interface CurveUserData {
  sketchCom: SketchCurve;
}

interface Curve3d {
  getLength(): number;
  getStartPt(): Point3d;
  getEndPt(): Point3d;
  reverse(): Curve3d;
  userData?: CurveUserData;
}

interface MatchResult {
  sketchLine2d: SketchLine2d;
  dist: number;
}

interface ShellBuildResult {
  errorStr?: string;
  addShells?: unknown[];
}

export class SketchHelper {
  private static _instance: SketchHelper;
  private readonly SketchTolerance: number = 0.001;

  private constructor() {}

  static getInstance(): SketchHelper {
    if (!this._instance) {
      this._instance = new SketchHelper();
    }
    return this._instance;
  }

  sketchFace2BrepShell(face: SketchFace): unknown | undefined {
    const plane = Plane.XOY();
    const brepFace = this.sketchFace2BrepFace(face);
    const result: ShellBuildResult = alg.ShellBuilder.createFacesFromCurves(plane, [brepFace], {
      checkOverlap: true
    });

    if (result.errorStr) {
      Logger.console.assert(false, result.errorStr);
    } else {
      if (result.addShells && result.addShells.length === 1) {
        return result.addShells[0];
      }
      Logger.console.assert(false, '基于sketch单面生成的shell数量应该为1！');
    }
  }

  extract3DFaceCurvesFromSketch(sketch: SketchFace | null): Curve3d[][] {
    const faceCurves: Curve3d[][] = [];
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

  sketchFace2BrepFace(face: SketchFace): Curve3d[][] {
    const loops: Curve3d[][] = [];
    const wires = face.getWires();

    for (let wireIndex = 0; wireIndex < wires.length; wireIndex++) {
      const curvesInLoop: Curve3d[] = [];
      const sketchCurves = wires[wireIndex].curves;

      if (sketchCurves.length === 0) {
        Logger.console.assert(false, 'sketch上提取face边界遇到空边界的情况！');
        continue;
      }

      const mathCurves = sketchCurves.map(curve => 
        SketchHelper.getInstance().sketchCurve2MathCurve3d(curve)
      );

      for (let curveIndex = 0; curveIndex < mathCurves.length; curveIndex++) {
        const currentCurve = mathCurves[curveIndex];
        
        if (!currentCurve) {
          Logger.console.assert(false, 'sketch边界转math边界，转换结果为undefined');
          continue;
        }

        if (currentCurve.getLength() < Tolerance.LENGTH_EPS) {
          continue;
        }

        if (curveIndex === 0) {
          curvesInLoop.push(currentCurve);
        } else {
          const currentStart = currentCurve.getStartPt();
          const currentEnd = currentCurve.getEndPt();
          const previousStart = mathCurves[curveIndex - 1].getStartPt();
          const previousEnd = mathCurves[curveIndex - 1].getEndPt();

          if (previousEnd.equals(currentStart, this.SketchTolerance)) {
            curvesInLoop.push(currentCurve);
          } else if (previousEnd.equals(currentEnd, this.SketchTolerance)) {
            curvesInLoop.push(currentCurve.reverse());
          } else if (previousStart.equals(currentStart, this.SketchTolerance)) {
            mathCurves[curveIndex - 1]?.reverse();
            curvesInLoop.push(currentCurve);
          } else if (previousStart.equals(currentEnd, this.SketchTolerance)) {
            mathCurves[curveIndex - 1]?.reverse();
            curvesInLoop.push(currentCurve.reverse());
          }
        }
      }

      const curves2d = curvesInLoop.map(curve => Plane.XOY().getCurve2d(curve));
      const loopArea = MathAlg.LoopArea.areaOfLoop(curves2d);

      if ((wireIndex === 0 && loopArea < 0) || (wireIndex > 0 && loopArea > 0)) {
        curvesInLoop.reverse();
        curvesInLoop.map(curve => curve.reverse());
      }

      loops.push(curvesInLoop);
    }

    return loops;
  }

  sketchCurve2MathCurve3d(curve: SketchCurve): Curve3d | undefined {
    if (curve.Class === 'HSCore.Model.Line2d') {
      const line = curve as SketchLine2d;
      const start = line.start;
      const end = line.end;

      if (!start || !end) {
        Logger.console.assert(false, 'curve2MathCurve found undefined');
        return;
      }

      const line3d = new Line3d(
        { x: start.x, y: start.y, z: 0 },
        { x: end.x, y: end.y, z: 0 }
      );
      line3d.userData = { sketchCom: curve };
      return line3d;
    }

    if (curve.Class === 'HSCore.Model.Circle2d') {
      const circle = curve as Circle2d;
      const center = circle.center;
      const radius = circle.radius;

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
          startPoint,
          true
        );
      }

      arc.userData = { sketchCom: curve };
      return arc;
    }

    if (curve.Class === 'HSCore.Model.CircleArc2d') {
      const arc = curve as CircleArc2d;
      const start = arc.start;
      const end = arc.end;
      const middle = arc.middle;

      const startPoint: Point3d = { x: start.x, y: start.y, z: 0 };
      const endPoint: Point3d = { x: end.x, y: end.y, z: 0 };
      const midPoint: Point3d = { x: middle.x, y: middle.y, z: 0 };

      let arc3d = Arc3d.makeArcByThreePoints(startPoint, midPoint, endPoint);

      if (!arc3d) {
        const center = arc.center;
        const radius = arc.radius;
        const isClockwise = arc.clockwise;

        arc3d = Arc3d.makeArcByStartEndPoints(
          { x: center.x, y: center.y, z: center.z },
          radius,
          Vector3.Z(),
          startPoint,
          endPoint,
          !isClockwise
        );
      }

      arc3d.userData = { sketchCom: curve };
      return arc3d;
    }

    Logger.console.assert(false, 'curve2MathCurve found undefined');
  }

  matchCurve(
    mathCurve: Line2d | Arc2d,
    sketchCurves: SketchCurve[],
    tolerance: number = 0.005
  ): SketchLine2d | Circle2d | CircleArc2d | undefined {
    const lines = sketchCurves.filter((curve): curve is SketchLine2d => curve instanceof SketchLine2d);
    const circles = sketchCurves.filter((curve): curve is Circle2d => curve instanceof Circle2d);
    const arcs = sketchCurves.filter((curve): curve is CircleArc2d => curve instanceof CircleArc2d);

    if (mathCurve instanceof Line2d) {
      const startPoint = mathCurve.getStartPt();
      const endPoint = mathCurve.getEndPt();

      if (!startPoint || !endPoint) {
        Logger.console.assert(false, 'calcSketchBrepMp: search point null, please check!');
        return;
      }

      const matchedLines: MatchResult[] = [];

      for (const line of lines) {
        const matchedStarts = line.points.filter(point => 
          point && startPoint.equals(point, tolerance)
        );
        const matchedEnds = line.points.filter(point => 
          point && 
          endPoint.equals(point, tolerance) && 
          (matchedStarts.length !== 1 || point !== matchedStarts[0])
        );

        if (matchedStarts.length > 0 && matchedEnds.length > 0) {
          const line2d = new Line2d(line.start, line.end);
          const distance = MathAlg.CalculateDistance.pointToCurve2d(startPoint, line2d);
          matchedLines.push({
            sketchLine2d: line,
            dist: Math.abs(distance)
          });
        }
      }

      if (matchedLines.length === 0) {
        Logger.console.assert(false, 'calcSketchBrepMp: matchedLines failed, please check!');
        return;
      }

      matchedLines.sort((a, b) => a.dist - b.dist);
      return matchedLines[0].sketchLine2d;
    }

    if (mathCurve instanceof Arc2d) {
      if (mathCurve.isClosed()) {
        for (const circle of circles) {
          const arcCenter = mathCurve.getCenter();
          const arcRadius = mathCurve.getRadius();

          if (arcCenter.equals(circle.center, tolerance) && 
              Math.abs(arcRadius - circle.radius) < this.SketchTolerance) {
            return circle;
          }
        }
      } else {
        for (const arc of arcs) {
          const arcCenter = mathCurve.getCenter();
          const arcRadius = mathCurve.getRadius();
          const isClockwise = !mathCurve.isCCW();

          if (arcCenter.equals(arc.center, tolerance) && 
              Math.abs(arcRadius - arc.radius) < tolerance) {
            if (arc.clockwise === isClockwise &&
                mathCurve.getStartPt().equals(arc.start, tolerance) &&
                mathCurve.getEndPt().equals(arc.end, tolerance)) {
              return arc;
            }

            if (arc.clockwise !== isClockwise &&
                mathCurve.getStartPt().equals(arc.end, tolerance) &&
                mathCurve.getEndPt().equals(arc.start, tolerance)) {
              return arc;
            }
          }
        }
      }
    }
  }
}