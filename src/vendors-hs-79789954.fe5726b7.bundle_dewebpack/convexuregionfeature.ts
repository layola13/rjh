import { ShapeType, makeCurvesClosed } from './ShapeTypes';
import { Box2, Loop, Line2d, MathAlg } from './Geometry';
import { HSCore } from './HSCore';
import { Feature } from './Feature';
import { RegionUtil } from './RegionUtil';

interface Curve {
  clone(): Curve;
  getMidPt(): Point;
  getStartPt(): Point;
  getEndPt(): Point;
  getMidTangent(): Vector;
}

interface Vector {
  angleTo(other: Vector): number;
}

interface Point {
  x: number;
  y: number;
}

interface Polygon {
  curves: Curve[];
  outerLoop: Loop;
}

interface HintBox {
  box: Box2;
  marginedBox: Box2;
}

interface FloorContext {
  hintBoxes: HintBox[];
}

interface MatcherInput {
  curves: Curve[];
}

const HALF_PI = 0.5 * Math.PI;
const THREE_HALVES_PI = 1.5 * Math.PI;
const DEFAULT_TOLERANCE = 0.001;
const CONTAINMENT_THRESHOLD = 0.99;
const PARTIAL_CONTAINMENT_THRESHOLD = 0.85;

export class ConvexURegionFeature extends Feature {
  type: ShapeType = ShapeType.ConvexURegion;
  color: string = "#32ff10";
  cutOperation: string = "different";
  
  a: Curve;
  b: Curve;
  c: Curve;
  prevConnectCurve: Curve;
  nextConnectCurve: Curve;

  static pattern: string[] = ["R", "L", "L", "R"];

