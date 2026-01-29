interface Plugin {
  getIsInImageBrowserEnv(): boolean;
}

interface PluginManager {
  getPlugin(name: string): Plugin | undefined;
}

interface App {
  pluginManager: PluginManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSAppNamespace;

interface ModuleResult {
  selected: undefined;
}

function module_fn(): ModuleResult | undefined {
  const plugin = HSApp.App.getApp().pluginManager.getPlugin("hsw.plugin.renderImageBrowserPlugin.Plugin");
  
  if (plugin?.getIsInImageBrowserEnv()) {
    return {
      selected: undefined
    };
  }
  
  return undefined;
}