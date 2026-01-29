import { Transaction } from 'HSCore/Transaction';
import { Material } from 'HSCore/Material';
import { CategoryTypeEnum } from 'HSCatalog';
import { App } from 'HSApp';
import { RequestType, PluginType } from 'HSFPConstants';

interface MaterialData {
  seekId?: string;
  [key: string]: unknown;
}

interface Pocket {
  getMaterial(): Material | null;
  setMaterial(material: Material): void;
  getHost(): PocketHost | null;
}

interface PocketHost {
  dirtyMaterial(): void;
}

interface FilterConfig {
  categoryType: CategoryTypeEnum;
  filters: Record<string, unknown>;
  sceneType: string;
}

interface CatalogOptions {
  optionFilters?: FilterConfig[];
  mydata?: {
    types?: CategoryTypeEnum;
  };
  query?: {
    seekId: string;
  };
  notFilter?: boolean;
}

interface PanelHandlers {
  panelShownHandler(): void;
  productSelectedHandler(material: Material, context: TransactionContext): void;
  panelHiddenHandler(): void;
}

interface TransactionContext {
  transManager: TransactionManager;
  getStatusBarControlById(id: string): StatusBarControl | null;
}

interface TransactionManager {
  createRequest(type: RequestType, args: unknown[]): ChangePocketMaterialRequest;
  commit(request: ChangePocketMaterialRequest): void;
}

interface StatusBarControl {
  update(state: { isActive: boolean }): void;
}

interface Plugin {
  refresh(options?: unknown, config?: { refreshStatusBar: boolean }): void;
  update(): void;
}

export class ChangePocketMaterialRequest extends Transaction.Common.StateRequest {
  private _pocket: Pocket;
  private _materialData: MaterialData;
  private _savedMaterial?: Material | null;

  constructor(pocket: Pocket, materialData: MaterialData) {
    super();
    this._pocket = pocket;
    this._materialData = materialData;
  }

  onCommit(): void {
    const material = Material.create(this._materialData);
    this._changeMaterial(material);
    super.onCommit([]);
  }

  private _changeMaterial(material: Material): void {
    const pocket = this._pocket;
    this._savedMaterial = pocket.getMaterial();
    pocket.setMaterial(material);
    
    const host = pocket.getHost();
    if (host) {
      host.dirtyMaterial();
    }
  }

  canTransactField(): boolean {
    return true;
  }
}

export default function createChangePocketMaterialHandler(
  selectedObjects: unknown[],
  context: TransactionContext,
  _unusedParam: unknown
): [CatalogOptions, PanelHandlers, string] {
  const [firstObject] = selectedObjects as Array<{ getPocket(): Pocket }>;
  const pocket = firstObject.getPocket();

  const filterConfigs: FilterConfig[] = [
    {
      categoryType: CategoryTypeEnum.Filter2D,
      filters: {},
      sceneType: App.Catalog.DataConfig.SceneType.Material,
    },
  ];

  const catalogOptions: CatalogOptions = {};

  if (App.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID) {
    filterConfigs[0].filters[App.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID] =
      App.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_VALUE;
    catalogOptions.optionFilters = filterConfigs;
    catalogOptions.mydata = {
      types: CategoryTypeEnum.ext_diy_material,
    };
  }

  const currentMaterial = pocket.getMaterial();
  const query = {
    seekId: currentMaterial?.seekId ?? '',
  };

  catalogOptions.query = catalogOptions.query 
    ? Object.assign(catalogOptions.query, query) 
    : query;
  catalogOptions.notFilter = true;

  const handlers: PanelHandlers = {
    panelShownHandler(): void {
      const button = context.getStatusBarControlById('pocketMaterialButton');
      if (button) {
        button.update({ isActive: true });
      }
    },

    productSelectedHandler(material: Material, transContext: TransactionContext): void {
      const existingMaterial = pocket.getMaterial();
      
      if (!existingMaterial || !existingMaterial.isSame(material)) {
        const request = transContext.transManager.createRequest(
          RequestType.ChangePocketMaterial,
          [pocket, material]
        );
        transContext.transManager.commit(request);

        const app = App.getApp();
        const contextualTools = app?.pluginManager.getPlugin(PluginType.ContextualTools) as Plugin | undefined;
        if (contextualTools) {
          contextualTools.refresh(undefined, { refreshStatusBar: false });
        }

        const propertyBar = app?.pluginManager.getPlugin(PluginType.PropertyBar) as Plugin | undefined;
        if (propertyBar) {
          propertyBar.update();
        }
      }
    },

    panelHiddenHandler(): void {
      const button = context.getStatusBarControlById('pocketMaterialButton');
      if (button) {
        button.update({ isActive: false });
      }
    },
  };

  return [catalogOptions, handlers, '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd'];
}