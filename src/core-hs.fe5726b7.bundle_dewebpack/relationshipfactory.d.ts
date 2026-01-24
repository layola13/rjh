/**
 * Factory for creating relationship models in the graph system.
 * Handles the instantiation of Node objects based on type availability.
 * @module RelationshipFactory
 */

import { Node } from './Node';

/**
 * Configuration registry interface for type validation
 */
export interface ConfigRegister {
  /**
   * Checks if a given type is registered and available
   * @param type - The type identifier to validate
   * @returns True if the type is available, false otherwise
   */
  isAvailableType(type: string): boolean;
}

/**
 * Context object containing configuration and services
 */
export interface RelationshipContext {
  /**
   * Configuration registry for type validation
   */
  configRegister: ConfigRegister;
}

/**
 * Factory class responsible for creating relationship model instances.
 * Validates types against the configuration registry before instantiation.
 */
export declare class RelationshipFactory {
  /**
   * Creates a new relationship model (Node) if the type is valid and available.
   * 
   * @param type - The type identifier for the relationship/node
   * @param context - Context object containing configuration and services
   * @param options - Additional options or data for node initialization
   * @returns A new Node instance if type is valid and available, null otherwise
   * 
   * @example
   *