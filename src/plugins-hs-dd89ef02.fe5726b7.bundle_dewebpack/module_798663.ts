export enum MoldingTypeEnum {
  Baseboard = 'Baseboard',
  WallBoardBaseboard = 'WallBoardBaseboard',
  WallBoardWaistLine = 'WallBoardWaistLine'
}

export enum CategoryTypeEnum {
  ext_baseboard_material = 'ext_baseboard_material',
  Filter2D = 'Filter2D'
}

export enum SceneType {
  Material = 'Material'
}

export enum PluginType {
  Catalog = 'Catalog',
  ContextualTools = 'ContextualTools',
  PropertyBar = 'PropertyBar'
}

export enum RequestType {
  ChangeMoldingTexture = 'ChangeMoldingTexture'
}

interface Material {
  seekId: string;
}

interface Molding {
  material: Material;
}

interface Wall {
  getMolding(moldingType: MoldingTypeEnum): Molding[];
}

interface Product {
  seekId?: string;
}

interface FilterOption {
  categoryType: CategoryTypeEnum;
  filters: Record<string, string>;
}

interface CatalogOptions {
  types: CategoryTypeEnum;
  customerCategories: string[];
  sceneType: SceneType;
  seekId?: string;
  optionFilters?: FilterOption[];
}

interface TransactionRequest {
  type: RequestType;
  params: unknown[];
}

interface TransactionManager {
  createRequest(type: RequestType, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest, skipHistory?: boolean): void;
}

interface CatalogPlugin {
  PanelId: {
    UploadModel: string;
  };
}

interface ContextualToolsPlugin {
  refresh(target: unknown, options: { refreshStatusBar: boolean }): void;
}

interface PropertyBarPlugin {
  update(): void;
}

interface PluginManager {
  getPlugin(pluginType: PluginType.Catalog): CatalogPlugin;
  getPlugin(pluginType: PluginType.ContextualTools): ContextualToolsPlugin | undefined;
  getPlugin(pluginType: PluginType.PropertyBar): PropertyBarPlugin | undefined;
}

interface App {
  pluginManager: PluginManager;
  transManager: TransactionManager;
}

interface PartnerConfig {
  PRODUCTS_IS_2D_MODEL_ATTR_ID?: string;
  PRODUCTS_IS_2D_MODEL_ATTR_VALUE?: string;
}

interface ProductSelectedHandlerContext {
  transManager: TransactionManager;
}

interface ProductSelectedHandler {
  productSelectedHandler(product: Product, context: ProductSelectedHandlerContext): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  PartnerConfig: PartnerConfig;
};

const MOLDING_TYPE_TO_CATEGORY_MAP: Record<MoldingTypeEnum, CategoryTypeEnum> = {
  [MoldingTypeEnum.Baseboard]: CategoryTypeEnum.ext_baseboard_material,
  [MoldingTypeEnum.WallBoardBaseboard]: CategoryTypeEnum.ext_baseboard_material,
  [MoldingTypeEnum.WallBoardWaistLine]: CategoryTypeEnum.ext_baseboard_material
};

export const changeMoldingTextureAdapter = (
  params: [Wall | Wall[], MoldingTypeEnum?]
): [CatalogOptions, ProductSelectedHandler] => {
  const app = HSApp.App.getApp();
  const catalogPlugin = app.pluginManager.getPlugin(PluginType.Catalog);
  
  const walls = params[0];
  const moldingType = params[1] ?? MoldingTypeEnum.Baseboard;
  
  const catalogOptions: CatalogOptions = {
    types: MOLDING_TYPE_TO_CATEGORY_MAP[moldingType],
    customerCategories: [catalogPlugin.PanelId.UploadModel],
    sceneType: SceneType.Material
  };
  
  if (HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID) {
    const filterOptions: FilterOption[] = [{
      categoryType: CategoryTypeEnum.Filter2D,
      filters: {}
    }];
    
    filterOptions[0].filters[HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID] = 
      HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_VALUE ?? '';
    
    catalogOptions.optionFilters = filterOptions;
  }
  
  const handler: ProductSelectedHandler = {
    productSelectedHandler(product: Product, context: ProductSelectedHandlerContext): void {
      const wallList: Wall[] = Array.isArray(walls) ? walls : [walls];
      
      for (let index = 0; index < wallList.length; index++) {
        const wall = wallList[index];
        const skipHistory = index > 0;
        const request = context.transManager.createRequest(
          RequestType.ChangeMoldingTexture,
          [product, wall, moldingType]
        );
        context.transManager.commit(request, skipHistory);
      }
      
      const currentApp = HSApp.App.getApp();
      const contextualToolsPlugin = currentApp?.pluginManager.getPlugin(PluginType.ContextualTools);
      
      if (contextualToolsPlugin) {
        contextualToolsPlugin.refresh(undefined, {
          refreshStatusBar: false
        });
      }
      
      const propertyBarPlugin = currentApp.pluginManager.getPlugin(PluginType.PropertyBar);
      
      if (propertyBarPlugin) {
        propertyBarPlugin.update();
      }
    }
  };
  
  const wallArray = Array.isArray(walls) ? walls : [walls];
  const hasSeekId = wallArray.some((wall: Wall): boolean => {
    if (!wall) {
      return false;
    }
    
    const moldings = wall.getMolding(moldingType);
    
    if (moldings && moldings.length > 0) {
      const material = moldings[0].material;
      catalogOptions.seekId = material.seekId;
      return true;
    }
    
    return false;
  });
  
  return [catalogOptions, handler];
};