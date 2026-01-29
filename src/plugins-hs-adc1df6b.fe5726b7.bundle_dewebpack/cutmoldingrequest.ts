import { HSCore } from './HSCore';

interface Molding {
  parent: MoldingParent;
  split(position: number): Molding[];
}

interface MoldingParent {
  removeMolding(molding: Molding): void;
  addMolding(molding: Molding): void;
}

interface NewMolding extends Molding {
  host: MoldingParent;
}

export class CutMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private molding: Molding;
  private position: number;
  private newMoldings: NewMolding[];

  constructor(molding: Molding, position: number) {
    super();
    this.molding = molding;
    this.position = position;
    this.newMoldings = [];
  }

  private cutMolding(): void {
    this.newMoldings = this.molding.split(this.position) as NewMolding[];
    const parent = this.molding.parent;
    parent.removeMolding(this.molding);
    this.newMoldings.forEach((newMolding) => {
      newMolding.host = parent;
      parent.addMolding(newMolding);
    });
  }

  onCommit(): void {
    this.cutMolding();
    super.onCommit([]);
  }

  getNewMoldings(): NewMolding[] {
    return this.newMoldings;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "拆分线";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}