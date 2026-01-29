import { HSCore } from './HSCore';

interface MaterialData {
  // Define material data structure based on your application needs
  [key: string]: unknown;
}

interface Molding {
  materialData?: MaterialData;
  dirtyGeometry(): void;
}

/**
 * Request to apply customized model molding material to N moldings
 */
export class ApplyNCustomizedModelMoldingMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  private moldings: Iterable<Molding>;
  private materialData: MaterialData;

  constructor(moldings: Iterable<Molding>, materialData: MaterialData) {
    super();
    this.moldings = moldings;
    this.materialData = materialData;
  }

  onCommit(): void {
    super.onCommit?.();
    
    for (const molding of this.moldings) {
      molding.materialData = this.materialData;
      molding.dirtyGeometry();
    }
  }

  onUndo(): void {
    super.onUndo?.();
    
    for (const molding of this.moldings) {
      molding.dirtyGeometry();
    }
  }

  onRedo(): void {
    super.onRedo?.();
    
    for (const molding of this.moldings) {
      molding.dirtyGeometry();
    }
  }

  canTransactField(): boolean {
    return true;
  }
}