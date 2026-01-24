/**
 * Module: module_value
 * Original ID: value
 */

/**
 * Represents the state and configuration for a WebCAD modeling session.
 * Manages the lifecycle of a WebCAD page and associated entity data.
 */
interface ModuleValue {
  /**
   * The modeling host instance, typically used to manage the 3D modeling environment.
   * @default undefined
   */
  _modelingHost: unknown | undefined;

  /**
   * Indicates whether the WebCAD page has been initialized.
   * @default false
   */
  _webcadPageInited: boolean;

  /**
   * Indicates whether the WebCAD page is currently open.
   * @default false
   */
  _webcadPageOpen: boolean;

  /**
   * The entity being modeled or edited in the current session.
   * @default undefined
   */
  _entity: unknown | undefined;

  /**
   * Additional message data for communication or state management.
   * Used to store arbitrary key-value pairs for extension purposes.
   * @default {}
   */
  _extraMsgData: Record<string, unknown>;
}

/**
 * Factory function that creates and initializes a new ModuleValue instance.
 * @returns A new ModuleValue object with default values
 */
declare function createModuleValue(): ModuleValue;