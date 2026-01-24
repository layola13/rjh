/**
 * Customized PM (Property Management) Model Provider Module
 * 
 * This module registers a provider for collecting customized property management instances
 * from the application's floorplan scene.
 */

/**
 * Entity representing a customized PM instance
 * 
 * Wraps the model data for a customized property management instance entity
 */
declare class CustomizedPMInsEntity {
  /**
   * Accepts and processes a customized PM instance model
   * 
   * @param model - The customized PM instance model to process
   * @returns The entity instance with processed model data
   */
  accept(model: HSCore.Model.CustomizedPMInstanceModel): CustomizedPMInsEntity;
}

/**
 * Configuration for the customized PM model provider
 */
interface CustomizedPMModelProviderConfig {
  /** The type identifier for this provider */
  type: 'CustomizedPMModel';
}

/**
 * Provider implementation for customized PM models
 */
interface CustomizedPMModelProvider {
  /**
   * Collects all valid customized PM instance entities from the scene
   * 
   * @returns A promise containing an array of customized PM instance entities
   */
  collectEntity(): Promise<CustomizedPMInsEntity[]>;
}

/**
 * Wraps entity arrays in a promise-compatible format
 * 
 * @param entities - Array of entities to wrap
 * @returns Promise-wrapped entity array
 */
declare function wrapPromiseEntities<T>(entities: T[]): Promise<T[]>;

/**
 * Registers a provider for a specific model type
 * 
 * @param config - Configuration object specifying the provider type
 * @param implementation - The provider implementation containing collection logic
 */
declare function registerProvider(
  config: CustomizedPMModelProviderConfig,
  implementation: CustomizedPMModelProvider
): void;

/**
 * HSCore namespace containing core model types and enums
 */
declare namespace HSCore {
  namespace Model {
    /**
     * Flags that can be applied to entities
     */
    enum EntityFlagEnum {
      /** Indicates the entity has been removed/deleted */
      removed = 'removed'
    }

    /**
     * Base model class for customized PM instances
     */
    class CustomizedPMInstanceModel {
      /**
       * Retrieves all child models/entities
       * 
       * @returns Array of child models
       */
      getAllChildren(): CustomizedPMInstanceModel[];

      /**
       * Checks if a specific flag is enabled on this entity
       * 
       * @param flag - The flag to check
       * @returns True if the flag is set, false otherwise
       */
      isFlagOn(flag: EntityFlagEnum): boolean;
    }
  }
}

/**
 * HSApp namespace containing application-level APIs
 */
declare namespace HSApp {
  namespace App {
    /**
     * Retrieves the singleton application instance
     * 
     * @returns The application instance
     */
    function getApp(): {
      /** The floorplan scene manager */
      floorplan: {
        /** The 3D scene containing customized PMs */
        scene: {
          /**
           * Gets all customized property management models in the scene
           * 
           * @returns Array of customized PM models
           */
          getCustomizedPms(): HSCore.Model.CustomizedPMInstanceModel[];
        };
      };
    };
  }
}

/**
 * Module augmentation for the module ID system
 */
declare module 'module_359202' {
  export { 
    CustomizedPMInsEntity, 
    CustomizedPMModelProvider, 
    CustomizedPMModelProviderConfig 
  };
}