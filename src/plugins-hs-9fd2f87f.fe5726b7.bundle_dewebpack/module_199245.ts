import { isCopyPasteSupported } from './utils';

interface CutCommandOptions {
  selections: any[];
  userinputPlugin: any;
  floorplan: any;
  app: any;
}

interface TransactionManager {
  startSession(): Transaction;
  createRequest(requestType: string, args: any[]): Request;
  commit(request: Request): void;
}

interface Transaction {
  commit(): void;
}

interface Request {}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  createCommand(commandType: string, args: any[]): Command;
  complete(command: Command): void;
}

interface Command {
  onExecute(): void;
}

export default class CutCommand extends HSApp.Cmd.Command {
  private _selections: any[];
  private _userinputPlugin: any;
  private _floorplan: any;
  private _app: any;
  
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  constructor(options: CutCommandOptions) {
    super();
    this._selections = options.selections;
    this._userinputPlugin = options.userinputPlugin;
    this._floorplan = options.floorplan;
    this._app = options.app;
  }

  onExecute(): void {
    const session = this.context.transManager.startSession();
    
    this.mgr.createCommand(HSFPConstants.CommandType.Copy, [{
      selections: this._selections,
      userinputPlugin: this._userinputPlugin,
      floorplan: this._floorplan,
      app: this._app
    }]).onExecute();
    
    HSApp.Selection.Manager.unselectAll();
    
    this._selections.forEach((selection) => {
      if (isCopyPasteSupported(selection.Class)) {
        const request = this.context.transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [selection]
        );
        this.context.transManager.commit(request);
      }
    });
    
    session.commit();
    this.mgr.complete(this);
  }

  onReceive(): void {}

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "剪切物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}