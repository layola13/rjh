import { Vector2 } from './Vector2';
import { SnapHelper } from './SnapHelper';

enum LinearDimensionStateEnum {
  editable = 'editable'
}

enum PointType {
  linePoint = 'linePoint',
  snapPoint = 'snapPoint'
}

interface Offset {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface SnapResult {
  offset?: Vector2;
}

interface CommandParams {
  params?: string;
}

interface Layer {
  walls: Record<string, unknown>;
  structures: Record<string, unknown>;
  beams: Record<string, unknown>;
}

interface Command {
  currentStep: number;
  activeLayer: Layer;
  targetLayer: Layer;
}

interface LinearDimension {
  active: boolean;
  min: number;
  max: number;
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  activate(): void;
  draw(): void;
  hide(): void;
  clear(): void;
}

interface SVGCircle {
  center(x: number, y: number): SVGCircle;
  attr(attributes: Record<string, string | number>): SVGCircle;
  show(): void;
  hide(): void;
  remove(): void;
}

interface SVGContext {
  circle(radius: number): SVGCircle;
}

interface Canvas {
  context: SVGContext;
  modelPointToCanvas(point: Position): Position;
}

interface SignalHook {
  listen(signal: unknown, callback: () => void): void;
}

interface HSCanvas {
  signalViewBoxChanged: unknown;
}

interface Context {
  circle(radius: number): SVGCircle;
  hscanvas: HSCanvas;
}

interface IndicatorStyles {
  startIndicator: Record<string, string>;
  penIndicator: Record<string, string>;
  linePointIndicator: Record<string, string>;
  redPenIndicator: Record<string, string>;
  snapIndicator: Record<string, string>;
}

abstract class Sketch2dTemp {
  protected context: Context;
  protected canvas: Canvas;
  protected cmd: Command;
  protected layer: unknown;
  protected drawing?: unknown;
  protected element: unknown[];
  protected styles: Partial<IndicatorStyles>;
  protected signalHook: SignalHook;

  constructor(context: Context, canvas: Canvas, cmd: Command, layer: unknown) {
    this.context = context;
    this.canvas = canvas;
    this.cmd = cmd;
    this.layer = layer;
    this.element = [];
    this.styles = {};
    this.signalHook = {} as SignalHook;
  }

  protected abstract setDirty(): void;
  protected abstract dirtyGraph(): void;
}

export class AlignLayersGizmo extends Sketch2dTemp {
  private startIndicator?: SVGCircle;
  private penIndicator?: SVGCircle;
  private offset: Offset;
  private beginPosition?: Position;
  private offsetDimension?: LinearDimension;
  private pos?: Position;
  private _isValid: boolean;
  private _snapHelper: SnapHelper;
  private _selectInCurrentLayer: string;
  private _selectInTargetLayer: string;
  private pointType: PointType;
  private offsetDimensionLine?: unknown;

  constructor(context: Context, canvas: Canvas, cmd: Command, layer: unknown) {
    super(context, canvas, cmd, layer);

    this._selectInCurrentLayer = ResourceManager.getString('plugin_structure_select_src_layer_point');

    if (cmd.params === 'toAbove') {
      this._selectInTargetLayer = ResourceManager.getString('plugin_structure_select_above_layer_point');
    } else {
      this._selectInTargetLayer = ResourceManager.getString('plugin_structure_select_below_layer_point');
    }

    this._snapHelper = new SnapHelper(context, {
      orthoModeOn: false,
      prePointOrthoSnap: true,
      avoidSnapRay: true
    });

    this.offset = { x: 0, y: 0 };
    this._isValid = false;
    this.pointType = PointType.linePoint;

    this.signalHook.listen(this.context.hscanvas.signalViewBoxChanged, this._onViewBoxChanged);
    this._mixinIndicatorStyles();
  }

  get isValidPointer(): boolean {
    return this._isValid;
  }

  private _onViewBoxChanged = (): void => {
    this.updateElements();
    this.setDirty();
  };