  constructor(floorContext: FloorContext, polygon: Polygon, additionalData: unknown) {
    super(floorContext, polygon, additionalData);
    
    this.a = polygon.curves[0];
    this.b = polygon.curves[1];
    this.c = polygon.curves[2];
    this.prevConnectCurve = polygon.curves[3];
    this.nextConnectCurve = polygon.curves[4];
    
    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  static matcher(input: MatcherInput, context: FloorContext): Curve[] {
    const curves = input.curves;
    if (curves.length <= this.pattern.length) {
      return [];
    }

    const angles: number[] = [];
    for (let i = 0; i < curves.length; i++) {
      const currentCurve = curves[i];
      const nextCurve = curves[(i + 1) % curves.length];
      angles[i] = currentCurve.getMidTangent().angleTo(nextCurve.getMidTangent());
    }

    const angleThreshold = HALF_PI;
    
    for (let startIndex = 0; startIndex < angles.length; startIndex++) {
      let matchCount = 0;
      const patternLength = this.pattern.length;
      
      for (let patternIndex = 0; patternIndex < patternLength; patternIndex++) {
        const angle = angles[(startIndex + patternIndex) % angles.length];
        const patternChar = this.pattern[patternIndex];
        
        const isLeftTurn = patternChar === "L" && angle < Math.PI && Math.abs(angle - HALF_PI) < angleThreshold;
        const isRightTurn = patternChar === "R" && angle > Math.PI && Math.abs(angle - THREE_HALVES_PI) < angleThreshold;
        const isEitherTurn = patternChar === "LR" && (Math.abs(angle - HALF_PI) <= angleThreshold || Math.abs(angle - THREE_HALVES_PI) <= angleThreshold);
        
        if (!(isLeftTurn || isRightTurn || isEitherTurn)) {
          break;
        }
        matchCount++;
      }
      
      if (matchCount !== this.pattern.length) {
        continue;
      }

      const matchedCurves: Curve[] = [];
      for (let i = 0; i < this.pattern.length - 1; i++) {
        matchedCurves.push(curves[(startIndex + 1 + i) % curves.length]);
      }
      
      if (this.postCheck(input, matchedCurves, context)) {
        matchedCurves.push(curves[startIndex % curves.length]);
        matchedCurves.push(curves[(startIndex + this.pattern.length) % curves.length]);
        return matchedCurves;
      }
    }
    
    return [];
  }

  static postCheck(input: MatcherInput, curves: Curve[], context: FloorContext): boolean {
    const boundingBox = new Box2(curves.map(curve => curve.getStartPt()));
    return context.hintBoxes.some(hintBox => 
      RegionUtil.boxContainsBox(boundingBox, hintBox.box)
    );
  }

  private _makeLoopClosed(): void {
    const mainCurves = [this.a, this.b, this.c];
    const closedMainCurves = [new Loop(makeCurvesClosed(mainCurves)).getAllCurves()];
    
    const connectBox = new Box2([
      this.prevConnectCurve.getStartPt(),
      this.prevConnectCurve.getEndPt(),
      this.nextConnectCurve.getStartPt(),
      this.nextConnectCurve.getEndPt()
    ]);
    
    const unionBox = this.floorContext.hintBoxes.reduce(
      (acc, hintBox) => acc.union(hintBox.marginedBox),
      this.floorContext.hintBoxes[0].marginedBox
    );
    
    const nearestCorner = unionBox.getCornerPts()
      .map(point => ({
        point,
        distance: connectBox.getSquareDistanceTo(point)
      }))
      .sort((a, b) => a.distance - b.distance)[0].point;
    
    connectBox.expandByPoint(nearestCorner);
    
    const rectangleCurves = [Loop.createByRectangle(connectBox.min, connectBox.max).getAllCurves()];
    const differenceResult = HSCore.Util.TgWall.PTInstance().different(closedMainCurves, rectangleCurves);
    
    this.selfPolygon.outerLoop = new Loop(differenceResult[0]?.[0]);
  }
}

export class ConvexRightHalfURegionFeature extends ConvexURegionFeature {
  static override type: ShapeType = ShapeType.ConvexRightHalfURegion;
  static override pattern: string[] = ["R", "L", "L", "L"];
  override color: string = "#75c300";
}

export class ConvexLeftHalfURegionFeature extends ConvexURegionFeature {
  static override type: ShapeType = ShapeType.ConvexLeftHalfURegion;
  static override pattern: string[] = ["L", "L", "L", "L", "R"];
  override color: string = "#253d00";
}

export class ConvexSquareRegionFeature extends ConvexURegionFeature {
  static override type: ShapeType = ShapeType.ConvexSquareRegion;
  static override pattern: string[] = ["L", "L", "L", "L"];
  override color: string = "#75c300";
}

function sortCurvesByProximity(
  referencePoint: Point,
  connectedCurves: Curve[],
  remainingCurves: Curve[],
  tolerance: number = DEFAULT_TOLERANCE
): Curve[] {
  const connected: Curve[] = [];
  const unconnected: Curve[] = [];
  
  remainingCurves.forEach(curve => {
    if (RegionUtil.isCurveConnectedToCurves(curve, connectedCurves, tolerance)) {
      connected.push(curve);
    } else {
      unconnected.push(curve);
    }
  });
  
  if (connected.length) {
    connected.sort((a, b) => 
      referencePoint.getSquareDistanceTo(a.getMidPt()) - 
      referencePoint.getSquareDistanceTo(b.getMidPt())
    );
  } else {
    connected.push(null as unknown as Curve);
  }
  
  return [...connected, ...unconnected];
}

export class ExpandRegionFeature extends Feature {
  type: ShapeType = ShapeType.ExpandRegion;
  color: string = "#10fff7";
  cutOperation: string = "different";

  constructor(floorContext: FloorContext, polygon: Polygon, additionalData: unknown) {
    super(floorContext, polygon, additionalData);
    
    if (!this.selfPolygon.outerLoop.isClosed()) {
      this._makeLoopClosed();
    }
  }

