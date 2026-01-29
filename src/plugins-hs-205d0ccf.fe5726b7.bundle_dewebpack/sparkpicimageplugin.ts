import { Handler } from './Handler';
import { HSApp } from './HSApp';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  [key: string]: unknown;
}

export class SparkPicImagePlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "Spark Pic Image Plugin",
      description: "spark pic image plugin",
      dependencies: [
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.ResizeWidget,
        HSFPConstants.PluginType.SingleRoom,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.LayerEdit,
        HSFPConstants.PluginType.TeachingAbility,
        HSFPConstants.PluginType.UserInfo,
        "hsw.plugin.persistence.Plugin",
        HSFPConstants.PluginType.Feedback
      ].filter((dependency): dependency is string => !!dependency)
    };

    super(config);
    this._handler = new Handler();
  }

  public onActive(pluginInstance: unknown, context: PluginContext): void {
    this._handler.init(context);
  }

  public onDeactive(): void {
    this._handler.onDeactive();
  }

  public openImageList(): void {
    this._handler.openImageList();
  }

  public imageBrowserLite(options: unknown): unknown {
    return this._handler.imageBrowserLite(options);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.SparkPicImage, SparkPicImagePlugin);