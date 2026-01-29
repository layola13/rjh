interface LightSlot {
  // Define properties based on your application's light slot structure
  id?: string;
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  // Define request properties based on your application
  type: string;
  params: unknown[];
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

declare namespace HSApp {
  namespace Cmd {
    class Command {
      context: CommandContext;
      mgr?: CommandManager;
    }
  }
  namespace Util {
    namespace Core {
      function define(namespace: string): Record<string, unknown>;
    }
  }
}

declare namespace HSFPConstants {
  const RequestType: {
    DeleteCustomizedModelLightSlot: string;
  };
}

class CmdDeleteCustomizedModelLightSlot extends HSApp.Cmd.Command {
  private readonly _lightSlot: LightSlot;
  private _request?: Request;

  constructor(lightSlot: LightSlot) {
    super();
    this._lightSlot = lightSlot;
  }

  /**
   * Executes the command to delete a customized model light slot
   */
  onExecute(): void {
    const transactionManager = this.context.transManager;
    this._request = transactionManager.createRequest(
      HSFPConstants.RequestType.DeleteCustomizedModelLightSlot,
      [this._lightSlot]
    );
    transactionManager.commit(this._request);
    
    this.mgr?.complete(this);
  }
}

const commandRegistry = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");
commandRegistry.CmdDeleteCustomizedModelLightSlot = CmdDeleteCustomizedModelLightSlot;

export default CmdDeleteCustomizedModelLightSlot;