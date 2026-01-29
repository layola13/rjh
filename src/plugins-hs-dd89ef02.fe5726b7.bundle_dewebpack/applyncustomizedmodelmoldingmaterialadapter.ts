import { HSCatalog } from './HSCatalog';

interface MaterialData {
  seekId: string;
}

interface Parameters {
  materialData?: MaterialData;
}

interface ModelItem {
  parameters?: Parameters;
}

interface FilterConfig {
  [key: string]: string;
}

interface CategoryFilter {
  categoryType: HSCatalog.CategoryTypeEnum;
  filters: FilterConfig;
}

interface QueryConfig {
  categoryId: string;
  seekId: string;
}

interface ModelSearchFilter {
  sceneType: string;
}

interface MyData {
  types: HSCatalog.CategoryTypeEnum[];
  modelSearchFilter: ModelSearchFilter;
}

interface AdapterConfig {
  notFilter: boolean;
  customerCategories: string[];
  sceneType: string;
  mydata: MyData;
  optionFilters?: CategoryFilter[];
  query?: QueryConfig;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface AppContext {
  signalPropertyBarRefresh: {
    dispatch(): void;
  };
}

interface ProductSelectedContext {
  transManager: TransactionManager;
  app: AppContext;
}

interface ProductSelectedHandler {
  productSelectedHandler(product: unknown, context: ProductSelectedContext): void;
}

type AdapterResult = [AdapterConfig, ProductSelectedHandler, string];

export function ApplyNCustomizedModelMoldingMaterialAdapter(
  input: ModelItem | ModelItem[]
): AdapterResult {
  const models = Array.isArray(input) ? input : [input];

  const config: AdapterConfig = {
    notFilter: true,
    customerCategories: [
      HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Catalog).PanelId.UploadModel
    ],
    sceneType: HSApp.Catalog.DataConfig.SceneType.Material,
    mydata: {
      types: [
        HSCatalog.CategoryTypeEnum.SC_Cornice,
        HSCatalog.CategoryTypeEnum.SC_Baseboard,
        HSCatalog.CategoryTypeEnum.SC_Top_Rail,
        HSCatalog.CategoryTypeEnum.SC_Cornice_Material
      ],
      modelSearchFilter: {
        sceneType: HSApp.Catalog.DataConfig.SceneType.Material
      }
    }
  };

  if (HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID) {
    const optionFilters: CategoryFilter[] = [
      {
        categoryType: HSCatalog.CategoryTypeEnum.Filter2D,
        filters: {}
      }
    ];
    optionFilters[0].filters[HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID] =
      HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_VALUE;
    config.optionFilters = optionFilters;
  }

  const parameters = models[0].parameters;
  if (parameters) {
    const materialData = parameters.materialData;
    if (materialData) {
      config.query = {
        categoryId: '07acf354-2510-4b4a-a584-3b6b6bd6d72e',
        seekId: materialData.seekId
      };
    }
  }

  const handler: ProductSelectedHandler = {
    productSelectedHandler(product: unknown, context: ProductSelectedContext): void {
      if (product) {
        const transManager = context.transManager;
        const request = transManager.createRequest(
          HSFPConstants.RequestType.ApplyNCustomizedModelMoldingMaterial,
          [models, product]
        );
        transManager.commit(request);
        context.app.signalPropertyBarRefresh.dispatch();
      }
    }
  };

  return [config, handler, '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd'];
}