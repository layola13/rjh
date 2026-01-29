import { Handler } from './Handler';

interface PluginDependency {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginActivationContext {
  app: unknown;
}

interface PluginDependencies {
  [key: string]: unknown;
}

/**
 * ViewSwitch Plugin for floorplan view management
 * Provides functionality to switch between different view modes
 */
class ViewSwitchPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    super([
      {
        name: "ViewSwitch Plugin",
        description: "provide ViewSwitch for floorplan",
        dependencies: [
          "hsw.plugin.orbitview.orbitviewpopup.Plugin",
          HSFPConstants.PluginType.ContextualTools,
          "hsw.brand.ezhome.ysjjenv.Plugin"
        ]
      }
    ]);

    this._handler = new Handler();
  }

  onActive(context: PluginActivationContext, dependencies: PluginDependencies): void {
    super.onActive?.(context);
    
    this._handler.init({
      app: context.app,
      dependencies: dependencies
    });
  }

  onDeactive(): void {
    // Cleanup logic when plugin is deactivated
  }

  onViewChanged(): void {
    this._handler._onViewChanged();
  }

  show(): void {
    this._handler.show();
  }

  hide(): void {
    this._handler.hide();
  }

  switchActiveView(viewMode: unknown): void {
    this._handler.switchActiveView(viewMode);
  }

  showAutoSwitchTip(show: boolean): void {
    this._handler.showAutoSwitchTip(show);
  }

  storeViewMode(): void {
    this._handler.storeViewMode();
  }

  restoreViewMode(): void {
    this._handler.restoreViewMode();
  }

  switch3DView(param1: unknown, param2: unknown): void {
    this._handler.switch3DView(undefined, param1, param2);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ViewSwitch, ViewSwitchPlugin);