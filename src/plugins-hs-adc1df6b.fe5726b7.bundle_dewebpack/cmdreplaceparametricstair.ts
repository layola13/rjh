import { App } from './App';
import { TransactionManager } from './TransactionManager';
import { TransactionRequest } from './TransactionRequest';
import { Entity } from './Entity';
import { Command } from './Command';
import { SelectionManager } from './SelectionManager';
import { CommandManager } from './CommandManager';

interface StairMetadata {
  [key: string]: unknown;
}

interface CurrentCommand {
  type?: string;
  mgr: {
    complete(cmd: CurrentCommand): void;
  };
}

/**
 * Command for replacing parametric stairs
 */
export class CmdReplaceParametricStair extends Command {
  private _oldStairs: Entity;
  private _meta: StairMetadata;
  private _request?: TransactionRequest;
  private _newEntity?: Entity;

  constructor(oldStairs: Entity, meta: StairMetadata) {
    super();
    this._oldStairs = oldStairs;
    this._meta = meta;
  }

  async onExecute(): Promise<Entity> {
    const app: App = HSApp.App.getApp();
    const transManager: TransactionManager = app.transManager;

    this._request = transManager.createRequest(
      HSFPConstants.RequestType.ReplaceParametricStair,
      [this._oldStairs, this._meta]
    );

    await transManager.commitAsync(this._request);

    this._newEntity = this._request.new;
    this.context.app.selectionManager.select(this._newEntity);

    const currentCmd: CurrentCommand | undefined = app.cmdManager.current;
    if (
      currentCmd &&
      currentCmd.type &&
      currentCmd.type === HSFPConstants.CommandType.ReplaceParametricStair
    ) {
      currentCmd.mgr.complete(currentCmd);
    }

    return this._newEntity;
  }

  get newEntity(): Entity | undefined {
    return this._newEntity;
  }

  getDescription(): string {
    return "替换参数化楼梯";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.Category;
  }
}