interface MaterialMap {
  [key: string]: unknown;
}

interface Content {
  setMaterialData(materialMap: MaterialMap): void;
}

abstract class TransactionRequest {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
}

class MaterialUpdateRequest extends TransactionRequest {
  private readonly _content: Content;
  private readonly _originalMaterialMap: MaterialMap;
  private readonly _updatedMaterialMap: MaterialMap;

  constructor(
    content: Content,
    originalMaterialMap: MaterialMap,
    updatedMaterialMap: MaterialMap
  ) {
    super();
    this._content = content;
    this._originalMaterialMap = originalMaterialMap;
    this._updatedMaterialMap = updatedMaterialMap;
  }

  private _updateMaterials(materialMap: MaterialMap): void {
    this._content.setMaterialData(materialMap);
  }

  onCommit(): void {
    this._updateMaterials(this._updatedMaterialMap);
  }

  onUndo(): void {
    this._updateMaterials(this._originalMaterialMap);
  }

  onRedo(): void {
    this._updateMaterials(this._updatedMaterialMap);
  }
}

export default MaterialUpdateRequest;