  refreshSnapHelper(): void {
    const app = HSApp.App.getApp();
    let activeLayer = app.floorplan.scene.activeLayer;

    switch (this.cmd.currentStep) {
      case 0:
        activeLayer = this.cmd.activeLayer;
        break;
      case 1:
        activeLayer = this.cmd.targetLayer;
        break;
    }

    const walls = Object.values(activeLayer.walls);
    const elements = [
      ...Object.values(activeLayer.structures),
      ...Object.values(activeLayer.beams)
    ];

    this._snapHelper.refreshForMovePoint(walls, elements);
  }

  onMouseMove(event: MouseEvent, clientX: number, clientY: number): void {
    const modelPoint = this._getModelPoint(event);
    this._snapHelper.hide();
    this._isValid = false;
    this.pointType = PointType.linePoint;

    const snapResult = this._snapHelper.snap(modelPoint, this.cmd.currentStep, this.beginPosition);
    
    if (snapResult?.offset) {
      modelPoint.add(snapResult.offset);
      this.pointType = PointType.snapPoint;
      this._isValid = true;
    }

    let tipMessage = '';
    switch (this.cmd.currentStep) {
      case 0:
        tipMessage = this._selectInCurrentLayer;
        break;
      case 1:
        tipMessage = this._selectInTargetLayer;
        this.offset = {
          x: modelPoint.x - (this.beginPosition?.x ?? 0),
          y: modelPoint.y - (this.beginPosition?.y ?? 0)
        };
        break;
    }

    updateMouseTips(tipMessage, { x: clientX, y: clientY });
    this.pos = modelPoint;

    HSApp.App.getApp().cmdManager.receive(`gizmo.${event.type}`, {
      offset: this.offset,
      pos: modelPoint,
      event
    });

    this.dirtyGraph();
  }

  updateElements(): void {
    this.updateStartIndicator();
    this.updatePenIndicator();
    this.updateOffsetDimensionLine();
  }

  createStartIndicator(): void {
    this.startIndicator = this.context.circle(6)
      .center(0, 0)
      .attr(this.styles.startIndicator!)
      .hide();
  }

  updateStartIndicator(): void {
    if (!this.startIndicator || !this.beginPosition) {
      return;
    }

    const radius = this.getIndicatorCircleRadius();
    const canvasPoint = this.canvas.modelPointToCanvas(this.beginPosition);

    this.startIndicator.attr({
      cx: canvasPoint.x,
      cy: canvasPoint.y,
      r: radius
    });
    this.startIndicator.show();
  }

  createElements(): void {
    if (!this.element) {
      return;
    }

    this.createStartIndicator();
    this.element.push(this.startIndicator);

    this.createPenIndicator();
    this.element.push(this.penIndicator);

    this.createOffsetDimensionLine(this.context, this.layer);
    this.element.push(this.offsetDimensionLine);

    this.onDraw();
  }

  createPenIndicator(): void {
    this.penIndicator = this.context.circle(6)
      .center(0, 0)
      .attr(this.styles.penIndicator!)
      .hide();
  }

  updatePenIndicator(): void {
    if (!this.penIndicator || !this.pos) {
      return;
    }

    const radius = this.getIndicatorCircleRadius();
    const canvasPoint = this.canvas.modelPointToCanvas(this.pos);
    const style = this.getPenIndicatorStyle();

    this.penIndicator.attr(style);
    this.penIndicator.attr({
      cx: canvasPoint.x,
      cy: canvasPoint.y,
      r: radius
    });
    this.penIndicator.show();
  }

  createOffsetDimensionLine(context: SVGContext, layer: unknown): void {
    const dimension = HSApp.View.SVG.Util.createLinearDimension(context, layer, undefined, {
      showArrow: false
    });

    dimension.updateState(LinearDimensionStateEnum.editable, false);
    dimension.min = HSConstants.Constants.MIN_WALL_LENGTH;
    dimension.max = HSConstants.Constants.MAX_WALL_LENGTH;

    this.offsetDimension = dimension;
  }

