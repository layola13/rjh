interface TreeNode {
  key: string;
  node: any;
  level: number;
  parent?: TreeEntity;
  children?: TreeEntity[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean;
}

interface TreeEntity {
  key: string;
  node: any;
  children?: TreeEntity[];
}

interface CheckResult {
  checkedKeys: string[];
  halfCheckedKeys: string[];
}

interface NodeOptions {
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean;
}

type DisabledCheckFn = (node: any) => boolean;

function filterExcluded(source: Set<string>, excluded: Set<string>): Set<string> {
  const result = new Set<string>();
  source.forEach((key) => {
    if (!excluded.has(key)) {
      result.add(key);
    }
  });
  return result;
}

export function isCheckDisabled(nodeOptions: NodeOptions | any): boolean {
  const options = nodeOptions || {};
  const { disabled, disableCheckbox, checkable } = options;
  
  if (disabled || disableCheckbox) {
    return true;
  }
  
  return checkable === false;
}

function handleStrictMode(
  selectedKeys: Set<string>,
  levelMap: Map<number, Set<TreeNode>>,
  maxLevel: number,
  isDisabled: DisabledCheckFn
): CheckResult {
  const checkedKeysSet = new Set(selectedKeys);
  const halfCheckedKeysSet = new Set<string>();

  for (let level = 0; level <= maxLevel; level += 1) {
    const nodesAtLevel = levelMap.get(level) || new Set<TreeNode>();
    nodesAtLevel.forEach((entity) => {
      const { key, node, children = [] } = entity;
      
      if (checkedKeysSet.has(key) && !isDisabled(node)) {
        children
          .filter((child) => !isDisabled(child.node))
          .forEach((child) => {
            checkedKeysSet.add(child.key);
          });
      }
    });
  }

  const processedParents = new Set<string>();
  
  for (let level = maxLevel; level >= 0; level -= 1) {
    const nodesAtLevel = levelMap.get(level) || new Set<TreeNode>();
    nodesAtLevel.forEach((entity) => {
      const { parent, node } = entity;
      
      if (!isDisabled(node) && parent && !processedParents.has(parent.key)) {
        if (isDisabled(parent.node)) {
          processedParents.add(parent.key);
        } else {
          let allChildrenChecked = true;
          let hasCheckedChild = false;
          
          (parent.children || [])
            .filter((child) => !isDisabled(child.node))
            .forEach((child) => {
              const childKey = child.key;
              const isChecked = checkedKeysSet.has(childKey);
              
              if (allChildrenChecked && !isChecked) {
                allChildrenChecked = false;
              }
              
              if (!hasCheckedChild && (isChecked || halfCheckedKeysSet.has(childKey))) {
                hasCheckedChild = true;
              }
            });
          
          if (allChildrenChecked) {
            checkedKeysSet.add(parent.key);
          }
          
          if (hasCheckedChild) {
            halfCheckedKeysSet.add(parent.key);
          }
          
          processedParents.add(parent.key);
        }
      }
    });
  }

  return {
    checkedKeys: Array.from(checkedKeysSet),
    halfCheckedKeys: Array.from(filterExcluded(halfCheckedKeysSet, checkedKeysSet))
  };
}

function handleNonStrictMode(
  selectedKeys: Set<string>,
  halfCheckedKeys: string[],
  levelMap: Map<number, Set<TreeNode>>,
  maxLevel: number,
  isDisabled: DisabledCheckFn
): CheckResult {
  const checkedKeysSet = new Set(selectedKeys);
  let halfCheckedKeysSet = new Set(halfCheckedKeys);

  for (let level = 0; level <= maxLevel; level += 1) {
    const nodesAtLevel = levelMap.get(level) || new Set<TreeNode>();
    nodesAtLevel.forEach((entity) => {
      const { key, node, children = [] } = entity;
      
      if (!checkedKeysSet.has(key) && !halfCheckedKeysSet.has(key) && !isDisabled(node)) {
        children
          .filter((child) => !isDisabled(child.node))
          .forEach((child) => {
            checkedKeysSet.delete(child.key);
          });
      }
    });
  }

  halfCheckedKeysSet = new Set();
  const processedParents = new Set<string>();
  
  for (let level = maxLevel; level >= 0; level -= 1) {
    const nodesAtLevel = levelMap.get(level) || new Set<TreeNode>();
    nodesAtLevel.forEach((entity) => {
      const { parent, node } = entity;
      
      if (!isDisabled(node) && parent && !processedParents.has(parent.key)) {
        if (isDisabled(parent.node)) {
          processedParents.add(parent.key);
        } else {
          let allChildrenChecked = true;
          let hasCheckedChild = false;
          
          (parent.children || [])
            .filter((child) => !isDisabled(child.node))
            .forEach((child) => {
              const childKey = child.key;
              const isChecked = checkedKeysSet.has(childKey);
              
              if (allChildrenChecked && !isChecked) {
                allChildrenChecked = false;
              }
              
              if (!hasCheckedChild && (isChecked || halfCheckedKeysSet.has(childKey))) {
                hasCheckedChild = true;
              }
            });
          
          if (!allChildrenChecked) {
            checkedKeysSet.delete(parent.key);
          }
          
          if (hasCheckedChild) {
            halfCheckedKeysSet.add(parent.key);
          }
          
          processedParents.add(parent.key);
        }
      }
    });
  }

  return {
    checkedKeys: Array.from(checkedKeysSet),
    halfCheckedKeys: Array.from(filterExcluded(halfCheckedKeysSet, checkedKeysSet))
  };
}

export function conductCheck(
  selectedKeys: string[],
  checkConfig: boolean | { halfCheckedKeys: string[] },
  keyEntities: Record<string, TreeNode>,
  customIsDisabled?: DisabledCheckFn
): CheckResult {
  const missingKeys: string[] = [];
  const isDisabled = customIsDisabled || isCheckDisabled;

  const validKeys = new Set(
    selectedKeys.filter((key) => {
      const exists = !!keyEntities[key];
      if (!exists) {
        missingKeys.push(key);
      }
      return exists;
    })
  );

  const levelMap = new Map<number, Set<TreeNode>>();
  let maxLevel = 0;

  Object.keys(keyEntities).forEach((key) => {
    const entity = keyEntities[key];
    const { level } = entity;
    
    let nodesAtLevel = levelMap.get(level);
    if (!nodesAtLevel) {
      nodesAtLevel = new Set();
      levelMap.set(level, nodesAtLevel);
    }
    
    nodesAtLevel.add(entity);
    maxLevel = Math.max(maxLevel, level);
  });

  if (missingKeys.length > 0) {
    const displayKeys = missingKeys.slice(0, 100).map((key) => `'${key}'`).join(', ');
    console.warn(`Tree missing follow keys: ${displayKeys}`);
  }

  const result =
    checkConfig === true
      ? handleStrictMode(validKeys, levelMap, maxLevel, isDisabled)
      : handleNonStrictMode(
          validKeys,
          (checkConfig as { halfCheckedKeys: string[] }).halfCheckedKeys,
          levelMap,
          maxLevel,
          isDisabled
        );

  return result;
}