import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginActivationParams {
  app: unknown;
  [key: string]: unknown;
}

interface HandlerInitConfig {
  app: unknown;
  dependencies: unknown;
}

class MirrorPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "Mirror plugin",
      description: "Mirror floorplan",
      dependencies: [HSFPConstants.PluginType.Toolbar]
    };

    super(config);
    this._handler = new Handler();
  }

  onActive(params: PluginActivationParams, dependencies: unknown): void {
    super.onActive?.(params);

    this._handler.init({
      app: params.app,
      dependencies: dependencies
    });
  }

  mirrorfloorplan(param1: unknown, param2: unknown): void {
    this._handler._mirrorfloorplan(param1, param2);
  }

  onDeactive(): void {
    this._handler.uninit();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.FloorplanMirror,
  MirrorPlugin
);