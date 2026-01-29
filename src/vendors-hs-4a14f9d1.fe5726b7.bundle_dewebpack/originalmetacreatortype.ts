/**
 * Product metadata management system
 * Handles 3D models, materials, assemblies, and related product data
 */

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

export const AttributeIds = Object.freeze({
  CouponTypes: "55d5456e-a5d9-4725-970d-1404f8a8f6ab",
  ProductStyle: "9221463d-18ca-4b63-b09b-a2000585a00b"
});

export const CategoryTypes = Object.freeze({
  Color: "color",
  Floor: "floor",
  Tile: "tile",
  Ceiling: "ceiling",
  CeilingTile: "ceilingtile",
  WallPaper: "wallpaper",
  Marble: "marble",
  Mosaic: "mosaic",
  Baseboard: "molding_baseboard",
  Cornice: "molding_cornice",
  CurtainCloth: "curtaincloth",
  MyRecent: "myrecent",
  MyFavorites: "myfavorites",
  // ... (other category types)
});

export const ProductTypes = Object.freeze({
  Unknown: "Unknown",
  Assembly: "Assembly",
  Model: "3D",
  Profile: "Profile",
  Material: "Wallpapers",
  PAssembly: "PAssembly",
  StylerTemplate: "StylerTemplate",
  FullRoom: "FullRoom",
  WallFaceAssembly: "WallFaceAssembly"
});

export const DefaultItemTypes = Object.freeze({
  Cornice: "cornice",
  CorniceMaterial: "corniceMaterial",
  Pocket: "pocket",
  Baseboard: "baseboard",
  BaseboardMaterial: "baseboardMaterial",
  DoorThreshold: "doorThreshold",
  CabinetDoor: "cabinetDoor",
  CabinetHandle: "cabinetHandle",
  CabinetCounterTop: "cabinetCounterTop",
  PaintMaterial: "paintMaterial"
});

export enum TexturePaveType {
  Tile = 0,
  Stretch = 1,
  Mirror = 2,
  NotSpecify = 3
}

export enum NodeType {
  BaseNode = 1,
  FlatMesh = 2,
  PresetModel = 3
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const UNIT_CONVERSION: Record<string, number> = {
  feet: 0.3048,
  ft: 0.3048,
  inches: 0.0254,
  in: 0.0254,
  cm: 0.01,
  m: 1,
  km: 1000,
  mm: 0.001
};

export class Util {
  static convertToMeter(unit: string, value: number): number {
    return Number(value) * UNIT_CONVERSION[unit.toLowerCase()];
  }

  static getAttribute<T = string>(
    product: any,
    attributeName: string,
    returnType: 'string' | 'bool' | 'number' | 'array' | 'json' = 'string',
    defaultValue?: T
  ): T {
    const attributes = product?.attributes;
    if (!attributes || !attributeName) return defaultValue as T;

    for (const attr of attributes) {
      if (attr && attributeName === attr.name) {
        let rawValue: any;

        if (attr.values?.length > 0) {
          const values = attr.values;
          switch (returnType) {
            case 'array':
              rawValue = values;
              break;
            default:
              rawValue = values[0]?.value;
          }
        } else {
          rawValue = attr.free;
        }

        if (rawValue === undefined) return defaultValue as T;

        return this.parseAttributeValue(rawValue, returnType) as T;
      }
    }

    return defaultValue as T;
  }

  private static parseAttributeValue(value: any, type: string): any {
    switch (type) {
      case 'bool':
        return value.toString().toLowerCase() === 'true';
      case 'number':
        const num = Number(value);
        return isNaN(num) ? undefined : num;
      case 'json':
        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      default:
        return value;
    }
  }

  static base64Decode(encoded: string): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(encoded, 'base64').toString();
    }
    const decoded = atob(encoded)
      .split('')
      .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
      .join('');
    return decodeURIComponent(decoded);
  }

  static deepClone<T>(obj: T, visited = new WeakSet()): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (visited.has(obj)) return obj; // Circular reference protection
    
    visited.add(obj);
    
    const clone: any = Array.isArray(obj) ? [] : {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = this.deepClone(obj[key], visited);
      }
    }
    
    return clone;
  }
}

// ============================================================================
// CONTENT TYPE
// ============================================================================

export class ContentType {
  private types: string[];

  constructor(typeString: string | string[]) {
    this.types = [];
    this.initialize(typeString);
  }

  private initialize(input: string | string[]): void {
    if (typeof input === 'string' && input.length > 0) {
      this.types = input.trim().split('/');
    } else if (Array.isArray(input) && input.length > 0) {
      if (input.every(item => typeof item === 'string')) {
        this.types = input;
      }
    }
  }

  isTypeOf(matcher: string | RegExp | Array<string | RegExp>): boolean {
    const matches = (pattern: string | RegExp): boolean => {
      if (typeof pattern === 'string') {
        return this.types.includes(pattern);
      }
      if (pattern instanceof RegExp) {
        return this.types.some(type => pattern.test(type));
      }
      return false;
    };

    if (Array.isArray(matcher)) {
      return matcher.some(matches);
    }
    return matches(matcher);
  }

  getTypeString(): string {
    return this.types.join('/');
  }

  isSame(other: ContentType): boolean {
    return this.getTypeString() === other.getTypeString();
  }
}

// ============================================================================
// EXTENSION
// ============================================================================

export class Extension {
  private references: any[];
  private t3dObjectInfo: any;
  private objectInfo: any;
  private seekId: string;

