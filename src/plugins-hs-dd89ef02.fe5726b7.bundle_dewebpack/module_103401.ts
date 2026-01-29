interface Floorplan {
  scene: Scene;
  signalUnderlayChanged: Signal;
}

interface Scene {
  activeLayer: Layer;
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Layer {
  underlay?: Underlay;
}

interface Underlay {
  reset(): void;
}

interface Signal {
  dispatch(underlay: Underlay | undefined): void;
}

interface HSApp {
  App: {
    getApp(): { floorplan: Floorplan };
  };
}

interface HSCore {
  Transaction: {
    Common: {
      StateRequest: new () => StateRequest;
    };
  };
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;

abstract class StateRequest {
  protected onCommit?(args: unknown[]): void;
  protected onUndo?(args: unknown[]): void;
  protected onRedo?(args: unknown[]): void;
}

export default class FloorplanStateRequest extends StateRequest {
  protected fp: Floorplan;

  constructor() {
    super();
    this.fp = HSApp.App.getApp().floorplan;
  }

  protected onCommit(): void {
    this.fp.scene.forEachLayer((layer: Layer) => {
      if (layer.underlay) {
        layer.underlay.reset();
        layer.underlay = undefined;
      }
    });
    super.onCommit?.([]);
  }

  protected onUndo(): void {
    super.onUndo?.([]);
    this.fp.signalUnderlayChanged.dispatch(this.fp.scene.activeLayer.underlay);
  }

  protected onRedo(): void {
    super.onRedo?.([]);
    this.fp.signalUnderlayChanged.dispatch(this.fp.scene.activeLayer.underlay);
  }

  canTransactField(): boolean {
    return true;
  }
}