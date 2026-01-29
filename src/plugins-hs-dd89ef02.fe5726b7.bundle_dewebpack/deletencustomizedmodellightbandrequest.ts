import { HSCore } from './HSCore';

export class DeleteNCustomizedModelLightBandRequest extends HSCore.Transaction.Common.StateRequest {
    private readonly _lightBand: HSCore.Model.LightBand;

    constructor(lightBand: HSCore.Model.LightBand) {
        super();
        this._lightBand = lightBand;
    }

    onCommit(): void {
        if (this._lightBand.lightBandId.includes("parametricCeilingAddBand")) {
            this._lightBand.getUniqueParent().removeParametricSelfLightSlot(this._lightBand.lightBandId);
        } else {
            HSCore.Util.Content.removeNCustomizedModelLightBand(this._lightBand);
        }
    }

    onUndo(): void {
        super.onUndo([]);
    }

    onRedo(): void {
        super.onRedo([]);
        this._lightBand?.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    }

    canTransactField(): boolean {
        return true;
    }
}