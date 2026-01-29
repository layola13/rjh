import { MoveRequest } from './MoveRequest';

interface TargetFaceInfo {
  outer?: unknown;
  holes?: unknown;
  D?: unknown;
}

interface ContentParameters {
  targetFaceInfo?: TargetFaceInfo;
}

interface Content {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  parameters: ContentParameters;
  initBackgroundWall(faceInfo: TargetFaceInfo): void;
  getTargetFaceInfoBySize(): TargetFaceInfo;
  dirtyClipGeometry(): void;
  dirtyFaceMaterials(): void;
  dirtyChildModels(arg1: boolean, arg2: boolean, arg3: boolean): void;
  getHost(): unknown;
  getUniqueParent(): unknown;
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
  targetFaceInfo?: TargetFaceInfo;
}

interface NextState {
  targetFaceInfo?: TargetFaceInfo;
}

export class MoveNCPBackgroundWallUnitRequest extends MoveRequest {
  private _targetFaceInfo?: TargetFaceInfo;
  protected _content!: Content;
  protected _previous!: PreviousState;
  protected _next!: NextState;

  constructor(
    content: Content,
    x: number,
    y: number,
    shouldApply: boolean = false,
    shouldRecord: boolean = true,
    arg5?: unknown,
    targetFaceInfo?: TargetFaceInfo
  ) {
    super(content, x, y, shouldApply, shouldRecord);
    this._targetFaceInfo = targetFaceInfo;
  }

  customizedMove(useNext?: boolean): void {
    if (useNext) {
      this._content.initBackgroundWall(this._next.targetFaceInfo!);
    } else if (this._targetFaceInfo) {
      const faceInfo: TargetFaceInfo = {
        outer: this._targetFaceInfo?.outer,
        holes: this._targetFaceInfo?.holes,
        D: this._targetFaceInfo?.D 
          ? this._targetFaceInfo.D 
          : this._content.parameters?.targetFaceInfo?.D 
            ? this._content.parameters.targetFaceInfo.D 
            : undefined
      };
      this._content.initBackgroundWall(faceInfo);
    } else {
      const clonedParameters = _.cloneDeep(this._content.parameters);
      clonedParameters.targetFaceInfo = this._content.getTargetFaceInfoBySize();
      this._content.parameters = clonedParameters;
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
      targetFaceInfo: this._content.parameters.targetFaceInfo
    };
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWallUnit;
  }

  getDescription(): string {
    return "移动参数化背景墙单元";
  }
}