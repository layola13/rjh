import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { ClipTaskIntegration } from './ClipTaskIntegration';

interface EditOptions {
  clip: boolean;
}

type ContentType = 
  | HSCore.Model.NCustomizedParametricBackgroundWall 
  | HSCore.Model.NCustomizedParametricBackgroundWallUnit;

interface RequestType {
  EditNCPBackgroundWallBase: string;
}

interface TransactionRequest {
  receive(eventName: string, data: unknown): void;
}

interface TransactionManager {
  createRequest(requestType: string, content: ContentType[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

export class CmdEditNCPBackgroundWallBase extends HSApp.Cmd.Command {
  private _content: ContentType;
  private _requestType: string;
  private _request?: TransactionRequest;
  private _options: EditOptions;

  constructor(content: ContentType, options: EditOptions = { clip: false }) {
    super();
    this._content = content;
    this._requestType = HSFPConstants.RequestType.EditNCPBackgroundWallBase;
    this._request = undefined;
    this._options = options;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onComplete(): void {
    const clipTaskIntegration = ClipTaskIntegration.getInstance();
    
    if (this._options.clip) {
      clipTaskIntegration.listenClipTaskSignal();
      clipTaskIntegration.runClipTaskDefer(
        () => this._commitRequest(),
        clipTaskIntegration.isNeedShowUI(this._content)
      );
    } else {
      clipTaskIntegration.unlistenClipTaskSignal();
      this._commitRequest();
    }
    
    super.onComplete([{}]);
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(this._requestType, [this._content]);
  }

  onReceive(eventName: string, data: unknown): boolean {
    const clipTaskIntegration = ClipTaskIntegration.getInstance();
    clipTaskIntegration.unlistenClipTaskSignal();
    clipTaskIntegration.listenClipTaskSignal();

    if (eventName === 'onReset') {
      HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(this._content.seekId).then(() => {
        this._request?.receive(eventName, data);
      });
      return true;
    } else {
      this._request?.receive(eventName, data);
      return !!super.onReceive(eventName, data);
    }
  }

  getCategory(): string {
    return this._content instanceof HSCore.Model.NCustomizedParametricBackgroundWall
      ? HSFPConstants.LogGroupTypes.ParametricBackgroundWall
      : HSFPConstants.LogGroupTypes.ParametricBackgroundWallUnit;
  }

  getDescription(): string {
    return this._content instanceof HSCore.Model.NCustomizedParametricBackgroundWall
      ? '编辑参数化背景墙'
      : '编辑参数化单元';
  }
}