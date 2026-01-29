import { HSCore } from './HSCore';

interface CopyableStructure {
  copy(): any;
}

export class CopyPasteStructureRequest extends HSCore.Transaction.Common.StateRequest {
  private from: CopyableStructure;

  constructor(from: CopyableStructure) {
    super();
    this.from = from;
  }

  onCommit(): any {
    const result = this.from.copy();
    super.onCommit([]);
    return result;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "粘贴物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}