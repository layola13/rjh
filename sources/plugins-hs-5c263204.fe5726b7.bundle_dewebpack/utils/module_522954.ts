import { HSCore } from './core';
import { IconfontView } from './iconfont-view';
import { Button } from './button';
import React from 'react';
import ReactDOM from 'react-dom';

interface DesignItem {
  hs_design_id: string;
  imageUrl: string;
  neighbor: string;
  cityName: string;
  districtName: string;
  grossAreaNum: number;
  areaNum: number;
  bedroomNum: number;
  livingroomNum: number;
  bathroomNum: number;
}

interface FloorplanDetailViewProps {
  item: DesignItem;
}

interface DesignMetadata {
  province?: string;
  city?: string;
  district?: string;
  neighbor?: string;
  grossArea?: number;
  originApartmentId?: string;
}

interface PluginManager {
  getPlugin(pluginType: string): any;
}

interface AppSettings {
  layoutDesignMode: boolean;
}

interface HSApp {
  App: {
    getApp(): {
      pluginManager: PluginManager;
      signalDocumentOpened: any;
      designMetadata: {
        get(key: string): any;
        set(key: string, value: any): void;
        reset(): void;
        flush(): void;
      };
      appSettings: AppSettings;
    };
  };
  Catalog: {
    Manager: {
      showPageByCategoryId(options: { categoryId: string; menuId: string }): void;
    };
    DataConfig: {
      MenuIdEnum: {
        draw: string;
      };
    };
  };
  Util: {
    Url: {
      getQueryStrings(): Record<string, string>;
      replaceParamsInUrl(params: Record<string, string>): string;
      addWindowHistoryState(key: string, value: string, url: string): void;
    };
    EventTrack: {
      instance(): {
        track(group: string, event: string): void;
      };
    };
    EventGroupEnum: {
      FPCollection: string;
      Toolbar: string;
    };
  };
}

declare global {
  interface Window {
    HSApp: HSApp;
    HSFPConstants: {
      PluginType: {
        Persistence: string;
        FloorplanCollection: string;
      };
    };
    ResourceManager: {
      getString(key: string): string;
    };
    adskUser: {
      isLogin(): boolean;
      openLoginWindow(): void;
      EVENT_CALLBACK_FUN: string;
    };
    $: any;
    ReactDOM: typeof ReactDOM;
  }
}

function shouldKeepDesignMeta(): boolean {
  return window.HSApp.App.getApp()
    .pluginManager.getPlugin(window.HSFPConstants.PluginType.Persistence)
    .keepDesignMeta();
}

const DEFAULT_IMAGE_URL = require('./default-image.png');

export default class FloorplanDetailView extends React.Component<FloorplanDetailViewProps> {
  private signalHook: any;

  constructor(props: FloorplanDetailViewProps) {
    super(props);
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.openDesign = this.openDesign.bind(this);
    this.clearSaveDialogMetaData = this.clearSaveDialogMetaData.bind(this);
  }

  componentDidMount(): void {
    if (window.outerHeight <= 768) {
      window.$('#fpcollectiondomsMask').perfectScrollbar({
        suppressScrollX: true
      });
    }
  }

  async openDesign(event: React.MouseEvent): Promise<void> {
    event.stopPropagation();

    const app = window.HSApp.App.getApp();
    const persistencePlugin = app.pluginManager.getPlugin(
      window.HSFPConstants.PluginType.Persistence
    );

    const executeDesignOpen = async (): Promise<void> => {
      if (shouldKeepDesignMeta()) {
        app.pluginManager
          .getPlugin(window.HSFPConstants.PluginType.FloorplanCollection)
          .hide(event);

        const updateResult = await persistencePlugin.callUpdateDesign({
          key: 'search-design',
          content: window.ResourceManager.getString('update_design_search_content')
        });

        if (!updateResult.continue) {
          return;
        }

        if (app.appSettings.layoutDesignMode) {
          window.HSApp.Catalog.Manager.showPageByCategoryId({
            categoryId: window.HSApp.Catalog.DataConfig.MenuIdEnum.draw,
            menuId: window.HSApp.Catalog.DataConfig.MenuIdEnum.draw
          });
        }

        let queryParams = window.HSApp.Util.Url.getQueryStrings();
        if (queryParams.env === 'ihomeDecoration') {
          queryParams = { ...queryParams, designType: 'publicdesign' };
          const newUrl = window.HSApp.Util.Url.replaceParamsInUrl(queryParams);
          window.HSApp.Util.Url.addWindowHistoryState('designType', 'publicdesign', newUrl);
        }

        this.signalHook.listen(app.signalDocumentOpened, this.clearSaveDialogMetaData);
        persistencePlugin.OpenDesignHandler.loadDesignData(
          this.props.item.hs_design_id,
          undefined,
          true
        );

        const eventTracker = window.HSApp.Util.EventTrack.instance();
        eventTracker.track(
          window.HSApp.Util.EventGroupEnum.FPCollection,
          'plugin_fpCollection_start_design_event'
        );
        eventTracker.track(
          window.HSApp.Util.EventGroupEnum.Toolbar,
          'toolBar_new_event'
        );
      } else {
        if (app.appSettings.layoutDesignMode) {
          window.HSApp.Catalog.Manager.showPageByCategoryId({
            categoryId: window.HSApp.Catalog.DataConfig.MenuIdEnum.draw,
            menuId: window.HSApp.Catalog.DataConfig.MenuIdEnum.draw
          });
        }

        app.pluginManager
          .getPlugin(window.HSFPConstants.PluginType.FloorplanCollection)
          .hide(event);

        persistencePlugin.execteActionWithCheckSavingStatus(() => {
          let queryParams = window.HSApp.Util.Url.getQueryStrings();
          if (queryParams.env === 'ihomeDecoration') {
            queryParams = { ...queryParams, designType: 'publicdesign' };
            const newUrl = window.HSApp.Util.Url.replaceParamsInUrl(queryParams);
            window.HSApp.Util.Url.addWindowHistoryState('designType', 'publicdesign', newUrl);
          }

          this.signalHook.listen(app.signalDocumentOpened, this.clearSaveDialogMetaData);
          persistencePlugin.OpenDesignHandler.loadDesignData(
            this.props.item.hs_design_id,
            undefined,
            true
          );
        });

        const eventTracker = window.HSApp.Util.EventTrack.instance();
        eventTracker.track(
          window.HSApp.Util.EventGroupEnum.FPCollection,
          'plugin_fpCollection_start_design_event'
        );
        eventTracker.track(
          window.HSApp.Util.EventGroupEnum.Toolbar,
          'toolBar_new_event'
        );
      }
    };

    try {
      if (window.adskUser.isLogin()) {
        await executeDesignOpen();
      } else {
        window.adskUser.openLoginWindow();
        window.$('body')
          .unbind(window.adskUser.EVENT_CALLBACK_FUN)
          .bind(window.adskUser.EVENT_CALLBACK_FUN, () => {
            executeDesignOpen();
          });
      }
    } catch (error) {
      // Error handling
    }
  }

