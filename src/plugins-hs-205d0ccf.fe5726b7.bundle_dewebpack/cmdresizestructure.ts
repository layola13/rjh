export class CmdResizeStructure extends HSApp.Cmd.Command {
  private structure: unknown;
  private transMgr: unknown;
  private _draggingGizmo: unknown;
  private _request: unknown;

  constructor(structure: unknown, draggingGizmo: unknown) {
    super();
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
    this._draggingGizmo = draggingGizmo;
  }

  onExecute(): void {
    this._request = this.transMgr.createRequest(
      HSFPConstants.RequestType.ResizeStructure,
      [this.structure, this._draggingGizmo]
    );
  }

  onReceive(eventType: string, eventData: { offset?: unknown }): boolean {
    switch (eventType) {
      case "dragmove":
        if (!eventData.offset) {
          return false;
        }
        this._request.receive(eventType, eventData);
        break;

      case "dragend":
        this._onComplete();
        break;

      default:
        return super.onReceive(eventType, eventData);
    }

    return true;
  }

  private _onComplete(): void {
    this.transMgr.commit(this._request);
    this.mgr.complete(this);
  }
}