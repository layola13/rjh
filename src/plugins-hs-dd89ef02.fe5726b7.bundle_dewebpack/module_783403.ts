interface ProductMeta {
  // Define based on your application's product metadata structure
  [key: string]: unknown;
}

interface Face {
  // Define based on your application's face structure
  [key: string]: unknown;
}

type MoldingType = string | number;

interface TransactionManager {
  createRequest(
    requestType: string,
    args: [ProductMeta[] | null, Face, MoldingType]
  ): unknown;
  commit(request: unknown): void;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr?: CommandManager;

  abstract onExecute(): void;
  abstract isInteractive(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

const REQUEST_TYPE_ADD_WALL_FACE_MOLDING = 'AddWallFaceMolding';
const LOG_GROUP_TYPE_FACE_OPERATION = 'FaceOperation';

/**
 * Command for adding or removing molding from a wall face
 */
class CmdAddFaceMolding extends Command {
  private readonly productMetas: ProductMeta[] | null;
  private readonly face: Face;
  private readonly moldingType: MoldingType;

  constructor(
    productMetas: ProductMeta[] | null,
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
      REQUEST_TYPE_ADD_WALL_FACE_MOLDING,
      [this.productMetas, this.face, this.moldingType]
    );
    this.context.transManager.commit(request);
    this.mgr?.complete(this);
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return `${this.productMetas ? '打开' : '关闭'}线条`;
  }

  getCategory(): string {
    return LOG_GROUP_TYPE_FACE_OPERATION;
  }
}

export { CmdAddFaceMolding };