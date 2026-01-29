abstract class StateRequest {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract canTransactField(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

interface Layer {
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
  forEachSlab(callback: (slab: Slab) => void): void;
}

interface Slab {
  dirty(): void;
}

interface Wall {
  dirty(): void;
}

declare namespace HSCore {
  namespace Model {
    enum EntityFlagEnum {
      hidden
    }
  }
  namespace Util {
    namespace Layer {
      function getUnderLayer(layer: Layer): Layer | null;
    }
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    WallOperation
  }
}

export class ToggleLayerVisibilityRequest extends StateRequest {
  private readonly _layer: Layer;
  public readonly visible: boolean;

  constructor(layer: Layer, visible: boolean) {
    super();
    this._layer = layer;
    this.visible = visible;
  }

  public onCommit(): void {
    if (this.visible) {
      this._layer.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, false);
    } else {
      this._layer.setFlagOn(HSCore.Model.EntityFlagEnum.hidden, false);
    }
    super.onCommit();
    this._dirtyEntities();
  }

  public onUndo(): void {
    super.onUndo();
    this._dirtyEntities();
  }

  public onRedo(): void {
    super.onRedo();
    this._dirtyEntities();
  }

  private _dirtyEntities(): void {
    this._layer.forEachSlab((slab: Slab) => {
      slab.dirty();
    });

    const underLayer = HSCore.Util.Layer.getUnderLayer(this._layer);
    if (underLayer) {
      underLayer.forEachWall((wall: Wall) => {
        wall.dirty();
      });
    }
  }

  public canTransactField(): boolean {
    return true;
  }

  public getDescription(): string {
    return "多层切换到楼层-显示楼层操作";
  }

  public getCategory(): number {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}