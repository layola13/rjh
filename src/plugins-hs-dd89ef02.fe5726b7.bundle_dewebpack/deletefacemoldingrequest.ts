import { HSCore } from './HSCore';

interface Molding {
  offset: number;
}

interface Face {
  removeMolding(molding: Molding): void;
}

class DeleteFaceMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  public molding: Molding;
  public face: Face;

  constructor(face: Face, molding: Molding) {
    super();
    this.face = face;
    this.molding = molding;
  }

  public onCommit(): void {
    if (
      this.molding instanceof HSCore.Model.Baseboard &&
      Math.abs(this.molding.offset) > 1e-6
    ) {
      HSCore.Util.Face.removeHoleForMolding(this.molding);
    }
    
    this.face.removeMolding(this.molding);
    super.onCommit([]);
  }

  public canTransactField(): boolean {
    return true;
  }

  public getDescription(): string {
    return "删除线条";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}

export { DeleteFaceMoldingRequest };