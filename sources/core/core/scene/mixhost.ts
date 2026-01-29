import { Logger } from './Logger';

interface MixHostData {
  faceEntity: string | null;
  faceId: number | null;
}

interface LoadContext {
  migrateEntitiesMap?: Map<string, { id: string }>;
  entities: Record<string, HSCore.Model.Floor | HSCore.Model.Wall>;
}

export class MixHost {
  private _faceEntity?: HSCore.Model.Floor | HSCore.Model.Wall;
  private _faceId?: number;

  constructor() {}

  clone(): MixHost {
    const cloned = new MixHost();
    cloned.copyFrom(this);
    return cloned;
  }

  copyFrom(source: MixHost): void {
    this._faceEntity = source._faceEntity;
    this._faceId = source._faceId;
  }

  isValid(): boolean {
    return this._faceEntity != null;
  }

  get faceEntity(): HSCore.Model.Floor | HSCore.Model.Wall | undefined {
    return this._faceEntity;
  }

  set faceEntity(entity: HSCore.Model.Floor | HSCore.Model.Wall | undefined) {
    Logger.console.assert(Boolean(entity), "face should not be null");
    if (!this._faceEntity || entity?.id !== this._faceEntity.id) {
      this._faceEntity = entity;
    }
  }

  get faceId(): number | undefined {
    return this._faceId;
  }

  set faceId(id: number | undefined) {
    this._faceId = id;
  }

  get defaultMaterial(): string {
    return this._faceEntity instanceof HSCore.Model.Floor
      ? HSConstants.Constants.DEFAULT_FLOOR_MATERIAL
      : HSConstants.Constants.DEFAULT_WALL_WHITE_PAINT;
  }

  load(data: MixHostData, context: LoadContext): void {
    this._faceId = data.faceId ?? undefined;
    let entityId = data.faceEntity;

    if (context.migrateEntitiesMap && entityId) {
      const migratedEntity = context.migrateEntitiesMap.get(entityId);
      if (migratedEntity) {
        entityId = migratedEntity.id;
      }
    }

    if (entityId) {
      let entity = context.entities[entityId];
      if (!entity) {
        entity = HSCore.Doc.getDocManager().activeDocument.getEntityById(entityId);
      }
      if (entity) {
        this.faceEntity = entity;
      }
    }
  }

  dump(): MixHostData {
    return {
      faceEntity: this._faceEntity?.id ?? null,
      faceId: this._faceId ?? null
    };
  }
}