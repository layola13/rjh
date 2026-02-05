// @ts-nocheck
import { HSApp } from './HSApp';
import { SignalHook } from './types';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  [key: string]: unknown;
}

class HomeGPTHandler {
  private context?: PluginContext;

  public init(context: PluginContext): void {
    this.context = context;
  }

  public uninit(): void {
    this.context = undefined;
  }

  public getSignalHook(): SignalHook {
    return {} as SignalHook;
  }

  public queryTerminate(): boolean {
    return false;
  }
}

class HomeGPTPlugin extends HSApp.Plugin.IPlugin {
  private handler: HomeGPTHandler;

  constructor() {
    const config: PluginConfig = {
      name: 'HomeGPT',
      description: 'Your Home Design AI Assistant',
      dependencies: []
    };

    super(config);
    this.handler = new HomeGPTHandler();
  }

  public onActive(context: PluginContext): void {
    this.handler.init(context);
  }

  public onDeactive(): void {
    this.handler.uninit();
  }

  public getSignalHook(): SignalHook {
    return this.handler.getSignalHook();
  }

  public queryTerminate(): boolean {
    return this.handler.queryTerminate();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.HomeGPT, HomeGPTPlugin);