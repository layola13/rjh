export interface ParametricStairMaterialOptions {
  notFilter: boolean;
  customerCategories: string[];
  sceneType: string;
  mydata: {
    modelSearchFilter: {
      sceneType: string;
    };
  };
  optionFilters?: Array<{
    categoryType: string;
    filters: Record<string, string>;
  }>;
  query?: {
    categoryId: string;
    seekId: string;
  };
}

export interface ProductSelectedContext {
  app: {
    signalPropertyBarRefresh: {
      dispatch(): void;
    };
  };
}

export interface MaterialData {
  seekId: string;
}

export interface StairParameters {
  materialData?: MaterialData;
}

export interface ParametricStairModel {
  parameters?: StairParameters;
  getFaceIdsByPartType(partType: string): string[];
}

export interface StairPartInfo {
  part?: string;
}

export type ChangeParametricStairMaterialInput = [
  ParametricStairModel,
  StairPartInfo
];

export interface ProductSelectedHandler {
  productSelectedHandler(
    product: unknown,
    context: ProductSelectedContext
  ): void;
}

const MATERIAL_CATEGORY_ID = "07acf354-2510-4b4a-a584-3b6b6bd6d72e";
const PLUGIN_ID = "20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd";

enum CategoryTypeEnum {
  Filter2D = "Filter2D"
}

function replaceMaterial(
  model: ParametricStairModel,
  faceIds: string[],
  product: unknown
): void {
  // Implementation from imported module
}

export function changeParameticStairMaterialAdapter(
  input: ChangeParametricStairMaterialInput | [ParametricStairModel]
): [ParametricStairMaterialOptions, ProductSelectedHandler, string] {
  const models = Array.isArray(input[0]) ? input[0] : [input[0]];
  const stairModel = models[0];
  const partInfo = input[1] as StairPartInfo | undefined;

  const app = (globalThis as any).HSApp;
  const catalogPlugin = app.App.getApp().pluginManager.getPlugin(
    (globalThis as any).HSFPConstants.PluginType.Catalog
  );

  const options: ParametricStairMaterialOptions = {
    notFilter: true,
    customerCategories: [catalogPlugin.PanelId.UploadModel],
    sceneType: app.Catalog.DataConfig.SceneType.Material,
    mydata: {
      modelSearchFilter: {
        sceneType: app.Catalog.DataConfig.SceneType.Material
      }
    }
  };

  const partnerConfig = app.PartnerConfig;
  if (partnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID) {
    const optionFilters = [
      {
        categoryType: CategoryTypeEnum.Filter2D,
        filters: {
          [partnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID]:
            partnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_VALUE
        }
      }
    ];
    options.optionFilters = optionFilters;
  }

  const parameters = stairModel.parameters;
  if (parameters) {
    const materialData = parameters.materialData;
    if (materialData) {
      options.query = {
        categoryId: MATERIAL_CATEGORY_ID,
        seekId: materialData.seekId
      };
    }
  }

  const handler: ProductSelectedHandler = {
    productSelectedHandler(
      product: unknown,
      context: ProductSelectedContext
    ): void {
      if (product && partInfo?.part) {
        const faceIds = stairModel.getFaceIdsByPartType(partInfo.part);
        replaceMaterial(stairModel, faceIds, product);
      }
      context.app.signalPropertyBarRefresh.dispatch();
    }
  };

  return [options, handler, PLUGIN_ID];
}