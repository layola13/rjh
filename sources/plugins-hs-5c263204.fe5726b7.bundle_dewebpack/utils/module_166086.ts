// @ts-nocheck
import HSApp from './HSApp';
import HSCore from './HSCore';
import HSFPConstants from './HSFPConstants';

type DimensionData = {
  start: HSCore.Util.Math.Vec2;
  end: HSCore.Util.Math.Vec2;
  textPosition: HSCore.Util.Math.Vec2;
  min: number;
  max: number;
  invalid: boolean;
  inverted: boolean;
};

type DimensionDataSet = {
  left: DimensionData;
  right: DimensionData;
  corenerBDim: DimensionData;
};

type EditWindowOptions = {
  sideB?: number;
};

type MoveCommandOptions = {
  wallSnapEnable: boolean;
  ceilingSnapEnable: boolean;
  autoFitDirectionEnable: boolean;
};

type ValueChangeEventData = {
  gizmo: HSApp.View.SVG.LinearDimension;
  value: number;
  oldValue: number;
};

type SettingChangedEventData = {
  fieldName: string;
  value: unknown;
};

type CommandEventData = {
  cmd?: unknown;
};

const DIMENSION_OFFSET = 24;
const DIMENSION_TEXT_OFFSET = 0;

class POrdinaryWindowDimensionController extends HSApp.View.Base.DisplayController {
  gizmo?: POrdinaryWindowDimension;

  constructor(
    entity: unknown,
    context: unknown,
    gizmoInstance: POrdinaryWindowDimension
  ) {
    super(entity, context);
    this.gizmo = gizmoInstance;
  }

  dispatch(action: string, entity: unknown, event: { data: ValueChangeEventData }): void {
    switch (action) {
      case 'editpordinaryWindow':
        this.handleEditWindow(event);
        break;
      case 'editLocationDimension':
        this.handleEditLocation(event);
        break;
    }
  }

  private handleEditWindow(event: { data: ValueChangeEventData }): void {
    const eventData = event.data;
    const gizmo = eventData.gizmo;
    if (!gizmo) return;

    const options: EditWindowOptions = {};
    if (this.gizmo?.corenerBDim === eventData.gizmo) {
      options.sideB = eventData.value;
    }

    const command = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.EditCornerWindow,
      [this.entity, options, true]
    );
    this._cmdMgr.execute(command);
    this._cmdMgr.complete();
    this._editCmd = null;
  }

  private handleEditLocation(event: { data: ValueChangeEventData }): void {
    const referenceWall = this.gizmo?.findReferenceWall();
    if (!referenceWall) return;

    const eventData = event.data;
    const gizmo = eventData.gizmo;
    if (!gizmo) return;

    this._moveCmd = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.MoveContent,
      [this.entity, undefined, { viewType: '2d' }]
    );
    this._moveCmd.showGizmo = false;

    const moveOptions: MoveCommandOptions = {
      wallSnapEnable: false,
      ceilingSnapEnable: false,
      autoFitDirectionEnable: false,
    };
    this._cmdMgr.execute(this._moveCmd, moveOptions);

    const valueDelta = eventData.value - gizmo.getValue();
    const wallDirection = referenceWall.transDirection.normalize();
    let offset = { x: 0, y: 0 };

    if (gizmo === this.gizmo?.leftDim) {
      offset = wallDirection.clone().scale(-valueDelta);
    } else if (gizmo === this.gizmo?.rightDim) {
      offset = wallDirection.clone().scale(valueDelta);
    }

    this._cmdMgr.receive('moveto', {
      position: {
        x: this.entity.x + offset.x,
        y: this.entity.y + offset.y,
      },
    });
    this._cmdMgr.complete();
  }
}

export default class POrdinaryWindowDimension extends HSApp.View.SVG.Gizmo {
  type = 'hsw.view.svg.gizmo.POrdinaryWindowDimension';
  kDimensionOffset = DIMENSION_OFFSET;
  kDimensionTextOffset = DIMENSION_TEXT_OFFSET;
  controller: POrdinaryWindowDimensionController;
  leftDim: HSApp.View.SVG.LinearDimension;
  rightDim: HSApp.View.SVG.LinearDimension;
  corenerBDim: HSApp.View.SVG.LinearDimension;
  gizmoDirty = true;
  activeDim?: HSApp.View.SVG.LinearDimension;
  dimensionType?: HSApp.App.DimensionTypeEnum;

