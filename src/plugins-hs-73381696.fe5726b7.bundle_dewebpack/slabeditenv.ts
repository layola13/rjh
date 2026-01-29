import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface SlabEditEnvOptions {
  app: any;
  handler: any;
  dependencies: Record<string, any>;
}

interface ActivateOptions {
  layer?: any;
}

export class SlabEditEnv extends HSApp.Environment.CommonEnvironment {
  toolbar: SlabEditToolbar;
  handler: any;
  layer: any;
  modeController: any;
  catalogPlugin: any;
  resizeWidgetPlugin: any;
  viewSwitchPlugin: any;
  propertyBar: any;
  private _session: any;
  oldToolbarId: string | undefined;
  gizmo: any;
  sketchBuilder: HSCore.Model.LayerSketch2dBuilder | undefined;
  private _sketchView: any;
  private _gizmoFactory: any;

  constructor(options: SlabEditEnvOptions) {
    super(options.app);

    this.handler = options.handler;
    this.toolbar = new SlabEditToolbar(options.dependencies);
    this.modeController = new ModeController();
    this.catalogPlugin = options.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.resizeWidgetPlugin = options.app.pluginManager.getPlugin(HSFPConstants.PluginType.ResizeWidget);
    this.viewSwitchPlugin = options.app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
    this.propertyBar = options.dependencies[HSFPConstants.PluginType.PropertyBar];
  }

  onActivate(options: ActivateOptions = { layer: undefined }): void {
    this.layer = options.layer || this._app.floorplan.scene.activeLayer;
    this._session = this._app.transManager.startSession();
    this.modeController.on();
    this.sketchBuilder = new HSCore.Model.LayerSketch2dBuilder(this.layer);
    this._initUI();
    this._createSketchView();
    this._hidePanels();
    this._registerHotkeys();
  }

  onDeactivate(): void {
    this._app.selectionManager.unselectAll();
    this.onApplySave();
    this.onCompleteEdit();
    this.modeController.off();
    this._destroySketchView();
    this._unregisterHotkeys();
    this._restorePanels();
    this.toolbar.sketchBuilder = undefined;

    if (this.sketchBuilder) {
      this.layer.slabSketch2dGuildLines = this.sketchBuilder.getSketch().guidelines;
    }

    this.layer.slabeditor = undefined;
    this.sketchBuilder = undefined;
  }

  getSketchView(): any {
    return this._sketchView;
  }

  private _createSketchView(): void {
    const view2D = this._app.getActive2DView();
    const sketch = this.sketchBuilder!.getSketch();
    const displayObject = view2D.getDisplayObjectByID(this.layer.id);
    const interactiveSketch = new HSApp.ExtraordinarySketch2d.InteractiveSketch(sketch, this.sketchBuilder);
    const sketchView = new Sketch(view2D.context, displayObject, view2D.displayLayers.mask, interactiveSketch);

    sketchView.init(this.layer);
    displayObject.addChild(sketchView);
    sketchView.dirtyGraph();

    this._sketchView = sketchView;
    this._gizmoFactory = new GizmoFactory(view2D, this._app);
    view2D.registerGizmoFactory(this._gizmoFactory);
  }

  private _destroySketchView(): void {
    if (!this._sketchView) {
      return;
    }

    const view2D = this._app.getActive2DView();
    const displayObject = view2D.getDisplayObjectByID(this.layer.id);

    if (displayObject) {
      displayObject.removeChild(this._sketchView);
      view2D.removeDisplayObject(this._sketchView);
    }

    this._sketchView = undefined;
    view2D.unregisterGizmoFactory(this._gizmoFactory);
    this._gizmoFactory = undefined;
  }

  private _initUI(): void {
    const isOutdoorLayer = this.layer === this._app.floorplan.scene.outdoorLayer;
    this.oldToolbarId = this.toolbar.activate(this, isOutdoorLayer, this.sketchBuilder);
    this.toolbar.init(isOutdoorLayer);
  }

  supportSingleRoomMode(): boolean {
    return false;
  }

  onMeasureTool(): void {
    const command = this._app.cmdManager.createCommand(HSFPConstants.CommandType.MeasureTool);
    this._app.cmdManager.execute(command);
  }

  onAddGuideLine(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.AddGuideLines,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }

  onClearGuideLines(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.ClearGuideLines,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }

  onApplySave(): void {
    // Implementation placeholder
  }

  onResetChanges(): void {
    this._session.abort();
    this._session = this._app.transManager.startSession();
  }

  onCompleteEdit(): void {
    HSCore.Util.Layer.extendsCrossLayerOpenings(this.layer.prev, this.layer);
    this._app.cmdManager.complete();

    if (this._session) {
      this._session.commit();
      this._session = undefined;
    }
  }

  private _hidePanels(): void {
    this.viewSwitchPlugin.hide();
    this.resizeWidgetPlugin.enterSimpleMode();
    this.catalogPlugin.toggleCatalog(false);
    this.propertyBar.hide();
    this._app.appSettings.setViewItem("cameraVisible", false, this.id);
  }

  private _restorePanels(): void {
    this.toolbar.restore(this.oldToolbarId);
    this.resizeWidgetPlugin.exitSimpleMode();
    this.catalogPlugin.toggleCatalog(true);
    this.viewSwitchPlugin.show();
    this.propertyBar.show();
    this._app.appSettings.setViewItem("cameraVisible", true, this.id);
  }

  private _registerHotkeys(): void {
    this._app.hotkey.registerHotkey("backspace", this.onDelete.bind(this));
    this._app.hotkey.registerHotkey("delete", this.onDelete.bind(this));
  }

  private _unregisterHotkeys(): void {
    this._app.hotkey.unregisterHotkey("backspace", "delete");
  }

  onDelete(): void {
    const selected = this._app.selectionManager.selected();

    if (!selected.length || !(selected[0] instanceof HSApp.ExtraordinarySketch2d.InteractiveModel)) {
      return;
    }

    const interactiveModel = selected[0];
    const srcModel = interactiveModel.srcModel;

    if (srcModel instanceof HSCore.Model.ExtraordinaryGuideline || srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
      const cmdManager = this._app.cmdManager;
      const command = cmdManager.createCommand(
        HSFPConstants.CommandType.ExtraordinarySketch2d.Delete,
        [interactiveModel]
      );
      cmdManager.execute(command);
      cmdManager.complete();
    }
  }

  onFillet(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.DrawFillet,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }

  onAddLine(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.DrawPolygons,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }

  onAddRect(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.DrawRectangle,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }

  onAddPolygon(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.DrawRegularPolygon,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }

  onAddCircle(): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.SlabEdit.DrawCircle,
      [this.sketchBuilder]
    );
    this._app.cmdManager.execute(command);
  }
}

export default {
  SlabEditEnv
};