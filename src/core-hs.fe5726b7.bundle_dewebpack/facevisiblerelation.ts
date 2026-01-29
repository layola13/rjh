enum RelationshipType {
  FaceVisible = 'FaceVisible'
}

enum SupportedSignalTypes {
  HostChanged = 'HostChanged',
  Dirty = 'Dirty',
  FieldChanged = 'FieldChanged',
  ChildRemoved = 'ChildRemoved'
}

enum EntityEventType {
  Geometry = 'Geometry'
}

interface SignalEvent {
  target?: any;
  data?: {
    type?: EntityEventType;
    fieldName?: string;
    entity?: any;
  };
}

interface RelationshipConfig {
  targetTypes: any[];
  actionTypes: SupportedSignalTypes[];
  callback: (event: SignalEvent) => void;
}

interface RelationshipManager {
  registerConfigs(type: RelationshipType, configs: RelationshipConfig[]): void;
}

export class FaceVisibleRelation {
  private readonly _type: RelationshipType;
  private readonly _data: Map<string, any>;
  private readonly _manager: RelationshipManager;

  constructor(manager: RelationshipManager) {
    this._type = RelationshipType.FaceVisible;
    this._data = new Map();
    this._manager = manager;
    this._init();
  }

  private _init(): void {
    this._manager.registerConfigs(this._type, [
      {
        targetTypes: [HSCore.Model.Content],
        actionTypes: [SupportedSignalTypes.HostChanged],
        callback: (event: SignalEvent) => {
          const target = event?.target;
          if (target instanceof HSCore.Model.Content && target.parent) {
            this.clear(target.parent.id);
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Opening, HSCore.Model.ParametricOpening],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event: SignalEvent) => {
          const target = event?.target;
          if ((target instanceof HSCore.Model.Opening || target instanceof HSCore.Model.ParametricOpening) && target.parent) {
            this.clear(target.parent.id);
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Wall],
        actionTypes: [SupportedSignalTypes.Dirty, SupportedSignalTypes.FieldChanged],
        callback: (event: SignalEvent) => {
          const target = event?.target;
          if (target instanceof HSCore.Model.Wall && target.parent) {
            const eventDataType = event.data?.type;
            const eventFieldName = event.data?.fieldName;
            if (eventDataType === EntityEventType.Geometry || eventFieldName === 'height3d') {
              this.clear(target.parent.id);
            }
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Layer],
        actionTypes: [SupportedSignalTypes.ChildRemoved],
        callback: (event: SignalEvent) => {
          const entity = event.data?.entity;
          if ((entity instanceof HSCore.Model.Opening || entity instanceof HSCore.Model.ParametricOpening || entity instanceof HSCore.Model.Wall) && entity.parent) {
            this.clear(entity.parent.id);
          }
        }
      },
      {
        targetTypes: [HSCore.Model.Slab],
        actionTypes: [SupportedSignalTypes.Dirty],
        callback: (event: SignalEvent) => {
          const parent = event?.target?.parent;
          if (parent) {
            this.clear(parent.id);
          }
        }
      }
    ]);
  }

  getData(id: string): any | undefined {
    return this._data.get(id);
  }

  setData(id: string, data: any): void {
    this._data.set(id, data);
  }

  clear(id: string): void {
    this._data.delete(id);
  }

  clearAll(): void {
    this._data.clear();
  }
}