import { HSApp } from './path/to/HSApp';
import { App } from './path/to/App';
import { HSFPConstants } from './path/to/HSFPConstants';

class T3dCapturePlugin extends HSApp.Plugin.IPlugin {
  private _capture: HSApp.View.T3d.Render.T3dCapture | null;

  constructor() {
    super({
      name: "T3dCapture Plugin",
      description: "WebT3D Offscreen Capture",
      dependencies: []
    });
    
    this._capture = new HSApp.View.T3d.Render.T3dCapture(App.Instance);
  }

  onActive(event: unknown, context: unknown): void {
    super.onActive(event, context);
  }

  update(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown,
    param6: unknown,
    param7: unknown,
    param8: unknown
  ): void {
    if (!this._capture) {
      this._capture = new HSApp.View.T3d.Render.T3dCapture(App.Instance);
    }
    
    this._capture.update(param1, param2, param3, param4, param5, param6, param7, param8);
  }

  finish(): void {
    if (this._capture) {
      this._capture.finish();
      this._capture = null;
    }
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.T3dCapture, T3dCapturePlugin);