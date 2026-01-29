import { Entity } from './Entity';
import { ParametricContentBase, ParametricContentBase_IO } from './ParametricContentBase';
import { PmWallSDK } from './PmWallSDK';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { Plane, Vector3 } from './math';

interface SubpartParams {
  [key: string]: unknown;
}

interface EIdPathItem {
  eId: string;
  idx: number;
}

interface SizeInfo {
  width?: number;
  depth?: number;
  height?: number;
}

interface SDKDataParams {
  newParams: SubpartParams;
  patchValidRegion: boolean;
}

interface SDKDataOptions {
  useMinMax: boolean;
}

interface TopLevelId {
  seekId?: string;
  entityId?: string;
}

interface OpenDocumentExtra {
  wdh: unknown;
  unitScale: number;
  dontCalcPosition: boolean;
  calcPosWithWDH: boolean;
  eIdPath: EIdPathItem[];
  hideFaces?: string[];
  useMinMax: boolean;
  topLevelId: TopLevelId;
}

interface SubpartMeta {
  eId: string;
  docFile: string;
  matrix: Matrix;
  params: SubpartParams;
  visible?: boolean;
}

interface Matrix {
  toArray(): number[];
}

interface SystemParams {
  W: number;
  D: number;
  H: number;
}

interface ModelData {
  systemParams?: SystemParams;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpedData {
  eId: string;
  [key: string]: unknown;
}

class ParametricContentSubpart_IO extends ParametricContentBase_IO {
  dump(
    entity: ParametricContentSubpart,
    target?: unknown,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): DumpedData[] {
    const dumpedData = super.dump(entity, undefined, includeChildren, options);
    dumpedData[0].eId = entity.eId;
    return dumpedData;
  }

  load(
    entity: ParametricContentSubpart,
    data: DumpedData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    entity.eId = data.eId;
  }

  static instance(): ParametricContentSubpart_IO {
    return new ParametricContentSubpart_IO();
  }
}

class ParametricContentSubpart extends ParametricContentBase {
  eId: string = '';
  docFile: string = '';
  subpartMatrix?: Matrix;
  subpartParams: SubpartParams = {};
  hideFaces?: string[];

  constructor(name: string = '', parent?: Entity) {
    super(name, parent);
  }

  getSDKData(
    wallId: string,
    roomId: string,
    params: SubpartParams,
    useMinMax: boolean = false
  ): unknown {
    const documentExtra = this.getOpenDocumentExtra(undefined, useMinMax);
    const sdkParams: SDKDataParams = {
      newParams: { ...this.subpartParams, ...params },
      patchValidRegion: true
    };
    const options: SDKDataOptions = {
      useMinMax: documentExtra.useMinMax
    };
    return PmWallSDK.getWallData(wallId, roomId, sdkParams, options);
  }

  initModelDocument(
    modelId: string,
    documentPath: string,
    forceInit?: boolean
  ): void {
    const sizeInfo = this.sizeInfo;
    if (!forceInit) {
      this.initParametricContentDocument(sizeInfo, documentPath, forceInit);
    }
  }

  getOpenDocumentExtra(
    unused?: unknown,
    useMinMax: boolean = false
  ): OpenDocumentExtra {
    const eIdPath = this.getEIdPath();
    const parentEntityTypes = [
      HSConstants.ModelClass.ParametricCurtain,
      HSConstants.ModelClass.ParametricBathroomCabinet
    ];
    const parentEntity = NCustomizedFeatureModelUtil.getParentByEntityTypes(
      this,
      parentEntityTypes
    );

    return {
      wdh: undefined,
      unitScale: 0.001,
      dontCalcPosition: true,
      calcPosWithWDH: false,
      eIdPath,
      hideFaces: this.hideFaces,
      useMinMax: false,
      topLevelId: {
        seekId: parentEntity?.metadata.seekId,
        entityId: parentEntity?.id
      }
    };
  }

  isContentInRoom(roomId: string, checkBounds: boolean = false): boolean {
    const parentEntity = NCustomizedFeatureModelUtil.getParentByEntityTypes(
      this,
      [
        HSConstants.ModelClass.ParametricCurtain,
        HSConstants.ModelClass.ParametricBathroomCabinet
      ]
    );
    return !!parentEntity && parentEntity.isContentInRoom(roomId);
  }

  getEIdPath(): EIdPathItem[] {
    const path: EIdPathItem[] = [];
    if (this.parent instanceof ParametricContentSubpart && this.parent.eId) {
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

  updateModelFromData(data: ModelData, skipSystemParams: boolean): void {
    if (data.systemParams && !skipSystemParams) {
      const { W: width, D: depth, H: height } = data.systemParams;
      this.XLength = width / 1000;
      this.YLength = depth / 1000;
      this.ZLength = height / 1000;
      this.XScale = 1;
      this.YScale = 1;
      this.ZScale = 1;
    }
  }

  updateSubpartMeta(meta: SubpartMeta, hideFaces?: string[]): void {
    this.eId = meta.eId;
    this.docFile = meta.docFile;
    this.subpartMatrix = meta.matrix;
    this.subpartParams = meta.params;
    this.visible = meta.visible === undefined || meta.visible;
    this.hideFaces = hideFaces;
  }

  getFrontProjectionPlane(): Plane {
    const yOffset = -this.YSize;
    const zRotationRad = THREE.Math.degToRad(this.ZRotation);
    const normal = new Vector3(0, -1, 0).rotate(
      new Vector3(),
      Vector3.Z(),
      zRotationRad
    );
    const right = new Vector3(1, 0, 0).rotate(
      new Vector3(),
      Vector3.Z(),
      zRotationRad
    );
    return Plane.makePlaneByPointNormal(
      new Vector3(0, yOffset, 0),
      normal,
      right
    );
  }

  getTopProjectionPlane(): Plane {
    const yRotationRad = THREE.Math.degToRad(this.YRotation);
    const normal = Vector3.Z().rotate(
      new Vector3(),
      Vector3.Y(),
      yRotationRad
    );
    const right = new Vector3(1, 0, 0).rotate(
      new Vector3(),
      Vector3.Y(),
      yRotationRad
    );
    return Plane.makePlaneByPointNormal(new Vector3(0, 0, 0), normal, right);
  }

  updateSubpart(): void {
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

  get properties(): Map<string, unknown> {
    const params = this.subpartParams ?? {};
    return new Map(Object.entries(params));
  }

  getDocFile(): string {
    return this.docFile || this.metadata.parametricMeta;
  }

  getIO(): ParametricContentSubpart_IO {
    return ParametricContentSubpart_IO.instance();
  }
}

Entity.registerClass(
  HSConstants.ModelClass.ParametricContentSubpart,
  ParametricContentSubpart
);

export { ParametricContentSubpart, ParametricContentSubpart_IO };