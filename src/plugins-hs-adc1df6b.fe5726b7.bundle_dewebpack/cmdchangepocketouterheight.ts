interface Entity {
  // Define based on your application's entity structure
  [key: string]: any;
}

interface TransactionManager {
  createRequest(requestType: string, params: any[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionRequest {
  receive(action: string, data: any): void;
}

interface App {
  transManager: TransactionManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new (...args: any[]) => Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    ChangeMoldingSize: string;
  };
  LogGroupTypes: {
    FaceOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class Command {
  abstract onExecute(): void;
  abstract onReceive(event: string, data: any): boolean;
  abstract onComplete(result: any): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdChangePocketOuterHeight extends HSApp.Cmd.Command {
  private entity: Entity;
  private transMgr: TransactionManager;
  private _request: TransactionRequest;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
    this.transMgr = HSApp.App.getApp().transManager;
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ChangeMoldingSize,
      [this.entity, "outerHeight"]
    );
  }

  onExecute(): void {
    // Implementation
  }

  onReceive(event: string, data: any): boolean {
    if (event !== "changeHeight") {
      return super.onReceive(event, data);
    }
    this._request.receive("change", data);
    return true;
  }

  onComplete(result: any): void {
    this.transMgr.commit(this._request);
  }

  getDescription(): string {
    return "改变线条高";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}

export default class CmdChangePocketOuterWidth extends HSApp.Cmd.Command {
  private entity: Entity;
  private transMgr: TransactionManager;
  private _request: TransactionRequest;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
    this.transMgr = HSApp.App.getApp().transManager;
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ChangeMoldingSize,
      [this.entity, "outerThickness"]
    );
  }

  onExecute(): void {
    // Implementation
  }

  onReceive(event: string, data: any): boolean {
    if (event !== "changeWidth") {
      return super.onReceive(event, data);
    }
    this._request.receive("change", data);
    return true;
  }

  onComplete(result: any): void {
    this.transMgr.commit(this._request);
  }

  getDescription(): string {
    return "改变线条宽";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}