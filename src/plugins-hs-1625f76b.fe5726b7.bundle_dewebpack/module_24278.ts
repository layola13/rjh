import { useState } from 'react';
import React from 'react';

interface SpecialTopicItem {
  id: string;
  name: string;
  coverUrl?: string;
  attributes?: {
    COVER?: string;
  };
}

interface SpecialTopicListItemProps {
  item: SpecialTopicItem;
  topicType: string;
  specialTopicModelClick: (topic: SpecialTopicItemWithType) => void;
  className?: string;
  newTag?: boolean;
}

interface SpecialTopicItemWithType extends SpecialTopicItem {
  topicType: string;
  poolId?: string;
}

const DEFAULT_COVER_IMAGE = `${HSApp.Config.RES_BASEPATH}v2/image/logo/specialtopicbanner.png`;

const SpecialTopicListItem: React.FC<SpecialTopicListItemProps> = ({
  item,
  topicType,
  specialTopicModelClick,
  className = '',
  newTag
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const favoriteTopicContainer = HSApp.App.getApp()
    .pluginManager
    .getPlugin(HSFPConstants.PluginType.Favorite)
    .favTopicContainer;

  const isFpTenant = HSApp.Config.TENANT === 'fp';

  const getCoverImageUrl = (): string => {
    if (isFpTenant) {
      return item.coverUrl ?? DEFAULT_COVER_IMAGE;
    }
    return item.attributes?.COVER ?? DEFAULT_COVER_IMAGE;
  };

  const handleImageClick = (): void => {
    let topicData: SpecialTopicItemWithType = Object.assign({}, item, {
      topicType
    });

    if (isFpTenant) {
      topicData = Object.assign({}, topicData, {
        poolId: item.id
      });
    }

    const eventTracker = HSApp.Util.EventTrack.instance();

    if (isFpTenant) {
      eventTracker.track(
        HSApp.Util.EventGroupEnum.ModelChannel,
        'list_click_event',
        { pool_id: item.id }
      );
    } else {
      eventTracker.track(
        HSApp.Util.EventGroupEnum.Catalog,
        'open_model_column_event',
        { sColumnNo: item.name }
      );
    }

    specialTopicModelClick(topicData);
  };

  const handleMouseEnter = (): void => {
    setIsHover(true);
  };

  const handleMouseLeave = (): void => {
    setIsHover(false);
  };

  return (
    <div
      className={`special-topic-list-fav-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="img-cover"
        src={getCoverImageUrl()}
        onClick={handleImageClick}
      />
      {newTag && <span className="new-tag">NEW</span>}
      {!isFpTenant && (
        <favoriteTopicContainer
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

export default SpecialTopicListItem;