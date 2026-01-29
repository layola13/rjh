import { PluginType } from './constants';
import { IPlugin } from './plugin-interface';
import { RoofObstacleHandler } from './roof-obstacle-handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: PluginType[];
}

class RoofObstaclePlugin extends IPlugin {
  private readonly _handler: RoofObstacleHandler;

  constructor() {
    const config: PluginConfig = {
      name: "roof obstacle",
      description: "process obstacles in roof",
      dependencies: [
        PluginType.ContextualTools,
        PluginType.PropertyBar,
        PluginType.Catalog,
        PluginType.MaterialImage,
        PluginType.LeftMenu,
        PluginType.RightMenu
      ]
    };

    super(config);
    this._handler = new RoofObstacleHandler();
  }

  onActive(context: unknown, options: unknown): void {
    this._handler.init(context, options);
  }

  onDeactive(): void {
    this._handler.uninit();
  }
}

export { RoofObstaclePlugin };

// Register plugin
if (typeof HSApp !== 'undefined' && HSApp.Plugin?.registerPlugin) {
  HSApp.Plugin.registerPlugin(PluginType.RoofObstacle, RoofObstaclePlugin);
}