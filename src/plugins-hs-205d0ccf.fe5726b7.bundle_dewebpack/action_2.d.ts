/**
 * Base action class for managing executable operations
 * Module: Action
 * Original ID: 536544
 */

/**
 * Manager interface for action coordination
 */
export interface IActionManager {
  // Manager implementation details would be defined by the concrete manager
  [key: string]: unknown;
}

/**
 * Base abstract class for defining executable actions with lifecycle hooks
 * 
 * @remarks
 * This class provides a template for creating actions that can be executed,
 * completed, cancelled, and destroyed. It's designed to work with an action manager.
 * 
 * @example
 *