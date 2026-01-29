import { HSApp } from './HSApp';
import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface ConnectSignal {
  // Define the structure based on your application's needs
  [key: string]: unknown;
}

type MessageListener<T = unknown> = (data: T) => void;

class MessageCenterPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "ezhome message center plugin",
      description: "ezhome message center plugin",
      dependencies: []
    };
    
    super(config);
    this.handler = new Handler();
  }

  onActive(context: unknown, options: unknown): void {
    // Plugin activation logic
  }

  onDeactive(): void {
    // Plugin deactivation logic
  }

  getConnectSignal(): ConnectSignal {
    return this.handler.getConnectSignal();
  }

  listen<T = unknown>(event: string, listener: MessageListener<T>): void {
    return this.handler.listen(event, listener);
  }

  unlisten<T = unknown>(event: string, listener: MessageListener<T>): void {
    return this.handler.unlisten(event, listener);
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.MessageCenter,
  MessageCenterPlugin,
  () => {
    // Registration callback
  }
);