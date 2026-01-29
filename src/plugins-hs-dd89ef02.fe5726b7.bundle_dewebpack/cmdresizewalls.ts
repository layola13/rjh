import { WallEditHook } from './WallEditHook';

interface TransactionSession {
  commit(): void;
  abort(): void;
}

interface TransactionRequest {
  receive(event: string, data: unknown): void;
}

interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest, immediate?: boolean): void;
}

interface CommandContext {
  transManager: TransactionManager;
  app: {
    cmdManager: CommandManager;
    errorLogger: ErrorLogger;
  };
}

interface CommandManager {
  isFreezed: boolean;
  freezeProcess(): void;
  unfreezeProcess(): void;
  complete(command: Command): void;
}

interface ErrorLogger {
  push(message: string, details: ErrorDetails): void;
}

interface ErrorDetails {
  errorStack?: string;
  description: string;
  errorInfo: {
    info: Error;
    path: {
      file: string;
      functionName: string;
    };
  };
}

interface SliderDragData {
  name?: string;
  [key: string]: unknown;
}

interface WallEditCompleteParams {
  changedWalls: unknown[];
}

declare namespace HSFPConstants {
  enum RequestType {
    ResizeTgWalls = 'ResizeTgWalls',
    ResizeWalls = 'ResizeWalls'
  }
  enum LogGroupTypes {
    WallOperation = 'WallOperation'
  }
}

declare namespace HSApp {
  namespace Cmd {
    abstract class Command {
      protected context: CommandContext;
      protected mgr: CommandManager;
      abstract onExecute(): void;
      abstract onReceive(event: string, data: unknown): boolean;
      abstract onCleanup(): void;
      abstract isInteractive(): boolean;
      abstract getDescription(): string;
      abstract getCategory(): string;
    }
  }
  namespace Util {
    namespace LoggerUtil {
      function actionTrackStart(key: string, description: string, flag: boolean): void;
      function actionTrackEnd(key: string, description: string, flag: boolean): void;
    }
  }
  namespace App {
    function getApp(): { errorLogger: ErrorLogger };
  }
}

/**
 * Command for resizing walls with transaction management and undo/redo support
 */
export class CmdResizeWalls extends HSApp.Cmd.Command {
  private _walls: unknown[];
  private _session?: TransactionSession;
  private _request?: TransactionRequest;
  private transMgr!: TransactionManager;

  constructor(walls: unknown[]) {
    super();
    this._walls = walls;
  }

  public onExecute(): void {
    this.transMgr = this.context.transManager;
    this._session = this.transMgr.startSession({ undoRedo: false });
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ResizeTgWalls,
      [this._walls]
    );
  }

  public onReceive(event: string, data: unknown): boolean {
    switch (event) {
      case 'sliderdragmove':
        if (data && (data as SliderDragData).name && this._request) {
          this._request.receive(event, data);
        }
        break;
      case 'sliderdragend':
        if (!this.context.app.cmdManager.isFreezed) {
          this._onComplete();
        }
        break;
    }
    return true;
  }

  private _onComplete(): void {
    if (this._request) {
      this.transMgr.commit(this._request);
    }
    if (this._session) {
      this._session.commit();
    }
    this._session = undefined;
    this.mgr.complete(this);
  }

  public onCleanup(): void {
    if (this._session) {
      this._session.abort();
    }
    this._session = undefined;
    this._walls = [];
  }

  private _commitRequest(param1: unknown, param2: unknown): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ResizeWalls,
      [this._walls, param1, param2]
    );
    transManager.commit(request, true);

    HSApp.Util.LoggerUtil.actionTrackStart(
      'start.executeWallEditHook',
      '改变墙体的联动操作开始',
      false
    );

    const cmdManager = this.context.app.cmdManager;
    cmdManager.freezeProcess();

    WallEditHook.getInstance()
      .onWallEditComplete({ changedWalls: this._walls })
      .then(() => {
        cmdManager.unfreezeProcess();
        if (this._session) {
          this._session.commit();
        }
        this.mgr.complete(this);
        HSApp.Util.LoggerUtil.actionTrackEnd(
          'end.executeWallEditHook',
          '改变墙体的联动操作结束',
          false
        );
      })
      .catch((error: Error) => {
        cmdManager.unfreezeProcess();
        HSApp.App.getApp().errorLogger.push('WallEditHook on failure', {
          errorStack: error.stack,
          description: 'WallEditHook on failure',
          errorInfo: {
            info: error,
            path: {
              file: 'homestyler-tools-web/web/plugin/walledit/command/cmdresizewalls.js',
              functionName: '_commitRequest()'
            }
          }
        });
      });
  }

  public isInteractive(): boolean {
    return true;
  }

  public getDescription(): string {
    return '修改墙体大小';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}