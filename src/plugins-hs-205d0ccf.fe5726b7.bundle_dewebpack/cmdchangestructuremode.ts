import { Command } from './Command';

interface WallPartModeParams {
  wallpartmode: unknown;
}

interface TransactionRequest {
  // Define the structure based on your transaction manager implementation
}

interface TransactionManager {
  createRequest(requestType: number, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface App {
  transManager: TransactionManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: typeof Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    ChangeStructureMode: number;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

/**
 * Command to change structure mode
 */
export class CmdChangeStructureMode extends Command {
  private structure: unknown;
  private transMgr: TransactionManager;
  private _request?: TransactionRequest;

  constructor(structure: unknown) {
    super();
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(params: WallPartModeParams): void {
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ChangeStructureMode,
      [this.structure, params.wallpartmode]
    );
  }

  onReceive(e: unknown, n: unknown): boolean {
    return super.onReceive?.(e, n) ?? true;
  }

  onComplete(): void {
    if (this._request) {
      this.transMgr.commit(this._request);
    }
  }
}