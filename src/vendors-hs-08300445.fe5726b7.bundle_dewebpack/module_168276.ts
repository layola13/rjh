import React from 'react';

interface TreeNode {
  key?: string | number;
  value: any;
  children?: TreeNode[];
  [key: string]: any;
}

interface TreeNodeProps {
  key?: string | number;
  value: any;
  children?: React.ReactNode;
  [key: string]: any;
}

interface NodePosition {
  pos: string;
  node: React.ReactElement;
  children: NodePosition[];
}

/**
 * Converts React children elements to tree data structure
 */
export function convertChildrenToData(children: React.ReactNode): TreeNode[] {
  return React.Children.toArray(children)
    .map((child) => {
      if (!React.isValidElement<TreeNodeProps>(child) || !child.type) {
        return null;
      }

      const { key, props } = child;
      const { children: childNodes, value, ...restProps } = props;

      const nodeData: TreeNode = {
        key,
        value,
        ...restProps,
      };

      const convertedChildren = convertChildrenToData(childNodes);
      if (convertedChildren.length > 0) {
        nodeData.children = convertedChildren;
      }

      return nodeData;
    })
    .filter((item): item is TreeNode => item !== null);
}

/**
 * Fills additional information for tree select component
 * Adds legacy properties for backward compatibility
 */
export function fillAdditionalInfo<T extends object>(
  target: T,
  triggerValue: any,
  checkedValues: any[],
  treeData: TreeNode[],
  includeMetadata: boolean
): void {
  let triggerNodeCache: React.ReactElement | null = null;
  let allCheckedNodesCache: NodePosition[] | null = null;

  function computeNodes(): void {
    if (allCheckedNodesCache) {
      return;
    }

    allCheckedNodesCache = [];

    function traverse(
      nodes: TreeNode[],
      position: string = '0',
      parentChecked: boolean = false
    ): NodePosition[] {
      return nodes
        .map((node, index) => {
          const currentPosition = `${position}-${index}`;
          const isChecked = checkedValues.includes(node.value);
          const childPositions = traverse(
            node.children || [],
            currentPosition,
            isChecked
          );

          const reactElement = React.createElement(
            TreeNode,
            node,
            childPositions.map((childPos) => childPos.node)
          );

          if (triggerValue === node.value) {
            triggerNodeCache = reactElement;
          }

          if (isChecked) {
            const positionInfo: NodePosition = {
              pos: currentPosition,
              node: reactElement,
              children: childPositions,
            };

            if (!parentChecked) {
              allCheckedNodesCache!.push(positionInfo);
            }

            return positionInfo;
          }

          return null;
        })
        .filter((item): item is NodePosition => item !== null);
    }

    traverse(treeData);

    allCheckedNodesCache.sort((a, b) => {
      const aValue = a.node.props.value;
      const bValue = b.node.props.value;
      return checkedValues.indexOf(aValue) - checkedValues.indexOf(bValue);
    });
  }

  Object.defineProperty(target, 'triggerNode', {
    get() {
      console.warn(
        '`triggerNode` is deprecated. Please consider decoupling data with node.'
      );
      computeNodes();
      return triggerNodeCache;
    },
  });

  Object.defineProperty(target, 'allCheckedNodes', {
    get() {
      console.warn(
        '`allCheckedNodes` is deprecated. Please consider decoupling data with node.'
      );
      computeNodes();
      return includeMetadata
        ? allCheckedNodesCache
        : allCheckedNodesCache?.map((item) => item.node);
    },
  });
}

/**
 * Fills legacy props for backward compatibility
 */
export function fillLegacyProps<T extends object>(node: T | null): T | null {
  if (!node) {
    return node;
  }

  const proxiedNode = { ...node };

  if (!('props' in proxiedNode)) {
    Object.defineProperty(proxiedNode, 'props', {
      get() {
        console.warn(
          'New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.'
        );
        return proxiedNode;
      },
    });
  }

  return proxiedNode;
}

const TreeNode: React.FC<TreeNodeProps> = () => null;

export default TreeNode;