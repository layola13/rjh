import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { Toolbar } from './Toolbar';
import { ModeController } from './ModeController';
import { GizmoFactory } from './GizmoFactory';
import { CanvasWrapper } from './CanvasWrapper';
import { UI } from './UI';
import { OutdoorDrawingTransaction } from './OutdoorDrawingTransaction';
import { Sketch } from './Sketch';

interface OutdoorDrawingEnvironmentOptions {
  app: HSApp.Application;
  handler: OutdoorDrawingHandler;
  dependencies: Record<string, any>;
}

interface OutdoorDrawingHandler {
  registerHotkeys(): void;
  unregisterHotkeys(): void;
  registerLeftMenuMouseEvent(mouse: any): void;
  unregisterLeftMenuMouseEvent(mouse: any): void;
  dependencies: Record<string, any>;
}

interface CatalogPlugin {
  toggleCatalog(visible: boolean): void;
}

interface ResizeWidgetPlugin {
  // Add specific methods if needed
}

interface ViewSwitchPlugin {
  // Add specific methods if needed
}

interface PropertyBar {
  // Add specific methods if needed
}

interface OutdoorLayer {
  id: string;
  slabeditor?: any;
}

interface ViewOption {
  type: string;
  id: string;
  order: number;
  data: {
    options: Array<{
      id: HSApp.View.ViewModeEnum;
      icons: Array<{
        id: string;
        fieldName: string;
      }>;
      strings: Array<{
        id: string;
        fieldName: string;
        hotKey: string;
      }>;
    }>;
    defaultKey: HSApp.View.ViewModeEnum;
  };
}

export class OutdoorDrawingEnvironment extends HSApp.Environment.CommonEnvironment {
  toolbar?: Toolbar;
  handler: OutdoorDrawingHandler;
  layer?: OutdoorLayer;
  modeController?: ModeController;
  catalogPlugin: CatalogPlugin;
  resizeWidgetPlugin?: ResizeWidgetPlugin;
  viewSwitchPlugin?: ViewSwitchPlugin;
  propertyBar?: PropertyBar;
  oldToolbarId?: string;
  gizmo?: any;

  private _sketchView?: Sketch;
  private _sketchBuilder?: HSCore.Model.OutdoorDrawingSketch2dBuilder;
  private _sketchGizmoFactory?: GizmoFactory;
  private _app: HSApp.Application;
  private _signalHook?: HSCore.Util.SignalHook;
  private _ui?: UI;
  private _canvasWrapper?: CanvasWrapper;
  private _transaction?: OutdoorDrawingTransaction;

  constructor(options: OutdoorDrawingEnvironmentOptions) {
    super(options.app);

    this._app = options.app;
    this.handler = options.handler;
    this.catalogPlugin = options.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.resizeWidgetPlugin = options.app.pluginManager.getPlugin(HSFPConstants.PluginType.ResizeWidget);
    this.viewSwitchPlugin = options.app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
    this.propertyBar = options.dependencies[HSFPConstants.PluginType.PropertyBar];
  }

  onActivate(params?: any): void {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._initUI();
    this.layer = this._app.floorplan.scene.outdoorLayer;
    this._createSketch();
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

    this._transaction = new OutdoorDrawingTransaction();
    this._transaction.enter();
  }

  onDeactivate(): void {
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
    this._clearSketch();
    this._transaction?.exit();
    this._transaction = undefined;
  }

  getSketchView(): Sketch | undefined {
    return this._sketchView;
  }

  private _createSketch(): void {
    this._sketchBuilder = new HSCore.Model.OutdoorDrawingSketch2dBuilder(this.layer!);
  }

  private _clearSketch(): void {
    if (this.layer) {
      this.layer.slabeditor = undefined;
    }
    this._sketchBuilder = undefined;
  }

  getSketchBuilder(): HSCore.Model.OutdoorDrawingSketch2dBuilder | undefined {
    return this._sketchBuilder;
  }

  private _listenSignals(): void {
    // Signal listening logic would go here
  }

  private _createCanvas(container: HTMLElement): void {
    if (!this._canvasWrapper) {
      this._canvasWrapper = new CanvasWrapper(container, this.layer!);
      this._canvasWrapper.createAux2D();

      const aux2DCanvas = this._canvasWrapper.aux2DCanvas;
      this._sketchGizmoFactory = new GizmoFactory(aux2DCanvas, this._app);
      aux2DCanvas.registerGizmoFactory(this._sketchGizmoFactory);
    }
  }

  private _destroyCanvas(): void {
    if (this._canvasWrapper && this._sketchGizmoFactory) {
      this._canvasWrapper.aux2DCanvas.unregisterGizmoFactory(this._sketchGizmoFactory);
      this._sketchGizmoFactory = undefined;
    }
    this._canvasWrapper?.destroyAux2D();
    this._canvasWrapper = undefined;
  }

  private _createSketchView(): void {
    const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
    const layerDisplayObject = aux2DCanvas.getDisplayObjectByID(this.layer!.id);
    const sketch = this._sketchBuilder!.getSketch();
    const interactiveSketch = new HSApp.ExtraordinarySketch2d.InteractiveSketch(
      sketch,
      this._sketchBuilder!
    );
    const sketchView = new Sketch(
      aux2DCanvas.context,
      layerDisplayObject,
      aux2DCanvas.displayLayers.mask,
      interactiveSketch
    );

    sketchView.init(this.layer!);
    layerDisplayObject.addChild(sketchView);
    sketchView.dirtyGraph();
    this._sketchView = sketchView;
  }

  private _destroySketchView(): void {
    if (this._sketchView) {
      const aux2DCanvas = this._canvasWrapper!.aux2DCanvas;
      const layerDisplayObject = aux2DCanvas.getDisplayObjectByID(this.layer!.id);

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

  supportSingleRoomMode(): boolean {
    return false;
  }

  supportViewOptions(): boolean {
    return true;
  }

  private _initPanels(): void {
    this.toolbar = new Toolbar(this, this.handler, this.handler.dependencies);
    this.oldToolbarId = this.toolbar.activate();
    this.catalogPlugin.toggleCatalog(false);
  }

  private _restorePanels(): void {
    this.toolbar?.restore(this.oldToolbarId!);
    this.toolbar = undefined;
    this.catalogPlugin.toggleCatalog(true);
  }

  get2DViewOptions(): ViewOption[] {
    const primaryViewMode = this._app.primaryViewMode;

    return [
      {
        type: 'toplevel',
        id: 'viewModeDropdown',
        order: 50,
        data: {
          options: [
            {
              id: HSApp.View.ViewModeEnum.Plane,
              icons: [
                {
                  id: 'planeIcon',
                  fieldName: 'icon'
                },
                {
                  id: 'planeActiveIcon',
                  fieldName: 'iconActive'
                }
              ],
              strings: [
                {
                  id: 'contextmenu_viewmode_plane',
                  fieldName: 'label',
                  hotKey: '1'
                }
              ]
            }
          ],
          defaultKey: primaryViewMode
        }
      }
    ];
  }

  getCanvas2d(): any {
    return this._canvasWrapper!.aux2DCanvas;
  }

  onRecoverAll(): void {
    this._app.cmdManager.cancel();
    this._transaction?.recover();
  }
}