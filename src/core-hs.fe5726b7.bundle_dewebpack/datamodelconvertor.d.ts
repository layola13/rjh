/**
 * Converts data model objects between different geometric representations.
 * Handles conversion of 2D geometric primitives (points, lines, circles, arcs)
 * and complex shapes (wires, paths) for CAD/modeling applications.
 * 
 * @module DataModelConvertor
 */

import { Line2d as SourceLine2d } from './43297';
import { Circle2d } from './96415';
import { CircleArc2d } from './34927';
import { isClockwise } from './59145';
import { BrepBound } from './51976';
import { ServiceManager } from './20198';
import { Line2d, Arc2d, Box2, Matrix3, Vector2 } from './55256';
import { Logger } from './41861';

/**
 * 2D point coordinate structure
 */
interface Point2d {
  x: number;
  y: number;
}

/**
 * Curve with start and end points
 */
interface Curve2d {
  id: string;
  start?: Point2d;
  end?: Point2d;
}

/**
 * Line segment with start and end points
 */
interface LineSegment extends Curve2d {
  start: Point2d;
  end: Point2d;
}

/**
 * Circle definition with center and radius
 */
interface Circle {
  center: Point2d;
  radius: number;
}

/**
 * Circular arc definition
 */
interface Arc {
  id: string;
  center: Point2d;
  start: Point2d;
  end: Point2d;
  clockwise: boolean;
}

/**
 * Wire composed of multiple curves
 */
interface Wire {
  id: string;
  curves: Curve2d[];
  isOuter(): boolean;
}

/**
 * Bounding box interface
 */
interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
  isValid(): boolean;
}

/**
 * Face with bounding box
 */
interface Face2d {
  bound: unknown;
  BBox: BoundingBox;
}

/**
 * Path structure with outer boundary and holes
 */
interface Path2d {
  outer: (Line2d | Arc2d)[];
  holes: (Line2d | Arc2d)[][];
}

/**
 * Matrix with array conversion
 */
interface SourceMatrix {
  toArray(): number[];
}

/**
 * Converts geometric data models between different representations.
 * Provides static methods for converting 2D primitives, wires, and paths.
 */
export class DataModelConvertor {
  constructor() {}

  /**
   * Converts a point to standard {x, y} format.
   * Returns origin if input is undefined.
   */
  static convertPoint2d(point?: Point2d): Point2d {
    return point
      ? { x: point.x, y: point.y }
      : { x: 0, y: 0 };
  }

  /**
   * Converts a line segment, optionally reversing direction.
   * 
   * @param line - Source line segment
   * @param reverse - If true, swaps start and end points
   */
  static convertLine2d(line: LineSegment, reverse: boolean): Line2d {
    const startPoint = reverse ? line.end : line.start;
    const endPoint = reverse ? line.start : line.end;
    return new Line2d(
      this.convertPoint2d(startPoint),
      this.convertPoint2d(endPoint)
    );
  }

  /**
   * Converts a circle to a full arc (0 to 2π).
   * 
   * @param circle - Circle definition
   * @param counterClockwise - Direction flag (negated for arc creation)
   */
  static convertCircle2d(circle: Circle, counterClockwise: boolean): Arc2d {
    const center = this.convertPoint2d(circle.center);
    return Arc2d.makeArcByStartEndAngles(
      center,
      circle.radius,
      0,
      2 * Math.PI,
      !counterClockwise
    );
  }

  /**
   * Converts an arc segment, optionally reversing direction.
   * 
   * @param arc - Arc definition
   * @param reverse - If true, swaps start and end points
   */
  static convertArc2d(arc: Arc, reverse: boolean): Arc2d {
    const center = this.convertPoint2d(arc.center);
    const startPoint = this.convertPoint2d(reverse ? arc.end : arc.start);
    const endPoint = this.convertPoint2d(reverse ? arc.start : arc.end);
    const clockwise = reverse ? !arc.clockwise : arc.clockwise;
    return Arc2d.makeArcByStartEndPoints(center, startPoint, endPoint, !clockwise);
  }

  /**
   * Converts a wire (closed or open curve chain) to an array of geometric primitives.
   * Handles proper orientation and connectivity of curve segments.
   * 
   * @param wire - Wire containing curves
   * @returns Array of Line2d and Arc2d objects
   */
  static convertWire(wire: Wire): (Line2d | Arc2d)[] {
    const result: (Line2d | Arc2d)[] = [];
    const isOuterWire = wire.isOuter();
    const curves = wire.curves;
    const curveCount = curves.length;

    /**
     * Process a single curve, determining if it needs reversal
     */
    const processCurve = (curve: Curve2d, shouldReverse: boolean): void => {
      if (curve.start && curve.end) {
        if (curve instanceof CircleArc2d) {
          const convertedArc = this.convertArc2d(curve as unknown as Arc, shouldReverse);
          result.push(convertedArc);
        } else if (curve instanceof SourceLine2d) {
          const convertedLine = this.convertLine2d(curve as unknown as LineSegment, shouldReverse);
          result.push(convertedLine);
        } else if (curve instanceof Circle2d) {
          Logger.console.warn(`wire ${wire.id} has more than one circle curve!`);
        }
      } else {
        Logger.console.error(`curve ${curve.id} has undefined start or end`);
      }
    };

    // Single curve - must be a circle
    if (curveCount === 1) {
      const curve = curves[0];
      if (curve instanceof Circle2d) {
        result.push(this.convertCircle2d(curve as unknown as Circle, !isOuterWire));
      } else {
        Logger.console.warn(`wire ${wire.id} has one curve2d but is not circle2d!`);
      }
      return result;
    }

    // Two curves - check connectivity
    if (curveCount === 2) {
      const firstCurve = curves[0];
      const secondCurve = curves[1];
      const shouldReverseFirst =
        firstCurve.start === secondCurve.start || firstCurve.end === secondCurve.end;
      processCurve(firstCurve, shouldReverseFirst);
      processCurve(secondCurve, false);
    } else {
      // Multiple curves - check connectivity between adjacent pairs
      for (let current = 0, previous = curveCount - 1; current < curveCount; previous = current++) {
        const previousCurve = curves[previous];
        const currentCurve = curves[current];
        const shouldReverse =
          previousCurve.start === currentCurve.start || previousCurve.start === currentCurve.end;
        processCurve(previousCurve, shouldReverse);
      }
    }

    return result;
  }