  clearSaveDialogMetaData(): void {
    const app = window.HSApp.App.getApp();

    if (shouldKeepDesignMeta()) {
      const originApartmentId = app.designMetadata.get('originApartmentId');
      if (originApartmentId) {
        app.designMetadata.set('originApartmentId', originApartmentId);
      }
      app.designMetadata.flush();
      this.signalHook.unlistenAll();
    } else {
      const attributes = app.designMetadata.get('attributes');
      const originApartmentId = app.designMetadata.get('originApartmentId');

      app.designMetadata.reset();
      app.designMetadata.set('province', attributes.province);
      app.designMetadata.set('city', attributes.city);
      app.designMetadata.set('district', attributes.district);
      app.designMetadata.set('neighbor', attributes.neighbor);
      app.designMetadata.set('grossArea', attributes.grossArea);

      if (originApartmentId) {
        app.designMetadata.set('originApartmentId', originApartmentId);
      }

      app.designMetadata.flush();
      app.pluginManager
        .getPlugin(window.HSFPConstants.PluginType.Persistence)
        .OpenDesignHandler.emptyUrlPath();
      this.signalHook.unlistenAll();
    }
  }

  onCloseHandler(): void {
    window.$('#list-item-detail-view-container').addClass(' md-effect-1');
    setTimeout(() => {
      const container = document.querySelector('#list-item-detail-view-container');
      if (container) {
        window.ReactDOM.unmountComponentAtNode(container);
        window.$('#list-item-detail-view-container')
          .removeClass(' md-effect-1')
          .addClass('hide');
      }
    }, 300);
  }

  render(): JSX.Element {
    const imageUrl = this.props.item.imageUrl
      ? `${this.props.item.imageUrl}?x-oss-process=style/normal`
      : DEFAULT_IMAGE_URL;

    return (
      <div>
        <span className="closeBtn" onClick={this.onCloseHandler}>
          <IconfontView
            showType="hs_xian_guanbi"
            customStyle={{ fontSize: '20px' }}
            hoverBgColor="#E1E1E6"
            hoverColor="#1C1C1C"
            clickColor="#396EFE"
          />
        </span>
        <div className="list-item-detail-view">
          <img src={imageUrl} alt={`${this.props.item.neighbor} 2d view`} />
        </div>
        <div className="detail-info">
          <div className="room-detail">
            <div className="room-detail-name">
              <div className="region-info">
                <div className="region-info-text">
                  <span>{this.props.item.cityName} </span>
                  <span> </span>
                  <span>{this.props.item.districtName} </span>
                  <span> </span>
                  <span>{this.props.item.neighbor} </span>
                </div>
              </div>
            </div>
            <div className="area-detail">
              <span>{window.ResourceManager.getString('plugin_fpCollection_area_default').trim()}</span>
              <span>{this.props.item.grossAreaNum} </span>
              <span>㎡    </span>
            </div>
            <div className="area-detail">
              <span>{window.ResourceManager.getString('plugin_fpCollection_gcross_area').trim()}</span>
              <span>{this.props.item.areaNum} </span>
              <span>㎡    </span>
            </div>
            <div className="style-detail">
              <span> {this.props.item.bedroomNum} </span>
              <span>室</span>
              <span> {this.props.item.livingroomNum} </span>
              <span>厅</span>
              <span> {this.props.item.bathroomNum} </span>
              <span>卫</span>
            </div>
          </div>
          <Button className="start-design" type="primary" onClick={this.openDesign}>
            {window.ResourceManager.getString('plugin_fpCollection_start_design')}
          </Button>
        </div>
      </div>
    );
  }
}