interface ITransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface IApp {
  transManager: ITransactionManager;
}

interface ISlab {
  thickness: number;
}

interface ICommandManager {
  complete(cmd: Command): void;
}

declare namespace HSApp.Cmd {
  class Command {
    protected mgr: ICommandManager;
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    ChangeSlabThickness = 'ChangeSlabThickness'
  }
}

/**
 * Command to change the thickness of a slab
 */
export class CmdChangeSlabThickness extends HSApp.Cmd.Command {
  private app: IApp;
  private slab: ISlab;
  private thickness: number;
  private _request?: unknown;

  constructor(app: IApp, slab: ISlab, thickness: number) {
    super();
    this.app = app;
    this.slab = slab;
    this.thickness = thickness;
  }

  onExecute(): void {
    if (this.slab.thickness !== this.thickness) {
      this._request = this.app.transManager.createRequest(
        HSFPConstants.RequestType.ChangeSlabThickness,
        [this.slab, this.thickness]
      );
      this.app.transManager.commit(this._request);
      this.mgr.complete(this);
    }
  }

  onCleanup(): void {
    // No cleanup needed
  }

  canUndoRedo(): boolean {
    return false;
  }
}