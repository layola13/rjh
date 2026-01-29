import { HistoricalVersionFrame } from './HistoricalVersionFrame';
import { Modal } from './Modal';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface DesignMetadata {
  get(key: string): string | undefined;
}

interface App {
  designMetadata: DesignMetadata;
  userTrackLogger: UserTrackLogger;
  appSettings: AppSettings;
}

interface AppSettings {
  layoutDesignMode: boolean;
}

interface UserTrackLogger {
  push(category: string, data: TrackLogData, options?: TrackLogOptions): void;
}

interface TrackLogData {
  description: string;
  group: string;
  type: string;
  typeName: string;
}

interface TrackLogOptions {
  triggerType: string;
}

interface ToolbarItem {
  add(config: ToolbarItemConfig): void;
}

interface ToolbarItemConfig {
  label: string;
  name: string;
  order: number;
  icon: string;
  onclick: () => void;
}

interface ToolbarPlugin {
  getItem(name: string): ToolbarItem;
}

interface HistoryVersion {
  versionId: string;
  createdAt: string;
  image: string;
  saveType: string;
  modelTag: string;
  magic: string;
  fromSource?: string;
}

interface HistoryVersionResponse {
  items: HistoryVersion[];
  total: number;
}

interface PersistPlugin {
  getHistoriesByPage(params: GetHistoriesParams): Promise<HistoryVersionResponse>;
  openDesign(designId: string, versionId: string): void;
}

interface GetHistoriesParams {
  designId: string;
  [key: string]: unknown;
}

interface PluginDependencies {
  [key: string]: ToolbarPlugin | PersistPlugin | unknown;
}

interface PluginActivateParams {
  app: App;
}

interface LoadingTaskData {
  firstFlush: boolean;
}

interface LoadingTask {
  data: LoadingTaskData;
}

interface VersionDisplayItem {
  versionId: string;
  createdAt: string;
  image: string;
  saveType: string;
  modelTag: string;
  magic: string;
  auditTag?: boolean;
  displayName?: string;
}

interface ListDataResponse {
  list: VersionDisplayItem[];
  total: number;
}

interface HistoricalVersionFrameProps {
  getListData: (params: unknown) => Promise<ListDataResponse>;
  onOpen: (versionId: string) => void;
  onCancel: (action?: string) => void;
}

interface ModalConfig {
  title: string;
  className: string;
  content: React.ReactElement<HistoricalVersionFrameProps>;
  showFooter: boolean;
  enableCheckbox: boolean;
  onClose: () => void;
}

declare const HSFPConstants: {
  PluginType: {
    Toolbar: string;
    CommonUI: string;
    Persistence: string;
  };
  LogGroupTypes: {
    OpenDesign: string;
  };
  DesignVersionType: {
    HiddenVersionType: string;
  };
};

