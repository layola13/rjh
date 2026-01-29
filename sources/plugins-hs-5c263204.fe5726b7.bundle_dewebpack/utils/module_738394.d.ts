/**
 * Favorite Topic Component
 * Provides functionality to add/remove topics from favorites with visual feedback
 */

import { Message, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import IconfontView from './IconfontView';
import store from './store';

/**
 * Topic item data structure
 */
interface TopicItem {
  /** Unique identifier for the topic pool */
  poolId: number | string;
  /** Additional topic properties */
  [key: string]: unknown;
}

/**
 * Props for the internal FavoriteTopicButton component
 */
interface FavoriteTopicButtonProps {
  /** The topic item to favorite/unfavorite */
  item: TopicItem;
  /** Whether to show the label text next to the icon */
  isShowLabel?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Whether the hover state is active */
  isHover?: boolean;
  /** Whether to show the component on hover only */
  isShowHover?: boolean;
  /** Title to display when favorite operation succeeds */
  succeededTitle?: string;
  /** Favorite groups from Redux state */
  favoriteGroups?: unknown;
}

/**
 * Props for the exported FavoriteTopic component wrapper
 */
interface FavoriteTopicProps extends Omit<FavoriteTopicButtonProps, 'favoriteGroups'> {}

/**
 * Redux state shape
 */
interface RootState {
  /** Collection of favorite group items */
  groupItems: unknown;
}

/**
 * Favorite plugin interface
 */
interface FavoritePlugin {
  /** Get the current favorites topic data set */
  getFavoritesTopicData(): Set<string>;
  /** Add a topic to favorites */
  addFavoritesTopic(poolId: number | string): Promise<boolean>;
  /** Remove a topic from favorites */
  deleteFavoritesTopic(options: { sourceId: number | string; favoritesType: number }): Promise<void>;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /** Get a plugin by type */
  getPlugin(type: string): FavoritePlugin;
}

/**
 * Global HSApp interface
 */
declare global {
  const HSApp: {
    App: {
      getApp(): {
        pluginManager: PluginManager;
      };
    };
  };

  const HSFPConstants: {
    PluginType: {
      Favorite: string;
    };
  };

  const ResourceManager: {
    getString(key: string): string;
  };
}

/**
 * Maps Redux state to component props
 */
const mapStateToProps = (state: RootState) => ({
  favoriteGroups: state.groupItems,
});

/**
 * Internal favorite topic button component with Redux connection
 */
const FavoriteTopicButton: React.FC<FavoriteTopicButtonProps> = connect(mapStateToProps)((props) => {
  const {
    item,
    isShowLabel = true,
    className = '',
    isHover = false,
    isShowHover = false,
    succeededTitle = '',
  } = props;

  // Get favorite plugin instance
  const favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);

  // Normalize pool ID to string for Set lookup
  const poolIdString = item?.poolId?.toString();

  // Check if current topic is already favorited
  const isInitiallyFavorited = favoritePlugin.getFavoritesTopicData().has(poolIdString) || false;

  // Local favorite state
  const [isFavorited, setIsFavorited] = useState<boolean>(isInitiallyFavorited);

  // Sync favorite state when item changes
  useEffect(() => {
    const isFavoritedNow = favoritePlugin.getFavoritesTopicData().has(poolIdString) || false;
    setIsFavorited(isFavoritedNow);
  }, [item, poolIdString, favoritePlugin]);

  // Icon style based on favorite state
  const iconStyle: React.CSSProperties = {
    color: isFavorited ? '#FFB739' : '#9B9FAB',
    fontSize: '14px',
  };

  // Tooltip text based on favorite state
  const tooltipTitle = isFavorited
    ? ResourceManager.getString('catalog_topic_isFav_tooltip')
    : ResourceManager.getString('catalog_topic_unFav_tooltip');

  // Label text based on favorite state
  const labelText = isFavorited
    ? ResourceManager.getString('catalog_topic_isfav_icon_text')
    : ResourceManager.getString('catalog_topic_unfav_icon_text');

  // Handle favorite toggle click
  const handleToggleFavorite = (): void => {
    if (isFavorited) {
      // Remove from favorites
      favoritePlugin
        .deleteFavoritesTopic({
          sourceId: item.poolId,
          favoritesType: 4,
        })
        .then(() => {
          setIsFavorited(!isFavorited);
        })
        .catch(() => {
          // Error handling silently
        });
    } else {
      // Add to favorites
      favoritePlugin
        .addFavoritesTopic(item.poolId)
        .then((success) => {
          if (success) {
            setIsFavorited(!isFavorited);
            Message.success(succeededTitle);
          }
        })
        .catch(() => {
          // Error handling silently
        });
    }
  };

  // Hide component if isShowHover is true but not hovering
  if (isShowHover && !isHover) {
    return null;
  }

  return (
    <Tooltip title={tooltipTitle} placement="top" color="dark">
      <div className={`${className} special-topic-model-fav`} onClick={handleToggleFavorite}>
        <IconfontView
          showType="hs_mian_shoucang"
          customStyle={iconStyle}
          hoverColor={isFavorited ? '#FFB739' : '#60646f'}
        />
        {isShowLabel && <span className="fav-text">{labelText}</span>}
      </div>
    </Tooltip>
  );
});

/**
 * Favorite topic component with Redux provider wrapper
 * Allows users to add/remove topics from their favorites list
 * 
 * @param props - Component props
 * @returns Wrapped favorite topic button with Redux store
 */
declare const FavoriteTopic: React.FC<FavoriteTopicProps>;

export default FavoriteTopic;