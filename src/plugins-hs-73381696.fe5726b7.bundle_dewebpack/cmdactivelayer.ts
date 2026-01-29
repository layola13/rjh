export class CmdActiveLayer extends HSApp.Cmd.Command {
  private context: unknown;
  private layer: ILayer;
  private _request?: unknown;

  constructor(context: unknown, layer: ILayer) {
    super();
    this.context = context;
    this.layer = layer;
  }

  onExecute(): void {
    this._request = (this.context as any).transManager.createRequest(
      HSFPConstants.RequestType.ActiveLayer,
      [this.layer]
    );
    (this.context as any).transManager.commit(this._request);
    this.mgr.complete(this);
  }

  onCleanup(): void {
    // Cleanup logic
  }

  canUndoRedo(): boolean {
    return true;
  }

  getDescription(): string {
    return `多层切换到楼层至layer: ${this.layer.ID}`;
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}

interface ILayer {
  ID: string | number;
}