import { HSCatalog } from './635589';
import { HSApp } from './518193';
import { IPropertybarUIComponentType } from './900079';
import { Message } from './500992';
import { MenuBuilder } from './160760';

interface MetaDate {
  seekId: string;
  categories: string[];
}

interface MetaInfo {
  subpartMetaDates: MetaDate[];
  dependentMetaDates: MetaDate[];
  subpartInfos: Map<string, unknown>;
}

interface Metadata {
  isFromEnterprise: boolean;
  categories: string[];
  aliModelId: string;
}

interface PropertyNode {
  value: string;
  type: string;
  limitType?: string;
  eId?: string;
}

interface ParametricOpeningEntity {
  metaInfo: MetaInfo;
  metadata: Metadata;
}

interface CatalogQuery {
  seekId?: string;
  categoryId?: string;
}

interface MyDataFilter {
  types: string[];
  modelSearchFilter: {
    sceneType: string;
  };
}

interface CatalogOptions {
  customerCategories: string[];
  isGetFilteredCategory?: boolean;
  query?: CatalogQuery;
  customizedTabs?: unknown;
  sceneType?: string;
  replaceScene?: string;
  types?: string;
  notFilter?: boolean;
  mydata?: MyDataFilter;
  categoryIds?: string[];
  parentModelId?: string;
  eId?: string;
}

interface Product {
  seekId: string;
  categories: string[];
  data?: MetaDate;
  depMates?: unknown;
}

interface TransactionManager {
  createRequest(type: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionRequest {
  receive(event: string, data: unknown): void;
  result?: unknown;
}

interface SelectionContext {
  transManager: TransactionManager;
}

interface ProductSelectedHandlers {
  productSelectedHandler: (product: Product, context: SelectionContext) => void;
}

type AdapterResult = [CatalogOptions, ProductSelectedHandlers] | [CatalogOptions, ProductSelectedHandlers, string];

const SCENE_TYPE_PRODUCT = "hardcover_params_backdrop_product";
const SCENE_TYPE_INNER = "hardcover_params_backdrop_inner";
const SCENE_TYPE_PROFILE = "hardcover_params_backdrop_profile";
const SCENE_TYPE_MATERIAL = "material";
const SCENE_TYPE_GENERAL = "general";
const MATERIAL_CATEGORY_ID = "20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd";
const SUCCESS_MESSAGE_DURATION = 4000;
const WARNING_MESSAGE_DURATION = 5000;

const LIMIT_TYPE_INTERVAL = "INTERVAL";
const LIMIT_TYPE_OPTIONS = "OPTIONS";

export function ChangeParametricOpeningMetaAdapter(
  params: [ParametricOpeningEntity, PropertyNode]
): AdapterResult {
  const [entity, propertyNode] = params;
  
  const app = HSApp.App.getApp();
  const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
  
  let materialCategoryId: string | undefined;
  
  let metaDate = entity.metaInfo.subpartMetaDates.find(
    (item) => item.seekId === propertyNode.value
  );
  
  if (!metaDate) {
    metaDate = entity.metaInfo.dependentMetaDates.find(
      (item) => item.seekId === propertyNode.value
    );
  }
  
  const metadata = entity.metadata;
  const isFromEnterprise = metadata.isFromEnterprise;
  
  let sceneType = SCENE_TYPE_PRODUCT;
  let catalogOptions: CatalogOptions;
  
  switch (propertyNode.type) {
    case "WIN_SUB_PART":
    case "CONTENT_PART":
      sceneType = isFromEnterprise ? SCENE_TYPE_INNER : "";
      catalogOptions = {
        customerCategories: [],
        isGetFilteredCategory: true,
        query: {
          seekId: metaDate?.seekId,
          categoryId: metaDate?.categories[0]
        },
        customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entity),
        sceneType: sceneType,
        replaceScene: SCENE_TYPE_GENERAL
      };
      break;
      
    case "PROFILE":
      sceneType = isFromEnterprise ? SCENE_TYPE_PROFILE : "";
      catalogOptions = {
        types: HSCatalog.CategoryTypeEnum.ext_opening_pocket,
        customerCategories: [],
        query: {
          seekId: propertyNode.value
        },
        customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entity),
        sceneType: sceneType
      };
      break;
      
    case "MATERIIAL":
      sceneType = SCENE_TYPE_MATERIAL;
      materialCategoryId = MATERIAL_CATEGORY_ID;
      catalogOptions = {
        notFilter: true,
        customerCategories: [catalogPlugin.PanelId.UploadModel],
        sceneType: isFromEnterprise ? HSApp.Catalog.DataConfig.SceneType.Material : "",
        customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entity),
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
      break;
      
    default:
      catalogOptions = {
        customerCategories: []
      };
  }
  
