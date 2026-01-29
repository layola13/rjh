import React from 'react';
import { Scroll } from 'scroll-component';
import SpecialTopicModel from './SpecialTopicModel';

interface SearchConfig {
  text?: string;
  categoriesIds: string;
}

interface SpecialTopicLandingPageProps {
  searchProducts: (config: SearchConfig) => void;
  specialTopicModelClick: () => void;
  entryText: string;
  onHeaderBack: () => void;
}

interface SpecialTopicLandingPageState {
  categories: unknown[];
  modelData: unknown[];
  showSearchBox: boolean;
}

interface EventTrackLogParams {
  logType: string;
  targetType: string;
  action: string;
  area: string;
  searchType: string;
  text?: string;
}

interface EventTrackManager {
  signalCatalogToLog: (params: EventTrackLogParams) => void;
}

interface HSCatalogLib {
  BackHeader: React.ComponentType<{ onBack: () => void; title: string }>;
  SearchBox: React.ComponentType<{
    placeholder: string;
    setSearchConfig: (config: SearchConfig) => void;
    backIconType: string;
    handleBack: () => void;
    showSearchPicture: boolean;
  }>;
}

declare global {
  const HSApp: {
    Config: {
      TENANT: string;
    };
    Catalog: {
      EventTrackManager: {
        getInstance: () => EventTrackManager;
      };
      Manager: {
        getHSCatalogLib: () => HSCatalogLib;
      };
      BaseApiManager: {
        getInstance: () => {
          eventsManager: {
            listenMouseEvent: (params: { type: string }) => void;
          };
        };
      };
    };
    App: {
      getApp: () => {
        environmentManager: {
          activeEnvironmentId: string;
        };
      };
    };
    Util: {
      Url: {
        getQueryStrings: () => Record<string, string>;
      };
    };
  };
  const HSFPConstants: {
    Environment: {
      TPZZ: string;
    };
  };
  const ResourceManager: {
    getString: (key: string) => string;
  };
}

export default class SpecialTopicLandingPage extends React.Component<
  SpecialTopicLandingPageProps,
  SpecialTopicLandingPageState
> {
  private showModelTopic: boolean;
  private eventTrackManager: EventTrackManager;

  constructor(props: SpecialTopicLandingPageProps) {
    super(props);

    this.state = {
      categories: [],
      modelData: [],
      showSearchBox: false,
    };

    this.showModelTopic = ['ezhome', 'fp'].includes(HSApp.Config.TENANT);
    this.eventTrackManager = HSApp.Catalog.EventTrackManager.getInstance();

    this.searchProducts = this.searchProducts.bind(this);
    this.onPageScroll = this.onPageScroll.bind(this);
  }

  clickSearchBoxIcon = (): void => {
    const showSearchBox = !this.state.showSearchBox;
    
    this.setState({ showSearchBox });

    if (!showSearchBox) {
      this.eventTrackManager.signalCatalogToLog({
        logType: 'search',
        targetType: 'model',
        action: 'end',
        area: 'specialTopicPage',
        searchType: 'text',
      });
    }
  };

  searchProducts(config: SearchConfig): void {
    Object.assign(config, { categoriesIds: '' });
    
    this.props.searchProducts(config);
    
    this.eventTrackManager.signalCatalogToLog({
      logType: 'search',
      targetType: 'model',
      action: 'start',
      area: 'specialTopPage',
      searchType: 'text',
      text: config.text,
    });
  }

  onPageScroll(event: unknown): void {
    HSApp.Catalog.BaseApiManager.getInstance().eventsManager.listenMouseEvent({
      type: 'scroll',
    });
  }

  getEnvIsTpzz(): boolean {
    return HSApp.App.getApp().environmentManager.activeEnvironmentId === HSFPConstants.Environment.TPZZ;
  }

  getEnvIsIHome(): boolean {
    return HSApp.Util.Url.getQueryStrings().env === 'ihomeDecoration';
  }

  render(): React.ReactElement {
    const { showSearchBox } = this.state;
    const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
    const { specialTopicModelClick, entryText, onHeaderBack } = this.props;

    return (
      <div className="special-topic-landing-page">
        <div className="special-topic-header">
          <catalogLib.BackHeader onBack={onHeaderBack} title={entryText} />
          {showSearchBox && (
            <catalogLib.SearchBox
              placeholder={ResourceManager.getString('save_defaultTitle_placeholder')}
              setSearchConfig={this.searchProducts}
              backIconType="delete"
              handleBack={this.clickSearchBoxIcon}
              showSearchPicture={true}
            />
          )}
        </div>
        <Scroll
          className="model-area"
          onScrollY={this.onPageScroll}
          scrollYTip={true}
          options={{ suppressScrollX: true }}
        >
          {this.showModelTopic && (
            <SpecialTopicModel specialTopicModelClick={specialTopicModelClick} />
          )}
        </Scroll>
      </div>
    );
  }
}