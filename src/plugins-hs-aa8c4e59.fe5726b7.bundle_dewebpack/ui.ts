import { Storage } from './Storage';
import { Modal } from './Modal';
import { BomDialogTitle, BomDialog } from './BomDialogComponents';

interface UserBenefit {
  useful: boolean;
}

interface User {
  checkBenefit(feature: string): UserBenefit | null | undefined;
  isEnterprise: boolean;
  enterpriseId?: string;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null;
}

interface Plugin {
  showMarketModal?(action: string, source: string): void;
}

interface App {
  pluginManager: PluginManager;
  userTrackLogger: UserTrackLogger;
}

interface HSAppInstance {
  App: {
    getApp(): App;
  };
  Util: {
    Storage: typeof Storage;
  };
  Config: {
    TENANT: string;
  };
}

interface UserTrackLogger {
  push(event: string, data: LoggerData, extra: Record<string, unknown>): void;
}

interface LoggerData {
  description: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

interface CatalogResult {
  poolId: string;
}

interface CatalogResponse {
  data?: {
    result: CatalogResult[];
  };
}

interface NWTK {
  mtop: {
    Catalog: {
      getModelEnterpriseList(): Promise<CatalogResponse>;
    };
  };
}

declare const HSApp: HSAppInstance;
declare const HSFPConstants: {
  PluginType: {
    BomControl: string;
    MarketingBadge: string;
  };
};
declare const adskUser: User;
declare const NWTK: NWTK;
declare const React: {
  createElement(component: unknown, props: unknown, ...children: unknown[]): unknown;
};

export enum ModelKeysEnums {
  COMMON = 'COMMON',
  ENTERPRISE = 'ENTERPRISE',
  PRIVATE = 'PRIVATE',
  OTHERS = 'OTHERS'
}

export enum CategoryKeysEnums {
  HARD = 'HARD',
  MATERIAL = 'MATERIAL',
  BACKGROUNDWALL = 'BACKGROUNDWALL',
  DOOR = 'DOOR',
  OPENING = 'OPENING',
  OTHERS = 'OTHERS',
  FURNITURE = 'FURNITURE',
  APPLIANCE = 'APPLIANCE'
}

interface ModelValues {
  [ModelKeysEnums.COMMON]: boolean;
  [ModelKeysEnums.ENTERPRISE]: boolean;
  [ModelKeysEnums.PRIVATE]: boolean;
  [ModelKeysEnums.OTHERS]: boolean;
}

interface CategoryValues {
  [CategoryKeysEnums.HARD]: boolean;
  [CategoryKeysEnums.MATERIAL]: boolean;
  [CategoryKeysEnums.BACKGROUNDWALL]: boolean;
  [CategoryKeysEnums.DOOR]: boolean;
  [CategoryKeysEnums.OPENING]: boolean;
  [CategoryKeysEnums.OTHERS]: boolean;
  [CategoryKeysEnums.FURNITURE]: boolean;
  [CategoryKeysEnums.APPLIANCE]: boolean;
}

interface BomFilterValues {
  modelValues: ModelValues;
  categoryValues: CategoryValues;
  poolId?: string;
  enterpriseId?: string;
}

interface UIProps {
  // Add specific props if needed
}

const storage = new Storage(HSFPConstants.PluginType.BomControl);
const BOM_MODEL_FILTER_STORAGE_KEY = 'BOM_MODEL_FILTER_STORAGE_KEY';
const BOM_CATEGORY_FILTER_STORAGE_KEY = 'BOM_CATEGORY_FILTER_STORAGE_KEY';

export class UI {
  private props: UIProps;
  private _container?: HTMLElement;
  private defaultModelValues: ModelValues;
  private defaultCategoryValues: CategoryValues;
  private poolId?: string;
  private _tempValues: BomFilterValues | null;
  private _handleOpen: ((values: BomFilterValues) => void) | null;

  constructor(props: UIProps) {
    this.props = props;
    this._container = undefined;
    this._tempValues = null;
    this._handleOpen = null;

    this.defaultModelValues = {
      [ModelKeysEnums.COMMON]: true,
      [ModelKeysEnums.ENTERPRISE]: true,
      [ModelKeysEnums.PRIVATE]: true,
      [ModelKeysEnums.OTHERS]: true
    };

    this.defaultCategoryValues = {
      [CategoryKeysEnums.HARD]: true,
      [CategoryKeysEnums.MATERIAL]: true,
      [CategoryKeysEnums.BACKGROUNDWALL]: true,
      [CategoryKeysEnums.DOOR]: true,
      [CategoryKeysEnums.OPENING]: true,
      [CategoryKeysEnums.OTHERS]: true,
      [CategoryKeysEnums.FURNITURE]: true,
      [CategoryKeysEnums.APPLIANCE]: true
    };
  }

  private getStorageValues<T>(key: string): T | null {
    return storage.get<T>(key);
  }

  private setStorageValues<T>(key: string, value: T): void {
    storage.set(key, value);
  }

