// @ts-nocheck
import { Vector2 } from 'three';

interface SideRange {
  min: number;
  max: number;
}

interface SideRangeData {
  sideARange: SideRange;
  sideBRange: SideRange;
  sideCRange: SideRange;
  sideDRange: SideRange;
}

interface BoundingPoint {
  x: number;
  y: number;
}

interface PartsInfo {
  boundings: {
    innerBound: BoundingPoint[];
  };
}

interface Entity {
  x: number;
  y: number;
  _host?: unknown;
  signalDirty: unknown;
  partsInfo: PartsInfo;
  getHost(): Host | undefined;
  getSideRangeData(): SideRangeData;
  instanceOf(modelClass: string): boolean;
}

interface Host {
  width: number;
  instanceOf(modelClass: string): boolean;
}

interface ApplicationSettings {
  dimensionType: unknown;
  signalValueChanged: unknown;
}

interface CommandManager {
  signalCommandSuspending: unknown;
  signalCommandTerminating: unknown;
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  complete(): void;
}

interface Application {
  appSettings: ApplicationSettings;
  cmdManager: CommandManager;
  signalViewActivated: unknown;
}

interface Context {
  application: Application;
}

interface Command {
  // Command interface placeholder
}

interface DimensionData {
  start: Vector2;
  end: Vector2;
  textPosition: Vector2;
  min: number;
  max: number;
  invalid: boolean;
  inverted: boolean;
}

interface ComputedDimensionData {
  corenerADim: DimensionData;
  corenerBDim: DimensionData;
  corenerCDim: DimensionData;
  corenerDDim: DimensionData;
}

interface ValueChangeEvent {
  data: {
    gizmo?: LinearDimension;
    value: number;
    oldValue: number;
    fieldName?: string;
  };
}

interface CommandEvent {
  data: {
    cmd?: unknown;
  };
}

type LinearDimension = typeof HSApp.View.SVG.LinearDimension.prototype;
type LinearDimensionStateEnum = typeof HSApp.View.SVG.LinearDimensionStateEnum;

const DIMENSION_OFFSET = 24;
const DIMENSION_TEXT_OFFSET = 0;

class CornerWindowDimensionController extends HSApp.View.Base.DisplayController {
  gizmo?: CornerWindowDimension;
  private _editCmd: Command | null = null;

  constructor(entity: Entity, context: Context, gizmo: CornerWindowDimension) {
    super(entity, context);
    this.gizmo = gizmo;
  }

  dispatch(action: string, entity: Entity, event: ValueChangeEvent): void {
    switch (action) {
      case 'valueChangeStart':
        this._handleValueChangeStart(event);
        break;
      case 'valueChangeEnd':
        this._handleValueChangeEnd();
        break;
      case 'valueChanged':
        if (this._editCmd && event.data.gizmo) {
          // Handle value changed during edit
        }
        break;
    }
  }

  private _handleValueChangeStart(event: ValueChangeEvent): void {
    if (!this._editCmd) {
      const eventData = event.data;
      if (eventData.gizmo) {
        this._editCmd = this._launchCmd(
          HSFPConstants.CommandType.EditCornerWindow,
          this,
          eventData
        );
      }
    }
  }

  private _handleValueChangeEnd(): void {
    if (this._editCmd) {
      this._cmdMgr.complete();
      this._editCmd = null;
    }
  }

  private _launchCmd(
    commandType: string,
    controller: CornerWindowDimensionController,
    eventData: ValueChangeEvent['data']
  ): Command {
    const entity = controller.entity;
    const params: Record<string, number> = {};

    if (!controller.gizmo) {
      throw new Error('Gizmo not initialized');
    }

    if (controller.gizmo.corenerADim === eventData.gizmo) {
      params.sideA = eventData.value;
    } else if (controller.gizmo.corenerBDim === eventData.gizmo) {
      params.sideB = eventData.value;
    } else if (controller.gizmo.corenerCDim === eventData.gizmo) {
      params.sideC = eventData.value;
    } else if (controller.gizmo.corenerDDim === eventData.gizmo) {
      params.sideD = eventData.value;
    }

    const command = this._cmdMgr.createCommand(commandType, [entity, params, true]);
    this._cmdMgr.execute(command);
    return command;
  }
}

