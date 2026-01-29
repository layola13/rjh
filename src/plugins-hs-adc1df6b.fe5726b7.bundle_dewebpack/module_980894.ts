import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface InitOptions {
  app: unknown;
  dependencies: unknown;
}

class PropertyBarPlugin extends HSApp.Plugin.IPlugin {
  public handler: Handler;
  public signalPopulatePropertyBar: unknown;
  public signalPopulatePropertyBarTeminated: unknown;
  public signalSwitchPropertyBarTab: unknown;

  constructor() {
    const config: PluginConfig = {
      name: "Property Bar Plugin",
      description: "property bar",
      dependencies: []
    };

    super(config);

    this.handler = new Handler();
    this.signalPopulatePropertyBar = this.handler.signalPopulatePropertyBar;
    this.signalPopulatePropertyBarTeminated = this.handler.signalPopulatePropertyBarTeminated;
    this.signalSwitchPropertyBarTab = this.handler.signalSwitchPropertyBarTab;
  }

  public onActive(context: unknown, dependencies: unknown): void {
    this.handler.init({
      app: (context as any).app,
      dependencies
    });
  }

  public onDeactive(): void {
    // Cleanup logic if needed
  }

  public show(): void {
    this.handler.show();
  }

  public hide(): void {
    this.handler.hide();
  }

  public update(): void {
    this.handler.update();
  }

  public showProperty(property: unknown): void {
    this.handler.showProperty(property);
  }

  public setPropertyBarReadonlyMode(): void {
    this.handler.setPropertyBarReadonlyMode();
  }

  public setPropertyBarEditMode(): void {
    this.handler.setPropertyBarEditMode();
  }

  public enableAutoUpdate(): void {
    this.handler.enableAutoUpdate();
  }

  public disableAutoUpate(): void {
    this.handler.disableAutoUpate();
  }

  public createDefaultPropertyBarNode(): unknown {
    return this.handler.createDefaultPropertyBarNode();
  }

  public getWidgetsByType(type: string): unknown {
    return this.handler.getWidgetsByType(type);
  }

  public switchPropertyBarTab(tabIndex: number): void {
    this.handler.switchPropertyBarTab(tabIndex);
  }

  public foldPropertybar(): void {
    this.handler.foldPropertybar();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.PropertyBar, PropertyBarPlugin);