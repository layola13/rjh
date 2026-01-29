interface MaterialData {
  rotation: number;
  [key: string]: any;
}

interface WindowSillParameters {
  materialData: MaterialData;
}

interface WindowSill {
  parameters: WindowSillParameters;
  onParametersChanged(): void;
  dirtyMaterial(): void;
  dirtyGeometry(): void;
}

interface MaterialMeta {
  instanceOf?(modelClass: any): boolean;
  getMaterialData(): MaterialData;
}

interface Material {
  getMaterialData(): MaterialData;
}

interface MaterialConstructor {
  create(meta: MaterialMeta): Material;
}

declare const HSConstants: {
  ModelClass: {
    NgMaterial: any;
  };
};

declare const HSCore: {
  Material: {
    Material: MaterialConstructor;
  };
  Transaction: {
    Request: new (...args: any[]) => any;
  };
};

const ROTATION_INCREMENT = 45;
const FULL_ROTATION = 360;

export class ChangeWindowSillMaterialRequest extends HSCore.Transaction.Request {
  private readonly _windowSill: WindowSill;
  private readonly _materialMeta: MaterialMeta | null;
  private readonly _beforeMaterialData: MaterialData;
  private _afterMaterialData?: MaterialData;

  constructor(windowSill: WindowSill, materialMeta: MaterialMeta | null) {
    super();
    this._windowSill = windowSill;
    this._materialMeta = materialMeta;
    this._beforeMaterialData = this._windowSill.parameters.materialData;
  }

  onCommit(): void {
    const meta = this._materialMeta;
    const material = !meta || (meta.instanceOf && meta.instanceOf(HSConstants.ModelClass.NgMaterial))
      ? meta
      : HSCore.Material.Material.create(meta);
    
    const materialData = material?.getMaterialData() ?? {} as MaterialData;
    this._changeMaterial(materialData);
    this._afterMaterialData = materialData;
  }

  private _changeMaterial(materialData: MaterialData): void {
    const windowSill = this._windowSill;
    windowSill.parameters.materialData = materialData;
    windowSill.onParametersChanged();
    windowSill.dirtyMaterial();
  }

  onUndo(): void {
    this._changeMaterial(this._beforeMaterialData);
  }

  onRedo(): void {
    if (this._afterMaterialData) {
      this._changeMaterial(this._afterMaterialData);
    }
  }
}

export class ChangeWindowSillMaterialRotationRequest extends HSCore.Transaction.Request {
  private readonly _windowSill: WindowSill;
  private _beforeRotation: number;
  private _afterRotation?: number;

  constructor(windowSill: WindowSill) {
    super();
    this._windowSill = windowSill;
    this._beforeRotation = windowSill.parameters.materialData.rotation;
  }

  onCommit(): void {
    const windowSill = this._windowSill;
    this._beforeRotation = windowSill.parameters.materialData.rotation;
    const newRotation = (this._beforeRotation + ROTATION_INCREMENT) % FULL_ROTATION;
    this._changeRotation(newRotation);
    this._afterRotation = newRotation;
  }

  onUndo(): void {
    this._changeRotation(this._beforeRotation);
  }

  onRedo(): void {
    if (this._afterRotation !== undefined) {
      this._changeRotation(this._afterRotation);
    }
  }

  private _changeRotation(rotation: number): void {
    const windowSill = this._windowSill;
    windowSill.parameters.materialData.rotation = rotation;
    windowSill.onParametersChanged();
    windowSill.dirtyGeometry();
  }
}