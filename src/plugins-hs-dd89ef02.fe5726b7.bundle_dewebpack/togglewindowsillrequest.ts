interface Entity {
  getWindowSill(): unknown;
  addSill(): void;
  removeSill(): void;
  addChild(child: unknown): void;
}

class ToggleWindowSillRequest extends HSCore.Transaction.Request {
  private entity: Entity;
  private _show: boolean;
  private _beforeSill: unknown;
  private _afterSill?: unknown;

  constructor(entity: Entity, show: boolean) {
    super();
    this.entity = entity;
    this._show = show;
    this._beforeSill = this.entity.getWindowSill();
  }

  onCommit(): void {
    if (this._show) {
      this.entity.addSill();
    } else {
      this.entity.removeSill();
    }
    this._afterSill = this.entity.getWindowSill();
  }

  onUndo(): void {
    this.updateSill(this._beforeSill);
  }

  onRedo(): void {
    this.updateSill(this._afterSill);
  }

  private updateSill(sill: unknown): void {
    if (sill) {
      this.entity.addChild(sill);
    } else {
      this.entity.removeSill();
    }
  }
}

export { ToggleWindowSillRequest };