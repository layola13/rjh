/**
 * Entity class factory module
 * Provides factory methods for creating and retrieving parametric model entity classes
 * @module EntityClassFactory
 */

import { Entity } from './Entity';
import { PModelTypes } from './PModelTypes';

/**
 * Entity class factory for parametric models
 * Manages registration and retrieval of entity classes based on model types
 */
export class EntityClassFactory {
  /**
   * Get entity class constructor by model type
   * @param modelType - The parametric model type
   * @returns The corresponding entity class constructor, or null if not found
   */
  static getEntityClassByType(
    modelType: PModelTypes
  ): typeof Entity | null {
    switch (modelType) {
      case PModelTypes.eExtrude:
        return EntityClassFactory.PExtruding;
      case PModelTypes.eMolding:
        return EntityClassFactory.PMolding;
      case PModelTypes.eContent:
        return EntityClassFactory.PContent;
      case PModelTypes.eBox:
        return EntityClassFactory.PBox;
      case PModelTypes.ePSegmentLoft:
        return EntityClassFactory.PSegmentLoft;
      case PModelTypes.ePAssembly:
        return EntityClassFactory.PAssembly;
      case PModelTypes.ePSlidingDoor:
        return EntityClassFactory.PSlidingDoor;
      case PModelTypes.ePSlidingDoorLeaf:
        return EntityClassFactory.PSlidingDoorLeaf;
      default:
        return null;
    }
  }

  /**
   * Register a custom entity class
   * @param className - The name of the class to register
   * @param classConstructor - The class constructor function
   */
  static registerClass(
    className: string,
    classConstructor: typeof Entity
  ): void {
    Entity.registerClass(className, classConstructor);
  }

  /**
   * Retrieve a registered entity class by name
   * @param className - The name of the class to retrieve
   * @returns The entity class constructor
   */
  static getClass(className: string): typeof Entity {
    return Entity.getClass(className);
  }

  /**
   * Get the PExtruding entity class
   * @returns PExtruding class constructor
   */
  static get PExtruding(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPExtruding);
  }

  /**
   * Get the PMolding entity class
   * @returns PMolding class constructor
   */
  static get PMolding(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPMolding);
  }

  /**
   * Get the PContent entity class
   * @returns PContent class constructor
   */
  static get PContent(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPContent);
  }

  /**
   * Get the PBox entity class
   * @returns PBox class constructor
   */
  static get PBox(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPBox);
  }

  /**
   * Get the PSegmentLoft entity class
   * @returns PSegmentLoft class constructor
   */
  static get PSegmentLoft(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPSegmentLoft);
  }

  /**
   * Get the PAssembly entity class
   * @returns PAssembly class constructor
   */
  static get PAssembly(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPAssembly);
  }

  /**
   * Get the PSlidingDoor entity class
   * @returns PSlidingDoor class constructor
   */
  static get PSlidingDoor(): typeof Entity {
    return EntityClassFactory.getClass(HSConstants.ModelClass.NgPSlidingDoor);
  }

  /**
   * Get the PSlidingDoorLeaf entity class
   * @returns PSlidingDoorLeaf class constructor
   */
  static get PSlidingDoorLeaf(): typeof Entity {
    return EntityClassFactory.getClass(
      HSConstants.ModelClass.NgPSlidingDoorLeaf
    );
  }
}

export { EntityClassFactory as W };