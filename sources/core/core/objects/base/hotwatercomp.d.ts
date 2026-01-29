/**
 * Component representing a hot water system in the tree structure.
 * This component handles hot water functionality and extends the base TreeComp.
 * 
 * @module HotWaterComp
 */

import { ComponentTypeDump } from './component-type-dump';
import { TreeComp, TreeCompEnum } from './tree-comp';

/**
 * Interface for the dumped hot water component data structure.
 */
export interface HotWaterCompDump {
  /** Component type identifier */
  tp: ComponentTypeDump.HotWater;
}

/**
 * Hot water component class that extends TreeComp.
 * Represents a hot water system node in the component tree hierarchy.
 */
export class HotWaterComp extends TreeComp {
  /**
   * Static type identifier for HotWaterComp.
   * Used for component type checking and registration.
   */
  static readonly Type: TreeCompEnum.HotWater = TreeCompEnum.HotWater;

  /**
   * Reference object associated with this component.
   * @private
   */
  private _referObject?: unknown;

  /**
   * Gets the type identifier for this component instance.
   * @returns The component type enum value
   */
  get type(): TreeCompEnum.HotWater {
    return HotWaterComp.Type;
  }

  /**
   * Serializes the component to a plain object representation.
   * Used for persistence, network transfer, or debugging.
   * 
   * @returns Dumped component data containing type information
   */
  dump(): HotWaterCompDump {
    return {
      tp: ComponentTypeDump.HotWater
    };
  }

  /**
   * Static factory method to reconstruct a HotWaterComp instance from data.
   * 
   * @param data - The serialized component data (currently unused)
   * @param referObject - Reference object to associate with the component
   * @returns A new HotWaterComp instance with the reference object attached
   */
  static load(data: unknown, referObject: unknown): HotWaterComp {
    const component = new HotWaterComp();
    component._referObject = referObject;
    return component;
  }
}