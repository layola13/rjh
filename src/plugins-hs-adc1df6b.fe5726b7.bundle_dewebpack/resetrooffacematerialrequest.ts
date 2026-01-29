import { HSCore } from './HSCore';

interface MaterialData {
  material: unknown;
  sketchComId: string;
}

interface Entity {
  getFaceTagByMeshKey(faceId: string): string;
  setFaceMaterialByTag(tag: string, material: unknown): void;
  setMaterialData(tag: string, material: unknown, sketchComId?: string): void;
  removeFaceMaterial(faceId: string): void;
  getFaceDefaultMaterialData(faceId: string): unknown;
  dirtyGeometry(faceIds?: string[]): void;
  dirtyClipGeometry(): void;
  dirtyFaceMaterials(): void;
}

interface Material {
  clone(): unknown;
}

export class ResetRoofFaceMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _entity: Entity;
  private readonly _faceIds: string[];
  private readonly _defaultMaterialMap?: Map<string, MaterialData>;
  private readonly _facesMaterialMap?: Map<string, Material>;

  constructor(
    entity: Entity,
    faceIds: string[],
    defaultMaterialMap?: Map<string, MaterialData>,
    facesMaterialMap?: Map<string, Material>
  ) {
    super();
    this._entity = entity;
    this._faceIds = faceIds;
    this._defaultMaterialMap = defaultMaterialMap;
    this._facesMaterialMap = facesMaterialMap;
  }

  onCommit(): void {
    for (const faceId of this._faceIds) {
      const faceTag = this._entity.getFaceTagByMeshKey(faceId);

      if (this._facesMaterialMap?.has(faceTag)) {
        const material = this._facesMaterialMap.get(faceTag);
        this._entity.setFaceMaterialByTag(faceTag, material!.clone());
      } else if (this._defaultMaterialMap?.has(faceTag)) {
        const materialData = this._defaultMaterialMap.get(faceTag)!;
        this._entity.setMaterialData(faceTag, materialData.material.clone(), materialData.sketchComId);
      } else {
        this._entity.removeFaceMaterial(faceId);
        this._entity.setMaterialData(faceTag, this._entity.getFaceDefaultMaterialData(faceId));
      }
    }

    this._entity.dirtyGeometry();
    this._entity.dirtyClipGeometry();
    this._entity.dirtyFaceMaterials();
    super.onCommit();
  }

  getDescription(): string {
    return '重置参数化屋顶选定face的材质';
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    super.onUndo();
    this._entity.dirtyGeometry(this._faceIds);
    this._entity.dirtyClipGeometry();
    this._entity.dirtyFaceMaterials();
  }

  onRedo(): void {
    super.onRedo();
    this._entity.dirtyGeometry(this._faceIds);
    this._entity.dirtyClipGeometry();
    this._entity.dirtyFaceMaterials();
  }
}