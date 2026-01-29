interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionRequest {
  // Add specific properties as needed
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

declare namespace HSFPConstants {
  const RequestType: {
    FlipContent: string;
  };
  const LogGroupTypes: {
    ContentOperation: string;
  };
}

declare namespace HSApp.Cmd {
  class Command {
    context: CommandContext;
    mgr: CommandManager;
  }
}

class FlipContentCommand extends HSApp.Cmd.Command {
  private _content: unknown;
  private _request: TransactionRequest | null;

  constructor(content: unknown) {
    super();
    this._content = content;
    this._request = null;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.FlipContent,
      [this._content]
    );
    transManager.commit(this._request);
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "翻转物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default FlipContentCommand;