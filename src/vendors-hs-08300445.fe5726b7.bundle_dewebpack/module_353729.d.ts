/**
 * Tree node conduct check utilities
 * Handles checkbox selection logic in tree structures with parent-child relationships
 */

/**
 * Tree node structure with hierarchical information
 */
interface TreeEntity {
  /** Unique identifier for the node */
  key: string;
  /** The actual node data */
  node: TreeNode;
  /** Hierarchy level (0 = root) */
  level: number;
  /** Parent entity reference */
  parent?: TreeEntity;
  /** Child entities */
  children?: TreeEntity[];
}

/**
 * Tree node data with checkbox state
 */
interface TreeNode {
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Whether the checkbox is disabled */
  disableCheckbox?: boolean;
  /** Whether the node is checkable */
  checkable?: boolean;
}

/**
 * Result of conduct check operation
 */
interface ConductCheckResult {
  /** Fully checked node keys */
  checkedKeys: string[];
  /** Partially checked node keys (some children checked) */
  halfCheckedKeys: string[];
}

/**
 * Check operation mode configuration
 */
interface CheckConfig {
  /** Previously half-checked keys (used in non-strict mode) */
  halfCheckedKeys?: string[];
}

/**
 * Predicate function to determine if a node's checkbox should be disabled
 */
type DisabledCheckPredicate = (node: TreeNode) => boolean;

/**
 * Removes elements from setA that exist in setB
 * @param setA - Source set to filter
 * @param setB - Set of elements to exclude
 * @returns New set containing elements only in setA
 */
function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  setA.forEach((element) => {
    if (!setB.has(element)) {
      result.add(element);
    }
  });
  return result;
}

/**
 * Default implementation to check if a node's checkbox is disabled
 * @param node - Tree node to check
 * @returns True if checkbox should be disabled
 */
export function isCheckDisabled(node?: TreeNode): boolean {
  if (!node) {
    return false;
  }
  
  const { disabled, disableCheckbox, checkable } = node;
  
  // Disabled if explicitly marked as disabled or checkbox is disabled
  if (disabled || disableCheckbox) {
    return true;
  }
  
  // Disabled if explicitly marked as not checkable
  if (checkable === false) {
    return true;
  }
  
  return false;
}

/**
 * Performs conduct check operation in strict mode
 * In strict mode, parent selection strictly follows child selection state
 * 
 * @param checkedKeys - Currently checked keys
 * @param levelMap - Map of level to entities at that level
 * @param maxLevel - Maximum depth level
 * @param isDisabled - Predicate to check if node is disabled
 * @returns Conduct check result with checked and half-checked keys
 */
function conductCheckStrict(
  checkedKeys: Set<string>,
  levelMap: Map<number, Set<TreeEntity>>,
  maxLevel: number,
  isDisabled: DisabledCheckPredicate
): ConductCheckResult {
  const checked = new Set(checkedKeys);
  const halfChecked = new Set<string>();
  
  // Top-down pass: propagate checks to children
  for (let level = 0; level <= maxLevel; level += 1) {
    const entities = levelMap.get(level) || new Set<TreeEntity>();
    
    entities.forEach((entity) => {
      const { key, node, children = [] } = entity;
      
      // If parent is checked and not disabled, check all non-disabled children
      if (checked.has(key) && !isDisabled(node)) {
        children
          .filter((child) => !isDisabled(child.node))
          .forEach((child) => {
            checked.add(child.key);
          });
      }
    });
  }
  
  // Bottom-up pass: update parent states based on children
  const processed = new Set<string>();
  
  for (let level = maxLevel; level >= 0; level -= 1) {
    const entities = levelMap.get(level) || new Set<TreeEntity>();
    
    entities.forEach((entity) => {
      const { parent, node } = entity;
      
      // Skip if node is disabled or no parent or parent already processed
      if (isDisabled(node) || !parent || processed.has(parent.key)) {
        return;
      }
      
      // If parent is disabled, mark as processed
      if (isDisabled(parent.node)) {
        processed.add(parent.key);
        return;
      }
      
      const siblings = (parent.children || []).filter((child) => !isDisabled(child.node));
      
      let allChecked = true;
      let anyChecked = false;
      
      siblings.forEach((sibling) => {
        const isChecked = checked.has(sibling.key);
        if (allChecked && !isChecked) {
          allChecked = false;
        }
        if (!anyChecked && (isChecked || halfChecked.has(sibling.key))) {
          anyChecked = true;
        }
      });
      
      // Update parent state
      if (allChecked) {
        checked.add(parent.key);
      }
      if (anyChecked) {
        halfChecked.add(parent.key);
      }
      
      processed.add(parent.key);
    });
  }
  
  return {
    checkedKeys: Array.from(checked),
    halfCheckedKeys: Array.from(difference(halfChecked, checked))
  };
}

