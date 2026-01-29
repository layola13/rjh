import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { CommonEnvironment } from './CommonEnvironment';
import { Toolbar } from './Toolbar';
import { ModeController } from './ModeController';
import { UI } from './UI';
import { CanvasWrapper } from './CanvasWrapper';
import { GizmoFactory } from './GizmoFactory';
import { RoofsDrawing } from './RoofsDrawing';
import { RoofsDrawingTransaction } from './RoofsDrawingTransaction';

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
    ResizeWidget: string;
    ViewSwitch: string;
    PropertyBar: string;
    LayerEdit: string;
  };
  CommandType: {
    ActiveLayer: string;
    ToggleLayerVisibility: string;
  };
};

interface RoofsDrawingEnvironmentOptions {
  app: HSApp.Application;
  handler: RoofsDrawingHandler;
  dependencies: Record<string, unknown>;
}

interface RoofsDrawingHandler {
  registerHotkeys(): void;
  unregisterHotkeys(): void;
  registerLeftMenuMouseEvent(mouse: unknown): void;
  unregisterLeftMenuMouseEvent(mouse: unknown): void;
  onAddRect(): void;
  dependencies: Record<string, unknown>;
}

interface Plugin {
  toggleCatalog(visible: boolean): void;
  setlayerEditBarParams(params?: LayerEditBarParams): void;
  show(): void;
}

interface LayerEditBarParams {
  includedLayers: HSCore.Model.Layer[];
  switchLayerConfirm: () => boolean | Promise<boolean>;
}

interface CommandEvent {
  data?: {
    cmd?: {
      type: string;
    };
    oldValue?: unknown;
  };
}

interface View2DOption {
  type: string;
  id: string;
  order: number;
  data: {
    options: Array<{
      id: string;
      icons: Array<{ id: string; fieldName: string }>;
      strings: Array<{ id: string; fieldName: string; hotKey?: string }>;
    }>;
    defaultKey: string;
  };
}

export class RoofsDrawingEnvironment extends CommonEnvironment {
  private toolbar?: Toolbar;
  private readonly handler: RoofsDrawingHandler;
  private layer!: HSCore.Model.Layer;
  private _previousLayer?: HSCore.Model.Layer;
  private modeController?: ModeController;
  private readonly catalogPlugin: Plugin;
  private readonly resizeWidgetPlugin: Plugin;
  private readonly viewSwitchPlugin: Plugin;
  private readonly propertyBar: unknown;
  private oldToolbarId?: string;
  private gizmo?: unknown;
  private _sketchView?: RoofsDrawing;
  private _sketchGizmoFactory?: GizmoFactory;
  private readonly _app: HSApp.Application;
  private _signalHook?: HSCore.Util.SignalHook;
  private _ui?: UI;
  private _canvasWrapper?: CanvasWrapper;
  private _transaction?: RoofsDrawingTransaction;
  private _originalRoofIds?: string[];

