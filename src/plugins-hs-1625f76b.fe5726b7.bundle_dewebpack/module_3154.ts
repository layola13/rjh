import { HSCore } from './path-to-hscore';

type MaterialData = unknown;
type MaterialId = string | number;

interface IEntity {
  getMaterialList(): Array<[MaterialId, MaterialData?]>;
  setMaterial(id: MaterialId, data: MaterialData | undefined): void;
}

class ApplyMaterialToSameModelTransaction extends HSCore.Transaction.Common.StateRequest {
  private entities: IEntity[];
  private materialDataMap: Map<MaterialId, MaterialData>;

  constructor(
    entities: IEntity[] = [],
    materialDataMap?: Map<MaterialId, MaterialData>
  ) {
    super();
    this.entities = entities;
    this.materialDataMap = materialDataMap ?? new Map();
  }

  /**
   * Apply materials to a single entity
   */
  private setMaterials(entity: IEntity): void {
    if (this.materialDataMap.size <= 0) {
      entity.getMaterialList().forEach((material) => {
        entity.setMaterial(material[0], undefined);
      });
    } else {
      for (const [materialId, materialData] of this.materialDataMap) {
        entity.setMaterial(materialId, materialData);
      }
    }
  }

  /**
   * Apply materials to all entities
   */
  private setEntitiesMaterials(): void {
    this.entities.forEach((entity) => {
      this.setMaterials(entity);
    });
  }

  onCommit(): void {
    this.setEntitiesMaterials();
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '材质应用到相同模型';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default ApplyMaterialToSameModelTransaction;