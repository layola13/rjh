import { RemindSignalHandle } from './RemindSignalHandle';

interface SignalData {
  type?: string;
  logType?: string;
  searchType?: string;
  targetType?: string;
  subMenu?: {
    id: string;
  };
  selectCategory?: {
    id: string;
  };
}

interface SignalEvent {
  data?: SignalData;
}

interface RemindSignalItem {
  getSignal: () => any;
  listen: (event: SignalEvent) => { key: string } | undefined;
}

interface Plugin {
  signalUploadModelClick?: any;
}

interface PluginManager {
  getPlugin?: (pluginType: string) => Plugin | undefined;
}

interface App {
  pluginManager?: PluginManager;
}

interface CatalogSignalManager {
  signalCatalogToLog?: any;
  signalMenuItemClick?: any;
}

declare global {
  const HSApp: {
    App: {
      getApp: () => App | undefined;
    };
    Catalog: {
      CatalogSignalManager: {
        getInstance: () => CatalogSignalManager;
      };
    };
  };
  const HSFPConstants: {
    PluginType: {
      Catalog: string;
    };
  };
}

export default class CatalogRemindSignalHandle extends RemindSignalHandle {
  getRemindSignalList(): RemindSignalItem[] {
    return [
      {
        getSignal: () => {
          return HSApp.App.getApp()
            ?.pluginManager
            ?.getPlugin?.(HSFPConstants.PluginType.Catalog)
            ?.signalUploadModelClick;
        },
        listen: (event: SignalEvent) => {
          const dataType = event?.data?.type;
          
          if (dataType === 'search') {
            return undefined;
          } else if (dataType === 'upload') {
            return {
              key: 'catalog.uploadModel'
            };
          }
          
          return undefined;
        }
      },
      {
        getSignal: () => {
          return HSApp.Catalog.CatalogSignalManager.getInstance().signalCatalogToLog;
        },
        listen: (event: SignalEvent) => {
          if (event?.data) {
            const data = event.data;
            if (
              data.logType === 'search' &&
              data.searchType === 'text' &&
              data.targetType === 'model'
            ) {
              return {
                key: 'catalog.searchModel'
              };
            }
          }
          return undefined;
        }
      },
      {
        getSignal: () => {
          return HSApp?.Catalog?.CatalogSignalManager?.getInstance()?.signalMenuItemClick;
        },
        listen: (event: SignalEvent) => {
          const subMenuId = event?.data?.subMenu?.id;
          if (subMenuId) {
            return {
              key: `catalog.menuItem.${subMenuId}`
            };
          }
          
          const selectCategoryId = event?.data?.selectCategory?.id;
          if (selectCategoryId) {
            return {
              key: `catalog.selectCategory.${selectCategoryId}`
            };
          }
          
          return undefined;
        }
      }
    ];
  }
}