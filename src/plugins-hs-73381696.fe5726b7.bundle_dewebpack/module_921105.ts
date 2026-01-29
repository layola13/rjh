import { Handler } from './Handler';

interface PluginDependencies {
  [key: string]: unknown;
}

interface ExecuteOptions {
  [key: string]: unknown;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface ActiveEventContext {
  app: unknown;
}

interface HandlerInitOptions {
  app: unknown;
  dependencies: PluginDependencies;
}

interface Strategy {
  [key: string]: unknown;
}

class MaterialBrushPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "Material Brush plugin",
      description: "Apply material of a face on another face",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.RightMenu,
        HSFPConstants.PluginType.Ngmmixpaint,
        HSFPConstants.PluginType.PropertyBar
      ]
    };

    super(config);
    this._handler = new Handler();
  }

  onActive(context: ActiveEventContext, dependencies: PluginDependencies): void {
    super.onActive?.(context);

    this._handler.init({
      app: context.app,
      dependencies
    });
  }

  onDeactive(): void {
    this._handler.uninit();
  }

  execute(options: ExecuteOptions): void {
    this._handler.execute(options);
  }

  enterMaterialBrush(): void {
    this._handler.enterMaterialBrush();
  }

  registerStrategy(strategy: Strategy): void {
    this._handler.registerStrategy(strategy);
  }

  unregisterStrategy(strategy: Strategy): void {
    this._handler.unregisterStrategy(strategy);
  }

  suckMaterialFromMesh(mesh: unknown): unknown {
    return this._handler.suckMaterialFromMesh(mesh);
  }

  getBenefitAmount(): number {
    return this._handler.getBenefitAmount();
  }

  showMarketModal(): unknown {
    return this._handler.showMarketModal();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.MaterialBrush, MaterialBrushPlugin);