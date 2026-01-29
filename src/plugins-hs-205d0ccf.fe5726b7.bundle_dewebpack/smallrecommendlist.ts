import React from 'react';
import { Carousel } from 'antd';
import { IconfontView } from './IconfontView';
import ProductItemContainer from './ProductItemContainer';

interface RecommendItem {
  id: string;
  [key: string]: unknown;
}

interface SmallRecommendListProps {
  recommendList: RecommendItem[];
}

interface UserTrackLogger {
  push(event: string, data: Record<string, unknown>, options?: Record<string, unknown>): void;
}

interface EventsManager {
  handleItemClick(event: React.MouseEvent, item: RecommendItem): void;
}

interface BaseApiManager {
  eventsManager: EventsManager;
}

interface MemberInfo {
  stylerMember?: unknown;
}

interface AdskUser {
  memberInfo?: MemberInfo;
}

interface App {
  userTrackLogger: UserTrackLogger;
}

interface CatalogNamespace {
  BaseApiManager: {
    getInstance(): BaseApiManager;
  };
}

interface AppNamespace {
  getApp(): App;
}

interface HSAppGlobal {
  Catalog: CatalogNamespace;
  App: AppNamespace;
}

declare global {
  const HSApp: HSAppGlobal;
  const adskUser: AdskUser | undefined;
}

const ITEMS_PER_PAGE = 6;
const MAX_PAGES = 6;

export class SmallRecommendList extends React.Component<SmallRecommendListProps> {
  private _onItemClick: (event: React.MouseEvent, item: RecommendItem) => void;

  constructor(props: SmallRecommendListProps) {
    super(props);
    this._onItemClick = this.onItemClick.bind(this);
    this.afterChange = this.afterChange.bind(this);
  }

  private onItemClick(event: React.MouseEvent, item: RecommendItem): void {
    HSApp.Catalog.BaseApiManager.getInstance().eventsManager.handleItemClick(event, item);
    
    HSApp.App.getApp().userTrackLogger.push('recommend.collocations.dialog', {
      activeSection: 'recommend',
      activeSectionName: '智能推荐',
      description: '智能推荐-模型添加',
      clicksRatio: {
        id: 'modelClick',
        name: '智能推荐模型添加',
        seekId: item.id
      }
    }, {});
  }

  private afterChange(currentPage: number): void {
    HSApp.App.getApp().userTrackLogger.push('recommend.collocations.dialog', {
      activeSection: 'recommend',
      activeSectionName: '智能推荐',
      description: '智能推荐-翻页',
      clicksRatio: {
        id: 'switchPage',
        name: '翻页'
      }
    }, {});
  }

  render(): React.ReactNode {
    const { recommendList } = this.props;
    const totalPages = Math.ceil(recommendList.length / ITEMS_PER_PAGE);
    const pages = new Array(totalPages).fill(0);

    const prevArrow = (
      <div>
        <IconfontView
          customClass="recommend-carousel-prev"
          customStyle={{ fontSize: '12px' }}
          hoverBgColor="#D8D8D8"
          showType="hs_xiao_danjiantou_zuo"
        />
      </div>
    );

    const nextArrow = (
      <div>
        <IconfontView
          customClass="recommend-carousel-next"
          customStyle={{ fontSize: '12px' }}
          hoverBgColor="#D8D8D8"
          showType="hs_xiao_danjiantou_you"
        />
      </div>
    );

    return (
      <div className="recommend-container-small">
        <Carousel
          arrows={true}
          infinite={false}
          prevArrow={prevArrow}
          nextArrow={nextArrow}
          afterChange={(current: number) => {
            this.afterChange(current);
          }}
        >
          {pages.map((_, pageIndex) => {
            const startIndex = pageIndex * ITEMS_PER_PAGE;
            const pageItems = recommendList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            if (pageIndex >= MAX_PAGES) {
              return null;
            }

            return (
              <div className="recommand-list-small" key={pageIndex}>
                {pageItems.map((item) => (
                  <ProductItemContainer
                    key={item.id}
                    className="product-item-recommend-small"
                    item={item}
                    onItemClick={this._onItemClick}
                    stylerMember={adskUser?.memberInfo?.stylerMember}
                  />
                ))}
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}