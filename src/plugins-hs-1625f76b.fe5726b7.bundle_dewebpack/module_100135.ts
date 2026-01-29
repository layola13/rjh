import React from 'react';

enum TopicType {
  all = '',
  designType = '1',
  cityType = '2'
}

enum PriceType {
  all = ''
}

enum TagType {
  all = ''
}

interface Tab {
  value: string;
  label: string;
}

interface Filter {
  allFilters: unknown[];
  outerFilters: unknown[];
  restFilters: unknown[];
}

interface ModelDataItem {
  [key: string]: unknown;
}

interface SearchTopicParams {
  poolType?: string;
  sellType?: string;
  keyword?: string;
  poolTag?: string;
  pageNum?: number;
  pageSize?: number;
}

interface SearchTopicResponse {
  data?: ModelDataItem[];
  items?: ModelDataItem[];
  stylerMember?: boolean;
  recItems?: ModelDataItem[];
  attributes?: unknown[];
}

interface PaidPackageResponse {
  items?: ModelDataItem[];
}

interface ComponentProps {
  fromMyPaid?: boolean;
  hideCityTopic?: boolean;
  searchText?: string;
  dataUpdata?: (stylerMember: boolean) => void;
  cacheTabsValue?: (value: string | FilterChangeEvent) => void;
  tabsValue?: string;
  specialTopicModelClick?: (item: ModelDataItem) => void;
}

interface ComponentState {
  loading: boolean;
  modelData: ModelDataItem[];
  recItems: ModelDataItem[];
  topicType: string;
  priceType: string;
  tagType: string;
  tabs: Tab[];
  filters: Filter;
  stylerMember: boolean;
}

interface FilterChangeEvent {
  trackFilters?: string;
}

