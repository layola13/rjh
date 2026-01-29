interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface App {
  cmdManager: unknown;
  Util: {
    Storage: new (key: string) => Storage;
  };
}

interface Storage {
  // Add storage interface methods as needed
}

interface PluginContext {
  app: App;
}

class Handler {
  init(app: App, context: unknown, storage: Storage): void {
    // Implementation details
  }
}

abstract class IPlugin {
  abstract onActive(context: PluginContext, params: unknown): void;
  abstract onDeactive(): void;
}

class PerformanceOptimizerPlugin extends IPlugin {
  private _handler: Handler;
  private _localStorage?: Storage;

  constructor() {
    super();
    
    const config: PluginConfig = {
      name: "Performance Optimizer plugin",
      description: "optimize performance when working under 2d view.",
      dependencies: [HSFPConstants.PluginType.ContextualTools]
    };

    this._handler = new Handler();
  }

  onActive(context: PluginContext, params: unknown): void {
    const { app } = context;
    
    this._localStorage = new HSApp.Util.Storage("hsw.plugin.performanceoptimizer");
    this._handler.init(app, params, this._localStorage);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin(
  "hsw.plugin.performanceoptimizer.Plugin",
  PerformanceOptimizerPlugin
);