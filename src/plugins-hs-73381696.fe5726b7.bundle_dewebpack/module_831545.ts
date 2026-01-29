import { HSApp } from './path/to/HSApp';
import { Handler } from './path/to/Handler';

interface PluginDependency {
  name: string;
  description: string;
  dependencies: string[];
}

declare const HSFPConstants: {
  PluginType: {
    Toolbar: string;
    PropertyBar: string;
    LeftMenu: string;
    Catalog: string;
    PageHeader: string;
    ResizeWidget: string;
    LayoutMode: string;
  };
};

class LayoutModePlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    const config: PluginDependency = {
      name: "LayoutMode Plugin",
      description: "",
      dependencies: [
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.PageHeader,
        "hsw.brand.ezhome.firstlogin.Plugin",
        HSFPConstants.PluginType.ResizeWidget
      ]
    };

    super(config);
    this.handler = new Handler();
  }

  onActive(event: unknown, context: unknown): void {
    super.onActive?.(event, context);
    this.handler.init(context);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.LayoutMode, LayoutModePlugin);