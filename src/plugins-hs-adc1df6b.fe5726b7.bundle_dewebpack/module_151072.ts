import { HSApp } from './HSApp';
import { ENParamRoofType } from './enums';
import Handler from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface RoofMetaInfo {
  roofType: ENParamRoofType;
  [key: string]: unknown;
}

interface Resource {
  roofMetaList: RoofMetaInfo[];
}

class CustomizedParametricRoofPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "Customized parametric roof plugin",
      description: "support Customized parametric roof",
      dependencies: [
        HSFPConstants.PluginType.ViewSwitch,
        HSFPConstants.PluginType.StatusBar,
        HSFPConstants.PluginType.LayerEdit,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.ResizeWidget,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.RightMenu,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.Persistence,
        HSFPConstants.PluginType.Feedback
      ]
    };

    super(config);
    this.handler = new Handler();
  }

  onActive(context: unknown, options: unknown): void {
    this.handler.init(context, options);
  }

  onDeactive(): void {
    this.handler.uninit();
  }

  generateRoofRegionProperty(roofRegion: unknown): unknown {
    return this.handler.propertyBarHandler.generatePropertyByRoofRegion(roofRegion);
  }

  generateRoofProperty(roof: unknown): unknown {
    return this.handler.propertyBarHandler.generatePropertyByRoof(roof);
  }

  refreshViewController(viewController: unknown): void {
    this.handler.refreshViewController(viewController);
  }

  getPlaneRoofMetaInfo(): RoofMetaInfo | undefined {
    return this.handler.getResource().roofMetaList.find(
      (meta: RoofMetaInfo) => meta.roofType === ENParamRoofType.Plane
    );
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.ParametricRoof,
  CustomizedParametricRoofPlugin
);