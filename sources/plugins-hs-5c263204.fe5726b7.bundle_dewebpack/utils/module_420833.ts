// @ts-nocheck
interface Group {
  flipAll(): void;
}

interface Transaction {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
  getDescription(): string;
  getCategory(): string;
}

abstract class TransactionRequest implements Transaction {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class GroupFlipTransactionRequest extends TransactionRequest {
  private readonly _group: Group;

  constructor(group: Group) {
    super();
    this._group = group;
  }

  onCommit(): void {
    this._group.flipAll();
  }

  onUndo(): void {
    this._group.flipAll();
  }

  onRedo(): void {
    this._group.flipAll();
  }

  getDescription(): string {
    return "组合模型翻转";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default GroupFlipTransactionRequest;