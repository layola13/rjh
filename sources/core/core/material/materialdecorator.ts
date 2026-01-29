interface Material {
  mixpaint?: {
    mixPave: unknown;
  };
  textureURI?: string;
  seekId?: string;
}

interface MaterialsResult {
  materials: Material[];
}

interface MixPaveService {
  getMaterials(mixPave: unknown): MaterialsResult;
}

interface IServiceManager {
  getMixPaveService(): MixPaveService;
}

declare const ServiceManager: IServiceManager;

export class MaterialDecorator {
  private readonly _material: Material;

  constructor(material: Material) {
    this._material = material;
  }

  getMaterials(): MaterialsResult {
    if (this._material.mixpaint) {
      const { mixPave } = this._material.mixpaint;
      return ServiceManager.getMixPaveService().getMaterials(mixPave);
    }

    const materials: Material[] = [];
    const { textureURI, seekId } = this._material;

    if (seekId && textureURI) {
      materials.push(this._material);
    }

    return {
      materials
    };
  }
}