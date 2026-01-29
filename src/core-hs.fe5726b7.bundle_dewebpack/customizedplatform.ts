import { CustomizedFeatureModel } from './CustomizedFeatureModel';
import { Entity } from './Entity';

interface Point2D {
  x: number;
  y: number;
}

interface LoopPoints {
  getDiscretePoints(): Point2D[];
}

interface Face {
  id: string;
  outerLoop: LoopPoints;
  innerLoops: LoopPoints[];
}

interface Sketch {
  faces: Face[];
  getExtrusionValue(faceId: string): number;
}

interface FaceData {
  outer: Point2D[];
  holes: Point2D[][];
  height: number;
}

interface Content {
  x: number;
  y: number;
  z: number;
}

type MoveAxis = 'x' | 'y' | 'z' | 'sketch';

export class CustomizedPlatform extends CustomizedFeatureModel {
  protected sketch: Sketch;
  protected z: number;

  constructor(options: unknown) {
    super(options);
  }

  protected _getZOffsetScale(): number {
    return 0;
  }

  onSketchDirty(event: unknown): void {
    super.onSketchDirty(event);
    this.moveAttachedContents('sketch');
  }

  moveAttachedContents(axis: MoveAxis, value?: number): void {
    if (axis === 'z' || axis === 'sketch') {
      const faceDataList: FaceData[] = this.sketch.faces.map((face) => ({
        outer: face.outerLoop.getDiscretePoints(),
        holes: face.innerLoops.map((loop) => loop.getDiscretePoints()),
        height: this.sketch.getExtrusionValue(face.id)
      }));

      this.forEachContent((content: Content) => {
        const point = new HSCore.Util.Math.Vec2(content.x, content.y);
        
        for (const faceData of faceDataList) {
          if (HSCore.Util.Math.isPointInPolygonWithHoles(
            point,
            faceData.outer,
            faceData.holes,
            false
          )) {
            content.z = faceData.height + this.z;
            break;
          }
        }
      });
    } else if (value !== null && value !== undefined) {
      super.moveAttachedContents(axis, value);
    }
  }

  protected forEachContent(callback: (content: Content) => void): void {
    // Implementation inherited from parent class
  }
}

Entity.registerClass(HSConstants.ModelClass.CustomizedPlatform, CustomizedPlatform);