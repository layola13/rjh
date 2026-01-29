enum FloorplanDisplayAreaEnum {
  Outside = 'outside',
  Inside = 'inside',
  Used = 'used'
}

interface FloorplanData {
  displayAreaType: FloorplanDisplayAreaEnum;
}

interface Floorplan {
  displayAreaType: FloorplanDisplayAreaEnum;
}

interface TransactionRequest {
  new (...args: any[]): TransactionRequest;
}

interface SavedData {
  displayAreaType: FloorplanDisplayAreaEnum;
}

interface RestoredData {
  displayAreaType: FloorplanDisplayAreaEnum;
}

/**
 * 切换户型图面积展示类型的事务请求
 * 支持在外框面积、套内面积和使用面积之间切换
 */
class FloorplanDisplayAreaTypeTransaction extends (HSCore.Transaction.Request as any) {
  private savedData: SavedData;
  private restoredData: RestoredData;
  private fp: Floorplan;
  private displayAreaType: FloorplanDisplayAreaEnum;

  constructor(floorplan: Floorplan, displayAreaType: FloorplanDisplayAreaEnum) {
    super();
    
    this.savedData = {
      displayAreaType: floorplan.displayAreaType
    };
    
    this.restoredData = {
      displayAreaType: floorplan.displayAreaType
    };
    
    this.fp = floorplan;
    this.displayAreaType = displayAreaType;
  }

  private _saveToData(data: SavedData): void {
    data.displayAreaType = this.fp.displayAreaType;
  }

  private _restoreFromData(data: RestoredData): void {
    this._setAreaType(data.displayAreaType);
    this._saveToData(data);
  }

  onCommit(): void {
    this._setAreaType(this.displayAreaType);
    this._saveToData(this.savedData);
  }

  private _setAreaType(areaType: FloorplanDisplayAreaEnum): void {
    this.fp.displayAreaType = areaType;
  }

  onUndo(): void {
    this._restoreFromData(this.restoredData);
  }

  onRedo(): void {
    this.onCommit();
  }

  getDescription(): string {
    let areaTypeName = '外框';
    
    if (this.displayAreaType === HSCore.Model.FloorplanDisplayAreaEnum.Inside) {
      areaTypeName = '套内';
    } else if (this.displayAreaType === HSCore.Model.FloorplanDisplayAreaEnum.Used) {
      areaTypeName = '使用';
    }
    
    return `切换面积展示类型为${areaTypeName}面积`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}

export default FloorplanDisplayAreaTypeTransaction;