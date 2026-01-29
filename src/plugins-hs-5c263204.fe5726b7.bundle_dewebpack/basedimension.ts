import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { DimensionHandler } from './DimensionHandler';
import * as THREE from 'three';

type LinearDimensionStateEnum = typeof HSApp.View.SVG.LinearDimensionStateEnum;
type LinearDimension = HSApp.View.SVG.LinearDimension;
type Gizmo = HSApp.View.SVG.Gizmo;

interface PrecisionConfig {
  dimUnitType?: string;
  dimPrecisionDigits?: number;
  isIntType: boolean;
}

interface DimensionRules {
  intOnly: boolean;
  fixedUnitType?: string;
  fixedDisplayDigits?: number;
}

interface ElementStyle {
  stroke: string;
  'stroke-width': number;
  'stroke-dasharray': string;
  'vector-effect': string;
}

interface AuxiliaryLinearStyle {
  stroke: string;
  'stroke-dasharray': string;
}

interface Point2D {
  x: number;
  y: number;
}

interface LinearDimensionData {
  startPoint: Point2D;
  endPoint: Point2D;
}

interface HelperLinearData {
  start: Point2D;
  end: Point2D;
}

interface SettingChangedEventData {
  fieldName: string;
  oldValue: unknown;
  value: unknown;
}

interface ViewBoxChangedEventData {
  scaleChanged?: boolean;
}

interface SignalEvent<T = unknown> {
  data: T;
}

export class BaseDimension extends HSApp.View.SVG.Gizmo {
  public static readonly DEFULT_LINEAR_EXTENDS_LENGTHS = 0.3;
  public static readonly MAX_DIMENSION_LENGTHS = 10;
  public static readonly MIN_DIMENSION_LENGTHS = 0;

  public entity: unknown;
  public linearDimensionGizmoDatas: LinearDimensionData[] = [];
  public extendsHelperLinearData: HelperLinearData[] = [];
  public boxHelpLineData: unknown[] = [];
  public outlineHelpData: unknown[] = [];
  public cmdMgr: unknown;
  public activeDimIndex = 0;
  public outlineElements: unknown[] = [];
  public BoundaryboxElement: unknown[] = [];
  public auxiliaryLinearElement: unknown[] = [];
  public isEnable?: boolean;

  private _defaultBoxElementStyle: ElementStyle;
  private defaultAuxiliaryLinearStyle: AuxiliaryLinearStyle;
  private _config: PrecisionConfig = {};
  private _rules: DimensionRules = {};

  constructor(
    context: unknown,
    canvas: unknown,
    entity: unknown,
    auxOptions: unknown
  ) {
    super(context, canvas, entity, auxOptions);

    this.entity = entity;
    this.cmdMgr = (context as any).application.cmdManager;

    this._defaultBoxElementStyle = {
      stroke: '#28bb9d',
      'stroke-width': 1,
      'stroke-dasharray': '--',
      'vector-effect': 'non-scaling-stroke',
    };

    this.defaultAuxiliaryLinearStyle = {
      stroke: '#000000',
      'stroke-dasharray': '--',
    };

    this.setConfig(undefined);
    this.reset();
    this._initChildenGizmo(context, canvas, entity);
    this._initBoundaryBoxElement();
    this._initauxiliaryLinearElement();
    this.initOutlineHelpData();
  }

  public setConfig(config?: { getPrecisionConfig(): PrecisionConfig }): void {
    const rules: DimensionRules = {
      intOnly: false,
      fixedUnitType: undefined,
      fixedDisplayDigits: undefined,
    };

    if (config) {
      const precisionConfig = config.getPrecisionConfig();
      rules.fixedUnitType = precisionConfig.dimUnitType;
      rules.fixedDisplayDigits = precisionConfig.dimPrecisionDigits;
      rules.intOnly = precisionConfig.isIntType;
      this._config = precisionConfig;
    }

    this._rules = rules;
  }

  private _initChildenGizmo(context: unknown, canvas: unknown, entity: unknown): void {
    this.BoundaryboxElement = [];

    for (let index = 0; index < 4; index++) {
      const handler = new DimensionHandler(this._config);
      const linearDimension = new HSApp.View.SVG.LinearDimension(
        context,
        canvas,
        entity,
        this._rules,
        handler
      );

      linearDimension.updateState(HSApp.View.SVG.LinearDimensionStateEnum.editable, true);
      linearDimension.max = BaseDimension.MAX_DIMENSION_LENGTHS;
      linearDimension.min = BaseDimension.MIN_DIMENSION_LENGTHS;

      this.addChildGizmo(linearDimension);
    }
  }

  private _initBoundaryBoxElement(): void {
    this.BoundaryboxElement = [];

    for (let i = 0; i < 5; i++) {
      const rectElement = this.context.rect(0, 0).attr(this._defaultBoxElementStyle);
      this.BoundaryboxElement.push(rectElement);
      this.layer.appendChild(rectElement);
    }
  }

