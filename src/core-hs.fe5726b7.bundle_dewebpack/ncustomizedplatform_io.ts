import { NCustomizedSketchModel_IO, NCustomizedSketchModel } from './NCustomizedSketchModel';
import { Entity } from './Entity';
import { Vector3, Matrix4, Tolerance, Plane } from './Math';
import { alg } from './BrepAlgorithms';
import { SketchBrepNameHelper } from './SketchBrepNameHelper';
import { Logger } from './Logger';
import { SignalHook } from './SignalHook';

interface SketchFace {
  id: string;
  ID: string;
  tag: string;
  outerLoop: {
    getDiscretePoints(): Vector3[];
  };
  innerLoops: Array<{
    getDiscretePoints(): Vector3[];
  }>;
}

interface Sketch {
  faces: SketchFace[];
  convert3dMatrix: {
    toArray(): number[];
  };
  bound: {
    getCenter(): { x: number; y: number };
  };
  getExtrusionValue(faceId: string): number;
  mirror(matrix: Matrix4): void;
}

interface Shell {
  getFaceByTag(tag: string): Face;
  transform(matrix: Matrix4): void;
}

interface Face {
  tag: string;
}

interface Content {
  x: number;
  y: number;
  z: number;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface FaceWithHeight {
  outer: Vector3[];
  holes: Vector3[][];
  height: number;
}

interface FaceValuePair {
  face2d: SketchFace;
  value: number;
}

interface ShellFaceMapping {
  face: SketchFace;
  value: number;
}

interface SketchBoundInfo {
  sketchBound: [number, number, number, number] | null;
  maxValue: number;
}

interface MirrorParams {
  matrix3: Matrix4;
}

export class NCustomizedPlatform_IO extends NCustomizedSketchModel_IO {
  private static _instance: NCustomizedPlatform_IO;

  public static instance(): NCustomizedPlatform_IO {
    if (!NCustomizedPlatform_IO._instance) {
      NCustomizedPlatform_IO._instance = new NCustomizedPlatform_IO();
    }
    return NCustomizedPlatform_IO._instance;
  }

  public dump(
    entity: NCustomizedPlatform,
    callback?: (data: unknown, entity: NCustomizedPlatform) => void,
    shouldSerialize: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const serializedData = super.dump(entity, undefined, shouldSerialize, options);
    if (callback) {
      callback(serializedData, entity);
    }
    return serializedData;
  }

  public load(
    data: unknown,
    callback?: (entity: NCustomizedPlatform) => void,
    options: LoadOptions = {}
  ): void {
    super.load(data, callback, options);
  }
}

export class NCustomizedPlatform extends NCustomizedSketchModel {
  private signalHook: SignalHook;
  protected _sketch?: Sketch;
  protected _breps: Shell[] = [];
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;
  public XLength: number = 0;
  public YLength: number = 0;
  public ZLength: number = 0;
  public ZSize: number = 0;
  protected signalHostChanged: unknown;
  protected signalBrepChanged: {
    dispatch(): void;
  };
  protected host: unknown;

  constructor(id: string = "", parentId?: string) {
    super(id, parentId);
    this.signalHook = new SignalHook(this);
    this.signalHook.listen(this.signalHostChanged, () => {
      if (this.host === null || this.host === undefined) {
        this.remove();
      }
    });
  }

  protected onSketchDirty(event: unknown): void {
    super.onSketchDirty(event);
    this.moveAttachedContents("sketch");
  }

  private moveAttachedContents(changeType: string, additionalParam?: unknown): void {
    if (changeType === "z" || changeType === "sketch") {
      const facesWithHeights: FaceWithHeight[] = this.sketch.faces.map(face => ({
        outer: face.outerLoop.getDiscretePoints(),
        holes: face.innerLoops.map(loop => loop.getDiscretePoints()),
        height: this.sketch.getExtrusionValue(face.id)
      }));

      this.forEachContent((content: Content) => {
        const point = new HSCore.Util.Math.Vec2(content.x, content.y);
        
        for (const faceInfo of facesWithHeights) {
          if (HSCore.Util.Math.isPointInPolygonWithHoles(
            point,
            faceInfo.outer,
            faceInfo.holes,
            false
          )) {
            content.z = faceInfo.height + this.z;
            break;
          }
        }
      });
    }
  }

