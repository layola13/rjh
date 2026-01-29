enum MoldingTypeEnum {
  Cornice = 'Cornice',
  Baseboard = 'Baseboard'
}

interface WallMoldingMeta {
  type: MoldingTypeEnum;
  profile?: unknown;
  metadata?: unknown;
  material?: unknown;
  thickness?: number;
  height?: number;
  clone(): WallMoldingMeta;
}

interface WallMolding {
  metadata: unknown;
  material: Material;
  thickness: number;
  height: number;
  initByMeta(meta: unknown): void;
  clone(): WallMolding;
}

interface Material {
  clone(): Material;
}

interface MaterialStatic {
  create(materialData: unknown): Material;
}

interface Obstacle {
  getMolding(moldingType: MoldingTypeEnum): WallMolding | undefined;
  setMolding(molding: WallMolding | undefined, moldingType: MoldingTypeEnum): void;
}

type ProductMetas = WallMoldingMeta | {
  profile?: unknown;
  metadata?: unknown;
  material?: unknown;
  thickness?: number;
  height?: number;
};

abstract class TransactionRequest {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class SetObstacleMoldingRequest extends TransactionRequest {
  private readonly _productMetas: ProductMetas | undefined;
  private readonly _obstacle: Obstacle;
  private readonly _moldingType: MoldingTypeEnum;
  private _originalMolding: WallMolding | undefined;
  private _newMolding: WallMolding | undefined;

  constructor(
    productMetas: ProductMetas | undefined,
    obstacle: Obstacle,
    moldingType: MoldingTypeEnum
  ) {
    super();

    if (moldingType !== MoldingTypeEnum.Cornice && moldingType !== MoldingTypeEnum.Baseboard) {
      throw new Error('invalid molding type');
    }

    if (productMetas && 'type' in productMetas && productMetas.type !== moldingType) {
      throw new Error('moldingType and type of the meta not match.');
    }

    this._productMetas = productMetas;
    this._obstacle = obstacle;
    this._moldingType = moldingType;
    this._originalMolding = undefined;
    this._newMolding = undefined;
  }

  onCommit(): void {
    this._originalMolding = this._obstacle.getMolding(this._moldingType);

    if (this._productMetas) {
      const metas = this._productMetas;

      if ('clone' in metas && typeof metas.clone === 'function') {
        this._newMolding = metas.clone();
        this._newMolding.material = metas.material!.clone();
      } else if (metas.profile) {
        this._newMolding = this.createMoldingFromType(this._moldingType);
        this._newMolding.initByMeta(metas.profile);
        this._newMolding.material = this.createMaterial(metas.material);
      } else {
        this._newMolding = this.createMoldingFromType(this._moldingType);

        if (metas.metadata) {
          this._newMolding.initByMeta(metas.metadata);
        } else {
          this._newMolding.initByMeta(this._originalMolding!.metadata);
        }

        if (metas.material) {
          this._newMolding.material = this.createMaterial(metas.material);
        } else {
          this._newMolding.material = this._originalMolding!.material.clone();
        }

        this._newMolding.thickness = metas.thickness ?? this._originalMolding!.thickness;
        this._newMolding.height = metas.height ?? this._originalMolding!.height;
      }

      if (!this._newMolding) {
        throw new Error('Failed to create new molding');
      }
    }

    this._obstacle.setMolding(this._newMolding, this._moldingType);
  }

  onUndo(): void {
    this._obstacle.setMolding(this._originalMolding, this._moldingType);
  }

  onRedo(): void {
    this._obstacle.setMolding(this._newMolding, this._moldingType);
  }

  getDescription(): string {
    if (!this._productMetas) {
      return '柱子线条关闭';
    }

    let operation = '';
    const metaKeys = Object.keys(this._productMetas);

    if (metaKeys[0] === 'height') {
      operation = '高度';
    } else if (metaKeys[0] === 'thickness') {
      operation = '宽度';
    } else if (metaKeys.includes('profile') && metaKeys.includes('material')) {
      operation = '打开';
    }

    return `柱子线条${operation}`;
  }

  getCategory(): string {
    return 'ContentOperation';
  }

  private createMoldingFromType(moldingType: MoldingTypeEnum): WallMolding {
    // Placeholder implementation - should be replaced with actual factory method
    return (HSCore as any).Util.Molding.createFromType(moldingType);
  }

  private createMaterial(materialData: unknown): Material {
    // Placeholder implementation - should be replaced with actual factory method
    return (HSCore as any).Material.Material.create(materialData);
  }
}

export default SetObstacleMoldingRequest;