  private _initauxiliaryLinearElement(): void {
    this.auxiliaryLinearElement = [];

    for (let i = 0; i < 5; i++) {
      const pathElement = this.context.path().attr(this.defaultAuxiliaryLinearStyle);
      this.auxiliaryLinearElement.push(pathElement);
      this.layer.appendChild(pathElement);
    }
  }

  public initOutlineHelpData(): void {
    this.outlineElements = [];

    for (let i = 0; i < 4; i++) {
      const polygonElement = this.context.polygon('').fill('none').attr({
        stroke: '#59a4db',
        'stroke-width': 1,
        'vector-effect': 'non-scaling-stroke',
      });

      this.outlineElements.push(polygonElement);
      this.layer.appendChild(polygonElement);
    }
  }

  public onActivate(): void {
    const application = this.context.application;
    const transManager = application.transManager;
    const appSettings = application.appSettings;
    const canvas = this.getCanvas();

    this.signalHook
      .listen(application.signalViewActivated, this.update)
      .listen(this.entity.signalDirty, this.update)
      .listen(transManager.signalUndone, this.update)
      .listen(transManager.signalRedone, this.update)
      .listen(appSettings.signalValueChanged, this._onSettingChanged)
      .listen(canvas.signalViewBoxChanged, this._onViewBoxChanged);

    this.childItems.forEach((childItem: unknown) => {
      this.signalHook
        .listen((childItem as any).valueChangeCommit, this._onValueChangeCommit)
        .listen((childItem as any).inputSwitching, this._onInputSwitching);
    }, this);

    if (this.isEnable && this.context.application.isActiveView(this.canvas)) {
      this.computeChildGizmoInfo();
    }

    super.onActivate();
    this.update();
  }

  private _onViewBoxChanged(event: SignalEvent<ViewBoxChangedEventData>): void {
    if (!event || !event.data.scaleChanged) {
      this.reset();

      if (this.isEnable && this.context.application.isActiveView(this.canvas)) {
        this.computeChildGizmoInfo();
        this._updateGizmos();
      }
    }
  }

  public onDeactivate(): void {
    this.unlistenAllEvents();
    this.reset();
    super.onDeactivate();
  }

  private _onSettingChanged(event: SignalEvent<SettingChangedEventData>): void {
    const data = event.data;

    if (data.fieldName === 'contentPrecisionLocation' && data.oldValue !== data.value) {
      this.isEnable = data.value as boolean;
      this.update();
    }
  }

  private _onValueChangeCommit(event: SignalEvent): void {
    this.controller.dispatch(event);
  }

  private _onInputSwitching(): void {
    this.activeDimIndex = (this.activeDimIndex + 1) % this.linearDimensionGizmoDatas.length;
    this.setActiveDimension();
  }

  public setActiveDimension(): void {
    let index = 0;

    for (const childItem of this.childItems) {
      const isFocused = index === this.activeDimIndex;
      (childItem as any).updateState(HSApp.View.SVG.LinearDimensionStateEnum.focus, isFocused);
      index++;
    }
  }

  public onCleanup(): void {
    this.BoundaryboxElement.forEach((element: any) => {
      element?.remove();
    }, this);
    this.BoundaryboxElement = [];

    this.auxiliaryLinearElement.forEach((element: any) => {
      element?.remove();
    }, this);
    this.auxiliaryLinearElement = [];

    this.activeDimIndex = 0;

    this.outlineElements.forEach((element: any) => element.remove());
    this.outlineHelpData = [];

    super.onCleanup();
  }

  public update(): void {
    this.dirty = true;
  }

  public draw(): void {
    this.hide();
    this.reset();

    if (this.isEnable && this.context.application.isActiveView(this.canvas)) {
      this.computeChildGizmoInfo();
      this._updateGizmos();
    }

    super.draw();
  }

  public hide(): void {
    super.hide();

    this.BoundaryboxElement.forEach((element: any) => {
      element.hide();
    });

    this.auxiliaryLinearElement.forEach((element: any) => {
      element.hide();
    });

    this.outlineElements.forEach((element: any) => element.hide());
  }

  public reset(): void {
    this.linearDimensionGizmoDatas = [];
    this.extendsHelperLinearData = [];
    this.boxHelpLineData = [];
    this.outlineHelpData = [];
  }

  private _isContentInHiddenRoom(): boolean {
    const auxOptions = this.context.auxOptions;

    if (auxOptions?.isCeilingEnv) {
      const uniqueParent = (this.entity as any).getUniqueParent();
      return !HSCore.Util.Content.getCeilingContentIn(this.entity, uniqueParent);
    }

    return false;
  }

  protected _updateGizmos(): void {
    console.assert(false, 'Inherit Implement');
  }

