// @ts-nocheck
import HSApp from './HSApp';
import HSCore from './HSCore';
import HSFPConstants from './HSFPConstants';
import HSConstants from './HSConstants';

type Coordinate = {
  x: number;
  y: number;
};

type DimensionData = {
  start: Coordinate;
  end: Coordinate;
  min: number;
  max: number;
  invalid?: boolean;
};

type ComputedDimensionData = {
  left: DimensionData;
  right: DimensionData;
};

type WallDimension = {
  from: Coordinate;
  to: Coordinate;
};

type Entity = {
  YSize: number;
  XSize: number;
  x: number;
  y: number;
  rotation: number;
  signalDirty: any;
  getCoWall?: () => Wall | null;
  getHost: () => any;
  instanceOf: (modelClass: string) => boolean;
};

type Wall = {
  middle: Coordinate;
  rotation: number;
  direction: {
    x: number;
    y: number;
    normalize: () => { x: number; y: number; clone: () => any };
    clone: () => any;
  };
  width?: number;
};

type ApplicationSettings = {
  dimensionType: string;
  signalValueChanged: any;
};

type Application = {
  appSettings: ApplicationSettings;
  signalViewActivated: any;
  cmdManager: CommandManager;
};

type Context = {
  application: Application;
  document: {
    globalWallWidth: number;
  };
};

type CommandManager = {
  signalCommandSuspending: any;
  signalCommandTerminating: any;
  createCommand: (type: string, args: any[]) => Command;
  execute: (command: Command) => void;
  complete: () => void;
};

type Command = {
  type: string;
  content?: Entity;
  output?: Entity;
  showGizmo?: boolean;
  move: (delta: [number, number], options: { ctrlKey: boolean }) => void;
};

type EventData = {
  data: {
    cmd?: Command;
    fieldName?: string;
    value?: any;
    oldValue?: any;
    gizmo?: LinearDimension;
  };
};

const LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;
const LinearDimension = HSApp.View.SVG.LinearDimension;

class CustomizedWallAttachedModelDimensionController extends HSApp.View.Base.DisplayController {
  public gizmo: CustomizedWallAttachedModelDimension;
  protected entity: Entity;
  protected _cmdMgr: CommandManager;

  constructor(entity: Entity, context: Context, gizmo: CustomizedWallAttachedModelDimension) {
    super(entity, context);
    this.gizmo = gizmo;
  }

  public dispatch(event: EventData): void {
    const eventData = event.data;
    const oldValue = eventData.oldValue ?? 0;
    const newValue = eventData.value ?? 0;

    if (HSCore.Util.Math.nearlyEquals(newValue, oldValue)) {
      return;
    }

    const gizmo = eventData.gizmo;
    if (!gizmo) {
      return;
    }

    const valueDelta = newValue - gizmo.getValue();
    const wall = this.entity.getCoWall?.() ?? null;

    if (!wall) {
      return;
    }

    const direction = wall.direction.normalize();
    let moveOffset: Coordinate = { x: 0, y: 0 };

    if (gizmo === this.gizmo.leftDim) {
      const scaled = direction.clone().scale(valueDelta);
      moveOffset = scaled;
    } else if (gizmo === this.gizmo.rightDim) {
      const scaled = direction.clone().scale(-valueDelta);
      moveOffset = scaled;
    }

    const moveCommand = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.MoveContent,
      [
        this.entity,
        undefined,
        {
          wallSnapEnable: false,
          ceilingSnapEnable: false,
          autoFitDirectionEnable: false
        }
      ]
    );

    moveCommand.showGizmo = false;
    this._cmdMgr.execute(moveCommand);
    moveCommand.move([moveOffset.x, moveOffset.y], { ctrlKey: true });
    this._cmdMgr.complete();
  }
}

