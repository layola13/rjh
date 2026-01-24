/**
 * Module: StructureNode
 * A structural wrapper node that extends GenericNode and maintains references to child nodes.
 */

import { GenericNode } from './GenericNode';

/**
 * Interface representing the real node data structure
 */
export interface RealNodeData {
  /** Unique identifier for the node */
  id: string | number;
}

/**
 * StructureNode class
 * 
 * A node in a hierarchical structure that wraps a real node object
 * and maintains a collection of child nodes.
 * 
 * @extends GenericNode
 */
export class StructureNode extends GenericNode {
  /**
   * Collection of child StructureNode instances
   */
  childNodes: StructureNode[];

  /**
   * Reference to the original node data
   */
  realNode: RealNodeData;

  /**
   * Creates a new StructureNode instance
   * 
   * @param realNode - The real node data to wrap
   */
  constructor(realNode: RealNodeData);
}