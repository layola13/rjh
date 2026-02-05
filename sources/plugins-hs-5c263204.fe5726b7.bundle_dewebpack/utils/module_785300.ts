// @ts-nocheck
import { combineReducers } from 'redux';
import { originGroupType } from './originGroupType';

interface GroupItem {
  name: string;
  fid: string;
}

interface ReceiveGroupAction {
  type: typeof originGroupType.RECEIVE_GROUP;
  groupItems: GroupItem[];
}

interface AddedGroupAction {
  type: typeof originGroupType.ADDED_GROUP;
  name: string;
  fid: string;
}

interface DeletedGroupAction {
  type: typeof originGroupType.DELETED_GROUP;
  fid: string;
}

interface UpdatedGroupAction {
  type: typeof originGroupType.UPDATED_GROUP;
  name: string;
  fid: string;
}

interface UpdatingGroupAction {
  type: typeof originGroupType.UPDATING_GROUP;
}

interface RequestGroupAction {
  type: typeof originGroupType.REQUEST_GROUP;
}

interface AddingGroupAction {
  type: typeof originGroupType.ADDING_GROUP;
}

interface DeletingGroupAction {
  type: typeof originGroupType.DELETING_GROUP;
}

type GroupAction =
  | ReceiveGroupAction
  | AddedGroupAction
  | DeletedGroupAction
  | UpdatedGroupAction
  | UpdatingGroupAction
  | RequestGroupAction
  | AddingGroupAction
  | DeletingGroupAction;

function groupItemsReducer(
  state: GroupItem[] = [],
  action: GroupAction
): GroupItem[] {
  switch (action.type) {
    case originGroupType.RECEIVE_GROUP:
      return action.groupItems;

    case originGroupType.ADDED_GROUP: {
      const newGroup: GroupItem = {
        name: action.name,
        fid: action.fid
      };
      const updatedGroups = state.slice(0);
      updatedGroups.splice(1, 0, newGroup);
      return updatedGroups;
    }

    case originGroupType.DELETED_GROUP:
      return state.filter((group) => group.fid !== action.fid);

    case originGroupType.UPDATED_GROUP:
      return state.map((group) => {
        if (group.fid === action.fid) {
          return { ...group, name: action.name };
        }
        return group;
      });

    case originGroupType.UPDATING_GROUP:
    case originGroupType.REQUEST_GROUP:
    case originGroupType.ADDING_GROUP:
    case originGroupType.DELETING_GROUP:
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  groupItems: groupItemsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;