  constructor(options: RoofsDrawingEnvironmentOptions) {
    super(options.app);

    this._app = options.app;
    this.handler = options.handler;
    this.catalogPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.resizeWidgetPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.ResizeWidget);
    this.viewSwitchPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
    this.propertyBar = options.dependencies[HSFPConstants.PluginType.PropertyBar];
  }

  public onActivate(event?: unknown): void {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._initUI();
    this.layer = this._app.floorplan.scene.activeLayer;
    this._clearRoofsDrawing(this.layer);
    this._createRoofsDrawing();
    this._listenSignals();
    this.modeController = new ModeController();
    this.modeController.on();
    this._app.getActive2DView().freeze();
    this._app.getActive2DView().hide();
    this._createCanvas(this._ui!.aux2DContainer);
    this._createSketchView();
    this.handler.registerHotkeys();

    const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
    this.handler.registerLeftMenuMouseEvent(aux2DCanvas.mouse);
    this._originalRoofIds = this._getAllRoofIds();
    this._transaction = new RoofsDrawingTransaction();
    this._transaction.enter();
    this.handler.onAddRect();
  }

  public onDeactivate(): void {
    this._signalHook?.dispose();
    this._signalHook = undefined;
    this._app.selectionManager.unselectAll();
    this.modeController?.off();

    const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
    this.handler.unregisterLeftMenuMouseEvent(aux2DCanvas.mouse);
    this._destroySketchView();
    this._destroyCanvas();
    this._app.getActive2DView().unfreeze();
    this._app.getActive2DView().show();
    this.handler.unregisterHotkeys();
    this._destroyUI();
    this._clearRoofsDrawing(this.layer);
    this._transaction?.exit();
    this._transaction = undefined;
    this._trackRoofDrawCount();
    this._originalRoofIds = undefined;
  }

  private _createRoofsDrawing(): void {
    let roofsDrawing = this.layer.roofsDrawing;
    
    if (!roofsDrawing) {
      roofsDrawing = new HSCore.Model.RoofsDrawing();
      this.layer.addChild(roofsDrawing);
    }

    const drawRoofs: HSCore.Model.Roof[] = [];
    this.layer.forEachRoof((roof: HSCore.Model.Roof) => {
      if (roof.generatedType === HSCore.Model.ParametricRoofGeneratedTypeEnum.DRAW) {
        drawRoofs.push(roof);
      }
    });

    roofsDrawing.initDrawingRegionsByRoofs(drawRoofs);
  }

  private _clearRoofsDrawing(layer?: HSCore.Model.Layer): void {
    const roofsDrawing = layer?.roofsDrawing;
    
    if (roofsDrawing) {
      roofsDrawing.clearBuilder();
      roofsDrawing.removeAllChildren();
      
      if (!roofsDrawing.isValid()) {
        layer!.removeChild(roofsDrawing);
      }
    }
  }

  private _listenSignals(): void {
    this._signalHook!.listen(
      this._app.floorplan.scene.signalActiveLayerChanged,
      this._onActiveLayerChanged
    );
    this._signalHook!.listen(
      this._app.cmdManager.signalCommandStarting,
      this._onCommandStarting
    );
    this._signalHook!.listen(
      this._app.cmdManager.signalCommandTerminated,
      this._onCommandTerminated
    );
  }

  private _onActiveLayerChanged(event: CommandEvent): void {
    this.layer = this._app.floorplan.scene.activeLayer;
    this._previousLayer = event.data?.oldValue as HSCore.Model.Layer;
  }

  private _onSwitchLayer(): void {
    this._destroySketchView();
    this._canvasWrapper?.updatelayer(this.layer);
    this._updateAllLayers2d();
    this._clearRoofsDrawing(this._previousLayer);
    this._createRoofsDrawing();
    this._createSketchView();
    this._transaction?.enter();
  }

  private _onCommandStarting(event: CommandEvent): void {
    if (event.data?.cmd?.type === HSFPConstants.CommandType.ActiveLayer) {
      this._transaction?.abort();
    }
  }

  private _onCommandTerminated(event: CommandEvent): void {
    if (event.data?.cmd?.type === HSFPConstants.CommandType.ToggleLayerVisibility) {
      this._onSwitchLayer();
    }
  }

  private _createCanvas(container: HTMLElement): void {
    if (!this._canvasWrapper) {
      this._canvasWrapper = new CanvasWrapper(container, this.layer);
      this._canvasWrapper.createAux2D();

      const aux2DCanvas = this._canvasWrapper.aux2DCanvas;
      this._sketchGizmoFactory = new GizmoFactory(aux2DCanvas, this._app);
      aux2DCanvas.registerGizmoFactory(this._sketchGizmoFactory);
    }
  }

  private _destroyCanvas(): void {
    this._canvasWrapper!.aux2DCanvas.unregisterGizmoFactory(this._sketchGizmoFactory!);
    this._sketchGizmoFactory = undefined;
    this._canvasWrapper?.destroyAux2D();
    this._canvasWrapper = undefined;
  }

  private _updateAllLayers2d(): void {
    const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
    
    this._app.floorplan.scene.getLayersInOrder().forEach((layer: HSCore.Model.Layer) => {
      const displayObject = aux2DCanvas.getDisplayObjectByID(layer.id);
      
      if (displayObject) {
        displayObject.reCreateAllChildren();
        displayObject.dirtyGraph();
      }
    });
  }

  private _createSketchView(): void {
    const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
    const layerDisplayObject = aux2DCanvas.getDisplayObjectByID(this.layer.id);
    const roofsDrawingModel = this.layer.roofsDrawing!;
    
    const roofsDrawingView = new RoofsDrawing(
      aux2DCanvas.context,
      layerDisplayObject,
      aux2DCanvas.displayLayers.mask,
      roofsDrawingModel
    );
    
    roofsDrawingView.init();
    layerDisplayObject.addChild(roofsDrawingView);
    roofsDrawingView.dirtyGraph();
    this._sketchView = roofsDrawingView;
  }

  private _destroySketchView(): void {
    if (this._sketchView) {
      const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
      const layerDisplayObject = aux2DCanvas.getDisplayObjectByID(this.layer.id);
      
      if (layerDisplayObject) {
        layerDisplayObject.removeChild(this._sketchView);
        aux2DCanvas.removeDisplayObject(this._sketchView);
      }
      
      this._sketchView = undefined;
    }
  }

  private _initUI(): void {
    if (!this._ui) {
      this._ui = new UI(this);
      this._ui.renderAux2D();
    }
    
    this._initPanels();
  }

  private _destroyUI(): void {
    this._ui?.destroy();
    this._ui = undefined;
    this._restorePanels();
  }

  public supportSingleRoomMode(): boolean {
    return false;
  }

  public supportViewOptions(): boolean {
    return true;
  }

  private _initPanels(): void {
    this.toolbar = new Toolbar(this, this.handler, this.handler.dependencies);
    this.oldToolbarId = this.toolbar.activate();
    this.catalogPlugin.toggleCatalog(false);

    const layersOnGround = this._app.floorplan.scene.getActualLayersOnGround();
    const layerEditPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit);
    
    layerEditPlugin?.setlayerEditBarParams({
      includedLayers: layersOnGround,
      switchLayerConfirm: () => {
        if (!this._app.transManager.canUndo()) {
          return false;
        }
        return this._ui?.showSwitchLayerConfirm() ?? false;
      }
    });
    
    layerEditPlugin?.show();
  }

  private _restorePanels(): void {
    this.toolbar?.restore(this.oldToolbarId!);
    this.toolbar = undefined;
    this.catalogPlugin.toggleCatalog(true);

    const layerEditPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit);
    layerEditPlugin?.setlayerEditBarParams(undefined);
    layerEditPlugin?.show();
  }

  public get2DViewOptions(): View2DOption[] {
    const primaryViewMode = this._app.primaryViewMode;
    
    return [{
      type: 'toplevel',
      id: 'viewModeDropdown',
      order: 50,
      data: {
        options: [{
          id: HSApp.View.ViewModeEnum.RCP,
          icons: [
            { id: 'rcpIcon', fieldName: 'icon' },
            { id: 'rcpActiveIcon', fieldName: 'iconActive' }
          ],
          strings: [{
            id: 'plugin_customizedModeling_2d_view',
            fieldName: 'label',
            hotKey: '1'
          }]
        }],
        defaultKey: primaryViewMode
      }
    }];
  }

  public getCanvas2d(): unknown {
    return this._canvasWrapper!.aux2DCanvas;
  }

  public onRecoverAll(): void {
    this._app.cmdManager.cancel();
    this._transaction?.recover();
  }

  public showAutoGeneratePlaneRoofsConfirm(): boolean | Promise<boolean> | undefined {
    return this._ui?.showAutoGeneratePlaneRoofsConfirm();
  }

  private _getAllRoofIds(): string[] {
    const roofIds: string[] = [];
    
    this._app.floorplan.scene.forEachLayer((layer: HSCore.Model.Layer) => {
      layer.forEachRoof((roof: HSCore.Model.Roof) => {
        if (roof.generatedType === HSCore.Model.ParametricRoofGeneratedTypeEnum.DRAW) {
          roofIds.push(roof.id);
        }
      });
    });
    
    return roofIds;
  }

  private _trackRoofDrawCount(): void {
    if (!this._originalRoofIds) {
      return;
    }

    const currentRoofIds = this._getAllRoofIds();
    let createdCount = 0;
    let deletedCount = 0;

    currentRoofIds.forEach((roofId: string) => {
      if (!this._originalRoofIds!.includes(roofId)) {
        createdCount++;
      }
    });

    this._originalRoofIds.forEach((roofId: string) => {
      if (!currentRoofIds.includes(roofId)) {
        deletedCount++;
      }
    });

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Roof,
      'draw_env_generate_roof_event',
      {
        delete: deletedCount,
        create: createdCount
      }
    );
  }
}