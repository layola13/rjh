export interface FindPathOptions {
  childrenKeyName?: string;
}

export interface TreeNode {
  [key: string]: unknown;
  children?: TreeNode[];
}

export type PredicateFn<T = TreeNode> = (node: T, level: number) => boolean;

export function findPath<T extends TreeNode>(
  tree: T | undefined,
  predicate: PredicateFn<T>,
  options?: FindPathOptions
): T[] {
  const opts: Required<FindPathOptions> = {
    childrenKeyName: options?.childrenKeyName ?? 'children'
  };

  let currentLevel: T[] = tree ? [tree] : [];
  const path: T[] = [];
  let depth = 0;

  while (currentLevel.length > 0) {
    const matchedNode = currentLevel.find((node) => predicate(node, depth));

    if (!matchedNode) {
      break;
    }

    path.push(matchedNode);
    currentLevel = (matchedNode[opts.childrenKeyName] as T[]) ?? [];
    depth += 1;
  }

  return path;
}

export default findPath;