import { HSCore } from './HSCore';

export class ConnectMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private moldings: HSCore.Model.Molding[];
  private newMolding?: HSCore.Model.Molding;

  constructor(moldings: HSCore.Model.Molding[]) {
    super();
    this.moldings = moldings;
  }

  connectMolding(): void {
    this.newMolding = this.mergeMoldings(this.moldings);
    
    if (this.newMolding) {
      const parent = this.moldings[0].parent;
      
      this.moldings.forEach((molding) => {
        parent.removeMolding(molding);
      });
      
      this.newMolding.host = parent;
      parent.addMolding(this.newMolding);
    }
  }

  mergeMoldings(moldings: HSCore.Model.Molding[]): HSCore.Model.Molding | undefined {
    let mergedMolding: HSCore.Model.Molding | undefined;

    switch (moldings[0].type) {
      case HSCore.Model.MoldingTypeEnum.Baseboard:
        mergedMolding = HSCore.Util.Molding.mergeBaseboard(moldings[0], moldings[1]);
        break;
      case HSCore.Model.MoldingTypeEnum.Cornice:
        mergedMolding = HSCore.Util.Molding.mergeCornice(moldings[0], moldings[1]);
        break;
    }

    return mergedMolding;
  }

  onCommit(): void {
    this.connectMolding();
    super.onCommit();
  }

  getNewMolding(): HSCore.Model.Molding | undefined {
    return this.newMolding;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "连接分线";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}