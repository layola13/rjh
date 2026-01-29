/**
 * Module: ConcealedWorkNode_IO
 * Provides I/O serialization and entity definition for concealed work nodes in a hierarchical tree structure.
 */

import { Entity, Entity_IO } from './Entity';
import { Vector3 } from './Vector3';
import { EntityField } from './decorators';
import { ConcealedWorkCompEntity, ConcealedWorkCompEntity_IO } from './ConcealedWorkCompEntity';
import { DeviceComp } from './DeviceComp';

/**
 * Serialized representation of a ConcealedWorkNode position
 */
interface ConcealedWorkNodeData {
  /** Position as a 3-element array [x, y, z] */
  pos: [number, number, number];
}

/**
 * Options for dump operations
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * I/O handler for serializing and deserializing ConcealedWorkNode entities
 */
export class ConcealedWorkNode_IO extends ConcealedWorkCompEntity_IO {
  /**
   * Serializes a ConcealedWorkNode entity to a data structure
   * @param entity - The entity to serialize
   * @param context - Serialization context
   * @param includeMetadata - Whether to include metadata in the output
   * @param options - Additional dump options
   * @returns Serialized entity data array
   */
  dump(
    entity: ConcealedWorkNode,
    context?: unknown,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): Array<ConcealedWorkNodeData & Record<string, unknown>> {
    const serialized = super.dump(entity, undefined, includeMetadata, options);
    serialized[0].pos = entity.position.toArray3();
    return serialized;
  }

  /**
   * Deserializes data into a ConcealedWorkNode entity
   * @param entity - The entity to populate
   * @param data - Serialized data to load
   * @param context - Deserialization context
   */
  load(
    entity: ConcealedWorkNode,
    data: ConcealedWorkNodeData,
    context?: unknown
  ): void {
    super.load(entity, data, context);
    Entity_IO.setEntityFields(entity, {
      position: new Vector3(data.pos)
    });
  }
}

/**
 * Predicate function type for finding/filtering nodes
 */
type NodePredicate = (node: ConcealedWorkNode) => boolean;

/**
 * Callback function type for traversing nodes
 */
type NodeTraversalCallback = (node: ConcealedWorkNode) => void;

/**
 * Tree structure interface for managing node hierarchies
 */
interface NodeTree {
  getParentNode(node: ConcealedWorkNode): ConcealedWorkNode | undefined;
  getChildNodes(node: ConcealedWorkNode): ConcealedWorkNode[];
  removeNode(node: ConcealedWorkNode): void;
  addChildNode(parent: ConcealedWorkNode, child: ConcealedWorkNode): void;
  getStructureNode(node: ConcealedWorkNode): unknown;
}

/**
 * Represents a node in a concealed work tree structure.
 * Supports hierarchical parent-child relationships and tree traversal operations.
 */
export class ConcealedWorkNode extends ConcealedWorkCompEntity {
  /** 3D position of the node */
  @EntityField()
  position: Vector3 = new Vector3();

  /**
   * Gets the I/O handler instance for this entity type
   * @returns Singleton I/O handler instance
   */
  getIO(): ConcealedWorkNode_IO {
    return ConcealedWorkNode_IO.instance();
  }

  /**
   * Gets the world position of the node, accounting for device offset if present
   * @returns World space position vector
   */
  get worldPos(): Vector3 {
    const deviceComp = this.getComponent(DeviceComp.Type);
    if (deviceComp) {
      const worldPosition = this.position.clone();
      worldPosition.add(deviceComp.offset);
      return worldPosition;
    }
    return this.position;
  }

  /**
   * Gets the tree structure this node belongs to
   * @returns The parent tree or undefined if not part of a tree
   */
  get tree(): NodeTree | undefined {
    return this._findTree(this);
  }

  /**
   * Gets the parent node in the hierarchy
   * @returns Parent node or undefined if this is a root node
   */
  get parentNode(): ConcealedWorkNode | undefined {
    const tree = this.tree;
    return tree?.getParentNode(this);
  }

  /**
   * Gets all child nodes of this node
   * @returns Array of child nodes (empty if no children)
   */
  get childNodes(): ConcealedWorkNode[] {
    const tree = this.tree;
    return tree ? tree.getChildNodes(this) : [];
  }

