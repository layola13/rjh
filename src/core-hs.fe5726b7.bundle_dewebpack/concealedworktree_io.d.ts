/**
 * ConcealedWorkTree IO Module
 * 
 * This module provides IO serialization/deserialization and entity management
 * for concealed work tree structures in a hierarchical node-based system.
 */

import { Entity_IO } from './Entity';
import { ConcealedWorkCompEntity_IO, ConcealedWorkCompEntity } from './ConcealedWorkCompEntity';
import { ConcealedWorkNode } from './ConcealedWorkNode';
import { JointComp } from './JointComp';
import { DeviceComp } from './DeviceComp';
import { GenericTree } from './GenericTree';
import { GenericNode } from './GenericNode';
import { StructureNode } from './StructureNode';

/**
 * Serialized tree data structure
 */
interface SerializedTreeData {
  tr?: unknown;
  [key: string]: unknown;
}

/**
 * Dump options for serialization
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * IO handler for ConcealedWorkTree entity
 * Manages serialization and deserialization of tree structures
 */
export declare class ConcealedWorkTree_IO extends ConcealedWorkCompEntity_IO {
  /**
   * Serialize a ConcealedWorkTree entity to a transferable format
   * 
   * @param entity - The entity to serialize
   * @param context - Serialization context
   * @param includeTreeData - Whether to include tree data in output (default: true)
   * @param options - Additional serialization options
   * @returns Serialized entity data array
   */
  dump(
    entity: ConcealedWorkTree,
    context?: unknown,
    includeTreeData?: boolean,
    options?: DumpOptions
  ): [SerializedTreeData, ...unknown[]];

  /**
   * Deserialize data into a ConcealedWorkTree entity
   * 
   * @param entity - Target entity to populate
   * @param data - Serialized data to load
   * @param context - Deserialization context
   */
  load(
    entity: ConcealedWorkTree,
    data: SerializedTreeData,
    context?: unknown
  ): void;

  /**
   * Get singleton instance of the IO handler
   */
  static instance(): ConcealedWorkTree_IO;
}

/**
 * Represents a hierarchical tree structure for concealed work nodes
 * Manages parent-child relationships and provides traversal utilities
 */
export declare class ConcealedWorkTree extends ConcealedWorkCompEntity {
  /**
   * Internal tree data structure storing node hierarchy
   */
  treeData?: GenericTree;

  /**
   * Internal child nodes map (indexed by node ID)
   * @internal
   */
  protected _children: Record<string, ConcealedWorkNode>;

  /**
   * Internal parent entities map
   * @internal
   */
  protected _parents: Record<string, unknown>;

  /**
   * Get the IO handler for this entity type
   */
  getIO(): ConcealedWorkTree_IO;

  /**
   * Set the root node of the tree
   * Replaces existing root if present. Node must be orphaned.
   * 
   * @param newRoot - New root node (must not have existing parent)
   */
  set root(newRoot: ConcealedWorkNode | undefined);

  /**
   * Get the root node of the tree
   * 
   * @returns Root node or undefined if tree is empty
   */
  get root(): ConcealedWorkNode | undefined;

  /**
   * Get all concealed work entities that are parents of this tree
   * 
   * @returns Array of parent entities
   */
  get cworks(): unknown[];

  /**
   * Get total number of nodes in the tree (including root)
   * 
   * @returns Total node count
   */
  size(): number;

  /**
   * Count all descendants of a given node recursively
   * 
   * @param node - Starting node
   * @returns Number of descendants
   */
  getDescendantsCount(node: ConcealedWorkNode): number;

  /**
   * Get all nodes in pre-order traversal sequence
   * 
   * @returns Array of nodes in pre-order
   */
  getPreOrderNodes(): ConcealedWorkNode[];

  /**
   * Get all segments (node pairs) in the tree
   * A segment is created between nodes with different device content
   * 
   * @returns Array of node pair tuples representing segments
   */
  getSegments(): [ConcealedWorkNode, ConcealedWorkNode][];

  /**
   * Get all nodes that have a JointComp component
   * 
   * @returns Array of joint nodes
   */
  getJoints(): ConcealedWorkNode[];

  /**
   * Traverse tree to collect segments between nodes with different devices
   * @internal
   * 
   * @param node - Current node
   * @param segments - Accumulator for segment pairs
   */
  private _traverseSegments(
    node: ConcealedWorkNode,
    segments: [ConcealedWorkNode, ConcealedWorkNode][]
  ): void;

  /**
   * Find a node by its unique identifier
   * 
   * @param id - Node ID
   * @returns Found node or undefined
   */
  findById(id: string): ConcealedWorkNode | undefined;

  /**
   * Find a node using a custom predicate function
   * 
   * @param predicate - Search predicate
   * @returns First matching node or undefined
   */
  find(predicate: (node: ConcealedWorkNode) => boolean): ConcealedWorkNode | undefined;

  /**
   * Get direct child nodes of a given node
   * 
   * @param node - Parent node
   * @returns Array of child nodes
   */
  getChildNodes(node: ConcealedWorkNode): ConcealedWorkNode[];

  /**
   * Get the parent node of a given node
   * 
   * @param node - Child node
   * @returns Parent node or undefined if node is root
   */
  getParentNode(node: ConcealedWorkNode): ConcealedWorkNode | undefined;

  /**
   * Add a child node to a parent node
   * Child must be orphaned (no existing parent)
   * 
   * @param parent - Parent node
   * @param child - Child node to add (must be orphaned)
   */
  addChildNode(parent: ConcealedWorkNode, child: ConcealedWorkNode): void;

  /**
   * Remove a node and all its descendants from the tree
   * If removing root, entire tree is cleared
   * 
   * @param node - Node to remove
   */
  removeNode(node: ConcealedWorkNode): void;

  /**
   * Remove this tree entity from all parent entities
   */
  removeSelf(): void;

  /**
   * Convert a node and its descendants to a StructureNode representation
   * 
   * @param node - Starting node
   * @returns StructureNode hierarchy or undefined
   */
  getStructureNode(node: ConcealedWorkNode): StructureNode | undefined;

  /**
   * Recursively traverse and build StructureNode hierarchy
   * @internal
   * 
   * @param node - Current node
   * @returns StructureNode or undefined if node not in tree
   */
  private _traverseStructureNode(node: ConcealedWorkNode): StructureNode | undefined;

  /**
   * Add a child entity to this tree
   * @internal
   */
  protected addChild(child: ConcealedWorkNode): void;

  /**
   * Remove a child entity from this tree
   * @internal
   */
  protected removeChild(child: ConcealedWorkNode): void;
}

/**
 * Extended ConcealedWorkNode interface with child traversal methods
 */
declare module './ConcealedWorkNode' {
  interface ConcealedWorkNode {
    /**
     * Get all child nodes of this node
     */
    getChildNodes(): ConcealedWorkNode[];

    /**
     * Check if this node has no parent
     */
    isOrphan(): boolean;

    /**
     * Get pre-order traversal of this node and descendants
     */
    getPreOrderNodes(): ConcealedWorkNode[];

    /**
     * Traverse this node and all descendants with a callback
     */
    traverseNode(callback: (node: ConcealedWorkNode) => void): void;

    /**
     * Find a node in descendants using predicate
     */
    find(predicate: (node: ConcealedWorkNode) => boolean): ConcealedWorkNode | undefined;

    /**
     * Unique identifier
     */
    id: string;

    /**
     * Display tag/name
     */
    tag: string;

    /**
     * Child nodes of this node
     */
    childNodes: ConcealedWorkNode[];

    /**
     * Get a component by type
     */
    getComponent<T>(type: string): T | undefined;
  }
}