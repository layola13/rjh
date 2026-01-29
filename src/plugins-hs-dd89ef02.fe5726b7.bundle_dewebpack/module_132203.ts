import { WallDecorationHandler } from './WallDecorationHandler';
import { WallStyleHandler } from './WallStyleHandler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginHost {
  // Define based on your application's plugin host interface
  [key: string]: unknown;
}

interface PluginContext {
  // Define based on your application's plugin context interface
  [key: string]: unknown;
}

class WallDecorationPlugin extends HSApp.Plugin.IPlugin {
  private _handler?: WallDecorationHandler;
  private _wallStyleHandler?: WallStyleHandler;

  constructor() {
    const config: PluginConfig = {
      name: "3d Wall molding plugin",
      description: "add molding when select a molding on propertybar.",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.WallMolding,
        HSFPConstants.PluginType.Ngmmixpaint,
        HSFPConstants.PluginType.MaterialImage,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.CustomizedTiles,
        HSFPConstants.PluginType.PropertyBar
      ]
    };

    super(config);
  }

  onActive(host: PluginHost, context: PluginContext): void {
    if (!this._handler) {
      this._handler = new WallDecorationHandler(host, context);
    }
    
    if (!this._wallStyleHandler) {
      this._wallStyleHandler = new WallStyleHandler(host, context);
    }
  }

  onDeactive(): void {
    if (this._handler) {
      this._handler.dispose();
      this._handler = undefined;
    }
    
    if (this._wallStyleHandler) {
      this._wallStyleHandler.dispose();
      this._wallStyleHandler = undefined;
    }
  }

  get handler(): WallDecorationHandler | undefined {
    return this._handler;
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.WallDecoration, WallDecorationPlugin);