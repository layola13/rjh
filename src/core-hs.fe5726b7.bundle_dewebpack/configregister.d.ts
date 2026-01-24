/**
 * ConfigRegister module for managing component configurations and actions
 * Provides registration and lookup capabilities for node types and their associated actions
 */

/**
 * Configuration entry that maps target types to action types and callbacks
 */
export interface ConfigEntry {
  /** Array of constructor types that this config applies to */
  targetTypes: Array<new (...args: any[]) => any>;
  /** Array of action type identifiers */
  actionTypes: string[];
  /** Callback function to execute for matched actions */
  callback: (...args: any[]) => void;
}

/**
 * Result of action matching operation
 */
export interface MatchedAction {
  /** The type identifier of the action */
  actionType: string;
  /** Set of callback functions registered for this action */
  callbackSet: Set<(...args: any[]) => void>;
}

/**
 * Context interface containing manager reference
 */
export interface ConfigContext {
  manager: {
    /** Gets the root node of the scene hierarchy */
    getRootNode(): { update(): void } | null | undefined;
  };
}

/**
 * ConfigRegister manages the registration and lookup of component configurations
 * 
 * This class maintains a registry of configurations that map node types to action types
 * and their associated callbacks. It provides efficient lookup mechanisms to determine
 * which actions are available for specific node instances.
 * 
 * @example
 *