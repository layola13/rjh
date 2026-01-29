/**
 * Tree node disability check interface
 */
export interface DisableCheckOptions {
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Whether the checkbox is disabled */
  disableCheckbox?: boolean;
  /** Whether the node is checkable */
  checkable?: boolean;
}

/**
 * Tree node structure
 */
export interface TreeNode<T = any> {
  /** Unique key for the node */
  key: string;
  /** The actual node data */
  node: T;
  /** Parent node reference */
  parent?: TreeEntity<T>;
  /** Child nodes */
  children?: TreeEntity<T>[];
  /** Hierarchy level in the tree */
  level: number;
}

/**
 * Tree entity type alias
 */
export type TreeEntity<T = any> = TreeNode<T>;

/**
 * Result of conduct check operation
 */
export interface ConductCheckResult {
  /** Array of fully checked node keys */
  checkedKeys: string[];
  /** Array of partially checked node keys (indeterminate state) */
  halfCheckedKeys: string[];
}

/**
 * Conduct check options
 */
export interface ConductCheckOptions {
  /** Keys to check */
  keys: string[];
  /** Whether to check strictly (parent-child not associated) or object with halfCheckedKeys */
  checked: boolean | { halfCheckedKeys: string[] };
  /** Tree nodes map indexed by key */
  keyEntities: Record<string, TreeEntity>;
  /** Optional custom disability check function */
  isDisabled?: (node: any) => boolean;
}

/**
 * Determines if a tree node's checkbox should be disabled
 * 
 * @param options - Node configuration options
 * @returns True if the checkbox should be disabled, false otherwise
 * 
 * @example
 *