  static matcher(input: MatcherInput, context: FloorContext): Curve[] {
    const clonedCurves = input.curves.map(curve => curve.clone());
    const firstBox = context.hintBoxes[0].box.clone();
    const unionBox = context.hintBoxes.reduce(
      (acc, hintBox) => acc.union(hintBox.box),
      firstBox
    );
    
    clonedCurves.sort((a, b) => 
      unionBox.getSquareDistanceTo(a.getMidPt()) - 
      unionBox.getSquareDistanceTo(b.getMidPt())
    );

    let [currentCurve, ...remainingCurves] = clonedCurves;
    const selectedCurves: Curve[] = [currentCurve];
    
    let containsBox = RegionUtil.loopContainsBox(
      new Loop(makeCurvesClosed(RegionUtil.sortCurvesByConnection(selectedCurves))),
      unionBox,
      CONTAINMENT_THRESHOLD
    );
    
    while (currentCurve && !containsBox && !(selectedCurves.length > clonedCurves.length - 1)) {
      [currentCurve, ...remainingCurves] = sortCurvesByProximity(unionBox, selectedCurves, remainingCurves);
      
      if (currentCurve) {
        selectedCurves.push(currentCurve);
      }
      
      containsBox = RegionUtil.loopContainsBox(
        new Loop(makeCurvesClosed(RegionUtil.sortCurvesByConnection(selectedCurves))),
        unionBox,
        CONTAINMENT_THRESHOLD
      );
    }
    
    const resultLoop = new Loop(makeCurvesClosed(RegionUtil.sortCurvesByConnection(selectedCurves)));
    
    return this.postCheck(input, selectedCurves, context) && resultLoop.getAllCurves().length 
      ? selectedCurves 
      : [];
  }

  static postCheck(input: MatcherInput, curves: Curve[], context: FloorContext): boolean {
    const boundingBox = RegionUtil.curvesToBox(curves);
    return context.hintBoxes.some(hintBox => 
      RegionUtil.boxContainsBox(boundingBox, hintBox.box, PARTIAL_CONTAINMENT_THRESHOLD)
    );
  }

  private _makeLoopClosed(): void {
    this.selfPolygon.curves = RegionUtil.sortCurvesByConnection(this.selfPolygon.curves);
    
    const closedCurves = new Loop(makeCurvesClosed(this.selfPolygon.curves)).getAllCurves();
    const firstMarginedBox = this.floorContext.hintBoxes[0].marginedBox.clone();
    const unionMarginedBox = this.floorContext.hintBoxes.reduce(
      (acc, hintBox) => acc.union(hintBox.marginedBox),
      firstMarginedBox
    );
    
    const cornerPoints = [...unionMarginedBox.getCornerPts()];
    const processedCurves = new Set<Curve>();
    
    const centerLine = new Line2d(
      this.fromPolygon.outerLoop.getCentroidPoint(),
      unionMarginedBox.getCenter()
    ).extend(100);
    
    const alignedPoints = RegionUtil.getSameTendPts(centerLine, cornerPoints);
    const projectionPoints: Point[] = [];
    
    for (const point of alignedPoints) {
      const [nearestCurve, projectionPoint, _distance] = 
        RegionUtil.getNearestCurveAndProjectionPt(closedCurves, point);
      processedCurves.add(nearestCurve);
      projectionPoints.push(projectionPoint);
    }
    
    const intersectingCurves = closedCurves.filter(curve => 
      MathAlg.PositionJudge.curveToCurve(centerLine, curve) === MathAlg.CurveCuvePositonType.INTERSECT_IN &&
      !processedCurves.has(curve) &&
      RegionUtil.isCurveConnectedToCurves(curve, Array.from(processedCurves))
    );
    
    const allRelevantCurves = [...intersectingCurves, ...Array.from(processedCurves)];
    RegionUtil.getCurvesJoints(allRelevantCurves).forEach(joint => projectionPoints.push(joint));
    
    cornerPoints
      .filter(point => !alignedPoints.includes(point))
      .forEach(point => projectionPoints.push(point));
    
    intersectingCurves.forEach(curve => 
      RegionUtil.mergeCurveIntoPtSet(projectionPoints, curve)
    );
    
    const hullPoints = RegionUtil.convexHull(projectionPoints);
    const resultLoop = new Loop(hullPoints);
    
    if (!resultLoop.isAnticlockwise()) {
      resultLoop.reverse();
    }
    
    this.selfPolygon.outerLoop = resultLoop;
  }
}