/**
 * Joint component module
 * Represents a joint component that extends NodeComp functionality
 */

import { ComponentTypeDump } from './component-type-dump';
import { NodeComp, NodeCompEnum } from './node-comp';

/**
 * Interface representing the serialized dump structure of a JointComp
 */
interface JointCompDump {
  /** Component type identifier */
  tp: ComponentTypeDump.Joint;
}

/**
 * Joint Component class
 * Represents a joint in the node hierarchy system
 * @extends NodeComp
 */
export declare class JointComp extends NodeComp {
  /**
   * Static type identifier for JointComp
   * @readonly
   */
  static readonly Type: NodeCompEnum.Joint;

  /**
   * Reference to the associated object
   * @protected
   */
  protected _referObject?: unknown;

  /**
   * Gets the component type
   * @returns The joint component type enum value
   */
  get type(): NodeCompEnum.Joint;

  /**
   * Serializes the component to a dump object
   * @returns Serialized representation of the joint component
   */
  dump(): JointCompDump;

  /**
   * Deserializes and creates a JointComp instance from data
   * @param data - The serialized component data
   * @param referObject - The object to reference
   * @returns A new JointComp instance
   */
  static load(data: unknown, referObject: unknown): JointComp;
}