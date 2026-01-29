import { DiscretePolygon2d } from './DiscretePolygon2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Line2d } from './Line2d';

interface Point2d {
  x: number;
  y: number;
  type?: string;
}

interface Polygon2d {
  outer: Point2d[];
  holes: Point2d[][];
}

interface Loop {
  curves: Curve2d[];
}

interface Region {
  outer: Loop;
  holes: Loop[];
}

interface Background {
  regions: Region[];
  getFirstPolygonOuter(): Point2d[] | null;
}

interface Bound {
  center: Point2d;
  getCenter(): Point2d;
}

interface OuterLoop {
  bound: Bound;
}

declare namespace HSCore.Model {
  class Sketch2d {
    background: Background;
    traverse(callback: (entity: Entity) => void): void;
  }

  class Curve2d {}
  class Face2d {
    outerLoop: OuterLoop;
    isBackground(): boolean;
  }
  class Point2d {
    x: number;
    y: number;
    type?: string;
  }
}

type Entity = HSCore.Model.Curve2d | HSCore.Model.Face2d | HSCore.Model.Point2d;
type Curve2d = HSCore.Model.Curve2d;
type Face2d = HSCore.Model.Face2d;
type Sketch2d = HSCore.Model.Sketch2d;

const POINT_TYPES = {
  endPoint: 'endPoint',
  leftPoint: 'leftPoint',
  rightPoint: 'rightPoint',
  topPoint: 'topPoint',
  bottomPoint: 'bottomPoint',
  arcMidPoint: 'arcMidPoint',
  lineMidPoint: 'lineMidPoint',
  centerPoint: 'centerPoint',
  linePoint: 'linePoint',
  guideLinePoint: 'guideLinePoint',
  parallelToX: 'parallelToX',
  parallelToY: 'parallelToY',
  perpendicularFoot: 'perpendicularFoot',
} as const;

const SNAP_TO_LINE_POINT_TYPES = [
  POINT_TYPES.leftPoint,
  POINT_TYPES.rightPoint,
  POINT_TYPES.topPoint,
  POINT_TYPES.bottomPoint,
  POINT_TYPES.arcMidPoint,
  POINT_TYPES.centerPoint,
  POINT_TYPES.lineMidPoint,
] as const;

/**
 * Utility class for working with 2D sketches
 */
export const Sketch2dUtil = {
  pointTypes: POINT_TYPES,
  snapToLinePointTypes: SNAP_TO_LINE_POINT_TYPES,

  /**
   * Get reference points from a sketch entity
   * @param sketch - The sketch entity to extract reference points from
   * @param excludedEntities - Entities to exclude from processing
   * @returns Array of reference points
   */
  getReferencePoints(sketch: Sketch2d, excludedEntities: Entity[] = []): Point2d[] {
    const curves = new Set<Curve2d>();
    const faces = new Set<Face2d>();
    const points = new Set<Point2d>();

    sketch.traverse((entity: Entity) => {
      if (excludedEntities.includes(entity)) {
        return;
      }

      if (entity instanceof HSCore.Model.Curve2d) {
        curves.add(entity);
      }

      if (entity instanceof HSCore.Model.Face2d && !entity.isBackground()) {
        faces.add(entity);
      }

      if (entity instanceof HSCore.Model.Point2d) {
        entity.type = POINT_TYPES.endPoint;
        points.add(entity);
      }
    });

    for (const curve of curves) {
      if (curve instanceof Circle2d) {
        const leftPoint = curve.leftPoint;
        leftPoint.type = POINT_TYPES.leftPoint;

        const rightPoint = curve.rightPoint;
        rightPoint.type = POINT_TYPES.rightPoint;

        const topPoint = curve.topPoint;
        topPoint.type = POINT_TYPES.topPoint;

        const bottomPoint = curve.bottomPoint;
        bottomPoint.type = POINT_TYPES.bottomPoint;

        points.add(leftPoint);
        points.add(rightPoint);
        points.add(topPoint);
        points.add(bottomPoint);
      }

      if (curve instanceof CircleArc2d) {
        const midPoint = curve.middle;
        midPoint.type = POINT_TYPES.arcMidPoint;
        points.add(midPoint);
      }

      if (curve instanceof Line2d && !curve.isBackground()) {
        const midPoint = curve.middle;
        midPoint.type = POINT_TYPES.lineMidPoint;
        points.add(midPoint);
      }
    }

    for (const face of faces) {
      const centerPoint = this.getFaceCenterPoint(face);
      if (centerPoint) {
        centerPoint.type = POINT_TYPES.centerPoint;
        points.add(centerPoint);
      }
    }

    this.getBackgroundReferencePoints(points, sketch);

    return Array.from(points);
  },

  /**
   * Extract reference points from background geometry
   * @param points - Set to add background reference points to
   * @param sketch - The sketch containing background geometry
   */
  getBackgroundReferencePoints(points: Set<Point2d>, sketch: Entity): void {
    if (!(sketch instanceof HSCore.Model.Sketch2d)) {
      return;
    }

    const outerPolygon = sketch.background.getFirstPolygonOuter();
    if (!outerPolygon || outerPolygon.length < 3) {
      return;
    }

    const bound = DiscretePolygon2d.getBound([{
      outer: outerPolygon,
      holes: [],
    }]);

    points.add({
      x: bound.center.x,
      y: bound.center.y,
      type: POINT_TYPES.centerPoint,
    });

    let allCurves: Curve2d[] = [];
    sketch.background.regions.forEach((region: Region) => {
      allCurves = allCurves.concat(region.outer.curves);
      region.holes.forEach((hole: Loop) => {
        allCurves = allCurves.concat(hole.curves);
      });
    });

    allCurves.forEach((curve: any) => {
      points.add({
        x: (curve.start.x + curve.end.x) / 2,
        y: (curve.start.y + curve.end.y) / 2,
        type: POINT_TYPES.lineMidPoint,
      });
    });
  },

  /**
   * Get the center point of a face
   * @param face - The face to get the center point from
   * @returns The center point or undefined
   */
  getFaceCenterPoint(face: Face2d): Point2d | undefined {
    if (face instanceof HSCore.Model.Face2d) {
      return face.outerLoop.bound.getCenter();
    }
    return undefined;
  },
};