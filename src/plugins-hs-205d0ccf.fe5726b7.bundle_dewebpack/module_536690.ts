import { Handler } from './Handler';
import { HSCore } from './HSCore';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface App {
  [key: string]: unknown;
}

interface PluginContext {
  app: App;
}

class ResizeWidgetPlugin extends HSApp.Plugin.IPlugin {
  private handler?: Handler;
  public signalResizeWidgetChanged?: HSCore.Util.Signal<ResizeWidgetPlugin>;

  constructor() {
    const config: PluginConfig = {
      name: "Resize Widget plugin",
      description: "2d/3d subview and switcher",
      dependencies: []
    };
    super(config);
  }

  public onActive(context: PluginContext): void {
    this.signalResizeWidgetChanged = new HSCore.Util.Signal(this);
    const app = context.app;
    this.handler = new Handler({
      signalResizeWidgetChanged: this.signalResizeWidgetChanged
    });
    this.handler.init(app);
  }

  public animateHide(duration: number): void {
    this.handler?.animateHide(duration);
  }

  public animateShow(duration: number): void {
    this.handler?.animateShow(duration);
  }

  public enterSimpleMode(): void {
    this.handler?.enterSimpleMode();
  }

  public exitSimpleMode(): void {
    this.handler?.exitSimpleMode();
  }

  public getSize(): unknown {
    return this.handler?.getSize();
  }

  public updateView(viewData: unknown): void {
    this.handler?.updateView(viewData);
  }

  public changeZIndex(element: HTMLElement, zIndex: number): void {
    this.handler?.changeZIndex(element, zIndex);
  }

  public uiHide(element: HTMLElement): void {
    this.handler?.uiHide(element);
  }

  public uiShow(element: HTMLElement): void {
    this.handler?.uiShow(element);
  }

  public foldResizeWidget(): unknown {
    return this.handler!.foldResizeWidget();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ResizeWidget, ResizeWidgetPlugin);