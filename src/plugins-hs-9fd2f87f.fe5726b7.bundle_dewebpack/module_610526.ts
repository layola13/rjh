import { HSCore } from './path/to/HSCore';

interface EntityParameters {
  elevation: number;
  x: number;
  y: number;
  [key: string]: unknown;
}

interface Entity {
  parameters: EntityParameters;
  x: number;
  y: number;
}

/**
 * Transaction for applying elevation and position changes to multiple entities
 */
export default class ElevationTransaction extends HSCore.Transaction.Common.StateRequest {
  private templateEntity: Entity;
  private entities: Entity[];
  private _elevation: number;

  constructor(templateEntity: Entity, entities: Entity[]) {
    super();
    this.templateEntity = templateEntity;
    this.entities = entities;
    this._elevation = 0;
  }

  onCommit(): void {
    this._elevation = this.templateEntity.parameters.elevation;
    this._apply();
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    this._apply();
    super.onUndo([]);
  }

  onRedo(): void {
    this._apply();
    super.onRedo([]);
  }

  private _apply(): void {
    this.entities.forEach((entity: Entity) => {
      const { x, y } = this.templateEntity;
      const updatedParams: Partial<EntityParameters> = {
        elevation: this._elevation,
        x,
        y
      };
      
      const clonedParameters = _.cloneDeep(entity.parameters);
      const mergedParameters = _.extend(clonedParameters, updatedParams);
      entity.parameters = mergedParameters;
    });
  }
}