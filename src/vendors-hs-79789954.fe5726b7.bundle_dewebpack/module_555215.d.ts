/**
 * Generic tree node data structure supporting hierarchical relationships.
 * Provides methods for tree traversal, search, and manipulation.
 * 
 * @template T The type of data stored in each node
 */
declare class TreeNode<T = any> {
  /**
   * The data payload stored in this node
   */
  data: T;

  /**
   * Reference to the parent node, or undefined if this is the root
   */
  parent: TreeNode<T> | undefined;

  /**
   * Array of child nodes
   */
  children: TreeNode<T>[];

  /**
   * Creates a new tree node
   * 
   * @param data - The data to store in this node
   * @param parent - The parent node, or undefined for root nodes
   */
  constructor(data: T, parent?: TreeNode<T>);

  /**
   * Adds a child node with the given data
   * 
   * @param data - The data for the new child node
   * @returns The newly created child node
   */
  addChild(data: T): TreeNode<T>;

  /**
   * Removes a child node from this node's children
   * 
   * @param childNode - The child node to remove
   */
  removeChild(childNode: TreeNode<T>): void;

  /**
   * Searches for the first node containing the specified data using breadth-first traversal
   * 
   * @param data - The data to search for
   * @returns The first matching node, or undefined if not found
   */
  searchNode(data: T): TreeNode<T> | undefined;

  /**
   * Searches ancestors for the first node matching the predicate
   * 
   * @param includeSelf - Whether to include this node in the search
   * @param predicate - Function that returns true for the desired ancestor
   * @returns The first matching ancestor, or undefined if not found
   */
  searchAncestor(includeSelf: boolean, predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined;

  /**
   * Gets all leaf nodes (nodes with no children) in the subtree
   * 
   * @returns Array of leaf nodes
   */
  getLeaves(): TreeNode<T>[];

  /**
   * Gets the root node of the tree
   * 
   * @returns The root node
   */
  getRoot(): TreeNode<T>;

  /**
   * Executes a callback for each node in breadth-first order
   * 
   * @param callback - Function to execute for each node. Return false to stop traversal.
   * @returns This node for chaining
   * @throws {TypeError} If callback is not a function
   */
  forEach(callback: (node: TreeNode<T>) => boolean | void): this;

  /**
   * Gets the chain of ancestors from this node to the root
   * 
   * @param includeSelf - Whether to include this node in the chain
   * @param filter - Optional filter function; only nodes passing the filter are included
   * @returns Array of ancestor nodes, starting with this node (if included) and ending with root
   */
  getAncestorChain(includeSelf: boolean, filter?: (node: TreeNode<T>) => boolean): TreeNode<T>[];

  /**
   * Gets all paths from this node to leaf nodes as chains of descendants
   * 
   * @param includeSelf - Whether to include this node in each chain
   * @param filter - Optional filter function; paths stop at nodes that don't pass the filter
   * @returns Array of node chains, each representing a path to a leaf or filtered endpoint
   */
  getDescendantChains(includeSelf: boolean, filter?: (node: TreeNode<T>) => boolean): TreeNode<T>[][];

  /**
   * Performs breadth-first traversal starting from a node
   * 
   * @param startNode - The node to start traversal from
   * @param callback - Function called for each node. Return false to stop traversal.
   */
  private static _breadthFirstTraverse<T>(startNode: TreeNode<T>, callback: (node: TreeNode<T>) => boolean | void): void;

  /**
   * Performs depth-first traversal starting from a node
   * 
   * @param startNode - The node to start traversal from
   * @param callback - Function called for each node. Return false to stop traversal.
   */
  private static _depthFirstTraverse<T>(startNode: TreeNode<T>, callback: (node: TreeNode<T>) => boolean | void): void;
}

export = TreeNode;