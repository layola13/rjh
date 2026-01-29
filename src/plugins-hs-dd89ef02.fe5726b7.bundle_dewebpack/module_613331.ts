import { HSCore } from './635589';

const MOLDING_TYPE_TO_CATEGORY_MAP: Record<HSCore.Model.MoldingTypeEnum, HSCatalog.CategoryTypeEnum> = {
  [HSCore.Model.MoldingTypeEnum.Baseboard]: HSCatalog.CategoryTypeEnum.ext_baseboard_material,
  [HSCore.Model.MoldingTypeEnum.WallBoardBaseboard]: HSCatalog.CategoryTypeEnum.ext_baseboard_material,
  [HSCore.Model.MoldingTypeEnum.WallBoardWaistLine]: HSCatalog.CategoryTypeEnum.ext_baseboard_material,
};

interface CatalogOptions {
  notFilter: boolean;
  customerCategories: string[];
  sceneType: HSApp.Catalog.DataConfig.SceneType;
  optionFilters?: Array<{
    categoryType: HSCatalog.CategoryTypeEnum;
    filters: Record<string, string>;
  }>;
  query?: {
    categoryId: string;
    seekId: string;
  };
}

interface ProductSelectedHandlers {
  productSelectedHandler: (product: unknown, appContext: HSApp.App) => void;
}

type ChangeMoldingTextureAdapterParams = [
  target: HSCore.Model.Face | unknown,
  parameter1: unknown,
  moldingType?: HSCore.Model.MoldingTypeEnum,
  molding?: HSCore.Model.Molding
];

type ChangeMoldingTextureAdapterResult = [
  CatalogOptions,
  ProductSelectedHandlers,
  string
];

export function changeMoldingTextureAdapter(
  params: ChangeMoldingTextureAdapterParams
): ChangeMoldingTextureAdapterResult {
  const app = HSApp.App.getApp();
  const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
  
  const target = params[0];
  const parameter1 = params[1];
  const moldingType = params[2] ?? HSCore.Model.MoldingTypeEnum.Baseboard;
  
  const catalogOptions: CatalogOptions = {
    notFilter: true,
    customerCategories: [catalogPlugin.PanelId.UploadModel],
    sceneType: HSApp.Catalog.DataConfig.SceneType.Material,
  };

  if (HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID) {
    const optionFilters = [{
      categoryType: HSCatalog.CategoryTypeEnum.Filter2D,
      filters: {} as Record<string, string>,
    }];
    
    optionFilters[0].filters[HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID] = 
      HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_VALUE;
    
    catalogOptions.optionFilters = optionFilters;
  }

  const moldings = params[3] 
    ? [params[3]] 
    : target instanceof HSCore.Model.Face 
      ? target.getMolding(moldingType) 
      : [];
  
  const currentMolding = moldings[0];

  if (currentMolding?.material) {
    const categoryId = currentMolding.material.metadata?.categories?.[0] ?? '';
    
    catalogOptions.query = {
      categoryId,
      seekId: currentMolding.material.seekId,
    };
  }

  const handlers: ProductSelectedHandlers = {
    productSelectedHandler(product: unknown, appContext: HSApp.App): void {
      const transactionSession = appContext.transManager.startSession();
      
      moldings.forEach((molding) => {
        const request = appContext.transManager.createRequest(
          HSFPConstants.RequestType.ChangeFaceMoldingTexture,
          [product, target, parameter1, moldingType, molding]
        );
        appContext.transManager.commit(request);
      });
      
      transactionSession.commit();

      const contextualToolsPlugin = app?.pluginManager.getPlugin(
        HSFPConstants.PluginType.ContextualTools
      );
      contextualToolsPlugin?.refresh(undefined, {
        refreshStatusBar: false,
      });

      const propertyBarPlugin = app?.pluginManager.getPlugin(
        HSFPConstants.PluginType.PropertyBar
      );
      propertyBarPlugin?.update();
    },
  };

  return [
    catalogOptions,
    handlers,
    '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd',
  ];
}