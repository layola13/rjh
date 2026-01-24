/**
 * Redux store configuration module
 * Combines reducers and creates the application store
 */

import { Store } from 'redux';

/**
 * Comment state interface
 * Represents the structure of the comment slice in the Redux store
 */
export interface CommentState {
  // Define your comment state properties here based on the reducer implementation
  [key: string]: unknown;
}

/**
 * Root state interface
 * Represents the complete Redux store state structure
 */
export interface RootState {
  /** Comment-related state */
  comment: CommentState;
}

/**
 * Root Redux store instance
 * Created with combined reducers for the application
 */
declare const store: Store<RootState>;

export default store;