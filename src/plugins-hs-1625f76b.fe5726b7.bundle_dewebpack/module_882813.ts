import { HSCore } from './core-types';

interface Entity {
  id: string;
  z: number;
  getUniqueParent(): unknown;
}

interface TemplateEntity {
  z: number;
}

interface Layer {
  holeBuilder: {
    buildHole(entityIds: string[]): void;
  };
}

export default class ZOrderStateRequest extends HSCore.Transaction.Common.StateRequest {
  templateEntity: TemplateEntity;
  entities: Entity[];

  constructor(templateEntity: TemplateEntity, entities: Entity[]) {
    super();
    this.templateEntity = templateEntity;
    this.entities = entities;
  }

  onCommit(): void {
    this._apply();
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  private _apply(): void {
    const targetZOrder = this.templateEntity.z;
    
    if (this.entities.length === 0) {
      return;
    }

    const parentLayer = this.entities[0].getUniqueParent();
    
    if (parentLayer instanceof HSCore.Model.Layer) {
      this.entities.forEach((entity) => {
        entity.z = targetZOrder;
      });

      const entityIds = this.entities.map((entity) => entity.id);
      parentLayer.holeBuilder.buildHole(entityIds);
    }
  }
}