interface PocketMetaData {
  types: string;
  customerCategories: unknown[];
  guessYourFav: unknown;
  seekId?: string;
}

interface PanelHandlers {
  panelShownHandler: () => void;
  productSelectedHandler: (product: Product, context: Context) => void;
  panelHiddenHandler: () => void;
}

interface Product {
  id: string;
  seekId?: string;
}

interface Context {
  transManager: TransactionManager;
}

interface TransactionManager {
  createRequest(type: string, args: unknown[]): ChangePocketGeometryRequest;
  commit(request: ChangePocketGeometryRequest): void;
}

interface Opening {
  getPocket(): Pocket;
  addPocket(pocket: Pocket): void;
  seekId?: string;
}

interface Pocket {
  getMaterial(): Material;
  seekId?: string;
}

interface Material {
  clone(): Material;
}

interface StatusBarControl {
  update(options: { isActive: boolean }): void;
}

interface StatusBar {
  getStatusBarControlById(id: string): StatusBarControl | undefined;
}

interface Plugin {
  refresh(data?: unknown, options?: { refreshStatusBar: boolean }): void;
  update(): void;
}

interface PluginManager {
  getPlugin(type: string): Plugin | undefined;
}

interface App {
  pluginManager: PluginManager;
}

declare const HSCore: {
  Model: {
    Pocket: {
      create(metaData: PocketMetaData): Pocket;
    };
  };
  Transaction: {
    Request: new () => Request;
  };
};

declare const HSCatalog: {
  CategoryTypeEnum: {
    ext_opening_pocket: string;
  };
};

declare const HSFPConstants: {
  RequestType: {
    ChangePocketGeometry: string;
  };
  PluginType: {
    ContextualTools: string;
    PropertyBar: string;
  };
};

declare const HSApp: {
  App: {
    getApp(): App | undefined;
  };
};

declare function getGuessYourFavoriteProducts(pocket: Pocket): { profiles: unknown };

class Request {}

export class ChangePocketGeometryRequest extends HSCore.Transaction.Request {
  private _opening: Opening;
  private _metaData: PocketMetaData;
  private _savedPocket?: Pocket;

  constructor(opening: Opening, metaData: PocketMetaData) {
    super();
    this._opening = opening;
    this._metaData = metaData;
  }

  onCommit(): void {
    const pocket = HSCore.Model.Pocket.create(this._metaData);
    this._changeGeometry(pocket);
  }

  onUndo(): void {
    if (this._savedPocket) {
      this._changeGeometry(this._savedPocket);
    }
  }

  onRedo(): void {
    if (this._savedPocket) {
      this._changeGeometry(this._savedPocket);
    }
  }

  private _changeGeometry(pocket: Pocket): void {
    const opening = this._opening;
    const savedPocket = opening.getPocket();
    this._savedPocket = savedPocket;
    
    const material = savedPocket.getMaterial().clone();
    if (material) {
      pocket.setMaterial?.(material);
    }
    
    this._opening.addPocket(pocket);
  }
}

export default function createChangePocketGeometryRequest(
  opening: Opening,
  statusBar: StatusBar
): [PocketMetaData, PanelHandlers] {
  const pocket = opening.getPocket();
  
  const metaData: PocketMetaData = {
    types: HSCatalog.CategoryTypeEnum.ext_opening_pocket,
    customerCategories: [],
    guessYourFav: getGuessYourFavoriteProducts(pocket).profiles
  };

  const handlers: PanelHandlers = {
    panelShownHandler(): void {
      const button = statusBar.getStatusBarControlById("pocketGeometryButton");
      button?.update({ isActive: true });
    },

    productSelectedHandler(product: Product, context: Context): void {
      const seekId = opening.seekId;
      
      if (!seekId || product.id !== seekId) {
        const request = context.transManager.createRequest(
          HSFPConstants.RequestType.ChangePocketGeometry,
          [opening, product]
        );
        context.transManager.commit(request);

        const app = HSApp.App.getApp();
        const contextualTools = app?.pluginManager.getPlugin(
          HSFPConstants.PluginType.ContextualTools
        );
        contextualTools?.refresh(undefined, { refreshStatusBar: false });

        const propertyBar = app?.pluginManager.getPlugin(
          HSFPConstants.PluginType.PropertyBar
        );
        propertyBar?.update();
      }
    },

    panelHiddenHandler(): void {
      const button = statusBar.getStatusBarControlById("pocketGeometryButton");
      button?.update({ isActive: false });
    }
  };

  if (pocket?.seekId) {
    metaData.seekId = pocket.seekId;
  }

  return [metaData, handlers];
}