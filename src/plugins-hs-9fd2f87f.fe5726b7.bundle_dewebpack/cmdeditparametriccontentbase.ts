import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

type ParametricContent = 
  | HSCore.Model.ParametricBathroomCabinet 
  | HSCore.Model.ParametricCurtain 
  | HSCore.Model.ParametricContentBase;

interface TransactionManager {
  commit(request: TransactionRequest): void;
  createRequest(requestType: string, contents: ParametricContent[]): TransactionRequest;
}

interface TransactionRequest {
  receive(event: string, data: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface Command {
  context: CommandContext;
  onComplete(args: unknown[]): void;
  onReceive(event: string, data: unknown): boolean;
}

export class CmdEditParametricContentBase extends HSApp.Cmd.Command implements Command {
  private _content: ParametricContent;
  private _requestType: string;
  private _request?: TransactionRequest;

  constructor(content: ParametricContent) {
    super();
    this._content = content;
    this._requestType = HSFPConstants.RequestType.EditParametricContentBase;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onComplete(): void {
    this._commitRequest();
    super.onComplete([{}]);
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    this._request = transactionManager.createRequest(
      this._requestType,
      [this._content]
    );
  }

  onReceive(event: string, data: unknown): boolean {
    if (event === 'onReset') {
      HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(
        this._content.seekId
      ).then(() => {
        this._request?.receive(event, data);
      });
      return true;
    }

    this._request?.receive(event, data);
    return super.onReceive(event, data);
  }

  getCategory(): string {
    if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return HSFPConstants.LogGroupTypes.ParametricBathroomCabinet;
    }
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return HSFPConstants.LogGroupTypes.ParametricCurtain;
    }
    return HSFPConstants.LogGroupTypes.ParametricContentBase;
  }

  getDescription(): string {
    if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return '编辑参数化浴室柜';
    }
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return '编辑参数化窗帘';
    }
    return '编辑参数化软装';
  }
}