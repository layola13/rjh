interface Entity {
  // Define entity structure based on your application
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
  receive(event: string, data: unknown): void;
}

interface App {
  transManager: TransactionManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => Command;
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
  abstract onReceive(event: string, data: unknown): boolean;
}

export default class ChangeWidthCommand extends Command {
  private entities: Entity[];
  private transMgr: TransactionManager;
  private session: Session;

  constructor(entityOrEntities: Entity | Entity[]) {
    super();
    this.entities = Array.isArray(entityOrEntities) ? entityOrEntities : [entityOrEntities];
    this.transMgr = HSApp.App.getApp().transManager;
    this.session = this.transMgr.startSession();
  }

  onExecute(): void {
    // Implementation
  }

  onReceive(event: string, data: unknown): boolean {
    if (event !== "changeWidth") {
      return super.onReceive(event, data);
    }

    this.entities.forEach((entity) => {
      const request = this.transMgr.createRequest(
        HSFPConstants.RequestType.ChangeMoldingSize,
        [entity, "thickness"]
      );
      request.receive("change", data);
      this.transMgr.commit(request);
    });

    return true;
  }

  onComplete(success: boolean): void {
    this.session?.commit();
  }

  getDescription(): string {
    return "改变线条宽";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}