/**
 * Options for tree traversal
 */
interface TreeFindPathOptions {
  /**
   * The property name that contains children nodes
   * @default "children"
   */
  childrenKeyName?: string;
}

/**
 * Predicate function to test each node
 * @param node - The current node being tested
 * @param level - The depth level of the current node (0-based)
 * @returns True if the node matches the criteria
 */
type TreeNodePredicate<T> = (node: T, level: number) => boolean;

/**
 * Tree node with children
 */
interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

/**
 * Finds a path in a tree structure by traversing nodes that match the predicate
 * 
 * @param tree - The root nodes array to search through
 * @param predicate - Function to test each node at each level
 * @param options - Configuration options for traversal
 * @returns Array of nodes representing the path from root to the matched leaf node
 * 
 * @example
 *