  /**
   * Converts an array of wires to arrays of geometric primitives.
   */
  static convertWireArray(wires?: Wire[]): (Line2d | Arc2d)[][] {
    const result: (Line2d | Arc2d)[][] = [];
    if (!wires) return result;

    for (let i = 0, length = wires.length; i < length; ++i) {
      result.push(this.convertWire(wires[i]));
    }
    return result;
  }

  /**
   * Computes the bounding box for an array of 2D faces.
   */
  static computeFace2dBBox(faces: Face2d[]): Box2 {
    const boundingBox = new Box2();
    const brepBound = new BrepBound();

    faces.forEach(face => brepBound.appendBound(face.bound));

    boundingBox.setFromPoints([
      { x: brepBound.left, y: brepBound.top },
      { x: brepBound.left + brepBound.width, y: brepBound.top + brepBound.height }
    ]);

    return boundingBox;
  }

  /**
   * Computes transformation matrix from sketch space to pave space.
   * Creates a mirror transformation around the center of the bounding box.
   */
  static computeSketchToPaveMatrix(faces: Face2d[]): Matrix3 {
    if (faces.length === 0) return new Matrix3();

    const boundingBox = this.computeFace2dBBox(faces);
    return Matrix3.makeMirror(boundingBox.getCenter(), new Vector2(1, 0));
  }

  /**
   * Computes transformation matrix from pave space to sketch space.
   * Creates a mirror transformation if bounding box is valid.
   */
  static computePaveToSketchMatrix(face: Face2d): Matrix3 {
    const boundingBox = face.BBox;
    return boundingBox.isValid()
      ? Matrix3.makeMirror(boundingBox.getCenter(), new Vector2(1, 0))
      : new Matrix3();
  }

  /**
   * Converts wires to a path structure with outer boundary and holes.
   * Ensures correct orientation (outer=CCW, holes=CW).
   * 
   * @param outerWire - Outer boundary wire
   * @param holeWires - Array of hole wires
   * @param transform - Optional transformation matrix
   */
  static convertPathFromWires(
    outerWire: Wire,
    holeWires: Wire[],
    transform?: Matrix3
  ): Path2d {
    const allWires = [outerWire].concat(holeWires);
    const convertedCurves = this.convertWireArray(allWires);

    convertedCurves.forEach((curves, index) => {
      if (transform) {
        curves.forEach(curve => curve.transform(transform));
      }

      const vectors = ServiceManager.getMathService().getVectorsFromCurves(curves);
      const isCurvesClockwise = isClockwise(vectors);
      const shouldBeClockwise = allWires[index].isOuter();

      if (shouldBeClockwise === isCurvesClockwise) {
        curves.reverse().forEach(curve => curve.reverse());
      }
    });

    return {
      outer: convertedCurves[0],
      holes: convertedCurves.slice(1)
    };
  }

  /**
   * Converts point arrays to a path structure with outer boundary and holes.
   * 
   * @param outerPoints - Outer boundary points
   * @param holePoints - Arrays of hole points
   * @param transform - Optional transformation matrix
   */
  static convertPathFromPoints(
    outerPoints: Point2d[],
    holePoints: Point2d[][],
    transform?: Matrix3
  ): Path2d {
    return {
      outer: this.convertLinesFromPoints(outerPoints, transform, false),
      holes: holePoints.map(points => this.convertLinesFromPoints(points, transform, true))
    };
  }

  /**
   * Converts an array of points to line segments.
   * Handles proper winding order based on isHole flag.
   * 
   * @param points - Array of points
   * @param transform - Optional transformation matrix
   * @param isHole - If true, ensures clockwise winding
   */
  static convertLinesFromPoints(
    points: Point2d[],
    transform?: Matrix3,
    isHole = false
  ): Line2d[] {
    const lines: Line2d[] = [];
    const transformedPoints = transform
      ? points.map(point => new Vector2(point).transform(transform))
      : points;
    const pointCount = transformedPoints.length;

    const pointsAreClockwise = isClockwise(transformedPoints);

    if (pointsAreClockwise !== isHole) {
      // Reverse iteration for counter-clockwise
      for (let current = pointCount - 1, next = 0; current >= 0; next = current--) {
        const startPoint = new Vector2(transformedPoints[next]);
        const endPoint = new Vector2(transformedPoints[current]);
        lines.push(new Line2d(startPoint, endPoint));
      }
    } else {
      // Forward iteration for clockwise
      for (let previous = pointCount - 1, current = 0; current < pointCount; previous = current++) {
        const startPoint = new Vector2(transformedPoints[previous]);
        const endPoint = new Vector2(transformedPoints[current]);
        lines.push(new Line2d(startPoint, endPoint));
      }
    }

    return lines;
  }

  /**
   * Converts a matrix from source format to Matrix3.
   * Extracts array representation and reconstructs matrix.
   */
  static convertMatrix(sourceMatrix: SourceMatrix): Matrix3 {
    const matrixArray = sourceMatrix.toArray();
    return new Matrix3().fromArray(matrixArray);
  }
}