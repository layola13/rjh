import { Box2, Line2d, MathAlg } from './math-module';
import { HintBox } from './hint-box-module';

interface Point2D {
  x: number;
  y: number;
}

interface Curve {
  getStartPt(): Point2D;
  getEndPt(): Point2D;
  getProjectedPtBy(point: Point2D): Point2D;
  containsPoint(point: Point2D): boolean;
  getMidTangent(): Line2d;
}

interface Loop {
  getAllPoints(): Point2D[];
}

interface Region {
  outerLoop: Loop;
}

interface Group {
  type: string;
  obbBox2: Box2;
}

type HintBoxType = 'Living' | 'Dining';

const EPSILON_DEFAULT = 0.001;
const EPSILON_SMALL = 0.000001;
const CONTAINMENT_SCALE_DEFAULT = 0.85;
const LOOP_CONTAINMENT_SCALE_DEFAULT = 0.99;
const HALF_PI = 0.5 * Math.PI;

/**
 * Utility class for region-related geometric operations
 */
export class RegionUtil {
  /**
   * Check if a box intersects with a polygon region
   */
  static isBoxInterPolygon(box: Box2, region: Region): boolean {
    return box.intersectsBox(new Box2(region.outerLoop.getAllPoints()));
  }

  /**
   * Check if a box intersects with curves
   */
  static isBoxInterCurves(box: Box2, curves: Curve[]): boolean {
    return box.intersectsBox(new Box2(curves.map(curve => curve.getStartPt())));
  }

  /**
   * Expand a box by a specified amount
   */
  static expandBox(box: Box2, expansion: number): void {
    const { x: width, y: height } = box.getSize();
    const scale = Math.max(
      Math.min((width + expansion) / width, (height + expansion) / height),
      1
    );
    this.scaleBox(box, scale);
  }

  /**
   * Determine hint box type based on group type
   */
  static getHintBoxType(group: Group): HintBoxType {
    const type = group.type;
    return type.startsWith('Sofa') ? 'Living' : 'Dining';
  }

  /**
   * Convert a group to a hint box
   */
  static groupToHintBox(group: Group): HintBox {
    const box = new Box2(group.obbBox2.getAllPoints());
    return new HintBox({
      type: this.getHintBoxType(group),
      box
    });
  }

  /**
   * Scale a box in place
   */
  static scaleBox(box: Box2, scale: number): void {
    const newSize = {
      x: box.getSize().x * scale,
      y: box.getSize().y * scale
    };
    box.setFromCenterAndSize(box.getCenter(), newSize);
  }

  /**
   * Create a scaled clone of a box
   */
  static scaleCloneBox(box: Box2, scale: number): Box2 {
    const newSize = {
      x: box.getSize().x * scale,
      y: box.getSize().y * scale
    };
    return box.clone().setFromCenterAndSize(box.getCenter(), newSize);
  }

  /**
   * Check if one box contains another box with a specified scale factor
   */
  static boxContainsBox(
    outerBox: Box2,
    innerBox: Box2,
    scaleFactor: number = CONTAINMENT_SCALE_DEFAULT
  ): boolean {
    const scaledSize = {
      x: innerBox.getSize().x * scaleFactor,
      y: innerBox.getSize().y * scaleFactor
    };
    return outerBox.containsBox(
      new Box2().setFromCenterAndSize(innerBox.getCenter(), scaledSize)
    );
  }

  /**
   * Check if a loop contains a box with specified scale and epsilon
   */
  static loopContainsBox(
    loop: Loop,
    box: Box2,
    scaleFactor: number = LOOP_CONTAINMENT_SCALE_DEFAULT,
    epsilon: number = EPSILON_SMALL
  ): boolean {
    return this.scaleCloneBox(box, scaleFactor)
      .getCornerPts()
      .every(
        point =>
          MathAlg.PositionJudge.ptToLoop(point, loop, epsilon).type !==
          MathAlg.PtLoopPositonType.OUT
      );
  }