  constructor(entity: unknown, context: unknown, parent: unknown) {
    const controller = new POrdinaryWindowDimensionController(parent, entity, this as unknown as POrdinaryWindowDimension);
    super(entity, context, parent, controller);

    this.controller = controller;
    this.controller.gizmo = this;

    this.leftDim = new HSApp.View.SVG.LinearDimension(entity, context, parent);
    this.rightDim = new HSApp.View.SVG.LinearDimension(entity, context, parent);
    this.corenerBDim = new HSApp.View.SVG.LinearDimension(entity, context, parent);

    const LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;
    this.leftDim.updateState(LinearDimensionStateEnum.editable, true);
    this.rightDim.updateState(LinearDimensionStateEnum.editable, true);
    this.corenerBDim.updateState(LinearDimensionStateEnum.editable, true);

    this.addChildGizmo(this.leftDim);
    this.addChildGizmo(this.rightDim);
    this.addChildGizmo(this.corenerBDim);

    const appSettings = HSApp.App.getApp().appSettings;
    this.defineField('dimensionType', appSettings.dimensionType);
  }

  onActivate(): void {
    this.update();
    this.signalHook.listen(this.entity.signalDirty, () => {
      this.update();
    });

    const application = this.context.application;
    const appSettings = application.appSettings;
    this.signalHook.listen(appSettings.signalValueChanged, this._onSettingChanged.bind(this));

    this.childItems.forEach((childItem: HSApp.View.SVG.LinearDimension) => {
      this.signalHook
        .listen(childItem.valueChangeCommit, this._onValueChangeCommit.bind(this))
        .listen(childItem.inputSwitching, this._onInputSwitching.bind(this));
    });

    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    const handleCommandEvent = (event: { data: CommandEventData }): void => {
      if (event.data.cmd && document?.activeElement) {
        const activeElement = document.activeElement;
        if (
          activeElement.nodeName === 'INPUT' &&
          !HSApp.View.SVG.LinearDimension.isDimensionInput(activeElement)
        ) {
          return;
        }
      }
    };

    const commandManager = HSApp.App.getApp().cmdManager;
    this.signalHook
      .listen(commandManager.signalCommandSuspending, handleCommandEvent)
      .listen(commandManager.signalCommandTerminating, handleCommandEvent);

    super.onActivate?.();
  }

  onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate?.();
  }

  onCleanup(): void {
    this.leftDim = undefined!;
    this.rightDim = undefined!;
    this.corenerBDim = undefined!;
    super.onCleanup?.();
  }

  update(): void {
    if (!this.entity) return;

    if (this.entity._host) {
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
    super.draw?.();
  }

  setActiveDimension(dimension: HSApp.View.SVG.LinearDimension): void {
    const LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;
    if (
      dimension &&
      dimension.state !== LinearDimensionStateEnum.disabled &&
      dimension !== this.activeDim
    ) {
      this.activeDim = dimension;

      for (const childItem of this.childItems) {
        const isFocused = childItem === this.activeDim;
        childItem.updateState(LinearDimensionStateEnum.focus, isFocused);
      }
    }
  }

  findReferenceWall(): HSCore.Model.Wall | undefined {
    const entity = this.entity;
    if (!entity) return undefined;

    const host = entity.getHost();
    return host instanceof HSCore.Model.Wall ? host : undefined;
  }

  private _onSettingChanged(event: { data: SettingChangedEventData }): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value as HSApp.App.DimensionTypeEnum;
      this.update();
    }
  }

  private _onValueChangeCommit(event: { data: ValueChangeEventData }): void {
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    if (event.data.gizmo === this.leftDim || event.data.gizmo === this.rightDim) {
      this.controller.dispatch('editLocationDimension', this.entity, event);
    } else {
      this.controller.dispatch('editpordinaryWindow', this.entity, event);
    }
  }

  private _onInputSwitching(): void {
    if (!this.activeDim) return;

    const dimensions = [this.leftDim, this.middleDim, this.rightDim];
    const currentIndex = dimensions.indexOf(this.activeDim);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % dimensions.length;
    this.setActiveDimension(dimensions[nextIndex]);
  }

  private _updateChildGizmo(): void {
    const entity = this.entity;
    const referenceWall = this.findReferenceWall();
    if (!entity || !referenceWall) return;

    const dimensionData = this._computeDimensionData(referenceWall);
    if (!dimensionData) return;

    const dimensionMap: Record<string, HSApp.View.SVG.LinearDimension> = {
      left: this.leftDim,
      right: this.rightDim,
      corenerBDim: this.corenerBDim,
    };

    for (const key in dimensionMap) {
      const dimension = dimensionMap[key];
      const data = dimensionData[key as keyof DimensionDataSet];
      dimension.start = data.start;
      dimension.end = data.end;
      dimension.textPosition = data.textPosition;
      dimension.min = data.min;
      dimension.max = data.max;
      dimension.inverted = data.inverted;
      dimension.updateState(HSApp.View.SVG.LinearDimensionStateEnum.invalid, data.invalid);
    }
  }

  private _computeDimensionData(wall: HSCore.Model.Wall): DimensionDataSet | undefined {
    const screenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    let dimensionOffset = this.kDimensionOffset / screenFactor;
    const textOffset = this.kDimensionTextOffset / screenFactor;

    const wallDimension = HSCore.Util.Geometry.getWallDimension(wall);
    if (!wallDimension) return undefined;

    const wallFrom = wallDimension.from;
    const wallTo = wallDimension.to;
    const firstWall = wallDimension.walls[0];
    const lastWall = wallDimension.walls[wallDimension.walls.length - 1];

    switch (this.dimensionType) {
      case HSApp.App.DimensionTypeEnum.inner:
        HSCore.Util.Math.Vec2.fromCoordinate(wallFrom);
        HSCore.Util.Math.Vec2.fromCoordinate(wallTo);
        dimensionOffset += wall.width / 2;
        break;
      case HSApp.App.DimensionTypeEnum.center:
        HSCore.Util.Math.Vec2.fromCoordinate(firstWall.from);
        HSCore.Util.Math.Vec2.fromCoordinate(lastWall.to);
        dimensionOffset += wall.width / 2;
        break;
      default:
        HSCore.Util.Math.Vec2.fromCoordinate(wallFrom);
        HSCore.Util.Math.Vec2.fromCoordinate(wallTo);
    }

    const entity = this.entity;
    const innerPoints = entity.partsInfo.boundings.innerPoints;
    const outerPoints = entity.partsInfo.boundings.outerPoints;

    const innerPoint0 = new HSCore.Util.Math.Vec2(innerPoints[0].x, innerPoints[0].y);
    const innerPoint1 = new HSCore.Util.Math.Vec2(innerPoints[1].x, innerPoints[1].y);
    const outerPoint1 = new HSCore.Util.Math.Vec2(outerPoints[1].x, outerPoints[1].y);
    const outerPoint0 = new HSCore.Util.Math.Vec2(outerPoints[0].x, outerPoints[0].y);

    const dimData = HSApp.View.Util.getDimensionData(
      outerPoint0,
      outerPoint1,
      innerPoint1,
      dimensionOffset,
      textOffset,
      true
    );

    let leftDistance = HSCore.Util.Math.Vec2.difference(dimData.start, innerPoint0).magnitude();
    if (this.dimensionType === HSApp.App.DimensionTypeEnum.center) {
      leftDistance -= wall.width / 2;
    }

    const sideRangeData = entity.getSideRangeData();
    const normalVector = new HSCore.Util.Math.Vec2(
      outerPoint1.x - innerPoint1.x,
      outerPoint1.y - innerPoint1.y
    );
    normalVector.normalize();

    const offsetVector = normalVector.clone().scale(leftDistance);
    const adjacentPoint = HSApp.Util.Opening.getClosestAdjacentPointOnWall(
      this.entity,
      this.dimensionType,
      wallDimension.walls
    );

    const leftStart = adjacentPoint.start.add(offsetVector);
    const rightEnd = adjacentPoint.end.add(offsetVector);
    const insideOverlap = adjacentPoint.insideOthersOverlap;

    const totalWidth = HSCore.Util.Math.Vec2.difference(leftStart, rightEnd).magnitude();
    const entityPosition = new THREE.Vector2(entity.x, entity.y);
    const cornerStart = dimData.start.clone().add(entityPosition);
    const cornerEnd = dimData.end.clone().add(entityPosition);

    const wallVector = HSCore.Util.Math.Vec2.difference(wallTo, wallFrom);
    const leftVector = HSCore.Util.Math.Vec2.difference(rightEnd, cornerStart);
    const rightVector = HSCore.Util.Math.Vec2.difference(cornerEnd, leftStart);

    return {
      corenerBDim: {
        start: cornerStart,
        end: cornerEnd,
        textPosition: dimData.textPosition.clone().add(entityPosition),
        min: sideRangeData.sideBRange.min,
        max: sideRangeData.sideBRange.max,
        invalid: false,
        inverted: insideOverlap,
      },
      left: {
        start: rightEnd,
        end: cornerStart,
        textPosition: HSCore.Util.Math.Vec2.lerp(rightEnd, cornerStart, 0.5),
        min: 0,
        max: totalWidth - entity.sideB,
        invalid: false,
        inverted: insideOverlap || HSCore.Util.Math.Vec2.dot(wallVector, leftVector) < 0,
      },
      right: {
        start: cornerEnd,
        end: leftStart,
        textPosition: HSCore.Util.Math.Vec2.lerp(cornerEnd, leftStart, 0.5),
        min: 0,
        max: totalWidth - entity.sideB,
        invalid: false,
        inverted: insideOverlap || HSCore.Util.Math.Vec2.dot(wallVector, rightVector) < 0,
      },
    };
  }
}