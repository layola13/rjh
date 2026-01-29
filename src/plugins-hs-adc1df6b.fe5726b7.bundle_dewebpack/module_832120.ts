interface RoofMeta {
  [key: string]: unknown;
}

interface TransactionRequest {
  result: unknown;
}

interface TransactionManager {
  createRequest(type: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Command {
  type?: string;
  mgr?: {
    complete(command: Command): void;
  };
}

interface CommandManager {
  current?: Command;
}

interface App {
  transManager: TransactionManager;
  cmdManager: CommandManager;
}

declare namespace HSApp {
  namespace App {
    function getApp(): App;
  }
  namespace Cmd {
    class Command {
      onExecute?(): unknown;
      getDescription?(): string;
      getCategory?(): string;
    }
  }
}

declare namespace HSFPConstants {
  const RequestType: {
    ReplaceRoof: string;
  };
  const CommandType: {
    ReplaceRoof: string;
  };
  const LogGroupTypes: {
    HardOperation: string;
  };
}

/**
 * Command for replacing a parametric roof
 */
export default class ReplaceRoofCommand extends HSApp.Cmd.Command {
  private _oldRoof: unknown;
  private _meta: RoofMeta;
  private _request?: TransactionRequest;

  constructor(oldRoof: unknown, meta: RoofMeta) {
    super();
    this._oldRoof = oldRoof;
    this._meta = meta;
  }

  onExecute(): unknown {
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    this._request = transManager.createRequest(
      HSFPConstants.RequestType.ReplaceRoof,
      [this._oldRoof, this._meta]
    );
    transManager.commit(this._request);

    const result = this._request.result;
    const currentCommand = app.cmdManager.current;

    if (
      currentCommand?.type === HSFPConstants.CommandType.ReplaceRoof &&
      currentCommand.mgr
    ) {
      currentCommand.mgr.complete(currentCommand);
    }

    return result;
  }

  getDescription(): string {
    return "替换参数化屋顶";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}