export class ToggleCeilingVisibilityRequest extends HSCore.Transaction.Request {
    private readonly _ceiling: HSCore.Model.Face;
    private readonly _slab: HSCore.Model.Slab;
    public readonly visible: boolean;

    constructor(ceiling: HSCore.Model.Face, visible: boolean) {
        super();
        this._ceiling = ceiling;
        this._slab = ceiling.getMaster();
        this.visible = visible;
    }

    private _toggleSlab(isVisible: boolean): void {
        this._slab.forEachFace((face: HSCore.Model.Face) => {
            if (
                this._slab.getFaceType(face) === HSCore.Model.SlabFaceType.bottom &&
                face !== this._ceiling
            ) {
                return;
            }

            if (isVisible) {
                face.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, false);
            } else {
                face.setFlagOn(HSCore.Model.EntityFlagEnum.hidden, false);
            }
        });
    }

    public onCommit(): void {
        this._toggleSlab(this.visible);
    }

    public onUndo(): void {
        this._toggleSlab(!this.visible);
    }

    public onRedo(): void {
        this.onCommit();
    }
}