declare const HSApp: {
  Config: {
    ALL_MODEL_SPECIAL_TOPIC_URL: string;
    TENANT: string;
  };
  App: {
    getApp(): {
      pluginManager: {
        getPlugin(name: string): {
          showModelApplyPanel(): void;
        };
      };
    };
  };
  Util: {
    EventGroupEnum: {
      Catalog: string;
    };
    EventTrack: {
      instance(): {
        track(group: string, event: string, data: Record<string, unknown>): void;
      };
    };
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const apiService: {
  getPaidPackageList(params: { pageNum: number; pageSize: number }): Promise<PaidPackageResponse>;
  searchTopicList(params: SearchTopicParams): Promise<SearchTopicResponse>;
};

declare const TabsComponent: React.FC<{
  className: string;
  tabs: Tab[];
  defaultValue?: string;
  onChange: (event: unknown, value: string) => void;
}>;

declare const FilterContainer: React.FC<{
  filterSource: Record<string, unknown>;
  filters: Filter;
  filterMap: Map<unknown, unknown>;
  onFilterSearch: (event: FilterChangeEvent) => void;
}>;

declare const IconfontView: React.FC<{
  showType: string;
  customStyle: React.CSSProperties;
  hoverColor: string;
}>;

declare const TopicItem: React.FC<{
  item: ModelDataItem;
  topicType: string;
  specialTopicModelClick?: (item: ModelDataItem) => void;
  stylerMember: boolean;
  fromMyPaid?: boolean;
}>;

declare const noDataImage: string;
declare const loadingImage: string;

export default class SpecialTopicList extends React.Component<ComponentProps, ComponentState> {
  private readonly allModelSpecialTopUrl: string;
  private readonly filterMap: Map<unknown, unknown>;

  constructor(props: ComponentProps) {
    super(props);
    this.allModelSpecialTopUrl = HSApp.Config.ALL_MODEL_SPECIAL_TOPIC_URL;
    this.filterMap = new Map();
    this.state = {
      loading: true,
      modelData: [],
      recItems: [],
      topicType: '',
      priceType: '',
      tagType: '',
      tabs: [
        {
          value: TopicType.designType,
          label: ResourceManager.getString('catalog_model_design_topics')
        },
        {
          value: TopicType.cityType,
          label: ResourceManager.getString('catalog_model_city_topics')
        }
      ],
      filters: {
        allFilters: [],
        outerFilters: [],
        restFilters: []
      },
      stylerMember: false
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount(): void {
    if (this.props.fromMyPaid) {
      this.getPaidPackageList();
    } else if (HSApp.Config.TENANT === 'fp') {
      this.getFpTopicListByType(TopicType.all, PriceType.all, TagType.all);
    } else if (this.props.hideCityTopic) {
      this.getTopicListByType(TopicType.designType);
    }
  }

  componentDidUpdate(prevProps: ComponentProps): void {
    if (this.isPropChanged(prevProps, 'searchText')) {
      this.getFpTopicListByType(this.state.topicType, this.state.priceType, this.state.tagType);
    }
  }

  private isPropChanged(prevProps: ComponentProps, propName: keyof ComponentProps): boolean {
    return prevProps[propName] !== this.props[propName];
  }

  private getPaidPackageList(): void {
    this.setState({ loading: true });
    apiService.getPaidPackageList({ pageNum: 1, pageSize: 500 }).then((response) => {
      const items = response.items ?? [];
      this.setState({
        modelData: items,
        loading: false
      });
    });
  }

  private getFpTopicListByType(topicType: string, priceType: string, tagType: string): void {
    this.setState({ loading: true });
    const searchText = this.props.searchText;
    const params: SearchTopicParams = {
      poolType: topicType.toString(),
      sellType: priceType.toString(),
      keyword: searchText,
      poolTag: tagType.toString()
    };
    if (HSApp.Config.TENANT === 'fp') {
      params.pageNum = 1;
      params.pageSize = 500;
    }
    apiService.searchTopicList(params).then((response) => {
      const data = response.data ?? [];
      const items = response.items ?? [];
      const stylerMember = response.stylerMember ?? false;
      const recItems = response.recItems ?? [];
      const attributes = response.attributes ?? [];
      this.setState({
        modelData: HSApp.Config.TENANT === 'fp' ? items : data,
        recItems: recItems,
        topicType: topicType,
        loading: false,
        stylerMember: stylerMember,
        filters: {
          allFilters: attributes,
          outerFilters: attributes,
          restFilters: []
        }
      });
      const dataUpdata = this.props.dataUpdata;
      if (dataUpdata) {
        dataUpdata(stylerMember);
      }
    });
  }

  private getTopicListByType(topicType: string): void {
    this.setState({ loading: true });
    const params: SearchTopicParams = { poolType: topicType };
    if (HSApp.Config.TENANT === 'fp') {
      params.pageNum = 1;
      params.pageSize = 500;
    }
    apiService.searchTopicList(params).then((response) => {
      const data = response.data ?? [];
      const items = response.items ?? [];
      this.setState({
        modelData: HSApp.Config.TENANT === 'fp' ? items : data,
        topicType: topicType,
        loading: false
      });
    });
  }

  private handleTabChange(event: unknown, value: string): void {
    if (value !== this.state.topicType) {
      const cacheTabsValue = this.props.cacheTabsValue;
      if (cacheTabsValue) {
        cacheTabsValue(value);
      }
      this.getTopicListByType(value);
    }
  }

  private handleFilterChange(event: FilterChangeEvent): void {
    const trackFilters = JSON.parse(event?.trackFilters ?? '{}');
    this.setState(
      {
        ...this.state,
        priceType: '',
        topicType: '',
        tagType: '',
        ...trackFilters
      },
      () => {
        this.getFpTopicListByType(this.state.topicType, this.state.priceType, this.state.tagType);
      }
    );
    const cacheTabsValue = this.props.cacheTabsValue;
    if (cacheTabsValue) {
      cacheTabsValue(event);
    }
  }

  private showNoDataView(): React.ReactNode {
    const { fromMyPaid, searchText } = this.props;
    const { topicType, recItems } = this.state;
    const noDataNewText = ResourceManager.getString('catalog_model_topic_no_data_new');
    const searchKeyword = searchText ? `「${searchText}」` : '';
    const noDataText =
      recItems.length > 0
        ? `${noDataNewText}${searchKeyword}`
        : ResourceManager.getString('catalog_model_topic_no_data');

    if (HSApp.Config.TENANT === 'fp' || topicType === TopicType.cityType) {
      return (
        <div className="no-result-area">
          <img
            className={`no-data-img ${recItems.length > 0 ? 'no-data-img-recommend' : ''}`}
            src={noDataImage}
          />
          <span className="no-data-tip">
            {fromMyPaid
              ? ResourceManager.getString('catalog_model_topic_no_purchased')
              : noDataText}
          </span>
        </div>
      );
    }
    return null;
  }

  private showModelApplyPanel(): void {
    HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.catalogpopup.Plugin').showModelApplyPanel();
    const eventGroup = HSApp.Util.EventGroupEnum.Catalog;
    HSApp.Util.EventTrack.instance().track(eventGroup, 'model_apply_entry', {});
  }

  render(): React.ReactNode {
    const { modelData, topicType, tabs, filters, loading, stylerMember, recItems } = this.state;
    const { tabsValue, specialTopicModelClick, hideCityTopic, fromMyPaid } = this.props;

    return (
      <div className="special-topic-list-page">
        {HSApp.Config.TENANT === 'fp' && !fromMyPaid && !hideCityTopic && (
          <FilterContainer
            filterSource={{}}
            filters={filters}
            filterMap={this.filterMap}
            onFilterSearch={this.handleFilterChange}
          />
        )}
        <div className="special-topic-area">
          {!fromMyPaid &&
            (hideCityTopic ? (
              <div className="title">
                {ResourceManager.getString('catalog_model_topic_recommend')}
              </div>
            ) : (
              HSApp.Config.TENANT !== 'fp' && (
                <TabsComponent
                  className="special-second-tabs"
                  tabs={tabs}
                  defaultValue={tabsValue}
                  onChange={this.handleTabChange}
                />
              )
            ))}
          {loading ? (
            <div className="loading-wrapper">
              <img src={loadingImage} />
            </div>
          ) : (
            <div className="special-topic-list">
              {modelData.length > 0
                ? modelData.map((item) => (
                    <TopicItem
                      item={item}
                      topicType={topicType}
                      specialTopicModelClick={specialTopicModelClick}
                      stylerMember={stylerMember}
                      fromMyPaid={fromMyPaid}
                    />
                  ))
                : this.showNoDataView()}
              {recItems.length > 0 && (
                <div className="no-data-tip-recommend">
                  {ResourceManager.getString('catalog_model_topic_no_data_recommend')}
                </div>
              )}
              {recItems.length > 0 &&
                recItems.map((item) => (
                  <TopicItem
                    item={item}
                    topicType={topicType}
                    specialTopicModelClick={specialTopicModelClick}
                    stylerMember={stylerMember}
                    fromMyPaid={fromMyPaid}
                  />
                ))}
            </div>
          )}
        </div>
        {HSApp.Config.TENANT !== 'fp' ? (
          modelData.length > 0 &&
          topicType === TopicType.designType && (
            <div className="link-to-model-special-topic">
              <a className="link-to-web" href={this.allModelSpecialTopUrl} target="_blank">
                {ResourceManager.getString('catalog_model_topics_view_all_topics')}
                <IconfontView
                  showType="hs_xiao_danjiantou_you"
                  customStyle={{ fontSize: '12px' }}
                  hoverColor="#396EFE"
                />
              </a>
            </div>
          )
        ) : (
          !fromMyPaid &&
          !loading && (
            <div className="no-relative-container">
              <div className="no-relative-model">
                <div className="no-result-tips">
                  <span className="no-relative-model-text">
                    {ResourceManager.getString('model_apply_tip')}{' '}
                    {ResourceManager.getString('try')}
                    <span className="model-apply-tip" onClick={this.showModelApplyPanel}>
                      {' '}
                      {ResourceManager.getString('model_apply_entry')}{' '}
                    </span>
                    <span className="no-relative-model-text no-relative-model-text-ba">
                      {ResourceManager.getString('ba')}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}