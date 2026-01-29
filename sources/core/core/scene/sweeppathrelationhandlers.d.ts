/**
 * Type definition for sweep path relation handlers and data management
 * @module SweepPathRelationHandlers
 */

import type { RelationshipType, SupportedSignalTypes } from './RelationshipTypes';
import type { EntityEventType } from './EntityEventTypes';

/**
 * Handler function type for processing sweep path relations
 * @template T - The entity type being handled
 * @param entity - The entity to process
 * @returns The computed sweep path data for the entity
 */
type SweepPathHandler<T = unknown> = (entity: T) => unknown;

/**
 * Event data structure for entity events
 */
interface EntityEventData {
  /** The type of entity event */
  type?: EntityEventType;
  /** The entity involved in the event */
  entity?: HSCore.Model.Baseboard | HSCore.Model.Cornice | HSCore.Model.WallMolding;
  [key: string]: unknown;
}

/**
 * Event structure for relationship callbacks
 */
interface RelationshipEvent {
  /** The target entity that triggered the event */
  target?: HSCore.Model.Face | HSCore.Model.WallMolding;
  /** Additional event data */
  data?: EntityEventData;
}

/**
 * Configuration for relationship event handling
 */
interface RelationshipConfig {
  /** Types of entities this config applies to */
  targetTypes: Array<new (...args: any[]) => any>;
  /** Types of actions that trigger this config */
  actionTypes: SupportedSignalTypes[];
  /** Callback function to handle the event */
  callback: (event: RelationshipEvent) => void;
}

/**
 * Manager interface for registering relationship configurations
 */
interface RelationshipManager {
  /**
   * Register relationship configurations for a specific type
   * @param type - The relationship type
   * @param configs - Array of configuration objects
   */
  registerConfigs(type: RelationshipType, configs: RelationshipConfig[]): void;
}

/**
 * Registry for sweep path relation handlers
 * Manages handlers that compute sweep path data for different entity types
 */
export declare class SweepPathRelationHandlers {
  /** Internal map storing handlers by entity class name */
  private static _handlers: Map<string, SweepPathHandler>;

  /**
   * Register a handler for a specific entity class
   * @param entityClass - The class name of the entity type
   * @param handler - The handler function to process entities of this type
   */
  static registerHandler(entityClass: string, handler: SweepPathHandler): void;

  /**
   * Retrieve the registered handler for an entity class
   * @param entityClass - The class name of the entity type
   * @returns The handler function, or undefined if not registered
   */
  static getHandler(entityClass: string): SweepPathHandler | undefined;
}

/**
 * Manages sweep path relationships and caches computed data
 * Automatically clears cache when related entities are modified
 */
export declare class SweepPathRelation {
  /** The type of relationship being managed */
  private readonly _type: RelationshipType;
  
  /** Cache of computed sweep path data, keyed by entity ID */
  private readonly _data: Map<string, unknown>;
  
  /** The relationship manager instance */
  private readonly _manager: RelationshipManager;

  /**
   * Create a new sweep path relation manager
   * @param manager - The relationship manager to register event handlers with
   */
  constructor(manager: RelationshipManager);

  /**
   * Initialize event handlers for relationship management
   * Sets up listeners for Face and WallMolding entity changes
   * @private
   */
  private _init(): void;

  /**
   * Get or compute sweep path data for an entity
   * Returns cached data if available, otherwise computes and caches it
   * @param entity - The entity to get sweep path data for
   * @returns The sweep path data, or undefined if no handler is registered
   */
  getData(entity: { id: string; Class: string }): unknown | undefined;

  /**
   * Clear cached data for a specific entity
   * @param entity - The entity whose data should be cleared
   */
  clear(entity?: { id: string } | null): void;

  /**
   * Clear all cached sweep path data
   */
  clearAll(): void;
}