  private initializeContentPositionBySketch(): void {
    if (!this._sketch) return;

    const boundInfo = this.getSketchFacesBoundInfo();
    if (!boundInfo) return;

    const sketchBound = boundInfo.sketchBound;
    if (!sketchBound) return;

    let minPoint = new Vector3(sketchBound[0], sketchBound[1], 0);
    minPoint = minPoint.transform(this.getSketchTransformMatrix());

    const maxHeight = boundInfo.maxValue;
    let maxPoint = new Vector3(
      sketchBound[0] + sketchBound[2],
      sketchBound[1] + sketchBound[3],
      maxHeight
    );
    maxPoint = maxPoint.transform(this.getSketchTransformMatrix());

    const transformMatrix = new Matrix4().fromArray(this.sketch.convert3dMatrix.toArray());
    const sketchCenter = new Vector3(
      this.sketch.bound.getCenter().x,
      this.sketch.bound.getCenter().y,
      0
    );
    sketchCenter.transform(transformMatrix);

    this.x = sketchCenter.x;
    this.y = sketchCenter.y;
    this.z = sketchCenter.z;
    this.XLength = Math.abs(maxPoint.x - minPoint.x);
    this.YLength = Math.abs(maxPoint.y - minPoint.y);
    this.ZLength = Math.abs(maxPoint.z - minPoint.z);
    this.signalBrepChanged.dispatch();
  }

  private getSketchTransformMatrix(): Matrix4 {
    const transformMatrix = new Matrix4().fromArray(this.sketch.convert3dMatrix.toArray());
    const sketchCenter = new Vector3(
      this.sketch.bound.getCenter().x,
      this.sketch.bound.getCenter().y,
      0
    );
    sketchCenter.transform(transformMatrix);

    const translationMatrix = Matrix4.makeTranslate({
      x: -sketchCenter.x,
      y: -sketchCenter.y,
      z: -sketchCenter.z
    });

    return transformMatrix.clone().preMultiply(translationMatrix);
  }

  protected generateBrep(useTemporary: boolean = false): void {
    if (!this._sketch || !this._sketch.convert3dMatrix) return;

    this.initializeContentPositionBySketch();

    const sketchFaces = this._sketch.faces;
    if (!sketchFaces.length) {
      this._breps = [];
      return;
    }

    const faceValuePairs: FaceValuePair[] = sketchFaces.map(face => ({
      face2d: face,
      value: this._sketch?.getExtrusionValue(face.ID) || 0
    }));

    const shells = this.generateSketchShells();

    for (const shell of shells) {
      const shellFaceMappings = this.calcShellSketchFaceMp(shell, faceValuePairs);
      shellFaceMappings.sort((a, b) => a.value - b.value);

      for (const mapping of shellFaceMappings) {
        if (mapping.value < Tolerance.NUMBER_EPS) continue;

        const targetFace = shell.getFaceByTag(mapping.face.tag);
        const extrusionVector = Vector3.Z().multiply(mapping.value);
        const result = alg.ShellEdit.pullPushFace(targetFace, extrusionVector, shells);

        if (result.errorStr) {
          Logger.console.assert(
            false,
            `generateBrep: Brep.alg.ShellEdit.pullPushFace error: ${result.errorStr}`
          );
        }
      }
    }

    SketchBrepNameHelper.getInstance().reconstructBrepNames(shells, this.sketch);

    const transformMatrix = this.getSketchTransformMatrix();
    shells.map(shell => shell.transform(transformMatrix));

    if (useTemporary) {
      this._breps = shells;
    } else {
      this.breps = shells;
    }

    this.updateMaterialMpBysketchAssoc();
    this.refreshAllMitres();
  }

  private getBottomProjectionPlane(): Plane {
    const zOffset = this.ZSize > 0 ? -this.ZSize : 0;
    return Plane.makePlaneByPointNormal(
      new Vector3(0, 0, zOffset),
      Vector3.Z(),
      new Vector3(1, 0, 0)
    );
  }

  public mirror(params: MirrorParams): void {
    this.sketch.mirror(params.matrix3);
    this.sketch.convert3dMatrix = new THREE.Matrix4().identity();
    super.mirror(params);
  }

  public getIO(): NCustomizedPlatform_IO {
    return NCustomizedPlatform_IO.instance();
  }

  protected get sketch(): Sketch {
    return this._sketch!;
  }

  protected set breps(value: Shell[]) {
    this._breps = value;
  }

  protected forEachContent(callback: (content: Content) => void): void {
    // Implementation placeholder
  }

  protected getSketchFacesBoundInfo(): SketchBoundInfo | null {
    // Implementation placeholder
    return null;
  }

  protected generateSketchShells(): Shell[] {
    // Implementation placeholder
    return [];
  }

  protected calcShellSketchFaceMp(shell: Shell, faces: FaceValuePair[]): ShellFaceMapping[] {
    // Implementation placeholder
    return [];
  }

  protected updateMaterialMpBysketchAssoc(): void {
    // Implementation placeholder
  }

  protected refreshAllMitres(): void {
    // Implementation placeholder
  }

  protected remove(): void {
    // Implementation placeholder
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedPlatform, NCustomizedPlatform);