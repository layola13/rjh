interface WindowEntity {
  ID: string;
  getWindowSill(): WindowSill | null;
  addSill(): void;
  removeSill(): void;
  buildPartsInfo(): void;
}

interface WindowSill {
  parameters: Record<string, unknown>;
  initByParameters(parameters: Record<string, unknown>): void;
}

interface TransactionRequest {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
}

/**
 * Request to apply geometry material to window sills
 */
export class ApplyGeometryMaterialToSillRequest implements TransactionRequest {
  private readonly templateEntity: WindowEntity;
  private readonly entities: WindowEntity[];
  private readonly savedSillMap: Map<string, WindowSill | null>;
  private readonly restoredSillMap: Map<string, WindowSill | null>;

  constructor(templateEntity: WindowEntity, entities: WindowEntity[]) {
    this.templateEntity = templateEntity;
    this.entities = entities;
    this.savedSillMap = new Map();
    this.restoredSillMap = new Map();
  }

  onCommit(): void {
    this.entities.forEach((entity) => {
      this.savedSillMap.set(entity.ID, entity.getWindowSill());
      
      const templateSill = this.templateEntity.getWindowSill();
      if (templateSill) {
        this._addSill(entity, templateSill);
      } else {
        entity.removeSill();
      }
      
      this.restoredSillMap.set(entity.ID, entity.getWindowSill());
    });
  }

  onUndo(): void {
    this.entities.forEach((entity) => {
      const savedSill = this.savedSillMap.get(entity.ID);
      if (savedSill) {
        this._addSill(entity, savedSill);
      } else {
        entity.removeSill();
      }
    });
  }

  onRedo(): void {
    this.entities.forEach((entity) => {
      const restoredSill = this.restoredSillMap.get(entity.ID);
      if (restoredSill) {
        this._addSill(entity, restoredSill);
      }
    });
  }

  private _addSill(entity: WindowEntity, sill: WindowSill): void {
    entity.addSill();
    const windowSill = entity.getWindowSill();
    if (windowSill) {
      windowSill.initByParameters(sill.parameters);
      entity.buildPartsInfo();
    }
  }
}