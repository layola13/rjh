import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { SVGDimensionType } from './SVGDimensionType';

type LinearDimensionStateEnum = typeof HSApp.View.SVG.LinearDimensionStateEnum;
type LinearDimensionState = LinearDimensionStateEnum[keyof LinearDimensionStateEnum];

interface DimensionInfo {
  line: {
    clone(): {
      transform(matrix: unknown): {
        getStartPt(): Point;
        getEndPt(): Point;
        getMidPt(): Point;
      };
    };
  };
  refParam: string;
}

interface Point {
  x: number;
  y: number;
  z: number;
}

interface DimensionData {
  start: Point;
  end: Point;
  textPosition: Point;
  min: number;
  max: number;
  invalid: boolean;
  inverted: boolean;
}

interface ViewData2D {
  dimensionInfos?: DimensionInfo[];
}

interface ValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo: HSApp.View.SVG.LinearDimension;
  };
}

interface SettingChangedEvent {
  data: {
    fieldName: string;
    value: unknown;
  };
}

interface CommandEvent {
  data: {
    cmd?: unknown;
  };
}

interface DispatchData {
  event: ValueChangeEvent;
  dimInfo: DimensionInfo;
}

const DIMENSION_OFFSET = 20;
const DIMENSION_TEXT_OFFSET = 0;
const SCALE_FACTOR = 0.001;

export class ParametricOpeningDimension extends HSApp.View.SVG.Gizmo {
  private dimension: DimensionInfo[] = [];
  private dims: HSApp.View.SVG.LinearDimension[] = [];
  private gizmoDirty?: boolean;
  private activeDim?: HSApp.View.SVG.LinearDimension;
  private dimensionType?: string;
  private readonly kDimensionOffset: number = DIMENSION_OFFSET;
  private readonly kDimensionTextOffset: number = DIMENSION_TEXT_OFFSET;
  private readonly controller: ParametricOpeningDimensionController;

  constructor(
    element: unknown,
    parent: unknown,
    context: unknown
  ) {
    super(element, parent, context, undefined);

    this.controller = new ParametricOpeningDimensionController(context, element, this);

    const viewData = (context as any).get2DViewData() as ViewData2D | undefined;
    if (viewData) {
      this.dimension = viewData.dimensionInfos || [];
    }

    this.dims = this.dimension.map((dimInfo: DimensionInfo) => {
      const dimension = new HSApp.View.SVG.LinearDimension(element, parent, context, {});
      dimension.updateState(HSApp.View.SVG.LinearDimensionStateEnum.editable, true);
      this.addChildGizmo(dimension);
      return dimension;
    });

    const appSettings = (element as any).application.appSettings;
    this.defineField('dimensionType', appSettings.dimensionType);
    this.gizmoDirty = true;
  }

  static uniqueType(): string {
    return SVGDimensionType.ParametricopeningDimension;
  }

  type(): string {
    return ParametricOpeningDimension.uniqueType();
  }

  onActivate(): void {
    this.update();

    this.signalHook.listen((this.entity as any).signalDirty, () => {
      this.update();
    });

    const application = (this.context as any).application;
    const appSettings = application.appSettings;

    this.signalHook.listen(appSettings.signalValueChanged, this._onSettingChanged);

    this.childItems.forEach((child: HSApp.View.SVG.LinearDimension) => {
      this.signalHook
        .listen(child.valueChangeCommit, this._onValueChangeCommit)
        .listen(child.inputSwitching, this._onInputSwitching);
    }, this);

    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    const handleCommandEvent = (event: CommandEvent): void => {
      if (event.data.cmd && document && document.activeElement) {
        const activeElement = document.activeElement;
        if (
          activeElement.nodeName === 'INPUT' &&
          !HSApp.View.SVG.LinearDimension.isDimensionInput(activeElement)
        ) {
          return;
        }
      }
    };

    const cmdManager = application.cmdManager;
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
    this.dims = [];
    super.onCleanup?.();
  }

