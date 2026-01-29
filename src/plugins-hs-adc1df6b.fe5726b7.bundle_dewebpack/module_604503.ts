import { HSCore } from './core';

interface RoofInfo {
  loop: {
    loop: unknown;
  };
}

interface RoofRequestParams {
  meta: unknown;
  layer: unknown;
  loop: unknown;
  roomHeight: number;
  linkWallIds: string[];
  generatedType: HSCore.Model.ParametricRoofGeneratedTypeEnum;
  isPreview: boolean;
}

interface TransactionRequest {
  result: unknown;
}

interface TransactionManager {
  createRequest(type: string, params: RoofRequestParams[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandManager {
  current: Command | null;
}

interface App {
  transManager: TransactionManager;
  cmdManager: CommandManager;
}

interface Command {
  type?: string;
  mgr?: {
    complete(cmd: Command): void;
  };
}

declare namespace HSApp {
  namespace App {
    function getApp(): App;
  }
  namespace Cmd {
    class Command {
      onExecute(): unknown;
      getDescription(): string;
      getCategory(): string;
    }
  }
}

declare namespace HSFPConstants {
  const RequestType: {
    AddRoof: string;
  };
  const CommandType: {
    AddRoof: string;
  };
  const LogGroupTypes: {
    HardOperation: string;
  };
}

/**
 * 创建参数化屋顶预览命令
 */
export default class CreateParametricRoofPreviewCommand extends HSApp.Cmd.Command {
  private readonly _meta: unknown;
  private readonly _layer: unknown;
  private readonly _info: RoofInfo;
  private readonly _roomHeight: number;
  private readonly _linkWallIds: string[];
  private _request?: TransactionRequest;

  constructor(
    meta: unknown,
    layer: unknown,
    info: RoofInfo,
    roomHeight: number,
    linkWallIds: string[]
  ) {
    super();
    this._meta = meta;
    this._layer = layer;
    this._info = info;
    this._roomHeight = roomHeight;
    this._linkWallIds = linkWallIds;
  }

  onExecute(): unknown {
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    this._request = transManager.createRequest(HSFPConstants.RequestType.AddRoof, [
      {
        meta: this._meta,
        layer: this._layer,
        loop: this._info.loop.loop,
        roomHeight: this._roomHeight,
        linkWallIds: this._linkWallIds,
        generatedType: HSCore.Model.ParametricRoofGeneratedTypeEnum.AUTO,
        isPreview: true,
      },
    ]);

    transManager.commit(this._request);

    const result = this._request.result;
    const currentCommand = app.cmdManager.current;

    if (
      currentCommand?.type &&
      currentCommand.type === HSFPConstants.CommandType.AddRoof &&
      currentCommand.mgr
    ) {
      currentCommand.mgr.complete(currentCommand);
    }

    return result;
  }

  getDescription(): string {
    return '创建参数化屋顶-预览';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }
}