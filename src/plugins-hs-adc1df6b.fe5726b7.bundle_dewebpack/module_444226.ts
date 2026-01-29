interface TargetInfo {
  entity?: any;
  [key: string]: any;
}

interface MoldingData {
  [key: string]: any;
}

interface UndoRedoData {
  [key: string]: any;
}

interface MoldingStrategy {
  getUndoData(targetInfo: TargetInfo): UndoRedoData;
  apply(targetInfo: TargetInfo, moldingData: MoldingData): any;
  getRedoData(targetInfo: TargetInfo): UndoRedoData;
  undo(targetInfo: TargetInfo, undoData: UndoRedoData): void;
  redo(targetInfo: TargetInfo, redoData: UndoRedoData): void;
}

class NCustomizedModelMoldingStrategy implements MoldingStrategy {
  getUndoData(targetInfo: TargetInfo): UndoRedoData {
    throw new Error("Method not implemented.");
  }
  apply(targetInfo: TargetInfo, moldingData: MoldingData): any {
    throw new Error("Method not implemented.");
  }
  getRedoData(targetInfo: TargetInfo): UndoRedoData {
    throw new Error("Method not implemented.");
  }
  undo(targetInfo: TargetInfo, undoData: UndoRedoData): void {
    throw new Error("Method not implemented.");
  }
  redo(targetInfo: TargetInfo, redoData: UndoRedoData): void {
    throw new Error("Method not implemented.");
  }
}

class CustomizedModelMoldingStrategy implements MoldingStrategy {
  getUndoData(targetInfo: TargetInfo): UndoRedoData {
    throw new Error("Method not implemented.");
  }
  apply(targetInfo: TargetInfo, moldingData: MoldingData): any {
    throw new Error("Method not implemented.");
  }
  getRedoData(targetInfo: TargetInfo): UndoRedoData {
    throw new Error("Method not implemented.");
  }
  undo(targetInfo: TargetInfo, undoData: UndoRedoData): void {
    throw new Error("Method not implemented.");
  }
  redo(targetInfo: TargetInfo, redoData: UndoRedoData): void {
    throw new Error("Method not implemented.");
  }
}

class CornicesStrategy implements MoldingStrategy {
  getUndoData(targetInfo: TargetInfo): UndoRedoData {
    throw new Error("Method not implemented.");
  }
  apply(targetInfo: TargetInfo, moldingData: MoldingData): any {
    throw new Error("Method not implemented.");
  }
  getRedoData(targetInfo: TargetInfo): UndoRedoData {
    throw new Error("Method not implemented.");
  }
  undo(targetInfo: TargetInfo, undoData: UndoRedoData): void {
    throw new Error("Method not implemented.");
  }
  redo(targetInfo: TargetInfo, redoData: UndoRedoData): void {
    throw new Error("Method not implemented.");
  }
}

type StrategyName = "NCustomizedModelMoldingStrategy" | "CustomizedModelMoldingStrategy" | "CornicesStrategy";

export default class MoldingBrushRequest extends HSCore.Transaction.Request {
  private _targetInfo: TargetInfo;
  private _moldingData: MoldingData;
  private _strategyName: StrategyName;
  private _undoData?: UndoRedoData;
  private _redoData?: UndoRedoData;

  constructor(strategyName: StrategyName, targetInfo: TargetInfo, moldingData: MoldingData) {
    super();
    this._targetInfo = targetInfo;
    this._moldingData = moldingData;
    this._strategyName = strategyName;
  }

  onCommit(): void {
    const strategy = this._getStrategy();
    if (strategy) {
      this._undoData = strategy.getUndoData(this._targetInfo);
      const result = strategy.apply(this._targetInfo, this._moldingData);
      if (result) {
        this._targetInfo.entity = result;
      }
      this._redoData = strategy.getRedoData(this._targetInfo);
    }
  }

  private _getStrategy(): MoldingStrategy | undefined {
    let strategy: MoldingStrategy | undefined;
    
    switch (this._strategyName) {
      case "NCustomizedModelMoldingStrategy":
        strategy = new NCustomizedModelMoldingStrategy();
        break;
      case "CustomizedModelMoldingStrategy":
        strategy = new CustomizedModelMoldingStrategy();
        break;
      case "CornicesStrategy":
        strategy = new CornicesStrategy();
        break;
      default:
        console.warn("can not find molding brush strategy");
    }
    
    return strategy;
  }

  onUndo(): void {
    const strategy = this._getStrategy();
    if (strategy && this._undoData) {
      strategy.undo(this._targetInfo, this._undoData);
    }
  }

  onRedo(): void {
    const strategy = this._getStrategy();
    if (strategy && this._redoData) {
      strategy.redo(this._targetInfo, this._redoData);
    }
  }
}