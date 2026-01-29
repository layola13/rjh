import { CircleArc2d } from './CircleArc2d';
import { Circle2d } from './Circle2d';

interface Point2d {
  x: number;
  y: number;
  parents?: Record<string, unknown>;
  set(x: number, y: number): void;
}

interface Curve2d {
  from?: Point2d;
  to?: Point2d;
  center?: { x: number; y: number };
}

interface Face2d {
  getAllCurves(): Curve2d[];
  getAllPoints(): Point2d[];
}

interface Sketch2d {
  // Add properties as needed
}

export class Sketch2dDecorator {
  private readonly _sketch2d: Sketch2d;

  constructor(sketch2d: Sketch2d) {
    this._sketch2d = sketch2d;
  }

  getFace2dsCurves(faces: Face2d[]): Curve2d[] {
    const curvesSet = new Set<Curve2d>();
    
    faces.forEach((face) => {
      face.getAllCurves().forEach((curve) => {
        curvesSet.add(curve);
      });
    });
    
    return Array.from(curvesSet);
  }

  getFace2dsPoints(faces: Face2d[]): Point2d[] {
    const pointsSet = new Set<Point2d>();
    
    faces.forEach((face) => {
      face.getAllPoints().forEach((point) => {
        pointsSet.add(point);
      });
    });
    
    return Array.from(pointsSet);
  }

  updateFace2dsPosition(faces: Face2d[], deltaX: number, deltaY: number): void {
    const curves = this.getFace2dsCurves(faces);
    const arcsToUpdate: CircleArc2d[] = [];

    for (const curve of curves.slice()) {
      if (curve.from?.parents) {
        for (const parent of Object.values(curve.from.parents).slice()) {
          if (parent instanceof CircleArc2d) {
            parent.calSagitta();
            arcsToUpdate.push(parent);
          }
        }
      }

      if (curve.to?.parents) {
        for (const parent of Object.values(curve.to.parents).slice()) {
          if (parent instanceof CircleArc2d) {
            parent.calSagitta();
            arcsToUpdate.push(parent);
          }
        }
      }
    }

    this.getFace2dsPoints(faces).forEach((point) => {
      point.set(point.x + deltaX, point.y + deltaY);
    });

    curves.forEach((curve) => {
      if (curve instanceof Circle2d || curve instanceof CircleArc2d) {
        if (curve.center) {
          curve.center = {
            x: curve.center.x + deltaX,
            y: curve.center.y + deltaY
          };
        }
      }
    });

    for (const arc of arcsToUpdate) {
      arc.updateCenterRadiusInfo();
    }
  }
}