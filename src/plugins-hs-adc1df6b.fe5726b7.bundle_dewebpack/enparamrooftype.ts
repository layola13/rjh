export enum ENParamRoofType {
  Plane = "Plane",
  Pitched = "Pitched",
  HerringBone = "HerringBone",
  Hip = "Hip",
  SaltBox = "SaltBox",
  BoxGable = "BoxGable",
  Pyramid = "Pyramid"
}

export class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  private _app: unknown;
  private _canvas: any;

  constructor(canvas: any, app: unknown) {
    super(canvas);
    this._app = app;
    this._canvas = canvas;
  }

  createSelectionGizmo(selections: any[]): any[] {
    const filteredSelections = selections.filter(
      (selection) => selection.entity instanceof HSApp.ExtraordinarySketch2d.InteractiveModel
    );

    if (filteredSelections.length !== 1) {
      return [];
    }

    const entities = filteredSelections.map((selection) => selection.entity);
    const gizmos: any[] = [];

    if (entities.length === 0) {
      return gizmos;
    }

    const context = this._canvas.context;
    const tempLayer = this._canvas.displayLayers.temp;

    const face2dEntities = entities.filter(
      (entity) => entity.srcModel instanceof HSCore.Model.ExtraordinaryFace2d
    );

    if (face2dEntities.length === 1) {
      gizmos.push(
        new HSApp.ExtraordinarySketch2d.Gizmo.ReshapeFace2d(
          context,
          tempLayer,
          face2dEntities
        )
      );
    }

    for (const entity of entities) {
      const srcModel = entity.srcModel;
      let dimensionGizmo: any;

      if (srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
        dimensionGizmo = new HSApp.ExtraordinarySketch2d.Gizmo.Face2dDimension(
          context,
          tempLayer,
          entity
        );

        const sketchable = entity.builder.sketchable;
        if (sketchable?.roof) {
          const roofType = sketchable.roof.parameters.roofType;

          if (roofType === ENParamRoofType.SaltBox || roofType === ENParamRoofType.BoxGable) {
            gizmos.push(new AngleInputGizmo(context, tempLayer, sketchable));
          } else if (roofType === ENParamRoofType.Pitched) {
            gizmos.push(new TriangleGizmo(context, tempLayer, sketchable));
          }
        }
      } else if (srcModel instanceof HSCore.Model.ExtraordinaryEdge) {
        const curve = srcModel.curve;

        if (curve instanceof HSCore.Model.ExtraordinaryLine2d) {
          dimensionGizmo = srcModel.isBackground
            ? new BackgroundEdgeDimension(context, tempLayer, entity)
            : new HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension(context, tempLayer, entity);
        } else if (curve instanceof HSCore.Model.ExtraordinaryCircleArc2d) {
          dimensionGizmo = new HSApp.ExtraordinarySketch2d.Gizmo.Arc2dDimension(
            context,
            tempLayer,
            entity
          );
        }
      } else if (srcModel instanceof HSCore.Model.ExtraordinaryPoint2d) {
        dimensionGizmo = new HSApp.ExtraordinarySketch2d.Gizmo.Point2dDimension(
          context,
          tempLayer,
          entity
        );
      }

      if (dimensionGizmo) {
        gizmos.push(dimensionGizmo);
      }
    }

    return gizmos;
  }

  isActive(): boolean {
    return !this._canvas.context.frozen;
  }
}