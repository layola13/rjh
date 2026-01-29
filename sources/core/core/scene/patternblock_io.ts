import { MixBlock_IO, MixBlock } from './MixBlock';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

interface Point {
  x: number;
  y: number;
}

interface DumpOptions {
  version?: string;
  [key: string]: unknown;
}

interface DumpResult {
  key: string | Point;
  localId: string;
  originalMaterial?: string;
  [key: string]: unknown;
}

type DumpCallback = (result: DumpResult[], block: PatternBlock) => void;

class PatternBlock_IO extends MixBlock_IO {
  private static _PatternBlock_IO_instance: PatternBlock_IO | null = null;

  static instance(): PatternBlock_IO {
    if (!PatternBlock_IO._PatternBlock_IO_instance) {
      PatternBlock_IO._PatternBlock_IO_instance = new PatternBlock_IO();
    }
    return PatternBlock_IO._PatternBlock_IO_instance;
  }

  dump(
    block: PatternBlock,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): DumpResult[] {
    const dumpResult = super.dump(block, undefined, includeMetadata, options);
    const data = dumpResult[0];
    
    data.key = block.key;
    data.localId = block.localId;
    data.originalMaterial = block._originalMaterial?.id;
    
    if (block._originalMaterial) {
      HSCore.Material.MaterialData.dumpMaterialData(block._originalMaterial, options);
    }
    
    if (callback) {
      callback(dumpResult, block);
    }
    
    return dumpResult;
  }

  load(block: PatternBlock, data: DumpResult, options: DumpOptions = {}): void {
    super.load(block, data, options);
    
    block.key = data.key;
    block.localId = data.localId;
    
    if (HSCore.Util.Version.isEarlierThan(options.version, "0.14")) {
      block._originalMaterial = HSCore.Material.MaterialData.create(data.originalMaterial);
    } else {
      block._originalMaterial = HSCore.Material.MaterialData.loadFromDumpById(
        data.originalMaterial,
        options
      );
    }
    
    if (HSCore.Util.Version.isEarlierThan(options.version, "0.19")) {
      block._originalMaterial.offsetX = -block._originalMaterial.offsetX || 0;
      block.material.offsetX = -block.material.offsetX || 0;
    }
  }
}

class PatternBlock extends MixBlock {
  @EntityField({ prefix: "_" })
  key: string | Point;
  
  private _key: string | Point = "";

  @EntityField({ prefix: "_" })
  localId: string;
  
  private _localId: string = "";

  @EntityField({
    get(this: PatternBlock) {
      return this._originalMaterial || this.material;
    },
    partialSet(this: PatternBlock, value: unknown) {
      this._setOriginalMaterial(value);
    }
  })
  originalMaterial: unknown;
  
  _originalMaterial: any = null;

  @EntityField({ prefix: "_" })
  anchorPointIndex: number | undefined;

  @EntityField({ prefix: "_" })
  absoluteMass: number | undefined;

  constructor(key: string | Point = "", parent?: unknown) {
    super(key as string, parent);
    this.key = key;
  }

  static create(points: Point[], holes?: unknown): PatternBlock {
    const block = new PatternBlock();
    
    block.__points = points.map(point => ({
      x: point.x,
      y: point.y
    }));
    
    block.originPoints = points.map(point => ({
      x: point.x,
      y: point.y
    }));
    
    if (holes) {
      block.__holes = holes;
    }
    
    return block;
  }

  get keyInString(): string {
    let keyString = "";
    
    if (
      this.key &&
      typeof this.key === 'object' &&
      this.key.x !== undefined &&
      this.key.y !== undefined
    ) {
      keyString = `${this._localId}-${Number(this.key.x)}-${Number(this.key.y)}`;
    }
    
    return keyString;
  }

  _setOriginalMaterial(material: any): void {
    if (
      material?.textureURI &&
      material.textureURI.indexOf("Product") !== -1
    ) {
      Logger.console.assert(false, "should not set a generated url");
    }
    
    this._originalMaterial = material.clone();
    this._originalMaterial.metadata = material.metadata;
  }

  getIO(): PatternBlock_IO {
    return PatternBlock_IO.instance();
  }

  partOfGrid(): boolean {
    return this.parent instanceof HSCore.Model.PatternGrid;
  }

  isPartOfExtPaint(): boolean {
    return false;
  }

  getOuterPoints(): Point[] {
    const pointsCopy = this.points.map(point => ({
      x: point.x,
      y: point.y
    }));
    
    const pointsArray = [pointsCopy];
    const outerPoints: Point[] = [];
    
    for (let i = 0; i < pointsCopy.length; i++) {
      for (let j = 0; j < pointsArray[0].length; j++) {
        const currentPoint = pointsCopy[i];
        const comparisonPoint = pointsArray[0][j];
        
        if (
          HSCore.Util.Math.nearlyEquals(currentPoint.x, comparisonPoint.x) &&
          HSCore.Util.Math.nearlyEquals(currentPoint.y, comparisonPoint.y)
        ) {
          outerPoints.push(currentPoint);
          break;
        }
      }
    }
    
    return outerPoints;
  }

  assignFrom(source: PatternBlock): void {
    this.material = source.material;
    this.originalMaterial = source.material;
    this.pavingOption = source.pavingOption;
  }

  setMaterial(material: any, forceUpdate: boolean = false): void {
    if (!material) {
      return;
    }
    
    if (this.material?.equals(material)) {
      return;
    }
    
    if (!this._originalMaterial || forceUpdate) {
      this.originalMaterial = material;
    }
    
    this.material = material.clone();
    
    if (this.parent) {
      this.parent.addModifiedBlocks([this]);
      this.parent.dirtyBlocks(this);
    } else {
      this.dirtyMaterial();
    }
  }

  copyFrom(source: PatternBlock): void {
    super.copyFrom(source);
    this._key = source.key;
    this._localId = source.localId;
    this._originalMaterial = _.cloneDeep(source.originalMaterial);
  }

  clone(): PatternBlock {
    const clonedBlock = new PatternBlock();
    clonedBlock.copyFrom(this);
    return clonedBlock;
  }

  getPattern(): unknown {
    if (this.pattern) {
      return this.pattern;
    }
    
    if (this.parent?.parent) {
      return this.parent.parent.pattern;
    }
    
    return null;
  }

  getMaterial(): unknown {
    return this.material;
  }
}

Entity.registerClass(HSConstants.ModelClass.PatternBlock, PatternBlock);

export { PatternBlock_IO, PatternBlock };