  private _getTextPosition(startPoint: Point2D, endPoint: Point2D): Point2D {
    let direction: string | undefined;
    let maxX: number;
    let minX: number;
    let maxY: number;
    let minY: number;

    const midPoint = HSCore.Util.Math.Vec2.lerp(startPoint, endPoint, 0.5);

    const startScreen = HSApp.View.SVG.Util.ModelPointToScreen(
      [startPoint.x, startPoint.y],
      this.context
    );
    const endScreen = HSApp.View.SVG.Util.ModelPointToScreen(
      [endPoint.x, endPoint.y],
      this.context
    );

    const [startX, startY] = startScreen;
    const [endX, endY] = endScreen;

    const midScreen = HSApp.View.SVG.Util.ModelPointToScreen(
      [midPoint.x, midPoint.y],
      this.context
    );
    let [screenX, screenY] = midScreen;

    if (Math.round(startX) === Math.round(endX)) {
      if (startY > endY) {
        direction = 'eTop';
      } else if (startY < endY) {
        direction = 'eBottom';
      }
    }

    if (Math.round(startY) === Math.round(endY)) {
      if (startX > endX) {
        direction = 'eLeft';
      } else if (startX < endX) {
        direction = 'eRight';
      }
    }

    const convertToModelPoint = (): Point2D => {
      const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
        [screenX, screenY],
        this.context
      );
      midPoint.x = modelPoint[0];
      midPoint.y = modelPoint[1];
      return midPoint;
    };

    if (!direction || !(this.entity as any).bound || !(this.entity as any).outline) {
      return convertToModelPoint();
    }

    const outline = JSON.parse(JSON.stringify((this.entity as any).outline));

    for (const key in outline) {
      outline[key] = HSApp.View.SVG.Util.ModelPointToScreen(outline[key], this.context);
    }

    if (outline.length) {
      maxX = Math.max(outline[0].x, outline[1].x, outline[2].x, outline[3].x);
      minX = Math.min(outline[0].x, outline[1].x, outline[2].x, outline[3].x);
      maxY = Math.max(outline[0].y, outline[1].y, outline[2].y, outline[3].y);
      minY = Math.min(outline[0].y, outline[1].y, outline[2].y, outline[3].y);
    }

    switch (direction) {
      case 'eLeft':
        if (minX - screenX < 35) {
          screenX = minX - 35;
        }
        break;
      case 'eRight':
        if (screenX - maxX < 35) {
          screenX = maxX + 35;
        }
        break;
      case 'eTop':
        if (minY - screenY < 20) {
          screenY = minY - 20;
        }
        break;
      case 'eBottom':
        if (screenY - maxY < 20) {
          screenY = maxY + 20;
        }
        break;
    }

    return convertToModelPoint();
  }

  protected _updateChildGizmo(
    dimensionData: LinearDimensionData | undefined,
    gizmo: any
  ): void {
    if (!dimensionData || !gizmo) {
      return;
    }

    const startVec = HSCore.Util.Math.Vec2.fromCoordinate(dimensionData.startPoint);
    const endVec = HSCore.Util.Math.Vec2.fromCoordinate(dimensionData.endPoint);
    const length = new THREE.Vector2(endVec.x - startVec.x, endVec.y - startVec.y).length();

    if (HSCore.Util.Math.isZero(length, 0.001)) {
      return;
    }

    gizmo.start = startVec;
    gizmo.end = endVec;
    gizmo.textPosition = this._getTextPosition(startVec, endVec);
    gizmo.rotation = 0;
    gizmo.show();
  }

  protected _updateHelperBoxs(): void {
    let index = 0;

    this.boxHelpLineData.forEach((data: any) => {
      const boxElement = this.BoundaryboxElement[index++];

      if (data?.instanceOf(HSConstants.ModelClass.NgContent)) {
        const bound = data.bound;

        (boxElement as any).attr({
          x: bound.left * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
          y: -(bound.top + bound.height) * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
          width: bound.width * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
          height: bound.height * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
        });

        (boxElement as any).show();
      }
    }, this);
  }

  protected _updateHelperLinears(): void {
    let index = 0;

    this.extendsHelperLinearData.forEach((linearData: HelperLinearData) => {
      const linearElement = this.auxiliaryLinearElement[index++];
      const startCanvas = HSApp.View.SVG.Util.ModelPointToCanvas(linearData.start);
      const endCanvas = HSApp.View.SVG.Util.ModelPointToCanvas(linearData.end);
      const pathData = `M ${startCanvas.x}, ${startCanvas.y} L${endCanvas.x}, ${endCanvas.y}`;

      (linearElement as any).attr({ d: pathData });
      (linearElement as any).show();
    }, this);
  }

  public drawOutlineHelpData(outlineData: any[]): void {
    for (let i = 0; i < outlineData.length; i++) {
      const outline = outlineData[i].outline;
      const outlineElement = this.outlineElements[i];

      if (outlineElement) {
        let points = '';

        outline.forEach((point: Point2D) => {
          const canvasPoint = this.canvas.modelPointToCanvas(point);
          points += `${canvasPoint.x}, ${canvasPoint.y} `;
        });

        (outlineElement as any).attr({ points }).show();
      }
    }
  }

  public computeChildGizmoInfo(): void {
    // Override in subclass
  }
}