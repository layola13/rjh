interface Entity {
  thickness: number;
  height: number;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  // Request structure would be defined based on actual usage
}

interface App {
  getApp(): {
    transManager: TransactionManager;
  };
}

interface HSFPConstants {
  RequestType: {
    ChangeMoldingSize: string;
  };
}

interface HSApp {
  App: App;
  Cmd: {
    Command: new () => Command;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;

abstract class Command {
  abstract onExecute(): void;
  abstract onReceive(key: string, value: unknown): boolean;
  abstract complete(param: unknown): void;
}

export default class MoldingSizeCommand extends Command {
  private entity: Entity;
  private transMgr: TransactionManager;
  private _request: Request;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
    this.transMgr = HSApp.App.getApp().transManager;
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ChangeMoldingSize,
      [this.entity, "thickness"]
    );
  }

  onExecute(): void {
    // Implementation pending
  }

  onReceive(key: string, value: unknown): boolean {
    switch (key) {
      case "changeWidth":
        this.entity.thickness = value as number;
        break;
      case "changeHeight":
        this.entity.height = value as number;
        break;
      default:
        return super.onReceive(key, value);
    }
    return true;
  }

  complete(param: unknown): void {
    super.complete(param);
    this.transMgr.commit(this._request);
  }
}