/**
 * Tree select utility functions for converting and filling data structures
 * @module TreeSelectUtils
 */

import * as React from 'react';

/**
 * Represents a tree node in the data structure
 */
interface TreeNode {
  /** Unique key for the node */
  key: React.Key;
  /** Value associated with the node */
  value: any;
  /** Child nodes */
  children?: TreeNode[];
  /** Additional props from the original element */
  [key: string]: any;
}

/**
 * Position information for a tree node
 */
interface NodePosition {
  /** Position string in format "0-1-2" */
  pos: string;
  /** React element representing the node */
  node: React.ReactElement;
  /** Child node positions */
  children: NodePosition[];
}

/**
 * Additional info object with lazy-loaded properties
 */
interface AdditionalInfo {
  /** @deprecated Trigger node element */
  triggerNode: React.ReactElement | null;
  /** @deprecated All checked node elements or positions */
  allCheckedNodes: React.ReactElement[] | NodePosition[];
}

/**
 * Legacy node with deprecated props accessor
 */
interface LegacyNode {
  /** @deprecated Props accessor for backward compatibility */
  props?: any;
  [key: string]: any;
}

/**
 * Converts React children to a flat data structure
 * Recursively processes children elements and extracts their properties
 * 
 * @param children - React children to convert
 * @returns Array of tree node data objects
 */
export function convertChildrenToData(children: React.ReactNode): TreeNode[] {
  return React.Children.toArray(children)
    .map((child) => {
      if (!React.isValidElement(child) || !child.type) {
        return null;
      }

      const { key, props } = child;
      const { children: childNodes, value, ...restProps } = props;

      const nodeData: TreeNode = {
        key: key!,
        value,
        ...restProps,
      };

      const processedChildren = convertChildrenToData(childNodes);
      if (processedChildren.length > 0) {
        nodeData.children = processedChildren;
      }

      return nodeData;
    })
    .filter((node): node is TreeNode => node !== null);
}

/**
 * Fills additional information on the target object with lazy-loaded properties
 * Provides deprecated triggerNode and allCheckedNodes accessors
 * 
 * @param target - Object to attach properties to
 * @param triggerValue - Value of the trigger node
 * @param checkedValues - Array of checked node values
 * @param treeData - Full tree data structure
 * @param returnNodePositions - Whether to return full position objects instead of just nodes
 */
export function fillAdditionalInfo(
  target: Record<string, any>,
  triggerValue: any,
  checkedValues: any[],
  treeData: TreeNode[],
  returnNodePositions: boolean
): void {
  let triggerNodeElement: React.ReactElement | null = null;
  let allCheckedNodesList: NodePosition[] | null = null;

  /**
   * Lazily computes and caches checked nodes information
   */
  function computeCheckedNodes(): void {
    if (allCheckedNodesList) {
      return;
    }

    allCheckedNodesList = [];

    /**
     * Recursively processes tree nodes to find checked items
     * 
     * @param nodes - Nodes to process
     * @param positionPrefix - Position prefix for hierarchy tracking
     * @param parentChecked - Whether parent node is checked
     * @returns Array of node position information
     */
    function processNodes(
      nodes: TreeNode[],
      positionPrefix: string = '0',
      parentChecked: boolean = false
    ): NodePosition[] {
      return nodes
        .map((node, index) => {
          const position = `${positionPrefix}-${index}`;
          const isChecked = checkedValues.includes(node.value);
          
          const processedChildren = processNodes(
            node.children || [],
            position,
            isChecked
          );

          const nodeElement = React.createElement(
            TreeNode,
            node,
            processedChildren.map((child) => child.node)
          );

          if (triggerValue === node.value) {
            triggerNodeElement = nodeElement;
          }

          if (isChecked) {
            const nodeInfo: NodePosition = {
              pos: position,
              node: nodeElement,
              children: processedChildren,
            };

            if (!parentChecked) {
              allCheckedNodesList!.push(nodeInfo);
            }

            return nodeInfo;
          }

          return null;
        })
        .filter((item): item is NodePosition => item !== null);
    }

    processNodes(treeData);

    // Sort checked nodes by their original order in checkedValues
    allCheckedNodesList.sort((a, b) => {
      const valueA = a.node.props.value;
      const valueB = b.node.props.value;
      return checkedValues.indexOf(valueA) - checkedValues.indexOf(valueB);
    });
  }

  Object.defineProperty(target, 'triggerNode', {
    get(): React.ReactElement | null {
      console.warn(
        '`triggerNode` is deprecated. Please consider decoupling data with node.'
      );
      computeCheckedNodes();
      return triggerNodeElement;
    },
  });

  Object.defineProperty(target, 'allCheckedNodes', {
    get(): React.ReactElement[] | NodePosition[] {
      console.warn(
        '`allCheckedNodes` is deprecated. Please consider decoupling data with node.'
      );
      computeCheckedNodes();
      
      return returnNodePositions
        ? allCheckedNodesList!
        : allCheckedNodesList!.map((item) => item.node);
    },
  });
}

/**
 * Fills legacy properties on a node for backward compatibility
 * Adds a deprecated props accessor that returns the node itself
 * 
 * @param node - Node object to enhance
 * @returns Enhanced node with legacy props accessor
 */
export function fillLegacyProps<T extends Record<string, any>>(
  node: T | null | undefined
): T | null | undefined {
  if (!node) {
    return node;
  }

  const enhancedNode = { ...node };

  if (!('props' in enhancedNode)) {
    Object.defineProperty(enhancedNode, 'props', {
      get(): T {
        console.warn(
          'New `rc-tree-select` not support return node instance as argument anymore. ' +
          'Please consider to remove `props` access.'
        );
        return enhancedNode;
      },
    });
  }

  return enhancedNode;
}