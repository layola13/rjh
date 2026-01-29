interface Point2D {
  subtracted(other: Point2D): Point2D;
  normalized(): Point2D;
  multiplied(scalar: number): Point2D;
}

interface Curve2D {
  getStartPt(): Point2D;
  getEndPt(): Point2D;
}

interface ProjectableEntity {
  getProjectedPtBy(point: Point2D): Point2D;
  getMidPt(): Point2D;
}

interface View2D {
  context: any;
}

interface HSAppInstance {
  getActive2DView(): View2D;
}

interface HSAppStatic {
  App: {
    getApp(): HSAppInstance;
  };
  View: {
    SVG: {
      Util: {
        ModelToScreenFactor(context: any): number;
      };
    };
  };
}

declare const HSApp: HSAppStatic;

enum CurveCurvePositionType {
  OVERLAP = 'OVERLAP',
  TOTALLY_OVERLAP = 'TOTALLY_OVERLAP'
}

interface IntersectionResult {
  point: Point2D;
}

interface MathAlgStatic {
  CurveCuvePositonType: typeof CurveCurvePositionType;
  PositionJudge: {
    curveCurveOverlap(curve1: Curve2D, curve2: Curve2D): CurveCurvePositionType | null;
  };
  CalculateIntersect: {
    curve2ds(curve1: Curve2D, curve2: Curve2D): IntersectionResult[];
  };
}

class Vector2 {
  constructor(start: Point2D, end: Point2D) {}
  isParallel(other: Vector2): boolean {
    return false;
  }
}

const MathAlg: MathAlgStatic = {} as MathAlgStatic;

export default class DimensionHelper {
  /**
   * Calculate dimension Y offset with direction
   * @param entity - The projectable entity
   * @param curve - The curve to get midpoint from
   * @param offset - The offset distance
   * @returns The calculated offset vector
   */
  static getDimensionYOffsetWithDirection(
    entity: ProjectableEntity,
    curve: ProjectableEntity,
    offset: number
  ): Point2D {
    const midPoint = curve.getMidPt();
    const projectedPoint = entity.getProjectedPtBy(midPoint);
    const normalizedDirection = midPoint.subtracted(projectedPoint).normalized();
    const activeView = HSApp.App.getApp().getActive2DView();
    const screenOffset = offset / HSApp.View.SVG.Util.ModelToScreenFactor(activeView.context);
    return normalizedDirection.multiplied(screenOffset);
  }

  /**
   * Check if any curves from two arrays overlap
   * @param curves1 - First array of curves
   * @param curves2 - Second array of curves
   * @returns The first overlapping curve from curves2, or undefined
   */
  static curvesCurvesOverlap(curves1: Curve2D[], curves2: Curve2D[]): Curve2D | undefined {
    let overlappingCurve: Curve2D | undefined;
    
    curves1.some((curve1) => {
      return curves2.some((curve2) => {
        const positionType = MathAlg.PositionJudge.curveCurveOverlap(curve1, curve2);
        const hasOverlap = !![
          MathAlg.CurveCuvePositonType.OVERLAP,
          MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
        ].includes(positionType);
        
        if (hasOverlap) {
          overlappingCurve = curve2;
          return true;
        }
        return false;
      });
    });
    
    return overlappingCurve;
  }

  /**
   * Get intersection points between a vector and a curve
   * @param targetCurve - The curve to intersect with
   * @param direction - The direction vector
   * @param referenceCurve - The curve to create direction from
   * @param resultPoints - Array to accumulate intersection points
   * @returns The updated result points array
   */
  static getIntersectPoints(
    targetCurve: Curve2D | null,
    direction: Vector2,
    referenceCurve: Curve2D,
    resultPoints: Point2D[]
  ): Point2D[] {
    if (!targetCurve) {
      return resultPoints;
    }
    
    const referenceVector = new Vector2(referenceCurve.getStartPt(), referenceCurve.getEndPt());
    
    if (!direction.isParallel(referenceVector) && targetCurve) {
      const intersections = MathAlg.CalculateIntersect.curve2ds(referenceCurve, targetCurve);
      if (intersections[0]) {
        resultPoints.push(intersections[0].point);
      }
    }
    
    return resultPoints;
  }
}