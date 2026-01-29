interface IGroup {
  // Define based on your actual group structure
  [key: string]: unknown;
}

interface IContext {
  app: {
    selectionManager: {
      unselect(group: IGroup): void;
    };
  };
  transManager: ITransactionManager;
}

interface ITransactionManager {
  createRequest(type: string, args: unknown[]): IRequest;
  commit(request: IRequest): void;
}

interface IRequest {
  onUndo(): void;
  onRedo(): void;
}

interface ICommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: IContext;
  protected mgr!: ICommandManager;

  abstract onExecute(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

declare namespace HSFPConstants {
  enum RequestType {
    DeleteAssembly = 'DeleteAssembly'
  }
  
  enum LogGroupTypes {
    ContentOperation = 'ContentOperation'
  }
}

declare namespace HSApp.Cmd {
  export { Command };
}

export default class DeleteAssemblyCommand extends Command {
  private readonly _group: IGroup;
  private _request!: IRequest;

  constructor(group: IGroup) {
    super();
    this._group = group;
  }

  onExecute(): void {
    this.context.app.selectionManager.unselect(this._group);
    
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.DeleteAssembly,
      [this._group]
    );
    
    this._request = request;
    transManager.commit(request);
    this.mgr.complete(this);
  }

  onUndo(): void {
    this._request.onUndo();
  }

  onRedo(): void {
    this._request.onRedo();
  }

  getDescription(): string {
    return "删除模型组合";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}