  /**
   * Finds the tree structure by traversing up the hierarchy
   * @param node - Starting node
   * @returns The tree structure or undefined
   * @private
   */
  private _findTree(node: ConcealedWorkNode): NodeTree | undefined {
    const uniqueParent = node.getUniqueParent();
    if (uniqueParent) {
      return uniqueParent;
    }
  }

  /**
   * Finds a node in the subtree that matches the predicate
   * @param predicate - Function to test each node
   * @returns First matching node or undefined
   */
  find(predicate: NodePredicate): ConcealedWorkNode | undefined {
    return this.findNode(this, predicate);
  }

  /**
   * Recursively searches for a node matching the predicate
   * @param node - Current node being tested
   * @param predicate - Function to test each node
   * @returns First matching node or undefined
   * @private
   */
  private findNode(
    node: ConcealedWorkNode,
    predicate: NodePredicate
  ): ConcealedWorkNode | undefined {
    if (predicate(node)) {
      return node;
    }

    let found: ConcealedWorkNode | undefined;
    const children = node.childNodes;
    if (children.length) {
      children.find(child => {
        found = this.findNode(child, predicate);
        return found;
      });
    }
    return found;
  }

  /**
   * Traverses this node and all descendants, applying callback to each
   * @param callback - Function to call for each node
   */
  traverseNode(callback: NodeTraversalCallback): void {
    callback(this);
    this.childNodes.forEach(child => {
      child.traverseNode(callback);
    });
  }

  /**
   * Recursively builds a pre-order traversal list
   * @param node - Current node
   * @param result - Accumulator array
   * @private
   */
  private _getPreOrder(node: ConcealedWorkNode, result: ConcealedWorkNode[]): void {
    result.push(node);
    const children = node.childNodes;
    if (children.length) {
      children.forEach(child => this._getPreOrder(child, result));
    }
  }

  /**
   * Gets all nodes in pre-order traversal (depth-first)
   * @returns Array of nodes in pre-order
   */
  getPreOrderNodes(): ConcealedWorkNode[] {
    const nodes: ConcealedWorkNode[] = [];
    this._getPreOrder(this, nodes);
    return nodes;
  }

  /**
   * Checks if this node has no children
   * @returns True if node is a leaf (no children)
   */
  isEmpty(): boolean {
    return this.childNodes.length === 0;
  }

  /**
   * Gets the total number of links (parent + children)
   * @returns Number of connections to this node
   */
  getNumberOfLinks(): number {
    const childCount = this.childNodes.length;
    return this.parentNode ? childCount + 1 : childCount;
  }

  /**
   * Gets all child nodes (alias for childNodes getter)
   * @returns Array of child nodes
   */
  getChildNodes(): ConcealedWorkNode[] {
    return this.childNodes;
  }

  /**
   * Gets the parent node (alias for parentNode getter)
   * @returns Parent node or undefined
   */
  getParentNode(): ConcealedWorkNode | undefined {
    return this.parentNode;
  }

  /**
   * Removes a child node from this node's children
   * @param child - Node to remove
   */
  removeChildNode(child: ConcealedWorkNode): void {
    const tree = this.tree;
    if (tree) {
      tree.removeNode(child);
    }
  }

  /**
   * Adds a child node to this node
   * @param child - Node to add as child
   */
  addChildNode(child: ConcealedWorkNode): void {
    const tree = this.tree;
    if (tree) {
      tree.addChildNode(this, child);
    }
  }

  /**
   * Removes child nodes, optionally filtered by predicate
   * @param predicate - Optional filter function (if not provided, removes all)
   */
  removeChildNodes(predicate?: NodePredicate): void {
    this.childNodes.forEach(child => {
      if (!predicate || predicate(child)) {
        this.removeChildNode(child);
      }
    });
  }

  /**
   * Gets the structure node associated with this node from the tree
   * @returns Structure node or undefined
   */
  getStructureNode(): unknown {
    const tree = this.tree;
    if (tree) {
      return tree.getStructureNode(this);
    }
  }
}

// Register the entity class with the model system
Entity.registerClass(HSConstants.ModelClass.ConcealedWorkNode, ConcealedWorkNode);