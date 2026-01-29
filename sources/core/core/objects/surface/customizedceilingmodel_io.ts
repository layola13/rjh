import { CustomizedFeatureModel_IO, CustomizedFeatureModel } from './CustomizedFeatureModel';
import { Entity } from './Entity';

interface SketchFace {
  id: string;
  outerLoop: {
    getDiscretePoints(): HSCore.Util.Math.Vec2[];
  };
  innerLoops: Array<{
    getDiscretePoints(): HSCore.Util.Math.Vec2[];
  }>;
}

interface Sketch {
  getBackgroundOuter(): HSCore.Util.Math.Vec2[];
  faces: SketchFace[];
  getExtrusionValue(faceId: string): number;
}

interface Plane {
  normal: THREE.Vector3;
  negate(): void;
}

interface ContentItem {
  x: number;
  y: number;
  z: number;
  ZSize: number;
}

interface FaceData {
  outer: HSCore.Util.Math.Vec2[];
  holes: HSCore.Util.Math.Vec2[][];
  height: number;
}

type MoveAttachedAxis = 'x' | 'y' | 'z' | 'sketch';

export class CustomizedCeilingModel_IO extends CustomizedFeatureModel_IO {
  static instance(): CustomizedCeilingModel_IO {
    return new CustomizedCeilingModel_IO();
  }
}

export class CustomizedCeilingModel extends CustomizedFeatureModel {
  protected _sketch?: Sketch;
  z: number = 0;
  ZSize: number = 0;
  sketch!: Sketch;

  constructor(id: string = '', data: unknown = undefined) {
    super(id, data);
  }

  protected _getExtrudeDirection(): number {
    return -1;
  }

  protected _getExtrudePlane(height: number): Plane | undefined {
    if (!this._sketch) {
      return undefined;
    }

    const backgroundOuter = this._sketch.getBackgroundOuter();
    const points3d = this._to3dPointArray(backgroundOuter, height);
    const plane = GeLib.PolygonUtils.getPlaneFromPolygon(points3d);

    if (plane && plane.normal.dot(new THREE.Vector3(0, 0, -1)) < 0) {
      plane.negate();
    }

    return plane;
  }

  protected _getExtrudePaths(param1: unknown, param2: unknown): Array<unknown[]> {
    const paths = super._getExtrudePaths(param1, param2);
    
    paths.forEach((path: unknown[]) => {
      path.reverse();
    });

    return paths;
  }

  protected _getUpdatedClockWise(config: { clockwise: boolean }): boolean {
    return !config.clockwise;
  }

  getIO(): CustomizedCeilingModel_IO {
    return CustomizedCeilingModel_IO.instance();
  }

  onSketchDirty(event: unknown): void {
    super.onSketchDirty(event);
    this.moveAttachedContents('sketch');
  }

  moveAttachedContents(axis: MoveAttachedAxis, delta?: number): void {
    if (axis === 'z' || axis === 'sketch') {
      const ceilingZ = this.z + this.ZSize;
      const facesData: FaceData[] = this.sketch.faces.map((face) => ({
        outer: face.outerLoop.getDiscretePoints(),
        holes: face.innerLoops.map((loop) => loop.getDiscretePoints()),
        height: this.sketch.getExtrusionValue(face.id)
      }));

      this.forEachContent((content: ContentItem) => {
        const point = new HSCore.Util.Math.Vec2(content.x, content.y);

        for (const faceData of facesData) {
          if (HSCore.Util.Math.isPointInPolygonWithHoles(point, faceData.outer, faceData.holes, false)) {
            content.z = ceilingZ - faceData.height - content.ZSize;
            break;
          }
        }
      });
    } else if (delta !== undefined) {
      super.moveAttachedContents(axis, delta);
    }
  }

  protected _to3dPointArray(points: HSCore.Util.Math.Vec2[], z: number): THREE.Vector3[] {
    return points.map((p) => new THREE.Vector3(p.x, p.y, z));
  }

  protected forEachContent(callback: (content: ContentItem) => void): void {
    // Implementation delegated to parent class
  }
}

Entity.registerClass(HSConstants.ModelClass.CustomizedCeilingModel, CustomizedCeilingModel);