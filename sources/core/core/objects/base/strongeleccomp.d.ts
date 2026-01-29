/**
 * Module: StrongElecComp
 * Component for handling strong electrical systems in the tree structure
 */

import { ComponentTypeDump } from './ComponentTypeDump';
import { TreeComp, TreeCompEnum } from './TreeComp';

/**
 * Interface for the dump output structure
 */
interface StrongElecCompDump {
  /** Component type identifier */
  tp: ComponentTypeDump.StrongElec;
}

/**
 * Strong Electrical Component class
 * Represents a strong electrical system component in the tree hierarchy
 * @extends TreeComp
 */
export class StrongElecComp extends TreeComp {
  /**
   * Static type identifier for StrongElecComp
   */
  static readonly Type: TreeCompEnum.StrongElec = TreeCompEnum.StrongElec;

  /**
   * Reference to the associated object
   * @private
   */
  private _referObject?: unknown;

  /**
   * Gets the component type
   * @returns The component type enum value
   */
  get type(): TreeCompEnum.StrongElec {
    return StrongElecComp.Type;
  }

  /**
   * Serializes the component to a dump object
   * @returns The serialized component data
   */
  dump(): StrongElecCompDump {
    return {
      tp: ComponentTypeDump.StrongElec
    };
  }

  /**
   * Static factory method to load/create a StrongElecComp instance
   * @param data - The data to load from (currently unused)
   * @param referObject - The reference object to associate with this component
   * @returns A new StrongElecComp instance
   */
  static load(data: unknown, referObject: unknown): StrongElecComp {
    const component = new StrongElecComp();
    component._referObject = referObject;
    return component;
  }
}