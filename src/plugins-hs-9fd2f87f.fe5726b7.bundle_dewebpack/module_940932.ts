interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
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
}

declare const HSApp: {
  Util: {
    Core: {
      define(namespace: string): Record<string, unknown>;
    };
  };
  Cmd: {
    Command: typeof Command;
  };
};

declare const HSFPConstants: {
  RequestType: {
    DeleteCustomizedModelLightBand: string;
  };
};

class CmdDeleteCustomizedModelLightBand extends Command {
  private readonly _lightBand: unknown;
  private _request?: unknown;

  constructor(lightBand: unknown) {
    super();
    this._lightBand = lightBand;
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    this._request = transactionManager.createRequest(
      HSFPConstants.RequestType.DeleteCustomizedModelLightBand,
      [this._lightBand]
    );
    transactionManager.commit(this._request);
    
    if (this.mgr) {
      this.mgr.complete(this);
    }
  }
}

const namespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");
namespace.CmdDeleteCustomizedModelLightBand = CmdDeleteCustomizedModelLightBand;

export default CmdDeleteCustomizedModelLightBand;