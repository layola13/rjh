import { MoveModelRequest } from './MoveModelRequest';

interface FaceInfo {
  outer?: unknown;
  holes?: unknown;
  targetFaceId?: string;
  newOuter?: unknown;
  D?: unknown;
}

interface PreviousState {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  host: unknown;
  parent: unknown;
  isAutoFit: boolean;
  isScalable: boolean;
  targetFaceInfo?: FaceInfo;
}

interface BackgroundWallContent {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  isScalable: boolean;
  parameters: {
    isAutoFit: boolean;
    targetFaceInfo?: FaceInfo;
  };
  initBackgroundWall(faceInfo: FaceInfo): void;
  getHost(): unknown;
  getUniqueParent(): unknown;
  dirtyClipGeometry(): void;
  dirtyFaceMaterials(): void;
  dirtyChildModels(arg1: boolean, arg2: boolean, arg3: boolean): void;
  isSizeInRangeByTargetFaceInfo(faceInfo: FaceInfo): boolean;
}

interface NextState {
  targetFaceInfo?: FaceInfo;
  isAutoFit: boolean;
  isScalable: boolean;
}

export class MoveParamrtricBackgroundWallRequest extends MoveModelRequest {
  private _targetFaceInfo?: FaceInfo;
  private _keepAutoFit: boolean;
  protected _content!: BackgroundWallContent;
  protected _previous!: PreviousState;
  protected _next!: NextState;
  protected _canDoAutoFit!: boolean;

  constructor(
    content: BackgroundWallContent,
    x: number,
    y: number,
    shouldUpdateHost: boolean = false,
    shouldUpdateParent: boolean = true,
    arg5?: unknown,
    targetFaceInfo?: FaceInfo,
    arg7?: unknown,
    keepAutoFit: boolean = false
  ) {
    super(content, x, y, shouldUpdateHost, shouldUpdateParent);
    this._targetFaceInfo = targetFaceInfo;
    this._keepAutoFit = keepAutoFit;
  }

  customizedMove(isRedo: boolean = false): void {
    if (isRedo) {
      this._content.initBackgroundWall(this._next.targetFaceInfo!);
      this._content.parameters.isAutoFit = this._next.isAutoFit;
      this._content.isScalable = this._next.isScalable;
    } else if (this._targetFaceInfo && this._canDoAutoFit) {
      const faceInfo: FaceInfo = {
        outer: this._targetFaceInfo?.outer,
        holes: this._targetFaceInfo?.holes,
        targetFaceId: this._targetFaceInfo?.targetFaceId,
        newOuter: this._content.parameters.isAutoFit || this._content.parameters?.targetFaceInfo?.newOuter,
        D: this._targetFaceInfo?.D
          ? this._targetFaceInfo.D
          : this._content.parameters?.targetFaceInfo?.D
          ? this._content.parameters.targetFaceInfo.D
          : undefined
      };

      this._content.initBackgroundWall(faceInfo);

      const sizeLimitUnlocked = HSApp.App.getApp().designMetadata.get("sizeLimitUnlock");
      if (!sizeLimitUnlocked && this._targetFaceInfo.outer && !this._content.isSizeInRangeByTargetFaceInfo(this._targetFaceInfo)) {
        this._content.parameters.isAutoFit = false;
        this._content.isScalable = true;
      }
    } else {
      this._content.parameters.targetFaceInfo = {
        D: this._content.parameters?.targetFaceInfo?.D
      };
      this._content.parameters.isAutoFit = this._keepAutoFit;
      this._content.isScalable = !this._keepAutoFit;
    }

    this._content.dirtyClipGeometry();
    this._content.dirtyFaceMaterials();
    this._content.dirtyChildModels(true, true, true);
  }

  protected _saveRestoreData(): void {
    this._previous = {
      x: this._content.x,
      y: this._content.y,
      z: this._content.z,
      rotation: this._content.rotation,
      XRotation: this._content.XRotation,
      YRotation: this._content.YRotation,
      host: this._content.getHost(),
      parent: this._content.getUniqueParent(),
      isAutoFit: this._content.parameters.isAutoFit,
      isScalable: this._content.isScalable,
      targetFaceInfo: this._content.parameters.targetFaceInfo
    };
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWall;
  }

  getDescription(): string {
    return "移动参数化背景墙";
  }
}