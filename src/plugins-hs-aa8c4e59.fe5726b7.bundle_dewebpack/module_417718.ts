interface Renderer {
  setPixelRatio(ratio: number): void;
  getPixelRatio(): number;
}

interface RenderingContext {
  needsRendering: boolean;
}

interface RenderingManager {
  renderer: Renderer;
  context: RenderingContext;
}

interface View3D {
  renderingMgr?: RenderingManager;
}

interface SignalNewAnimationFrame {
  listen(callback: () => void, context: unknown): void;
  unlisten(callback: () => void, context: unknown): void;
}

interface HSApplication {
  signalNewAnimationFrame: SignalNewAnimationFrame;
  getActive3DView(): View3D | null | undefined;
}

declare namespace HSApp {
  class App {
    static getApp(): HSApplication;
  }
}

const LOW_RESOLUTION_STOP_DELAY_MS = 200;
const LOW_RESOLUTION_RATIO_MULTIPLIER = 0.5;

export default class LowResolutionController {
  private static _instance?: LowResolutionController;

  private _ratio?: number;
  private _stopTime?: number;

  constructor() {
    this._ratio = undefined;
    this._stopTime = undefined;
  }

  static Instance(): LowResolutionController {
    if (!this._instance) {
      this._instance = new LowResolutionController();
    }
    return this._instance;
  }

  startLowResolution(): void {
    if (this._ratio) {
      this._stopTime = undefined;
    } else {
      HSApp.App.getApp().signalNewAnimationFrame.listen(this._onAnimationFrame, this);

      const view3D = HSApp.App.getApp().getActive3DView();
      const renderer = view3D?.renderingMgr?.renderer;

      if (renderer) {
        this._ratio = renderer.getPixelRatio();
        const lowResolutionRatio = LOW_RESOLUTION_RATIO_MULTIPLIER * this._ratio;
        renderer.setPixelRatio(lowResolutionRatio);
      }
    }
  }

  endLowResolution(): void {
    this._stopTime = Date.now();
  }

  private _onAnimationFrame = (): void => {
    if (this._stopTime !== undefined && Date.now() - this._stopTime >= LOW_RESOLUTION_STOP_DELAY_MS) {
      this._resetRatio();
      this._stopTime = undefined;
    }
  };

  private _resetRatio = (): void => {
    HSApp.App.getApp().signalNewAnimationFrame.unlisten(this._onAnimationFrame, this);

    if (this._ratio) {
      const view3D = HSApp.App.getApp().getActive3DView();
      const renderingManager = view3D?.renderingMgr;

      if (renderingManager) {
        renderingManager.renderer.setPixelRatio(this._ratio);
        renderingManager.context.needsRendering = true;
      }

      this._ratio = undefined;
    }
  };
}