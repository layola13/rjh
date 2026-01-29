interface ProductMeta {
  // Define based on your product metadata structure
  [key: string]: unknown;
}

interface Face {
  // Define based on your face structure
  [key: string]: unknown;
}

enum MoldingType {
  // Define based on your molding types
}

interface TransactionManager {
  createRequest(
    requestType: RequestType,
    params: [ProductMeta[], Face, MoldingType]
  ): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionRequest {
  // Define based on your transaction request structure
  [key: string]: unknown;
}

enum RequestType {
  AddWallMolding = 'AddWallMolding'
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr?: CommandManager;

  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
}

/**
 * Command for adding wall molding to a face
 */
export default class AddWallMoldingCommand extends Command {
  private readonly productMetas: ProductMeta[];
  private readonly face: Face;
  private readonly moldingType: MoldingType;

  constructor(
    productMetas: ProductMeta[],
    face: Face,
    moldingType: MoldingType
  ) {
    super();
    this.productMetas = productMetas;
    this.face = face;
    this.moldingType = moldingType;
  }

  onExecute(): void {
    const request = this.context.transManager.createRequest(
      RequestType.AddWallMolding,
      [this.productMetas, this.face, this.moldingType]
    );
    this.context.transManager.commit(request);
    this.mgr?.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }
}