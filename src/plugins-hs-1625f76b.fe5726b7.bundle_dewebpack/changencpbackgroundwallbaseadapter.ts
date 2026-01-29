import { HSCatalog } from './HSCatalog';
import { HSApp } from './HSApp';
import { MenuBuilder } from './MenuBuilder';

interface Node {
  type: 'PROFILE' | 'MATERIIAL';
  value: string;
}

interface SceneData {
  sceneType: string;
  parentModelId?: string;
  eId?: string;
}

interface CategoryQuery {
  categoryId: string;
  seekId: string;
}

interface ModelSearchFilter {
  sceneType: string;
}

interface MyData {
  modelSearchFilter: ModelSearchFilter;
  types?: HSCatalog.CategoryTypeEnum[];
}

interface CatalogConfig {
  types?: HSCatalog.CategoryTypeEnum[];
  sceneType: string;
  mydata: MyData;
  customerCategories: string[];
  query?: CategoryQuery;
  customizedTabs?: unknown[];
  notFilter?: boolean;
  parentModelId?: string;
  eId?: string;
}

interface Product {
  categories: string[];
}

interface TransactionRequest {
  receive(event: string, data: unknown): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Plugin {
  refresh?(options?: unknown, config?: { refreshStatusBar: boolean }): void;
  update?(): void;
}

interface ProductSelectionContext {
  transManager: TransactionManager;
}

interface ProductSelection {
  seekId: string;
}

type ProductSelectedHandler = (
  product: ProductSelection,
  context: ProductSelectionContext
) => Promise<void>;

interface CatalogHandlers {
  productSelectedHandler: ProductSelectedHandler;
}

type ChangeNCPBackgroundWallBaseAdapterResult = 
  | [CatalogConfig, CatalogHandlers]
  | [CatalogConfig, CatalogHandlers, string];

const DEFAULT_PROFILE_CATEGORY_ID = 'e8892a3a-a2d6-3b2e-a6ea-f5bece99a74e';
const DEFAULT_MATERIAL_CATEGORY_ID = '07acf354-2510-4b4a-a584-3b6b6bd6d72e';
const MATERIAL_PANEL_ID = '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd';
const HARDCOVER_BACKDROP_PROFILE_SCENE = 'hardcover_params_backdrop_profile';

export function ChangeNCPBackgroundWallBaseAdapter(
  params: [string, Node, SceneData]
): ChangeNCPBackgroundWallBaseAdapterResult {
  const [entityId, node, sceneData] = params;
  const app = HSApp.App.getApp();
  const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);

  let config: CatalogConfig;
  let categoryId: string;

  switch (node.type) {
    case 'PROFILE': {
      config = {
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

      const product: Product | undefined = app.catalogManager.getProductBySeekIdSync(
        node.value,
        undefined
      );

      categoryId =
        sceneData.sceneType === HARDCOVER_BACKDROP_PROFILE_SCENE && product
          ? product.categories[0]
          : DEFAULT_PROFILE_CATEGORY_ID;

      config.query = {
        categoryId,
        seekId: node.value
      };
      config.sceneType = sceneData.sceneType;
      config.customizedTabs = MenuBuilder.getInstance().getEnterpriseTabData(entityId);
      break;
    }

    case 'MATERIIAL': {
      categoryId = DEFAULT_MATERIAL_CATEGORY_ID;

      config = {
        notFilter: true,
        customerCategories: [catalogPlugin.PanelId.UploadModel],
        sceneType: HSApp.Catalog.DataConfig.SceneType.Material,
        customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entityId),
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

      config.query = {
        categoryId,
        seekId: node.value
      };
      config.sceneType = sceneData.sceneType;
      config.parentModelId = sceneData.parentModelId;
      config.eId = sceneData.eId;
      config.customizedTabs = MenuBuilder.getInstance().getEnterpriseTabData(entityId);
      break;
    }
  }

  const handlers: CatalogHandlers = {
    productSelectedHandler: async (
      product: ProductSelection,
      context: ProductSelectionContext
    ): Promise<void> => {
      const { transManager } = context;
      
      const changeData = {
        node,
        newValue: product.seekId
      };

      const request = transManager.createRequest(
        HSFPConstants.RequestType.EditNCPBackgroundWallBase,
        [entityId, 'onValueChange', changeData]
      );

      request.receive('onValueChange', changeData);
      transManager.commit(request);

      const contextualToolsPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.ContextualTools
      );
      contextualToolsPlugin?.refresh?.(undefined, { refreshStatusBar: false });

      const propertyBarPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.PropertyBar
      );
      propertyBarPlugin?.update?.();
    }
  };

  return node.type === 'MATERIIAL'
    ? [config, handlers, MATERIAL_PANEL_ID]
    : [config, handlers];
}