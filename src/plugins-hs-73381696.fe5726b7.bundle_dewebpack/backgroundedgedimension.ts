import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { MathAlg } from './MathAlg';

enum LinearDimensionStateEnum {
  editable = 'editable',
  disabled = 'disabled',
}

interface Gizmo {
  entity: Edge;
  min: number;
  max: number;
  valueChanged?: EventListener;
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  clear(): void;
}

interface Edge {
  id: string;
  curve: ExtraordinaryCurve;
}

interface ExtraordinaryCurve {
  from: Point2d;
  to: Point2d;
  toMathCurve(): MathCurve;
}

interface Point2d {
  x: number;
  y: number;
}

interface MathCurve {
  clone(): MathCurve;
  extendDouble(value: number): MathCurve;
}

interface Canvas {
  gizmoManager: GizmoManager;
}

interface GizmoManager {
  getAllGizmos(): Gizmo[];
  removeGizmo(gizmo: Gizmo): void;
}

interface DimensionValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo?: Gizmo;
  };
}

interface EventListener {
  listen(callback: Function, context: unknown): void;
  unlistenAll(): void;
}

interface SketchBuilder {
  sketchable: {
    getSketch(): Sketch;
  };
}

interface Sketch {
  // Sketch properties
}

interface Vec2 {
  x: number;
  y: number;
  setLength(length: number): void;
}

interface InteractiveModel {
  // Interactive model properties
}

export class BackgroundEdgeDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  private _backgroundDimensions: Gizmo[];
  protected dimensions: Record<string, Gizmo>;
  protected canvas: Canvas;
  protected edge: Edge;
  protected curve: ExtraordinaryCurve;
  protected sketchBuilder: SketchBuilder;
  protected interactiveModel: InteractiveModel;

  constructor(param1: unknown, param2: unknown, param3: unknown) {
    super(param1, param2, param3);
    this._backgroundDimensions = [];
  }

  private _getOrCreateEditDimension(edge: Edge): Gizmo {
    const existingGizmo = this.canvas.gizmoManager.getAllGizmos().find((gizmo) => {
      return gizmo.entity === edge;
    });

    if (existingGizmo) {
      existingGizmo.min = HSConstants.Constants.MIN_WALL_LENGTH;
      existingGizmo.max = HSConstants.Constants.MAX_WALL_LENGTH;
      this._backgroundDimensions.push(existingGizmo);
      return existingGizmo;
    }

    return super._getOrCreateEditDimension([edge]);
  }

  onCleanup(): void {
    const gizmoManager = this.canvas?.gizmoManager;
    
    Object.values(this.dimensions).forEach((dimension) => {
      if (this._backgroundDimensions.includes(dimension)) {
        dimension.valueChanged?.unlistenAll();
        dimension.updateState(LinearDimensionStateEnum.editable, false);
      } else {
        dimension.clear();
        gizmoManager.removeGizmo(dimension);
      }
    });

    this._backgroundDimensions = [];
  }

  updateDimensions(): void {
    this._activeDimension(this.edge, false);

    const additionalEdges: Edge[] = [];

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
            return (
              edge !== this.edge &&
              ![
                MathAlg.CurveCuvePositonType.OVERLAP,
                MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP,
              ].includes(MathAlg.PositionJudge.curveCurveOverlap(extendedCurve, edge.curve.toMathCurve()))
            );
          })
          .forEach((edge) => {
            additionalEdges.push(edge);
          });
      });
    }

    additionalEdges.forEach((edge) => {
      return this._activeDimension(edge, true);
    });

    const allEdges = this.edge ? [this.edge, ...additionalEdges] : additionalEdges;
    this._removeUnusedDimension(allEdges);
    this._updatePositionDimension(this.edge);
  }

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

  dimensionValueChangeCommit(event: DimensionValueChangeEvent): void {
    const deltaValue = event.data.value - event.data.oldValue;
    let offset: { x: number; y: number } | undefined;

    if (event.data.gizmo) {
      const currentCurve = this.curve;
      const gizmoCurve = event.data.gizmo.entity.curve;
      const currentFrom = currentCurve.from;
      const currentTo = currentCurve.to;
      const gizmoFrom = gizmoCurve.from;
      const gizmoTo = gizmoCurve.to;

      const direction = new HSCore.Util.Math.Vec2(gizmoTo.x - gizmoFrom.x, gizmoTo.y - gizmoFrom.y);
      direction.setLength(deltaValue);

      let shouldInvert = false;
      if (currentTo === gizmoFrom) {
        shouldInvert = false;
      } else if (currentFrom === gizmoTo) {
        shouldInvert = true;
      }

      offset = shouldInvert
        ? { x: direction.x, y: direction.y }
        : { x: -direction.x, y: -direction.y };
    }

    if (offset) {
      this._createCommand(offset, this.interactiveModel);
    }
  }

  protected _removeUnusedDimension(edges: Edge[]): void {
    // Implementation from parent class
  }

  protected _updatePositionDimension(edge: Edge): void {
    // Implementation from parent class
  }

  protected _createCommand(offset: { x: number; y: number }, model: InteractiveModel): void {
    // Implementation from parent class
  }
}