import { Handler } from './handler';
import { IPlugin, PluginContext, PluginConfig } from './plugin-types';

interface ClientPluginConfig extends PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class ClientPlugin extends IPlugin {
  private handler?: Handler;

  constructor() {
    const config: ClientPluginConfig = {
      name: "Client plugin",
      description: "client",
      dependencies: []
    };
    super(config);
  }

  onActive(context: PluginContext, config: PluginConfig): void {
    super.onActive?.(context, config);
    
    this.handler = new Handler();
    this.handler.init(context);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Client, ClientPlugin);