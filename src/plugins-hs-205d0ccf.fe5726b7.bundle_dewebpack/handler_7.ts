import { CmdInspirationAction } from './565501';
import { ActionManager } from './457433';

export class Handler {
  private _app: any;
  private _actionManger?: ActionManager;

  constructor() {
    this._app = undefined;
    this._actionManger = undefined;
  }

  onActive(context: { app: any }, options: any): void {
    this._app = context.app;
    this._registeCommands();
  }

  onDeactive(context: any): void {
    // Cleanup logic if needed
  }

  private _registeCommands(): void {
    this._app.cmdManager.register([
      [HSFPConstants.CommandType.StartUpAction.InspirationAction, CmdInspirationAction]
    ]);
  }

  executeAction(action: any, params: any): void {
    if (!this._actionManger) {
      this._actionManger = new ActionManager();
    }
    this._actionManger.execute(action, params);
  }

  completeAction(): void {
    this._actionManger?.complete();
  }

  cancelAction(): void {
    this._actionManger?.cancel();
  }
}