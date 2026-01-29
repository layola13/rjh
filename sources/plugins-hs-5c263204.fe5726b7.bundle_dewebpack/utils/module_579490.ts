interface GroupItem {
  fid: string;
  name: string;
}

interface GroupActionRequestGroup {
  type: 'REQUEST_GROUP';
}

interface GroupActionReceiveGroup {
  type: 'RECEIVE_GROUP';
  groupItems: GroupItem[];
}

interface GroupActionRequestItem {
  type: 'REQUEST_ITEM';
}

interface GroupActionReceiveItem {
  type: 'RECEIVE_ITEM';
  selectedItem: GroupItem[];
}

interface GroupActionAddingGroup {
  type: 'ADDING_GROUP';
}

interface GroupActionAddedGroup {
  type: 'ADDED_GROUP';
  name: string;
  fid: string;
}

interface GroupActionDeletingGroup {
  type: 'DELETING_GROUP';
}

interface GroupActionDeletedGroup {
  type: 'DELETED_GROUP';
  fid: string;
}

interface GroupActionUpdatingGroup {
  type: 'UPDATING_GROUP';
}

interface GroupActionUpdatedGroup {
  type: 'UPDATED_GROUP';
  fid: string;
  name: string;
}

type GroupAction =
  | GroupActionRequestGroup
  | GroupActionReceiveGroup
  | GroupActionRequestItem
  | GroupActionReceiveItem
  | GroupActionAddingGroup
  | GroupActionAddedGroup
  | GroupActionDeletingGroup
  | GroupActionDeletedGroup
  | GroupActionUpdatingGroup
  | GroupActionUpdatedGroup;

type Dispatch = (action: GroupAction) => void;
type GetState = () => unknown;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => void | Promise<void> | Promise<GroupItem>;

interface GroupService {
  requestAllGroupItems(param?: string): Promise<GroupItem[]>;
  addGroupItem(item: GroupItem): Promise<GroupItem>;
  deleteGroup(fid: string, name: string): Promise<GroupItem>;
  updateGroup(fid: string, name: string): Promise<GroupItem>;
  signalAddGroup: {
    dispatch(payload: { fid: string; seekId: string }): void;
  };
}

declare const groupService: GroupService;

export const originGroupType = {
  REQUEST_GROUP: 'REQUEST_GROUP',
  RECEIVE_GROUP: 'RECEIVE_GROUP',
  REQUEST_ITEM: 'REQUEST_ITEM',
  RECEIVE_ITEM: 'RECEIVE_ITEM',
  ADDING_GROUP: 'ADDING_GROUP',
  ADDED_GROUP: 'ADDED_GROUP',
  DELETING_GROUP: 'DELETING_GROUP',
  DELETED_GROUP: 'DELETED_GROUP',
  UPDATING_GROUP: 'UPDATING_GROUP',
  UPDATED_GROUP: 'UPDATED_GROUP',
} as const;

const requestAllGroups = () => {
  return (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: originGroupType.REQUEST_GROUP });
    
    return groupService.requestAllGroupItems().then((groupItems: GroupItem[]) => {
      dispatch({
        type: originGroupType.RECEIVE_GROUP,
        groupItems,
      });
    });
  };
};

const requestGroupItem = (itemId: string) => {
  return (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: originGroupType.REQUEST_ITEM });
    
    return groupService.requestAllGroupItems(itemId).then((selectedItem: GroupItem[]) => {
      dispatch({
        type: originGroupType.RECEIVE_ITEM,
        selectedItem,
      });
    });
  };
};

export const changeCurrentProdGroup = (group: GroupItem): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    return dispatch;
  };
};

export const addGroup = (groupItem: GroupItem, seekId?: string): ThunkAction => {
  return (dispatch: Dispatch): Promise<GroupItem> => {
    dispatch({ type: originGroupType.ADDING_GROUP });
    
    return groupService.addGroupItem(groupItem).then((addedGroup: GroupItem) => {
      dispatch({
        type: originGroupType.ADDED_GROUP,
        name: addedGroup.name,
        fid: addedGroup.fid,
      });
      
      if (seekId) {
        groupService.signalAddGroup.dispatch({
          fid: addedGroup.fid,
          seekId,
        });
      }
      
      return addedGroup;
    });
  };
};

export const deleteGroup = (fid: string, name: string): ThunkAction => {
  return (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: originGroupType.DELETING_GROUP });
    
    return groupService.deleteGroup(fid, name).then((deletedGroup: GroupItem) => {
      dispatch({
        type: originGroupType.DELETED_GROUP,
        fid: deletedGroup.fid,
      });
    });
  };
};

export const updateGroup = (fid: string, name: string): ThunkAction => {
  return (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: originGroupType.UPDATING_GROUP });
    
    return groupService.updateGroup(fid, name).then((updatedGroup: GroupItem) => {
      dispatch({
        type: originGroupType.UPDATED_GROUP,
        fid: updatedGroup.fid,
        name: updatedGroup.name,
      });
    });
  };
};

export const getAllGroupItems = (): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    return dispatch(requestAllGroups() as unknown as GroupAction);
  };
};

export const getGroupItem = (itemId: string): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    return dispatch(requestGroupItem(itemId) as unknown as GroupAction);
  };
};