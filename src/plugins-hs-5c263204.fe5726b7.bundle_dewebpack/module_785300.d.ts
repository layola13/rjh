/**
 * Redux reducer for managing origin groups
 * Handles CRUD operations for group items
 */

import { originGroupType } from './actions';
import { combineReducers } from 'redux';

/**
 * Represents a single group item
 */
export interface GroupItem {
  /** Group name */
  name: string;
  /** Group unique identifier */
  fid: string | number;
}

/**
 * Action types for group operations
 */
interface ReceiveGroupAction {
  type: typeof originGroupType.RECEIVE_GROUP;
  groupItems: GroupItem[];
}

interface AddedGroupAction {
  type: typeof originGroupType.ADDED_GROUP;
  name: string;
  fid: string | number;
}

interface DeletedGroupAction {
  type: typeof originGroupType.DELETED_GROUP;
  fid: string | number;
}

interface UpdatedGroupAction {
  type: typeof originGroupType.UPDATED_GROUP;
  fid: string | number;
  name: string;
}

interface GenericGroupAction {
  type: 
    | typeof originGroupType.UPDATING_GROUP
    | typeof originGroupType.REQUEST_GROUP
    | typeof originGroupType.ADDING_GROUP
    | typeof originGroupType.DELETING_GROUP;
}

type GroupAction =
  | ReceiveGroupAction
  | AddedGroupAction
  | DeletedGroupAction
  | UpdatedGroupAction
  | GenericGroupAction;

/**
 * Root state shape
 */
export interface GroupState {
  groupItems: GroupItem[];
}

/**
 * Reducer for managing group items list
 * @param state - Current group items array
 * @param action - Dispatched action
 * @returns Updated group items array
 */
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

/**
 * Combined root reducer for group management
 */
const rootReducer = combineReducers<GroupState>({
  groupItems: groupItemsReducer
});

export default rootReducer;