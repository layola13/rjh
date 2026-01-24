/**
 * Customization model entity collection provider
 * Collects customized entities, feature models, structures, and beams from the floorplan scene
 */

import type { HSApp } from './app-types';
import type { HSCore } from './core-types';

/**
 * Entity types that can be collected from the scene
 */
export type CollectableEntity = 
  | CustomizedEntity 
  | NCustomizedFeatureModelEntity 
  | NStructureEntity;

/**
 * Customized entity wrapper
 */
export interface CustomizedEntity {
  /**
   * Accepts a customized model and extracts its data
   * @param model - The customized model to process
   * @returns The entity instance with populated data
   */
  accept(model: HSCore.Model.CustomizedModel): this;
}

/**
 * N-customized feature model entity wrapper
 */
export interface NCustomizedFeatureModelEntity {
  /**
   * Accepts an N-customized feature model and extracts its data
   * @param model - The N-customized feature model to process
   * @returns The entity instance with populated data
   */
  accept(model: HSCore.Model.NCustomizedFeatureModel): this;
}

/**
 * Structure entity wrapper (handles both structures and beams)
 */
export interface NStructureEntity {
  /**
   * Accepts a structure or beam model and extracts its data
   * @param model - The structure or beam model to process
   * @returns The entity instance with populated data
   */
  accept(model: HSCore.Model.StructureModel | HSCore.Model.BeamModel): this;
}

/**
 * Promise-wrapped entity collection result
 */
export interface PromiseEntities {
  entities: CollectableEntity[];
  promise: Promise<void>;
}

/**
 * Provider configuration for entity collection
 */
export interface ProviderConfig {
  /** The type identifier for this provider */
  type: 'CustomizationModel';
}

/**
 * Provider implementation with entity collection capability
 */
export interface Provider {
  /**
   * Collects all non-removed customized entities from the floorplan scene
   * Iterates through all layers and their contents, structures, and beams
   * @returns Promise-wrapped collection of entities
   */
  collectEntity(): PromiseEntities;
}

/**
 * Registers a provider with the given configuration and implementation
 * @param config - Provider configuration specifying the type
 * @param implementation - Provider implementation with collectEntity method
 */
export declare function registerProvider(
  config: ProviderConfig,
  implementation: Provider
): void;

/**
 * Wraps an array of entities in a promise structure
 * @param entities - Array of collected entities
 * @returns Promise-wrapped entity collection
 */
export declare function wrapPromiseEntities(
  entities: CollectableEntity[]
): PromiseEntities;

/**
 * Layer interface from the floorplan scene
 */
export interface Layer {
  /**
   * Iterates over all content items in the layer
   * @param callback - Function called for each content item
   */
  forEachContent(callback: (entity: HSCore.Model.Entity) => void): void;
  
  /**
   * Iterates over all structure items in the layer
   * @param callback - Function called for each structure
   */
  forEachStructure(callback: (entity: HSCore.Model.StructureModel) => void): void;
  
  /**
   * Iterates over all beam items in the layer
   * @param callback - Function called for each beam
   */
  forEachBeam(callback: (entity: HSCore.Model.BeamModel) => void): void;
}

/**
 * Scene interface from the floorplan
 */
export interface Scene {
  /**
   * Iterates over all layers in the scene
   * @param callback - Function called for each layer
   */
  forEachLayer(callback: (layer: Layer) => void): void;
}

/**
 * Floorplan interface from the HSApp
 */
export interface Floorplan {
  /** The 3D scene containing all layers */
  scene: Scene;
}

/**
 * Main application interface
 */
export interface App {
  /** The floorplan instance */
  floorplan: Floorplan;
}

declare namespace HSApp {
  namespace App {
    /**
     * Gets the singleton application instance
     * @returns The application instance
     */
    function getApp(): App;
  }
}

declare namespace HSCore {
  namespace Model {
    /**
     * Entity flags enumeration
     */
    enum EntityFlagEnum {
      /** Entity has been marked as removed */
      removed = 'removed'
    }
    
    /**
     * Base entity interface
     */
    interface Entity {
      /**
       * Checks if a specific flag is set on the entity
       * @param flag - The flag to check
       * @returns True if the flag is set
       */
      isFlagOn(flag: EntityFlagEnum): boolean;
    }
    
    /**
     * Customized model entity
     */
    interface CustomizedModel extends Entity {}
    
    /**
     * N-customized feature model entity
     */
    interface NCustomizedFeatureModel extends Entity {}
    
    /**
     * Structure model entity
     */
    interface StructureModel extends Entity {}
    
    /**
     * Beam model entity
     */
    interface BeamModel extends Entity {}
  }
}