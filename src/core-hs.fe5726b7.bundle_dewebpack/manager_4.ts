import type { Logger } from './Logger';

interface MaterialTypeEnum {
  spreadCustomTiles: string;
  dwgCustomTiles: string;
}

interface MaterialProcess {
  checkMaterial: (material: MaterialData) => boolean;
  generateImage: (material: MaterialData) => Promise<string>;
}

interface SeamedImageProcess {
  checkMaterial: (material: MaterialData) => boolean;
  generateImage: (material: MaterialData) => Promise<string>;
}

interface BoundaryProcess {
  checkMaterial: (material: MaterialData) => boolean;
  getBoundary: (material: MaterialData) => unknown;
}

interface InnerPathsProcess {
  checkMaterial: (material: MaterialData) => boolean;
  getInnerPaths: (material: MaterialData) => unknown;
}

interface IsRectangleProcess {
  checkMaterial: (material: MaterialData) => boolean;
  isRectangle: (material: MaterialData) => boolean;
}

interface NeedToChangeDataURLProcess {
  checkMaterial: (material: MaterialData) => boolean;
}

interface TypeNameProcess {
  checkMaterial: (material: MaterialData) => string | null;
}

interface InternalPathsProcess {
  checkMaterial: (material: MaterialData) => boolean;
  getInnerPaths: (material: MaterialData) => unknown;
}

interface PostProcess {
  checkMaterial: (material: MaterialData) => boolean;
  postProcessMaterial: (material: MaterialData) => void;
}

interface DefaultOffsetProcess {
  checkMaterial: (material: MaterialData) => boolean;
  getDefaultOffset: (material: MaterialData) => unknown;
}

interface AreaSeekProcess {
  checkMaterial: (material: MaterialData) => boolean;
  getAreaAndSeekId: (material: MaterialData) => Record<string, number>;
}

interface MaterialData {
  textureURI?: string;
  textureURIDefault?: boolean;
  seekId?: string;
  productType?: string;
}

interface ProductMeta {
  seekId: string;
  productType: string;
}

interface ProcessConfig {
  check: (material: MaterialData) => boolean;
  do: (...args: any[]) => any;
}

declare const HSConstants: {
  Constants: {
    DEFAULT_WALL_MATERIAL: string;
    DEFAULT_FLOOR_MATERIAL: string;
    DEFAULT_WALL_WHITE_PAINT: string;
    DEFAULT_WALL_INNER_MATERIAL: string;
    DEFAULT_CEILING_MATERIAL: string;
  };
};

declare const HSCore: {
  Util: {
    CustomizedTile: {
      isCustomizedTilesMaterial: (material: MaterialData) => boolean;
      textureIsRectangle: (material: MaterialData) => boolean;
      getTextureBoundary: (material: MaterialData) => unknown;
      getDefaultOffset: (material: MaterialData) => unknown;
    };
    Url: {
      isDataUrl: (url: string) => boolean;
    };
  };
  Material: {
    MaterialData: {
      create: (data: string | undefined) => MaterialData | undefined;
    };
  };
};

declare const HSCatalog: {
  Manager: {
    instance: () => {
      getBuildingProductMeta: (seekId: string) => ProductMeta | undefined;
    };
  };
  ProductTypeEnum: {
    Material: string;
  };
};

export class Manager {
  private static _instance?: Manager;

  public readonly MaterialTypeEnum: MaterialTypeEnum;
  private readonly _materialProcess: Record<string, MaterialProcess>;
  private readonly _materialSeamedImageProcess: Record<string, SeamedImageProcess>;
  private readonly _materialBoundaryPathProcess: Record<string, BoundaryProcess>;
  private readonly _materialInnerPathsProcess: Record<string, InnerPathsProcess>;
  private readonly _materialIsRectangle: Record<string, IsRectangleProcess>;
  private readonly _materialNeedToChangeDataURL: Record<string, NeedToChangeDataURLProcess>;
  private readonly _materialTypeName: Record<string, TypeNameProcess>;
  private readonly _materialInnerPaths: Record<string, InternalPathsProcess>;
  private readonly _materialAreaSeek: Record<string, AreaSeekProcess>;
  private readonly _productsMap: Map<string, ProductMeta>;
  private readonly _materialPostProcess: Record<string, PostProcess>;
  private readonly _materialDefaultOffset: Record<string, DefaultOffsetProcess>;
  private readonly _handlers: Map<string, unknown>;
  private readonly _normalMapMaterialData: Map<string, unknown>;
  private readonly _defaultMaterialData: Map<string, string>;
  private readonly _patternMaterialData: Map<string, unknown>;