  const product = app.catalogManager.getProductBySeekIdSync(propertyNode.value, undefined);
  const limitType = propertyNode.limitType;
  
  if (isFromEnterprise) {
    Object.assign(catalogOptions, {
      customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entity)
    });
    
    if (sceneType) {
      Object.assign(catalogOptions, {
        sceneType: sceneType
      });
    }
    
    if (!limitType || (limitType !== LIMIT_TYPE_INTERVAL && limitType !== LIMIT_TYPE_OPTIONS)) {
      Object.assign(catalogOptions, {
        categoryIds: [metadata.categories[0]],
        query: {
          categoryId: product.categories[0]
        }
      });
    } else {
      Object.assign(catalogOptions, {
        parentModelId: metadata.aliModelId,
        eId: propertyNode.eId
      });
    }
  }
  
  const handlers: ProductSelectedHandlers = {
    productSelectedHandler: (selectedProduct: Product, context: SelectionContext) => {
      const transManager = context.transManager;
      let productData = selectedProduct;
      let changeValue: { node: PropertyNode; newValue: string };
      
      if (propertyNode.type === "WIN_SUB_PART") {
        if (!selectedProduct.data) {
          return;
        }
        
        productData = selectedProduct.data;
        changeValue = {
          node: propertyNode,
          newValue: productData.seekId
        };
        
        entity.metaInfo.subpartMetaDates.push(productData);
        entity.metaInfo.subpartInfos.set(productData.seekId, selectedProduct.depMates);
        
        const originalMetaDate = entity.metaInfo.subpartMetaDates.find(
          (item) => item.seekId === propertyNode.value
        );
        
        if (originalMetaDate && productData) {
          const originalWindowType = HSCatalog.Model.ParametricOpening.getWindowType(originalMetaDate);
          const newWindowType = HSCatalog.Model.ParametricOpening.getWindowType(productData);
          
          if (!_.isEqual(originalWindowType, newWindowType)) {
            const warningMessage = ResourceManager.getString("plugin_parametricopening_replace_type_differance");
            LiveHint.show(warningMessage, WARNING_MESSAGE_DURATION, undefined, {
              status: "warning"
            });
            return;
          }
        }
      } else {
        changeValue = {
          node: propertyNode,
          newValue: productData.seekId
        };
        entity.metaInfo.dependentMetaDates.push(productData);
      }
      
      const request = transManager.createRequest(
        HSFPConstants.RequestType.EditParametricOpening,
        [entity, "changeend", changeValue]
      );
      
      request.receive("changeend", changeValue);
      transManager.commit(request);
      
      if (
        request.result &&
        (propertyNode.type === IPropertybarUIComponentType.WIN_SUB_PART ||
         propertyNode.type === IPropertybarUIComponentType.MATERIIAL)
      ) {
        const successMessage = ResourceManager.getString("successfully_replace");
        Message.success(successMessage, {
          duration: SUCCESS_MESSAGE_DURATION
        });
      }
      
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
  
  return materialCategoryId
    ? [catalogOptions, handlers, materialCategoryId]
    : [catalogOptions, handlers];
}