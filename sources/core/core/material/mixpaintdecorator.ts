export interface FaceGroupBound {
  left: number;
  bottom: number;
  matrix?: Matrix3;
}

export interface FaceGroup {
  getPaveBoundingBox(key: string): THREE.Box2 | null;
  getFaceIds(): string[];
  faceGroupBoundMapLeftBottom: Record<string, FaceGroupBound>;
}

export interface BoundingBox {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
}

export interface Material {
  seekId: string;
}

export interface PatternUnit {
  materials: Material[];
}

export interface Pattern {
  patternUnits: PatternUnit[];
}

export interface FreeRegion {
  pattern: Pattern;
}

export interface MixPave {
  BBox: BoundingBox;
  regions?: unknown[];
}

export interface MixPaint {
  faceGroup: FaceGroup;
  mixPave: MixPave;
}

export interface BuildingProductMeta {
  contentType?: ContentType;
}

export interface ContentType {
  isTypeOf(type: unknown): boolean;
}

export interface Matrix3 {
  data: number[][];
}

export interface Vector2Like {
  x: number;
  y: number;
}

export interface FaceGroupOffsetResult {
  left: number;
  bottom: number;
  transform: Matrix3;
}

declare namespace HSCatalog {
  class MetaManager {
    static instance(): MetaManager;
    getBuildingProductMeta(seekId: string): BuildingProductMeta | null;
  }
  
  enum ContentTypeEnum {
    KitchenCeiling3d
  }
}

declare namespace THREE {
  class Vector2 {
    constructor(x: number, y: number);
  }
  
  class Box2 {
    constructor(min: Vector2, max: Vector2);
  }
}

declare namespace ServiceManager {
  function getPaveMiscService(): PaveMiscService;
  function getMixPaveService(): MixPaveService;
}

interface PaveMiscService {
  isRegionWithTemplate(region: unknown): boolean;
}

interface MixPaveService {
  forEachFreeRegion(
    mixPave: MixPave,
    callback: (region: FreeRegion, key: string | null) => void
  ): void;
  findFreeRegion(
    mixPave: MixPave,
    predicate: (region: FreeRegion) => boolean
  ): FreeRegion | null;
}

declare namespace Matrix3 {
  function makeTranslate(point: Vector2Like): Matrix3;
}

export class MixPaintDecorator {
  private mixpaint: MixPaint;

  constructor(mixpaint: MixPaint) {
    this.mixpaint = mixpaint;
  }

  private isGussetFreeRegion(region: FreeRegion): boolean {
    const patternUnit = region.pattern.patternUnits[0];
    const productMeta = HSCatalog.MetaManager.instance().getBuildingProductMeta(
      patternUnit.materials[0].seekId
    );
    const contentType = productMeta?.contentType;
    
    if (!contentType) {
      return false;
    }
    
    return contentType.isTypeOf(HSCatalog.ContentTypeEnum.KitchenCeiling3d);
  }

  isSimpleMixPaint(): boolean {
    const regions = this.mixpaint.mixPave.regions;
    
    if (!regions || regions.length === 0) {
      return true;
    }
    
    if (regions.length > 1) {
      return false;
    }
    
    return !ServiceManager.getPaveMiscService().isRegionWithTemplate(regions[0]);
  }

  getPaveBoundingBox(key: string = ""): THREE.Box2 {
    let boundingBox = this.mixpaint.faceGroup.getPaveBoundingBox(key);
    
    if (!boundingBox) {
      const bbox = this.mixpaint.mixPave.BBox;
      boundingBox = new THREE.Box2(
        new THREE.Vector2(bbox.min.x, bbox.min.y),
        new THREE.Vector2(bbox.max.x, bbox.max.y)
      );
    }
    
    return boundingBox;
  }

  findGussetModelRegions(): Map<string, FreeRegion[]> {
    const regionsMap = new Map<string, FreeRegion[]>();
    
    ServiceManager.getMixPaveService().forEachFreeRegion(
      this.mixpaint.mixPave,
      (region: FreeRegion, key: string | null) => {
        if (key && this.isGussetFreeRegion(region)) {
          const existingRegions = regionsMap.get(key);
          
          if (existingRegions) {
            existingRegions.push(region);
          } else {
            regionsMap.set(key, [region]);
          }
        }
      }
    );
    
    return regionsMap;
  }

  hasGussetModelRegions(): boolean {
    return !!ServiceManager.getMixPaveService().findFreeRegion(
      this.mixpaint.mixPave,
      this.isGussetFreeRegion.bind(this)
    );
  }

  getFaceGroupOffset(faceId: string): FaceGroupOffsetResult | undefined {
    if (!this.mixpaint) {
      return undefined;
    }
    
    if (!this.mixpaint.faceGroup.getFaceIds().includes(faceId)) {
      return undefined;
    }
    
    const bound = this.mixpaint.faceGroup.faceGroupBoundMapLeftBottom[faceId];
    
    if (!bound) {
      return undefined;
    }
    
    if (bound.matrix) {
      return {
        left: bound.matrix.data[2][0],
        bottom: bound.matrix.data[2][1],
        transform: bound.matrix
      };
    }
    
    const transform = Matrix3.makeTranslate({
      x: bound.left,
      y: bound.bottom
    });
    
    return {
      left: bound.left,
      bottom: bound.bottom,
      transform
    };
  }
}