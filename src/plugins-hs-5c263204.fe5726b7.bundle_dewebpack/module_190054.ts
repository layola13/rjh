import { View, App, Core, Constants, FPConstants } from './types';

interface WallPoint {
  x: number;
  y: number;
}

interface Wall {
  from: WallPoint;
  to: WallPoint;
  next?: Wall;
  prev?: Wall;
  rotation: number;
  width: number;
}

interface DimensionSegment {
  start: Vec2;
  end: Vec2;
}

interface MovePointData {
  entity: WallPoint;
  position: Vec2;
}

interface ValueChangeEventData {
  value: number;
  oldValue: number;
  gizmo?: LinearDimension;
}

interface SettingChangeEventData {
  fieldName: string;
  value: unknown;
}

interface InputSwitchingEventData {
  // Event data for input switching
}

class Vec2 {
  constructor(public x: number, public y: number) {}

  static fromCoordinate(point: WallPoint): Vec2 {
    return new Vec2(point.x, point.y);
  }

  static difference(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  static distance(a: Vec2, b: Vec2): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static lerp(a: Vec2, b: Vec2, t: number): Vec2 {
    return new Vec2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  }

  static dot(a: Vec2, b: Vec2): number {
    return a.x * b.x + a.y * b.y;
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  add(other: Vec2): Vec2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  scale(scalar: number): Vec2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  normalize(): Vec2 {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }

  invert(): Vec2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
}

enum LinearDimensionStateEnum {
  editable = 'editable',
  disabled = 'disabled',
  focus = 'focus',
}

class LinearDimension {
  state: LinearDimensionStateEnum = LinearDimensionStateEnum.disabled;
  start: Vec2 = new Vec2(0, 0);
  end: Vec2 = new Vec2(0, 0);
  textPosition: Vec2 = new Vec2(0, 0);
  rotation: number = 0;
  min: number = 0;
  max: number = 0;
  inverted: boolean = false;
  valueChangeCommit: Signal<ValueChangeEventData> = new Signal();
  inputSwitching: Signal<InputSwitchingEventData> = new Signal();

  constructor(
    private entity: unknown,
    private canvas: unknown,
    private context: unknown
  ) {}

  updateState(state: LinearDimensionStateEnum, value: boolean): void {
    // Implementation
  }

  getValue(): number {
    return Vec2.distance(this.start, this.end);
  }
}

class Signal<T = unknown> {
  private listeners: Array<(data: { data: T }) => void> = [];

  listen(callback: (data: { data: T }) => void): this {
    this.listeners.push(callback);
    return this;
  }

  emit(data: T): void {
    this.listeners.forEach(listener => listener({ data }));
  }
}

class SignalHook {
  private connections: Array<() => void> = [];

  listen<T>(signal: Signal<T>, callback: (data: { data: T }) => void): this {
    signal.listen(callback);
    return this;
  }

  unlisten(): void {
    this.connections.forEach(disconnect => disconnect());
    this.connections = [];
  }
}

class Gizmo {
  protected childItems: LinearDimension[] = [];
  protected signalHook: SignalHook = new SignalHook();

  constructor(
    protected entity: unknown,
    protected canvas: unknown,
    protected context: unknown,
    protected controller: DisplayController
  ) {}

  protected addChildGizmo(gizmo: LinearDimension): void {
    this.childItems.push(gizmo);
  }

  show(): void {
    // Implementation
  }

  hide(): void {
    // Implementation
  }

  protected unlistenAllEvents(): void {
    this.signalHook.unlisten();
  }
}

enum DimensionTypeEnum {
  inner = 'inner',
  center = 'center',
  outer = 'outer',
}

class RepositionPointGizmo extends Gizmo {
  type: string = 'hsw.view.svg.gizmo.RepositionPoint';
  
  private readonly kDimensionTextOffset: number = 0;
  private leftDim: LinearDimension;
  private rightDim: LinearDimension;
  private defaultActiveDim: LinearDimension;
  private activeDim?: LinearDimension;
  private gizmoDirty: boolean = true;
  private dirty: boolean = false;
  private dimensionType: DimensionTypeEnum = DimensionTypeEnum.inner;

  constructor(entity: unknown, canvas: unknown, context: any) {
    super(entity, canvas, context, new RepositionPointController(context, entity));

    this.leftDim = new LinearDimension(entity, canvas, context);
    this.rightDim = new LinearDimension(entity, canvas, context);
    
    this.leftDim.updateState(LinearDimensionStateEnum.editable, true);
    this.rightDim.updateState(LinearDimensionStateEnum.editable, true);
    
    this.addChildGizmo(this.leftDim);
    this.addChildGizmo(this.rightDim);
    
    this.defaultActiveDim = this.leftDim;

    const appSettings = context.application.appSettings;
    this.defineField('dimensionType', appSettings.dimensionType);
  }

  private defineField(fieldName: string, initialValue: unknown): void {
    // Implementation
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
      .listen(appSettings.signalValueChanged, this._onSettingChanged.bind(this));

    this.childItems.forEach(childItem => {
      this.signalHook
        .listen(childItem.valueChangeCommit, this._onValueChangeCommit.bind(this))
        .listen(childItem.inputSwitching, this._onInputSwitching.bind(this));
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
    this.leftDim = undefined!;
    this.rightDim = undefined!;
    this.defaultActiveDim = undefined!;
  }

  private _getEditableWalls(): [Wall, Wall] | undefined {
    const walls = this.getParentWalls(this.entity);
    
    if (walls.length === 2 && this.isSameLine(walls[0], walls[1])) {
      const result: Wall[] = [];
      const firstWall = walls[0];
      
      if (this.isSamePoint(firstWall.to, this.entity)) {
        if (firstWall.next) {
          result.push(firstWall, firstWall.next);
        } else {
          result.push(firstWall, walls[1]);
        }
      } else {
        if (firstWall.prev) {
          result.push(firstWall.prev, firstWall);
        } else {
          result.push(walls[1], firstWall);
        }
      }
      
      return result as [Wall, Wall];
    }
    
    return undefined;
  }

  private getParentWalls(entity: unknown): Wall[] {
    // Implementation
    return [];
  }

  private isSameLine(wall1: Wall, wall2: Wall): boolean {
    // Implementation
    return false;
  }

  private isSamePoint(point1: unknown, point2: unknown): boolean {
    // Implementation
    return false;
  }

  update(): void {
    if (!this.context) return;

    if (this.context.application.isActiveView(this.canvas)) {
      this.show();
      this.gizmoDirty = true;
      this.dirty = true;
    } else {
      this.hide();
    }
  }

  draw(): void {
    if (this.gizmoDirty) {
      this._updateChildGizmo();
      this.gizmoDirty = false;
    }
  }

  private _updateChildGizmo(): void {
    const screenFactor = this.modelToScreenFactor(this.context);
    const DEFAULT_WALL_WIDTH = Constants.DEFAULT_WALL_WIDTH;
    let wallWidth = DEFAULT_WALL_WIDTH;
    const textOffset = this.kDimensionTextOffset / screenFactor;
    
    const editableWalls = this._getEditableWalls();
    if (!editableWalls) return;

    const segments: DimensionSegment[] = [];
    
    const allValid = editableWalls.every(wall => {
      const innerDimension = this.getInnerDimension([wall]);
      if (!innerDimension || this.isSamePoint(innerDimension.from, innerDimension.to)) {
        return false;
      }

      let startVec: Vec2;
      let endVec: Vec2;

      switch (this.dimensionType) {
        case DimensionTypeEnum.inner:
          startVec = Vec2.fromCoordinate(innerDimension.from);
          endVec = Vec2.fromCoordinate(innerDimension.to);
          break;
        case DimensionTypeEnum.center:
          startVec = Vec2.fromCoordinate(wall.from);
          endVec = Vec2.fromCoordinate(wall.to);
          wallWidth += wall.width / 2;
          break;
        default:
          startVec = Vec2.fromCoordinate(innerDimension.from);
          endVec = Vec2.fromCoordinate(innerDimension.to);
      }

      segments.push({ start: startVec, end: endVec });
      return true;
    });

    if (!allValid) return;

    const wallDirection = Vec2.difference(segments[0].end, segments[0].start);
    const normalVector = new Vec2(-wallDirection.y, wallDirection.x).normalize();
    const wallOffset = normalVector.clone().scale(wallWidth);
    const textOffsetVec = normalVector.clone().scale(textOffset);
    const rotation = editableWalls[0].rotation;
    
    const totalLength = segments.reduce((sum, segment) => {
      return sum + Vec2.distance(segment.end, segment.start);
    }, 0);

    const dimensions = [this.leftDim, this.rightDim];

    for (let i = 0; i < dimensions.length; i++) {
      const segment = segments[i];
      const dimension = dimensions[i];
      
      const startPos = Vec2.fromCoordinate(segment.start);
      const endPos = Vec2.fromCoordinate(segment.end);
      const midPos = Vec2.lerp(startPos, endPos, 0.5);
      
      startPos.add(wallOffset);
      endPos.add(wallOffset);
      midPos.add(wallOffset).add(textOffsetVec);
      
      dimension.start = startPos;
      dimension.end = endPos;
      dimension.textPosition = midPos;
      dimension.rotation = rotation;
      dimension.min = 0.001;
      dimension.max = totalLength;
      
      const segmentDirection = Vec2.difference(endPos, startPos);
      dimension.inverted = Vec2.dot(wallDirection, segmentDirection) < 0;
    }
  }

  private modelToScreenFactor(context: unknown): number {
    // Implementation
    return 1;
  }

  private getInnerDimension(walls: Wall[]): { from: WallPoint; to: WallPoint } | undefined {
    // Implementation
    return undefined;
  }

  setActiveDimension(dimension: LinearDimension): void {
    if (dimension.state === LinearDimensionStateEnum.disabled || dimension === this.activeDim) {
      return;
    }

    this.activeDim = dimension;

    for (const childItem of this.childItems) {
      const isFocused = childItem === this.activeDim;
      childItem.updateState(LinearDimensionStateEnum.focus, isFocused);
    }
  }

  private _onSettingChanged(event: { data: SettingChangeEventData }): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value as DimensionTypeEnum;
      this.update();
    }
  }

  private _onValueChangeCommit(event: { data: ValueChangeEventData }): void {
    if (this.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    this.controller.dispatch('valueChanged', this.entity, event);
    this.update();
  }

  private nearlyEquals(a: number, b: number, epsilon: number = 0.0001): boolean {
    return Math.abs(a - b) < epsilon;
  }

  private _onInputSwitching(event: { data: InputSwitchingEventData }): void {
    if (!this.activeDim) return;

    const dimensions = [this.leftDim, this.rightDim];
    const currentIndex = dimensions.indexOf(this.activeDim);
    
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % dimensions.length;
    this.setActiveDimension(dimensions[nextIndex]);
  }
}

class DisplayController {
  protected _cmdMgr: CommandManager;

  constructor(protected context: unknown, protected entity: unknown) {
    this._cmdMgr = new CommandManager();
  }

  dispatch(event: string, entity: unknown, eventData: { data: ValueChangeEventData }): void {
    if (eventData.data.gizmo) {
      this._movePointHandler(event, entity, eventData);
    }
  }

  private _movePointHandler(
    event: string,
    entity: unknown,
    eventData: { data: ValueChangeEventData }
  ): void {
    if (event !== 'valueChanged') return;

    const gizmo = eventData.data.gizmo;
    if (!gizmo) return;

    const point = entity as WallPoint;
    const direction = Vec2.difference(gizmo.end, gizmo.start).normalize();
    
    if (gizmo.inverted) {
      direction.invert();
    }

    if (Vec2.distance(point, gizmo.start) < Vec2.distance(point, gizmo.end)) {
      direction.invert();
    }

    const moveData: MovePointData = {
      entity: point,
      position: Vec2.fromCoordinate(point),
    };

    const commandType = FPConstants.CommandType.MoveNGWallPoint;
    const command = this._cmdMgr.createCommand(commandType, [moveData]);
    command.showGizmo = false;
    
    this._cmdMgr.execute(command);

    const newValue = eventData.data.value;
    const offset = direction.clone().scale(newValue - gizmo.getValue());

    this._cmdMgr.receive('gizmo.mousemove', { offset });
    this._cmdMgr.receive('gizmo.mouseup', { entity: undefined });
    this._cmdMgr.complete();
  }
}

class RepositionPointController extends DisplayController {}

class CommandManager {
  createCommand(type: string, args: unknown[]): Command {
    return new Command(type, args);
  }

  execute(command: Command): void {
    // Implementation
  }

  receive(event: string, data: unknown): void {
    // Implementation
  }

  complete(): void {
    // Implementation
  }
}

class Command {
  showGizmo: boolean = true;

  constructor(public type: string, public args: unknown[]) {}
}

export default RepositionPointGizmo;
export { RepositionPointController, LinearDimensionStateEnum };