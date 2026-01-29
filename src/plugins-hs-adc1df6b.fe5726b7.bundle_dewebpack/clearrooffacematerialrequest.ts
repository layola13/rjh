import { HSCore } from './HSCore';

interface Roof {
  removeFaceMaterial(faceId: string): void;
  getFaceTagByMeshKey(meshKey: string): string;
  setMaterialData(tag: string, materialData: unknown): void;
  getFaceDefaultMaterialData(faceId: string): unknown;
  dirtyGeometry(): void;
}

export class ClearRoofFaceMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _roof: Roof;
  private readonly _faceIds: string[];

  constructor(roof: Roof, faceIds: string[]) {
    super();
    this._roof = roof;
    this._faceIds = faceIds;
  }

  onCommit(): void {
    for (const faceId of this._faceIds) {
      this._roof.removeFaceMaterial(faceId);
      const faceTag = this._roof.getFaceTagByMeshKey(faceId);
      this._roof.setMaterialData(faceTag, this._roof.getFaceDefaultMaterialData(faceId));
    }
    this._roof.dirtyGeometry();
    super.onCommit([]);
  }

  getDescription(): string {
    return "清除参数化屋顶选定face的材质";
  }

  canTransactField(): boolean {
    return true;
  }
}