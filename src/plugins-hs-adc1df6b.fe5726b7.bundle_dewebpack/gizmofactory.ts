import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { ReshapeFace2d } from './ReshapeFace2d';
import { BackgroundEdgeDimension } from './BackgroundEdgeDimension';
import { Line2dDimension } from './Line2dDimension';

interface ICanvas {
  context: {
    frozen: boolean;
  };
  displayLayers: {
    temp: unknown;
  };
}

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

interface IGizmo {
  // Base gizmo interface
}

/**
 * Factory class for creating gizmos based on selected entities
 */
export class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  private readonly _app: IApp;
  private readonly _canvas: ICanvas;

  constructor(canvas: ICanvas, app: IApp) {
    super(canvas);
    this._app = app;
    this._canvas = canvas;
  }

  /**
   * Creates selection gizmos for the given entities
   * @param entities - Array of entities to create gizmos for
   * @returns Array of created gizmo instances
   */
  createSelectionGizmo(entities: unknown[]): IGizmo[] {
    if (entities.length !== 1) {
      return [];
    }

    const selectedItems = this._app.selectionManager.selected();
    const gizmos: IGizmo[] = [];

    if (!selectedItems.length) {
      return gizmos;
    }

    const context = this._canvas.context;
    const tempLayer = this._canvas.displayLayers.temp;
    const face2dSelections: ISelection[] = [];

    selectedItems.forEach((item) => {
      if (item.srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
        face2dSelections.push(item);
      }
    });

    if (face2dSelections.length === 1) {
      gizmos.push(new ReshapeFace2d(context, tempLayer, face2dSelections));
    }

    for (const selection of selectedItems) {
      const model = selection.srcModel;
      let gizmo: IGizmo | undefined;

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
            : new Line2dDimension(context, tempLayer, selection);
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

  /**
   * Checks if the gizmo factory is currently active
   * @returns True if the canvas context is not frozen
   */
  isActive(): boolean {
    return !this._canvas.context.frozen;
  }
}