/**
 * Performs conduct check operation in non-strict mode
 * In non-strict mode, parent and child selections are independent
 * 
 * @param checkedKeys - Currently checked keys
 * @param previousHalfCheckedKeys - Previously half-checked keys
 * @param levelMap - Map of level to entities at that level
 * @param maxLevel - Maximum depth level
 * @param isDisabled - Predicate to check if node is disabled
 * @returns Conduct check result with checked and half-checked keys
 */
function conductCheckNonStrict(
  checkedKeys: Set<string>,
  previousHalfCheckedKeys: string[],
  levelMap: Map<number, Set<TreeEntity>>,
  maxLevel: number,
  isDisabled: DisabledCheckPredicate
): ConductCheckResult {
  const checked = new Set(checkedKeys);
  let halfChecked = new Set(previousHalfCheckedKeys);
  
  // Top-down pass: uncheck children if parent is unchecked
  for (let level = 0; level <= maxLevel; level += 1) {
    const entities = levelMap.get(level) || new Set<TreeEntity>();
    
    entities.forEach((entity) => {
      const { key, node, children = [] } = entity;
      
      // If parent is not checked/half-checked and not disabled, uncheck all children
      if (!checked.has(key) && !halfChecked.has(key) && !isDisabled(node)) {
        children
          .filter((child) => !isDisabled(child.node))
          .forEach((child) => {
            checked.delete(child.key);
          });
      }
    });
  }
  
  // Bottom-up pass: update parent states
  halfChecked = new Set<string>();
  const processed = new Set<string>();
  
  for (let level = maxLevel; level >= 0; level -= 1) {
    const entities = levelMap.get(level) || new Set<TreeEntity>();
    
    entities.forEach((entity) => {
      const { parent, node } = entity;
      
      if (isDisabled(node) || !parent || processed.has(parent.key)) {
        return;
      }
      
      if (isDisabled(parent.node)) {
        processed.add(parent.key);
        return;
      }
      
      const siblings = (parent.children || []).filter((child) => !isDisabled(child.node));
      
      let allChecked = true;
      let anyChecked = false;
      
      siblings.forEach((sibling) => {
        const isChecked = checked.has(sibling.key);
        if (allChecked && !isChecked) {
          allChecked = false;
        }
        if (!anyChecked && (isChecked || halfChecked.has(sibling.key))) {
          anyChecked = true;
        }
      });
      
      // In non-strict mode, uncheck parent if not all children are checked
      if (!allChecked) {
        checked.delete(parent.key);
      }
      if (anyChecked) {
        halfChecked.add(parent.key);
      }
      
      processed.add(parent.key);
    });
  }
  
  return {
    checkedKeys: Array.from(checked),
    halfCheckedKeys: Array.from(difference(halfChecked, checked))
  };
}

/**
 * Conducts check operation on tree structure
 * Validates keys exist and computes checked/half-checked states based on parent-child relationships
 * 
 * @param keysToCheck - Keys to be checked
 * @param checkConfig - Check configuration (true for strict mode, object with halfCheckedKeys for non-strict)
 * @param keyEntityMap - Map of all keys to their entities
 * @param isDisabled - Optional predicate to determine if node is disabled (defaults to isCheckDisabled)
 * @returns Result containing checked and half-checked keys
 * @throws Assertion error if keys are missing from tree
 */
export function conductCheck(
  keysToCheck: string[],
  checkConfig: boolean | CheckConfig,
  keyEntityMap: Record<string, TreeEntity>,
  isDisabled?: DisabledCheckPredicate
): ConductCheckResult {
  const disabledCheck = isDisabled || isCheckDisabled;
  
  // Validate all keys exist in the tree
  const missingKeys: string[] = [];
  const existingKeys = new Set(
    keysToCheck.filter((key) => {
      const exists = !!keyEntityMap[key];
      if (!exists) {
        missingKeys.push(key);
      }
      return exists;
    })
  );
  
  // Build level map for efficient traversal
  const levelMap = new Map<number, Set<TreeEntity>>();
  let maxLevel = 0;
  
  Object.keys(keyEntityMap).forEach((key) => {
    const entity = keyEntityMap[key];
    const { level } = entity;
    
    let levelSet = levelMap.get(level);
    if (!levelSet) {
      levelSet = new Set();
      levelMap.set(level, levelSet);
    }
    levelSet.add(entity);
    
    maxLevel = Math.max(maxLevel, level);
  });
  
  // Assert no missing keys (warning in production)
  if (missingKeys.length > 0) {
    const displayKeys = missingKeys.slice(0, 100).map((key) => `'${key}'`).join(', ');
    console.warn(`Tree missing following keys: ${displayKeys}`);
  }
  
  // Execute appropriate check strategy
  let result: ConductCheckResult;
  
  if (checkConfig === true) {
    // Strict mode
    result = conductCheckStrict(existingKeys, levelMap, maxLevel, disabledCheck);
  } else {
    // Non-strict mode
    const halfCheckedKeys = (checkConfig as CheckConfig).halfCheckedKeys || [];
    result = conductCheckNonStrict(existingKeys, halfCheckedKeys, levelMap, maxLevel, disabledCheck);
  }
  
  return result;
}