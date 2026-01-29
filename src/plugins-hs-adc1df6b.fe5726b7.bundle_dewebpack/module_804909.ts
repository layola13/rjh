import { HSApp } from './HSApp';
import { StairHandler } from './StairHandler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class CustomizedStairPlugin extends HSApp.Plugin.IPlugin {
  private handler: StairHandler;

  constructor() {
    const config: PluginConfig = {
      name: "Customized stair plugin",
      description: "support Customized stair",
      dependencies: [
        HSFPConstants.PluginType.PropertyBar,
        "hsw.brand.ezhome.firstlogin.Plugin"
      ]
    };

    super(config);

    this.handler = new StairHandler();
    this.handler.fetchStairTypes();
  }

  onActive(context: unknown, params: unknown): void {
    this.handler.init(context, params);
  }

  onDeactive(): void {
    this.handler.uninit();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.ParametricStair,
  CustomizedStairPlugin
);