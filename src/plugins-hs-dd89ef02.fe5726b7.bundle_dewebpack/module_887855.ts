import { Handler } from './Handler';

interface PluginContext {
  app: unknown;
}

interface PluginDependencies {
  [key: string]: unknown;
}

interface SettingStatus {
  [key: string]: unknown;
}

interface PluginMetadata {
  name: string;
  description: string;
}

class UserSettingPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;
  public signalUserSettingToLog: Handler['signalUserSettingToLog'];

  constructor() {
    const metadata: PluginMetadata = {
      name: "UserSetting Plugin",
      description: "provide Usertting for setting parameters"
    };
    
    super(metadata);
    
    this._handler = new Handler();
    this.signalUserSettingToLog = this._handler.signalUserSettingToLog;
  }

  onActive(context: PluginContext, dependencies: PluginDependencies): void {
    super.onActive?.(context);
    
    this._handler.init({
      app: context.app,
      dependencies
    });
  }

  initSettingStatus(status: SettingStatus): void {
    this._handler.initSettingStatus(status);
  }

  getSettingStatus(): SettingStatus {
    return this._handler.getSettingStatus();
  }

  onDeactive(): void {
    // Cleanup if needed
  }

  showViewSetting(): void {
    this._handler.showViewSetting();
  }

  hideViewSetting(): void {
    this._handler.hideViewSetting();
  }

  show(element: unknown, options?: unknown): void {
    this._handler.show(element, options);
  }

  hide(): void {
    this._handler.hide();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.UserSetting, UserSettingPlugin);