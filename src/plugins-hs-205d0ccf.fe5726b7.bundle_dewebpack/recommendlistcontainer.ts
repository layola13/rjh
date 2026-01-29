import React from 'react';
import { SmallRecommendList } from './SmallRecommendList';
import CatalogFilter from './CatalogFilter';

interface BackendCategoryInfo {
  categoryId: string;
}

interface RecommendItem {
  backendCategoryInfo: BackendCategoryInfo;
  [key: string]: unknown;
}

interface FilterData {
  [key: string]: unknown;
}

interface ModelData {
  items: RecommendItem[];
  filters?: FilterData[];
}

interface RecommendListContainerProps {
  entityId: string;
  modelData?: ModelData;
}

interface RecommendListContainerState {
  entityId: string;
  currentCategoryId: string;
  currentRecommendList: RecommendItem[];
}

interface UserTrackLogger {
  push(event: string, data: Record<string, unknown>, extra: Record<string, unknown>): void;
}

interface HSApp {
  App: {
    getApp(): {
      userTrackLogger: UserTrackLogger;
    };
  };
}

declare const HSApp: HSApp;

export class RecommendListContainer extends React.Component<
  RecommendListContainerProps,
  RecommendListContainerState
> {
  constructor(props: RecommendListContainerProps) {
    super(props);

    const initialItems = props.modelData?.items ?? [];

    this.state = {
      entityId: props.entityId,
      currentCategoryId: 'all',
      currentRecommendList: initialItems,
    };
  }

  private onCategoryClick = (categoryId: string): void => {
    const allItems = this.props.modelData?.items ?? [];
    
    const filteredItems = allItems.filter((item) => {
      return item.backendCategoryInfo.categoryId === categoryId;
    });

    this.setState({
      currentCategoryId: categoryId,
      currentRecommendList: categoryId === 'all' ? [...allItems] : [...filteredItems],
    });

    HSApp.App.getApp().userTrackLogger.push(
      'recommend.collocations.dialog',
      {
        activeSection: 'recommend',
        activeSectionName: '智能推荐',
        description: '智能推荐-类目切换',
        clicksRatio: {
          id: 'switchCategory',
          name: '点击切换类目',
        },
      },
      {}
    );
  };

  componentWillReceiveProps(nextProps: RecommendListContainerProps): void {
    const nextItems = nextProps.modelData?.items;
    const currentItems = this.state.currentRecommendList;

    if (nextItems !== currentItems) {
      let updatedCategoryId = this.state.currentCategoryId;
      let updatedRecommendList = nextItems?.filter((item) => {
        return (
          updatedCategoryId === 'all' ||
          item.backendCategoryInfo.categoryId === updatedCategoryId
        );
      });

      if (nextProps.entityId !== this.props.entityId) {
        updatedRecommendList = nextProps.modelData?.items;
        updatedCategoryId = 'all';
      }

      this.setState({
        currentCategoryId: updatedCategoryId,
        currentRecommendList: updatedRecommendList ?? [],
      });
    }
  }

  render(): React.ReactElement {
    const { modelData } = this.props;
    const { currentRecommendList } = this.state;
    const clonedRecommendList = [...currentRecommendList];

    return (
      <div className="recommend-container">
        <div className="filters-area">
          <CatalogFilter
            data={modelData?.filters ?? []}
            onCatalogClick={this.onCategoryClick}
            changeHeight={() => {}}
          />
        </div>
        <SmallRecommendList recommendList={clonedRecommendList} />
      </div>
    );
  }
}