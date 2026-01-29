interface BeamTypeChangeParams {
  isPrimaryBeam: boolean;
}

interface TransactionRequest {
  // Define based on your transaction manager implementation
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
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
    Command: new (...args: unknown[]) => Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    ChangeBeamType: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class Command {
  abstract onExecute(params: unknown): void;
  abstract onReceive(e: unknown, n: unknown): boolean;
  abstract onComplete(): void;
  abstract getMode(): string;
}

export class CmdChangeBeamType extends Command {
  private _isPrimaryBeam: boolean = false;
  private _request!: TransactionRequest;
  private beam: unknown;
  private transMgr: TransactionManager;

  constructor(beam: unknown) {
    super();
    this.beam = beam;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(params: BeamTypeChangeParams): void {
    this._isPrimaryBeam = params.isPrimaryBeam;
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ChangeBeamType,
      [this.beam, params.isPrimaryBeam]
    );
  }

  onReceive(e: unknown, n: unknown): boolean {
    return super.onReceive(e, n);
  }

  onComplete(): void {
    this.transMgr.commit(this._request);
  }

  getMode(): string {
    return this._isPrimaryBeam ? "primary" : "secondary";
  }
}