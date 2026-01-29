abstract class MoldingTransactionRequest extends HSCore.Transaction.Request {
    protected _content: any;
    protected _moldingId: string;
    protected _beforeData: Record<string, any>;
    protected _afterData: Record<string, any>;
    protected _currentMaterialMap: Map<any, any>;
    protected _transEntities: any[];
    protected cachedMaterialMap?: Map<any, any>;

    constructor(content: any, moldingId: string) {
        super();
        this._content = content;
        this._moldingId = moldingId;
        this._beforeData = {};
        this._afterData = {};
        this._currentMaterialMap = new Map();

        const lights = this._lightsfilter();
        const host = this._content.getHost();
        this._transEntities = [content, ...lights, ...host];

        HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._beforeData);
    }

    private _lightsfilter(): any[] {
        const displayList = HSApp.App.getApp().getView("aux2d").displayList;
        const result: any[] = [];

        if (!displayList) {
            return result;
        }

        for (const key in displayList) {
            const displayItem = displayList[key];
            const entity = displayItem?.entity;

            if (entity) {
                const metadata = entity.metadata;

                if (metadata) {
                    const contentType = metadata.contentType;

                    if (
                        contentType &&
                        (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) ||
                            contentType.isTypeOf(HSCatalog.ContentTypeEnum.CeilingLight) ||
                            contentType.isTypeOf(HSCatalog.ContentTypeEnum.PendantLight))
                    ) {
                        result.push(entity);
                    }
                }
            }
        }

        return result;
    }

    onCommit(): void {
        this._apply();
        HSCore.Util.Transaction.saveEntityToData(this._transEntities, this._afterData);
    }

    onUndo(): void {
        this.cachedMaterialMap = this._content.getMaterialData();
        HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._beforeData);

        if (this._content && this._moldingId) {
            const moldingEntity = this._content.getMoldingEntityById(this._moldingId);
            moldingEntity?.dirtyGeometry();
        }
    }

    onRedo(): void {
        HSCore.Util.Transaction.restoreEntityFromData(this._transEntities, this._afterData);

        if (this.cachedMaterialMap && this.cachedMaterialMap.size > 0) {
            this._content.setMaterialData(this.cachedMaterialMap, {});
            this.cachedMaterialMap.clear();
        }

        if (this._content && this._moldingId) {
            const moldingEntity = this._content.getMoldingEntityById(this._moldingId);
            moldingEntity?.dirtyGeometry();
        }
    }

    protected abstract _apply(): void;
}

export default MoldingTransactionRequest;