export default class CornerWindowDimension extends HSApp.View.SVG.Gizmo {
  type = 'hsw.view.svg.gizmo.CornerWindowDimension';
  kDimensionOffset = DIMENSION_OFFSET;
  kDimensionTextOffset = DIMENSION_TEXT_OFFSET;
  
  controller: CornerWindowDimensionController;
  corenerADim: LinearDimension;
  corenerBDim: LinearDimension;
  corenerCDim: LinearDimension;
  corenerDDim: LinearDimension;
  
  private activeDim?: LinearDimension;
  private gizmoDirty = true;
  private dimensionType?: unknown;

  constructor(entity: Entity, context: Context, parent: unknown) {
    const controller = new CornerWindowDimensionController(parent as Entity, entity, undefined as any);
    super(entity, context, parent, controller);
    
    controller.gizmo = this;

    const LinearDimensionClass = HSApp.View.SVG.LinearDimension;
    const stateEnum = HSApp.View.SVG.LinearDimensionStateEnum;

    this.corenerADim = new LinearDimensionClass(entity, context, parent);
    this.corenerBDim = new LinearDimensionClass(entity, context, parent);
    this.corenerCDim = new LinearDimensionClass(entity, context, parent);
    this.corenerDDim = new LinearDimensionClass(entity, context, parent);

    this.corenerADim.updateState(stateEnum.editable, true);
    this.corenerBDim.updateState(stateEnum.editable, true);
    this.corenerCDim.updateState(stateEnum.editable, true);
    this.corenerDDim.updateState(stateEnum.editable, true);

    this.addChildGizmo(this.corenerADim);
    this.addChildGizmo(this.corenerBDim);
    this.addChildGizmo(this.corenerCDim);
    this.addChildGizmo(this.corenerDDim);

    const appSettings = entity.application.appSettings;
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

    this.childItems.forEach((child: LinearDimension) => {
      this.signalHook
        .listen(child.valueChangeCommit, this._onValueChangeCommit.bind(this))
        .listen(child.inputSwitching, this._onInputSwitching.bind(this));
    }, this);

    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    const handleCommandEvent = (event: CommandEvent) => {
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

    const cmdManager = this.context.application.cmdManager;
    this.signalHook
      .listen(cmdManager.signalCommandSuspending, handleCommandEvent)
      .listen(cmdManager.signalCommandTerminating, handleCommandEvent);

    super.onActivate?.();
  }

  onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate?.();
  }

