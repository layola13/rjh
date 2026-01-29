enum MoldingTypeEnum {
  Baseboard = "Baseboard",
  Cornice = "Cornice",
  WallBoardBaseboard = "WallBoardBaseboard",
  WallBoardWaistLine = "WallBoardWaistLine"
}

enum CategoryTypeEnum {
  ext_baseboard = "ext_baseboard",
  ext_cornice = "ext_cornice",
  SC_Top_Rail = "SC_Top_Rail"
}

enum RequestType {
  ChangeMoldingType = "ChangeMoldingType"
}

enum PluginType {
  ContextualTools = "ContextualTools",
  PropertyBar = "PropertyBar"
}

interface Molding {
  seekId: string;
}

interface WallElement {
  getMolding(type: MoldingTypeEnum): Molding | null;
}

interface TransactionRequest {
  type: RequestType;
  params: unknown[];
}

interface TransactionManager {
  createRequest(type: RequestType, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest, silent: boolean): void;
}

interface Product {
  id: string;
}

interface PluginManager {
  getPlugin(type: PluginType): Plugin | null;
}

interface Plugin {
  refresh?(options?: unknown, config?: { refreshStatusBar: boolean }): void;
  update?(): void;
}

interface App {
  pluginManager: PluginManager;
}

interface AdapterContext {
  transManager: TransactionManager;
}

interface AdapterConfig {
  types: CategoryTypeEnum;
  customerCategories: string[];
  seekId?: string;
}

interface AdapterHandlers {
  productSelectedHandler(product: Product, context: AdapterContext): void;
}

type ChangeMoldingTypeAdapterResult = [AdapterConfig, AdapterHandlers];

const MOLDING_TYPE_TO_CATEGORY_MAP: Record<MoldingTypeEnum, CategoryTypeEnum> = {
  [MoldingTypeEnum.Baseboard]: CategoryTypeEnum.ext_baseboard,
  [MoldingTypeEnum.Cornice]: CategoryTypeEnum.ext_cornice,
  [MoldingTypeEnum.WallBoardBaseboard]: CategoryTypeEnum.ext_baseboard,
  [MoldingTypeEnum.WallBoardWaistLine]: CategoryTypeEnum.SC_Top_Rail
};

export function changeMoldingTypeAdapter(
  params: [WallElement | WallElement[], MoldingTypeEnum?]
): ChangeMoldingTypeAdapterResult {
  const [wallElements, moldingType = MoldingTypeEnum.Baseboard] = params;

  const adapterConfig: AdapterConfig = {
    types: MOLDING_TYPE_TO_CATEGORY_MAP[moldingType],
    customerCategories: []
  };

  const adapterHandlers: AdapterHandlers = {
    productSelectedHandler(product: Product, context: AdapterContext): void {
      const elements: WallElement[] = Array.isArray(wallElements) 
        ? wallElements 
        : [wallElements];

      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        const request = context.transManager.createRequest(
          RequestType.ChangeMoldingType,
          [product, element, moldingType]
        );
        context.transManager.commit(request, index > 0);
      }

      const app: App | null = (globalThis as any).HSApp?.App?.getApp();
      
      if (app) {
        const contextualToolsPlugin = app.pluginManager.getPlugin(
          PluginType.ContextualTools
        );
        contextualToolsPlugin?.refresh?.(undefined, { refreshStatusBar: false });

        const propertyBarPlugin = app.pluginManager.getPlugin(
          PluginType.PropertyBar
        );
        propertyBarPlugin?.update?.();
      }
    }
  };

  const elementsArray = Array.isArray(wallElements) ? wallElements : [wallElements];
  elementsArray.some((element: WallElement) => {
    if (!element) {
      return false;
    }

    const molding = element.getMolding(moldingType);
    if (molding) {
      adapterConfig.seekId = molding.seekId;
      return true;
    }

    return false;
  });

  return [adapterConfig, adapterHandlers];
}