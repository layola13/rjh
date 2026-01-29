import { HSCore } from './635589';

export class FlipNCustomizedLightSlotRequest extends HSCore.Transaction.Common.StateRequest {
    private _lightSlot: any;
    private _removedLightSlots: any[];

    constructor(lightSlot: any) {
        super();
        this._lightSlot = lightSlot;
        this._removedLightSlots = [];
    }

    onCommit(): void {
        super.onCommit([]);

        const parameters = this._lightSlot.parameters;
        const path = this._lightSlot.path;
        const uniqueParent = this._lightSlot.getUniqueParent();

        if (!parameters || !path || !uniqueParent) {
            return;
        }

        const lightSlot = this._lightSlot;

        if (HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(path, uniqueParent) === 1) {
            return;
        }

        const selectionManager = HSApp.App.getApp().selectionManager;
        selectionManager.unselect(this._lightSlot);

        const pathCoedge3dsTags = path.map((coedge: any) => {
            return this._getRelatedCoedge(coedge)?.tag;
        });
        pathCoedge3dsTags.reverse();

        const clonedParameters = _.cloneDeep(parameters);
        Object.assign(clonedParameters, {
            pathCoedge3dsTags: pathCoedge3dsTags,
            faceTag: undefined
        });

        const overlappedSlots: any[] = [];
        pathCoedge3dsTags.forEach((tag: string) => {
            const relatedLightSlots = uniqueParent.findRelatedLightSlots(tag || "");
            overlappedSlots.push(...relatedLightSlots.overlaped);
        });

        overlappedSlots.forEach((slot: any) => {
            HSCore.Util.Content.removeNCustomizedModelLightSlot(slot);
            this._removedLightSlots.push(slot);
        });

        lightSlot.parameters = clonedParameters;
        lightSlot.dirtyGeometry();
        lightSlot.updateMaterialByFlip();
        selectionManager.select(lightSlot);
        lightSlot.getUniqueParent().dirtyGeometry();
    }

    private _getRelatedCoedge(coedge: any): any | undefined {
        if (!coedge) {
            return undefined;
        }

        const edge = coedge.getEdge();
        if (!edge) {
            return undefined;
        }

        return edge.getCoedge3ds().find((coedge3d: any) => {
            return coedge.tag !== coedge3d.tag;
        });
    }

    onRedo(): void {
        super.onRedo([]);
        this._removedLightSlots.forEach((slot: any) => {
            slot.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
        });
    }

    canTransactField(): boolean {
        return true;
    }
}