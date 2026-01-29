export interface Point2D {
  x: number;
  y: number;
}

export interface Curve2D {
  id: string;
  start?: Point2D;
  end?: Point2D;
  bound?: BrepBound;
}

export interface CircleArc2D extends Curve2D {
  center: Point2D;
  clockwise: boolean;
}

export interface Line2D extends Curve2D {}

export interface Circle2D extends Curve2D {
  center: Point2D;
  radius: number;
}

export interface Wire {
  id: string;
  curves: Curve2D[];
  isOuter(): boolean;
}

export interface Face2D {
  BBox: Box2;
  bound: BrepBound;
}

export interface Path {
  outer: Curve2D[];
  holes: Curve2D[][];
}

export interface Matrix3Like {
  toArray(): number[];
}

export class BrepBound {
  left: number = 0;
  top: number = 0;
  width: number = 0;
  height: number = 0;

  appendBound(bound: BrepBound): void {
    // Implementation needed
  }
}

export class Vector2 {
  x: number;
  y: number;

  constructor(point: Point2D);
  constructor(x: number, y: number);
  constructor(pointOrX: Point2D | number, y?: number) {
    if (typeof pointOrX === 'number') {
      this.x = pointOrX;
      this.y = y ?? 0;
    } else {
      this.x = pointOrX.x;
      this.y = pointOrX.y;
    }
  }

  transform(matrix: Matrix3): Vector2 {
    // Implementation needed
    return this;
  }
}

export class Line2d {
  constructor(public start: Vector2, public end: Vector2) {}

  reverse(): this {
    const temp = this.start;
    this.start = this.end;
    this.end = temp;
    return this;
  }

  transform(matrix: Matrix3): void {
    this.start.transform(matrix);
    this.end.transform(matrix);
  }
}

export class Arc2d {
  static makeArcByStartEndAngles(
    center: Point2D,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean
  ): Arc2d {
    return new Arc2d();
  }

  static makeArcByStartEndPoints(
    center: Point2D,
    start: Point2D,
    end: Point2D,
    counterClockwise: boolean
  ): Arc2d {
    return new Arc2d();
  }

  reverse(): this {
    return this;
  }

  transform(matrix: Matrix3): void {
    // Implementation needed
  }
}

export class Box2 {
  min: Vector2 = new Vector2(0, 0);
  max: Vector2 = new Vector2(0, 0);

  setFromPoints(points: Point2D[]): this {
    // Implementation needed
    return this;
  }

  getCenter(): Vector2 {
    return new Vector2(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2
    );
  }

  isValid(): boolean {
    return this.max.x >= this.min.x && this.max.y >= this.min.y;
  }
}

export class Matrix3 {
  elements: number[] = new Array(9).fill(0);

  static makeMirror(center: Vector2, normal: Vector2): Matrix3 {
    return new Matrix3();
  }

  fromArray(array: number[]): this {
    this.elements = [...array];
    return this;
  }
}

export class Logger {
  static console = {
    warn(message: string): void {
      console.warn(message);
    },
    error(message: string): void {
      console.error(message);
    }
  };
}

export class ServiceManager {
  static getMathService(): MathService {
    return new MathService();
  }
}

export class MathService {
  getVectorsFromCurves(curves: Curve2D[]): Vector2[] {
    return [];
  }
}

export function isClockwise(points: Vector2[] | Point2D[]): boolean {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    sum += (next.x - current.x) * (next.y + current.y);
  }
  return sum > 0;
}

export class DataModelConvertor {
  constructor() {}

  static convertPoint2d(point?: Point2D): Point2D {
    return point ? { x: point.x, y: point.y } : { x: 0, y: 0 };
  }

  static convertLine2d(line: Line2D, reverse: boolean): Line2d {
    const start = reverse ? line.end : line.start;
    const end = reverse ? line.start : line.end;
    return new Line2d(
      DataModelConvertor.convertPoint2d(start),
      DataModelConvertor.convertPoint2d(end)
    );
  }

  static convertCircle2d(circle: Circle2D, counterClockwise: boolean): Arc2d {
    const center = DataModelConvertor.convertPoint2d(circle.center);
    return Arc2d.makeArcByStartEndAngles(
      center,
      circle.radius,
      0,
      2 * Math.PI,
      !counterClockwise
    );
  }

  static convertArc2d(arc: CircleArc2D, reverse: boolean): Arc2d {
    const center = DataModelConvertor.convertPoint2d(arc.center);
    const start = DataModelConvertor.convertPoint2d(reverse ? arc.end : arc.start);
    const end = DataModelConvertor.convertPoint2d(reverse ? arc.start : arc.end);
    const clockwise = reverse ? !arc.clockwise : arc.clockwise;
    return Arc2d.makeArcByStartEndPoints(center, start, end, !clockwise);
  }

