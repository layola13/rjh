import { HSCore } from './635589';

interface Entity {
  doorStoneMaterialEnabled: boolean;
  setBottomFaceMaterial(material: Material): void;
  getBottomFace(): Face | null;
}

interface Material {
  clone(): Material;
}

interface Face {
  dirtyMaterial(): void;
}

/**
 * Transaction for setting door stone material on multiple entities
 */
export default class SetDoorStoneMaterialTransaction extends HSCore.Transaction.Common.StateRequest {
  private entities: Entity[];
  private material: Material;

  constructor(entities: Entity[], material: Material) {
    super();
    this.entities = entities;
    this.material = material;
  }

  onCommit(): void {
    this.entities.forEach((entity) => {
      entity.doorStoneMaterialEnabled = true;
      entity.setBottomFaceMaterial(this.material.clone());
      const bottomFace = entity.getBottomFace();
      HSCore.Paint.PaintsUtil.updateFaceMixpaint(bottomFace);
      bottomFace?.dirtyMaterial();
    });
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    super.onUndo([]);
    this.dirtyMaterial();
  }

  onRedo(): void {
    super.onRedo([]);
    this.dirtyMaterial();
  }

  private dirtyMaterial(): void {
    this.entities.forEach((entity) => {
      const bottomFace = entity.getBottomFace();
      HSCore.Paint.PaintsUtil.updateFaceMixpaint(bottomFace);
      bottomFace?.dirtyMaterial();
    });
  }
}