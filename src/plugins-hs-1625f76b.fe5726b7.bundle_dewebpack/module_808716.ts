import React, { Component } from 'react';

interface QueryStrings {
  env?: string;
  [key: string]: string | undefined;
}

interface SearchParams {
  categoriesIds: string;
  [key: string]: unknown;
}

interface ComponentState {
  categories: unknown[];
  modelData: unknown[];
  showSearchBox: boolean;
  stylerMember: boolean;
  searchText: string;
}

interface ComponentProps {
  searchProducts: (params: SearchParams) => void;
  onPoolClick: (pool: string) => void;
  specialTopicModelClick?: unknown;
  fromMyPaid?: boolean;
  entryText?: string;
  title?: string;
  cacheTabsValue?: unknown;
  tabsValue?: unknown;
}

interface EventTrackParams {
  logType: string;
  targetType: string;
  action: string;
  area: string;
  searchType: string;
}

interface TooltipContent {
  icon: string;
  iconHover: string;
  tooltipTitle: string;
}

interface BackgroundStyle {
  width: string;
  height: string;
  borderRadius: string;
  background: string;
}

enum PoolEnum {
  HighQualityPool = 'HighQualityPool',
  HighCommissionPool = 'HighCommissionPool'
}

class SpecialTopicLandingPage extends Component<ComponentProps, ComponentState> {
  private showModelTopic: boolean;
  private poolData: unknown;
  private _inICBUEnv: boolean;
  private eventTrackManager: {
    signalCatalogToLog: (params: EventTrackParams) => void;
  };

  constructor(props: ComponentProps) {
    super(props);

    this.state = {
      categories: [],
      modelData: [],
      showSearchBox: false,
      stylerMember: false,
      searchText: ''
    };

    this.showModelTopic = ['ezhome', 'fp'].includes(HSApp.Config.TENANT);
    this.poolData = HSApp.PartnerConfig.MODEL_LIBRARY_POOL;

    const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
    this._inICBUEnv = queryStrings.env === 'icbu';

    this.searchProducts = this.searchProducts.bind(this);
    this.onPageScroll = this.onPageScroll.bind(this);
    this.eventTrackManager = HSApp.Catalog.EventTrackManager.getInstance();
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
        searchType: 'text'
      });
    }
  };

  dataUpdata = (stylerMember: boolean): void => {
    this.setState({ stylerMember });
  };

  searchModelPackage = (searchText: string): void => {
    this.setState({ searchText });
  };

  resetListPageParams = (): void => {
    this.setState({ searchText: '' });
  };

  handleSearchBack = (): void => {
    this.resetListPageParams();
  };

  searchProducts(params: SearchParams): void {
    Object.assign(params, { categoriesIds: '' });
    this.props.searchProducts(params);
  }

  onPoolClick(pool: string): void {
    this.props.onPoolClick(pool);
  }

  onPageScroll(event: unknown): void {
    HSApp.Catalog.BaseApiManager.getInstance().eventsManager.listenMouseEvent({
      type: 'scroll'
    });
  }

  getEnvIsTpzz(): boolean {
    return HSApp.App.getApp().environmentManager.activeEnvironmentId === HSFPConstants.Environment.TPZZ;
  }

  getEnvIsIHome(): boolean {
    return HSApp.Util.Url.getQueryStrings().env === 'ihomeDecoration';
  }

  render(): React.ReactElement {
    const { showSearchBox, stylerMember, searchText } = this.state;
    const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
    const isTpzzEnv = this.getEnvIsTpzz();
    const isIHomeEnv = this.getEnvIsIHome();
    const shouldHideCityTopic = isTpzzEnv || isIHomeEnv;
    const {
      specialTopicModelClick,
      fromMyPaid,
      entryText,
      title,
      cacheTabsValue,
      tabsValue
    } = this.props;
    const isFpTenant = HSApp.Config.TENANT === 'fp';

    const tooltipContent: TooltipContent = {
      icon: 'hs_shuxingmianban_xiangqing',
      iconHover: 'hs_shuxingmianban_xiangqinghover',
      tooltipTitle: isFpTenant ? ResourceManager.getString('catalog_model_tips') : ''
    };

    const iconBackground: BackgroundStyle = {
      width: '25px',
      height: '25px',
      borderRadius: '25px',
      background: '#efefef'
    };

    return (
      <div className="special-topic-landing-page">
        <div className="special-topic-header">
          {!showSearchBox && (
            <catalogLib.PageTitle
              mainTitle={entryText}
              secondTitle={title}
              stylerMember={stylerMember}
              tooltipContent={tooltipContent}
            />
          )}
          {!isFpTenant && !showSearchBox && (
            <catalogLib.IconfontRadiusView
              showType="hs_xian_sousuo"
              customClass="special-search-icon"
              background={iconBackground}
              iconOnclick={this.clickSearchBoxIcon}
            />
          )}
          {!showSearchBox && (
            <catalogLib.SearchBox
              placeholder={ResourceManager.getString('search_model_package_in_model_library')}
              useDiyPlaceholder={true}
              backIconType="back"
              notNeedAutoSuggest={true}
              notNeedHotWords={true}
              showBackIcon={!!searchText}
              defaultSearchKey={searchText}
              handleBack={this.handleSearchBack}
              handleSearch={this.searchModelPackage}
            />
          )}
        </div>
        <Scroll
          className="model-area"
          onScrollY={this.onPageScroll}
          scrollYTip={true}
          options={{ suppressScrollX: true }}
        >
          {!this._inICBUEnv && HSApp.Config.TENANT === 'ezhome' && this.poolData ? (
            <div className="model-pool-area">
              <div className="title">
                {ResourceManager.getString('catalog_model_recommend')}
              </div>
              <div
                className="model-pool high-quality-pool"
                onClick={() => this.onPoolClick(PoolEnum.HighQualityPool)}
              />
              <div
                className={`model-pool ${shouldHideCityTopic ? 'high-commission-pool-hide' : 'high-commission-pool'}`}
                onClick={() => this.onPoolClick(PoolEnum.HighCommissionPool)}
              />
            </div>
          ) : null}
          {this.showModelTopic && (
            <SpecialTopicContent
              specialTopicModelClick={specialTopicModelClick}
              tabsValue={tabsValue}
              searchText={searchText}
              fromMyPaid={fromMyPaid}
              hideCityTopic={shouldHideCityTopic}
              cacheTabsValue={cacheTabsValue}
              dataUpdata={this.dataUpdata}
            />
          )}
        </Scroll>
      </div>
    );
  }
}

export default SpecialTopicLandingPage;