import { NCustomizedSketchModel_IO, NCustomizedSketchModel } from './NCustomizedSketchModel';
import { Plane, Matrix3, Line3d } from './Geometry';
import { Entity } from './Entity';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface BaseboardCutterInfo {
  cutPath: Line3d[];
  patchLines: unknown[];
}

interface FaceInfo {
  curve?: Line3d;
}

interface SurfaceObject {
  localToWorld: {
    toArray(): number[];
  };
  getNormal(): { x: number; y: number; z: number };
}

interface Face {
  wirePath: {
    outer: unknown[];
  };
  surfaceObj: SurfaceObject;
  faceInfo?: FaceInfo;
}

interface Host extends Face {
  faceInfo?: FaceInfo;
  surfaceObj: SurfaceObject;
}

interface SameLineFaceData {
  face: Face;
  floorLine?: Line3d;
}

export class NCustomizedBackgroundWall_IO extends NCustomizedSketchModel_IO {
  private static _instance: NCustomizedBackgroundWall_IO;

  public static instance(): NCustomizedBackgroundWall_IO {
    if (!NCustomizedBackgroundWall_IO._instance) {
      NCustomizedBackgroundWall_IO._instance = new NCustomizedBackgroundWall_IO();
    }
    return NCustomizedBackgroundWall_IO._instance;
  }

  public dump(
    entity: NCustomizedBackgroundWall,
    callback?: (data: unknown, entity: NCustomizedBackgroundWall) => void,
    serialize: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const data = super.dump(entity, undefined, serialize, options);
    if (callback) {
      callback(data, entity);
    }
    return data;
  }

  public load(
    data: unknown,
    callback?: (entity: NCustomizedBackgroundWall) => void,
    options: LoadOptions = {}
  ): void {
    super.load(data, callback, options);
  }
}

export class NCustomizedBackgroundWall extends NCustomizedSketchModel {
  private _singleHooKOnHost: HSCore.Util.SignalHook;
  public host?: Host;
  public sketch: {
    bound: {
      center(): { x: number; y: number; z: number };
    };
    mirror(matrix: Matrix3): void;
    convert3dMatrix?: THREE.Matrix4;
  };

  constructor(id: string = "", options?: unknown) {
    super(id, options);
    this._singleHooKOnHost = new HSCore.Util.SignalHook(this);
  }

  public getFrontProjectionPlane(): Plane {
    const plane = Plane.XOY();
    const transformMatrix = this.getSketchTransformMatrix();
    plane.transform(transformMatrix);
    return plane;
  }

  public mirror(mirrorPlane: unknown): void {
    const center = this.sketch.bound.center();
    const mirrorMatrix = Matrix3.makeMirror(center, { x: 0, y: 1 });
    this.sketch.mirror(mirrorMatrix);

    const host = this.host;
    if (!host) {
      Logger.console.assert(false, "户型翻转：背景墙的host不能为空!");
      return;
    }

    const connectedFaces = HSCore.Util.SameLineFace.getSameLineConnectedFaces(host);
    this.sketch.convert3dMatrix = this.getSameLineFacesMatrix(connectedFaces);
    super.mirror(mirrorPlane);
  }

  private getSameLineFacesMatrix(faces: Face[]): THREE.Matrix4 {
    const Z_TOLERANCE = 1e-6;
    const EXTEND_LENGTH = 1e6;
    const DEFAULT_PARAM = 1e6;

    const facesWithFloorLines: SameLineFaceData[] = faces.map((face) => {
      const floorLines = face.wirePath.outer.filter((segment) => {
        if (!(segment instanceof Line3d)) {
          return false;
        }

        const startPoint = segment.getStartPt();
        const endPoint = segment.getEndPt();
        return Math.abs(startPoint.z - endPoint.z) <= Z_TOLERANCE && 
               Math.abs(startPoint.z) < Z_TOLERANCE;
      });

      return {
        face,
        floorLine: floorLines.length > 0 ? floorLines[0] : undefined
      };
    });

    if (facesWithFloorLines.length === 0 || !facesWithFloorLines[0].floorLine) {
      return new THREE.Matrix4().fromArray(
        facesWithFloorLines[0].face.surfaceObj.localToWorld.toArray()
      );
    }

    const extendedLine = facesWithFloorLines[0].floorLine.clone().extendDouble(EXTEND_LENGTH);

    facesWithFloorLines.sort((a, b) => {
      const paramA = a.floorLine 
        ? extendedLine.getParamAt(a.floorLine.getStartPt()) 
        : DEFAULT_PARAM;
      const paramB = b.floorLine 
        ? extendedLine.getParamAt(b.floorLine.getStartPt()) 
        : DEFAULT_PARAM;
      return paramA - paramB;
    });

    return new THREE.Matrix4().fromArray(
      facesWithFloorLines[0].face.surfaceObj.localToWorld.toArray()
    );
  }

  public getIO(): NCustomizedBackgroundWall_IO {
    return NCustomizedBackgroundWall_IO.instance();
  }

  public getBaseboardCutterInfo(face?: Face): BaseboardCutterInfo[] {
    const result: BaseboardCutterInfo[] = [];

    if (!face || this.host !== face) {
      return result;
    }

    const curve = face.faceInfo?.curve;
    if (!curve) {
      return result;
    }

    const floorLine = new Line3d(
      { x: curve.getStartPt().x, y: curve.getStartPt().y, z: 0 },
      { x: curve.getEndPt().x, y: curve.getEndPt().y, z: 0 }
    );

    const offsetLine = floorLine.clone();
    offsetLine.translate(face.surfaceObj.getNormal());
    offsetLine.reverse();

    const connectingLine1 = new Line3d(floorLine.getEndPt(), offsetLine.getStartPt());
    const connectingLine2 = new Line3d(offsetLine.getEndPt(), floorLine.getStartPt());

    result.push({
      cutPath: [floorLine.clone(), connectingLine1, offsetLine, connectingLine2],
      patchLines: []
    });

    return result;
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedBackgroundWall, NCustomizedBackgroundWall);