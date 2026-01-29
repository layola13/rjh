interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(cmd: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr?: CommandManager;
  
  abstract onExecute(): void;
}

class CmdDeleteCustomizedModelMolding extends Command {
  private readonly _molding: unknown;
  private _request?: unknown;

  constructor(molding: unknown) {
    super();
    this._molding = molding;
  }

  public onExecute(): void {
    const transManager = this.context.transManager;
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.DeleteCustomizedModelMolding,
      [this._molding]
    );
    transManager.commit(this._request);
    
    if (this.mgr) {
      this.mgr.complete(this);
    }
  }
}

const namespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");
namespace.CmdDeleteCustomizedModelMolding = CmdDeleteCustomizedModelMolding;

export default CmdDeleteCustomizedModelMolding;