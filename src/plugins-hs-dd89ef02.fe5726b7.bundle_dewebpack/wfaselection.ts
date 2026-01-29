import { HSApp } from './518193';
import { HSCore } from './635589';
import { Vector3, Coordinate3 } from './815362';
import { ActiveContext, ActiveType } from './289659';
import { WFACompsRotation } from './852229';
import { WFACompsMovement } from './598102';
import { WFACompsCoordinateAxis } from './452808';
import { WFABox } from './243342';
import { WFACompsResize } from './77659';

type SelectionTarget = HSCore.Model.Content | HSCore.Model.WallFaceAssembly | HSCore.Model.Content[] | HSCore.Model.WallFaceAssembly[];

export class WFASelection extends HSApp.View.Base.Gizmo {
  private app: typeof HSApp.App;

  constructor(
    canvas: any,
    selectionManager: any,
    selection: SelectionTarget
  ) {
    super(canvas, selectionManager, selection);
    
    this.app = HSApp.App.getApp();
    this.app.hotkey.registerHotkey("alt+r", this._changeSelectionType);

    const selectionType = canvas.hscanvas.gizmoManager.getSelectionType() || 0;
    const GizmoSelectionType = HSApp.View.GizmoSelectionType;
    const { Scale, Rotate, Move, Reset } = GizmoSelectionType;

    const hasType = (type: number): boolean => {
      return (selectionType & type) !== 0;
    };

    const coord = this.getCoord(selection);
    const context = new ActiveContext();

    if (hasType(Scale) && !hasType(Reset) && selection) {
      this._addScaleGizmo(canvas, selectionManager, selection, context, coord);
    }

    if (hasType(Move | Reset)) {
      this._addMoveGizmo(canvas, selectionManager, selection, context, coord);
    }

    if (hasType(Rotate | Reset) || hasType(Move | Reset)) {
      this._addCoordinateAxisGizmo(canvas, selectionManager, selection, context, coord);
    }

    this._addBoundingBox(canvas, selectionManager, selection, context, coord);
  }

  public getCoord(selection: SelectionTarget): Coordinate3 | undefined {
    const target = Array.isArray(selection) ? selection[0] : selection;
    let face: HSCore.Model.Face | undefined;

    if (target instanceof HSCore.Model.Content) {
      face = target.host;
    } else if (target instanceof HSCore.Model.WallFaceAssembly) {
      face = target.wallFace;
    }

    if (face instanceof HSCore.Model.Face) {
      const dx = face.surfaceObj.surface.getCoord().getDx();
      const crossProduct = Vector3.readonlyZ().cross(dx);
      return new Coordinate3(Vector3.readonlyO(), dx, crossProduct);
    }

    return undefined;
  }

  private _addScaleGizmo(
    canvas: any,
    selectionManager: any,
    selection: SelectionTarget,
    context: ActiveContext,
    coord: Coordinate3 | undefined
  ): void {
    this.addChildGizmo(
      new WFACompsResize(canvas, selectionManager, selection, context, coord, true)
    );
  }

  private _addRotateGizmo(
    canvas: any,
    selectionManager: any,
    selection: SelectionTarget,
    context: ActiveContext,
    coord: Coordinate3 | undefined
  ): void {
    this.addChildGizmo(
      new WFACompsRotation(canvas, selectionManager, selection, ActiveType.xy, context, coord)
    );
    this.addChildGizmo(
      new WFACompsRotation(canvas, selectionManager, selection, ActiveType.yz, context, coord)
    );
    this.addChildGizmo(
      new WFACompsRotation(canvas, selectionManager, selection, ActiveType.xz, context, coord)
    );
  }

  private _addMoveGizmo(
    canvas: any,
    selectionManager: any,
    selection: SelectionTarget,
    context: ActiveContext,
    coord: Coordinate3 | undefined
  ): void {
    this.addChildGizmo(
      new WFACompsMovement(canvas, selectionManager, selection, ActiveType.left, context, coord)
    );
    this.addChildGizmo(
      new WFACompsMovement(canvas, selectionManager, selection, ActiveType.right, context, coord)
    );
    this.addChildGizmo(
      new WFACompsMovement(canvas, selectionManager, selection, ActiveType.top, context, coord)
    );
    this.addChildGizmo(
      new WFACompsMovement(canvas, selectionManager, selection, ActiveType.bottom, context, coord)
    );
  }

  private _addCoordinateAxisGizmo(
    canvas: any,
    selectionManager: any,
    selection: SelectionTarget,
    context: ActiveContext,
    coord: Coordinate3 | undefined
  ): void {
    const activeContext = context || new ActiveContext();
    this.addChildGizmo(
      new WFACompsCoordinateAxis(canvas, selectionManager, selection, activeContext, coord)
    );
  }

  private _addBoundingBox(
    canvas: any,
    selectionManager: any,
    selection: SelectionTarget,
    context: ActiveContext,
    coord: Coordinate3 | undefined
  ): void {
    this.addChildGizmo(
      new WFABox(canvas, selectionManager, selection, context, coord)
    );
  }

  public onCleanup(): void {
    this._unregisterHotkey();
  }

  private _unregisterHotkey(): void {
    this.app.hotkey.unregisterHotkey("alt+r", this._changeSelectionType);
  }

  private _changeSelectionType = (): void => {
    const selectedItem = this.app.selectionManager.selected()[0];
    
    if (!selectedItem?.isScalable) {
      return;
    }

    const currentSelectionType = this.app.getMain3DView().gizmoManager.getSelectionType();
    const GizmoSelectionType = HSApp.View.GizmoSelectionType;
    const { Scale, RotateAndMove, Reset } = GizmoSelectionType;

    if ((currentSelectionType & Scale) !== 0) {
      this.app.getActive3DView().gizmoManager.setSelectionType(
        HSApp.View.GizmoSelectionType.RotateAndMove
      );
    } else if ((currentSelectionType & RotateAndMove) === 0 && (currentSelectionType & Reset) === 0) {
      this.app.getActive3DView().gizmoManager.setSelectionType(
        HSApp.View.GizmoSelectionType.Scale
      );
    }
  };
}