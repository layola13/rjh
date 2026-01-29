interface Slab {
  thickness: number;
}

abstract class Request {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
}

export class ChangeSlabThicknessRequest extends Request {
  private readonly _slab: Slab;
  private _oldThickness: number | undefined;
  private readonly _thickness: number;

  constructor(slab: Slab, thickness: number) {
    super();
    this._slab = slab;
    this._oldThickness = undefined;
    this._thickness = thickness;
  }

  onCommit(): void {
    this._oldThickness = this._slab.thickness;
    this._slab.thickness = this._thickness;
  }

  onUndo(): void {
    if (this._oldThickness !== undefined) {
      this._slab.thickness = this._oldThickness;
    }
  }

  onRedo(): void {
    this.onCommit();
  }
}