export default class CustomizedWallAttachedModelDimension extends HSApp.View.SVG.Gizmo {
  public type: string = 'hsw.view.svg.gizmo.CustomizedWallAttachedModelDimension';
  public controller: CustomizedWallAttachedModelDimensionController;
  public leftDim: typeof LinearDimension;
  public rightDim: typeof LinearDimension;
  public defaultActiveDim: typeof LinearDimension | null;
  public gizmoDirty: boolean;
  public dimensionType: string;
  public activeDim?: typeof LinearDimension;
  protected entity: Entity;
  protected context: Context;
  protected signalHook: any;
  protected childItems: Array<typeof LinearDimension>;

  constructor(entity: Entity, context: Context, parent: any) {
    const controller = new CustomizedWallAttachedModelDimensionController(parent, entity, null as any);
    super(entity, context, parent, controller);

    this.controller.gizmo = this;

    this.leftDim = new LinearDimension(entity, context, parent);
    this.rightDim = new LinearDimension(entity, context, parent);

    this.leftDim.updateState(LinearDimensionStateEnum.editable, true);
    this.rightDim.updateState(LinearDimensionStateEnum.editable, true);

    this.addChildGizmo(this.leftDim);
    this.addChildGizmo(this.rightDim);

    this.defaultActiveDim = null;

    const appSettings = entity.application.appSettings;
    this.defineField('dimensionType', appSettings.dimensionType);

    this.gizmoDirty = true;
  }

  public onActivate(): void {
    this.update();

    this.signalHook.listen(this.entity.signalDirty, () => {
      this.update();
    });

    const application = this.context.application;
    const appSettings = application.appSettings;

    this.signalHook.listen(appSettings.signalValueChanged, this._onSettingChanged);

    this.childItems.forEach((childItem) => {
      this.signalHook
        .listen(childItem.valueChangeCommit, this._onValueChangeCommit)
        .listen(childItem.inputSwitching, this._onInputSwitching);
    }, this);

    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    const commandHandler = (event: EventData) => {
      const cmd = event.data.cmd;
      if (!cmd) {
        return;
      }

      if (document?.activeElement) {
        const activeElement = document.activeElement;
        if (activeElement.nodeName === 'INPUT' && !LinearDimension.isDimensionInput(activeElement)) {
          return;
        }
      }

      const isMoveOrPlace =
        cmd.type === HSFPConstants.CommandType.MoveContent ||
        cmd.type === HSFPConstants.CommandType.PlaceProduct;

      if (isMoveOrPlace && (cmd.content === this.entity || cmd.output === this.entity)) {
        for (const childItem of this.childItems) {
          const isFocused = childItem === this.activeDim;
          childItem.updateState(LinearDimensionStateEnum.focus, isFocused);
        }
      }
    };

    const cmdManager = this.context.application.cmdManager;
    this.signalHook
      .listen(cmdManager.signalCommandSuspending, commandHandler)
      .listen(cmdManager.signalCommandTerminating, commandHandler);

    super.onActivate();
  }

