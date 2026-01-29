import { Handler } from './Handler';

interface MessageCenterPlugin {
  // Define MessageCenter plugin interface based on your actual implementation
  [key: string]: unknown;
}

interface PluginDependencies {
  [HSFPConstants.PluginType.MessageCenter]: MessageCenterPlugin;
}

class SingleDeviceLoginPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    super({
      name: "Single Device Login",
      description: "",
      dependencies: [HSFPConstants.PluginType.MessageCenter]
    });
    
    this.handler = new Handler();
  }

  onActive(pluginInstance: unknown, dependencies: PluginDependencies): void {
    const messageCenterPlugin = dependencies[HSFPConstants.PluginType.MessageCenter];
    this.handler.init(messageCenterPlugin);
  }

  onDeactive(): void {
    // Cleanup logic can be added here if needed
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.SingleDeviceLogin,
  SingleDeviceLoginPlugin,
  () => {}
);