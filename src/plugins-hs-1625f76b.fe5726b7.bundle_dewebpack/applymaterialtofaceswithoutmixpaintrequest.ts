import { HSCore } from './HSCore';

interface Face {
  material: Material;
  refreshMaterialUniquePolygon(): void;
}

interface Material {
  clone(): Material;
}

export class ApplyMaterialToFacesWithoutMixpaintRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _material: Material;
  private readonly _faces: Face[];

  constructor(material: Material, faces: Face[]) {
    super();
    this._material = material;
    this._faces = faces;
  }

  onCommit(): Face[] {
    this._faces.forEach((face: Face) => {
      const clonedMaterial = this._material.clone();
      face.material = clonedMaterial;
      face.refreshMaterialUniquePolygon();
    });

    super.onCommit();
    return this._faces;
  }

  canTransactField(): boolean {
    return true;
  }
}