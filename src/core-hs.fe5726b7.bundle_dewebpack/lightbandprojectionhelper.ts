import { MathAlg, Line2d, Arc2d, Curve2d } from './math-alg';
import { Logger } from './logger';

interface Point2D {
  x: number;
  y: number;
}

interface LineSegment2D {
  startPoint: Point2D;
  endPoint: Point2D;
}

interface ProjectionResult {
  paths: LineSegment2D[];
  realPaths: Curve2d[];
  distance: number;
  perimeter: number;
}

interface SweepPath {
  getLength(): number;
  getStartPt(): Point2D;
  getEndPt(): Point2D;
}

interface ProjectionPlane {
  getCurve2d(path: SweepPath): Curve2d;
  distanceToPoint(point: Point2D): number;
}

interface SweepPathProvider {
  getSweepPath3D(): SweepPath[];
}

const OFFSET_DISTANCE = -0.01;
const INITIAL_DISTANCE = 1000000;

/**
 * Helper class for projecting light band geometry onto 2D planes
 */
export class LightBandProjectionHelper {
  private static _instance: LightBandProjectionHelper;

  /**
   * Export 2D projection of sweep paths
   * @param sweepPathProvider - Object containing 3D sweep paths
   * @param projectionPlane - Plane to project onto
   * @returns Projection result containing paths, distance, and perimeter
   */
  export2DProjection(
    sweepPathProvider: SweepPathProvider,
    projectionPlane: ProjectionPlane
  ): ProjectionResult {
    let minDistance = INITIAL_DISTANCE;
    let totalPerimeter = 0;
    const lineSegments: LineSegment2D[] = [];
    
    const sweepPaths = sweepPathProvider.getSweepPath3D();
    const projectedCurves = sweepPaths.map((path) => projectionPlane.getCurve2d(path));
    let realPaths: Curve2d[] = [];

    if (!projectedCurves || !projectedCurves.length) {
      return {
        paths: lineSegments,
        realPaths,
        distance: minDistance,
        perimeter: totalPerimeter
      };
    }

    const offsetResult = MathAlg.CalculateOffset.offsetCurve2dList(
      projectedCurves,
      OFFSET_DISTANCE
    );
    const processedCurves = offsetResult.curveList.length === projectedCurves.length
      ? offsetResult.curveList
      : projectedCurves;

    for (let i = 0; i < sweepPaths.length; i++) {
      const sweepPath = sweepPaths[i];
      const processedCurve = processedCurves[i];

      totalPerimeter += sweepPath.getLength();

      if (processedCurve instanceof Line2d) {
        const startPoint3D = sweepPath.getStartPt();
        const endPoint3D = sweepPath.getEndPt();
        const startPoint2D = processedCurve.getStartPt();
        const endPoint2D = processedCurve.getEndPt();

        lineSegments.push({
          startPoint: startPoint2D,
          endPoint: endPoint2D
        });

        const startDistance = projectionPlane.distanceToPoint(startPoint3D);
        const endDistance = projectionPlane.distanceToPoint(endPoint3D);

        if (startDistance < minDistance) {
          minDistance = startDistance;
        }
        if (endDistance < minDistance) {
          minDistance = endDistance;
        }
      } else if (processedCurve instanceof Arc2d) {
        const discretizedPoints = processedCurve.discrete();
        const startPoint3D = sweepPath.getStartPt();
        const endPoint3D = sweepPath.getEndPt();

        for (let j = 0; j < discretizedPoints.length - 1; j++) {
          const currentPoint = discretizedPoints[j];
          const nextPoint = discretizedPoints[j + 1];
          lineSegments.push({
            startPoint: currentPoint,
            endPoint: nextPoint
          });
        }

        const startDistance = projectionPlane.distanceToPoint(startPoint3D);
        const endDistance = projectionPlane.distanceToPoint(endPoint3D);

        if (startDistance < minDistance) {
          minDistance = startDistance;
        }
        if (endDistance < minDistance) {
          minDistance = endDistance;
        }
      } else {
        Logger.console.assert(false, 'unconsidered curve type, please check!');
      }
    }

    realPaths = processedCurves;

    return {
      paths: lineSegments,
      realPaths,
      distance: minDistance,
      perimeter: totalPerimeter
    };
  }

  /**
   * Get singleton instance of LightBandProjectionHelper
   * @returns The singleton instance
   */
  static getInstance(): LightBandProjectionHelper {
    if (!this._instance) {
      this._instance = new LightBandProjectionHelper();
    }
    return this._instance;
  }
}