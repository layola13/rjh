import { HSCore } from './HSCore';
import cloneDeep from 'lodash/cloneDeep';

interface TargetFaceInfo {
  outer?: unknown[];
  newOuter?: unknown;
}

interface BackgroundWallParameters {
  targetFaceInfo?: TargetFaceInfo;
  isAutoFit: boolean;
}

interface BackgroundWallEntity {
  parameters: BackgroundWallParameters;
  isScalable: boolean;
  initBackgroundWall(targetFaceInfo: TargetFaceInfo): void;
  initBySize(): void;
}

export class EditParametricBackgroundWallIsAutoFitRequest extends HSCore.Transaction.Common.StateRequest {
  private _entity: BackgroundWallEntity;
  private _isAutoFit: boolean;

  constructor(entity: BackgroundWallEntity, isAutoFit: boolean) {
    super();
    this._entity = entity;
    this._isAutoFit = isAutoFit;
  }

  onCommit(): void {
    this.doRequest();
    super.onCommit();
  }

  doRequest(): void {
    const parameters = cloneDeep(this._entity.parameters);
    
    if (this._isAutoFit) {
      let targetFaceInfo = parameters.targetFaceInfo;
      if (targetFaceInfo) {
        if (targetFaceInfo.outer && Array.isArray(targetFaceInfo.outer) && targetFaceInfo.outer.length === 0) {
          targetFaceInfo = undefined;
        } else if (targetFaceInfo.newOuter) {
          targetFaceInfo.newOuter = undefined;
        }
      }
    }
    
    parameters.isAutoFit = this._isAutoFit;
    this._entity.parameters = parameters;
    this._entity.isScalable = !this._isAutoFit;
    this._doAutoFit();
  }

  private _doAutoFit(): void {
    const targetFaceInfo = this._entity.parameters.targetFaceInfo;
    
    if (!targetFaceInfo) {
      return;
    }
    
    if (this._entity.parameters.isAutoFit) {
      if (!targetFaceInfo.outer) {
        return;
      }
      this._entity.initBackgroundWall(targetFaceInfo);
    } else {
      this._entity.initBySize();
    }
  }

  onUndo(): void {
    super.onUndo();
    this._doAutoFit();
  }

  onRedo(): void {
    super.onRedo();
    this._doAutoFit();
  }

  canTransactField(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWall;
  }

  getDescription(): string {
    return "编辑参数化背景墙适配状态";
  }
}