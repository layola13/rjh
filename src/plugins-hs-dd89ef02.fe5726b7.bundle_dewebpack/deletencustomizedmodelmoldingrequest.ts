import { HSCore } from './HSCore';

type Molding = any; // Replace with actual Molding type from your codebase

/**
 * Request to delete N customized model moldings
 */
export class DeleteNCustomizedModelMoldingRequest extends HSCore.Transaction.Common.StateRequest {
    private readonly _molding: Molding[];

    constructor(moldings: Molding[]) {
        super();
        this._molding = moldings;
    }

    onCommit(): void {
        for (const molding of this._molding) {
            if (molding.moldingId.includes("parametricCeilingAddMolding")) {
                molding.getUniqueParent().removeParametricSelfMolding(molding.moldingId);
            } else {
                HSCore.Util.Content.removeNCustomizedModelMolding(molding);
            }
        }
    }

    onRedo(): void {
        for (const molding of this._molding) {
            molding.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
        }
    }

    canTransactField(): boolean {
        return true;
    }
}