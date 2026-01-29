interface Entity {
  // Define based on actual entity structure
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(requestType: string, entities: Entity[]): Request;
  commit(request: Request): void;
}

interface Session {
  // Define based on actual session structure
  [key: string]: unknown;
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
    Command: new (...args: unknown[]) => Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    ChangeMoldingAutofit: string;
  };
  LogGroupTypes: {
    FaceOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class Command {
  onReceive?(event: string, data: unknown): boolean;
}

class ChangeMoldingAutofitCommand extends Command {
  private readonly face: unknown;
  private readonly entities: Entity[];
  private readonly transMgr: TransactionManager;
  private readonly session: Session;
  private _request?: Request;

  constructor(face: unknown, entities: Entity | Entity[]) {
    super();
    this.face = face;
    this.entities = Array.isArray(entities) ? entities : [entities];
    this.transMgr = HSApp.App.getApp().transManager;
    this.session = this.transMgr.startSession();
  }

  onExecute(): void {
    // Implementation
  }

  onReceive(event: string, data: unknown): boolean {
    if (event !== "changeAutofit") {
      return super.onReceive?.(event, data) ?? false;
    }

    this.entities.forEach((entity) => {
      const request = this.transMgr.createRequest(
        HSFPConstants.RequestType.ChangeMoldingAutofit,
        [entity]
      );
      request.receive(event, data);
      this.transMgr.commit(request);
    });

    return true;
  }

  onComplete(result: unknown): void {
    if (this._request) {
      this.transMgr.commit(this._request);
    }
  }

  getDescription(): string {
    return "自动调整距顶高度";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}

export default ChangeMoldingAutofitCommand;