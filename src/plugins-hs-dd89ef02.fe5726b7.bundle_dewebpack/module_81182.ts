import { HSCatalog, HSCore } from './catalog-types';
import { ContentType } from './content-type';

interface MoldingFeature {
  parameters: MoldingParameters;
  contentType: ContentType;
  path: string;
  getUniqueParent(): unknown;
}

interface MoldingParameters {
  seekId?: string;
  contentType?: string;
  offsetX?: number;
  profileHeight?: number;
  profileWidth?: number;
}

interface Product {
  seekId: string;
  profile?: string;
  profileHigh?: string;
  profileSizeX: number;
  profileSizeY: number;
  normalTexture?: string;
  normalTextureHigh?: string;
  iconSmallURI?: string;
  contentType: ContentType;
  userFreeData?: {
    materialMeta?: {
      seekId: string;
    };
  };
}

interface TransactionManager {
  createRequest(requestType: string, data: unknown[]): unknown;
  commit(request: unknown): void;
}

interface ProductSelectionContext {
  transManager: TransactionManager;
  app: {
    signalPropertyBarRefresh: {
      dispatch(): void;
    };
  };
}

interface ModelSearchFilter {
  sceneType: string;
}

interface QueryConfig {
  categoryId: string;
  seekId?: string;
}

interface CatalogConfig {
  types: string[];
  sceneType: string;
  mydata: {
    modelSearchFilter: ModelSearchFilter;
  };
  customerCategories: unknown[];
  query?: QueryConfig;
}

interface ProductSelectedHandler {
  productSelectedHandler(product: Product | null, context: ProductSelectionContext): void;
}

const CORNICE_CATEGORY_ID = 'e8892a3a-a2d6-3b2e-a6ea-f5bece99a74e';
const COEDGE_POSITION_TYPE_2 = 2;

export function changeNCustomizedMoldingTypeAdapter(
  features: MoldingFeature[] | [MoldingFeature[]]
): [CatalogConfig, ProductSelectedHandler] {
  const featureList = Array.isArray(features[0]) ? features[0] : [features[0]];
  const firstFeature = featureList[0];
  const parameters = firstFeature.parameters;

  const catalogConfig: CatalogConfig = {
    types: firstFeature.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Mitre)
      ? ['sc_mitre']
      : [
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

  catalogConfig.query = {
    categoryId: CORNICE_CATEGORY_ID,
    seekId: parameters?.seekId
  };

  const handler: ProductSelectedHandler = {
    productSelectedHandler(product: Product | null, context: ProductSelectionContext): void {
      if (!product?.profile) {
        return;
      }

      const app = HSApp.App.getApp();
      const wallMoldingPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.WallMolding
      );

      const materialPromise = product.userFreeData?.materialMeta?.seekId
        ? app.catalogManager.getProductBySeekId(product.userFreeData.materialMeta.seekId)
        : wallMoldingPlugin.getDefaultCorniceMaterial();

      materialPromise.then((materialProduct: unknown) => {
        const materialData = HSCore.Material.MaterialData.create(materialProduct);
        const transManager = context.transManager;
        const featurePath = firstFeature.path;
        const uniqueParent = firstFeature.getUniqueParent();
        const coedgesPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(
          featurePath,
          uniqueParent
        );
        const featureParameters = firstFeature.parameters;

        const isCurrentCornice = new ContentType(featureParameters.contentType).isTypeOf(
          HSCatalog.ContentTypeEnum.Cornice
        );
        const isProductCornice = product.contentType.isTypeOf(
          HSCatalog.ContentTypeEnum.Cornice
        );

        let offsetX: number | undefined;
        if (coedgesPosition === COEDGE_POSITION_TYPE_2) {
          const currentOffset = isCurrentCornice
            ? (featureParameters.offsetX ?? 0) - (featureParameters.profileHeight ?? 0)
            : (featureParameters.offsetX ?? 0);
          offsetX = currentOffset + (isProductCornice ? product.profileSizeY : 0);
        } else {
          offsetX = featureParameters.offsetX;
        }

        const moldingData = {
          seekId: product.seekId,
          profile: product.profileHigh ?? product.profile,
          profileHeight: product.profileSizeY,
          profileWidth: product.profileSizeX,
          materialData,
          texture: '',
          normalTexture: product.normalTexture,
          normalTextureHigh: product.normalTextureHigh,
          iconSmall: product.iconSmallURI,
          contentType: product.contentType.getTypeString(),
          offsetX
        };

        const request = transManager.createRequest(
          HSFPConstants.RequestType.ChangeNCustomizedMoldingType,
          [featureList, moldingData]
        );
        transManager.commit(request);
        context.app.signalPropertyBarRefresh.dispatch();
      });
    }
  };

  return [catalogConfig, handler];
}