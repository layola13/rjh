interface PluginConfig {
  name: string;
  discription: string;
  dependencies: string[];
}

interface StatusBarItem {
  id: string;
  [key: string]: unknown;
}

interface IPlugin {
  onActive(context: { app: unknown }, config: unknown): void;
  onDeactive(): void;
}

interface StatusBarHandler {
  init_(app: unknown, config: unknown): void;
  uninit_(): void;
  addItem(id: string, item: StatusBarItem): void;
  getItemById(id: string): StatusBarItem | undefined;
  update(id: string, key: string, value: unknown): void;
  show(id: string): void;
  hide(): void;
  clear(): void;
  handleResize(): void;
  disableStatusBarByType(type: string): void;
  enableStatusBarByType(type: string): void;
  isDisabled(type: string): boolean;
  showStatusBar(type: string, visible: boolean): void;
}

class StatusBarPlugin extends HSApp.Plugin.IPlugin {
  private readonly _handler: StatusBarHandler;

  constructor() {
    super({
      name: "status bar Plugin",
      discription: "status bar",
      dependencies: []
    });
    
    this._handler = new StatusBarHandlerImpl();
  }

  onActive(context: { app: unknown }, config: unknown): void {
    const { app } = context;
    this._handler.init_(app, config);
  }

  onDeactive(): void {
    this._handler.uninit_();
  }

  addItem(id: string, item: StatusBarItem): void {
    this._handler.addItem(id, item);
  }

  getItemById(id: string): StatusBarItem | undefined {
    return this._handler.getItemById(id);
  }

  update(id: string, key: string, value: unknown): void {
    this._handler.update(id, key, value);
  }

  show(id: string): void {
    this._handler.show(id);
  }

  hide(): void {
    this._handler.hide();
  }

  clear(): void {
    this._handler.clear();
  }

  handleResize(): void {
    this._handler.handleResize();
  }

  disableStatusBar(type: string): void {
    this._handler.disableStatusBarByType(type);
  }

  enableStatusBar(type: string): void {
    this._handler.enableStatusBarByType(type);
  }

  isDisabled(type: string): boolean {
    return this._handler.isDisabled(type);
  }

  showStatusBar(type: string, visible: boolean): void {
    this._handler.showStatusBar(type, visible);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.StatusBar, StatusBarPlugin);