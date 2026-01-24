/**
 * Manages relationships between scene objects, including sweep paths, face visibility, and room content.
 * This module coordinates various relationship systems within a document's scene hierarchy.
 * 
 * @module RelationshipManager
 */

import type { Context } from './Context';
import type { SweepPathRelation } from './SweepPathRelation';
import type { FaceVisibleRelation } from './FaceVisibleRelation';
import type { ContentInRoomRelation } from './ContentInRoomRelation';

/**
 * Represents a document containing a scene and its properties.
 */
interface Document {
  /** The scene object associated with the document */
  scene: Scene;
}

/**
 * Represents a scene that can be managed by the relationship system.
 */
interface Scene {
  // Scene properties would be defined here based on actual implementation
}

/**
 * Represents a relationship model node in the scene hierarchy.
 */
interface RelationshipModelNode {
  /**
   * Clears all relationships and data associated with this node.
   */
  clear(): void;
}

/**
 * Configuration object for registering relationship behaviors.
 */
interface RelationshipConfig {
  // Configuration properties would be defined here based on actual implementation
}

/**
 * Configuration key type for registration/unregistration operations.
 */
type ConfigKey = string | symbol;

/**
 * Manages relationships between objects in a 3D scene document.
 * Handles sweep paths, face visibility, room content relationships, and configuration.
 * 
 * @class RelationshipManager
 */
export declare class RelationshipManager {
  /**
   * The document this manager operates on.
   * @readonly
   */
  readonly doc: Document;

  /**
   * Context object managing the relationship system.
   * @private
   */
  private readonly _context: Context;

  /**
   * Manages sweep path relationships between objects.
   * @private
   */
  private readonly _sweepPathRelation: SweepPathRelation;

  /**
   * Manages face visibility relationships.
   * @private
   */
  private readonly _faceVisibleRelation: FaceVisibleRelation;

  /**
   * Manages content-in-room relationships.
   * @private
   */
  private readonly _contentInRoomRelation: ContentInRoomRelation;

  /**
   * Root scene object in the relationship model.
   * @private
   */
  private _sceneObj: RelationshipModelNode | null;

  /**
   * Creates a new RelationshipManager instance.
   * 
   * @param doc - The document to manage relationships for
   */
  constructor(doc: Document);

  /**
   * Opens a document and initializes the relationship model.
   * Clears any existing scene object and creates a new one.
   */
  openDocument(): void;

  /**
   * Clears all relationships and resets the manager state.
   * Removes all sweep path, face visibility, and content-in-room relationships.
   */
  clear(): void;

  /**
   * Registers configuration settings for the relationship system.
   * 
   * @param key - Unique identifier for the configuration
   * @param config - Configuration object to register
   */
  registerConfigs(key: ConfigKey, config: RelationshipConfig): void;

  /**
   * Unregisters previously registered configuration settings.
   * 
   * @param key - Unique identifier of the configuration to remove
   */
  unregisterConfigs(key: ConfigKey): void;

  /**
   * Gets the root node of the relationship model.
   * 
   * @returns The root scene object node, or null if not initialized
   */
  getRootNode(): RelationshipModelNode | null;

  /**
   * Gets the sweep path relationship manager.
   * 
   * @returns The sweep path relationship handler
   */
  getSweepPathRelation(): SweepPathRelation;

  /**
   * Gets the face visibility relationship manager.
   * 
   * @returns The face visibility relationship handler
   */
  getFaceVisibleRelation(): FaceVisibleRelation;

  /**
   * Gets the content-in-room relationship manager.
   * 
   * @returns The content-in-room relationship handler
   */
  getContentInRoomRelation(): ContentInRoomRelation;
}