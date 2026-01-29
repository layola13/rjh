import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface LabelOptions {
  fontSize: number;
}

interface FloorDimensionOptions {
  fontFamily: string;
  fontColor: string;
  fontWeight: number;
  areaLabel: LabelOptions;
  roomType: LabelOptions;
}

interface LabelPositionCache {
  x: number;
  y: number;
}

interface SignalData {
  flag?: HSCore.Model.EntityFlagEnum | HSCore.Model.RoomFlagEnum;
  fieldName?: string;
  scaleChanged?: boolean;
}

interface SignalEvent {
  data?: SignalData;
  target?: {
    fieldName: string;
  };
}

export class FloorDimension extends HSApp.View.SVG.Gizmo {
  type = "hsw.view.svg.gizmo.RoomDimension";
  kMinScreenLengthToShowDim = 12.5;
  
  private _labelPositionCache?: LabelPositionCache;
  private options: FloorDimensionOptions;
  private _refreshShowDimensionTimerId?: number;
  private _eventHooks: HSApp.View.SVG.Events.Hook[] = [];
  private geometry?: unknown;
  private area?: number;
  private massProps?: number[];
  private element?: SVGElement[];

  constructor(
    entity: HSCore.Model.Entity,
    context: HSApp.View.SVG.Context,
    layer: SVGElement
  ) {
    super(entity, context, layer);

    this.options = {
      fontFamily: "'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif",
      fontColor: "#202020",
      fontWeight: 600,
      areaLabel: {
        fontSize: 12
      },
      roomType: {
        fontSize: 14
      }
    };
  }

  setMinScreenLength(length: number): void {
    this.kMinScreenLengthToShowDim = length;
  }

  onActivate(): void {
    this.signalHook.listen(this.entity.signalDirty, () => {
      this.dirty = true;
    });

    this.signalHook.listen(this.entity.signalFlagChanged, (event: SignalEvent) => {
      const flag = event.data?.flag;
      if (
        flag !== HSCore.Model.EntityFlagEnum.hidden &&
        flag !== HSCore.Model.RoomFlagEnum.dimensionOff &&
        flag !== HSCore.Model.RoomFlagEnum.roomtypeOff
      ) {
        this.dirty = true;
      }
    });

    this.signalHook.listen(this.entity.signalFieldChanged, (event: SignalEvent) => {
      const fieldName = event.data?.fieldName;
      if (fieldName === "roomType" || fieldName === "roomTypeDisplayName") {
        this.dirty = true;
      }
    });

    this.signalHook.listen(this.entity.parent.slabBuilder.signalDirty, () => {
      this._labelPositionCache = undefined;
    });

    const application = this.context.application;
    this.signalHook.listen(application.signalViewActivated, () => {
      this.dirty = true;
    });

    const document = this.context.document;
    const canvas = this.getCanvas();

    this.signalHook.listen(document.signalFieldChanged, (event: SignalEvent) => {
      const fieldName = event.target?.fieldName;
      if (fieldName === "displayLengthUnit" || fieldName === "displayLengthPrecisionDigits") {
        this.dirty = true;
      }
    }).listen(canvas.signalViewBoxChanged, (event: SignalEvent) => {
      if (event.data?.scaleChanged) {
        this.hideElement();
      }
    });

    const appSettings = application.appSettings;
    this.signalHook.listen(appSettings.signalValueChanged, this._onAppSettingsChanged);

    const scene = application.floorplan.scene;
    this.signalHook.listen(scene.signalActiveLayerChanged, () => {
      this.dirty = true;
    });

    super.onActivate();
  }

  hideElement(): void {
    if (this._refreshShowDimensionTimerId) {
      clearTimeout(this._refreshShowDimensionTimerId);
    }

    this.element?.forEach((el) => el.hide());

    this._refreshShowDimensionTimerId = window.setTimeout(() => {
      this.dirty = true;
    }, 400);
  }

  onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate();
  }

  onCleanup(): void {
    this._unbindCommand();

    if (this.element) {
      this.element.forEach((el) => {
        if (el) {
          this.layer.removeChild(el);
          el.remove();
        }
      });
      this.element = [];
    }

    super.onCleanup();
  }

  canDraw(): boolean {
    if (this.context.auxOptions?.isCeilingEnv) {
      return false;
    }

    const entity = this.entity;
    if (!entity) {
      return false;
    }

    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
      return false;
    }

    const roomGeometry = this._getRoomGeometry();
    if (!roomGeometry) {
      return false;
    }

    this.geometry = roomGeometry.outer;
    this.area = HSCore.Util.TgWall.getArea([entity.rawPath2d]);

    if (this.area < HSConstants.Constants.MINIMUM_ROOMSIZE) {
      this.element?.forEach((el) => el.hide());
      return false;
    }

    this.massProps = entity.getMassProps();
    return !!(this.massProps && !isNaN(this.massProps[1]) && !isNaN(this.massProps[2]));
  }

  private _getCanvasChangeRatio(): number {
    const scaleFactor = this.context.getScaleFactor();
    const viewMultiplier = this.context.application.is2DViewActive() ? 1 : 1.2;
    return 1 / scaleFactor / viewMultiplier;
  }

  draw(): void {
    if (this.canDraw()) {
      this.onDraw();
    }
    super.draw();
  }

  onDraw(): void {
    const updateTextElement = (
      element: SVGElement,
      text: string,
      x: number,
      y: number,
      fontSize: number
    ): void => {
      const currentX = element.attr("x");
      const currentY = element.attr("y");
      const currentFontSize = element.attr("font-size");

      if (currentX !== x || currentY !== y || currentFontSize !== fontSize) {
        element.attr({
          x,
          y,
          "font-size": `${fontSize}px`
        });
      }

      if (element.text() !== text) {
        element.plain?.(text);
        element.attr({
          "alignment-baseline": "middle"
        });
      }

      element.node.setAttribute("class", "unselectable");
      element.node.style.textShadow = 
        "-1.5px -1.5px 0 #f3f3f3, -1.5px 1.5px 0 #f3f3f3, 1.5px -1.5px 0 #f3f3f3, 1.5px 1.5px 0 #f3f3f3";
    };

    if (!this._isDimensionVisible()) {
      this.element?.forEach((el) => el.hide());
      return;
    }

    const entity = this.entity;
    const context = this.context;
    const application = context.application;

    const modelToScreenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    if (modelToScreenFactor < this.kMinScreenLengthToShowDim) {
      this.element?.forEach((el) => el.hide());
      return;
    }

    const showAreaLabel = 
      application.appSettings.getViewItem("roomAreaVisible") &&
      entity.isFlagOff(HSCore.Model.RoomFlagEnum.dimensionOff) &&
      application.is2DViewActive();

    const showRoomType = 
      application.appSettings.getViewItem("roomTypeVisible") &&
      entity.isFlagOff(HSCore.Model.RoomFlagEnum.roomtypeOff);

    const canvasRatio = this._getCanvasChangeRatio();
    const areaFontSize = this.options.areaLabel.fontSize * canvasRatio;
    const roomTypeFontSize = this.options.roomType.fontSize * canvasRatio;

    if (!this._labelPositionCache) {
      this._labelPositionCache = this._getLabelPosition();
    }

    const position = this._labelPositionCache;
    const roomTypeY = showRoomType ? position.y + (roomTypeFontSize / 2 + 2) : position.y;
    const areaY = showAreaLabel ? position.y - (areaFontSize / 2 + 2) : position.y;

    const displayUnit = context.document.displayAreaUnit;
    const precision = context.document.displayAreaPrecisionDigits;
    const areaText = HSApp.Util.UnitFormater.toAreaDisplayString(
      this.area!,
      displayUnit,
      precision,
      true
    );

    const roomTypeText = entity.roomType
      ? HSApp.Util.Room.getRoomTypeDisplayName(entity) ||
        ResourceManager.getString(`model_roomtype_${entity.roomType}`)
      : ResourceManager.getString("model_roomtype_none");

    if (!this.element) {
      const roomTypeElement = context.text("").attr({
        fill: this.options.fontColor,
        "font-family": this.options.fontFamily,
        "font-weight": this.options.fontWeight
      });

      const areaElement = context.text("").attr({
        fill: this.options.fontColor,
        "font-family": this.options.fontFamily,
        "font-weight": this.options.fontWeight
      });

      this.element = [roomTypeElement, areaElement];

      this.element.forEach((el) => {
        el.node.setAttribute("pointer-events", "none");
        this.layer.appendChild(el);
      });

      this.bindCommand();
    }

    const [roomTypeElement, areaElement] = this.element;

    updateTextElement(areaElement, areaText, position.x, roomTypeY, areaFontSize);
    updateTextElement(roomTypeElement, roomTypeText, position.x, areaY, roomTypeFontSize);

    if (showAreaLabel) {
      areaElement.show();
    } else {
      areaElement.hide();
    }

    if (showRoomType) {
      roomTypeElement.show();
    } else {
      roomTypeElement.hide();
    }

    super.onDraw();
  }

  private _bindCommand(): void {
    if (!this.element) {
      return;
    }

    this.element.forEach((el) => {
      const hook = new HSApp.View.SVG.Events.Hook(el, undefined, this.context, true);
      this._eventHooks.push(hook);

      hook.mouseover(() => {
        context.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.default);
      }).mouseout(() => {
        // No action on mouseout
      });
    });
  }

  private _unbindCommand(): void {
    if (this.element) {
      this._eventHooks.forEach((hook) => {
        hook.unlistenAll();
      });
      this._eventHooks = [];
    }
  }

  private _onAppSettingsChanged = (event: SignalEvent): void => {
    const fieldName = event.data?.fieldName;
    if (fieldName === "roomTypeVisible" || fieldName === "roomAreaVisible") {
      this.dirty = true;
    }
  };

  private _getRoomGeometry(): unknown {
    return this.context.application.geometryManager.getFaceGeometry(this.entity);
  }

  private _getLabelPosition(): LabelPositionCache {
    const centerPosition = HSCore.Util.Room.getProperCenterPositionWithHoles(
      this.entity.rawGeometry
    );
    return HSApp.View.SVG.Util.ModelPointToCanvas(centerPosition);
  }

  private _isDimensionVisible(): boolean {
    const master = this.entity.getMaster();
    if (!(master instanceof HSCore.Model.Slab)) {
      return false;
    }

    const baseLayer = master.getBaseLayer();
    if (!baseLayer) {
      return false;
    }

    const isActive = HSCore.Util.Layer.isActiveLayer(baseLayer);
    const isOutdoorLayer = baseLayer === this.context.application.floorplan.scene.outdoorLayer;

    return isActive || isOutdoorLayer;
  }
}