  update(): void {
    if (!this.entity) {
      return;
    }

    if ((this.entity as any)._host) {
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

  private _setActiveDimension(dimension: HSApp.View.SVG.LinearDimension): void {
    const state = HSApp.View.SVG.LinearDimensionStateEnum;

    if (dimension && (dimension as any).state !== state.disabled && dimension !== this.activeDim) {
      this.activeDim = dimension;

      for (const child of this.childItems as HSApp.View.SVG.LinearDimension[]) {
        const isFocused = child === this.activeDim;
        child.updateState(state.focus, isFocused);
      }
    }
  }

  private _findReferenceWall(): unknown | undefined {
    const entity = this.entity;
    if (!entity) {
      return undefined;
    }

    const host = (entity as any).getHost();
    return host?.instanceOf(HSConstants.ModelClass.NgWall) ? host : undefined;
  }

  private _onSettingChanged = (event: SettingChangedEvent): void => {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value as string;
      this.update();
    }
  };

  private _onValueChangeCommit = (event: ValueChangeEvent): void => {
    if (!HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      const index = this.dims.indexOf(event.data.gizmo);
      const dimInfo = this.dimension[index];

      this.controller.dispatch('', this.entity, {
        event,
        dimInfo,
      });
    }
  };

  private _onInputSwitching = (): void => {
    if (!this.activeDim) {
      return;
    }

    let index = this.dims.indexOf(this.activeDim);
    if (index === -1) {
      return;
    }

    index = (index + 1) % this.dims.length;
    this._setActiveDimension(this.dims[index]);
  };

  private _updateChildGizmo(): void {
    if (!this.entity) {
      return;
    }

    const dimensionData = this._computeDimensionData();
    if (!dimensionData) {
      return;
    }

    this.dims.forEach((dim: HSApp.View.SVG.LinearDimension, index: number) => {
      const data = dimensionData[index];
      (dim as any).start = data.start;
      (dim as any).end = data.end;
      (dim as any).textPosition = data.textPosition;
      (dim as any).min = data.min;
      (dim as any).max = data.max;
      (dim as any).inverted = data.inverted;
      dim.updateState(HSApp.View.SVG.LinearDimensionStateEnum.invalid, data.invalid);
    });
  }

  private _computeDimensionData(): DimensionData[] | undefined {
    const entityMatrix = (this.entity as any).get3DMatrix().toArray();
    const transformMatrix = (HSMath.Matrix4 as any).fromArray(entityMatrix);

    const scaleMatrix = (HSMath.Matrix4 as any).makeScale(
      { x: 0, y: 0, z: 0 },
      { x: SCALE_FACTOR, y: SCALE_FACTOR, z: SCALE_FACTOR }
    );
    const finalMatrix = scaleMatrix.preMultiply(transformMatrix);

    this.dimension = (this.entity as any).get2DViewData().dimensionInfos;

    if (!this.dimension) {
      return undefined;
    }

    return this.dimension.map((dimInfo: DimensionInfo) => {
      const transformedLine = dimInfo.line.clone().transform(finalMatrix);

      return {
        start: transformedLine.getStartPt(),
        end: transformedLine.getEndPt(),
        textPosition: transformedLine.getMidPt(),
        min: 0,
        max: Number.MAX_VALUE,
        invalid: false,
        inverted: false,
      };
    });
  }
}

class ParametricOpeningDimensionController extends HSApp.View.Base.DisplayController {
  private gizmo: ParametricOpeningDimension;
  private cmd?: unknown;

  constructor(context: unknown, element: unknown, gizmo: ParametricOpeningDimension) {
    super(context, element);
    this.gizmo = gizmo;
  }

  dispatch(action: string, target: unknown, data: DispatchData): void {
    const { event, dimInfo } = data;
    const propertiesNode = (target as any).getPropertiesNode(dimInfo.refParam);

    if (!this.cmd) {
      this.cmd = (this as any)._cmdMgr.createCommand(
        HSFPConstants.CommandType.EditParametricOpening,
        [target]
      );

      if (this.cmd) {
        (this.cmd as any).receive('changeend', {
          node: propertiesNode,
          newValue: event.data.value * 1000,
        });
      }

      (this as any)._cmdMgr.complete();
      this.cmd = undefined;
    }
  }
}