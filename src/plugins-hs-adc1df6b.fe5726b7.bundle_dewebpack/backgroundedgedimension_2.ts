import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { MathAlg } from './MathAlg';

enum LinearDimensionStateEnum {
  editable,
  disabled
}

interface IEntity {
  id: string;
  curve: IExtraordinaryCurve;
}

interface IExtraordinaryCurve {
  from: IPoint2d;
  to: IPoint2d;
  toMathCurve(): IMathCurve;
}

interface IPoint2d {
  x: number;
  y: number;
}

interface IMathCurve {
  clone(): IMathCurve;
  extendDouble(value: number): IMathCurve;
}

interface IGizmo {
  entity: IEntity;
  min: number;
  max: number;
  valueChanged?: IEventHandler;
  updateState(state: LinearDimensionStateEnum, enabled: boolean): void;
  clear(): void;
}

interface IEventHandler {
  listen(callback: Function, context: unknown): void;
  unlistenAll(): void;
}

interface IGizmoManager {
  getAllGizmos(): IGizmo[];
  removeGizmo(gizmo: IGizmo): void;
}

interface ICanvas {
  gizmoManager: IGizmoManager;
}

interface ISketch {
  // Sketch interface placeholder
}

interface ISketchable {
  getSketch(): ISketch;
}

interface ISketchBuilder {
  sketchable: ISketchable;
}

interface IInteractiveModel {
  // Interactive model interface placeholder
}

interface IDimensionValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo: IGizmo;
  };
}

/**
 * BackgroundEdgeDimension manages dimensions for background edges in the sketch editor.
 * Extends the base Line2dDimension to provide specialized functionality for edge dimensions.
 */
export class BackgroundEdgeDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  private _backgroundDimensions: IGizmo[];
  
  protected canvas: ICanvas;
  protected edge: IEntity;
  protected curve: IExtraordinaryCurve;
  protected dimensions: Record<string, IGizmo>;
  protected sketchBuilder: ISketchBuilder;
  protected interactiveModel: IInteractiveModel;

  constructor(
    canvas: ICanvas,
    edge: IEntity,
    interactiveModel: IInteractiveModel
  ) {
    super(canvas, edge, interactiveModel);
    this._backgroundDimensions = [];
  }

  /**
   * Gets an existing gizmo for the entity or creates a new editable dimension.
   */
  private _getOrCreateEditDimension(entity: IEntity): IGizmo {
    const existingGizmo = this.canvas.gizmoManager
      .getAllGizmos()
      .find((gizmo) => gizmo.entity === entity);

    if (existingGizmo) {
      existingGizmo.min = HSConstants.Constants.MIN_WALL_LENGTH;
      existingGizmo.max = HSConstants.Constants.MAX_WALL_LENGTH;
      this._backgroundDimensions.push(existingGizmo);
      return existingGizmo;
    }

    return super._getOrCreateEditDimension([entity]);
  }

  /**
   * Cleans up all dimensions, resetting background dimensions and removing others.
   */
  public onCleanup(): void {
    const gizmoManager = this.canvas?.gizmoManager;
    
    Object.values(this.dimensions).forEach((dimension) => {
      if (this._backgroundDimensions.includes(dimension)) {
        dimension.valueChanged?.unlistenAll();
        dimension.updateState(LinearDimensionStateEnum.editable, false);
      } else {
        dimension.clear();
        gizmoManager?.removeGizmo(dimension);
      }
    });

    this._backgroundDimensions = [];
  }

  /**
   * Updates all dimensions for the current edge and related edges.
   */
  public updateDimensions(): void {
    this._activeDimension(this.edge, false);

    const relatedEdges: IEntity[] = [];

    if (
      this.curve instanceof HSCore.Model.ExtraordinaryLine2d ||
      this.curve instanceof HSCore.Model.ExtraordinaryCircleArc2d
    ) {
      [this.curve.from, this.curve.to].forEach((point) => {
        const sketch = this.sketchBuilder.sketchable.getSketch();
        const edgesByPoint = HSCore.Util.ExtraordinarySketch2d.getAllEdgesByPoints(
          sketch,
          [point]
        );
        const extendedCurve = this.edge.curve.toMathCurve().clone().extendDouble(1);

        const filteredEdges = edgesByPoint.filter((edge) => {
          if (edge === this.edge) {
            return false;
          }

          const overlapType = MathAlg.PositionJudge.curveCurveOverlap(
            extendedCurve,
            edge.curve.toMathCurve()
          );

          return ![
            MathAlg.CurveCuvePositonType.OVERLAP,
            MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
          ].includes(overlapType);
        });

        filteredEdges.forEach((edge) => {
          relatedEdges.push(edge);
        });
      });
    }

    relatedEdges.forEach((edge) => {
      this._activeDimension(edge, true);
    });

    const allEdges = this.edge ? [this.edge, ...relatedEdges] : relatedEdges;
    this._removeUnusedDimension(allEdges);
    this._updatePositionDimension(this.edge);
  }

  /**
   * Activates or updates a dimension for the given edge.
   */
  private _activeDimension(entity: IEntity, isEditable: boolean): void {
    const curve = entity?.curve;
    if (!curve) {
      return;
    }

    const dimension = this._getOrCreateEditDimension(entity);
    this.dimensions[`${entity.id}`] = dimension;

    HSApp.View.SVG.Util.updateDimension(dimension, curve.to, curve.from, true);
    dimension.updateState(LinearDimensionStateEnum.disabled, false);
    dimension.updateState(LinearDimensionStateEnum.editable, isEditable);

    if (isEditable) {
      dimension.valueChanged?.listen(this.dimensionValueChangeCommit, this);
    }
  }

  /**
   * Handles dimension value change events and creates commands to update the model.
   */
  public dimensionValueChangeCommit(event: IDimensionValueChangeEvent): void {
    const delta = event.data.value - event.data.oldValue;
    
    if (!event.data.gizmo) {
      return;
    }

    const currentCurve = this.curve;
    const gizmoCurve = event.data.gizmo.entity.curve;
    
    const currentFrom = currentCurve.from;
    const currentTo = currentCurve.to;
    const gizmoFrom = gizmoCurve.from;
    const gizmoTo = gizmoCurve.to;

    const direction = new HSCore.Util.Math.Vec2(
      gizmoTo.x - gizmoFrom.x,
      gizmoTo.y - gizmoFrom.y
    );
    direction.setLength(delta);

    let shouldInvert = false;
    if (currentTo === gizmoFrom) {
      shouldInvert = false;
    } else if (currentFrom === gizmoTo) {
      shouldInvert = true;
    }

    const offset: IPoint2d = shouldInvert
      ? { x: direction.x, y: direction.y }
      : { x: -direction.x, y: -direction.y };

    if (offset) {
      this._createCommand(offset, this.interactiveModel);
    }
  }

  protected _removeUnusedDimension(edges: IEntity[]): void {
    // Implementation from parent class
  }

  protected _updatePositionDimension(edge: IEntity): void {
    // Implementation from parent class
  }

  protected _createCommand(offset: IPoint2d, model: IInteractiveModel): void {
    // Implementation from parent class
  }
}