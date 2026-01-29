import { useRef } from 'react';

interface TreeNodeData {
  key?: string | number;
  value?: string | number;
  title?: React.ReactNode;
  children?: TreeNodeData[];
  [key: string]: unknown;
}

interface SimpleModeConfig {
  id?: string;
  pId?: string;
  rootPId?: null | string | number;
}

interface FormatOptions {
  getLabelProp: (node: TreeNodeData) => React.ReactNode;
  simpleMode?: boolean | SimpleModeConfig;
}

interface CacheRef {
  treeData?: TreeNodeData[];
  children?: React.ReactNode;
  formatTreeData?: TreeNodeData[];
}

function formatTreeData(
  data: TreeNodeData[],
  getLabelProp: (node: TreeNodeData) => React.ReactNode
): TreeNodeData[] {
  return (function transform(nodes: TreeNodeData[]): TreeNodeData[] {
    return (nodes || []).map((node) => {
      const { key, value, children, ...rest } = node;
      const nodeValue = 'value' in node ? value : key;
      
      const formattedNode: TreeNodeData = {
        ...rest,
        key: key ?? nodeValue,
        value: nodeValue,
        title: getLabelProp(node)
      };

      if ('children' in node) {
        formattedNode.children = transform(children);
      }

      return formattedNode;
    });
  })(data);
}

function convertSimpleModeData(
  data: TreeNodeData[],
  config: SimpleModeConfig
): TreeNodeData[] {
  const idField = config.id || 'id';
  const pIdField = config.pId || 'pId';
  const rootPId = config.rootPId;
  
  const nodeMap: Record<string | number, TreeNodeData> = {};
  const rootNodes: TreeNodeData[] = [];
  
  const mappedData = data.map((item) => {
    const node = { ...item };
    const nodeId = node[idField] as string | number;
    nodeMap[nodeId] = node;
    node.key = node.key || nodeId;
    return node;
  });
  
  mappedData.forEach((node) => {
    const parentId = node[pIdField] as string | number;
    const parentNode = nodeMap[parentId];
    
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push(node);
    }
    
    if (parentId === rootPId || (!parentNode && rootPId === null)) {
      rootNodes.push(node);
    }
  });
  
  return rootNodes;
}

function convertChildrenToData(children: React.ReactNode): TreeNodeData[] {
  // This function should convert React children to tree data structure
  // Implementation depends on the actual children structure
  return [];
}

export default function useFormatTreeData(
  treeData: TreeNodeData[] | undefined,
  children: React.ReactNode | undefined,
  options: FormatOptions
): TreeNodeData[] {
  const { getLabelProp, simpleMode } = options;
  const cacheRef = useRef<CacheRef>({});
  
  if (treeData) {
    const isSimpleMode = simpleMode !== undefined && simpleMode !== false;
    const processedData = isSimpleMode
      ? convertSimpleModeData(
          treeData,
          {
            id: 'id',
            pId: 'pId',
            rootPId: null,
            ...(simpleMode === true ? {} : simpleMode)
          }
        )
      : treeData;
    
    if (cacheRef.current.treeData !== treeData) {
      cacheRef.current.formatTreeData = formatTreeData(processedData, getLabelProp);
      cacheRef.current.treeData = treeData;
    }
  } else {
    const childrenData = convertChildrenToData(children);
    
    if (cacheRef.current.children !== children) {
      cacheRef.current.formatTreeData = formatTreeData(childrenData, getLabelProp);
      cacheRef.current.children = children;
    }
  }
  
  return cacheRef.current.formatTreeData || [];
}