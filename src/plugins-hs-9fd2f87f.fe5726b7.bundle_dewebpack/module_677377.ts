interface CustomizedModelMeta {
  // Define specific properties based on your domain
  [key: string]: unknown;
}

interface CustomizedModel {
  // Define specific properties based on your domain
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionRequest {
  // Define specific properties based on your domain
  [key: string]: unknown;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  context!: CommandContext;
  mgr?: CommandManager;
  
  abstract onExecute(): void;
}

declare namespace HSApp {
  namespace Util {
    namespace Core {
      function define(namespace: string): typeof HSApp.Util.Core;
    }
  }
  
  namespace Cmd {
    class Command {
      context: CommandContext;
      mgr?: CommandManager;
      onExecute(): void;
    }
  }
}

declare namespace HSFPConstants {
  const RequestType: {
    AddCustomizedModelLightSlot: string;
  };
}

const namespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");

class CmdAddCustomizedModelLightSlot extends HSApp.Cmd.Command {
  private readonly _meta: CustomizedModelMeta;
  private readonly _customizedModel: CustomizedModel;
  private _request?: TransactionRequest;

  constructor(meta: CustomizedModelMeta, customizedModel: CustomizedModel) {
    super();
    this._meta = meta;
    this._customizedModel = customizedModel;
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    this._request = transactionManager.createRequest(
      HSFPConstants.RequestType.AddCustomizedModelLightSlot,
      [this._meta, this._customizedModel]
    );
    transactionManager.commit(this._request);
    this.mgr?.complete(this);
  }
}

namespace.CmdAddCustomizedModelLightSlot = CmdAddCustomizedModelLightSlot;

export default CmdAddCustomizedModelLightSlot;