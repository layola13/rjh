import { FloorDimension } from './FloorDimension';

interface App {
  // Define based on your HSApp structure
  [key: string]: unknown;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface Handler {
  init(app: App, config: unknown): void;
  enterSlabEdit(data: unknown): void;
  exitSlabEdit(): void;
  _canShow(): boolean;
  show(): void;
  hide(): void;
  disableLayerEdit(force: boolean): void;
  enableLayerEdit(): void;
  setPosition(x: number, y: number): void;
  resetPosition(): void;
  setEditMode(mode: string): void;
  setLayerEditReadonlyMode(): void;
  setLayerEditEditMode(): void;
  setDarkMode(enabled: boolean): void;
  setlayerEditBarParams(params: unknown): void;
  getLayersEditData(data: unknown): unknown;
  activateLayer(layerId: string | number): void;
  exportFloorplanModificationData(dependency: unknown): unknown;
}

class LayerEditPlugin extends HSApp.Plugin.IPlugin {
  private _handler!: Handler;

  constructor() {
    super({
      name: 'layer editing',
      description: 'Process layer edit commands and its gizmos.',
      dependencies: [
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.RightMenu,
        HSFPConstants.PluginType.PageHeader
      ]
    });
  }

  onActive(context: { app: App }, config: unknown): void {
    this._handler = new Handler();
    this._handler.init(context.app, config);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }

  enterSlabEdit(data: unknown): void {
    this._handler.enterSlabEdit(data);
  }

  exitSlabEdit(): void {
    this._handler.exitSlabEdit();
  }

  canShow(): boolean {
    return this._handler._canShow();
  }

  show(): void {
    this._handler.show();
  }

  hide(): void {
    this._handler.hide();
  }

  disableLayerEdit(force = false): void {
    this._handler.disableLayerEdit(force);
  }

  enableLayerEdit(): void {
    this._handler.enableLayerEdit();
  }

  setPosition(x: number, y: number): void {
    this._handler.setPosition(x, y);
  }

  resetPosition(): void {
    this._handler.resetPosition();
  }

  setEditMode(mode: string): void {
    this._handler.setEditMode(mode);
  }

  setLayerEditReadonlyMode(): void {
    this._handler.setLayerEditReadonlyMode();
  }

  setLayerEditEditMode(): void {
    this._handler.setLayerEditEditMode();
  }

  setDarkMode(enabled: boolean): void {
    this._handler.setDarkMode(enabled);
  }

  setlayerEditBarParams(params: unknown): void {
    this._handler.setlayerEditBarParams(params);
  }

  getLayersEditData(data: unknown): unknown {
    return this._handler.getLayersEditData(data);
  }

  activateLayer(layerId: string | number): void {
    this._handler.activateLayer(layerId);
  }

  async exportFloorplanModificationData(
    categoryDependency = 'defaultCategoryDependency'
  ): Promise<unknown> {
    const dependencyData = await NWTK.ajax.get(
      `https://jr-prod-cms-assets.oss-cn-beijing.aliyuncs.com/Config/floorplanModDependency/${categoryDependency}.json`,
      { dataType: 'json' }
    );
    return this._handler.exportFloorplanModificationData(dependencyData);
  }

  createFloorDimensionGizmo(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown
  ): FloorDimension {
    return new FloorDimension(arg1, arg2, arg3);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.LayerEdit, LayerEditPlugin);