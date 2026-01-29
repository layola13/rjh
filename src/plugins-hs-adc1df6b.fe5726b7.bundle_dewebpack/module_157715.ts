interface Entity {
  // Define based on your HSFPConstants.RequestType requirements
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(requestType: string, entities: Entity[]): Request;
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
    ChangeMoldingOffset: string;
  };
  LogGroupTypes: {
    FaceOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class Command {
  onReceive?(action: string, data: unknown): boolean;
}

class ChangeMoldingOffsetCommand extends Command {
  private readonly face: unknown;
  private readonly entities: Entity[];
  private readonly transMgr: TransactionManager;
  private readonly session: Session;

  constructor(face: unknown, entityOrEntities: Entity | Entity[]) {
    super();
    this.face = face;
    this.entities = Array.isArray(entityOrEntities) ? entityOrEntities : [entityOrEntities];
    this.transMgr = HSApp.App.getApp().transManager;
    this.session = this.transMgr.startSession();
  }

  onExecute(): void {
    // Implementation placeholder
  }

  onReceive(action: string, data: unknown): boolean {
    if (action !== 'changeOffset') {
      return super.onReceive?.(action, data) ?? false;
    }

    this.entities.forEach((entity) => {
      const request = this.transMgr.createRequest(
        HSFPConstants.RequestType.ChangeMoldingOffset,
        [entity]
      );
      request.receive(action, data);
      this.transMgr.commit(request);
    });

    return true;
  }

  onComplete(result: unknown): void {
    this.session?.commit();
  }

  getDescription(): string {
    return '距顶高度';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}

export default ChangeMoldingOffsetCommand;