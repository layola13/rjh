/**
 * Context module for managing relationships and configuration
 * @module Context
 */

import type { RelationshipFactory } from './RelationshipFactory';
import type { ConfigRegister } from './ConfigRegister';

/**
 * Represents a relationship model created by the factory
 */
export interface RelationshipModel<T = unknown> {
  // Define based on your actual RelationshipModel structure
  [key: string]: unknown;
}

/**
 * Manager interface for context operations
 */
export interface Manager {
  // Define based on your actual Manager structure
  [key: string]: unknown;
}

/**
 * Context class for managing relationships, configuration, and manager instances
 */
export declare class Context {
  /**
   * Internal relationship factory instance
   * @private
   */
  private readonly _factory: RelationshipFactory;

  /**
   * Configuration register for the context
   * @public
   */
  public readonly configRegister: ConfigRegister;

  /**
   * Manager instance associated with this context
   * @public
   */
  public readonly manager: Manager;

  /**
   * Creates a new Context instance
   * @param manager - The manager instance to associate with this context
   */
  constructor(manager: Manager);

  /**
   * Creates a relationship model using the internal factory
   * @param relationshipType - The type of relationship to create
   * @param options - Optional configuration for the relationship model
   * @returns The created relationship model instance
   */
  createRelationshipModel<T = unknown>(
    relationshipType: string,
    options?: T
  ): RelationshipModel<T>;
}