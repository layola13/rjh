import { HSApp } from './HSApp';

interface TransactionSession {
  commit(options?: { mergeRequest?: boolean }): void;
}

interface TransactionRequest {
  // Request type placeholder
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface AppContext {
  transManager: TransactionManager;
  app: {
    cmdManager: {
      complete(command: Command): void;
    };
  };
}

interface Command {
  context: AppContext;
  onExecute(): void;
  getCategory(): string;
  getDescription(): string;
}

declare const HSFPConstants: {
  RequestType: {
    RemoveConcealedWork: string;
    ResetLayerIndex: string;
  };
  LogGroupTypes: {
    LayerOperation: string;
  };
};

export class CmdResetLayerIndex extends HSApp.Cmd.Command {
  private readonly targetLayer: unknown;
  private readonly newPreLayer: unknown;
  private readonly newNextLayer: unknown;
  private _request?: TransactionRequest;
  private _session?: TransactionSession;

  constructor(targetLayer: unknown, newPreLayer: unknown, newNextLayer: unknown) {
    super();
    this.targetLayer = targetLayer;
    this.newPreLayer = newPreLayer;
    this.newNextLayer = newNextLayer;
  }

  onExecute(): void {
    this._session = this.context.transManager.startSession();
    
    const removeConcealedWorkRequest = this.context.transManager.createRequest(
      HSFPConstants.RequestType.RemoveConcealedWork,
      []
    );
    this.context.transManager.commit(removeConcealedWorkRequest);
    
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ResetLayerIndex,
      [this.targetLayer, this.newPreLayer, this.newNextLayer]
    );
    this.context.transManager.commit(this._request);
    
    this._session.commit({ mergeRequest: true });
    this.context.app.cmdManager.complete(this);
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }

  getDescription(): string {
    return "拖动楼层顺序";
  }
}