  public onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate();
  }

  public onCleanup(): void {
    this.leftDim = undefined as any;
    this.rightDim = undefined as any;
    this.defaultActiveDim = undefined as any;
    super.onCleanup();
  }

  public update(): void {
    this.show();
    this.gizmoDirty = true;
    this.dirty = true;
  }

  public draw(): void {
    if (this.gizmoDirty) {
      this._updateChildGizmo();
      this.gizmoDirty = false;
    }
    super.draw();
  }

  public setActiveDimension(dimension: typeof LinearDimension): void {
    if (!dimension || dimension.state === LinearDimensionStateEnum.disabled || dimension === this.activeDim) {
      return;
    }

    this.activeDim = dimension;

    for (const childItem of this.childItems) {
      const isFocused = childItem === this.activeDim;
      childItem.updateState(LinearDimensionStateEnum.focus, isFocused);
    }
  }

  private _onSettingChanged(event: EventData): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value;
      this.update();
    }
  }

  private _onValueChangeCommit(event: EventData): void {
    this.controller.dispatch(event);
  }

  private _onInputSwitching(): void {
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

  private _updateChildGizmo(): void {
    const wall = this.entity.getCoWall?.() ?? null;
    if (!wall) {
      return;
    }

    const wallDimension = HSCore.Util.Geometry.getWallDimension(wall);
    if (!wallDimension) {
      return;
    }

    const from = wallDimension.from;
    const to = wallDimension.to;

    if (HSCore.Util.Math.isSamePoint(from, to)) {
      return;
    }

    const fromVec = HSCore.Util.Math.Vec2.fromCoordinate(from);
    const toVec = HSCore.Util.Math.Vec2.fromCoordinate(to);
    const halfEntityHeight = this.entity.YSize / 2;

    const dimensionData = this._computeDimensionData(fromVec, toVec);
    if (!dimensionData) {
      return;
    }

    const wallDirection = HSCore.Util.Math.Vec2.difference(to, from);
    const closestPoint = HSCore.Util.Math.getPerpendicularIntersect(wall.middle, from, to);
    const perpendicular = new HSCore.Util.Math.Vec2(
      closestPoint.x - wall.middle.x,
      closestPoint.y - wall.middle.y
    );
    perpendicular.normalize();

    const offset = perpendicular.clone().scale(halfEntityHeight);
    const rotation = wall.rotation;

    const dimensionMap: Record<'left' | 'right', typeof LinearDimension> = {
      left: this.leftDim,
      right: this.rightDim
    };

    for (const side in dimensionMap) {
      const dimension = dimensionMap[side as 'left' | 'right'];
      const data = dimensionData[side as 'left' | 'right'];

      const startVec = HSCore.Util.Math.Vec2.fromCoordinate(data.start);
      const endVec = HSCore.Util.Math.Vec2.fromCoordinate(data.end);
      const midpoint = HSCore.Util.Math.Vec2.lerp(startVec, endVec, 0.5);

      startVec.add(offset);
      endVec.add(offset);
      midpoint.add(offset);

      dimension.start = startVec;
      dimension.end = endVec;
      dimension.textPosition = midpoint;
      dimension.rotation = rotation;
      dimension.min = data.min;
      dimension.max = data.max;

      const dimensionDirection = HSCore.Util.Math.Vec2.difference(endVec, startVec);
      const dotProduct = HSCore.Util.Math.Vec2.dot(wallDirection, dimensionDirection);

      dimension.inverted = dotProduct < 0;
      dimension.updateState(LinearDimensionStateEnum.invalid, data.invalid ?? false);
    }
  }

  private _computeDimensionData(from: Coordinate, to: Coordinate): ComputedDimensionData | null {
    const entity = this.entity;
    const wallLine = new HSCore.Util.Math.Line(from.x, from.y, to.x, to.y);

    const geometry = this._computeFeatureWallGeometry(entity);
    const leftCorner = geometry[0];
    const rightCorner = geometry[3];

    let leftParam = wallLine.getClosestLinearInterpolation_(leftCorner.x, leftCorner.y);
    let rightParam = wallLine.getClosestLinearInterpolation_(rightCorner.x, rightCorner.y);

    if (rightParam < leftParam) {
      [leftParam, rightParam] = [rightParam, leftParam];
    }

    const leftPoint = wallLine.getInterpolatedPoint(leftParam);
    const rightPoint = wallLine.getInterpolatedPoint(rightParam);
    const wallLength = HSCore.Util.Math.Vec2.difference(from, to).magnitude();
    const maxDimension = wallLength - entity.XSize;

    return {
      left: {
        start: from,
        end: leftPoint,
        min: 0,
        max: maxDimension
      },
      right: {
        start: rightPoint,
        end: to,
        min: 0,
        max: maxDimension
      }
    };
  }

  private _computeFeatureWallGeometry(entity: Entity): Coordinate[] {
    const host = entity.getHost();
    let wallWidth: number;

    if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      wallWidth = host.width;
    } else {
      wallWidth = this.context.document.globalWallWidth;
    }

    const position: Coordinate = {
      x: entity.x,
      y: entity.y
    };

    const rotation = entity.rotation;

    return HSCore.Util.Math.computeOutline(position, entity.XSize, wallWidth, rotation);
  }
}