  onCleanup(): void {
    this.corenerADim = undefined as any;
    this.corenerBDim = undefined as any;
    this.corenerCDim = undefined as any;
    this.corenerDDim = undefined as any;
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

  /**
   * Set the currently active dimension gizmo
   */
  setActiveDimension(dimension: LinearDimension | undefined): void {
    const stateEnum = HSApp.View.SVG.LinearDimensionStateEnum;
    
    if (dimension && dimension.state !== stateEnum.disabled && dimension !== this.activeDim) {
      this.activeDim = dimension;

      for (const child of this.childItems) {
        const isFocused = child === this.activeDim;
        (child as LinearDimension).updateState(stateEnum.focus, isFocused);
      }
    }
  }

  /**
   * Find the wall that hosts this corner window
   */
  findReferenceWall(): Host | undefined {
    const entity = this.entity;
    if (!entity) return undefined;

    const host = entity.getHost();
    return host?.instanceOf(HSConstants.ModelClass.NgWall) ? host : undefined;
  }

  private _onSettingChanged(event: ValueChangeEvent): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value;
      this.update();
    }
  }

  private _onValueChangeCommit(event: ValueChangeEvent): void {
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    if (event.data.gizmo === (this as any).middleDim) {
      this.controller.dispatch('openingLengthChanged', this.entity, event);
    } else {
      this.controller.dispatch('valueChangeStart', this.entity, event);
      this.controller.dispatch('valueChanged', this.entity, event);
      this.controller.dispatch('valueChangeEnd', this.entity, event);
    }
  }

  private _onInputSwitching(): void {
    if (!this.activeDim) return;

    const dimensions = [
      (this as any).leftDim,
      (this as any).middleDim,
      (this as any).rightDim
    ];
    
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

    const dimensions = {
      corenerADim: this.corenerADim,
      corenerBDim: this.corenerBDim,
      corenerCDim: this.corenerCDim,
      corenerDDim: this.corenerDDim
    };

    let offset = new Vector2();
    if (!entity.getHost()) {
      offset = new Vector2(entity.x, entity.y);
    }

    const stateEnum = HSApp.View.SVG.LinearDimensionStateEnum;

    for (const key in dimensions) {
      const dimension = dimensions[key as keyof typeof dimensions];
      const data = dimensionData[key as keyof ComputedDimensionData];

      (dimension as any).start = data.start.clone().add(offset);
      (dimension as any).end = data.end.clone().add(offset);
      (dimension as any).textPosition = data.textPosition.clone().add(offset);
      (dimension as any).min = data.min;
      (dimension as any).max = data.max;
      (dimension as any).inverted = data.inverted;
      dimension.updateState(stateEnum.invalid, data.invalid);
    }
  }

  private _computeDimensionData(wall: Host): ComputedDimensionData | undefined {
    const screenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    let dimensionOffset = this.kDimensionOffset / screenFactor;
    const textOffset = this.kDimensionTextOffset / screenFactor;

    dimensionOffset += wall.width;

    const entity = this.entity;
    const innerBound = entity.partsInfo.boundings.innerBound;

    const pointR = new HSCore.Util.Math.Vec2(innerBound[0].x, innerBound[0].y);
    const pointS = new HSCore.Util.Math.Vec2(innerBound[1].x, innerBound[1].y);
    const pointL = new HSCore.Util.Math.Vec2(innerBound[2].x, innerBound[2].y);
    const pointC = new HSCore.Util.Math.Vec2(innerBound[5].x, innerBound[5].y);
    const pointU = new HSCore.Util.Math.Vec2(innerBound[4].x, innerBound[4].y);

    const dimensionA = HSApp.View.Util.getDimensionData(pointC, pointU, pointR, dimensionOffset, textOffset, true);
    const dimensionB = HSApp.View.Util.getDimensionData(pointR, pointC, pointU, dimensionOffset, textOffset, false);
    const dimensionC = HSApp.View.Util.getDimensionData(pointS, pointR, pointL, dimensionOffset, textOffset, false);
    const dimensionD = HSApp.View.Util.getDimensionData(pointL, pointS, pointR, dimensionOffset, textOffset, true);

    const sideRangeData = entity.getSideRangeData();
    const isInvalid = HSApp.Util.Opening.checkPositionInvalid(this.entity);

    return {
      corenerADim: {
        start: dimensionA.start,
        end: dimensionA.end,
        textPosition: dimensionA.textPosition,
        min: sideRangeData.sideARange.min,
        max: sideRangeData.sideARange.max,
        invalid: false,
        inverted: isInvalid
      },
      corenerBDim: {
        start: dimensionB.start,
        end: dimensionB.end,
        textPosition: dimensionB.textPosition,
        min: sideRangeData.sideBRange.min,
        max: sideRangeData.sideBRange.max,
        invalid: false,
        inverted: isInvalid
      },
      corenerCDim: {
        start: dimensionC.start,
        end: dimensionC.end,
        textPosition: dimensionC.textPosition,
        min: sideRangeData.sideCRange.min,
        max: sideRangeData.sideCRange.max,
        invalid: false,
        inverted: isInvalid
      },
      corenerDDim: {
        start: dimensionD.start,
        end: dimensionD.end,
        textPosition: dimensionD.textPosition,
        min: sideRangeData.sideDRange.min,
        max: sideRangeData.sideDRange.max,
        invalid: false,
        inverted: isInvalid
      }
    };
  }
}