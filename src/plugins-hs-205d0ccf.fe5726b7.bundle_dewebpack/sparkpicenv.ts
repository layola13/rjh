import { SparkPicFilter } from './SparkPicFilter';
import { controlWalls } from './wallControls';
import { SPARK_PIC_RESIZE_WIDGET_CLASS_NAME, SPARK_PIC_RESIZE_WIDGET_EXTRA } from './constants';

interface SparkPicEnvDependencies {
  [HSFPConstants.PluginType.LeftMenu]: LeftMenuPlugin;
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  [HSFPConstants.PluginType.ContextualTools]: ContextualToolsPlugin;
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.Compass]: CompassPlugin;
}

interface SparkPicEnvConfig {
  app: HSApp.App;
  dependencies: SparkPicEnvDependencies;
}

interface ToolbarConfig {
  addItems: unknown[];
  includeItems: unknown[];
}

interface LeftMenuPlugin {
  disableLeftMenu(): void;
  enableLeftMenu(): void;
}

interface CatalogPlugin {
  toggleCatalog(show: boolean): void;
}

interface PropertyBarPlugin {
  hide(): void;
  show(): void;
}

interface PageHeaderPlugin {
  hide(): void;
  show(): void;
}

interface ContextualToolsPlugin {
  hideStatusBar(): void;
  showStatusBar(): void;
}

interface ToolbarPlugin {
  addLinkedToolbar(name: string, type: string, config: ToolbarConfig): void;
  activateToolbar(name: string): void;
  hide(): void;
  show(): void;
}

interface CompassPlugin {
  hide(): void;
  show(): void;
  setAutoShowHide(enabled: boolean): void;
}

interface GuidePlugin {
  showGuide(): boolean;
}

export class SparkPicEnv extends HSApp.Environment.CommonEnvironment {
  private _catalogPlugin: CatalogPlugin;
  private _menuPlugin: LeftMenuPlugin;
  private _pageHeaderPlugin: PageHeaderPlugin;
  private _contextualToolsPlugin?: ContextualToolsPlugin;
  private _propertyBarPlugin?: PropertyBarPlugin;
  private _toolbarPlugin: ToolbarPlugin;
  private _resizeWidget?: Element | null;
  private _compassPlugin: CompassPlugin;
  private _activateFilter?: unknown;
  private _viewModel?: unknown;

  constructor(config: SparkPicEnvConfig) {
    super(config.app);

    this._menuPlugin = config.dependencies[HSFPConstants.PluginType.LeftMenu];
    this._catalogPlugin = config.dependencies[HSFPConstants.PluginType.Catalog];
    this._propertyBarPlugin = config.dependencies[HSFPConstants.PluginType.PropertyBar];
    this._pageHeaderPlugin = config.dependencies[HSFPConstants.PluginType.PageHeader];
    this._contextualToolsPlugin = config.dependencies[HSFPConstants.PluginType.ContextualTools];
    this._toolbarPlugin = config.dependencies[HSFPConstants.PluginType.Toolbar];
    this._compassPlugin = config.dependencies[HSFPConstants.PluginType.Compass];
    this._resizeWidget = document.querySelector('.resizewidgetcontainer');
  }

  onActivate(args: unknown[]): void {
    this._viewModel = this._app.primaryViewMode;
    this._app.switchPrimaryViewMode(HSFPConstants.ViewModeEnum.FirstPerson);

    const selectionManager = this._app.selectionManager;
    if (selectionManager && !this._activateFilter) {
      selectionManager.unselectAll();
      this._activateFilter = selectionManager.getCurrentFilter();
      selectionManager.activateFilter(new SparkPicFilter());
    }

    controlWalls(this._app, true);
    this._catalogPlugin.toggleCatalog(false);
    this._menuPlugin.disableLeftMenu();

    this._contextualToolsPlugin?.hideStatusBar();
    this._propertyBarPlugin?.hide();

    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin<GuidePlugin>(
      HSFPConstants.PluginType.Guide
    );

    if (guidePlugin?.showGuide()) {
      // Guide is shown
    } else {
      this._pageHeaderPlugin.hide();
    }

    this._compassPlugin.hide();
    this._compassPlugin.setAutoShowHide(false);
    this._activateToolbar();
    this._resizeWidget?.classList?.add(SPARK_PIC_RESIZE_WIDGET_CLASS_NAME);
  }

  onViewMode3DChanged(): void {
    super.onViewMode3DChanged?.();
    this._adjustFirstPersonCamera();

    const cameraType = HSApp.Environment.CommonEnvironment.viewMode2CameraType(this.viewMode3D);
    this._app.designMetadata.set('cameraMode3d', cameraType);
  }

  onDeactivate(): void {
    this._app.switchPrimaryViewMode(this._viewModel);

    const selectionManager = this._app.selectionManager;
    if (selectionManager && this._activateFilter) {
      selectionManager.activateFilter(this._activateFilter);
      this._activateFilter = undefined;
    }

    controlWalls(this._app, false);
    this._catalogPlugin.toggleCatalog(true);
    this._menuPlugin.enableLeftMenu();

    if (this._contextualToolsPlugin) {
      this._contextualToolsPlugin.showStatusBar();
      this._app.signalContextualtoolRefresh.dispatch();
    }

    this._propertyBarPlugin?.show();
    this._pageHeaderPlugin.show();
    this._toolbarPlugin.show();
    this._compassPlugin.show();
    this._compassPlugin.setAutoShowHide(true);

    this._resizeWidget?.classList?.remove(SPARK_PIC_RESIZE_WIDGET_CLASS_NAME);
    this._resizeWidget?.classList?.remove(SPARK_PIC_RESIZE_WIDGET_EXTRA);
  }

  private _activateToolbar(): void {
    this._toolbarPlugin.addLinkedToolbar('sparkPicEnv', 'default', {
      addItems: [],
      includeItems: []
    });
    this._toolbarPlugin.activateToolbar('sparkPicEnv');
    this._toolbarPlugin.hide();
  }
}