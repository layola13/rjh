import { HSApp } from './HSApp';

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {
  // Request details would be defined based on actual usage
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface Entity {
  // Entity properties would be defined based on actual structure
}

export class CmdRotateMoldingTexture extends HSApp.Cmd.Command {
  private readonly entities: Entity[];

  constructor(entityOrEntities: Entity | Entity[]) {
    super();
    this.entities = Array.isArray(entityOrEntities) ? entityOrEntities : [entityOrEntities];
  }

  canUndoRedo(): boolean {
    return false;
  }

  onExecute(): void {
    const transactionManager: TransactionManager = this.context.transManager;
    const session: TransactionSession = transactionManager.startSession();
    
    this.entities.forEach((entity: Entity) => {
      const request: TransactionRequest = transactionManager.createRequest(
        HSFPConstants.RequestType.RotateMoldingTexture,
        [entity]
      );
      transactionManager.commit(request);
    });
    
    session.commit();
  }

  getDescription(): string {
    return "旋转石膏线/踢脚线材质";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}