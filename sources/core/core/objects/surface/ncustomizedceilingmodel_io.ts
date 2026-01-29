import { NCustomizedSketchModel_IO, NCustomizedSketchModel } from './NCustomizedSketchModel';
import { Entity } from './Entity';
import { Vector3, Matrix4 } from './Math';
import { MaterialUtil } from './MaterialUtil';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface FaceInfo {
  outer: HSCore.Util.Math.Vec2[];
  holes: HSCore.Util.Math.Vec2[][];
  height: number;
}

interface SketchBoundInfo {
  sketchBound: [number, number, number, number] | null;
  maxValue: number;
}

type DumpCallback = (dumpedData: unknown, model: unknown) => void;

export class NCustomizedCeilingModel_IO extends NCustomizedSketchModel_IO {
  public dump(
    model: unknown,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const dumpedData = super.dump(model, undefined, includeMetadata, options);
    
    if (callback) {
      callback(dumpedData, model);
    }
    
    return dumpedData;
  }

  public load(
    data: unknown,
    target: unknown,
    options: LoadOptions = {}
  ): void {
    super.load(data, target, options);
  }

  public static instance(): NCustomizedCeilingModel_IO {
    return new NCustomizedCeilingModel_IO();
  }
}

export class NCustomizedCeilingModel extends NCustomizedSketchModel {
  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
  }

  protected onSketchDirty(sketch: unknown): void {
    super.onSketchDirty(sketch);
    this.moveAttachedContents("sketch");
  }

  protected moveAttachedContents(propertyName: string, offset?: unknown): void {
    if (propertyName === "z" || propertyName === "sketch") {
      const ceilingZ = this.z + this.ZSize;
      
      const faceInfos: FaceInfo[] = this.sketch.faces.map((face: any) => ({
        outer: face.outerLoop.getDiscretePoints(),
        holes: face.innerLoops.map((loop: any) => loop.getDiscretePoints()),
        height: this.sketch.getExtrusionValue(face.id)
      }));

      this.forEachContent((content: any) => {
        const contentPosition = new HSCore.Util.Math.Vec2(content.x, content.y);
        
        for (const faceInfo of faceInfos) {
          if (HSCore.Util.Math.isPointInPolygonWithHoles(
            contentPosition,
            faceInfo.outer,
            faceInfo.holes,
            false
          )) {
            content.z = ceilingZ - faceInfo.height - content.ZSize;
            break;
          }
        }
      });
    } else if (offset != null) {
      super.moveAttachedContents(propertyName, offset);
    }
  }

  protected initializeContentPositionBySketch(): void {
    if (!this._sketch) {
      return;
    }

    const boundInfo = this.getSketchFacesBoundInfo();
    if (!boundInfo) {
      return;
    }

    const sketchBound = boundInfo.sketchBound;
    if (!sketchBound) {
      return;
    }

    const transformMatrix = this.getSketchTransformMatrix();
    
    let minCorner = new Vector3(sketchBound[0], sketchBound[1], 0);
    minCorner = minCorner.transform(transformMatrix);

    const maxExtrusionHeight = boundInfo.maxValue;
    
    let maxCorner = new Vector3(
      sketchBound[0] + sketchBound[2],
      sketchBound[1] + sketchBound[3],
      -maxExtrusionHeight
    );
    maxCorner = maxCorner.transform(transformMatrix);

    const convert3dMatrix = new Matrix4().fromArray(
      this.sketch.convert3dMatrix.toArray()
    );
    
    const centerPoint = new Vector3(
      this.sketch.bound.getCenter().x,
      this.sketch.bound.getCenter().y,
      -maxExtrusionHeight
    );
    centerPoint.transform(convert3dMatrix);

    this.x = centerPoint.x;
    this.y = centerPoint.y;
    this.z = centerPoint.z;
    this.XLength = Math.abs(maxCorner.x - minCorner.x);
    this.YLength = Math.abs(maxCorner.y - minCorner.y);
    this.ZLength = Math.abs(maxCorner.z - minCorner.z);

    this.signalBrepChanged.dispatch();
  }

  protected getSketchTransformMatrix(): Matrix4 {
    const convert3dMatrix = new Matrix4().fromArray(
      this.sketch.convert3dMatrix.toArray()
    );

    let maxExtrusionHeight = 0;
    for (const face of this.sketch.faces) {
      const extrusionHeight = this.sketch.getExtrusionValue(face.id);
      if (extrusionHeight > maxExtrusionHeight) {
        maxExtrusionHeight = extrusionHeight;
      }
    }

    const mirrorPlaneOrigin = new Vector3(
      this.sketch.bound.getCenter().x,
      this.sketch.bound.getCenter().y,
      maxExtrusionHeight
    );

    const mirrorMatrix = Matrix4.makeMirror(
      mirrorPlaneOrigin,
      new Vector3(0, 0, 1)
    );

    const transformedOrigin = mirrorPlaneOrigin.clone().transform(convert3dMatrix);
    
    const translationMatrix = Matrix4.makeTranslate({
      x: -transformedOrigin.x,
      y: -transformedOrigin.y,
      z: -transformedOrigin.z
    });

    return mirrorMatrix
      .clone()
      .preMultiply(convert3dMatrix.clone().preMultiply(translationMatrix));
  }

  public mirror(mirrorPlane: { matrix3: unknown }): void {
    this.sketch.mirror(mirrorPlane.matrix3);

    const parentHeight = this.parent.height;
    const translationMatrix = new THREE.Matrix4().makeTranslation(0, 0, parentHeight);
    this.sketch.convert3dMatrix = translationMatrix;

    super.mirror(mirrorPlane);
  }

  public getIO(): NCustomizedCeilingModel_IO {
    return NCustomizedCeilingModel_IO.instance();
  }

  protected getFaceProjectionPlane(face: unknown, parameter: unknown): unknown {
    const projectionPlane = super.getFaceProjectionPlane(face, parameter);
    
    if (!projectionPlane) {
      return projectionPlane;
    }

    if (MaterialUtil.isRCP(this, face)) {
      projectionPlane.xRay.negate();
    }

    return projectionPlane;
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedCeilingModel, NCustomizedCeilingModel);