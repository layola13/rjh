interface TransactionRequest {
  commit(): void;
  onUndo(): void;
  onRedo(): void;
}

interface Content {
  id?: string;
  [key: string]: unknown;
}

interface SelectionManager {
  unselect(content: Content): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: Content[]): TransactionRequest;
}

interface AppContext {
  app: {
    selectionManager: SelectionManager;
  };
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: AppContext;
  protected mgr?: CommandManager;

  abstract onExecute(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class DeleteProductCommand extends Command {
  private readonly _content: Content;
  private _request!: TransactionRequest;

  constructor(content: Content) {
    super();
    this._content = content;
  }

  onExecute(): void {
    this.context.app.selectionManager.unselect(this._content);
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.DeleteProduct,
      [this._content]
    );
    this._request.commit();
    this.mgr?.complete(this);
  }

  onUndo(): void {
    this._request.onUndo();
  }

  onRedo(): void {
    this._request.onRedo();
  }

  getDescription(): string {
    return "删除物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default DeleteProductCommand;