import React from 'react';
import ModelTopicCard from './ModelTopicCard';
import LoadingIcon from './LoadingIcon';
import TopicService from '../services/TopicService';

enum TopicType {
  All = '',
  DesignType = '1',
  CityType = '2',
}

enum PriceType {
  All = '',
  Paid = '1',
  Point = '2',
  Free = '3',
}

interface FilterValue {
  id: string;
  name: string;
}

interface Filter {
  count: number;
  id: string;
  name: string;
  values: FilterValue[];
}

interface Filters {
  allFilters: Filter[];
  outerFilters: Filter[];
  restFilters: Filter[];
}

interface TopicItem {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface SpecialTopicListPageProps {
  specialTopicModelClick?: (item: TopicItem) => void;
}

interface SpecialTopicListPageState {
  loading: boolean;
  modelData: TopicItem[];
  topicType: string;
  priceType: string;
  filters: Filters;
  stylerMember: boolean;
}

interface FilterChangeEvent {
  trackFilters?: string;
}

interface TopicListResponse {
  data?: TopicItem[];
  items?: TopicItem[];
  stylerMember?: boolean;
}

interface SearchTopicParams {
  poolType: string;
  sellType?: string;
  pageNum?: number;
  pageSize?: number;
}

class SpecialTopicListPage extends React.Component<SpecialTopicListPageProps, SpecialTopicListPageState> {
  private readonly allModelSpecialTopUrl: string;

  constructor(props: SpecialTopicListPageProps) {
    super(props);

    this.allModelSpecialTopUrl = HSApp.Config.ALL_MODEL_SPECIAL_TOPIC_URL;

    this.state = {
      loading: true,
      modelData: [],
      topicType: TopicType.DesignType,
      priceType: PriceType.All,
      filters: this.createFilters(),
      stylerMember: false,
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleStylerClick = this.handleStylerClick.bind(this);
  }

  componentDidMount(): void {
    if (HSApp.Config.TENANT === 'fp') {
      this.getFpTopicListByType(TopicType.All, PriceType.All);
    } else {
      this.getTopicListByType(TopicType.DesignType);
    }
  }

  handleStylerClick(): void {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.ModelChannel,
      'styler_member_promotion'
    );
  }

  getFpTopicListByType(topicType: string, priceType: string): void {
    this.setState({ loading: true });

    const params: SearchTopicParams = {
      poolType: '1',
      sellType: priceType.toString(),
    };

    if (HSApp.Config.TENANT === 'fp') {
      params.pageNum = 1;
      params.pageSize = 500;
    }

    TopicService.searchTopicList(params).then((response: TopicListResponse) => {
      const data = response.data ?? [];
      const items = response.items ?? [];
      const stylerMember = response.stylerMember ?? false;

      this.setState({
        modelData: HSApp.Config.TENANT === 'fp' ? items : data,
        topicType: TopicType.DesignType,
        loading: false,
        stylerMember,
      });
    });
  }

  getTopicListByType(topicType: string): void {
    this.setState({ loading: true });

    const params: SearchTopicParams = {
      poolType: '1',
    };

    if (HSApp.Config.TENANT === 'fp') {
      params.pageNum = 1;
      params.pageSize = 500;
    }

    TopicService.searchTopicList(params).then((response: TopicListResponse) => {
      const data = response.data ?? [];
      const items = response.items ?? [];

      this.setState({
        modelData: HSApp.Config.TENANT === 'fp' ? items : data,
        topicType: TopicType.DesignType,
        loading: false,
      });
    });
  }

  handleFilterChange(event: FilterChangeEvent): void {
    const parsedFilters = JSON.parse(event?.trackFilters ?? '{}');

    this.setState(
      {
        ...this.state,
        priceType: PriceType.All,
        topicType: TopicType.DesignType,
        ...parsedFilters,
      },
      () => {
        this.getFpTopicListByType(this.state.topicType, this.state.priceType);
      }
    );
  }

  render(): React.ReactNode {
    const { modelData, topicType, loading } = this.state;
    const { specialTopicModelClick } = this.props;

    return (
      <div className="special-topic-list-page">
        <div className="special-topic-area">
          {loading ? (
            <div className="loading-wrapper">
              <img src={LoadingIcon} alt="Loading" />
            </div>
          ) : (
            <div className="special-topic-list">
              {modelData.length > 0
                ? modelData.map((item) => (
                    <ModelTopicCard
                      key={item.id}
                      item={item}
                      topicType={topicType}
                      specialTopicModelClick={specialTopicModelClick}
                    />
                  ))
                : null}
            </div>
          )}
        </div>
        <div className="link-to-model-special-topic">
          <a
            className="link-to-web"
            href={this.allModelSpecialTopUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ResourceManager.getString('catalog_model_topics_view_all_topics')}
            <HSApp.UI.IconfontView
              showType="hs_xiao_danjiantou_you"
              customStyle={{ fontSize: '12px' }}
              hoverColor="#396EFE"
            />
          </a>
        </div>
      </div>
    );
  }

  private createFilters(): Filters {
    const categoryFilter: Filter = {
      count: 2,
      id: 'topicType',
      name: ResourceManager.getString('catalog_model_filter_category'),
      values: [
        {
          id: TopicType.DesignType,
          name: ResourceManager.getString('catalog_model_filter_collection'),
        },
        {
          id: TopicType.CityType,
          name: ResourceManager.getString('catalog_model_filter_package'),
        },
      ],
    };

    const priceFilter: Filter = {
      count: 3,
      id: 'priceType',
      name: ResourceManager.getString('catalog_model_filter_price'),
      values: [
        {
          id: PriceType.Free,
          name: ResourceManager.getString('catalog_model_filter_fitlerfree'),
        },
        {
          id: PriceType.Paid,
          name: ResourceManager.getString('catalog_model_filter_fitlerpaid'),
        },
        {
          id: PriceType.Point,
          name: ResourceManager.getString('catalog_model_filter_point'),
        },
      ],
    };

    return {
      allFilters: [categoryFilter, priceFilter],
      outerFilters: [categoryFilter, priceFilter],
      restFilters: [],
    };
  }
}

export default SpecialTopicListPage;