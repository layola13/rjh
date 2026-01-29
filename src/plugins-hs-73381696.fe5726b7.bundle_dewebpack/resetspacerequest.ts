import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

export class ResetSpaceRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _layer: unknown;
  private readonly _resetSlab: unknown;

  constructor(layer: unknown, resetSlab: unknown) {
    super();
    this._layer = layer;
    this._resetSlab = resetSlab;
  }

  onCommit(): void {
    new HSCore.Model.Geom.SplitHelper(this._layer).reset(this._resetSlab);
    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "重置空间数据";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SpaceOperation;
  }
}