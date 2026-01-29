import { PatternBlock_IO, PatternBlock } from './PatternBlock';
import { Entity } from './Entity';
import { EntityField } from './EntityField';

interface Point {
  x: number;
  y: number;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpResult {
  rotationAngle: number;
  pattern: string;
  [key: string]: unknown;
}

interface Material {
  id: string;
  equals(other: Material): boolean;
  clone(): Material;
}

interface Pattern {
  id: string;
}

export class FreePatternBlock_IO extends PatternBlock_IO {
  private static _FreePatternBlock_IO_instance: FreePatternBlock_IO;

  static instance(): FreePatternBlock_IO {
    if (!FreePatternBlock_IO._FreePatternBlock_IO_instance) {
      FreePatternBlock_IO._FreePatternBlock_IO_instance = new FreePatternBlock_IO();
    }
    return FreePatternBlock_IO._FreePatternBlock_IO_instance;
  }

  get savePatternEntity(): boolean {
    return false;
  }

  dump(
    entity: FreePatternBlock,
    callback?: (result: DumpResult[], entity: FreePatternBlock) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): DumpResult[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const data = result[0];
    data.rotationAngle = entity.rotationAngle;
    data.pattern = entity.pattern.id;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(
    entity: FreePatternBlock,
    data: DumpResult,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    entity.rotationAngle = data.rotationAngle;
  }
}

export class FreePatternBlock extends PatternBlock {
  @EntityField({ prefix: "_" })
  rotation: number;

  private _rotation: number = 0;
  private _originalMaterial?: Material;

  constructor(id: string = "", pattern?: Pattern) {
    super(id, pattern);
    this._rotation = 0;
    this.rotation = 0;
  }

  get rotationAngle(): number {
    return this.rotation;
  }

  set rotationAngle(value: number) {
    this.rotation = value;
  }

  rotate(angle: number, centerX: number, centerY: number): void {
    this.rotation = this._rotation + angle;
    const transform = HSCore.Util.AffineTransform.getRotateInstance(angle, centerX, centerY);
    this.transform(transform);
  }

  getIO(): FreePatternBlock_IO {
    return FreePatternBlock_IO.instance();
  }

  static create(points: Point[]): FreePatternBlock {
    const block = new FreePatternBlock();
    block.points = points.map(point => ({
      x: point.x,
      y: point.y
    }));
    block.originPoints = points.map(point => ({
      x: point.x,
      y: point.y
    }));
    block._rotation = 0;
    return block;
  }

  setMaterial(material: Material, forceOriginal: boolean = false): void {
    if (!material) {
      return;
    }

    if (this.material && material.equals(this.material)) {
      return;
    }

    this.transact();
    
    if (!this._originalMaterial || forceOriginal) {
      this.originalMaterial = material;
    }
    
    this.material = material.clone();
  }

  getPattern(): Pattern {
    return this.pattern;
  }

  copyFrom(source: FreePatternBlock): void {
    super.copyFrom(source);
    this._rotation = source.rotationAngle;
  }

  clone(): FreePatternBlock {
    const cloned = new FreePatternBlock();
    cloned.copyFrom(this);
    return cloned;
  }
}

Entity.registerClass(HSConstants.ModelClass.FreePatternBlock, FreePatternBlock);