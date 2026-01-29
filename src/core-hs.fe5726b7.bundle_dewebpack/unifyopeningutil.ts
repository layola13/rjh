import { NCustomizedStructure } from './73858';
import { FaceHoleType } from './82625';
import { Wall } from './41464';
import { Interval } from './55256';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Curve {
  getStartPt(): Point3D;
  getEndPt(): Point3D;
  getMidPt(): Point3D;
  getStartTangent(): Vector3D;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
  isPerpendicular(other: Point3D): boolean;
}

interface Surface {
  containsCurve(curve: Curve, tolerance: number): boolean;
}

interface SurfaceObject {
  surface: Surface;
}

interface FaceHole {
  type: FaceHoleType;
  outer: Curve[];
}

interface Entity {
  surfaceObj: SurfaceObject;
  holes: FaceHole[];
  getMaster(): NCustomizedStructure | Wall | unknown;
}

interface Master {
  contents: Record<number, unknown>;
}

interface CorniceCutterInfo {
  cutPath: Curve[];
  replaceSweepCurves: Curve[][] | undefined;
}

const CURVE_TOLERANCE = 1e-4;
const COORDINATE_TOLERANCE = 1e-5;
const UP_VECTOR: Point3D = { x: 0, y: 0, z: 1 };

export const UnifyOpeningUtil = {
  getCorniceCutterInfo(
    entity: Entity,
    contentIndex: number,
    curvesArray: Curve[][]
  ): CorniceCutterInfo {
    const master = entity.getMaster() as Master;
    
    if (
      !(master instanceof NCustomizedStructure || master instanceof Wall) ||
      !master.contents[contentIndex]
    ) {
      return {
        cutPath: [],
        replaceSweepCurves: undefined
      };
    }

    const targetCurve = curvesArray
      .flat()
      .find((curve) => {
        const isContainedInSurface = entity.surfaceObj.surface.containsCurve(
          curve,
          CURVE_TOLERANCE
        );
        const startTangent = curve.getStartTangent();
        const isPerpendicularToUp = startTangent.isPerpendicular(UP_VECTOR);
        
        return isContainedInSurface && isPerpendicularToUp;
      });

    if (!targetCurve) {
      return {
        cutPath: [],
        replaceSweepCurves: undefined
      };
    }

    const midPoint = targetCurve.getMidPt();
    
    const matchingHole = entity.holes.find((hole) => {
      return (
        hole.type === FaceHoleType.OpeningHole &&
        hole.outer.some((outerCurve) => {
          const xCoordinates = [
            outerCurve.getStartPt().x,
            outerCurve.getEndPt().x
          ];
          const yCoordinates = [
            outerCurve.getStartPt().y,
            outerCurve.getEndPt().y
          ];
          
          xCoordinates.sort((a, b) => a - b);
          yCoordinates.sort((a, b) => a - b);
          
          const xInterval = new Interval(xCoordinates[0], xCoordinates[1]);
          const yInterval = new Interval(yCoordinates[0], yCoordinates[1]);
          
          const xMatch =
            xInterval.getLength() > COORDINATE_TOLERANCE &&
            xInterval.containsPoint(midPoint.x);
          const yMatch =
            yInterval.getLength() > COORDINATE_TOLERANCE &&
            yInterval.containsPoint(midPoint.y);
          
          return xMatch || yMatch;
        })
      );
    });

    if (matchingHole) {
      return {
        cutPath: matchingHole.outer,
        replaceSweepCurves: undefined
      };
    }

    return {
      cutPath: [],
      replaceSweepCurves: undefined
    };
  }
};