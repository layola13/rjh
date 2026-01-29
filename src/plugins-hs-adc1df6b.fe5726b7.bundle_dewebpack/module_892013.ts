interface RoofMeta {
  // Define based on your application's roof metadata structure
  [key: string]: unknown;
}

interface RoofInfo {
  // Define based on your application's roof info structure
  [key: string]: unknown;
}

interface Layer {
  // Define based on your application's layer structure
  [key: string]: unknown;
}

interface TransactionRequest<T = unknown> {
  result: T;
}

interface TransactionManager {
  createRequest<T = unknown>(
    requestType: string,
    params: unknown[]
  ): TransactionRequest<T>;
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

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new (...args: unknown[]) => Command;
  };
}

interface HSFPConstantsNamespace {
  RequestType: {
    ToggleGenerateRoof: string;
  };
  CommandType: {
    ToggleGenerateRoof: string;
  };
  LogGroupTypes: {
    HardOperation: string;
  };
}

declare const HSApp: HSAppNamespace;
declare const HSFPConstants: HSFPConstantsNamespace;

export default class ToggleGenerateRoofCommand extends HSApp.Cmd.Command {
  private _oldRoof: unknown;
  private _meta: RoofMeta;
  private _layer: Layer;
  private _info: RoofInfo;
  private _roomHeight: number;
  private _linkWallIds: string[];
  private _request?: TransactionRequest;

  constructor(
    oldRoof: unknown,
    meta: RoofMeta,
    layer: Layer,
    info: RoofInfo,
    roomHeight: number,
    linkWallIds: string[]
  ) {
    super();
    this._oldRoof = oldRoof;
    this._meta = meta;
    this._layer = layer;
    this._info = info;
    this._roomHeight = roomHeight;
    this._linkWallIds = linkWallIds;
  }

  /**
   * Execute the toggle generate roof command
   * @returns The result of the transaction request
   */
  onExecute(): unknown {
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    this._request = transManager.createRequest(
      HSFPConstants.RequestType.ToggleGenerateRoof,
      [
        this._oldRoof,
        this._meta,
        this._layer,
        this._info,
        this._roomHeight,
        this._linkWallIds
      ]
    );

    transManager.commit(this._request);

    const result = this._request.result;
    const currentCommand = app.cmdManager.current;

    if (
      currentCommand?.type &&
      currentCommand.type === HSFPConstants.CommandType.ToggleGenerateRoof &&
      currentCommand.mgr
    ) {
      currentCommand.mgr.complete(currentCommand);
    }

    return result;
  }

  /**
   * Get the description of this command
   * @returns Command description in Chinese
   */
  getDescription(): string {
    return "创建参数化屋顶-切换区域预览";
  }

  /**
   * Get the category of this command for logging purposes
   * @returns Command category constant
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}