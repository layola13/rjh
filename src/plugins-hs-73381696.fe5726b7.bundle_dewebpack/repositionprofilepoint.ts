import { Point, Edge, Coedge } from './core/types';
import { Vec2 } from './core/math';

interface Coordinate {
  x: number;
  y: number;
}

interface DimensionSegment {
  start: Vec2;
  end: Vec2;
}

interface ValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo?: LinearDimension;
    fieldName?: string;
  };
}

interface InputSwitchEvent {
  data: unknown;
}

enum LinearDimensionStateEnum {
  editable = 'editable',
  focus = 'focus',
  disabled = 'disabled'
}

class LinearDimension {
  start: Vec2;
  end: Vec2;
  textPosition: Vec2;
  rotation: number;
  min: number;
  max: number;
  inverted: boolean;
  state: LinearDimensionStateEnum;
  valueChangeCommit: Signal<ValueChangeEvent>;
  inputSwitching: Signal<InputSwitchEvent>;

  constructor(entity: unknown, canvas: unknown, context: unknown) {
    // Implementation
  }

  updateState(state: LinearDimensionStateEnum, value: boolean): void {
    // Implementation
  }

  getValue(): number {
    // Implementation
    return 0;
  }
}

class Gizmo {
  entity: Point;
  canvas: unknown;
  context: ApplicationContext;
  controller: DisplayController;
  signalHook: SignalHook;
  childItems: LinearDimension[];
  dirty: boolean;
  type: string;

  constructor(entity: unknown, canvas: unknown, context: unknown, controller?: DisplayController) {
    // Implementation
  }

  addChildGizmo(gizmo: LinearDimension): void {
    // Implementation
  }

  show(): void {
    // Implementation
  }

  hide(): void {
    // Implementation
  }

  defineField(fieldName: string, value: unknown): void {
    // Implementation
  }

  unlistenAllEvents(): void {
    // Implementation
  }
}

interface ApplicationSettings {
  dimensionType: string;
  signalValueChanged: Signal<ValueChangeEvent>;
}

interface TransactionManager {
  signalUndone: Signal<unknown>;
  signalRedone: Signal<unknown>;
}

interface Application {
  appSettings: ApplicationSettings;
  transManager: TransactionManager;
  signalViewActivated: Signal<unknown>;
  isActiveView(canvas: unknown): boolean;
}

interface ApplicationContext {
  application: Application;
}

interface Signal<T> {
  // Signal type definition
}

interface SignalHook {
  listen(signal: Signal<unknown>, callback: (event?: unknown) => void): SignalHook;
}

interface CommandManager {
  createCommand(commandType: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(eventType: string, data: unknown): void;
}

interface Command {
  showGizmo: boolean;
}

export class RepositionProfilePoint extends Gizmo {
  private readonly DIMENSION_TEXT_OFFSET = 0;
  private leftDim: LinearDimension;
  private rightDim: LinearDimension;
  private defaultActiveDim: LinearDimension;
  private activeDim?: LinearDimension;
  private gizmoDirty: boolean;
  private dimensionType: string;

  constructor(entity: unknown, canvas: unknown, context: ApplicationContext) {
    const controller = new RepositionProfilePointController(context, canvas);
    super(entity, canvas, context, controller);

    this.type = 'hsw.view.svg.gizmo.RepositionProfilePoint';
    this.gizmoDirty = true;

    this.leftDim = new LinearDimension(entity, canvas, context);
    this.rightDim = new LinearDimension(entity, canvas, context);

    this.leftDim.updateState(LinearDimensionStateEnum.editable, true);
    this.rightDim.updateState(LinearDimensionStateEnum.editable, true);

    this.addChildGizmo(this.leftDim);
    this.addChildGizmo(this.rightDim);

    this.defaultActiveDim = this.leftDim;

    const appSettings = context.application.appSettings;
    this.defineField('dimensionType', appSettings.dimensionType);
    this.dimensionType = appSettings.dimensionType as string;
  }

