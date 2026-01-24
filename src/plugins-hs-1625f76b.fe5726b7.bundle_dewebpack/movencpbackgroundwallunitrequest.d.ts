import { default as BaseRequest } from './BaseRequest'; // Assuming c.default is a base class

/**
 * Face information structure for background wall targeting
 */
interface TargetFaceInfo {
  /** Outer boundary geometry */
  outer?: unknown;
  /** Array of hole geometries */
  holes?: unknown[];
  /** Depth parameter */
  D?: number;
}

/**
 * Content parameters structure
 */
interface ContentParameters {
  targetFaceInfo?: TargetFaceInfo;
}

/**
 * Content interface representing the background wall unit
 */
interface BackgroundWallContent {
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

/**
 * Previous state data for undo/redo operations
 */
interface PreviousStateData {
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

/**
 * Request class for moving Non-Compartment Parametric (NCP) background wall units.
 * Handles position updates, state management, and geometry recalculation.
 */
export class MoveNCPBackgroundWallUnitRequest extends BaseRequest {
  private _targetFaceInfo?: TargetFaceInfo;
  private _content!: BackgroundWallContent;
  private _previous!: PreviousStateData;
  private _next: any;

  /**
   * Creates a new move request for a background wall unit
   * 
   * @param content - The background wall content to move
   * @param param2 - Second parameter (type to be determined)
   * @param param3 - Third parameter (type to be determined)
   * @param param4 - Optional boolean flag (default: false)
   * @param param5 - Optional boolean flag (default: true)
   * @param param7 - Target face information for the move operation
   */
  constructor(
    content: BackgroundWallContent,
    param2: unknown,
    param3: unknown,
    param4: boolean = false,
    param5: boolean = true,
    param6?: unknown,
    param7?: TargetFaceInfo
  ) {
    super(content, param2, param3, param4, param5);
    this._targetFaceInfo = param7;
  }

  /**
   * Performs customized move logic based on redo state and target face information.
   * Updates background wall geometry and triggers necessary recalculations.
   * 
   * @param isRedo - Whether this is a redo operation
   */
  customizedMove(isRedo?: boolean): void {
    if (isRedo) {
      this._content.initBackgroundWall(this._next.targetFaceInfo);
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
      const clonedParams = _.cloneDeep(this._content.parameters);
      clonedParams.targetFaceInfo = this._content.getTargetFaceInfoBySize();
      this._content.parameters = clonedParams;
    }

    this._content.dirtyClipGeometry();
    this._content.dirtyFaceMaterials();
    this._content.dirtyChildModels(true, true, true);
  }

  /**
   * Saves current state data for potential restoration (undo operation)
   * @private
   */
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

  /**
   * Gets the log category for this operation
   * @returns Log group type constant
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWallUnit;
  }

  /**
   * Gets human-readable description of this operation
   * @returns Chinese description string
   */
  getDescription(): string {
    return "移动参数化背景墙单元";
  }
}