/**
 * Generic tree node structure supporting hierarchical data organization.
 * Provides methods for tree manipulation, traversal, and serialization.
 * @module GenericNode
 */

/**
 * Serialized representation of a GenericNode for storage or transmission
 */
export interface SerializedNode {
  /** Unique identifier of the node */
  id: string;
  /** Serialized child nodes (undefined if no children) */
  c?: SerializedNode[];
}

/**
 * Predicate function for finding nodes in the tree
 * @param node - The node to test
 * @returns true if the node matches the search criteria
 */
export type NodePredicate<T extends GenericNode = GenericNode> = (node: T) => boolean;

/**
 * Generic tree node with parent-child relationships.
 * Supports cloning, serialization, and tree traversal operations.
 */
export class GenericNode {
  /** Unique identifier for this node */
  readonly id: string;
  
  /** Array of direct child nodes */
  childNodes: GenericNode[];
  
  /** Reference to parent node (undefined for root nodes) */
  parentNode?: GenericNode;

  /**
   * Creates a new GenericNode instance
   * @param id - Unique identifier for the node
   */
  constructor(id: string);

  /**
   * Creates a deep copy of this node and all its descendants.
   * Parent-child relationships are preserved in the cloned tree.
   * @returns A new GenericNode instance with copied structure
   */
  clone(): GenericNode;

  /**
   * Serializes this node and its descendants to a plain object.
   * Useful for JSON serialization or state persistence.
   * @returns Serialized representation of the node tree
   */
  dump(): SerializedNode;

  /**
   * Reconstructs a GenericNode tree from serialized data.
   * @param data - Serialized node data from dump()
   * @returns Reconstructed GenericNode instance with full tree structure
   */
  static load(data: SerializedNode): GenericNode;

  /**
   * Adds one or more child nodes to this node.
   * Automatically sets parent references and prevents duplicate IDs.
   * @param node - Single node or array of nodes to add
   */
  addChildNode(node: GenericNode | GenericNode[]): void;

  /**
   * Removes one or more child nodes from this node.
   * Accepts node instances or node IDs.
   * @param node - Node(s) to remove (GenericNode instance or ID string)
   */
  removeChildNode(node: GenericNode | GenericNode[] | string | string[]): void;

  /**
   * Finds a direct child node by its ID.
   * Does not search descendants recursively.
   * @param id - ID of the child node to find
   * @returns The matching child node, or undefined if not found
   */
  getChildNode(id: string): GenericNode | undefined;

  /**
   * Searches the entire subtree for a node matching the predicate.
   * Uses depth-first search starting from this node.
   * @param predicate - Function to test each node
   * @returns First matching node, or undefined if none found
   */
  find(predicate: NodePredicate): GenericNode | undefined;

  /**
   * Internal recursive helper for tree traversal.
   * @param node - Current node being examined
   * @param predicate - Test function for matching nodes
   * @returns Matching node or undefined
   * @internal
   */
  findNode(node: GenericNode, predicate: NodePredicate): GenericNode | undefined;

  /**
   * Internal helper for pre-order tree traversal.
   * Recursively collects nodes in parent-first order.
   * @param node - Current node to process
   * @param result - Accumulator array for collected nodes
   * @internal
   */
  _getPreOrder(node: GenericNode, result: GenericNode[]): void;

  /**
   * Returns all nodes in the subtree in pre-order (parent before children).
   * Includes this node as the first element.
   * @returns Array of nodes in pre-order traversal sequence
   */
  getPreOrderNodes(): GenericNode[];
}