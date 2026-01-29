import { Command } from 'HSApp/Cmd/Command';
import { TransactionManager, TransactionRequest } from 'HSApp/Transaction';
import { ParametricBackgroundWallContent, TargetFaceInfo } from 'HSApp/ParametricBackgroundWall';

export class CmdEditParametricBackgroundWallIsAutoFit extends Command {
  private _content: ParametricBackgroundWallContent;
  private _request?: TransactionRequest;
  private _isAutoFit: boolean;

  constructor(content: ParametricBackgroundWallContent, isAutoFit: boolean) {
    super();
    this._content = content;
    this._request = undefined;
    this._isAutoFit = isAutoFit;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onComplete(): void {
    this._commitRequest();
    super.onComplete();
  }

  onExecute(): void {
    const transManager: TransactionManager = this.context.transManager;
    
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.EditParametricBackgroundWallIsAutoFit,
      [this._content, this._isAutoFit]
    );

    if (this._isAutoFit) {
      const targetFaceInfo: TargetFaceInfo | undefined = this._content.parameters.targetFaceInfo;
      if (!targetFaceInfo) {
        return;
      }
      this._showLimitTip(targetFaceInfo);
    }
  }

  private _showLimitTip(faceInfo: TargetFaceInfo): void {
    const app = HSApp.App.getApp();
    const sizeLimitUnlocked = app.designMetadata.get("sizeLimitUnlock");
    
    if (sizeLimitUnlocked) {
      return;
    }

    if (faceInfo?.outer) {
      const isSizeInRange = this._content.isSizeInRangeByTargetFaceInfo(faceInfo);
      if (!isSizeInRange) {
        const TOOLTIP_DURATION_MS = 5000;
        LiveHint.show(
          ResourceManager.getString("plugin_parametric_background_limittip"),
          TOOLTIP_DURATION_MS,
          undefined,
          {
            canclose: true,
            status: LiveHint.statusEnum.warning
          }
        );
      }
    }
  }

  getDescription(): string {
    return "编辑参数化背景墙适配状态";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWall;
  }
}