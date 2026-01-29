import HSApp from './HSApp';
import HSCore from './HSCore';
import HSConstants from './HSConstants';
import HSFPConstants from './HSFPConstants';

interface DimensionData {
  start: HSCore.Util.Math.Vec2;
  end: HSCore.Util.Math.Vec2;
  rotation: number;
  textPosition: HSCore.Util.Math.Vec2;
  min: number;
  max: number;
  invalid: boolean;
  inverted: boolean;
}

interface ComputedDimensionData {
  corenerBDim: DimensionData;
  corenerCDim: DimensionData;
}

interface SideRangeData {
  sideBRange: { min: number; max: number };
  sideCRange: { min: number; max: number };
}

interface ValueChangeEventData {
  value: number;
  oldValue: number;
  gizmo: HSApp.View.SVG.LinearDimension;
}

interface SettingChangedEventData {
  fieldName: string;
  value: unknown;
}

interface CommandEventData {
  cmd?: unknown;
}

const DIMENSION_OFFSET = 24;
const DIMENSION_TEXT_OFFSET = 0;

class CornerFlatWindowDimensionController extends HSApp.View.Base.DisplayController {
  public gizmo?: CornerFlatWindowDimension;
  private _editCmd?: unknown;

  constructor(
    entity: unknown,
    context: unknown,
    gizmo: CornerFlatWindowDimension
  ) {
    super(entity, context);
    this.gizmo = gizmo;
  }

  public dispatch(
    action: string,
    target: unknown,
    event: { data: ValueChangeEventData }
  ): void {
    switch (action) {
      case 'valueChangeStart':
        this.handleValueChangeStart(event);
        break;
      case 'valueChangeEnd':
        this.handleValueChangeEnd();
        break;
      case 'valueChanged':
        this.handleValueChanged(event);
        break;
    }
  }

  private handleValueChangeStart(event: { data: ValueChangeEventData }): void {
    if (!this._editCmd) {
      const eventData = event.data;
      if (eventData.gizmo) {
        this._editCmd = this.launchCommand(
          HSFPConstants.CommandType.EditCornerWindow,
          this,
          eventData
        );
      }
    }
  }

  private handleValueChangeEnd(): void {
    if (this._editCmd) {
      this._cmdMgr.complete();
      this._editCmd = null;
    }
  }

  private handleValueChanged(event: { data: ValueChangeEventData }): void {
    if (this._editCmd && event.data.gizmo) {
      // Command is active and gizmo exists
    }
  }

  private launchCommand(
    commandType: string,
    controller: CornerFlatWindowDimensionController,
    eventData: ValueChangeEventData
  ): unknown {
    const entity = controller.entity;
    const params: { sideB?: number; sideC?: number } = {};

    if (controller.gizmo?.corenerBDim === eventData.gizmo) {
      params.sideB = eventData.value;
    } else if (controller.gizmo?.corenerCDim === eventData.gizmo) {
      params.sideC = eventData.value;
    }

    const command = this._cmdMgr.createCommand(commandType, [
      entity,
      params,
      true
    ]);
    this._cmdMgr.execute(command);
    return command;
  }
}

export default class CornerFlatWindowDimension extends HSApp.View.SVG.Gizmo {
  public readonly type = 'hsw.view.svg.gizmo.CornerFlatWindowDimension';
  public readonly kDimensionOffset = DIMENSION_OFFSET;
  public readonly kDimensionTextOffset = DIMENSION_TEXT_OFFSET;
  public controller: CornerFlatWindowDimensionController;
  public corenerBDim: HSApp.View.SVG.LinearDimension;
  public corenerCDim: HSApp.View.SVG.LinearDimension;
  public gizmoDirty = true;
  private activeDim?: HSApp.View.SVG.LinearDimension;
  private middleDim?: HSApp.View.SVG.LinearDimension;
  private leftDim?: HSApp.View.SVG.LinearDimension;
  private rightDim?: HSApp.View.SVG.LinearDimension;
  private dimensionType?: unknown;

  constructor(entity: unknown, context: unknown, svgGroup: unknown) {
    const controller = new CornerFlatWindowDimensionController(
      entity,
      context,
      svgGroup
    );
    super(entity, context, svgGroup, controller);

    this.controller = controller;
    this.controller.gizmo = this;

    const LinearDimension = HSApp.View.SVG.LinearDimension;
    const LinearDimensionState = HSApp.View.SVG.LinearDimensionStateEnum;

    this.corenerBDim = new LinearDimension(entity, context, svgGroup);
    this.corenerCDim = new LinearDimension(entity, context, svgGroup);

    this.corenerBDim.updateState(LinearDimensionState.editable, true);
    this.corenerCDim.updateState(LinearDimensionState.editable, true);

    this.addChildGizmo(this.corenerBDim);
    this.addChildGizmo(this.corenerCDim);

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

    this.signalHook.listen(
      appSettings.signalValueChanged,
      this.onSettingChanged.bind(this)
    );

    this.childItems.forEach((childItem) => {
      this.signalHook
        .listen(childItem.valueChangeCommit, this.onValueChangeCommit.bind(this))
        .listen(childItem.inputSwitching, this.onInputSwitching.bind(this));
    }, this);

    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    const commandEventHandler = (event: { data: CommandEventData }) => {
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

    const commandManager = this.context.application.cmdManager;
    this.signalHook
      .listen(commandManager.signalCommandSuspending, commandEventHandler)
      .listen(commandManager.signalCommandTerminating, commandEventHandler);

    super.onActivate?.();
  }

  public onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate?.();
  }

  public onCleanup(): void {
    this.corenerBDim = undefined!;
    this.corenerCDim = undefined!;
    super.onCleanup?.();
  }

