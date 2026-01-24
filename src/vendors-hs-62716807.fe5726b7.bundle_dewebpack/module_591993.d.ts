/**
 * IceStore action types constants
 * Contains unique action type identifiers for state management
 */

/**
 * Action type constants for IceStore state management
 */
interface IceStoreActionTypes {
  /**
   * Action type for setting state in the store
   * Includes a unique random suffix to prevent conflicts
   */
  readonly SET_STATE: string;
}

/**
 * Default export containing IceStore action type constants
 */
declare const actionTypes: IceStoreActionTypes;

export default actionTypes;