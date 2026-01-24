/**
 * FavGroup Module
 * Provides favorite group management functionality with Redux integration
 */

import { ComponentType, ReactElement } from 'react';
import { Dispatch } from 'redux';

/**
 * Favorite group data structure
 */
export interface FavoriteGroup {
  /** Unique folder identifier */
  fid?: string | number;
  /** Display name of the favorite group */
  name: string;
  /** Group type identifier */
  type: number;
  /** Whether this is a default group (0 = false, 1 = true) */
  whetherDefault: 0 | 1;
}

/**
 * Redux state shape for group items
 */
export interface GroupState {
  /** Array of favorite groups from Redux store */
  groupItems: FavoriteGroup[];
}

/**
 * Props mapped from Redux state
 */
interface StateProps {
  /** Default favorite groups from Redux store */
  defaultFavoriteGroups: FavoriteGroup[];
}

/**
 * Props injected by Redux
 */
interface DispatchProps {
  /** Redux dispatch function */
  dispatch: Dispatch;
}

/**
 * Props passed from parent component
 */
interface OwnProps {
  /** Click handler for favorite group interactions */
  handleClick: (group: FavoriteGroup) => void;
}

/**
 * Combined props for the connected component
 */
type FavGroupConnectedProps = StateProps & DispatchProps & OwnProps;

/**
 * Props for the FavoriteGroupList component
 */
interface FavoriteGroupListProps {
  /** List of favorite groups to display */
  favoriteGroups: FavoriteGroup[];
  /** Callback to add a new folder */
  addFolder: (name: string) => void;
  /** Callback to update folder name */
  updateName: (fid: string | number, newName: string) => void;
  /** Callback to delete a folder */
  deleteFolder: (fid: string | number, group: FavoriteGroup) => void;
  /** Click handler for group selection */
  handleClick: (group: FavoriteGroup) => void;
  /** Maximum length for favorite input field */
  favInputMaxLength: number;
}

/**
 * Redux action creator for adding a group
 */
export function addGroup(name: string): unknown;

/**
 * Redux action creator for updating a group
 */
export function updateGroup(fid: string | number, newName: string): unknown;

/**
 * Redux action creator for deleting a group
 */
export function deleteGroup(fid: string | number, group: FavoriteGroup): unknown;

/**
 * Connected FavGroup component with Redux integration
 * Manages favorite group display and interactions
 */
export const FavGroup: ComponentType<OwnProps>;

/**
 * Default export: FavGroup component wrapped with Redux Provider
 * @param props - Component props including handleClick callback
 * @returns React element with Redux store provider
 */
export default function FavGroupWithProvider(props: OwnProps): ReactElement;

/**
 * Global ResourceManager interface
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };

  namespace HSApp {
    namespace Util {
      enum EventGroupEnum {
        Catalog = 'Catalog'
      }

      class EventTrack {
        static instance(): EventTrack;
        track(group: EventGroupEnum, action: string): void;
      }
    }
  }
}