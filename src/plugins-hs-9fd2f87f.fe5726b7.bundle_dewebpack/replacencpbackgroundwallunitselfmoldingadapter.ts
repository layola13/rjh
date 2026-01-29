import { Line3d, Coordinate3 } from './geometry';
import { HSApp } from './app';
import { HSCatalog } from './catalog';
import { MenuBuilder } from './menu-builder';

interface MoldingMetadata {
  seekId: string;
  categories: string[];
}

interface MoldingParameters {
  materialData: unknown;
}

interface MoldingAttribute {
  id: string;
  free: string[];
}

interface MoldingData {
  metadata: MoldingMetadata;
  moldingId: string;
  parameters: MoldingParameters;
  attributes: MoldingAttribute[];
  profileSizeX?: number;
  profileSizeY?: number;
}

interface UnitDimensions {
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface TransactionManager {
  createRequest(type: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface ProductSelectionContext {
  transManager: TransactionManager;
}

interface CatalogQueryConfig {
  types?: string[];
  sceneType?: string;
  mydata?: {
    types?: string[];
    modelSearchFilter?: {
      sceneType: string;
    };
  };
  customerCategories?: string[];
  query?: {
    categoryId: string;
    seekId: string;
  };
  customizedTabs?: unknown;
  notFilter?: boolean;
}

interface MoldingInfo {
  coord: Coordinate3;
  faceTag: string;
  flip: boolean;
  flipX: boolean;
  flipY: boolean;
  offsetX: number;
  offsetY: number;
  path: Line3d[];
  profileHeight: number;
  profileWidth: number;
  materialData: unknown;
  selfMoldingType: string;
  offset: number;
}

interface MoldingEditParams {
  moldingInfo: MoldingInfo;
  moldingType: string;
  meta: unknown;
}

interface ProductSelectionHandlers {
  productSelectedHandler: (product: unknown, context: ProductSelectionContext) => Promise<void>;
}

const DEFAULT_PROFILE_SIZE = 0.06;
const MATERIAL_CATEGORY_ID = '07acf354-2510-4b4a-a584-3b6b6bd6d72e';
const MATERIAL_SCENE_TYPE = '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd';
const OFFSET_ATTRIBUTE_ID = 'attr-attr-Offset';

type MoldingType = 'left' | 'right';
type OperationType = 'profile' | 'material';

export function ReplaceNCPBackgroundWallUnitSelfMoldingAdapter(
  params: [UnitDimensions, OperationType, MoldingData]
): [CatalogQueryConfig, ProductSelectionHandlers] | [CatalogQueryConfig, ProductSelectionHandlers, string] {
  const unit = params[0];
  const operationType = params[1];
  const moldingData = params[2];
  
  const seekId = moldingData.metadata.seekId;
  const moldingType = moldingData.moldingId.split('-')[1] as MoldingType;
  
  const app = HSApp.App.getApp();
  const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
  
  let catalogConfig: CatalogQueryConfig;
  let categoryId: string;
  
  switch (operationType) {
    case 'profile':
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
      
      categoryId = moldingData.metadata.categories[0];
      catalogConfig.query = {
        categoryId,
        seekId
      };
      catalogConfig.sceneType = 'hardcover_params_backdrop_profile';
      catalogConfig.customizedTabs = MenuBuilder.getInstance().getEnterpriseTabData(unit);
      break;
      
    case 'material':
      categoryId = MATERIAL_CATEGORY_ID;
      catalogConfig = {
        notFilter: true,
        customerCategories: [catalogPlugin.PanelId.UploadModel],
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
        seekId
      };
      catalogConfig.sceneType = 'material';
      catalogConfig.customizedTabs = MenuBuilder.getInstance().getEnterpriseTabData(unit);
      break;
  }
  
  const handlers: ProductSelectionHandlers = {
    productSelectedHandler: async (product: unknown, context: ProductSelectionContext): Promise<void> => {
      const transManager = context.transManager;
      
      let requestType: string | undefined;
      let materialData: unknown;
      let metadata: unknown;
      
      if (operationType === 'profile') {
        requestType = 'onSelfMoldingReplaceProfile';
        materialData = moldingData.parameters.materialData;
        metadata = product;
      } else if (operationType === 'material') {
        requestType = 'onSelfMoldingReplaceMaterial';
        materialData = HSCore.Material.Util.getMaterialData(product);
        metadata = moldingData.metadata;
      }
      
      if (!requestType || !materialData || !metadata) {
        return;
      }
      
      const offsetAttribute = (metadata as MoldingData).attributes.find(
        attr => attr.id === OFFSET_ATTRIBUTE_ID
      );
      const offset = offsetAttribute ? Number(offsetAttribute.free[0]) : 0;
      
      const { XSize: width, YSize: depth, ZSize: height } = unit;
      
      let pathLine: Line3d | undefined;
      let coordinate: Coordinate3 | undefined;
      
      if (moldingType === 'left') {
        pathLine = new Line3d(
          { x: -width / 2, y: -depth / 2, z: height },
          { x: -width / 2, y: -depth / 2, z: 0 }
        );
        coordinate = new Coordinate3(
          { x: -width / 2, y: -depth / 2, z: height },
          { x: 1, y: 0, z: 0 },
          { x: 0, y: -1, z: 0 }
        );
      } else if (moldingType === 'right') {
        pathLine = new Line3d(
          { x: width / 2, y: -depth / 2, z: 0 },
          { x: width / 2, y: -depth / 2, z: height }
        );
        coordinate = new Coordinate3(
          { x: width / 2, y: -depth / 2, z: height },
          { x: -1, y: 0, z: 0 },
          { x: 0, y: -1, z: 0 }
        );
      }
      
      if (!pathLine || !coordinate) {
        return;
      }
      
      const moldingInfo: MoldingInfo = {
        coord: coordinate,
        faceTag: '',
        flip: false,
        flipX: false,
        flipY: false,
        offsetX: 0,
        offsetY: 0,
        path: [pathLine],
        profileHeight: (metadata as MoldingData).profileSizeY ?? DEFAULT_PROFILE_SIZE,
        profileWidth: (metadata as MoldingData).profileSizeX ?? DEFAULT_PROFILE_SIZE,
        materialData,
        selfMoldingType: moldingType,
        offset
      };
      
      const editParams: MoldingEditParams = {
        moldingInfo,
        moldingType,
        meta: metadata
      };
      
      const request = transManager.createRequest(
        HSFPConstants.RequestType.EditNCPBackgroundWallUnitSelfMolding,
        [unit, requestType, editParams]
      );
      transManager.commit(request);
      
      const contextualToolsPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools);
      if (contextualToolsPlugin) {
        contextualToolsPlugin.refresh(undefined, { refreshStatusBar: false });
      }
      
      const propertyBarPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.PropertyBar);
      if (propertyBarPlugin) {
        propertyBarPlugin.update();
      }
    }
  };
  
  if (operationType === 'material') {
    return [catalogConfig, handlers, MATERIAL_SCENE_TYPE];
  }
  
  return [catalogConfig, handlers];
}