  /**
   * Get joint points where curves connect
   */
  static getCurvesJoints(curves: Curve[], epsilon: number = EPSILON_DEFAULT): Point2D[] {
    const joints: Point2D[] = [];
    for (const curve of curves) {
      const endPoint = curve.getEndPt();
      if (curves.some(c => c.getStartPt().equals(endPoint, epsilon))) {
        joints.push(endPoint);
      }
    }
    return joints;
  }

  /**
   * Find the nearest curve to a point and its projection
   * @returns Tuple of [curve, projectionPoint, distance]
   */
  static getNearestCurveAndProjectionPt(
    curves: Curve[],
    point: Point2D
  ): [Curve, Point2D, number] {
    return curves
      .map(curve => {
        const projectedPt = curve.getProjectedPtBy(point);
        let distance = point.distanceTo(projectedPt);
        if (!curve.containsPoint(projectedPt)) {
          distance = Infinity;
        }
        return [curve, projectedPt, distance] as [Curve, Point2D, number];
      })
      .sort((a, b) => a[2] - b[2])[0];
  }

  /**
   * Merge curve endpoints into a point set
   */
  static mergeCurveIntoPtSet(pointSet: Point2D[], curve: Curve): void {
    let startPt = curve.getStartPt();
    if (!pointSet.some(pt => pt.equals(startPt))) {
      pointSet.push(startPt);
    }

    let endPt = curve.getEndPt();
    if (!pointSet.some(pt => pt.equals(endPt))) {
      pointSet.push(endPt);
    }
  }

  /**
   * Create a bounding box from curves
   */
  static curvesToBox(curves: Curve[]): Box2 {
    return new Box2(
      curves
        .map(curve => [curve.getStartPt(), curve.getEndPt()])
        .reduce((acc, points) => [...acc, ...points], [])
    );
  }

  /**
   * Sort curves by their connection order
   */
  static sortCurvesByConnection(curves: Curve[]): Curve[] {
    if (curves.length < 2) return curves;

    const sortedCurves: Curve[] = [];
    let startCurve = curves.find(
      curve =>
        !curves.some(c => c.getEndPt().equals(curve.getStartPt()))
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
   * Check if a curve is connected to any curve in a set
   */
  static isCurveConnectedToCurves(
    curve: Curve,
    curves: Curve[],
    epsilon: number = EPSILON_DEFAULT
  ): boolean {
    return curves.some(
      c =>
        c.getStartPt().equals(curve.getStartPt(), epsilon) ||
        c.getStartPt().equals(curve.getEndPt(), epsilon) ||
        c.getEndPt().equals(curve.getStartPt(), epsilon) ||
        c.getEndPt().equals(curve.getEndPt(), epsilon)
    );
  }

  /**
   * Get points with similar tangent direction
   */
  static getSameTendPts(curve: Curve, points: Point2D[]): Point2D[] {
    const center = new Box2(points).getCenter();
    const resultPoints: Point2D[] = [];

    for (const point of points) {
      const line = new Line2d(center, point);
      const angle = curve.getMidTangent().angleTo(line.getMidTangent());

      if (angle < Math.PI - HALF_PI || angle > Math.PI + HALF_PI) {
        resultPoints.push(point);
      }
    }

    return resultPoints;
  }

  /**
   * Compute the convex hull of a set of points using Graham scan
   */
  static convexHull(points: Point2D[]): Point2D[] {
    points.sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));

    const totalPoints = points.length;
    const hull: Point2D[] = [];

    for (let i = 0; i < 2 * totalPoints; i++) {
      const index = i < totalPoints ? i : 2 * totalPoints - 1 - i;

      while (
        hull.length >= 2 &&
        this.shouldRemovePoint(hull[hull.length - 2], hull[hull.length - 1], points[index])
      ) {
        hull.pop();
      }

      hull.push(points[index]);
    }

    hull.pop();
    return hull;
  }

  /**
   * Determine if a point should be removed during convex hull construction
   */
  private static shouldRemovePoint(p1: Point2D, p2: Point2D, p3: Point2D): boolean {
    const crossProduct = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    const dotProduct = (p2.x - p1.x) * (p3.x - p1.x) + (p2.y - p1.y) * (p3.y - p1.y);
    return crossProduct < 0 || (crossProduct === 0 && dotProduct <= 0);
  }
}