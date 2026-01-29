import { connect, Provider } from 'react-redux';
import React from 'react';
import store from './store';
import FavoriteGroupComponent from './FavoriteGroupComponent';
import { addGroup, updateGroup, deleteGroup } from './groupActions';

interface FavoriteGroup {
  fid: string | undefined;
  name: string;
  type: number;
  whetherDefault: number;
}

interface StoreState {
  groupItems: FavoriteGroup[];
}

interface FavGroupOwnProps {
  handleClick: (group: FavoriteGroup) => void;
}

interface FavGroupStateProps {
  defaultFavoriteGroups: FavoriteGroup[];
}

interface FavGroupDispatchProps {
  dispatch: (action: unknown) => void;
}

type FavGroupProps = FavGroupOwnProps & FavGroupStateProps & FavGroupDispatchProps;

const mapStateToProps = (state: StoreState): FavGroupStateProps => {
  return {
    defaultFavoriteGroups: state.groupItems
  };
};

const ConnectedFavGroup = connect(mapStateToProps)((props: FavGroupProps) => {
  const { defaultFavoriteGroups, dispatch, handleClick } = props;
  
  const favoriteGroups = defaultFavoriteGroups.slice(0);
  
  const allCategoryGroup: FavoriteGroup = {
    fid: undefined,
    name: ResourceManager.getString("new_catalog_all_category"),
    type: 2,
    whetherDefault: 0
  };
  
  favoriteGroups.unshift(allCategoryGroup);
  
  const handleAddFolder = (name: string): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      "create_favorate_folder"
    );
    dispatch(addGroup(name));
  };
  
  const handleUpdateName = (fid: string, name: string): void => {
    dispatch(updateGroup(fid, name));
  };
  
  const handleDeleteFolder = (fid: string, groupType: number): void => {
    dispatch(deleteGroup(fid, groupType));
  };
  
  return React.createElement(FavoriteGroupComponent, {
    favoriteGroups: favoriteGroups,
    addFolder: handleAddFolder,
    updateName: handleUpdateName,
    deleteFolder: handleDeleteFolder,
    handleClick: handleClick,
    favInputMaxLength: 30
  });
});

export { ConnectedFavGroup as FavGroup };

export default function FavGroupWithProvider(props: FavGroupOwnProps): React.ReactElement {
  return React.createElement(Provider, {
    store: store
  }, React.createElement(ConnectedFavGroup, props));
}