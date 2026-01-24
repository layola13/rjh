/**
 * Node component enumeration types
 * Defines the types of nodes that can exist in the system
 */
export enum NodeCompEnum {
  /** Joint node type - represents connection points or joints in the structure */
  Joint = "Joint",
  /** Device node type - represents actual device entities */
  Device = "Device"
}

/**
 * Node component class
 * Base component for representing nodes in the system (joints or devices)
 * Extends the base Component class to provide node-specific functionality
 */
export declare class NodeComp extends Component {
  /**
   * Creates a new NodeComp instance
   */
  constructor();
}

/**
 * Base Component interface
 * Should be imported from the component system module
 */
declare class Component {
  constructor();
}