  onActivate(): void {
    this.update();

    this.signalHook.listen(this.entity.signalDirty, () => {
      this.update();
    });

    const updateHandler = () => {
      this.update();
    };

    const application = this.context.application;
    const transManager = application.transManager;
    const appSettings = application.appSettings;

    this.signalHook
      .listen(transManager.signalUndone, updateHandler)
      .listen(transManager.signalRedone, updateHandler)
      .listen(appSettings.signalValueChanged, this.onSettingChanged.bind(this));

    this.childItems.forEach((item) => {
      this.signalHook
        .listen(item.valueChangeCommit, this.onValueChangeCommit.bind(this))
        .listen(item.inputSwitching, this.onInputSwitching.bind(this));
    });

    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    this.setActiveDimension(this.defaultActiveDim);
  }

  onDeactivate(): void {
    this.unlistenAllEvents();
  }

  onCleanup(): void {
    this.leftDim = undefined as unknown as LinearDimension;
    this.rightDim = undefined as unknown as LinearDimension;
    this.defaultActiveDim = undefined as unknown as LinearDimension;
  }

  private getEditableCoedges(): Coedge[] | undefined {
    const edges = HSCore.Util.Point.getParentEdges(this.entity);
    const coedges: Coedge[] = [];

    edges.forEach((edge: Edge) => {
      if (edge.coedge) {
        coedges.push(edge.coedge);
        if (edge.coedge.partner) {
          coedges.push(edge.coedge.partner);
        }
      }
    });

    if (
      coedges.length === 2 &&
      HSCore.Util.Math.isSameLine(
        coedges[0].from,
        coedges[0].to,
        coedges[1].from,
        coedges[1].to
      )
    ) {
      const result: Coedge[] = [];
      const firstCoedge = coedges[0];

      if (HSCore.Util.Math.isSamePoint(firstCoedge.to, this.entity)) {
        if (firstCoedge.next) {
          result.push(firstCoedge, firstCoedge.next);
        } else {
          result.push(firstCoedge, coedges[1]);
        }
      } else {
        if (firstCoedge.prev) {
          result.push(firstCoedge.prev, firstCoedge);
        } else {
          result.push(coedges[1], firstCoedge);
        }
      }

      return result;
    }

    return undefined;
  }

  update(): void {
    if (this.context?.application.isActiveView(this.canvas)) {
      this.show();
      this.gizmoDirty = true;
      this.dirty = true;
    } else {
      this.hide();
    }
  }

  draw(): void {
    if (this.gizmoDirty) {
      this.updateChildGizmo();
      this.gizmoDirty = false;
    }
  }

  private updateChildGizmo(): void {
    const modelToScreenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    const wallWidthOffset = -HSConstants.Constants.DEFAULT_WALL_WIDTH;
    const textOffset = this.DIMENSION_TEXT_OFFSET / modelToScreenFactor;

    const coedges = this.getEditableCoedges();
    if (!coedges) {
      return;
    }

    const segments: DimensionSegment[] = [];

    for (const coedge of coedges) {
      const startVec = HSCore.Util.Math.Vec2.fromCoordinate(coedge.from);
      const endVec = HSCore.Util.Math.Vec2.fromCoordinate(coedge.to);
      segments.push({
        start: startVec,
        end: endVec
      });
    }

    const direction = HSCore.Util.Math.Vec2.difference(segments[0].end, segments[0].start);
    const normalVector = HSCore.Util.Math.Vec2.fromCoordinate({
      x: -direction.y,
      y: direction.x
    }).normalize();

    const offsetVector = normalVector.clone().scale(wallWidthOffset);
    const textOffsetVector = normalVector.clone().scale(textOffset);
    const rotation = coedges[0].rotation;

    const totalLength = segments.reduce((sum, segment) => {
      return sum + HSCore.Util.Math.Vec2.distance(segment.end, segment.start);
    }, 0);

    const dimensions = [this.leftDim, this.rightDim];

    for (let i = 0; i < dimensions.length; i++) {
      const segment = segments[i];
      const dimension = dimensions[i];

      const startPoint = HSCore.Util.Math.Vec2.fromCoordinate(segment.start);
      const endPoint = HSCore.Util.Math.Vec2.fromCoordinate(segment.end);
      const midPoint = HSCore.Util.Math.Vec2.lerp(startPoint, endPoint, 0.5);

      startPoint.add(offsetVector);
      endPoint.add(offsetVector);
      midPoint.add(offsetVector).add(textOffsetVector);

      dimension.start = startPoint;
      dimension.end = endPoint;
      dimension.textPosition = midPoint;
      dimension.rotation = rotation;
      dimension.min = 0.001;
      dimension.max = totalLength;

      const segmentDirection = HSCore.Util.Math.Vec2.difference(endPoint, startPoint);
      const dotProduct = HSCore.Util.Math.Vec2.dot(direction, segmentDirection);
      dimension.inverted = dotProduct < 0;
    }
  }

