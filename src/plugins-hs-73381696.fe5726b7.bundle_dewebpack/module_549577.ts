import { Handler } from './Handler';

enum PluginType {
  WallDecoration = 'WallDecoration',
  ContextualTools = 'ContextualTools',
  PropertyBar = 'PropertyBar',
  Catalog = 'Catalog',
  CustomizedModeling = 'CustomizedModeling',
  MaterialImage = 'MaterialImage',
  LeftMenu = 'LeftMenu',
  RightMenu = 'RightMenu',
  KitchenObstacle = 'KitchenObstacle'
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: (PluginType | string)[];
}

interface IPlugin {
  onActive(engine: unknown, context: unknown): void;
  onDeactive(): void;
}

/**
 * Kitchen Obstacle Plugin
 * Process obstacles in kitchen environment
 */
class KitchenObstaclePlugin implements IPlugin {
  private readonly _handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: 'kitchen obstacle',
      description: 'process obstacles in kitchen',
      dependencies: [
        PluginType.WallDecoration,
        PluginType.ContextualTools,
        PluginType.PropertyBar,
        PluginType.Catalog,
        PluginType.CustomizedModeling,
        PluginType.MaterialImage,
        'hsw.plugin.WallMolding.Plugin',
        PluginType.LeftMenu,
        PluginType.RightMenu
      ]
    };

    this._handler = new Handler();
  }

  /**
   * Called when plugin becomes active
   * @param engine - The engine instance
   * @param context - The plugin context
   */
  onActive(engine: unknown, context: unknown): void {
    this._handler.init(engine, context);
  }

  /**
   * Called when plugin becomes inactive
   */
  onDeactive(): void {
    this._handler.uninit();
  }
}

export { KitchenObstaclePlugin, PluginType };