  private onValuesChange = (values: BomFilterValues): void => {
    if (values) {
      this._tempValues = values;
    }
  };

  private onBomDialogNextState = async (): Promise<boolean> => {
    const benefit = adskUser.checkBenefit('bomExport');
    if (!benefit?.useful) {
      this.handleUpgrade();
      return false;
    }
    return true;
  };

  private handleOk = (): void => {
    this.bomLogger('confirm', '确认按钮');

    const benefit = adskUser.checkBenefit('bomExport');
    if (!benefit?.useful) {
      this.handleUpgrade();
      return;
    }

    if (!this._tempValues) {
      return;
    }

    const modelValues: ModelValues = {
      [ModelKeysEnums.COMMON]: this._tempValues.modelValues[ModelKeysEnums.COMMON],
      [ModelKeysEnums.ENTERPRISE]: this._tempValues.modelValues[ModelKeysEnums.ENTERPRISE],
      [ModelKeysEnums.PRIVATE]: this._tempValues.modelValues[ModelKeysEnums.PRIVATE],
      [ModelKeysEnums.OTHERS]: this._tempValues.modelValues[ModelKeysEnums.OTHERS]
    };
    this.setStorageValues(BOM_MODEL_FILTER_STORAGE_KEY, modelValues);

    const categoryValues: CategoryValues = {
      [CategoryKeysEnums.HARD]: this._tempValues.categoryValues[CategoryKeysEnums.HARD],
      [CategoryKeysEnums.MATERIAL]: this._tempValues.categoryValues[CategoryKeysEnums.MATERIAL],
      [CategoryKeysEnums.BACKGROUNDWALL]: this._tempValues.categoryValues[CategoryKeysEnums.BACKGROUNDWALL],
      [CategoryKeysEnums.DOOR]: this._tempValues.categoryValues[CategoryKeysEnums.DOOR],
      [CategoryKeysEnums.OPENING]: this._tempValues.categoryValues[CategoryKeysEnums.OPENING],
      [CategoryKeysEnums.OTHERS]: this._tempValues.categoryValues[CategoryKeysEnums.OTHERS],
      [CategoryKeysEnums.FURNITURE]: this._tempValues.categoryValues[CategoryKeysEnums.FURNITURE],
      [CategoryKeysEnums.APPLIANCE]: this._tempValues.categoryValues[CategoryKeysEnums.APPLIANCE]
    };
    this.setStorageValues(BOM_CATEGORY_FILTER_STORAGE_KEY, categoryValues);

    if (this.poolId) {
      this._tempValues.poolId = this.poolId;
    }

    if (adskUser.enterpriseId) {
      this._tempValues.enterpriseId = adskUser.enterpriseId;
    }

    if (this._handleOpen) {
      this._handleOpen(this._tempValues);
    }
  };

  private handleUpgrade = (): void => {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.MarketingBadge);
    if (plugin?.showMarketModal) {
      plugin.showMarketModal('render', 'bom_list_export');
    }
    this.hide();
  };

  public loadPoolId(): void {
    if (this.poolId) {
      return;
    }

    NWTK.mtop.Catalog.getModelEnterpriseList().then((response) => {
      this.poolId = response.data?.result[0]?.poolId;
    });
  }

  public show(handleOpen: (values: BomFilterValues) => void): void {
    this.defaultModelValues = this.getStorageValues<ModelValues>(BOM_MODEL_FILTER_STORAGE_KEY) ?? this.defaultModelValues;
    this.defaultCategoryValues = this.getStorageValues<CategoryValues>(BOM_CATEGORY_FILTER_STORAGE_KEY) ?? this.defaultCategoryValues;
    this._handleOpen = handleOpen;

    if (adskUser.isEnterprise && !adskUser.enterpriseId) {
      this.loadPoolId();
    }

    const isEnterprise = HSApp.Config.TENANT !== 'fp' || adskUser.isEnterprise;

    const onOk = async (values: BomFilterValues): Promise<void> => {
      this._tempValues = values;
      return this.handleOk();
    };

    Modal.basic({
      title: React.createElement(BomDialogTitle, null),
      className: 'bom-filter-box',
      enableCheckbox: false,
      hideOkButton: true,
      hideCancelButton: true,
      content: React.createElement(BomDialog, {
        onValuesChange: this.onValuesChange,
        defaultModelValues: this.defaultModelValues,
        defaultCategoryValues: this.defaultCategoryValues,
        isEnterprise: isEnterprise,
        onCancel: () => {
          this.hide();
          this.bomLogger('cancel', '取消按钮');
        },
        onOk: onOk,
        handleUpgrade: this.handleUpgrade,
        isNeedTaskShop: HSApp.Config.TENANT === 'fp',
        canNextState: this.onBomDialogNextState
      })
    });
  }

  public hide(): void {
    Modal.close('basic');
  }

  private bomLogger(id: string, name: string): void {
    HSApp.App.getApp().userTrackLogger.push('bom.dialog.click', {
      description: '弹出bom清单弹框',
      clicksRatio: {
        id,
        name
      }
    }, {});
  }
}