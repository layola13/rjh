/**
 * Redux action creators and types for managing product groups
 * Handles CRUD operations for group items with async data fetching
 */

import type { Dispatch } from 'redux';

/**
 * Action type constants for group-related Redux actions
 */
export const originGroupType = {
  /** Initiated request to fetch all groups */
  REQUEST_GROUP: 'REQUEST_GROUP',
  /** Successfully received all groups */
  RECEIVE_GROUP: 'RECEIVE_GROUP',
  /** Initiated request to fetch a specific group item */
  REQUEST_ITEM: 'REQUEST_ITEM',
  /** Successfully received a specific group item */
  RECEIVE_ITEM: 'RECEIVE_ITEM',
  /** Started adding a new group */
  ADDING_GROUP: 'ADDING_GROUP',
  /** Successfully added a new group */
  ADDED_GROUP: 'ADDED_GROUP',
  /** Started deleting a group */
  DELETING_GROUP: 'DELETING_GROUP',
  /** Successfully deleted a group */
  DELETED_GROUP: 'DELETED_GROUP',
  /** Started updating a group */
  UPDATING_GROUP: 'UPDATING_GROUP',
  /** Successfully updated a group */
  UPDATED_GROUP: 'UPDATED_GROUP',
} as const;

/**
 * Represents a group item entity
 */
export interface GroupItem {
  /** Group friendly ID */
  fid: string;
  /** Group display name */
  name: string;
  [key: string]: unknown;
}

/**
 * Redux action for requesting all groups
 */
export interface RequestGroupAction {
  type: typeof originGroupType.REQUEST_GROUP;
}

/**
 * Redux action for receiving all groups
 */
export interface ReceiveGroupAction {
  type: typeof originGroupType.RECEIVE_GROUP;
  groupItems: GroupItem[];
}

/**
 * Redux action for requesting a specific item
 */
export interface RequestItemAction {
  type: typeof originGroupType.REQUEST_ITEM;
}

/**
 * Redux action for receiving a specific item
 */
export interface ReceiveItemAction {
  type: typeof originGroupType.RECEIVE_ITEM;
  selectedItem: GroupItem;
}

/**
 * Redux action for initiating group addition
 */
export interface AddingGroupAction {
  type: typeof originGroupType.ADDING_GROUP;
}

/**
 * Redux action for successful group addition
 */
export interface AddedGroupAction {
  type: typeof originGroupType.ADDED_GROUP;
  name: string;
  fid: string;
}

/**
 * Redux action for initiating group deletion
 */
export interface DeletingGroupAction {
  type: typeof originGroupType.DELETING_GROUP;
}

/**
 * Redux action for successful group deletion
 */
export interface DeletedGroupAction {
  type: typeof originGroupType.DELETED_GROUP;
  fid: string;
}

/**
 * Redux action for initiating group update
 */
export interface UpdatingGroupAction {
  type: typeof originGroupType.UPDATING_GROUP;
}

/**
 * Redux action for successful group update
 */
export interface UpdatedGroupAction {
  type: typeof originGroupType.UPDATED_GROUP;
  fid: string;
  name: string;
}

/**
 * Union type of all group-related actions
 */
export type GroupAction =
  | RequestGroupAction
  | ReceiveGroupAction
  | RequestItemAction
  | ReceiveItemAction
  | AddingGroupAction
  | AddedGroupAction
  | DeletingGroupAction
  | DeletedGroupAction
  | UpdatingGroupAction
  | UpdatedGroupAction;

/**
 * Redux thunk dispatch type
 */
type ThunkDispatch = Dispatch<GroupAction>;

/**
 * Redux thunk function type
 */
type ThunkAction<T = void> = (dispatch: ThunkDispatch, getState?: () => unknown) => Promise<T> | T;

/**
 * Changes the current product group selection
 * @param group - The group to set as current
 * @returns Redux thunk action
 */
export function changeCurrentProdGroup(group: Pick<GroupItem, 'name' | 'fid'>): ThunkAction;

/**
 * Adds a new group item
 * @param groupData - The group data to create
 * @param seekId - Optional seek/tracking ID for the operation
 * @returns Redux thunk action that resolves to the created group
 */
export function addGroup(groupData: Partial<GroupItem>, seekId?: string): ThunkAction<Promise<GroupItem>>;

/**
 * Deletes an existing group
 * @param fid - The group's friendly ID
 * @param additionalParam - Optional additional parameter for deletion
 * @returns Redux thunk action
 */
export function deleteGroup(fid: string, additionalParam?: unknown): ThunkAction<Promise<void>>;

/**
 * Updates an existing group's properties
 * @param fid - The group's friendly ID
 * @param updates - The properties to update
 * @returns Redux thunk action
 */
export function updateGroup(fid: string, updates: Partial<GroupItem>): ThunkAction<Promise<void>>;

/**
 * Fetches all group items from the server
 * @returns Redux thunk action
 */
export function getAllGroupItems(): ThunkAction<Promise<void>>;

/**
 * Fetches a specific group item by ID
 * @param groupId - The ID of the group to fetch
 * @returns Redux thunk action
 */
export function getGroupItem(groupId: string): ThunkAction<Promise<void>>;