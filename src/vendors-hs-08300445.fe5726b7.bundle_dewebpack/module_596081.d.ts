/**
 * Tree node structure for checking operations
 */
interface TreeNode {
  /** Unique identifier for the node */
  key: string;
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Whether the node's checkbox is disabled */
  disableCheckbox?: boolean;
  /** Whether the node is checkable */
  checkable?: boolean;
  /** Child nodes */
  children?: TreeNode[];
  /** Nesting level in the tree */
  level?: number;
  /** Parent node reference */
  parent?: TreeEntity;
  /** Actual node data */
  node?: TreeNode;
}

/**
 * Internal tree entity with metadata
 */
interface TreeEntity {
  /** Node key */
  key: string;
  /** Node reference */
  node: TreeNode;
  /** Nesting level */
  level: number;
  /** Child entities */
  children?: TreeEntity[];
  /** Parent entity reference */
  parent?: TreeEntity;
}

/**
 * Configuration for conducting check operations
 */
interface ConductCheckConfig {
  /** Keys that are half-checked (indeterminate state) */
  halfCheckedKeys?: string[];
}

/**
 * Result of a check operation
 */
interface ConductCheckResult {
  /** Array of fully checked node keys */
  checkedKeys: string[];
  /** Array of half-checked (indeterminate) node keys */
  halfCheckedKeys: string[];
}

/**
 * Predicate function to determine if a node's checkbox is disabled
 */
type IsDisabledFn = (node: TreeNode) => boolean;

/**
 * Determines if a tree node's checkbox is disabled
 * 
 * @param node - The tree node to check
 * @returns true if the checkbox is disabled, false otherwise
 */
export declare function isCheckDisabled(node?: TreeNode): boolean;

/**
 * Conducts a check operation on tree nodes, handling parent-child relationships
 * and cascading selection based on the check strategy
 * 
 * @param keys - Array of node keys to check
 * @param checkStrategy - true for parent-child cascading, false/config for independent checking
 * @param keyEntities - Map of node keys to their entity metadata
 * @param isDisabledFn - Optional function to determine if a node is disabled
 * @returns Result containing checked and half-checked keys
 */
export declare function conductCheck(
  keys: string[],
  checkStrategy: boolean | ConductCheckConfig,
  keyEntities: Record<string, TreeEntity>,
  isDisabledFn?: IsDisabledFn
): ConductCheckResult;