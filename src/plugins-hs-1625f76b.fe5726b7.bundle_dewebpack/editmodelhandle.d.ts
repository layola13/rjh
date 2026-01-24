/**
 * Edit model handle for collaborative editing scenarios.
 * Manages transitions between different editing states (readonly, viewer, no permission).
 * @module EditModelHandle
 */

import { ModelHandle } from './ModelHandle';
import { HSApp } from './HSApp';

/**
 * Represents the state transition result after an edit model change.
 */
export interface EditModelChangeResult {
  /** The resulting state: 'change' to accept new mode, 'newDesign' to create new design */
  state: 'change' | 'newDesign';
}

/**
 * Context information for edit model transitions.
 */
export interface EditModelTransitionContext {
  /** The user who initiated the operation (for readonly transitions) */
  operator?: string;
  
  /** The administrator who changed permissions (for viewer/no-permission transitions) */
  management?: string;
}

/**
 * Map of edit model handlers for each edit status type.
 * Each handler processes the transition and returns the user's decision.
 */
export type EditModelChangeMap = {
  [key in HSApp.EditStatus.ENUM_EDIT_MODEL]: (
    context: EditModelTransitionContext
  ) => Promise<EditModelChangeResult>;
};

/**
 * Handles edit model state changes in collaborative editing sessions.
 * Extends ModelHandle to provide specialized behavior for permission and mode transitions.
 * 
 * @extends ModelHandle
 */
export declare class EditModelHandle extends ModelHandle {
  /**
   * Lock flag to prevent concurrent edit operations.
   * @default true
   */
  lock: boolean;

  /**
   * Indicates whether heartbeat monitoring is active for this edit session.
   * @default true
   */
  isHeartbeat: boolean;

  /**
   * Initializes the edit model change handler map.
   * Creates handlers for transitioning between different edit states:
   * - READONLY: When another editor takes control
   * - VIEWER: When permissions are downgraded to view-only
   * - NO_PERMISSION: When access is revoked entirely
   * 
   * @returns Map of edit model change handlers indexed by edit status enum
   */
  initChangeToMap(): EditModelChangeMap;
}