  setActiveDimension(dimension: LinearDimension): void {
    if (dimension.state !== LinearDimensionStateEnum.disabled && dimension !== this.activeDim) {
      this.activeDim = dimension;

      for (const item of this.childItems) {
        const isFocused = item === this.activeDim;
        item.updateState(LinearDimensionStateEnum.focus, isFocused);
      }
    }
  }

  private onSettingChanged(event: ValueChangeEvent): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value as unknown as string;
      this.update();
    }
  }

  private onValueChangeCommit(event: ValueChangeEvent): void {
    if (!HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      this.controller.dispatch('valueChanged', this.entity, event);
      this.update();
    }
  }

  private onInputSwitching(event: InputSwitchEvent): void {
    if (!this.activeDim) {
      return;
    }

    const dimensions = [this.leftDim, this.rightDim];
    const currentIndex = dimensions.indexOf(this.activeDim);

    if (currentIndex === -1) {
      return;
    }

    const nextIndex = (currentIndex + 1) % dimensions.length;
    this.setActiveDimension(dimensions[nextIndex]);
  }
}

class DisplayController {
  protected entity: Point;
  protected _cmdMgr: CommandManager;

  constructor(entity: unknown, canvas: unknown) {
    // Implementation
  }

  dispatch(eventType: string, entity: Point, event: ValueChangeEvent): void {
    // Implementation
  }
}

class RepositionProfilePointController extends DisplayController {
  constructor(entity: unknown, canvas: unknown) {
    super(entity, canvas);
  }

  dispatch(eventType: string, entity: Point, event: ValueChangeEvent): void {
    if (event.data.gizmo) {
      this.movePointHandler(eventType, entity, event);
    }
  }

  private movePointHandler(eventType: string, entity: Point, event: ValueChangeEvent): void {
    if (eventType !== 'valueChanged') {
      return;
    }

    const gizmo = event.data.gizmo;
    if (!gizmo) {
      return;
    }

    const point = this.entity;
    const direction = HSCore.Util.Math.Vec2.difference(gizmo.end, gizmo.start).normalize();

    if (gizmo.inverted) {
      direction.invert();
    }

    const distanceToStart = HSCore.Util.Math.Vec2.distance(point, gizmo.start);
    const distanceToEnd = HSCore.Util.Math.Vec2.distance(point, gizmo.end);

    if (distanceToStart < distanceToEnd) {
      direction.invert();
    }

    const command = this._cmdMgr.createCommand('hsw.cmd.layer.CmdMoveSlabProfileVertex', [entity]);
    command.showGizmo = false;
    this._cmdMgr.execute(command);

    const newValue = event.data.value;
    const offset = direction.clone().scale(newValue - gizmo.getValue());

    this._cmdMgr.receive('gizmo.mousemove', { offset });
    this._cmdMgr.receive('gizmo.mouseup', { entity: undefined });
  }
}