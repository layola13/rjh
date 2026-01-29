import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { applyMoodBoardLayout } from './applyMoodBoardLayout';
import { HSFPConstants } from './HSFPConstants';

interface ModelInfo {
  modelId: string;
  [key: string]: unknown;
}

interface MoodBoardData {
  modelInfo: ModelInfo[];
  [key: string]: unknown;
}

interface ApplyStatusEvent {
  status: 'completed' | 'failed';
  unusedSeekIds: string[];
  moodBoardData?: MoodBoardData;
  error?: Error;
}

interface Room {
  [key: string]: unknown;
}

interface TransactionSession {
  commit(): void;
}

interface CommandManager {
  unfreezeProcess(): void;
  complete(cmd: Command): void;
}

abstract class Command {
  protected mgr!: CommandManager;
  abstract onExecute(): void;
  abstract onCleanup(): void;
  abstract canSuspend(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

/**
 * Command to apply mood board layout to a room
 */
export class CmdApplyMoodBoardLayout extends Command {
  private readonly _room: Room;
  private readonly _moodBoardData: MoodBoardData;
  private _unusedSeekIds: string[] = [];
  private readonly _app: HSApp.App;
  private readonly _clearBeforeApply: boolean;
  public readonly signalApplyStatusChanged: HSCore.Util.Signal<ApplyStatusEvent>;

  constructor(room: Room, moodBoardData: MoodBoardData, clearBeforeApply: boolean = true) {
    super();
    
    this._app = HSApp.App.getApp();
    this._room = room;
    this._moodBoardData = moodBoardData;
    this._unusedSeekIds = this._moodBoardData.modelInfo.map((info) => info.modelId);
    this._clearBeforeApply = clearBeforeApply;
    this.signalApplyStatusChanged = new HSCore.Util.Signal<ApplyStatusEvent>();
  }

  public onExecute(): void {
    if (!this._room || !this._moodBoardData) {
      this.signalApplyStatusChanged.dispatch({
        status: 'failed',
        unusedSeekIds: this.getUnusedSeekIds(),
        error: new Error('房间或情绪板数据无效')
      });
      return;
    }

    const transactionSession = this._app.transManager.startSession();

    applyMoodBoardLayout({
      moodBoardData: this._moodBoardData,
      room: this._room,
      app: this._app,
      clearBeforeApply: this._clearBeforeApply
    })
      .then((usedModelIds: string[]) => {
        this._unusedSeekIds = this._moodBoardData.modelInfo
          .filter((info) => !usedModelIds.includes(info.modelId))
          .map((info) => info.modelId);

        this.signalApplyStatusChanged.dispatch({
          status: 'completed',
          unusedSeekIds: this.getUnusedSeekIds(),
          moodBoardData: this._moodBoardData
        });
      })
      .catch((error: Error) => {
        console.error('应用情绪板布局失败:', error);
        
        this.signalApplyStatusChanged.dispatch({
          status: 'failed',
          unusedSeekIds: this.getUnusedSeekIds(),
          error
        });
      })
      .finally(() => {
        transactionSession.commit();
        this.mgr.unfreezeProcess();
        this.mgr.complete(this);
      });
  }

  public getUnusedSeekIds(): string[] {
    return this._unusedSeekIds;
  }

  public onCleanup(): void {
    super.onCleanup?.();
    this.signalApplyStatusChanged.dispose();
  }

  public canSuspend(): boolean {
    return true;
  }

  public getDescription(): string {
    return '应用情绪板布局';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}