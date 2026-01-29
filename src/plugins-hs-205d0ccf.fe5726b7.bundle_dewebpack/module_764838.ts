interface FloorPlan {
  isWallFreezed: boolean;
}

interface SavedData {
  isWallFreezed: boolean;
}

interface RestoredData {
  isWallFreezed: boolean;
}

/**
 * Wall freeze/unfreeze transaction request
 * Manages the state of wall locking in the floor plan editor
 */
export default class WallFreezeTransaction extends HSCore.Transaction.Request {
  private savedData: SavedData;
  private restoredData: RestoredData;
  private fp: FloorPlan;
  private isFreeze: boolean;

  constructor(floorPlan: FloorPlan, isFreeze: boolean) {
    super();
    
    this.savedData = {
      isWallFreezed: floorPlan.isWallFreezed
    };
    
    this.restoredData = {
      isWallFreezed: floorPlan.isWallFreezed
    };
    
    this.fp = floorPlan;
    this.isFreeze = isFreeze;
  }

  private _saveToData(data: SavedData): void {
    data.isWallFreezed = this.fp.isWallFreezed;
  }

  private _restoreFromData(data: RestoredData): void {
    this._setFreezeVal(data.isWallFreezed);
    this._saveToData(data);
  }

  public onCommit(): void {
    this._setFreezeVal(this.isFreeze);
    this._saveToData(this.savedData);
  }

  private _setFreezeVal(isFreezed: boolean): void {
    this.fp.isWallFreezed = isFreezed;
  }

  public onUndo(): void {
    this._restoreFromData(this.restoredData);
  }

  public onRedo(): void {
    this.onCommit();
  }

  public getDescription(): string {
    return `${this.isFreeze ? "锁定墙体" : "解锁墙体"}`;
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}