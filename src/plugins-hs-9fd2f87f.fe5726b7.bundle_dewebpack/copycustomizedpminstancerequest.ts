export class CopyCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
    private _entities: any[];
    private _moveVec: any;
    private _rootModel: any;
    private _webcadDocBefore: string;
    private _webcadDocAfter: string;
    private _newEntities: any[];

    constructor(entities: any[], moveVec: any) {
        super();
        this._entities = entities;
        this._moveVec = moveVec;
        this._rootModel = entities.length ? entities[0].getUniqueParent() : undefined;
        this._webcadDocBefore = this._rootModel.webCADDocument;
        this._webcadDocAfter = "";
    }

    onCommit(): void {
        HSApp.Util.CustomizedPMModel.copyCustomizedPMInstance(this._entities, this._moveVec).then((newEntities: any[]) => {
            this._newEntities = newEntities;
            this._webcadDocAfter = this._rootModel.webCADDocument;
        });
    }

    async onUndo(): Promise<void> {
        this._rootModel.webCADDocument = this._webcadDocBefore;
        await this._rootModel.openDiyDocument(false);
        this._newEntities.forEach((entity) => {
            return HSApp.Util.CustomizedPMModel.removeCustomizedPMInstance(entity);
        });
    }

    async onRedo(): Promise<void> {
        this._rootModel.webCADDocument = this._webcadDocAfter;
        await this._rootModel.openDiyDocument(false);
        this._newEntities.forEach((entity) => {
            return HSApp.Util.CustomizedPMModel.addCustomizedPMInstance({
                insModel: entity,
                rootModel: this._rootModel
            });
        });
    }
}