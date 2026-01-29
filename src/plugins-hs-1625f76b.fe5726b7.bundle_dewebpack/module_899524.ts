interface MaterialMeta {
  instanceOf?: (type: string) => boolean;
}

interface Content {
  getMaterial(component: Component): Material;
  setMaterial(component: Component, material: Material): void;
}

interface Component {
  // Component properties would be defined based on actual usage
}

interface Material {
  // Material properties would be defined based on actual usage
}

declare const HSConstants: {
  ModelClass: {
    NgMaterial: string;
  };
};

declare const HSCore: {
  Material: {
    Material: {
      create(meta: MaterialMeta): Material;
    };
  };
  Transaction: {
    Request: new (...args: unknown[]) => TransactionRequest;
  };
};

interface TransactionRequest {
  onCommit?(): void;
  onUndo?(): void;
  onRedo?(): void;
}

class MaterialChangeRequest extends (HSCore.Transaction.Request as any) implements TransactionRequest {
  private _content: Content;
  private _component: Component;
  private _materialMeta: MaterialMeta;
  private _savedMaterial?: Material;

  constructor(content: Content, component: Component, materialMeta: MaterialMeta) {
    super();
    this._content = content;
    this._component = component;
    this._materialMeta = materialMeta;
  }

  onCommit(): void {
    const meta = this._materialMeta;
    const material = !meta || (meta.instanceOf && meta.instanceOf(HSConstants.ModelClass.NgMaterial))
      ? meta as unknown as Material
      : HSCore.Material.Material.create(meta);
    this._changeMaterial(material);
  }

  onUndo(): void {
    this._changeMaterial(this._savedMaterial!);
  }

  onRedo(): void {
    this._changeMaterial(this._savedMaterial!);
  }

  private _changeMaterial(material: Material): void {
    const content = this._content;
    const component = this._component;
    this._savedMaterial = content.getMaterial(component);
    content.setMaterial(component, material);
  }
}

export default MaterialChangeRequest;