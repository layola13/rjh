import { connect, Provider } from 'react-redux';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FavListPanel } from './FavListPanel';
import { addGroup } from './groupActions';
import favoritePlugin from './favoritePlugin';
import store from './store';

interface FavoriteGroup {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface FavItem {
  dataId: string;
  productType: string;
  jid: string;
  [key: string]: unknown;
}

interface FavContainerProps {
  favoriteGroups: FavoriteGroup[];
  dispatch: (action: unknown) => void;
  children?: (onClick: () => void) => React.ReactNode;
  showPopup?: boolean;
  addFav?: (item: FavItem) => void;
  cancelFav?: (item: FavItem) => void;
  item?: FavItem;
  isBatchMove?: boolean;
  isTopicBatchMove?: boolean;
  idList?: string[];
  handleMove?: () => void;
  updateFav?: (item: FavItem) => void;
  entityName?: string;
  showEditName?: boolean;
  type?: string;
  onSubmitCallback?: () => void;
  onCancelCallback?: () => void;
  seekId?: string;
}

const MOUSE_LEAVE_DELAY = 1000;
const PANEL_OFFSET_TOP = 15;
const PANEL_OFFSET_BOTTOM = 86;

const mapStateToProps = (state: { groupItems: FavoriteGroup[] }) => ({
  favoriteGroups: state.groupItems,
});

const FavContainer: React.FC<FavContainerProps> = ({
  favoriteGroups,
  dispatch,
  children,
  showPopup,
  addFav,
  cancelFav,
  item,
  isBatchMove,
  isTopicBatchMove,
  idList,
  handleMove,
  updateFav,
  entityName,
  showEditName,
  type,
  onSubmitCallback,
  onCancelCallback,
  seekId: initialSeekId,
}) => {
  const app = HSApp.App.getApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  
  const favoritePluginInstance = app.pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);
  const eventTrackManager = HSApp.Catalog.EventTrackManager.getInstance();
  const baseDataManager = HSApp.Catalog.Manager.baseApiManager.baseDataManager;
  
  let mouseLeaveTimer: number | undefined;
  let panelElement: Element | null = null;
  
  const updateCustomFavData = (action: string, dataId?: string, productType?: string): void => {
    const updatedData = baseDataManager.updateCustomFavData(action, dataId, productType);
    favoritePluginInstance.setCustomFavData(updatedData);
  };
  
  const seekId = item?.dataId ? item.jid : initialSeekId;
  const hasFavorited = favoritePluginInstance.getFavoritesData().has(seekId);
  const [isFaved, setIsFaved] = useState<boolean>(hasFavorited);
  
