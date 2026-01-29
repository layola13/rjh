interface IMixPaintUpdater {
  updateFromDump(dumpData: unknown, target: unknown, options: unknown): void;
  updateFromPaintData(paintData: unknown, target: unknown, options: unknown): void;
  postUpdateFloorplan(floorplan: unknown, context: unknown): void;
}

type MixPaintUpdaterConstructor = new () => IMixPaintUpdater;

export class MixPaintUpdaterProxy {
  private static _ins: MixPaintUpdaterProxy | undefined;
  private _updaterConstructor: MixPaintUpdaterConstructor | undefined;
  private _updater: IMixPaintUpdater | undefined;

  private constructor() {}

  static getInstance(): MixPaintUpdaterProxy {
    if (!MixPaintUpdaterProxy._ins) {
      MixPaintUpdaterProxy._ins = new MixPaintUpdaterProxy();
    }
    return MixPaintUpdaterProxy._ins;
  }

  static registerUpdater(updaterConstructor: MixPaintUpdaterConstructor): void {
    const instance = MixPaintUpdaterProxy.getInstance();
    instance._updaterConstructor = updaterConstructor;
    instance._updater = undefined;
  }

  getUpdater(): IMixPaintUpdater | undefined {
    if (this._updater) {
      return this._updater;
    }

    const constructor = this._updaterConstructor;
    if (constructor) {
      this._updater = new constructor();
    }

    return this._updater;
  }

  updateFromDump(dumpData: unknown, target: unknown, options: unknown): void {
    const updater = this.getUpdater();
    if (updater) {
      updater.updateFromDump(dumpData, target, options);
    }
  }

  updateFromPaintData(paintData: unknown, target: unknown, options: unknown): void {
    const updater = this.getUpdater();
    if (updater) {
      updater.updateFromPaintData(paintData, target, options);
    }
  }

  postUpdateFloorplan(floorplan: unknown, context: unknown): void {
    const updater = this.getUpdater();
    if (updater) {
      updater.postUpdateFloorplan(floorplan, context);
    }
  }
}