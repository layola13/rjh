interface Entity {
  // Define properties based on actual entity structure
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Session {
  commit(): void;
}

interface Request {
  receive(action: string, data: unknown): void;
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
  abstract onReceive(action: string, data: unknown): boolean;
  abstract onComplete(success: boolean): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export default class ChangeHeightCommand extends Command {
  private entities: Entity[];
  private transMgr: TransactionManager;
  private session: Session;
  private requests: Request[];

  constructor(entityOrEntities: Entity | Entity[]) {
    super();
    this.entities = Array.isArray(entityOrEntities) ? entityOrEntities : [entityOrEntities];
    this.transMgr = HSApp.App.getApp().transManager;
    this.session = this.transMgr.startSession();
    this.requests = [];
  }

  onExecute(): void {
    this.entities.forEach((entity) => {
      const request = this.transMgr.createRequest(
        HSFPConstants.RequestType.ChangeMoldingSize,
        [entity, "height"]
      );
      this.requests.push(request);
    });
  }

  onReceive(action: string, data: unknown): boolean {
    if (action !== "changeHeight") {
      return super.onReceive(action, data);
    }

    this.requests.forEach((request) => {
      request.receive("change", data);
    });

    return true;
  }

  onComplete(success: boolean): void {
    this.requests.forEach((request) => {
      this.transMgr.commit(request);
    });

    this.requests = [];
    this.session?.commit();
  }

  getDescription(): string {
    return "改变线条高";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}