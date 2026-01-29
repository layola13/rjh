interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  app: HSApp.Application;
}

interface ReadOnlyDesignHandler {
  init(app: HSApp.Application, config: unknown): void;
  uninit(): void;
}

class ReadOnlyDesignHandler implements ReadOnlyDesignHandler {
  init(app: HSApp.Application, config: unknown): void {
    // Implementation
  }

  uninit(): void {
    // Implementation
  }
}

class ReadOnlyDesignPlugin extends HSApp.Plugin.IPlugin {
  private readonly _handler: ReadOnlyDesignHandler;

  constructor() {
    const config: PluginConfig = {
      name: "readonly design plugin",
      description: "handle readonly design",
      dependencies: [HSFPConstants.PluginType.SignIn]
    };

    super(config);
    this._handler = new ReadOnlyDesignHandler();
  }

  onActive(context: PluginContext, config: unknown): void {
    this._handler.init(context.app, config);
  }

  onDeactive(): void {
    this._handler.uninit();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.ReadOnlyDesign,
  ReadOnlyDesignPlugin
);