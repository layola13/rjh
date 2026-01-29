import { EntityEventType } from './entity-event-type';
import { RelationshipType, SupportedSignalTypes } from './relationship-types';

type HandlerFunction = (entity: HSCore.Model.WallMolding) => unknown;

export class SweepPathRelationHandlers {
    private static _handlers: Map<string, HandlerFunction> = new Map();

    static registerHandler(entityClass: string, handler: HandlerFunction): void {
        this._handlers.set(entityClass, handler);
    }

    static getHandler(entityClass: string): HandlerFunction | undefined {
        return this._handlers.get(entityClass);
    }
}

interface SignalEvent {
    target?: HSCore.Model.Face | HSCore.Model.WallMolding;
    data?: {
        type?: string;
        entity?: HSCore.Model.Entity;
    };
}

interface RelationshipConfig {
    targetTypes: Array<typeof HSCore.Model.Face | typeof HSCore.Model.WallMolding>;
    actionTypes: SupportedSignalTypes[];
    callback: (event: SignalEvent) => void;
}

interface RelationshipManager {
    registerConfigs(type: RelationshipType, configs: RelationshipConfig[]): void;
}

export class SweepPathRelation {
    private readonly _type: RelationshipType;
    private readonly _data: Map<string, unknown>;
    private readonly _manager: RelationshipManager;

    constructor(manager: RelationshipManager) {
        this._type = RelationshipType.SweepPath;
        this._data = new Map();
        this._manager = manager;
        this._init();
    }

    private _init(): void {
        this._manager.registerConfigs(this._type, [
            {
                targetTypes: [HSCore.Model.Face],
                actionTypes: [SupportedSignalTypes.Dirty],
                callback: (event: SignalEvent) => {
                    const target = event?.target;
                    if (target instanceof HSCore.Model.Face && event.data?.type === EntityEventType.Geometry) {
                        Object.values(target.moldings).forEach((moldings) => {
                            moldings?.forEach((molding) => {
                                this.clear(molding);
                            });
                        });
                    }
                }
            },
            {
                targetTypes: [HSCore.Model.Face],
                actionTypes: [SupportedSignalTypes.ChildRemoved],
                callback: (event: SignalEvent) => {
                    const entity = event?.data?.entity;
                    if (entity instanceof HSCore.Model.Baseboard || entity instanceof HSCore.Model.Cornice) {
                        this.clear(entity);
                    }
                }
            },
            {
                targetTypes: [HSCore.Model.WallMolding],
                actionTypes: [SupportedSignalTypes.Dirty],
                callback: (event: SignalEvent) => {
                    this.clear(event?.target);
                }
            }
        ]);
    }

    getData(entity: HSCore.Model.WallMolding): unknown | undefined {
        const cachedData = this._data.get(entity.id);
        if (cachedData) {
            return cachedData;
        }

        const handler = SweepPathRelationHandlers.getHandler(entity.Class);
        if (handler) {
            const data = handler(entity);
            this._data.set(entity.id, data);
            return data;
        }

        return undefined;
    }

    clear(entity?: { id: string }): void {
        this._data.delete(entity?.id);
    }

    clearAll(): void {
        this._data.clear();
    }
}