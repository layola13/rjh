interface Material {
  rotation: number;
}

interface Entity {
  getMaterial(): Material;
  dirtyMaterial(): void;
}

/**
 * Request to rotate molding texture by 45 degrees
 */
export class RotateMoldingTextureRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _entity: Entity;

  constructor(entity: Entity) {
    super();
    this._entity = entity;
  }

  onCommit(): void {
    const material = this._entity.getMaterial();
    material.rotation = (material.rotation + 45) % 360;
    this._entity.dirtyMaterial();
    super.onCommit([]);
  }

  onUndo(): void {
    super.onUndo([]);
    this._entity.dirtyMaterial();
  }

  onRedo(): void {
    super.onRedo([]);
    this._entity.dirtyMaterial();
  }

  getDescription(): string {
    return "旋转石膏线/踢脚线材质";
  }
}