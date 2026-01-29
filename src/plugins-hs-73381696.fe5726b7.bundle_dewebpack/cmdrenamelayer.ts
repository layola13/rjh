export class CmdRenameLayer extends HSApp.Cmd.Command {
  private _layer: unknown;
  private _name: string;
  private _request: unknown | undefined;

  constructor(layer: unknown, name: string) {
    super();
    this._layer = layer;
    this._name = name;
    this._request = undefined;
  }

  onExecute(): void {
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.RenameLayer,
      [this._layer, this._name]
    );
    this.context.transManager.commit(this._request);
    this.mgr.complete(this);
  }

  onCleanup(): void {}

  canUndoRedo(): boolean {
    return true;
  }

  getDescription(): string {
    return "重命名楼层";
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }
}