import { HSApp } from './path/to/HSApp';
import { Handler } from './path/to/Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class AIDAPlugin extends HSApp.Plugin.IPlugin {
  private handler?: Handler;

  constructor() {
    const config: PluginConfig = {
      name: "AIDA Plugin",
      description: "ai design award",
      dependencies: []
    };
    super(config);
  }

  onActive(event: unknown, args: unknown): void {
    super.onActive?.(event, args);
    this.handler = new Handler();
    this.handler.init();
  }

  onDeactive(): void {
    // Cleanup logic can be added here if needed
  }

  showAIDAEntry(): void {
    this.handler?.showAIDAEntry();
  }

  hideAIDAEntry(): void {
    this.handler?.hideAIDAEntry();
  }

  openAIDA(event: unknown): unknown {
    return this.handler?.openAIDA(event);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.AIDA, AIDAPlugin);