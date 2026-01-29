import { Entity, Entity_IO } from './Entity';
import { Pattern } from './Pattern';
import { PavingOption, PavingPointTypeEnum } from './PavingOption';
import { EntityField, bindMaterialData } from './EntityDecorators';
import { SignalHook } from './SignalHook';
import { nearlyEquals } from './MathUtils';
import { Logger } from './Logger';
import { MaterialData, ColorModeEnum } from './Material';
import { Version } from './Version';

interface Point {
  x: number;
  y: number;
}

interface Bounding {
  x: number;
  x2: number;
  y: number;
  y2: number;
}

interface DumpOptions {
  version?: string;
  invalidIds?: string[];
  [key: string]: unknown;
}

interface PavingOptionData {
  type?: PavingPointTypeEnum;
  point?: Point;
  rotation?: number;
  [key: string]: unknown;
}

interface ShapeDumpData {
  material?: string;
  pavingOption?: PavingOptionData;
  pattern?: string;
  [key: string]: unknown;
}

interface MixPaint {
  onPatternChanged(pattern: Pattern): void;
}

export class Shape extends Entity {
  private _material: MaterialData | null;
  private _pattern: Pattern | null;
  private _pavingOption: PavingOption;
  private _patternDirtySignalHook: SignalHook;
  private _patternResetSignalHook: SignalHook;
  private _patternResetOverrideSignalHook: SignalHook;
  private _patternSeamWidthChangeHook: SignalHook;

  public originPoints: Point[];

  @EntityField({
    prefix: '_',
    partialSet(this: Shape, value: MaterialData): void {
      this._material = value;
      if (value) {
        this._material!.metadata = value.metadata;
      }
    },
    equals(this: Shape, value: MaterialData | null): boolean {
      return (!this.material && !value) || (!!this.material && this.material.equals(value));
    },
    postSet(this: Shape, oldValue: MaterialData | null, newValue: MaterialData | null): void {
      this.dirtyMaterial();
    }
  })
  public material!: MaterialData | null;

  @EntityField({
    prefix: '_',
    partialSet(this: Shape, value: Pattern | null): void {
      this._setPattern(value);
    },
    equals(this: Shape, value: Pattern | null): boolean {
      return this._pattern === value || (!!value && !!this._pattern && value.id === this._pattern.id);
    },
    preSet(this: Shape): void {
      if (this._pattern) {
        this._pattern.recycle();
      }
    }
  })
  public pattern!: Pattern | null;

  @EntityField({
    prefix: '_',
    partialSet(this: Shape, value: PavingOption | PavingOptionData): void {
      if (!(value instanceof PavingOption)) {
        Logger.console.assert(false, '错误的pavingOption类型');
        this.setPavingOptionArgs(value as PavingOptionData);
        return;
      }

      let needsUpdate = false;
      if (this._pavingOption.rotation !== value.rotation) {
        needsUpdate = true;
      } else if (!nearlyEquals(this._pavingOption.point.x, value.point.x) || 
                 !nearlyEquals(this._pavingOption.point.y, value.point.y)) {
        needsUpdate = true;
      }

      this._pavingOption = value;
      if (needsUpdate) {
        this.updateMixGrid();
      }
    }
  })
  public pavingOption!: PavingOption;

  constructor(id: string = '', parent?: Entity) {
    super(id, parent);
    this._material = null;
    this._pattern = null;
    this.pattern = null;
    this._pavingOption = PavingOption.create();
    this.originPoints = [];
    this._patternDirtySignalHook = new SignalHook(this);
    this._patternResetSignalHook = new SignalHook(this);
    this._patternResetOverrideSignalHook = new SignalHook(this);
    this._patternSeamWidthChangeHook = new SignalHook(this);
  }

  public copyFrom(source: Shape): void {
    super.copyFrom(source);
    this._material = source.material ? _.cloneDeep(source.material) : null;
    if (this._material) {
      bindMaterialData(this, 'material', this._material);
    }
    this._pattern = source.pattern ? source.pattern.clone() : null;
    this._pavingOption = source.pavingOption.clone();
  }

  public setMaterial(material: MaterialData): void {
    if (material) {
      this.material = material;
    }
  }

  public getPattern(): Pattern | null {
    return this._pattern;
  }

  public setPattern(pattern: Pattern | null): void {
    this.pattern = pattern;
  }

  private _setPattern(pattern: Pattern | null, triggerChange: boolean = true): void {
    Logger.console.assert(!pattern || pattern instanceof Pattern, 'invalid value.');

    this._patternDirtySignalHook.unlistenAll();
    this._patternSeamWidthChangeHook.unlistenAll();

    if (this._pattern) {
      this._pattern.polygon = null;
    }

    this._pattern = pattern;

    if (this._pattern) {
      this._pattern.polygon = this;
      this._patternDirtySignalHook.listen(this._pattern.signalDirty, this.onPatternDirty);
      this._patternResetSignalHook.listen(this._pattern.signalReset, this.onPatternReset);
      this._patternSeamWidthChangeHook.listen(this._pattern.signalSeamWidthChange, this.onPatternSeamWidthChange);
      this._patternResetOverrideSignalHook.listen(this._pattern.signalResetOverride, this.onPatternResetOverride);
    }

    if (triggerChange) {
      this._onPatternChanged(pattern);
    }
  }

