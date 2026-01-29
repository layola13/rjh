import { Handler } from './Handler';

interface PluginActivationContext {
  app: any;
}

interface PluginMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

abstract class IPlugin {
  constructor(metadata: PluginMetadata) {}
  abstract onActive(context: PluginActivationContext): void;
  abstract onDeactive(): void;
}

class WallMoldingPlugin extends IPlugin {
  private readonly _handler: Handler;

  constructor() {
    super({
      name: "wall molding",
      description: "process wall molding commands, UI and so on",
      dependencies: []
    });
    
    this._handler = new Handler();
  }

  onActive(context: PluginActivationContext): void {
    const { app } = context;
    this._handler.init(app);
  }

  onDeactive(): void {
    this._handler.uninit();
  }

  getDefaultBaseboard(): unknown {
    return this._handler.getDefaultBaseboard();
  }

  getDefaultBaseboardMaterial(): unknown {
    return this._handler.getDefaultBaseboardMaterial();
  }

  getDefaultCornice(): unknown {
    return this._handler.getDefaultCornice();
  }

  getDefaultCorniceMaterial(): unknown {
    return this._handler.getDefaultCorniceMaterial();
  }

  getDefaultWallBoardWaistLine(): unknown {
    return this._handler.getDefaultWallBoardWaistLine();
  }

  getDefaultWallBoardWaistLineMaterial(): unknown {
    return this._handler.getDefaultWallBoardWaistLineMaterial();
  }

  getDefaultMitre(): unknown {
    return this._handler.getDefaultMitre();
  }

  getDefaultMitreMaterial(): unknown {
    return this._handler.getDefaultMitreMaterial();
  }
}

declare namespace HSApp.Plugin {
  function registerPlugin(name: string, plugin: typeof WallMoldingPlugin): void;
}

HSApp.Plugin.registerPlugin("hsw.plugin.WallMolding.Plugin", WallMoldingPlugin);