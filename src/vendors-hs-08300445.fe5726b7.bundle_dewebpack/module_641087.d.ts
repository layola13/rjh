/**
 * Tree value label processing hook
 * Manages value-to-label mapping for tree-structured select components
 */

/**
 * Entity representing a tree node
 */
interface TreeEntity<ValueType = unknown> {
  /** Unique key identifier for the node */
  key: string | number;
  /** Node data containing the actual value */
  data: {
    /** The value associated with this node */
    value: ValueType;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Strategy for displaying checked nodes in tree selection
 */
type ShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

/**
 * Key-entity mapping for efficient tree traversal
 */
type KeyEntities = Record<string | number, TreeEntity>;

/**
 * Hook options for tree value label processing
 */
interface UseTreeValueLabelsOptions<ValueType = unknown> {
  /** Current selected value(s) */
  value: ValueType | ValueType[];
  
  /** Retrieve entity by its value */
  getEntityByValue: (value: ValueType) => TreeEntity<ValueType> | undefined;
  
  /** Retrieve entity by its key */
  getEntityByKey: (key: string | number) => TreeEntity<ValueType> | undefined;
  
  /** Enable tree conduction (parent-child relationship handling) */
  treeConduction: boolean;
  
  /** Strategy for showing checked items */
  showCheckedStrategy: ShowCheckedStrategy;
  
  /** Key-entity mapping structure */
  conductKeyEntities: KeyEntities;
  
  /** Extract label property from entity */
  getLabelProp: (entity: TreeEntity<ValueType>) => React.ReactNode;
}

/**
 * Result of tree value label processing
 */
interface ValueLabel<ValueType = unknown> {
  /** The actual value */
  value: ValueType;
  /** Display label for the value */
  label: React.ReactNode;
}

/**
 * Custom hook for processing tree select values with labels
 * 
 * This hook handles:
 * - Value-to-label mapping
 * - Tree conduction (parent-child relationship handling)
 * - Strategy-based filtering of checked nodes
 * - Memoized computation for performance
 * 
 * @param values - Array of selected values
 * @param options - Configuration options for label processing
 * @returns Array of value-label pairs with applied tree logic
 * 
 * @example
 *