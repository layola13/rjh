import { Entity } from './Entity';
import { PmWallSDK } from './PmWallSDK';
import { Vector3, Matrix4, Line3d } from './Math';
import { NCPBackgroundWallBase_IO, NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { TransUtil } from './TransUtil';
import { Face } from './Face';
import { Floor } from './Floor';
import { NCPBackgroundWallBaseUtil } from './NCPBackgroundWallBaseUtil';

interface TargetFaceInfo {
  outer?: Vector3[];
  newOuter?: Vector3[];
  holes?: Vector3[][];
}

interface WDH {
  W?: number;
  D?: number;
  H?: number;
}

interface OpenDocumentExtra {
  wdh: WDH;
  unitScale: number;
  wallLine: unknown;
  dontCalcPosition: boolean;
  calcPosWithWDH: boolean;
  useMinMax: boolean;
}

interface SystemParams {
  W: number;
  D: number;
  H: number;
}

interface MetaPosition {
  x: number;
  y: number;
  z: number;
}

interface Meta {
  position: MetaPosition;
  yLength?: number;
}

interface ModelData {
  systemParams?: SystemParams;
  meta?: Meta;
}

interface ModelParameters {
  targetFaceInfo?: TargetFaceInfo;
  isAutoFit?: boolean;
}

interface ValidRegions {
  outer: Line3d[];
  holes: Line3d[][];
}

interface WallDataParams {
  newParams: WDH;
  validRegion?: ValidRegions;
  patchValidRegion: boolean;
}

interface WallDataOptions {
  wallLine: unknown;
  useMinMax: boolean;
}

interface MirrorTransform {
  matrix4: Matrix4;
}

interface SignalData {
  data: {
    type: string;
  };
}

export class NCustomizedParametricBackgroundWall_IO extends NCPBackgroundWallBase_IO {}

export class NCustomizedParametricBackgroundWall extends NCPBackgroundWallBase {
  private _singleHooKOnHost: HSCore.Util.SignalHook;
  protected parameters!: ModelParameters;
  protected useMinMax: boolean = false;
  protected propertyRecord: unknown;
  protected doc!: {
    designMetadata: Map<string, unknown>;
  };
  protected host?: Face;

  public XLength: number = 0;
  public YLength: number = 0;
  public ZLength: number = 0;
  public XScale: number = 1;
  public YScale: number = 1;
  public ZScale: number = 1;
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(id: string = "", params?: unknown) {
    super(id, params);
    this._singleHooKOnHost = new HSCore.Util.SignalHook(this);
  }

  public initBackgroundWall(targetFaceInfo: TargetFaceInfo, usePropertyRecord?: boolean): void {
    if (this.parameters.isAutoFit !== false) {
      this.parameters.targetFaceInfo = targetFaceInfo;
      this.constructBrep(
        usePropertyRecord ? this.propertyRecord : undefined,
        false,
        usePropertyRecord
      );
    } else {
      this.parameters.targetFaceInfo = targetFaceInfo;
    }
  }

  public getOpenDocumentExtra(targetFaceInfo: TargetFaceInfo, useMinMax?: boolean): OpenDocumentExtra {
    const faceInfo = this.getInfoByTargetFace(targetFaceInfo);
    const sizeLimitUnlock = this.doc.designMetadata.get('sizeLimitUnlock');
    this.useMinMax = useMinMax ? this.useMinMax : !sizeLimitUnlock;

    return {
      wdh: faceInfo.wdh,
      unitScale: 0.001,
      wallLine: faceInfo.wallLine,
      dontCalcPosition: false,
      calcPosWithWDH: true,
      useMinMax: this.useMinMax
    };
  }

  public updateModelFromData(data: ModelData, shouldUpdate: boolean): void {
    if (data.systemParams) {
      if (!shouldUpdate) {
        if (this.parameters.isAutoFit) {
          this.updatePositionFromMeta(data.meta!, shouldUpdate);
        }

        const { W, D, H } = data.systemParams;
        this.XLength = W / 1000;
        this.YLength = D / 1000;
        this.ZLength = H / 1000;
        this.XScale = 1;
        this.YScale = 1;
        this.ZScale = 1;
      }
    } else if (data.meta) {
      this.updatePositionFromMeta(data.meta, shouldUpdate);
      this.updateSizeFromMeta(data.meta);
    }
  }

  public updatePositionFromMeta(meta: Meta, shouldSkipUpdate: boolean = false): void {
    if (shouldSkipUpdate) {
      return;
    }

    this.x = meta.position.x;
    this.y = meta.position.y;
    this.z = meta.position.z;
    this.XScale = 1;
    this.ZScale = 1;

    if (this.YScale !== 1) {
      this.updateYPosition(meta.yLength!, this.YScale);
    }
  }

  public updateYPosition(yLength: number, yScale: number): void {
    const targetFaceInfo = this.parameters.targetFaceInfo;
    if (!targetFaceInfo) {
      return;
    }

    const outer = targetFaceInfo.newOuter ?? targetFaceInfo.outer;
    if (!outer?.length) {
      return;
    }

    const transformMatrix = TransUtil.toXYPlanMatrixUpEx(outer, new THREE.Vector3());
    const matrix4 = new Matrix4().fromArray(transformMatrix.toArray());
    const inversedMatrix = matrix4?.inversed();

    if (!matrix4 || !inversedMatrix) {
      return;
    }

    const currentPosition = new Vector3(this.x, this.y, this.z).transform(matrix4);
    currentPosition.z = currentPosition.z + (yLength * (yScale - 1)) / 2;

    const newPosition = currentPosition.transform(inversedMatrix);
    this.x = newPosition.x;
    this.y = newPosition.y;
    this.z = newPosition.z;
  }

  public initModelDocument(params: ModelParameters, flag: boolean, usePropertyRecord?: boolean): void {
    let targetFaceInfo = params.targetFaceInfo;

    if (!targetFaceInfo || (!targetFaceInfo.newOuter && !targetFaceInfo.outer)) {
      targetFaceInfo = this.getTargetFaceInfoBySize(targetFaceInfo);
    }

    this.initBackgroundWallDocument(targetFaceInfo!, flag, usePropertyRecord);
  }

  public initBackgroundWallDocument(
    targetFaceInfo: TargetFaceInfo,
    flag: boolean,
    usePropertyRecord?: boolean
  ): void {
    this.openDocument(targetFaceInfo, usePropertyRecord);
    this.parameters.targetFaceInfo = targetFaceInfo;

    if (this.parameters.isAutoFit === undefined) {
      this.parameters.isAutoFit = true;
    }

    this.constructBrep(usePropertyRecord ? this.propertyRecord : undefined, flag, usePropertyRecord);
  }

  public getWallData(
    param1: unknown,
    param2: unknown,
    wdhParams: WDH,
    useMinMaxOverride: boolean = false
  ): unknown {
    const validRegions = HSConstants.Config.ClipBackgroundWallEnable
      ? undefined
      : this._getValidRegions(this.parameters.targetFaceInfo);

    const extraData = this.getOpenDocumentExtra(this.parameters.targetFaceInfo!, useMinMaxOverride);

    if (extraData.wdh) {
      Object.assign(wdhParams, extraData.wdh);
    }

    const wallDataParams: WallDataParams = {
      newParams: wdhParams,
      validRegion: validRegions,
      patchValidRegion: true
    };

    const wallDataOptions: WallDataOptions = {
      wallLine: extraData.wallLine,
      useMinMax: extraData.useMinMax
    };

    return PmWallSDK.getWallData(param1, param2, wallDataParams, wallDataOptions);
  }

  private _getValidRegions(faceInfo?: TargetFaceInfo): ValidRegions | undefined {
    if (!faceInfo) {
      return undefined;
    }

    const outer = faceInfo.newOuter ?? faceInfo.outer;
    const holes = faceInfo.holes ?? [];

    if (!this._isFaceInfoDivisible(faceInfo)) {
      return undefined;
    }

    const convertToLines = (points?: Vector3[]): Line3d[] => {
      if (!points?.length) {
        return [];
      }

      return points.reduce<Line3d[]>((lines, point, index) => {
        if (index !== 0) {
          lines.push(new Line3d(points[index - 1], point));
        }
        if (index === points.length - 1) {
          lines.push(new Line3d(point, points[0]));
        }
        return lines;
      }, []);
    };

    return {
      outer: convertToLines(outer),
      holes: holes.map(hole => convertToLines(hole))
    };
  }

  private _isFaceInfoDivisible(faceInfo?: TargetFaceInfo): boolean {
    if (!faceInfo) {
      return false;
    }

    const outer = faceInfo.newOuter ?? faceInfo.outer;
    const holes = faceInfo.holes ?? [];

    if (!outer) {
      return false;
    }

    return !!(
      outer.length !== 4 ||
      !HSCore.Util.Math.checkIsRect(outer) ||
      (holes && holes.length)
    );
  }

  public getIO(): NCustomizedParametricBackgroundWall_IO {
    return NCustomizedParametricBackgroundWall_IO.instance();
  }

  public getBaseboardCutterInfo(face?: Face): unknown {
    const targetFace = this.host instanceof Face ? this.host : face;
    return super.getBaseboardCutterInfo(targetFace);
  }

  protected _setHost(host: Face): void {
    super._setHost(host);
    this._listenSignalOnHost(host);
  }

  private _listenSignalOnHost(host?: Face): void {
    this._singleHooKOnHost.unlistenAll();

    if (host && host instanceof Face && !(host instanceof Floor)) {
      NCPBackgroundWallBaseUtil.getSameLineFaceForClip(host).forEach(face => {
        this._singleHooKOnHost.listen(face.signalDirty, (signal: SignalData) => {
          if (signal.data.type === 'geometry') {
            this.dirtyClipGeometry();
            this.dirtyMaterial();
            this.dirtyChildModels(true, true, true);
          }
        });
      });
    }
  }

  public mirror(transform: MirrorTransform): void {
    super.mirror(transform);

    if (!this.parameters.isAutoFit) {
      const position = new Vector3(this.x, this.y, this.z);
      position.transform(transform.matrix4);
      this.x = position.x;
      this.y = position.y;
      this.z = position.z;
    }
  }

  protected getInfoByTargetFace(targetFaceInfo: TargetFaceInfo): { wdh: WDH; wallLine: unknown } {
    throw new Error('Method not implemented.');
  }

  protected constructBrep(propertyRecord: unknown, flag: boolean, usePropertyRecord?: boolean): void {
    throw new Error('Method not implemented.');
  }

  protected updateSizeFromMeta(meta: Meta): void {
    throw new Error('Method not implemented.');
  }

  protected getTargetFaceInfoBySize(targetFaceInfo?: TargetFaceInfo): TargetFaceInfo {
    throw new Error('Method not implemented.');
  }

  protected openDocument(targetFaceInfo: TargetFaceInfo, usePropertyRecord?: boolean): void {
    throw new Error('Method not implemented.');
  }

  protected dirtyClipGeometry(): void {
    throw new Error('Method not implemented.');
  }

  protected dirtyMaterial(): void {
    throw new Error('Method not implemented.');
  }

  protected dirtyChildModels(flag1: boolean, flag2: boolean, flag3: boolean): void {
    throw new Error('Method not implemented.');
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedParametricBackgroundWall, NCustomizedParametricBackgroundWall);