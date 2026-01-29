interface TransactionManager {
  createRequest(requestType: string, params: unknown): Request;
  commit(request: Request): void;
}

interface Request {
  result: unknown;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class BaseCommand {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
}

class TransactionCommand extends BaseCommand {
  private requestType: string;
  private params: unknown;
  protected output: unknown;

  constructor(requestType: string, params: unknown) {
    super();
    this.requestType = requestType;
    this.params = params;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(this.requestType, this.params);
    transManager.commit(request);
    this.output = request.result;
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default TransactionCommand;