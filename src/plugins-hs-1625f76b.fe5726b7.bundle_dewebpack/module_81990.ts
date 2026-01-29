import { useState } from 'react';
import React from 'react';

interface SaleInfo {
  paid?: number;
  sale?: number;
}

interface TopicItem {
  id: string;
  name: string;
  coverUrl?: string;
  attributes?: {
    COVER?: string;
  };
  saleInfo?: SaleInfo;
  poolTrendTag?: string;
  topicType?: string;
  poolId?: string;
}

interface SpecialTopicListProps {
  item: TopicItem;
  topicType: string;
  specialTopicModelClick: (topic: TopicItem) => void;
  stylerMember?: boolean;
}

enum TopicTypeEnum {
  designType = '1',
  cityType = '2'
}

const DEFAULT_COVER_IMAGE = ''; // Replace with actual default cover constant

declare global {
  const HSApp: {
    Config: {
      TENANT: string;
    };
    App: {
      getApp: () => {
        pluginManager: {
          getPlugin: (pluginType: string) => {
            favTopicContainer: React.ComponentType<FavTopicContainerProps>;
          };
        };
      };
    };
    Util: {
      EventTrack: {
        instance: () => EventTrackInstance;
      };
      EventGroupEnum: {
        ModelChannel: string;
        Catalog: string;
      };
    };
  };
  const HSFPConstants: {
    PluginType: {
      Favorite: string;
    };
  };
  const ResourceManager: {
    getString: (key: string) => string;
  };
}

interface FavTopicContainerProps {
  succeededTitle: string;
  item: TopicItem;
  isShowLabel: boolean;
  isHover: boolean;
  isShowHover: boolean;
  className: string;
}

interface EventTrackInstance {
  track: (group: string, event: string, params: Record<string, unknown>) => void;
}

const SALE_STATUS_PAID = 1;
const SALE_TYPES_WITH_ICON = [1, 2];
const SALE_TYPE_PREMIUM = 4;
const TENANT_FP = 'fp';

const SpecialTopicList: React.FC<SpecialTopicListProps> = ({
  item,
  topicType,
  specialTopicModelClick,
  stylerMember
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const saleInfo = item.saleInfo;
  const isPaid = saleInfo?.paid === SALE_STATUS_PAID;
  const hasStandardSale = saleInfo && SALE_TYPES_WITH_ICON.includes(saleInfo.sale ?? 0);
  const isPremiumSale = saleInfo?.sale === SALE_TYPE_PREMIUM;

  const trendTagStyle: React.CSSProperties = {
    right: isPremiumSale || (!stylerMember && hasStandardSale && !isPaid) ? '24px' : '5px',
    fontSize: '12px'
  };

  const FavTopicContainer = HSApp.App.getApp()
    .pluginManager.getPlugin(HSFPConstants.PluginType.Favorite)
    .favTopicContainer;

  const handleTopicClick = (): void => {
    const eventTracker = HSApp.Util.EventTrack.instance();
    let topicData: TopicItem & { topicType?: string; poolId?: string } = {
      ...item,
      topicType
    };

    if (HSApp.Config.TENANT === TENANT_FP) {
      topicData = { ...topicData, poolId: item.id };
      eventTracker.track(HSApp.Util.EventGroupEnum.ModelChannel, 'list_click_event', {
        pool_id: item.id
      });
    } else {
      eventTracker.track(HSApp.Util.EventGroupEnum.Catalog, 'open_model_column_event', {
        sColumnNo: item.name
      });
    }

    specialTopicModelClick(topicData);
  };

  const getCoverImage = (): string => {
    if (HSApp.Config.TENANT === TENANT_FP) {
      return item.coverUrl ?? DEFAULT_COVER_IMAGE;
    }
    return item.attributes?.COVER ?? DEFAULT_COVER_IMAGE;
  };

  const shouldShowFavIcon = 
    HSApp.Config.TENANT !== TENANT_FP && topicType === TopicTypeEnum.designType;

  return (
    <div
      className="special-topic-list-fav-wrapper"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        className="img-cover"
        src={getCoverImage()}
        onClick={handleTopicClick}
      />

      {item.poolTrendTag && (
        <span className="new" style={trendTagStyle}>
          {item.poolTrendTag}
        </span>
      )}

      {isPremiumSale && (
        <IconfontView
          customClass="icon-styler"
          showType="juxing"
          customStyle={{ fontSize: '20px' }}
        />
      )}

      {!isPremiumSale && !stylerMember && hasStandardSale && !isPaid && (
        <IconfontView
          customClass="icon-styler"
          showType="hs_zhanshi_styler"
          customStyle={{ fontSize: '20px', opacity: 0.8 }}
        />
      )}

      {shouldShowFavIcon && (
        <FavTopicContainer
          succeededTitle={ResourceManager.getString('catalog_model_topic_fav-popup-title')}
          item={item}
          isShowLabel={false}
          isHover={isHover}
          isShowHover={true}
          className="special-topic-list-fav-icon"
        />
      )}
    </div>
  );
};

interface IconfontViewProps {
  customClass?: string;
  showType: string;
  customStyle?: React.CSSProperties;
}

const IconfontView: React.FC<IconfontViewProps> = ({ customClass, showType, customStyle }) => {
  return <span className={customClass} style={customStyle}>{showType}</span>;
};

export default SpecialTopicList;