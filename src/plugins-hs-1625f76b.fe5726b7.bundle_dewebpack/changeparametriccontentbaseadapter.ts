import { HSCatalog } from './catalog';
import { HSApp } from './app';
import { EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE, EN_PROPERTY_PANEL_CONTENT_TYPE } from './constants';

interface ParametricNode {
  type: 'PROFILE' | 'MATERIIAL' | string;
  value: string;
}

interface SceneConfig {
  sceneType: string;
  parentModelId?: string;
  eId?: string;
  categoryId?: string;
  getFrontCategoryId?: () => string;
  customizedTabs?: unknown;
}

interface CatalogConfig {
  types?: HSCatalog.CategoryTypeEnum[];
  sceneType: string;
  mydata?: {
    modelSearchFilter?: {
      sceneType: string;
    };
    types?: HSCatalog.CategoryTypeEnum[];
  };
  customerCategories?: unknown[];
  query?: {
    categoryId?: string;
    seekId: string;
  };
  customizedTabs?: unknown;
  notFilter?: boolean;
  parentModelId?: string;
  eId?: string;
  getFrontCategoryId?: () => string;
}

interface Product {
  seekId: string;
  categories: string[];
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionRequest {
  receive(event: string, data: unknown): void;
}

interface PluginContext {
  transManager: TransactionManager;
}

interface ProductSelectedHandler {
  productSelectedHandler: (product: Product, context: PluginContext) => Promise<void>;
}

type AdapterResult = [CatalogConfig, ProductSelectedHandler] | [CatalogConfig, ProductSelectedHandler, string];

export function ChangeParametricContentBaseAdapter(
  params: [unknown, ParametricNode, SceneConfig]
): AdapterResult {
  const elementId = params[0];
  const node = params[1];
  const config = params[2];

  const app = HSApp.App.getApp();
  let catalogConfig: CatalogConfig;
  let categoryId: string;

  switch (node.type) {
    case 'PROFILE': {
      catalogConfig = {
        types: [
          HSCatalog.CategoryTypeEnum.SC_Cornice,
          HSCatalog.CategoryTypeEnum.SC_Baseboard,
          HSCatalog.CategoryTypeEnum.SC_Top_Rail
        ],
        sceneType: HSApp.Catalog.DataConfig.SceneType.Cornice,
        mydata: {
          modelSearchFilter: {
            sceneType: HSApp.Catalog.DataConfig.SceneType.Cornice
          }
        },
        customerCategories: []
      };

      const product = app.catalogManager.getProductBySeekIdSync(node.value, undefined);
      categoryId =
        config.sceneType === 'hardcover_params_backdrop_profile' && product
          ? product.categories[0]
          : 'e8892a3a-a2d6-3b2e-a6ea-f5bece99a74e';

      catalogConfig.query = {
        categoryId,
        seekId: node.value
      };
      catalogConfig.sceneType = config.sceneType;
      catalogConfig.customizedTabs = config.customizedTabs;
      break;
    }

    case 'MATERIIAL': {
      categoryId = '07acf354-2510-4b4a-a584-3b6b6bd6d72e';
      catalogConfig = {
        notFilter: true,
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

      catalogConfig.query = {
        categoryId,
        seekId: node.value
      };
      catalogConfig.sceneType = config.sceneType;
      catalogConfig.parentModelId = config.parentModelId;
      catalogConfig.eId = config.eId;
      catalogConfig.customizedTabs = config.customizedTabs;
      break;
    }

    case EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE:
    case EN_PROPERTY_PANEL_CONTENT_TYPE: {
      catalogConfig = {
        notFilter: true,
        sceneType: config.sceneType,
        parentModelId: config.parentModelId,
        eId: config.eId,
        getFrontCategoryId: config.getFrontCategoryId,
        query: {
          seekId: node.value
        },
        customizedTabs: config.customizedTabs
      };

      if (config.categoryId) {
        catalogConfig.query.categoryId = config.categoryId;
      }
      break;
    }

    default:
      catalogConfig = {
        sceneType: config.sceneType,
        query: {
          seekId: node.value
        }
      };
  }

  const handlers: ProductSelectedHandler = {
    productSelectedHandler: async (product: Product, context: PluginContext): Promise<void> => {
      const transManager = context.transManager;
      const changeData = {
        node,
        newValue: product.seekId
      };

      await HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(product.seekId);

      const request = transManager.createRequest(HSFPConstants.RequestType.EditParametricContentBase, [
        elementId,
        'onValueChange',
        changeData
      ]);
      request.receive('onValueChange', changeData);
      transManager.commit(request);

      const contextualToolsPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools);
      if (contextualToolsPlugin) {
        contextualToolsPlugin.refresh(undefined, {
          refreshStatusBar: false
        });
      }

      const propertyBarPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.PropertyBar);
      if (propertyBarPlugin) {
        propertyBarPlugin.update();
      }
    }
  };

  if (node.type === 'MATERIIAL') {
    return [catalogConfig, handlers, '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd'];
  }

  return [catalogConfig, handlers];
}