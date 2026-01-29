interface Molding {
  parent: Face;
}

interface Face {
  // Define Face structure based on your application
}

interface TransactionManager {
  startSession(): Session;
  createRequest(requestType: string, params: [Face, Molding]): Request;
  commit(request: Request): void;
}

interface Session {
  commit(): void;
}

interface Request {
  // Define Request structure
}

interface Context {
  transManager: TransactionManager;
}

abstract class Command {
  protected context!: Context;
  abstract onExecute(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdDeleteFaceMolding extends Command {
  private moldings: Molding[];
  private face: Face;

  constructor(moldings: Molding[]) {
    super();
    this.face = moldings[0].parent;
    this.moldings = moldings;
  }

  /**
   * Execute the delete face molding command
   */
  onExecute(): void {
    const transManager = this.context.transManager;
    const session = transManager.startSession();

    this.moldings.forEach((molding) => {
      const request = transManager.createRequest(
        HSFPConstants.RequestType.DeleteWallFaceMolding,
        [this.face, molding]
      );
      this.context.transManager.commit(request);
    });

    session.commit();
  }

  /**
   * Get command description
   */
  getDescription(): string {
    return "删除线条";
  }

  /**
   * Get command category
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}