  constructor() {
    this.MaterialTypeEnum = {
      spreadCustomTiles: "spread_custom_tiles",
      dwgCustomTiles: "dwg_custom_tiles"
    };
    this._materialProcess = {};
    this._materialSeamedImageProcess = {};
    this._materialBoundaryPathProcess = {};
    this._materialInnerPathsProcess = {};
    this._materialIsRectangle = {};
    this._materialNeedToChangeDataURL = {};
    this._materialTypeName = {};
    this._materialInnerPaths = {};
    this._materialAreaSeek = {};
    this._productsMap = new Map();
    this._materialPostProcess = {};
    this._materialDefaultOffset = {};
    this._handlers = new Map();
    this._normalMapMaterialData = new Map();
    this._defaultMaterialData = new Map();
    this._patternMaterialData = new Map();
    
    this.registerDefaultMaterialData("DEFAULT_WALL_MATERIAL", HSConstants.Constants.DEFAULT_WALL_MATERIAL);
    this.registerDefaultMaterialData("DEFAULT_FLOOR_MATERIAL", HSConstants.Constants.DEFAULT_FLOOR_MATERIAL);
    this.registerDefaultMaterialData("DEFAULT_WALL_WHITE_PAINT", HSConstants.Constants.DEFAULT_WALL_WHITE_PAINT);
    this.registerDefaultMaterialData("DEFAULT_WALL_INNER_MATERIAL", HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL);
    this.registerDefaultMaterialData("DEFAULT_CEILING_MATERIAL", HSConstants.Constants.DEFAULT_CEILING_MATERIAL);
    this.registerCustomizedTileService();
  }

  private registerCustomizedTileService(): void {
    const serviceName = "hsw.plugin.customizedtiles";
    
    this.registerMaterialIsRectangleProcess(serviceName, {
      check: HSCore.Util.CustomizedTile.isCustomizedTilesMaterial,
      do: HSCore.Util.CustomizedTile.textureIsRectangle
    });
    
    this.registerMaterialBoundaryProcess(serviceName, {
      check: HSCore.Util.CustomizedTile.isCustomizedTilesMaterial,
      do: HSCore.Util.CustomizedTile.getTextureBoundary
    });
    
    this.registerMaterialGetDefaultOffsetProcess(serviceName, {
      check: HSCore.Util.CustomizedTile.isCustomizedTilesMaterial,
      do: HSCore.Util.CustomizedTile.getDefaultOffset
    });
  }

  public getMetaData(seekId: string): ProductMeta | undefined {
    let metadata = this._productsMap.get(seekId);
    if (!metadata) {
      metadata = HSCatalog.Manager.instance().getBuildingProductMeta(seekId);
    }
    return metadata;
  }

  public setMetaData(product: ProductMeta): void {
    if (product.productType === HSCatalog.ProductTypeEnum.Material) {
      this._productsMap.set(product.seekId, product);
    }
  }

  public getPatternMaterialData(key: string): unknown {
    return this._patternMaterialData.get(key);
  }

  public setPatternMaterialData(key: string, value: unknown): void {
    this._patternMaterialData.set(key, value);
  }

  public getMaterials(): Map<string, ProductMeta> {
    return this._productsMap;
  }

  public getImageFromMaterialData(material: MaterialData): Promise<string> {
    if (!material.textureURI) {
      return Promise.resolve("");
    }
    
    if (typeof material.textureURI === "string" && material.textureURI !== "") {
      return Promise.resolve(material.textureURI);
    }
    
    for (const key in this._materialProcess) {
      if (this._materialProcess[key].checkMaterial(material)) {
        return this._materialProcess[key].generateImage(material);
      }
    }
    
    return Promise.resolve("");
  }

