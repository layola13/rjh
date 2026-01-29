interface MaterialData {
  [key: string]: unknown;
}

interface Molding {
  material: Material;
}

interface Face {
  getMolding(moldingType: string): Molding[] | null;
  onEntityDirty(): void;
}

interface Material {
  [key: string]: unknown;
}

interface MaterialStatic {
  create(data: MaterialData): Material;
}

declare namespace HSCore {
  namespace Material {
    const Material: MaterialStatic;
  }
  namespace Transaction {
    class Request {
      constructor();
    }
  }
}

class ChangeMaterialRequest extends HSCore.Transaction.Request {
  private materialData: MaterialData;
  private face: Face;
  private moldingType: string;
  private _savedMaterial?: Material;

  constructor(materialData: MaterialData, face: Face, moldingType: string) {
    super();
    this.materialData = materialData;
    this.face = face;
    this.moldingType = moldingType;
    this._savedMaterial = undefined;
  }

  onCommit(): void {
    this._changeMaterial(HSCore.Material.Material.create(this.materialData));
  }

  onUndo(): void {
    if (this._savedMaterial) {
      this._changeMaterial(this._savedMaterial);
    }
  }

  onRedo(): void {
    if (this._savedMaterial) {
      this._changeMaterial(this._savedMaterial);
    }
  }

  private _changeMaterial(material: Material): void {
    const moldings = this.face.getMolding(this.moldingType);
    if (moldings && moldings.length !== 0) {
      this._savedMaterial = moldings[0].material;
      moldings.forEach((molding) => {
        molding.material = material;
      });
      this.face.onEntityDirty();
    }
  }
}

export default ChangeMaterialRequest;