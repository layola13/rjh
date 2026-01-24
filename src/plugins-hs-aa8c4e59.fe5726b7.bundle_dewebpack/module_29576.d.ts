/**
 * Customization Provider Module
 * 
 * This module registers a provider for customization entities in the application.
 * It collects customization entities from the floorplan scene layers.
 */

/**
 * Represents a customization entity created from a scene object
 */
interface CustomizationEntity {
  /** The type/class of the customization entity */
  type: string;
  /** Additional properties specific to the entity */
  [key: string]: unknown;
}

/**
 * Represents a scene object that can be converted to a customization entity
 */
interface SceneObject {
  /** The class/type identifier of the scene object */
  Class: string;
  /** Additional properties of the scene object */
  [key: string]: unknown;
}

/**
 * Represents a layer in the floorplan scene
 */
interface SceneLayer {
  /**
   * Iterates over each child object in the layer
   * @param callback - Function to execute for each child
   */
  forEachChild(callback: (child: SceneObject) => void): void;
}

/**
 * Represents the floorplan scene containing layers
 */
interface FloorplanScene {
  /**
   * Iterates over each layer in the scene
   * @param callback - Function to execute for each layer
   */
  forEachLayer(callback: (layer: SceneLayer) => void): void;
}

/**
 * Represents the main application instance
 */
interface AppInstance {
  /** The floorplan scene manager */
  floorplan: {
    /** The scene containing layers and objects */
    scene: FloorplanScene;
  };
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  /**
   * App module for accessing the application instance
   */
  namespace App {
    /**
     * Gets the current application instance
     * @returns The application instance
     */
    function getApp(): AppInstance;
  }
}

/**
 * Factory for creating customization entities from scene objects
 */
declare namespace CustomizationEntityFactory {
  /**
   * Creates a customization entity from a scene object
   * @param className - The class name of the scene object
   * @param sceneObject - The scene object to convert
   * @returns The created customization entity, or null if not applicable
   */
  function createEntity(
    className: string,
    sceneObject: SceneObject
  ): CustomizationEntity | null;
}

/**
 * Configuration for a provider registration
 */
interface ProviderConfig {
  /** The type of provider being registered */
  type: string;
}

/**
 * Implementation of the provider with collection logic
 */
interface ProviderImplementation {
  /**
   * Collects all customization entities from the scene
   * @returns A promise that resolves to an array of customization entities
   */
  collectEntity(): Promise<CustomizationEntity[]>;
}

/**
 * Wraps an array of entities in a promise
 * @param entities - Array of entities to wrap
 * @returns A promise that resolves to the entities array
 */
declare function wrapPromiseEntities(
  entities: CustomizationEntity[]
): Promise<CustomizationEntity[]>;

/**
 * Registers a provider with the given configuration and implementation
 * @param config - The provider configuration
 * @param implementation - The provider implementation
 */
declare function registerProvider(
  config: ProviderConfig,
  implementation: ProviderImplementation
): void;

/**
 * Module exports for the customization provider
 */
declare module "customization-provider" {
  export { registerProvider, wrapPromiseEntities, CustomizationEntityFactory };
  export type {
    ProviderConfig,
    ProviderImplementation,
    CustomizationEntity,
    SceneObject,
    SceneLayer,
    FloorplanScene,
    AppInstance,
  };
}