import { useState, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { Message, Tooltip } from 'some-ui-library';
import IconfontView from './IconfontView';
import store from './store';

interface TopicItem {
  poolId: number;
  [key: string]: unknown;
}

interface FavoritePlugin {
  getFavoritesTopicData(): Map<string, unknown>;
  addFavoritesTopic(poolId: number): Promise<boolean>;
  deleteFavoritesTopic(params: { sourceId: number; favoritesType: number }): Promise<void>;
}

interface AppPluginManager {
  getPlugin(pluginType: string): FavoritePlugin;
}

interface HSApp {
  App: {
    getApp(): {
      pluginManager: AppPluginManager;
    };
  };
}

interface FavComponentProps {
  item: TopicItem;
  isShowLabel?: boolean;
  className?: string;
  isHover?: boolean;
  isShowHover?: boolean;
  succeededTitle?: string;
  favoriteGroups?: unknown;
}

declare const HSApp: HSApp;
declare const HSFPConstants: { PluginType: { Favorite: string } };
declare const ResourceManager: {
  getString(key: string): string;
};

const FAVORITE_TYPE_TOPIC = 4;

const FavComponent: React.FC<FavComponentProps> = ({
  item,
  isShowLabel = true,
  className = '',
  isHover = false,
  isShowHover = false,
  succeededTitle = ''
}) => {
  const favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);
  const poolIdString = item?.poolId?.toString();
  const initialIsFavorite = favoritePlugin.getFavoritesTopicData().has(poolIdString) || false;
  
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);

  useEffect(() => {
    const currentIsFavorite = favoritePlugin.getFavoritesTopicData().has(poolIdString) || false;
    setIsFavorite(currentIsFavorite);
  }, [item, poolIdString, favoritePlugin]);

  const iconStyle = {
    color: isFavorite ? '#FFB739' : '#9B9FAB',
    fontSize: '14px'
  };

  const tooltipTitle = isFavorite
    ? ResourceManager.getString('catalog_topic_isFav_tooltip')
    : ResourceManager.getString('catalog_topic_unFav_tooltip');

  const iconText = isFavorite
    ? ResourceManager.getString('catalog_topic_isfav_icon_text')
    : ResourceManager.getString('catalog_topic_unfav_icon_text');

  const handleClick = async (): Promise<void> => {
    if (isFavorite) {
      try {
        await favoritePlugin.deleteFavoritesTopic({
          sourceId: item.poolId,
          favoritesType: FAVORITE_TYPE_TOPIC
        });
        setIsFavorite(!isFavorite);
      } catch (error) {
        // Handle error silently
      }
    } else {
      try {
        const result = await favoritePlugin.addFavoritesTopic(item.poolId);
        if (result) {
          setIsFavorite(!isFavorite);
          Message.success(succeededTitle);
        }
      } catch (error) {
        // Handle error silently
      }
    }
  };

  if (isShowHover && !isHover) {
    return null;
  }

  return (
    <Tooltip title={tooltipTitle} placement="top" color="dark">
      <div className={`${className} special-topic-model-fav`} onClick={handleClick}>
        <IconfontView
          showType="hs_mian_shoucang"
          customStyle={iconStyle}
          hoverColor={isFavorite ? '#FFB739' : '#60646f'}
        />
        {isShowLabel && <span className="fav-text">{iconText}</span>}
      </div>
    </Tooltip>
  );
};

const mapStateToProps = (state: { groupItems: unknown }) => ({
  favoriteGroups: state.groupItems
});

const ConnectedFavComponent = connect(mapStateToProps)(FavComponent);

const FavComponentWithProvider: React.FC<FavComponentProps> = (props) => {
  return (
    <Provider store={store}>
      <ConnectedFavComponent {...props} />
    </Provider>
  );
};

export default FavComponentWithProvider;