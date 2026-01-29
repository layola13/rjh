import { MaterialUtils } from './MaterialUtils';
import { HSCore } from './HSCore';

interface MaterialData {
  initTileSize_x?: number;
  initTileSize_y?: number;
  [key: string]: unknown;
}

interface Entity {
  setMaterial(meshName: string, materialData: MaterialData): void;
  [key: string]: unknown;
}

/**
 * Request to replace material on a content entity
 */
export class ContentMaterialReplaceRequest extends HSCore.Transaction.Common.StateRequest {
  entity: Entity;
  meshName: string;
  materialData: MaterialData;
  private _useMeshUV: boolean;

  constructor(
    entity: Entity,
    meshName: string,
    materialData: MaterialData,
    useMeshUV: boolean = false
  ) {
    super();
    this.entity = entity;
    this.meshName = meshName;
    this.materialData = materialData;
    this._useMeshUV = useMeshUV;
  }

  onCommit(): void {
    const tileSize = MaterialUtils.getMaterialInitTileSize(
      this.entity,
      this.materialData,
      this.meshName,
      this._useMeshUV
    );

    this.materialData.initTileSize_x = tileSize.initTileSize_x;
    this.materialData.initTileSize_y = tileSize.initTileSize_y;

    this.entity.setMaterial(this.meshName, this.materialData);

    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }
}