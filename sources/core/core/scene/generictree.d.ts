/**
 * Generic tree data structure with node mapping capabilities
 * @module GenericTree
 */

import { GenericNode } from './GenericNode';

/**
 * Serialized tree data structure
 */
export interface SerializedTree {
  /** Root node data */
  rt?: SerializedNode;
}

/**
 * Serialized node data structure (from GenericNode.dump())
 */
export interface SerializedNode {
  id: string | number;
  [key: string]: unknown;
}

/**
 * Generic tree structure that maintains a map of all nodes by ID
 * Provides efficient node lookup and tree manipulation operations
 */
export declare class GenericTree<TNode extends GenericNode = GenericNode> {
  /**
   * Internal map storing node ID to node instance mappings
   * @private
   */
  private _idMap: Map<string | number, TNode>;

  /**
   * Internal root node reference
   * @private
   */
  private _root?: TNode;

  /**
   * Creates a new GenericTree instance with an empty ID map
   */
  constructor();

  /**
   * Gets the root node of the tree
   */
  get root(): TNode | undefined;

  /**
   * Sets the root node and rebuilds the internal ID map
   * Traverses all child nodes to populate the map
   * @param value - The new root node
   */
  set root(value: TNode | undefined);

  /**
   * Adds one or more nodes to the internal ID map
   * Skips nodes whose IDs already exist in the map
   * @param nodes - Single node or array of nodes to add
   */
  addMap(nodes: TNode | TNode[]): void;

  /**
   * Recursively traverses the tree and populates the ID map
   * @param node - Starting node for traversal
   * @private
   */
  private _traverseIdMap(node: TNode): void;

  /**
   * Removes one or more nodes from the internal ID map
   * @param nodes - Single node or array of nodes to remove
   */
  removeMap(nodes: TNode | TNode[]): void;

  /**
   * Creates a deep clone of the tree
   * Clones the root node and all descendants
   * @returns New GenericTree instance with cloned structure
   */
  clone(): GenericTree<TNode>;

  /**
   * Serializes the tree to a plain object
   * @returns Serialized representation of the tree
   */
  dump(): SerializedTree;

  /**
   * Deserializes a tree from a plain object
   * @param data - Serialized tree data
   * @returns New GenericTree instance populated from data
   */
  static load<T extends GenericNode = GenericNode>(data: SerializedTree): GenericTree<T>;

  /**
   * Finds a node by its ID using the internal map
   * @param id - Node identifier to search for
   * @returns Node instance if found, undefined otherwise
   */
  find(id: string | number): TNode | undefined;
}