  const handleAddGroup = (groupName: string): unknown => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      'create_favorate_folder'
    );
    return dispatch(addGroup(groupName, seekId));
  };
  
  const handleAddFavorite = (groupId: string): Promise<unknown> => {
    updateCustomFavData('add', item?.dataId, item?.productType);
    return favoritePluginInstance.addFavorite(seekId, undefined, groupId, type);
  };
  
  const handleUpdateFavorite = (sourceFavId: string, targetFavId: string): Promise<unknown> => {
    const customFavData = HSApp.Catalog.BaseApiManager.getInstance()
      .baseDataManager.getTopicEACustomFavData();
    
    if (isTopicBatchMove) {
      const params = {
        favoritesId: targetFavId,
        sourceIdList: idList,
        type: 2,
        ...customFavData,
      };
      return favoritePluginInstance
        .topicFavBatchMove(params)
        .then((result: unknown) => {
          handleMove?.();
          return result;
        })
        .catch(() => {
          handleMove?.();
        });
    }
    
    if (isBatchMove) {
      const params = {
        sourceFavoritesId: sourceFavId,
        targetFavoritesId: targetFavId,
        sourceIdList: idList,
        ...customFavData,
      };
      return favoritePluginInstance.updateFavorite(params).then((result: unknown) => {
        handleMove?.();
        return result;
      });
    }
    
    updateCustomFavData('update', item?.dataId, item?.productType);
    const params = {
      sourceFavoritesId: sourceFavId,
      targetFavoritesId: targetFavId,
      sourceIdList: [seekId],
      ...customFavData,
    };
    return favoritePluginInstance.updateFavorite(params);
  };
  
  const clearMouseLeaveTimer = (): void => {
    if (mouseLeaveTimer) {
      clearTimeout(mouseLeaveTimer);
    }
  };
  
  const unmountPanel = (): void => {
    if (panelElement?.children.length && panelElement.children.length > 0) {
      ReactDOM.unmountComponentAtNode(panelElement);
    }
  };
  
  const renderPanel = (groups: FavoriteGroup[] = []): void => {
    if (!HSApp.Catalog.BaseApiManager.getInstance().canShowFloatView()) {
      return;
    }
    
    if (!groups || groups.length <= 0 || !containerRef.current) {
      return;
    }
    
    panelElement = document.querySelector('.catalogFavListPanel');
    
    const panelComponent = (
      <div className="catalog-fav-panel" ref={panelRef}>
        <FavListPanel
          handleMouseEnter={clearMouseLeaveTimer}
          favoriteGroups={groups}
          addGroup={handleAddGroup}
          updateFavorite={handleUpdateFavorite}
          handleAddFavorite={handleAddFavorite}
          hasFaved={isFaved}
          removeDom={unmountPanel}
          changeViewPosition={adjustPanelPosition}
          isBatchMove={isBatchMove}
          isTopicBatchMove={isTopicBatchMove}
        />
      </div>
    );
    
    ReactDOM.render(panelComponent, panelElement);
  };
  
  const adjustPanelPosition = (): void => {
    const leftPosition = getElementPosition(containerRef, 'right');
    panelElement!.style.left = `${leftPosition}px`;
    
    const topPosition = getElementPosition(containerRef, 'top') + PANEL_OFFSET_TOP;
    const panelHeight = getElementPosition(panelRef, 'height');
    const windowHeight = document.documentElement.offsetHeight;
    
    const finalTop = topPosition + panelHeight > windowHeight
      ? windowHeight - panelHeight - PANEL_OFFSET_BOTTOM
      : topPosition;
    
    panelElement!.style.top = `${finalTop}px`;
  };
  
  const getElementPosition = (
    ref: React.RefObject<HTMLElement>,
    property: 'right' | 'top' | 'height'
  ): number => {
    return ref?.current ? ref.current.getBoundingClientRect()[property] : 0;
  };
  
  const handleRemoveFavorite = (id: string): void => {
    updateCustomFavData('delete', item?.dataId, item?.productType);
    favoritePluginInstance.removeFavorite(id);
  };
  
  const handleMouseEnter = (): void => {
    if (isBatchMove) return;
    
    clearMouseLeaveTimer();
    unmountPanel();
    
    if (isFaved) {
      updateCustomFavData('refresh', item?.dataId, item?.productType);
      
      if (updateFav) {
        updateFav(item!);
      } else {
        favoritePluginInstance.requestAllGroupItems(seekId).then((groups: FavoriteGroup[]) => {
          if (groups?.[0]) {
            renderPanel(groups);
          }
        });
      }
    }
  };
  
  const handleMouseLeave = (): void => {
    clearMouseLeaveTimer();
    mouseLeaveTimer = window.setTimeout(() => {
      unmountPanel();
    }, MOUSE_LEAVE_DELAY);
  };
  
  const handleClick = (): void => {
    clearMouseLeaveTimer();
    
    if (isBatchMove || isTopicBatchMove) {
      if (!idList || idList.length === 0) return;
      
      favoritePlugin.requestAllGroupItems(seekId).then((groups: FavoriteGroup[]) => {
        if (groups?.[0]) {
          renderPanel(groups);
        }
      });
      return;
    }
    
    if (isFaved) {
      setIsFaved(false);
      if (cancelFav) {
        cancelFav(item!);
      } else {
        handleRemoveFavorite(seekId);
      }
      unmountPanel();
      eventTrackManager.signalCatalogToLog({
        logType: 'favorite',
        targetType: 'model',
        id: seekId,
        isFav: false,
      });
    } else {
      setIsFaved(true);
      if (addFav) {
        addFav(item!);
      } else {
        favoritePlugin.requestAllGroupItems(seekId).then((groups: FavoriteGroup[]) => {
          if (groups?.[0]) {
            renderPanel(groups);
          }
        });
      }
      eventTrackManager.signalCatalogToLog({
        logType: 'favorite',
        targetType: 'model',
        id: seekId,
        isFav: true,
      });
    }
  };
  
  const handleUpdateEntityName = (name: string): Promise<unknown> => {
    return NWTK.mtop.Catalog.updateAssemblyProduct({
      data: {
        id: seekId,
        name,
      },
    });
  };
  
  const handleRemoveDom = (): void => {
    const element = document.querySelector('#favGroup_panel_collection');
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  };
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={showPopup ? 'fav-popup-container' : ''}
      ref={containerRef}
    >
      {children?.(handleClick)}
      {isFaved}
      {showPopup && (
        <div className="catalog-fav-panel">
          <FavListPanel
            favoriteGroups={favoriteGroups}
            addGroup={handleAddGroup}
            updateFavorite={handleUpdateFavorite}
            handleAddFavorite={handleAddFavorite}
            hasFaved={isFaved}
            showEditName={showEditName}
            entityName={entityName}
            showCloseBtn={true}
            removeDom={handleRemoveDom}
            handleUpdateEntityName={handleUpdateEntityName}
            isTopicBatchMove={isTopicBatchMove}
            onSubmitCallback={onSubmitCallback}
            onCancelCallback={onCancelCallback}
          />
        </div>
      )}
    </div>
  );
};

const ConnectedFavContainer = connect(mapStateToProps)(FavContainer);

export default function FavContainerWrapper(props: Omit<FavContainerProps, 'favoriteGroups' | 'dispatch'>): JSX.Element {
  return (
    <Provider store={store}>
      <ConnectedFavContainer {...props} />
    </Provider>
  );
}