declare const HSApp: {
  Plugin: {
    IPlugin: new () => IPlugin;
    registerPlugin: (name: string, plugin: typeof HistoricalVersionPlugin) => void;
  };
  View: {
    Base: {
      LoadingTaskManager: {
        instance: () => {
          signalFlushEnd: {
            listen: (callback: (task: LoadingTask) => void) => void;
          };
        };
      };
    };
  };
  Util: {
    EventTrack: {
      instance: () => {
        track: (group: string, event: string) => void;
      };
    };
    EventGroupEnum: {
      Toolbar: string;
    };
  };
  Catalog: {
    Manager: {
      showPageByCategoryId: (params: { categoryId: string; menuId: string }) => void;
    };
    DataConfig: {
      MenuIdEnum: {
        draw: string;
      };
    };
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

declare const LiveHint: {
  show: (message: string, duration: undefined, callback: null, options: { canclose: boolean; effect: string }) => void;
};

declare const $: {
  (selector: string): {
    append: (html: string) => void;
  };
};

declare const React: {
  createElement: <P>(
    component: React.ComponentType<P>,
    props: P
  ) => React.ReactElement<P>;
};

abstract class IPlugin {
  abstract onActive(params: PluginActivateParams, dependencies: PluginDependencies): void;
}

class HistoricalVersionPlugin extends IPlugin {
  private app!: App;
  private toolbarPlugin!: ToolbarPlugin;
  private persistPlugin!: PersistPlugin;
  private currentversion?: string;
  private versions?: VersionDisplayItem[];

  constructor() {
    super();
    const config: PluginConfig = {
      name: 'Historical Version plugin',
      description: 'test for Historical Version',
      dependencies: [
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.CommonUI,
        HSFPConstants.PluginType.Persistence
      ]
    };
  }

  onActive(params: PluginActivateParams, dependencies: PluginDependencies): void {
    super.onActive?.(params, dependencies);

    this.app = params.app;
    this.toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar] as ToolbarPlugin;
    this.persistPlugin = dependencies[HSFPConstants.PluginType.Persistence] as PersistPlugin;

    $('#plugin-container').append('<div id="historicalverisondoms"></div>');

    this.show = this.show.bind(this);
    this.injectToolbar();

    HSApp.View.Base.LoadingTaskManager.instance().signalFlushEnd.listen((task: LoadingTask) => {
      if (task.data.firstFlush) {
        const versionId = params.app.designMetadata.get('versionId');
        if (versionId) {
          this.currentversion = versionId;
          if (this.versions) {
            const matchedVersion = this.versions.find(
              (version) => version.versionId === this.currentversion
            );
            if (matchedVersion !== undefined) {
              this.showVersionTip(matchedVersion);
            }
          }
        }
      }
    });
  }

  private showVersionTip(version: VersionDisplayItem): void {
    const message = ResourceManager.getString('history_version_tip').replace(
      '{datetime}',
      version.displayName ?? ''
    );
    LiveHint.show(message, undefined, null, {
      canclose: true,
      effect: 'shake'
    });
  }

  private injectToolbar(): void {
    this.toolbarPlugin.getItem('toolBar_file').add({
      label: ResourceManager.getString('toolBar_load_historical_version'),
      name: 'toolBar_load_historical_version',
      order: 1100,
      icon: 'plugin/toolbar/res/ImgToolBar/menu/view_history.svg',
      onclick: () => {
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Toolbar,
          'toolBar_load_historical_version_event'
        );

        this.app.userTrackLogger.push('historyVersion.Design', {
          description: '工具栏-查看历史版本',
          group: HSFPConstants.LogGroupTypes.OpenDesign,
          type: 'historyVersion',
          typeName: '历史版本'
        });

        this.open();
      }
    });
  }

  private open(): void {
    const designId = this.app.designMetadata.get('designId');
    if (designId) {
      this.show(designId);
    }
  }

  private show(designId: string): void {
    const trackAction = (action?: string): void => {
      this.app.userTrackLogger.push('historyVersion.Design', {
        description: `恢复历史版本弹框--点击${action || '取消'}按钮`,
        group: HSFPConstants.LogGroupTypes.OpenDesign,
        type: 'historyVersion',
        typeName: '历史版本'
      });
    };

    Modal.simple({
      title: ResourceManager.getString('history_version_recover'),
      className: 'historical-version-modal',
      content: React.createElement(HistoricalVersionFrame, {
        getListData: (params: unknown): Promise<ListDataResponse> => {
          return this.persistPlugin
            .getHistoriesByPage({ designId, ...params } as GetHistoriesParams)
            .then((response: HistoryVersionResponse) => {
              return {
                list: response.items.map((item: HistoryVersion) => {
                  const date = new Date(Number(item.createdAt));
                  const formattedDateTime = this.formatDateTime(date);

                  return {
                    versionId: item.versionId,
                    createdAt: formattedDateTime,
                    image: item.image,
                    saveType: item.saveType,
                    modelTag: item.modelTag,
                    magic: item.magic,
                    auditTag: item.fromSource === HSFPConstants.DesignVersionType.HiddenVersionType
                  };
                }),
                total: response.total
              };
            });
        },
        onOpen: (versionId: string): void => {
          if (this.app.appSettings.layoutDesignMode) {
            HSApp.Catalog.Manager.showPageByCategoryId({
              categoryId: HSApp.Catalog.DataConfig.MenuIdEnum.draw,
              menuId: HSApp.Catalog.DataConfig.MenuIdEnum.draw
            });
          }

          this.persistPlugin.openDesign(designId, versionId);

          this.app.userTrackLogger.push(
            'open.Design',
            {
              description: `恢复designId: ${designId}-version:${versionId}历史版本`,
              group: HSFPConstants.LogGroupTypes.OpenDesign,
              type: 'historyVersion',
              typeName: '历史版本'
            },
            {
              triggerType: 'start'
            }
          );
        },
        onCancel: trackAction
      }),
      showFooter: false,
      enableCheckbox: false,
      onClose: (): void => {
        trackAction('关闭');
      }
    });
  }

  private formatDateTime(date: Date): string {
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    let seconds: string | number = date.getSeconds();

    if (hours >= 0 && hours <= 9) {
      hours = `0${hours}`;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = `0${minutes}`;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = `0${seconds}`;
    }

    return ResourceManager.getString('date_time_format')
      .replace('{year}', String(date.getFullYear()))
      .replace('{month}', String(date.getMonth() + 1))
      .replace('{day}', String(date.getDate()))
      .replace('{hour}', String(hours))
      .replace('{minute}', String(minutes))
      .replace('{second}', String(seconds));
  }
}

HSApp.Plugin.registerPlugin('hsw.plugin.historicalversion.Plugin', HistoricalVersionPlugin);