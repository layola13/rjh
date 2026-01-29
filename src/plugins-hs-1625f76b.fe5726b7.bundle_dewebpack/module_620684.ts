import { HSApp } from './518193';
import { Handler } from './997961';

class CompassPlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;

  constructor() {
    super({
      name: "Compass Plugin",
      description: "provide compass for floorplan",
      dependencies: []
    });
    
    this.handler = new Handler();
  }

  onActive(context: unknown, options: unknown): void {
    super.onActive?.(context, options);
    
    this.handler.init({
      app: (context as any).app
    });
  }

  onDeactive(): void {
    // No implementation
  }

  show(): void {
    this.handler.show();
  }

  hide(): void {
    this.handler.hide();
  }

  setAutoShowHide(enabled: boolean): void {
    this.handler.setAutoShowHide(enabled);
  }

  getDegree(): number {
    return this.handler.getDegree();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Compass, CompassPlugin);