  public getSeamedImageFromMaterialData(material: MaterialData): Promise<string> {
    if (!material.textureURI) {
      return Promise.resolve("");
    }
    
    if (material.textureURIDefault && typeof material.textureURI === "string" && material.textureURI !== "") {
      return Promise.resolve(material.textureURI);
    }
    
    for (const key in this._materialSeamedImageProcess) {
      if (this._materialSeamedImageProcess[key].checkMaterial(material)) {
        return this._materialSeamedImageProcess[key].generateImage(material);
      }
    }
    
    return Promise.resolve("");
  }

  public getBoundaryFromMaterialData(material: MaterialData): unknown {
    for (const key in this._materialBoundaryPathProcess) {
      if (this._materialBoundaryPathProcess[key].checkMaterial(material)) {
        return this._materialBoundaryPathProcess[key].getBoundary(material);
      }
    }
    return null;
  }

  public getInnerPathsFromMaterialData(material: MaterialData): unknown {
    for (const key in this._materialInnerPathsProcess) {
      if (this._materialInnerPathsProcess[key].checkMaterial(material)) {
        return this._materialInnerPathsProcess[key].getInnerPaths(material);
      }
    }
    return null;
  }

  public getIsRectangleFromMaterialData(material: MaterialData): boolean {
    for (const key in this._materialIsRectangle) {
      if (this._materialIsRectangle[key].checkMaterial(material)) {
        return this._materialIsRectangle[key].isRectangle(material);
      }
    }
    return true;
  }

  public isMaterialNeedToChangeDataURL(material: MaterialData): boolean {
    for (const key in this._materialNeedToChangeDataURL) {
      if (this._materialNeedToChangeDataURL[key].checkMaterial(material) && 
          typeof material.textureURI === "string" && 
          (material.textureURI === "" || HSCore.Util.Url.isDataUrl(material.textureURI))) {
        return true;
      }
    }
    return false;
  }

  public registerMaterialDataProcess(name: string, config: ProcessConfig): void {
    this._materialProcess[name] = this._materialProcess[name] || {} as MaterialProcess;
    this._materialProcess[name].checkMaterial = config.check;
    this._materialProcess[name].generateImage = config.do;
  }

  public registerSeamedImageProcess(name: string, config: ProcessConfig): void {
    this._materialSeamedImageProcess[name] = this._materialSeamedImageProcess[name] || {} as SeamedImageProcess;
    this._materialSeamedImageProcess[name].checkMaterial = config.check;
    this._materialSeamedImageProcess[name].generateImage = config.do;
  }

  public registerMaterialBoundaryProcess(name: string, config: ProcessConfig): void {
    this._materialBoundaryPathProcess[name] = this._materialBoundaryPathProcess[name] || {} as BoundaryProcess;
    this._materialBoundaryPathProcess[name].checkMaterial = config.check;
    this._materialBoundaryPathProcess[name].getBoundary = config.do;
  }

  public registerMaterialInnerPathsProcess(name: string, config: ProcessConfig): void {
    this._materialInnerPathsProcess[name] = this._materialInnerPathsProcess[name] || {} as InnerPathsProcess;
    this._materialInnerPathsProcess[name].checkMaterial = config.check;
    this._materialInnerPathsProcess[name].getInnerPaths = config.do;
  }

  public registerMaterialIsRectangleProcess(name: string, config: ProcessConfig): void {
    this._materialIsRectangle[name] = this._materialIsRectangle[name] || {} as IsRectangleProcess;
    this._materialIsRectangle[name].checkMaterial = config.check;
    this._materialIsRectangle[name].isRectangle = config.do;
  }

  public registerMaterialNeedToChangeDataURL(name: string, config: ProcessConfig): void {
    this._materialNeedToChangeDataURL[name] = this._materialNeedToChangeDataURL[name] || {} as NeedToChangeDataURLProcess;
    this._materialNeedToChangeDataURL[name].checkMaterial = config.check;
  }

  public registerMaterialTypeName(name: string, config: ProcessConfig): void {
    this._materialTypeName[name] = this._materialTypeName[name] || {} as TypeNameProcess;
    this._materialTypeName[name].checkMaterial = config.check;
  }

  public registerMaterialInternalPaths(name: string, config: ProcessConfig): void {
    this._materialInnerPaths[name] = this._materialInnerPaths[name] || {} as InternalPathsProcess;
    this._materialInnerPaths[name].checkMaterial = config.check;
    this._materialInnerPaths[name].getInnerPaths = config.do;
  }