  protected _onPatternChanged(pattern: Pattern | null): void {
    // Override in subclasses
  }

  protected onPatternSeamWidthChange(): void {
    this.updateMixGrid();
  }

  protected updateMixGrid(): void {
    // Override in subclasses
  }

  protected onPatternDirty(pattern: Pattern): void {
    if (this.pattern) {
      this.dirtyMaterial();
      const mixpaint = this.getMixpaint();
      if (mixpaint) {
        mixpaint.onPatternChanged(this.pattern);
      }
    }
  }

  protected onPatternReset(pattern: Pattern): void {
    // Override in subclasses
  }

  protected onPatternResetOverride(pattern: Pattern): void {
    // Override in subclasses
  }

  public getDefaultPavingPos(): Point {
    const bounds = this.bounding();
    return {
      x: bounds.x,
      y: bounds.y
    };
  }

  public isDefaultPavingPoint(): boolean {
    return this._pavingOption.type === PavingPointTypeEnum.Default;
  }

  public setPavingOptionArgs(args: PavingOptionData): void {
    this.pavingOption = this._pavingOption.clone(args);
  }

  public resetPavingOption(): void {
    this.pavingOption = PavingOption.DefaultOption.clone();
  }

  public bounding(): Bounding {
    const path = this.getPath();
    if (!path.length) {
      return { x: 0, x2: 0, y: 0, y2: 0 };
    }

    const firstSegment = path[0];
    let minX = firstSegment[0].x;
    let maxX = firstSegment[0].x;
    let minY = firstSegment[0].y;
    let maxY = firstSegment[0].y;

    firstSegment.forEach(point => {
      minX = Math.min(point.x, minX);
      maxX = Math.max(point.x, maxX);
      minY = Math.min(point.y, minY);
      maxY = Math.max(point.y, maxY);
    });

    return {
      x: minX,
      x2: maxX,
      y: minY,
      y2: maxY
    };
  }

  public setOriginPoints(points: Point[] = []): void {
    this.originPoints = _.cloneDeep(points);
  }

  public getMixpaint(): MixPaint | null {
    let currentParent = this.parent;
    while (currentParent) {
      if (currentParent instanceof HSCore.Model.MixPaint) {
        return currentParent as unknown as MixPaint;
      }
      currentParent = currentParent.parent;
    }
    return null;
  }

  public partOfGrid(): boolean {
    return false;
  }

  public clear(material: MaterialData): void {
    this.setMaterial(material);
    this.pattern = undefined;
    this.resetPavingOption();
  }

  public destroy(): void {
    if (this._disposed) {
      return;
    }

    this._material = null;
    this._pattern = null;
    this.originPoints = [];

    this._patternDirtySignalHook.dispose();
    this._patternResetSignalHook.dispose();
    this._patternResetOverrideSignalHook.dispose();
    this._patternSeamWidthChangeHook.dispose();

    super.destroy();
  }

  protected onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  protected getPath(): Point[][] {
    // Override in subclasses
    return [];
  }

  protected dirtyMaterial(): void {
    // Override in subclasses
  }
}

export class Shape_IO extends Entity_IO {
  get savePatternEntity(): boolean {
    return true;
  }

  public dump(
    entity: Shape,
    callback?: (data: unknown[], entity: Shape) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    let dumpData = super.dump(entity, undefined, includeChildren, options);
    const shapeData = dumpData[0] as ShapeDumpData;

    shapeData.material = entity._material?.id;
    if (entity._material) {
      MaterialData.dumpMaterialData(entity._material, options);
    }

    const pavingOptionData = entity.pavingOption.dump();
    if (JSON.stringify(pavingOptionData) !== '{}') {
      shapeData.pavingOption = pavingOptionData;
    }

    if (entity.pattern && this.savePatternEntity) {
      shapeData.pattern = entity.pattern.id;
      dumpData = dumpData.concat(entity.pattern.dump(callback, includeChildren, options));
    }

    if (callback) {
      callback(dumpData, entity);
    }

    return dumpData;
  }

  public load(entity: Shape, data: ShapeDumpData, options: DumpOptions = {}): void {
    super.load(entity, data, options);

    let material: MaterialData | null = null;

    if (Version.isEarlierThan(options.version, '0.14')) {
      const legacyMaterial = data.material as unknown as { textureURI?: string; colorMode?: ColorModeEnum; color?: unknown };
      if (legacyMaterial && typeof legacyMaterial === 'object' && 'textureURI' in legacyMaterial) {
        if (legacyMaterial.textureURI) {
          legacyMaterial.colorMode = ColorModeEnum.texture;
          legacyMaterial.color = undefined;
        }
        material = MaterialData.create(legacyMaterial);
      }
    } else {
      material = MaterialData.loadFromDumpById(data.material as string, options);
    }

    if (material?.textureURI && !material.textureURIDefault) {
      material.textureURIDefault = material.textureURI;
    }

    entity._material = material;
    if (material) {
      bindMaterialData(entity, 'material', material);
    }

    entity._pavingOption = PavingOption.create(data.pavingOption);

    if (data.pattern && (!entity.pattern || data.pattern !== entity.pattern.id)) {
      const pattern = Entity.loadFromDumpById(data.pattern, options) as Pattern | null;
      if (pattern && !(options.invalidIds?.includes(pattern.id))) {
        entity._setPattern(pattern, false);
      }
    }
  }
}