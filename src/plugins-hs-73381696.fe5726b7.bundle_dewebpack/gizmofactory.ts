import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { BackgroundEdgeDimension } from './BackgroundEdgeDimension';

interface IApp {
  selectionManager: {
    selected(): ISelection[];
  };
}

interface ISelection {
  srcModel: 
    | HSCore.Model.ExtraordinaryFace2d 
    | HSCore.Model.ExtraordinaryEdge 
    | HSCore.Model.ExtraordinaryPoint2d;
}

interface ICanvas {
  context: {
    frozen: boolean;
  };
  displayLayers: {
    temp: unknown;
  };
}

type Gizmo = 
  | HSApp.ExtraordinarySketch2d.Gizmo.ReshapeFace2d
  | HSApp.ExtraordinarySketch2d.Gizmo.Face2dDimension
  | HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension
  | HSApp.ExtraordinarySketch2d.Gizmo.Arc2dDimension
  | HSApp.ExtraordinarySketch2d.Gizmo.Point2dDimension
  | BackgroundEdgeDimension;

export class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  private _app: IApp;
  private _canvas: ICanvas;

  constructor(canvas: ICanvas, app: IApp) {
    super(canvas);
    this._app = app;
    this._canvas = canvas;
  }

  createSelectionGizmo(elements: unknown[]): Gizmo[] {
    if (elements.length !== 1) {
      return [];
    }

    const selectedItems = this._app.selectionManager.selected();
    const gizmos: Gizmo[] = [];

    if (!selectedItems.length) {
      return gizmos;
    }

    const context = this._canvas.context;
    const tempLayer = this._canvas.displayLayers.temp;
    
    const face2dSelections: ISelection[] = [];
    for (const item of selectedItems) {
      if (item.srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
        face2dSelections.push(item);
      }
    }

    if (face2dSelections.length === 1) {
      gizmos.push(
        new HSApp.ExtraordinarySketch2d.Gizmo.ReshapeFace2d(
          context,
          tempLayer,
          face2dSelections
        )
      );
    }

    for (const selection of selectedItems) {
      const model = selection.srcModel;
      let gizmo: Gizmo | undefined;

      if (model instanceof HSCore.Model.ExtraordinaryFace2d) {
        gizmo = new HSApp.ExtraordinarySketch2d.Gizmo.Face2dDimension(
          context,
          tempLayer,
          selection
        );
      } else if (model instanceof HSCore.Model.ExtraordinaryEdge) {
        const curve = model.curve;

        if (curve instanceof HSCore.Model.ExtraordinaryLine2d) {
          gizmo = model.isBackground
            ? new BackgroundEdgeDimension(context, tempLayer, selection)
            : new HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension(
                context,
                tempLayer,
                selection
              );
        } else if (curve instanceof HSCore.Model.ExtraordinaryCircleArc2d) {
          gizmo = new HSApp.ExtraordinarySketch2d.Gizmo.Arc2dDimension(
            context,
            tempLayer,
            selection
          );
        }
      } else if (model instanceof HSCore.Model.ExtraordinaryPoint2d) {
        gizmo = new HSApp.ExtraordinarySketch2d.Gizmo.Point2dDimension(
          context,
          tempLayer,
          selection
        );
      }

      if (gizmo) {
        gizmos.push(gizmo);
      }
    }

    return gizmos;
  }

  isActive(): boolean {
    return !this._canvas.context.frozen;
  }
}