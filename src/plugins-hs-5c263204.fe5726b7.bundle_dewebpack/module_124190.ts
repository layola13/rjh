interface Group {
  members: any[];
}

interface SelectionManager {
  unselect(target: any): void;
  hasSelected(target: any): boolean;
  select(target: any): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: any[]): Request;
  commit(request: Request): void;
}

interface Request {
  onUndo(): void;
  onRedo(): void;
}

interface Context {
  app: {
    selectionManager: SelectionManager;
  };
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;
  protected _request!: Request;

  abstract onExecute(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

declare namespace HSFPConstants {
  enum RequestType {
    UngroupContents = 'UngroupContents'
  }
  enum LogGroupTypes {
    ContentOperation = 'ContentOperation'
  }
}

declare namespace HSApp.Cmd {
  export { Command };
}

class UngroupCommand extends Command {
  private readonly _group: Group;
  private readonly _members: any[];

  constructor(group: Group) {
    super();
    this._group = group;
    this._members = this._group.members.slice();
  }

  onExecute(): void {
    this.context.app.selectionManager.unselect(this._group);
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.UngroupContents,
      [this._group]
    );
    transactionManager.commit(request);
    this.mgr.complete(this);
  }

  onUndo(): void {
    const selectionManager = this.context.app.selectionManager;
    let hadSelection = false;

    this._members.forEach((member) => {
      if (selectionManager.hasSelected(member)) {
        hadSelection = true;
        selectionManager.unselect(member);
      }
    });

    this._request.onUndo();

    if (hadSelection) {
      selectionManager.select(this._group);
    }
  }

  onRedo(): void {
    this.context.app.selectionManager.unselect(this._group);
    this._request.onRedo();
  }

  getDescription(): string {
    return '解除模型组合';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default UngroupCommand;