class Handler {
  init(): void {
    // Handler initialization logic
  }

  show(data: unknown): void {
    // Handler show logic
  }
}

interface IPlugin {
  init(): void;
  onActive(): void;
  show(data: unknown): void;
  onDeactive(): void;
}

class BomControlPlugin extends IPlugin {
  private _handler: Handler;

  constructor() {
    super({ dependencies: [] });
    this._handler = new Handler();
  }

  init(): void {
    this._handler.init();
  }

  onActive(): void {
    this.init();
  }

  show(data: unknown): void {
    this._handler.show(data);
  }

  onDeactive(): void {
    // Deactivation logic
  }
}

// Plugin registration
declare const HSApp: {
  Plugin: {
    registerPlugin(type: string, plugin: typeof BomControlPlugin): void;
  };
};

declare const HSFPConstants: {
  PluginType: {
    BomControl: string;
  };
};

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.BomControl, BomControlPlugin);