  public update(): void {
    if (!this.entity) {
      return;
    }

    if (this.entity._host) {
      this.show();
      this.gizmoDirty = true;
      this.dirty = true;
    } else {
      this.hide();
    }
  }

  public draw(): void {
    if (this.gizmoDirty) {
      this.updateChildGizmo();
      this.gizmoDirty = false;
    }
    super.draw?.();
  }

  public setActiveDimension(dimension: HSApp.View.SVG.LinearDimension): void {
    const LinearDimensionState = HSApp.View.SVG.LinearDimensionStateEnum;

    if (
      dimension &&
      dimension.state !== LinearDimensionState.disabled &&
      dimension !== this.activeDim
    ) {
      this.activeDim = dimension;

      for (const childItem of this.childItems) {
        const isFocused = childItem === this.activeDim;
        childItem.updateState(LinearDimensionState.focus, isFocused);
      }
    }
  }

  public findReferenceWall(): unknown | undefined {
    const entity = this.entity;
    if (!entity) {
      return undefined;
    }

    const host = entity.getHost();
    return host.instanceOf(HSConstants.ModelClass.NgWall) ? host : undefined;
  }

  private onSettingChanged(event: { data: SettingChangedEventData }): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value;
      this.update();
    }
  }

  private onValueChangeCommit(event: { data: ValueChangeEventData }): void {
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    if (event.data.gizmo === this.middleDim) {
      this.controller.dispatch('openingLengthChanged', this.entity, event);
    } else {
      this.controller.dispatch('valueChangeStart', this.entity, event);
      this.controller.dispatch('valueChanged', this.entity, event);
      this.controller.dispatch('valueChangeEnd', this.entity, event);
    }
  }

  private onInputSwitching(): void {
    if (!this.activeDim) {
      return;
    }

    const dimensions = [this.leftDim, this.middleDim, this.rightDim];
    const currentIndex = dimensions.indexOf(this.activeDim);

    if (currentIndex === -1) {
      return;
    }

    const nextIndex = (currentIndex + 1) % dimensions.length;
    const nextDimension = dimensions[nextIndex];

    if (nextDimension) {
      this.setActiveDimension(nextDimension);
    }
  }

  private updateChildGizmo(): void {
    const entity = this.entity;
    const referenceWall = this.findReferenceWall();

    if (!entity || !referenceWall) {
      return;
    }

    const dimensionData = this.computeDimensionData(referenceWall);
    if (!dimensionData) {
      return;
    }

    const dimensions = {
      corenerBDim: this.corenerBDim,
      corenerCDim: this.corenerCDim
    };

    let offset = new THREE.Vector2(0, 0);
    if (!entity.getHost()) {
      offset = new THREE.Vector2(entity.x, entity.y);
    }

    const LinearDimensionState = HSApp.View.SVG.LinearDimensionStateEnum;

    for (const key in dimensions) {
      const dimension = dimensions[key as keyof typeof dimensions];
      const data = dimensionData[key as keyof ComputedDimensionData];

      dimension.start = data.start.add(offset);
      dimension.end = data.end.add(offset);
      dimension.textPosition = data.textPosition.add(offset);
      dimension.rotation = data.rotation;
      dimension.min = data.min;
      dimension.max = data.max;
      dimension.inverted = data.inverted;
      dimension.updateState(LinearDimensionState.invalid, data.invalid);
    }
  }

  private computeDimensionData(
    referenceWall: any
  ): ComputedDimensionData | undefined {
    const screenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    let dimensionOffset = this.kDimensionOffset / screenFactor;
    const textOffset = this.kDimensionTextOffset / screenFactor;

    dimensionOffset += referenceWall.width;

    const entity = this.entity;
    const outline = entity.partsInfo.boundings.outline;

    const point0 = new HSCore.Util.Math.Vec2(outline[0].x, outline[0].y);
    const point1 = new HSCore.Util.Math.Vec2(outline[1].x, outline[1].y);
    const point2 = new HSCore.Util.Math.Vec2(outline[2].x, outline[2].y);
    const point5 = new HSCore.Util.Math.Vec2(outline[5].x, outline[5].y);
    const point4 = new HSCore.Util.Math.Vec2(outline[4].x, outline[4].y);

    const dimensionDataB = HSApp.View.Util.getDimensionData(
      point0,
      point5,
      point4,
      dimensionOffset,
      textOffset,
      false
    );

    const dimensionDataC = HSApp.View.Util.getDimensionData(
      point1,
      point0,
      point2,
      dimensionOffset,
      textOffset,
      false
    );

    const sideRangeData: SideRangeData = entity.getSideRangeData();

    let rotationNext = 0;
    let rotationCurrent = 0;

    const host = this.entity.getHost();
    if (host.instanceOf(HSConstants.ModelClass.NgWall)) {
      const wall = host;
      if (wall?.next) {
        rotationNext = wall.next.rotation;
        rotationCurrent = wall.rotation;
      }
    }

    const positionInvalid = HSApp.Util.Opening.checkPositionInvalid(this.entity);

    return {
      corenerBDim: {
        start: dimensionDataB.start,
        end: dimensionDataB.end,
        rotation: rotationNext,
        textPosition: dimensionDataB.textPosition,
        min: sideRangeData.sideBRange.min,
        max: sideRangeData.sideBRange.max,
        invalid: false,
        inverted: positionInvalid
      },
      corenerCDim: {
        start: dimensionDataC.start,
        end: dimensionDataC.end,
        rotation: rotationCurrent,
        textPosition: dimensionDataC.textPosition,
        min: sideRangeData.sideCRange.min,
        max: sideRangeData.sideCRange.max,
        invalid: false,
        inverted: positionInvalid
      }
    };
  }
}