  static convertWire(wire: Wire): (Line2d | Arc2d)[] {
    const result: (Line2d | Arc2d)[] = [];
    
    const processCurve = (curve: Curve2D, shouldReverse: boolean): void => {
      if (curve.start && curve.end) {
        if (isCircleArc2D(curve)) {
          const arc = DataModelConvertor.convertArc2d(curve, shouldReverse);
          result.push(arc);
        } else if (isLine2D(curve)) {
          const line = DataModelConvertor.convertLine2d(curve, shouldReverse);
          result.push(line);
        } else if (isCircle2D(curve)) {
          Logger.console.warn(`wire ${wire.id} has more than one circle curve!`);
        }
      } else {
        Logger.console.error(`curve ${curve.id} has undefined start or end`);
      }
    };

    const isOuterWire = wire.isOuter();
    const curves = wire.curves;
    const curveCount = curves.length;

    if (curveCount === 1) {
      const curve = curves[0];
      if (isCircle2D(curve)) {
        result.push(DataModelConvertor.convertCircle2d(curve, !isOuterWire));
      } else {
        Logger.console.warn(`wire ${wire.id} has one curve2d but is not circle2d!`);
      }
      return result;
    }

    if (curveCount === 2) {
      const firstCurve = curves[0];
      const secondCurve = curves[1];
      processCurve(
        firstCurve,
        firstCurve.start === secondCurve.start || firstCurve.end === secondCurve.end
      );
      processCurve(secondCurve, false);
    } else {
      for (let currentIndex = 0, previousIndex = curveCount - 1; currentIndex < curveCount; previousIndex = currentIndex++) {
        const previousCurve = curves[previousIndex];
        const currentCurve = curves[currentIndex];
        processCurve(
          previousCurve,
          previousCurve.start === currentCurve.start || previousCurve.start === currentCurve.end
        );
      }
    }

    return result;
  }

  static convertWireArray(wires?: Wire[]): (Line2d | Arc2d)[][] {
    const result: (Line2d | Arc2d)[][] = [];
    if (!wires) return result;
    
    for (let i = 0, length = wires.length; i < length; ++i) {
      result.push(DataModelConvertor.convertWire(wires[i]));
    }
    return result;
  }

  static computeFace2dBBox(faces: Face2D[]): Box2 {
    const box = new Box2();
    const bound = new BrepBound();
    
    faces.forEach(face => bound.appendBound(face.bound));
    
    box.setFromPoints([
      { x: bound.left, y: bound.top },
      { x: bound.left + bound.width, y: bound.top + bound.height }
    ]);
    
    return box;
  }

  static computeSketchToPaveMatrix(faces: Face2D[]): Matrix3 {
    if (faces.length === 0) return new Matrix3();
    
    const bbox = DataModelConvertor.computeFace2dBBox(faces);
    return Matrix3.makeMirror(bbox.getCenter(), new Vector2(1, 0));
  }

  static computePaveToSketchMatrix(face: Face2D): Matrix3 {
    const bbox = face.BBox;
    return bbox.isValid()
      ? Matrix3.makeMirror(bbox.getCenter(), new Vector2(1, 0))
      : new Matrix3();
  }

  static convertPathFromWires(
    outerWire: Wire,
    holeWires: Wire[],
    transformMatrix?: Matrix3
  ): Path {
    const allWires = [outerWire].concat(holeWires);
    const convertedCurves = DataModelConvertor.convertWireArray(allWires);

    convertedCurves.forEach((curves, index) => {
      if (transformMatrix) {
        curves.forEach(curve => curve.transform(transformMatrix));
      }

      const mathService = ServiceManager.getMathService();
      const vectors = mathService.getVectorsFromCurves(curves);
      const isCurvesClockwise = isClockwise(vectors);

      if (allWires[index].isOuter() === isCurvesClockwise) {
        curves.reverse().forEach(curve => curve.reverse());
      }
    });

    return {
      outer: convertedCurves[0],
      holes: convertedCurves.slice(1)
    };
  }

  static convertPathFromPoints(
    outerPoints: Point2D[],
    holePointsArray: Point2D[][],
    transformMatrix?: Matrix3
  ): Path {
    return {
      outer: DataModelConvertor.convertLinesFromPoints(outerPoints, transformMatrix, false),
      holes: holePointsArray.map(points =>
        DataModelConvertor.convertLinesFromPoints(points, transformMatrix, true)
      )
    };
  }

  static convertLinesFromPoints(
    points: Point2D[],
    transformMatrix?: Matrix3,
    isHole: boolean = false
  ): Line2d[] {
    const lines: Line2d[] = [];
    const transformedPoints = transformMatrix
      ? points.map(point => new Vector2(point).transform(transformMatrix))
      : points;
    const pointCount = transformedPoints.length;

    if (isClockwise(transformedPoints) !== isHole) {
      for (let endIndex = pointCount - 1, startIndex = 0; endIndex >= 0; startIndex = endIndex--) {
        const start = new Vector2(transformedPoints[startIndex]);
        const end = new Vector2(transformedPoints[endIndex]);
        lines.push(new Line2d(start, end));
      }
    } else {
      for (let startIndex = pointCount - 1, endIndex = 0; endIndex < pointCount; startIndex = endIndex++) {
        const start = new Vector2(transformedPoints[startIndex]);
        const end = new Vector2(transformedPoints[endIndex]);
        lines.push(new Line2d(start, end));
      }
    }

    return lines;
  }

  static convertMatrix(matrix: Matrix3Like): Matrix3 {
    const array = matrix.toArray();
    return new Matrix3().fromArray(array);
  }
}

function isCircleArc2D(curve: Curve2D): curve is CircleArc2D {
  return 'center' in curve && 'clockwise' in curve;
}

function isLine2D(curve: Curve2D): curve is Line2D {
  return !('center' in curve) && !('radius' in curve);
}

function isCircle2D(curve: Curve2D): curve is Circle2D {
  return 'center' in curve && 'radius' in curve;
}