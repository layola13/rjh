interface RoofInfo {
  [key: string]: unknown;
}

interface TransactionRequest {
  result: unknown;
}

interface TransactionManager {
  createRequest(type: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandManager {
  current: Command | null;
}

interface Command {
  type?: string;
  mgr?: {
    complete(command: Command): void;
  };
}

interface AppContext {
  transManager: TransactionManager;
}

interface HSAppInstance {
  transManager: TransactionManager;
  cmdManager: CommandManager;
}

interface HSAppNamespace {
  App: {
    getApp(): HSAppInstance;
  };
  Cmd: {
    Command: new () => BaseCommand;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    ChangeRoofParam: string;
  };
  CommandType: {
    ChangeRoofParam: string;
  };
  LogGroupTypes: {
    HardOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

abstract class BaseCommand {
  context!: AppContext;
  abstract onExecute(): unknown;
  abstract onComplete(args: unknown[]): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class ClipTaskIntegration {
  private static instance: ClipTaskIntegration;

  static getInstance(): ClipTaskIntegration {
    if (!ClipTaskIntegration.instance) {
      ClipTaskIntegration.instance = new ClipTaskIntegration();
    }
    return ClipTaskIntegration.instance;
  }

  listenClipTaskSignal(): void {
    // Implementation placeholder
  }

  runClipTaskDefer(callback: () => void, showUI: boolean): void {
    // Implementation placeholder
    callback();
  }

  isNeedShowUI(roof: unknown): boolean {
    // Implementation placeholder
    return false;
  }
}

export default class ChangeRoofParamCommand extends BaseCommand {
  private _roof: unknown;
  private _request?: TransactionRequest;
  private _infos: RoofInfo;

  constructor(roof: unknown, infos: RoofInfo) {
    super();
    this._roof = roof;
    this._infos = infos;
  }

  onExecute(): unknown {
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    this._request = transManager.createRequest(
      HSFPConstants.RequestType.ChangeRoofParam,
      [this._roof, this._infos]
    );

    const result = this._request.result;
    const currentCommand = app.cmdManager.current;

    if (
      currentCommand?.type &&
      currentCommand.type === HSFPConstants.CommandType.ChangeRoofParam &&
      currentCommand.mgr
    ) {
      currentCommand.mgr.complete(currentCommand);
    }

    return result;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onComplete(args: unknown[]): void {
    const clipTask = ClipTaskIntegration.getInstance();
    clipTask.listenClipTaskSignal();
    clipTask.runClipTaskDefer(
      () => this._commitRequest(),
      clipTask.isNeedShowUI(this._roof)
    );

    super.onComplete?.(args);
  }

  getDescription(): string {
    return "修改屋顶参数";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}