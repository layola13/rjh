import { HSCore } from '../path-to-hscore';

interface MoldingTypeMapping {
  [key: string]: string | string[];
}

interface QueryConfig {
  categoryId: string;
  seekId: string;
}

interface ModelSearchFilter {
  sceneType: number;
}

interface MyData {
  modelSearchFilter: ModelSearchFilter;
}

interface CatalogConfig {
  types: string | string[];
  customerCategories: unknown[];
  mydata: MyData;
  query?: QueryConfig;
}

interface ProfileMaterial {
  profile: unknown;
  material: unknown;
}

interface ProductSelectedParams {
  userFreeData?: {
    materialMeta?: {
      seekId: string;
    };
  };
}

interface ProductSelectedHandler {
  productSelectedHandler: (product: ProductSelectedParams, context: { transManager: unknown }) => boolean;
}

type ChangeMoldingTypeAdapterResult = [CatalogConfig, ProductSelectedHandler];

const moldingTypeMapping: MoldingTypeMapping = {};
moldingTypeMapping[HSCore.Model.MoldingTypeEnum.Baseboard] = HSCatalog.CategoryTypeEnum.ext_baseboard;
moldingTypeMapping[HSCore.Model.MoldingTypeEnum.Cornice] = HSCatalog.CategoryTypeEnum.ext_cornice;
moldingTypeMapping[HSCore.Model.MoldingTypeEnum.Mitre] = ["sc_mitre"];
moldingTypeMapping[HSCore.Model.MoldingTypeEnum.WallBoardBaseboard] = HSCatalog.CategoryTypeEnum.ext_baseboard;
moldingTypeMapping[HSCore.Model.MoldingTypeEnum.WallBoardWaistLine] = HSCatalog.CategoryTypeEnum.SC_Top_Rail;

export function changeMoldingTypeAdapter(params: unknown[]): ChangeMoldingTypeAdapterResult {
  const face = params[0];
  const moldingType = (params[2] as number) || HSCore.Model.MoldingTypeEnum.Baseboard;
  const molding = face instanceof HSCore.Model.Face ? face.getMolding(moldingType) : params[3];
  
  const catalogConfig: CatalogConfig = {
    types: moldingTypeMapping[moldingType],
    customerCategories: [],
    mydata: {
      modelSearchFilter: {
        sceneType: HSApp.Catalog.DataConfig.SceneType.Cornice
      }
    }
  };
  
  if (molding) {
    const categoryId = molding.metadata ? molding.metadata.categories[0] : "";
    catalogConfig.query = {
      categoryId: categoryId,
      seekId: molding.seekId
    };
  }
  
  const handlers: ProductSelectedHandler = {
    productSelectedHandler: (product: ProductSelectedParams, context: { transManager: unknown }): boolean => {
      let requestId = "";
      const app = HSApp.App.getApp();
      const transManager = context.transManager;
      const wallMoldingPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.WallMolding);
      
      const materialPromise = product.userFreeData?.materialMeta
        ? HSApp.App.getApp().catalogManager.getProductBySeekId(product.userFreeData.materialMeta.seekId)
        : wallMoldingPlugin.getDefaultMitreMaterial();
      
      materialPromise.then((material: unknown) => {
        const profileMaterial: ProfileMaterial = {
          profile: product,
          material: material
        };
        
        if (moldingType === HSCore.Model.MoldingTypeEnum.Mitre) {
          requestId = transManager.createRequest(HSFPConstants.RequestType.AddMiterMolding, [profileMaterial, molding.relatedFaceIds]);
          transManager.commit(requestId);
        } else {
          const selectedItems = app.selectionManager.selected();
          let moldingsToUpdate = face.getMolding(moldingType);
          
          if (selectedItems?.[0] instanceof HSCore.Model.Molding) {
            moldingsToUpdate = [selectedItems[0]];
          }
          
          const session = transManager.startSession();
          
          moldingsToUpdate.forEach((currentMolding: unknown) => {
            requestId = transManager.createRequest(HSFPConstants.RequestType.ChangeWallMoldingType, [profileMaterial, face, currentMolding, moldingType]);
            const commitResult = transManager.commit(requestId);
            
            if (moldingType === HSCore.Model.MoldingTypeEnum.Baseboard) {
              transManager.createRequest(HSFPConstants.RequestType.ChangeMoldingOffset, [commitResult]).receive("changeOffset", currentMolding.offset);
              transManager.commit(requestId);
            }
          });
          
          session.commit();
        }
        
        return true;
      }).then(() => {
        const contextualToolsPlugin = app?.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools);
        contextualToolsPlugin?.refresh(undefined, {
          refreshStatusBar: false
        });
        
        const propertyBarPlugin = app?.pluginManager.getPlugin(HSFPConstants.PluginType.PropertyBar);
        propertyBarPlugin?.update();
      });
      
      return true;
    }
  };
  
  return [catalogConfig, handlers];
}