abstract class LightBandTransactionRequest extends HSCore.Transaction.Request {
    protected _content: any;
    protected _lightBandId: string;
    protected _beforeData: Record<string, any>;
    protected _afterData: Record<string, any>;
    protected _transEntities: any[];

    constructor(content: any, lightBandId: string) {
        super();
        
        this._content = content;
        this._lightBandId = lightBandId;
        this._beforeData = {};
        this._afterData = {};
        
        const host = this._content.getHost();
        this._transEntities = [content].concat(host);
        
        HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._beforeData);
    }

    public onCommit(): void {
        this._apply();
        HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._afterData);
    }

    public onUndo(): void {
        HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._beforeData);
        
        if (this._content && this._lightBandId) {
            const lightBandEntity = this._content.getLightBandEntityById(this._lightBandId);
            if (lightBandEntity) {
                lightBandEntity.dirtyGeometry();
            }
        }
    }

    public onRedo(): void {
        HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._afterData);
        
        if (this._content && this._lightBandId) {
            const lightBandEntity = this._content.getLightBandEntityById(this._lightBandId);
            if (lightBandEntity) {
                lightBandEntity.dirtyGeometry();
            }
        }
    }

    protected abstract _apply(): void;
}

export default LightBandTransactionRequest;