  constructor(references: any[], extension: any, seekId: string) {
    this.references = references;
    this.t3dObjectInfo = extension.t3dObjInfo;
    this.objectInfo = extension.objInfo;
    this.seekId = seekId;
  }

  get objInfo(): any {
    return this.t3dObjectInfo ?? this.objectInfo;
  }

  toJSON(): object {
    return {
      references: this.references,
      t3dObjInfo: this.t3dObjectInfo,
      objInfo: this.objectInfo
    };
  }
}

// ============================================================================
// BASE META CLASS
// ============================================================================

export class Meta {
  id: string = "";
  seekId: string = "";
  name: string = "";
  unit: string = "cm";
  productType: string = ProductTypes.Unknown;
  contentType: ContentType = new ContentType("unknown");
  thumbnail: string = "";
  images: string[] = [];
  iconSmallURI: string = "";
  iconLargeURI: string = "";
  categories: string[] = [];
  families: string[] = [];
  userFreeData: Record<string, any> = {};
  isUserProduct: boolean = false;
  vendor: string = "";
  vendorUrl: string = "";
  productURL?: string;
  price?: string;
  dimension?: string;
  attributes: any[] = [];
  extendedFields: Record<string, any> = {};
  extension?: Extension;

  protected load(data: any): this {
    Object.assign(this, this.transformData(data));
    this.seekId = this.seekId || this.id;
    this.defineExtendedFields(this.extendedFields);
    return this;
  }

  private transformData(data: any): any {
    const transform = (key: string, value: any): any => {
      switch (key) {
        case 'contentType':
          return new ContentType(
            value && typeof value !== 'string' ? value._types : value
          );
        case 'extension':
          return value ? new Extension(value.references, value, data.id) : undefined;
        default:
          return value;
      }
    };

    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      const transformed = transform(key, value);
      if (transformed !== undefined) {
        result[key] = transformed;
      }
    }
    return result;
  }

  toJSON(): object {
    const extendedKeys = Object.keys(this.extendedFields);
    const result: any = {};

    for (const [key, value] of Object.entries(this)) {
      if (extendedKeys.includes(key)) continue;

      switch (key) {
        case 'contentType':
          result[key] = value?.getTypeString?.() ?? value;
          break;
        case 'extension':
          result[key] = value instanceof Extension ? value.toJSON() : value;
          break;
        case 'userFreeData':
          if (value && typeof value === 'object' && Object.keys(value).length > 0) {
            result[key] = value;
          }
          break;
        default:
          result[key] = value;
      }
    }

    return result;
  }

  clone(): this {
    const CloneClass = this.constructor as new () => this;
    const cloned = new CloneClass();
    const jsonData = this.toJSON();
    return cloned.load(jsonData);
  }

  private defineExtendedFields(fields: Record<string, any>): void {
    for (const [key, value] of Object.entries(fields)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return this.extendedFields[key];
        },
        set(newValue: any) {
          console.warn(`Modifying meta field: ${key}`);
          this.extendedFields[key] = newValue;
        }
      });
    }
  }

  static create(data: any): Meta {
    const instance = new Meta();
    return instance.load(data);
  }
}

// ============================================================================
// SPECIALIZED META CLASSES
// ============================================================================

export class MaterialMeta extends Meta {
  tileSize_x: number = 0;
  tileSize_y: number = 0;
  textureUrl: string = "";
  color: number = 0xFFFFFF;
  normalTexture?: string;
  isTransparent: boolean = false;

  static override create(data: any): MaterialMeta {
    const instance = new MaterialMeta();
    return instance.load(data);
  }
}

export class ContentMeta extends Meta {
  XLength: number = 0;
  YLength: number = 0;
  ZLength: number = 0;
  modelTexture: string = "";
  model3d: string = "";
  isScalable: boolean = false;
  model: Record<string, any> = {};

  static override create(data: any): ContentMeta {
    const instance = new ContentMeta();
    return instance.load(data);
  }
}

export class AssemblyMeta extends Meta {
  defaultHeight: number = 0;
  ungroupable: boolean = true;
  products: any[] = [];
  groups: any[] = [];
  productDataById: Record<string, Meta> = {};

  static override create(data: any): AssemblyMeta {
    const instance = new AssemblyMeta();
    return instance.load(data);
  }
}

// ============================================================================
// META MANAGER (Singleton)
// ============================================================================

export class MetaManager {
  private static _instance: MetaManager;
  private buildingCache = new Map<string, Meta>();
  private buildingPromises = new Map<string, Promise<Meta>>();

  private constructor() {}

  static instance(): MetaManager {
    if (!MetaManager._instance) {
      MetaManager._instance = new MetaManager();
    }
    return MetaManager._instance;
  }

  async buildProductMeta(data: any): Promise<Meta> {
    if (!data?.id) {
      throw new Error('Invalid product data: missing id');
    }

    const cached = this.buildingCache.get(data.id);
    if (cached) return cached;

    const meta = Meta.create(data);
    this.buildingCache.set(data.id, meta);
    return meta;
  }

  getCachedMeta(id: string): Meta | undefined {
    return this.buildingCache.get(id);
  }

  clearCache(id: string): void {
    this.buildingCache.delete(id);
    this.buildingPromises.delete(id);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const VERSION = "0.1.73";

export {
  ProductTypes as ProductTypeEnum,
  CategoryTypes as CategoryTypeEnum,
  DefaultItemTypes as DefaultItemTypeEnum
};