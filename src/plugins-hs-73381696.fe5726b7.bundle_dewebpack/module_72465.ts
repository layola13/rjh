import { HSApp } from './518193';

export default class MeasureGizmoCommand extends HSApp.Cmd.Command {
  private _app: any;
  public gizmo3d: any;

  constructor(gizmo?: any) {
    super();
    this._app = HSApp.App.getApp();
    this.gizmo3d = gizmo;
  }

  canUndoRedo(): boolean {
    return false;
  }

  onReceive(event: string, data?: any): boolean {
    let handled = false;

    switch (event) {
      case 'click':
        if (data) {
          this.gizmo3d.onClick(data);
        }
        handled = true;
        break;

      case 'mousemove':
        if (data) {
          this.gizmo3d.onMouseMove(data);
        }
        handled = true;
        break;

      default:
        handled = super.onReceive(event, data);
    }

    return handled;
  }

  onExecute(): void {
    const activeView = this._app.getActive3DView();

    if (!this.gizmo3d) {
      const context = activeView.context;
      const gizmoLayer = context.hscanvas.displayLayers.gizmo;
      const measureGizmo = new HSApp.View.T3d.MeasureGizmo(context, gizmoLayer);
      measureGizmo.dirty = false;
      this.gizmo3d = measureGizmo;
    }

    activeView.gizmoManager.addGizmo(this.gizmo3d);
  }

  onCleanup(): void {
    if (this.gizmo3d.context) {
      this.gizmo3d.onCleanup();
    }

    this._app.getActive3DView().gizmoManager.removeGizmo(this.gizmo3d);
    super.onCleanup();
  }

  getDescription(): string {
    return '3d标尺';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }

  isInteractive(): boolean {
    return true;
  }
}