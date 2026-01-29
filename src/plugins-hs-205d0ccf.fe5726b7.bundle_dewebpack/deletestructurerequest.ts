import { HSCore } from './path-to-hscore';

export class DeleteStructureRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _structure: unknown;

  constructor(structure: unknown) {
    super();
    this._structure = structure;
  }

  onCommit(): void {
    const entityLayer = HSCore.Util.Layer.getEntityLayer(this._structure);
    
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(entityLayer);
    
    this._structure.delete();
    
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}