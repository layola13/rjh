import { Entity } from './Entity';
import { NCPBackgroundWallBase_IO, NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { PmWallSDK } from './PmWallSDK';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { Plane, Vector3 } from './GeometryUtils';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface SubpartEntity {
  eId?: string;
  [key: string]: unknown;
}

interface SubpartData {
  eId?: string;
  [key: string]: unknown;
}

interface WallDataExtra {
  wdh?: WallDimensionHints;
  useMinMax?: boolean;
}

interface WallDimensionHints {
  [key: string]: unknown;
}

interface WallDataParams {
  newParams: Record<string, unknown>;
  patchValidRegion: boolean;
}

interface WallDataOptions {
  useMinMax?: boolean;
}

interface TargetFaceInfo {
  [key: string]: unknown;
}

interface FaceInfo {
  wdh?: WallDimensionHints;
  wallLine?: unknown;
}

interface EIdPathItem {
  eId: string;
  idx: number;
}

interface TopLevelId {
  seekId: string;
  entityId: string;
}

interface OpenDocumentExtra {
  wdh?: WallDimensionHints;
  unitScale: number;
  wallLine?: unknown;
  dontCalcPosition: boolean;
  calcPosWithWDH: boolean;
  eIdPath: EIdPathItem[];
  hideFaces?: unknown;
  useMinMax: boolean;
  topLevelId?: TopLevelId;
}

interface SystemParams {
  W: number;
  D: number;
  H: number;
}

interface ModelData {
  systemParams?: SystemParams;
  [key: string]: unknown;
}

interface SubpartMeta {
  eId?: string;
  docFile?: string;
  matrix?: THREE.Matrix4;
  params?: Record<string, unknown>;
  visible?: boolean;
}

interface Parameters {
  targetFaceInfo?: TargetFaceInfo;
  [key: string]: unknown;
}

export class NCPBackgroundWallSubpart_IO extends NCPBackgroundWallBase_IO {
  private static _instance?: NCPBackgroundWallSubpart_IO;

  public static instance(): NCPBackgroundWallSubpart_IO {
    if (!this._instance) {
      this._instance = new NCPBackgroundWallSubpart_IO();
    }
    return this._instance;
  }

  public dump(
    entity: SubpartEntity,
    context?: unknown,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): SubpartData[] {
    const dumpedData = super.dump(entity, undefined, includeMetadata, options);
    dumpedData[0].eId = entity.eId;
    return dumpedData;
  }

  public load(
    entity: SubpartEntity,
    data: SubpartData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    entity.eId = data.eId;
  }
}

export class NCPBackgroundWallSubpart extends NCPBackgroundWallBase {
  public eId?: string;
  public docFile?: string;
  public subpartMatrix?: THREE.Matrix4;
  public subpartParams?: Record<string, unknown>;
  public hideFaces?: unknown;
  public parameters!: Parameters;

  constructor(id: string = "", metadata?: unknown) {
    super(id, metadata);
  }

  public getWallData(
    arg1: unknown,
    arg2: unknown,
    additionalParams: Record<string, unknown>
  ): unknown {
    const extra = this.getOpenDocumentExtra(this.parameters.targetFaceInfo);
    
    if (extra.wdh) {
      Object.assign(additionalParams, extra.wdh);
    }

    const params: WallDataParams = {
      newParams: {
        ...this.subpartParams,
        ...additionalParams
      },
      patchValidRegion: true
    };

    const options: WallDataOptions = {
      useMinMin: extra.useMinMax
    };

    return PmWallSDK.getWallData(arg1, arg2, params, options);
  }

  public initModelDocument(
    params: Parameters,
    context: unknown,
    shouldInit?: boolean
  ): void {
    const targetFaceInfo = params.targetFaceInfo;
    
    if (!shouldInit) {
      this.initBackgroundWallDocument(targetFaceInfo, context, shouldInit);
    }
  }

  public getOpenDocumentExtra(targetFaceInfo?: TargetFaceInfo): OpenDocumentExtra {
    const faceInfo = this.getInfoByTargetFace(targetFaceInfo);
    const eIdPath = this.getEIdPath();
    const parentUnit = NCustomizedFeatureModelUtil.getParentByEntityTypes(
      this,
      [
        HSConstants.ModelClass.NCPBackgroundWallUnit,
        HSConstants.ModelClass.NCustomizedParametricBackgroundWall
      ]
    );

    return {
      wdh: faceInfo.wdh,
      unitScale: 0.001,
      wallLine: faceInfo.wallLine,
      dontCalcPosition: true,
      calcPosWithWDH: false,
      eIdPath: eIdPath,
      hideFaces: this.hideFaces,
      useMinMax: false,
      topLevelId: parentUnit
        ? {
            seekId: parentUnit.metadata.seekId,
            entityId: parentUnit.id
          }
        : undefined
    };
  }

  public isContentInRoom(content: unknown, checkFlag: boolean = false): boolean {
    const parentUnit = NCustomizedFeatureModelUtil.getParentByEntityTypes(
      this,
      [
        HSConstants.ModelClass.NCPBackgroundWallUnit,
        HSConstants.ModelClass.NCustomizedParametricBackgroundWall
      ]
    );

    return !!parentUnit && parentUnit.isContentInRoom(content, checkFlag);
  }

  public getEIdPath(): EIdPathItem[] {
    const path: EIdPathItem[] = [];

    if (this.parent instanceof NCPBackgroundWallSubpart && this.parent.eId) {
      path.push(...this.parent.getEIdPath());
    }

    if (this.eId) {
      path.push({
        eId: this.eId,
        idx: 0
      });
    }

    return path;
  }

  public updateModelFromData(data: ModelData, shouldUpdateSystem?: boolean): void {
    if (data.systemParams && !shouldUpdateSystem) {
      const { W, D, H } = data.systemParams;
      const MILLIMETERS_TO_METERS = 1000;
      
      this.XLength = W / MILLIMETERS_TO_METERS;
      this.YLength = D / MILLIMETERS_TO_METERS;
      this.ZLength = H / MILLIMETERS_TO_METERS;
      this.XScale = 1;
      this.YScale = 1;
      this.ZScale = 1;
    }
  }

  public updateSubpartMeta(meta: SubpartMeta, hideFaces?: unknown): void {
    this.eId = meta.eId;
    this.docFile = meta.docFile;
    this.subpartMatrix = meta.matrix;
    this.subpartParams = meta.params;
    this.visible = meta.visible === undefined || meta.visible;
    this.hideFaces = hideFaces;
  }

  public getFrontProjectionPlane(): Plane {
    const yOffset = -this.YSize;
    const origin = new Vector3(0, yOffset, 0);
    const zRotationRad = THREE.Math.degToRad(this.ZRotation);
    
    const normal = new Vector3(0, -1, 0).rotate(
      new Vector3(),
      Vector3.Z(),
      zRotationRad
    );
    
    const xAxis = new Vector3(1, 0, 0).rotate(
      new Vector3(),
      Vector3.Z(),
      zRotationRad
    );

    return Plane.makePlaneByPointNormal(origin, normal, xAxis);
  }

  public getTopProjectionPlane(): Plane {
    const origin = new Vector3(0, 0, 0);
    const yRotationRad = THREE.Math.degToRad(this.YRotation);
    
    const normal = Vector3.Z().rotate(
      new Vector3(),
      Vector3.Y(),
      yRotationRad
    );
    
    const xAxis = new Vector3(1, 0, 0).rotate(
      new Vector3(),
      Vector3.Y(),
      yRotationRad
    );

    return Plane.makePlaneByPointNormal(origin, normal, xAxis);
  }

  public updateSubpart(): void {
    if (!this.subpartMatrix) {
      return;
    }

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const euler = new THREE.Euler();

    const matrix = new THREE.Matrix4();
    matrix.fromArray(this.subpartMatrix.toArray());
    matrix.decompose(position, quaternion, scale);
    
    euler.setFromQuaternion(quaternion, 'YZX');

    this.x = position.x;
    this.y = position.y;
    this.z = position.z;
    this.XRotation = -THREE.Math.radToDeg(euler.x);
    this.YRotation = -THREE.Math.radToDeg(euler.y);
    this.ZRotation = -THREE.Math.radToDeg(euler.z);
  }

  public get properties(): Map<string, unknown> {
    const params = this.subpartParams ?? {};
    return new Map(Object.entries(params));
  }

  public getDocFile(): string | undefined {
    return this.docFile ?? this.metadata.parametricMeta;
  }

  public getIO(): NCPBackgroundWallSubpart_IO {
    return NCPBackgroundWallSubpart_IO.instance();
  }

  protected getInfoByTargetFace(targetFaceInfo?: TargetFaceInfo): FaceInfo {
    // Implementation from base class
    return {} as FaceInfo;
  }

  protected initBackgroundWallDocument(
    targetFaceInfo?: TargetFaceInfo,
    context?: unknown,
    shouldInit?: boolean
  ): void {
    // Implementation from base class
  }
}

Entity.registerClass(
  HSConstants.ModelClass.NCPBackgroundWallSubpart,
  NCPBackgroundWallSubpart
);