  public registerPostProcessMaterialProcess(name: string, config: ProcessConfig): void {
    this._materialPostProcess[name] = this._materialPostProcess[name] || {} as PostProcess;
    this._materialPostProcess[name].checkMaterial = config.check;
    this._materialPostProcess[name].postProcessMaterial = config.do;
  }

  public registerMaterialGetDefaultOffsetProcess(name: string, config: ProcessConfig): void {
    this._materialDefaultOffset[name] = this._materialPostProcess[name] || {} as DefaultOffsetProcess;
    this._materialDefaultOffset[name].checkMaterial = config.check;
    this._materialDefaultOffset[name].getDefaultOffset = config.do;
  }

  /**
   * @deprecated Use getCustomizedMaterialDefaultOffset instead
   */
  public getCutomizedMaterialDefaultOffset(material: MaterialData): unknown {
    console.error("deprecated, use getCustomizedMaterialDefaultOffset instead!");
    return this.getCustomizedMaterialDefaultOffset(material);
  }

  public getCustomizedMaterialDefaultOffset(material: MaterialData): unknown {
    for (const key in this._materialDefaultOffset) {
      if (this._materialDefaultOffset[key].checkMaterial(material)) {
        return this._materialDefaultOffset[key].getDefaultOffset(material);
      }
    }
    return undefined;
  }

  public getMaterialTypeName(material: MaterialData): string | null {
    for (const key in this._materialTypeName) {
      if (this._materialTypeName[key].checkMaterial) {
        const result = this._materialTypeName[key].checkMaterial(material);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  public getMaterialInternalPaths(material: MaterialData): unknown {
    for (const key in this._materialInnerPaths) {
      if (this._materialInnerPaths[key].checkMaterial(material)) {
        return this._materialInnerPaths[key].getInnerPaths(material);
      }
    }
    return null;
  }

  public registerMaterialAreaAndSeekId(name: string, config: ProcessConfig): void {
    this._materialAreaSeek[name] = this._materialAreaSeek[name] || {} as AreaSeekProcess;
    this._materialAreaSeek[name].checkMaterial = config.check;
    this._materialAreaSeek[name].getAreaAndSeekId = config.do;
  }

  public getMaterialAreaSeekId(material: MaterialData): Record<string, number> | null {
    for (const key in this._materialAreaSeek) {
      if (this._materialAreaSeek[key].checkMaterial(material)) {
        return this._materialAreaSeek[key].getAreaAndSeekId(material);
      }
    }
    return null;
  }

  public getMaterialMainSeekId(material: MaterialData): string | undefined {
    let areaMap: Record<string, number> | undefined;
    let maxSeekId: string | null = null;
    let maxArea = -1;
    
    for (const key in this._materialAreaSeek) {
      if (this._materialAreaSeek[key].checkMaterial(material)) {
        areaMap = this._materialAreaSeek[key].getAreaAndSeekId(material);
        for (const seekId in areaMap) {
          if (areaMap.hasOwnProperty(seekId) && areaMap[seekId] > maxArea) {
            maxSeekId = seekId;
            maxArea = areaMap[seekId];
          }
        }
        return maxSeekId ?? undefined;
      }
    }
    return material.seekId;
  }

  public postProcessMaterial(material: MaterialData): void {
    for (const key in this._materialPostProcess) {
      if (this._materialPostProcess[key].checkMaterial(material)) {
        this._materialPostProcess[key].postProcessMaterial(material);
      }
    }
  }

  public getNormalMaterialData(key: string): unknown {
    return this._normalMapMaterialData.get(key);
  }

  public setNormalMaterialData(key: string, value: unknown): void {
    this._normalMapMaterialData.set(key, value);
  }

  public getDefaultMaterialData(key: string): MaterialData | undefined {
    return HSCore.Material.MaterialData.create(this._defaultMaterialData.get(key));
  }

  public registerDefaultMaterialData(key: string, value: string): void {
    this._defaultMaterialData.set(key, value);
  }

  public registerHandler(key: string, handler: unknown): void {
    this._handlers.set(key, handler);
  }

  public static instance(): Manager {
    if (!Manager._instance) {
      Manager._instance = new Manager();
    }
    return Manager._instance;
  }
}