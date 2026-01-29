import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { MathAlg } from './MathAlg';

enum LinearDimensionStateEnum {
  editable = 'editable',
  disabled = 'disabled'
}

interface Gizmo {
  entity: Edge;
  min?: number;
  max?: number;
  valueChanged?: EventListener;
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  clear(): void;
}

interface Canvas {
  gizmoManager: GizmoManager;
}

interface GizmoManager {
  getAllGizmos(): Gizmo[];
  removeGizmo(gizmo: Gizmo): void;
}

interface Edge {
  id: string;
  curve: Curve;
}

interface Curve {
  from: Point;
  to: Point;
  toMathCurve(): MathCurve;
}

interface MathCurve {
  clone(): MathCurve;
  extendDouble(value: number): MathCurve;
}

interface Point {
  x: number;
  y: number;
}

interface SketchBuilder {
  sketchable: Sketchable;
}

interface Sketchable {
  getSketch(): Sketch;
}

interface Sketch {
  // Sketch properties
}

interface InteractiveModel {
  // Interactive model properties
}

interface DimensionValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo?: Gizmo;
  };
}

interface EventListener {
  listen(callback: (event: DimensionValueChangeEvent) => void, context: unknown): void;
  unlistenAll(): void;
}

const MIN_WALL_LENGTH = HSConstants.Constants.MIN_WALL_LENGTH;
const MAX_WALL_LENGTH = HSConstants.Constants.MAX_WALL_LENGTH;

export class BackgroundEdgeDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  private _backgroundDimensions: Gizmo[];
  protected canvas: Canvas;
  protected dimensions: Record<string, Gizmo>;
  protected edge: Edge;
  protected curve: Curve;
  protected sketchBuilder: SketchBuilder;
  protected interactiveModel: InteractiveModel;

  constructor(canvas: Canvas, sketchBuilder: SketchBuilder, interactiveModel: InteractiveModel) {
    super(canvas, sketchBuilder, interactiveModel);
    this._backgroundDimensions = [];
  }

  /**
   * Gets or creates an edit dimension for the given edge
   */
  private _getOrCreateEditDimension(edge: Edge): Gizmo {
    const existingGizmo = this.canvas.gizmoManager.getAllGizmos().find(
      (gizmo) => gizmo.entity === edge
    );

    if (existingGizmo) {
      existingGizmo.min = MIN_WALL_LENGTH;
      existingGizmo.max = MAX_WALL_LENGTH;
      this._backgroundDimensions.push(existingGizmo);
      return existingGizmo;
    }

    return super._getOrCreateEditDimension([edge]);
  }

  /**
   * Cleans up dimensions and resets background dimensions
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
   * Updates all dimensions for the current edge and related edges
   */
  public updateDimensions(): void {
    this._activeDimension(this.edge, false);

    const relatedEdges: Edge[] = [];

    if (
      this.curve instanceof HSCore.Model.ExtraordinaryLine2d ||
      this.curve instanceof HSCore.Model.ExtraordinaryCircleArc2d
    ) {
      [this.curve.from, this.curve.to].forEach((point) => {
        const sketch = this.sketchBuilder.sketchable.getSketch();
        const edgesByPoint = HSCore.Util.ExtraordinarySketch2d.getAllEdgesByPoints(sketch, [point]);
        const extendedCurve = this.edge.curve.toMathCurve().clone().extendDouble(1);

        edgesByPoint
          .filter((edge) => {
            if (edge === this.edge) {
              return false;
            }

            const positionType = MathAlg.PositionJudge.curveCurveOverlap(
              extendedCurve,
              edge.curve.toMathCurve()
            );

            return ![
              MathAlg.CurveCuvePositonType.OVERLAP,
              MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
            ].includes(positionType);
          })
          .forEach((edge) => {
            relatedEdges.push(edge);
          });
      });
    }

    relatedEdges.forEach((edge) => this._activeDimension(edge, true));

    const allEdges = this.edge ? [this.edge].concat(relatedEdges) : relatedEdges;
    this._removeUnusedDimension(allEdges);
    this._updatePositionDimension(this.edge);
  }

  /**
   * Activates a dimension for the given edge
   */
  private _activeDimension(edge: Edge, isEditable: boolean): void {
    const curve = edge?.curve;
    if (!curve) {
      return;
    }

    const dimension = this._getOrCreateEditDimension(edge);
    this.dimensions[`${edge.id}`] = dimension;

    HSApp.View.SVG.Util.updateDimension(dimension, curve.to, curve.from, true);
    dimension.updateState(LinearDimensionStateEnum.disabled, false);
    dimension.updateState(LinearDimensionStateEnum.editable, isEditable);

    if (isEditable) {
      dimension.valueChanged?.listen(this.dimensionValueChangeCommit, this);
    }
  }

  /**
   * Handles dimension value change commit events
   */
  public dimensionValueChangeCommit(event: DimensionValueChangeEvent): void {
    const deltaValue = event.data.value - event.data.oldValue;
    const gizmo = event.data.gizmo;

    if (!gizmo) {
      return;
    }

    const currentCurve = this.curve;
    const gizmoCurve = gizmo.entity.curve;

    const currentFrom = currentCurve.from;
    const currentTo = currentCurve.to;
    const gizmoFrom = gizmoCurve.from;
    const gizmoTo = gizmoCurve.to;

    const direction = new HSCore.Util.Math.Vec2(
      gizmoTo.x - gizmoFrom.x,
      gizmoTo.y - gizmoFrom.y
    );
    direction.setLength(deltaValue);

    let shouldInvert = false;
    if (currentTo === gizmoFrom) {
      shouldInvert = false;
    } else if (currentFrom === gizmoTo) {
      shouldInvert = true;
    }

    const offset = shouldInvert
      ? { x: direction.x, y: direction.y }
      : { x: -direction.x, y: -direction.y };

    this._createCommand(offset, this.interactiveModel);
  }

  protected _removeUnusedDimension(edges: Edge[]): void {
    // Implementation from parent class
  }

  protected _updatePositionDimension(edge: Edge): void {
    // Implementation from parent class
  }

  protected _createCommand(offset: Point, model: InteractiveModel): void {
    // Implementation from parent class
  }
}