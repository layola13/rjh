/**
 * Base object class for managing entities with geometry and event handling.
 * Provides core functionality for entity lifecycle management, dirty state tracking,
 * and event-driven updates.
 * 
 * @module BaseObject
 */

/**
 * Signal hook utility for managing event subscriptions
 */
interface SignalHook<T = any> {
  listen(signal: Signal<T>, handler: (data: T) => void): this;
  dispose(): void;
}

/**
 * Signal interface for event dispatching
 */
interface Signal<T = any> {
  dispatch(data: T): void;
  connect(handler: (data: T) => void): void;
  disconnect(handler: (data: T) => void): void;
}

/**
 * Geometry manager interface for handling geometric entities
 */
interface GeometryManager {
  /**
   * Removes an item from the geometry management system
   * @param entity - The entity to remove
   */
  removeItem(entity: Entity): void;
}

/**
 * Document manager interface
 */
interface DocumentManager {
  readonly geometryManager: GeometryManager;
}

/**
 * Entity interface representing a managed object with signals
 */
interface Entity {
  /** Signal emitted when the entity becomes dirty (needs update) */
  readonly signalDirty: Signal<any>;
  /** Signal emitted when the entity is removed */
  readonly signalRemoved: Signal<void>;
}

/**
 * Context interface for BaseObject initialization
 */
interface BaseObjectContext {
  /** Optional geometry manager override */
  manager?: GeometryManager;
}

/**
 * Global HSCore namespace
 */
declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(owner: any);
      listen<T>(signal: Signal<T>, handler: (data: T) => void): this;
      dispose(): void;
    }
  }
  
  namespace Doc {
    function getDocManager(): DocumentManager;
  }
}

/**
 * Base object class that provides entity lifecycle management, event handling,
 * and geometry management integration.
 * 
 * This class serves as a foundation for objects that need to:
 * - Track dirty state for update optimization
 * - Respond to entity change events
 * - Clean up resources on entity removal
 */
export declare class BaseObject {
  /** Indicates whether the object needs to be updated/redrawn */
  protected _dirty: boolean;
  
  /** Event hook for managing signal subscriptions */
  protected eventHook: SignalHook;
  
  /** The entity associated with this object */
  protected entity?: Entity;
  
  /** The context in which this object operates */
  protected context?: BaseObjectContext;
  
  /** Geometry manager for handling geometric operations */
  protected geomMgr: GeometryManager;
  
  /**
   * Creates a new BaseObject instance
   * @param entity - The entity to manage
   * @param context - Context containing configuration and managers
   */
  constructor(entity: Entity, context: BaseObjectContext);
  
  /**
   * Handler called when the associated entity becomes dirty.
   * Override this method to implement custom dirty state handling.
   * @param data - Event data from the dirty signal
   */
  protected onEntityDirty(data: any): void;
  
  /**
   * Handler called when the associated entity is removed.
   * Automatically removes the entity from the geometry manager.
   */
  protected onEntityRemoved(): void;
  
  /**
   * Cleans up all resources, disconnects event handlers, and clears references.
   * Should be called when the object is no longer needed to prevent memory leaks.
   */
  clear(): void;
}