  clearOffsetDimension(): void {
    this.offsetDimension?.clear();
    this.offsetDimension = undefined;
  }

  updateOffsetDimensionLine(): void {
    if (!this.beginPosition) {
      return;
    }

    const endPoint: Position = {
      x: this.beginPosition.x + this.offset.x,
      y: this.beginPosition.y + this.offset.y
    };

    const points = [this.beginPosition, endPoint];
    const distance = HSCore.Util.Math.getDistance(points[0], points[1]);

    if (distance < 0.01) {
      this._hideOffsetDimension();
    } else {
      if (this.offsetDimension) {
        this.updateDimension(this.offsetDimension, points[0], points[1]);
      }

      if (this.offsetDimension && !this.offsetDimension.active) {
        this.offsetDimension.activate();
      }

      this.offsetDimension?.draw();
    }
  }

  onDraw(): void {
    if (this.element && this.element.length !== 0) {
      this.updateElements();
    } else {
      this.createElements();
    }
  }

  updateOffset(newOffset: Offset): void {
    this.offset = newOffset;
    this.dirtyGraph();
  }

  onCleanup(): void {
    if (this.drawing) {
      (this.layer as any).removeChild(this.drawing);
      (this.drawing as any).remove();
      this.drawing = undefined;
    }

    this._snapHelper.dispose();
    updateMouseTips();
    this.reset();
    this.cleanUpElements();

    super.onCleanup?.();
  }

  reset(): void {
    this.resetElemets();
  }

  cleanUpElements(): void {
    this.cleanUpStartIndicator();
    this.cleanUpPenIndicator();
    this.clearOffsetDimension();

    if (this.element) {
      this.element.length = 0;
    }
  }

  resetElemets(): void {
    this.cleanUpElements();
    this.createElements();
  }

  cleanUpStartIndicator(): void {
    if (this.startIndicator) {
      this.startIndicator.remove();
      this.startIndicator = undefined;
    }
  }

  getPenIndicatorStyle(): Record<string, string> {
    if (!this._isValid) {
      return this.styles.redPenIndicator!;
    }

    switch (this.pointType) {
      case PointType.linePoint:
        return this.styles.linePointIndicator!;
      case PointType.snapPoint:
        return this.styles.snapIndicator!;
      default:
        return this.styles.penIndicator!;
    }
  }

  cleanUpPenIndicator(): void {
    if (this.penIndicator) {
      this.penIndicator.remove();
      this.penIndicator = undefined;
    }
  }

  getIndicatorCircleRadius(): number {
    return 4 / HSApp.View.SVG.Util.CanvasToScreenFactor(this.context);
  }

  private _mixinIndicatorStyles(): void {
    this.styles = {
      ...this.styles,
      linePointIndicator: {
        fill: '#000',
        stroke: '#fff',
        'stroke-width': '1px',
        'vector-effect': 'non-scaling-stroke',
        'pointer-events': 'none'
      },
      redPenIndicator: {
        fill: '#f84b4d',
        stroke: '#ffffff',
        'stroke-width': '1px',
        'vector-effect': 'non-scaling-stroke',
        'pointer-events': 'none'
      },
      snapIndicator: {
        fill: '#77FED5',
        stroke: '#000',
        'stroke-width': '1px',
        'vector-effect': 'non-scaling-stroke',
        'pointer-events': 'none'
      }
    };
  }

  private _getModelPoint(event: MouseEvent): Vector2 {
    const screenPoint = [event.clientX, event.clientY];
    return new Vector2(HSApp.View.SVG.Util.ScreenPointToModel(screenPoint, this.canvas.context));
  }

  private _hideOffsetDimension(): void {
    this.offsetDimension?.hide();
    this.offsetDimension?.draw();
  }

  protected updateDimension(dimension: LinearDimension, start: Position, end: Position): void {
    // Implementation depends on the LinearDimension interface
  }
}