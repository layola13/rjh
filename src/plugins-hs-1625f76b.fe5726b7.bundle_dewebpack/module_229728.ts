import { HSCore } from './HSCore';

type MaterialKey = string;
type Material = unknown;

interface Entity {
  setMaterial(key: MaterialKey, material: Material | undefined): void;
}

export default class MaterialStateRequest extends HSCore.Transaction.Common.StateRequest {
  private entity: Entity;
  private oldMaterialMap: Map<MaterialKey, Material>;
  private materialKeys: MaterialKey[];

  constructor(
    entity: Entity,
    oldMaterialMap: Map<MaterialKey, Material>,
    materialKeys: MaterialKey[]
  ) {
    super();
    this.entity = entity;
    this.oldMaterialMap = oldMaterialMap;
    this.materialKeys = materialKeys;
  }

  private resetMaterial(materialMap: Map<MaterialKey, Material>): void {
    for (const key of this.materialKeys) {
      const material = materialMap.get(key);
      this.entity.setMaterial(key, material);
    }
  }

  onCommit(): void {
    this.resetMaterial(this.oldMaterialMap);
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}