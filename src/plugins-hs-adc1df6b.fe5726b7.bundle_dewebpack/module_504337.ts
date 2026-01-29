interface Roof {
  // Define roof properties based on your application
  [key: string]: unknown;
}

interface Request {
  result: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface CommandManager {
  current: Command | null;
}

interface Command {
  type?: string;
  mgr: {
    complete(command: Command): void;
  };
}

interface App {
  transManager: TransactionManager;
  cmdManager: CommandManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => BaseCommand;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    EndRoofPreview: string;
  };
  CommandType: {
    EndRoofPreview: string;
  };
  LogGroupTypes: {
    HardOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class BaseCommand {
  abstract onExecute(): unknown;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

/**
 * Command for ending parametric roof preview
 */
export default class EndRoofPreviewCommand extends BaseCommand {
  private readonly _roof: Roof;
  private _request?: Request;

  constructor(roof: Roof) {
    super();
    this._roof = roof;
  }

  onExecute(): unknown {
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    this._request = transManager.createRequest(
      HSFPConstants.RequestType.EndRoofPreview,
      [this._roof]
    );
    transManager.commit(this._request);

    const result = this._request.result;
    const currentCommand = app.cmdManager.current;

    if (
      currentCommand?.type &&
      currentCommand.type === HSFPConstants.CommandType.EndRoofPreview
    ) {
      currentCommand.mgr.complete(currentCommand);
    }

    return result;
  }

  getDescription(): string {
    return "创建参数化屋顶-结束预览";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}